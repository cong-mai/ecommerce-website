import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Input, Row, Popover } from 'antd';
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount, WrapperTextHeaderSmall, WrapperContentPopup  } from "./style";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slides/userSlide'
import Loading from '../LoadingComponent/Loading'
import { useMutationHooks } from '../../hooks/useMutationHook'

const { Search } = Input;

const HeaderComponent = ({isHiddenSearch = false, isHiddenCart = false}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [loading, setLoading] = useState(false)
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const mutationLogout = useMutationHooks(() => UserService.logoutUser())
  const { isPending, isSuccess, isError } = mutationLogout

  const handleLogout = async () => {
    setLoading(true)
    await UserService.logoutUser()
    dispatch(resetUser())
    localStorage.removeItem('access_token')
    navigate('/')
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
    setLoading(false)
  }, [user?.name, user?.avatar])
  
  const content = (
    <div>
     <WrapperContentPopup onClick={() => navigate('/profile-user')}>My Profile</WrapperContentPopup>
       {user?.isAdmin && (
        <WrapperContentPopup onClick={() => navigate('/system/admin')}>Admin Page</WrapperContentPopup>
       )}
      <WrapperContentPopup onClick={handleLogout}>Sign out</WrapperContentPopup>
       
    </div>
  )
  const handleNavigateLogin = () => {
    navigate('/sign-in')
  }
  return (
    <div style={{ background: 'rgb(26, 148, 255)', justifyContent: 'center' }}> 
    <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset' }}>
      <Col span={5}>
        <WrapperTextHeader>   
            CONG MAI
        </WrapperTextHeader>
      </Col>
      {!isHiddenSearch && (
        <Col span={13}>
              <ButtonInputSearch 
                size= 'large'
                placeholder= 'Search for products, brands and more'
                textButton= 'Search' />
        </Col>
      )}
     
      <Col span={6} style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
     <Loading isLoading={isPending}>
        <WrapperHeaderAccount>
          {userAvatar ? (
                <img src={userAvatar} alt="avatar" style={{
                  height: '30px',
                  width: '30px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }} />
              ) : (
                <UserOutlined style={{ fontSize: '30px' }} />
              )}
              {user?.email ? (
                <>
                  <Popover content={content} trigger="click" open={isOpenPopup}>
                    <div style={{ cursor: 'pointer',maxWidth: 120, overflow: 'hidden', textWrap:'nowrap' }} onClick={() => setIsOpenPopup((prev) => !prev)}>{userName?.length ? userName : user?.email}</div>
                  </Popover>
                </>
              ) : (

            <div onClick={handleNavigateLogin} style={{ cursor: 'pointer'}}>
                <WrapperTextHeaderSmall>Sign in/ Sign up</WrapperTextHeaderSmall>
                <div>
                    <WrapperTextHeaderSmall>My Account</WrapperTextHeaderSmall>
                    <CaretDownOutlined />
                </div>
            </div>
          )}
            
        </WrapperHeaderAccount>
      </Loading>
      {!isHiddenCart && (
        <div>
          <Badge count={4} size="small">
            <ShoppingCartOutlined  style={{ fontSize: '30px', color: '#fff' }}/>
          </Badge>
            <WrapperTextHeaderSmall>Cart</WrapperTextHeaderSmall>

        </div>
      )}
        
      </Col>

    </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;