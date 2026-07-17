import React from 'react'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import InputForm from '../../components/inputForm/inputForm'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight, WrapperContainerLogin, WrapperCard } from './style'
import LogoMark from '../../components/LogoMark/LogoMark'
import { useState } from 'react'
import { EyeFilled, EyeInvisibleFilled, ShoppingOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import * as message from '../../components/Message/Message'
import { useEffect } from 'react'

const SignUpPage = () => {
  const navigate = useNavigate()

  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }

 const mutation = useMutationHooks(
    data => UserService.signupUser(data)
  )

  const { data, isPending, isSuccess, isError } = mutation
  useEffect(() => {
    if (isSuccess) {
      message.success()
      handleNavigateSignIn()
    } else if (isError) {
      message.error()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError])

  const handleOnchangePassword = (value) => {
    setPassword(value)
  }

  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value)
  }

  const handleNavigateSignIn = () => {
    navigate('/sign-in')
  }

  const handleSignUp = () => {
    mutation.mutate({ email, password, confirmPassword })
  }

  return (
    <WrapperContainerLogin>
      <WrapperCard>
        <WrapperContainerLeft>
          <h1>Hello</h1>
          <p>Sign In and Create an account</p>
          <InputForm style={{ marginBottom: '10px' }} placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail} />
          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px'
              }}
            >{
                isShowPassword ? (
                  <EyeFilled />
                ) : (
                  <EyeInvisibleFilled />
                )
              }
            </span>
            <InputForm placeholder="password" style={{ marginBottom: '10px' }} type={isShowPassword ? "text" : "password"}
              value={password} onChange={handleOnchangePassword} />
          </div>
          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px'
              }}
            >{
                isShowConfirmPassword ? (
                  <EyeFilled />
                ) : (
                  <EyeInvisibleFilled />
                )
              }
            </span>
            <InputForm placeholder="comfirm password" type={isShowConfirmPassword ? "text" : "password"}
              value={confirmPassword} onChange={handleOnchangeConfirmPassword}
            />
          </div>
          {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
          <Loading isLoading={isPending}>
            <ButtonComponent
              disabled={!email.length || !password.length || !confirmPassword.length}
              onClick={handleSignUp}
              size={40}
              styleButton={{
                background: 'var(--color-danger)',
                height: '48px',
                width: '100%',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                margin: '26px 0 10px'
              }}
              textButton={'Sign up'}
              styleTextButton={{ color: 'var(--color-white)', fontSize: 'var(--font-size-sm)', fontWeight: '700' }}
            ></ButtonComponent>
          </Loading>
          <p>Do you have an account? <WrapperTextLight onClick={handleNavigateSignIn}> Sign In</WrapperTextLight></p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <LogoMark size="lg" variant="onLight" layout="column" />
          <ShoppingOutlined style={{ fontSize: '40px', color: 'var(--color-primary)', marginTop: '18px' }} />
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', marginTop: '10px', textAlign: 'center', padding: '0 24px' }}>
            Shop electronics, phones and more.
          </p>
        </WrapperContainerRight>
      </WrapperCard>
    </WrapperContainerLogin>
  )
}

export default SignUpPage