import React, { useEffect, useState } from "react";
import { Badge, Col, Popover } from 'antd';
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount, WrapperTextHeaderSmall, WrapperContentPopup } from "./style";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import LogoMark from "../LogoMark/LogoMark";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slides/userSlide'
import Loading from '../LoadingComponent/Loading'
import { SearchProduct } from "../../redux/slides/productSile";
import { useScrollDirection } from "../../hooks/useScrollDirection";

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const hiddenOnScroll = useScrollDirection()
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [, setSearch] = useState('')
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const order = useSelector((state) => state.order)
  const [isPending, setLoading] = useState(false)
  const handleNavigateLogin = () => {
    navigate('/sign-in')
  }

  const handleLogout = async () => {
    setLoading(true)
    await UserService.logoutUser()
    dispatch(resetUser())
    setLoading(false)
  }

  useEffect(() => {
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
  }, [user?.name, user?.avatar])

  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate('/profile-user')}>My Profile</WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => handleClickNavigate('/system/admin')}>Admin Page</WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate('/my-order')}>My order</WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate()}>Sign out</WrapperContentPopup>

    </div>
  )
  const handleClickNavigate = (type) => {
    if (type === '/profile-user') {
      navigate('/profile-user')
    } else if (type === '/system/admin') {
      navigate('/system/admin')
    } else if (type === '/my-order') {
      navigate('/my-order', {
        state: {
          id: user?.id,
          token: user?.access_token
        }
      })
    } else {
      handleLogout()
    }
    setIsOpenPopup(false)
  }

  const onSearch = (e) => {
    setSearch(e.target.value)
    dispatch(SearchProduct(e.target.value))
  }
  return (
    <div style={{
      background: 'var(--color-primary)',
      justifyContent: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      transform: hiddenOnScroll ? 'translateY(-100%)' : 'translateY(0)',
      transition: 'transform 0.3s ease'
    }}>
      <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset' }}>
        <Col xs={{ span: 12, order: 1 }} sm={{ span: 12, order: 1 }} md={{ span: 5, order: 1 }}>
          <WrapperTextHeader to="/" style={{ cursor: 'pointer' }}>
            <LogoMark />
          </WrapperTextHeader>
        </Col>
        {!isHiddenSearch && (
          <Col xs={{ span: 24, order: 3 }} sm={{ span: 24, order: 3 }} md={{ span: 13, order: 2 }}>
            <ButtonInputSearch
              size='large'
              placeholder='Search for products, brands and more'
              textButton='Search'
              onChange={onSearch} />
          </Col>
        )}

        <Col
          xs={{ span: 12, order: 2 }}
          sm={{ span: 12, order: 2 }}
          md={{ span: 6, order: 3 }}
          style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'flex-end' }}>
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
                <UserOutlined style={{ fontSize: 'var(--font-size-2xl)' }} />
              )}
              {user?.email ? (
                <>
                  <Popover content={content} trigger="click" open={isOpenPopup}>
                    <div style={{ cursor: 'pointer', maxWidth: 120, overflow: 'hidden', textWrap: 'nowrap' }} onClick={() => setIsOpenPopup((prev) => !prev)}>{userName?.length ? userName : user?.email}</div>
                  </Popover>
                </>
              ) : (

                <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
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
            <div onClick={() => navigate('/order')} style={{ cursor: 'pointer' }}>
              <Badge count={order?.orderItems?.length} size="small">
                <ShoppingCartOutlined style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--color-white)' }} />
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