import React from 'react'
import { Lable, WrapperInfo, WrapperContainer, WrapperValue, WrapperItemOrder, WrapperItemOrderInfo, WrapperTotal } from './style';
import Loading from '../../components/LoadingComponent/Loading';
import { useLocation } from 'react-router-dom';
import { orderContant } from '../../contant';


const OrderSucess = () => {
  const location = useLocation()
  const { state } = location
  return (
    <div style={{ background: '#ececec', width: '100%', minHeight: '80vh' }}>
      <Loading isLoading={false}>
        <div style={{ boxSizing: 'border-box', padding: '24px 120px 40px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <span style={{
              width: '32px', height: '32px', borderRadius: '50%', background: 'rgb(82, 196, 26)',
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px'
            }}>✓</span>
            <h3 style={{ fontWeight: 700, color: '#333', margin: 0 }}>Order placed successfully</h3>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <WrapperContainer>
              <WrapperInfo>
                <Lable>Delivery method</Lable>
                <WrapperValue>
                  <span style={{ color: '#ea8500', fontWeight: 'bold' }}>{orderContant.delivery[state?.delivery]}</span> Economy delivery
                </WrapperValue>
              </WrapperInfo>
              <WrapperInfo>
                <Lable>Payment method</Lable>
                <WrapperValue>
                  {orderContant.payment[state?.payment]}
                </WrapperValue>
              </WrapperInfo>
              <WrapperItemOrderInfo>
                {state.orders?.map((order) => {
                  return (
                    <WrapperItemOrder key={order?.name}>
                      <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={order.image} alt={order?.name} style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }} />
                        <div style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          fontSize: '14px',
                          color: '#333',
                          fontWeight: 500
                        }}>{order?.name}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 }}>
                        <span style={{ fontSize: '13px', color: '#666' }}>Price: <b style={{ color: '#242424' }}>${order?.price}</b></span>
                        <span style={{ fontSize: '13px', color: '#666' }}>Quantity: <b style={{ color: '#242424' }}>{order?.amount}</b></span>
                      </div>
                    </WrapperItemOrder>
                  )
                })}
              </WrapperItemOrderInfo>
              <WrapperTotal>
                <span style={{ fontSize: '15px', fontWeight: 600, color: '#333' }}>Total</span>
                <span style={{ fontSize: '22px', color: 'rgb(254, 56, 52)', fontWeight: 700 }}>${state?.totalPriceMemo}</span>
              </WrapperTotal>
            </WrapperContainer>
          </div>
        </div>
      </Loading>
    </div>
  )
}

export default OrderSucess