import React, { Fragment, useEffect, useState } from 'react'
import { ConfigProvider } from 'antd'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import routes from './routes'
import { isJsonString } from './utils'
import { jwtDecode } from "jwt-decode";
import * as UserService from './services/UserService'
import { useDispatch, useSelector } from 'react-redux'
import { resetUser, updateUser } from './redux/slides/userSlide'
import Loading from './components/LoadingComponent/Loading'

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    setIsLoading(true)
    const { storageData, decoded } = handleDecoded()
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData)
    }
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDecoded = () => {

    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData)
    }
    return { decoded, storageData }
  }
  useEffect(() => {
    const interceptorId = UserService.axiosJWT.interceptors.request.use(async (config) => {
      const currentTime = new Date()
      const { decoded } = handleDecoded()
      if (decoded?.exp && decoded.exp < currentTime.getTime() / 1000) {
        // The refresh token lives only in the httpOnly cookie the browser
        // sends automatically — the frontend never reads or holds it.
        try {
          const data = await UserService.refreshToken()
          if (data?.access_token) {
            config.headers['token'] = `Bearer ${data.access_token}`
          } else {
            dispatch(resetUser())
          }
        } catch (error) {
          dispatch(resetUser())
        }
      }
      return config
    }, function (error) {
      return Promise.reject(error);
    })

    return () => {
      UserService.axiosJWT.interceptors.request.eject(interceptorId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleGetDetailsUser = async (id, token) => {
    try {
      const res = await UserService.getDetailsUser(id, token)
      dispatch(updateUser({ ...res?.data, access_token: token }))
    } catch (error) {
      dispatch(resetUser())
    }
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1a94ff',
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        },
      }}
    >
      <div style={{ height: '100vh', width: '100%' }}>
        <Loading isLoading={isLoading}>
          <Router>
            <Routes>
              {routes.map((route) => {
                const Page = route.page
                const ischeckAuth = !route.isPrivate || user.isAdmin
                const Layout = route.isShowHeader ? DefaultComponent : Fragment

                return (
                  <Route key={route.path} path={ischeckAuth ? route.path : undefined} element={
                    <Layout>
                      <Page />
                    </Layout>
                  } />
                )
              })}
            </Routes>
          </Router>
        </Loading>
      </div>
    </ConfigProvider>
  )
}

export default App