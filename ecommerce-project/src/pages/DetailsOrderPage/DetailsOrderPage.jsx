import React from 'react'
import { WrapperAllPrice, WrapperContentInfo, WrapperHeaderUser, WrapperInfoUser, WrapperItem, WrapperItemLabel, WrapperLabel, WrapperNameProduct, WrapperProduct, WrapperStyleContent, WrapperTableHeader } from './style'
import { useLocation, useParams } from 'react-router-dom'
import * as OrderService from '../../services/OrderService'
import { useQuery } from '@tanstack/react-query'
import { orderContant } from '../../contant'
import { useMemo } from 'react'
import Loading from '../../components/LoadingComponent/Loading'

const DetailsOrderPage = () => {
  const params = useParams()
  const location = useLocation()
  const { state } = location
  const { id } = params

  const fetchDetailsOrder = async () => {
    const res = await OrderService.getDetailsOrder(id, state?.token)
    return res.data
  }

  const queryOrder = useQuery({
    queryKey: ['orders-details', id],
    queryFn: fetchDetailsOrder,
    enabled: !!id
  })
  const { isPending, data } = queryOrder

  const priceMemo = useMemo(() => {
    const result = data?.orderItems?.reduce((total, cur) => {
      return total + ((cur.price * cur.amount))
    }, 0)
    return result
  }, [data])

  return (
    <Loading isLoading={isPending}>
      <div style={{ width: '100%', minHeight: '100vh', background: '#f5f5fa' }}>
        <div style={{ padding: '0 var(--space-page-x)', margin: '0 auto' }}>
          <h2>Order Details</h2>
          <WrapperHeaderUser>
            <WrapperInfoUser>
              <WrapperLabel>Recipient Address</WrapperLabel>
              <WrapperContentInfo>
                <div className='name-info'>{data?.shippingAddress?.fullName}</div>
                <div className='address-info'><span>Address: </span> {`${data?.shippingAddress?.address} ${data?.shippingAddress?.city}`}</div>
                <div className='phone-info'><span>Phone: </span> {data?.shippingAddress?.phone}</div>
              </WrapperContentInfo>
            </WrapperInfoUser>
            <WrapperInfoUser>
              <WrapperLabel>Delivery Method</WrapperLabel>
              <WrapperContentInfo>
                <div className='delivery-info'><span className='name-delivery'>FAST </span>Standard Delivery</div>
                <div className='delivery-fee'><span>Shipping fee: </span> ${data?.shippingPrice}</div>
              </WrapperContentInfo>
            </WrapperInfoUser>
            <WrapperInfoUser>
              <WrapperLabel>Payment Method</WrapperLabel>
              <WrapperContentInfo>
                <div className='payment-info'>{orderContant.payment[data?.paymentMethod]}</div>
                <div className='status-payment'>{data?.isPaid ? 'Paid' : 'Not paid'}</div>
              </WrapperContentInfo>
            </WrapperInfoUser>
          </WrapperHeaderUser>
          <WrapperStyleContent>
            <WrapperTableHeader>
              <WrapperNameProduct style={{ flex: 1 }}>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'rgba(0,0,0,0.45)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.3px' }}>Product</span>
              </WrapperNameProduct>
              <WrapperItemLabel>Price</WrapperItemLabel>
              <WrapperItemLabel>Quantity</WrapperItemLabel>
              <WrapperItemLabel>Discount</WrapperItemLabel>
            </WrapperTableHeader>

            {data?.orderItems?.map((order) => (
              <WrapperProduct key={order?._id}>
                <WrapperNameProduct>
                  <img src={order?.image} alt={order?.name}
                    style={{
                      width: '70px',
                      height: '70px',
                      objectFit: 'cover',
                      border: '1px solid rgb(238, 238, 238)',
                      padding: '2px',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {order?.name}
                  </div>
                </WrapperNameProduct>
                <WrapperItem>${order?.price}</WrapperItem>
                <WrapperItem>{order?.amount}</WrapperItem>
                <WrapperItem>{order?.discount ? `${order?.discount}%` : '0%'}</WrapperItem>
              </WrapperProduct>
            ))}

            <div style={{ marginTop: '16px', borderTop: '2px solid #f0f0f0', paddingTop: '12px', maxWidth: '360px', marginLeft: 'auto' }}>
              <WrapperAllPrice>
                <span style={{ color: 'rgba(0,0,0,0.65)', fontSize: 'var(--font-size-sm)' }}>Subtotal</span>
                <span style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)' }}>${priceMemo}</span>
              </WrapperAllPrice>
              <WrapperAllPrice>
                <span style={{ color: 'rgba(0,0,0,0.65)', fontSize: 'var(--font-size-sm)' }}>Shipping fee</span>
                <span style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)' }}>${data?.shippingPrice}</span>
              </WrapperAllPrice>
              <WrapperAllPrice style={{ borderTop: '2px solid #f0f0f0', marginTop: '8px', paddingTop: '12px' }}>
                <span style={{ fontWeight: 700, fontSize: 'var(--font-size-base)' }}>Total</span>
                <span style={{ fontWeight: 700, fontSize: 'var(--font-size-lg)', color: 'var(--color-danger)' }}>${data?.totalPrice}</span>
              </WrapperAllPrice>
            </div>
          </WrapperStyleContent>
        </div>
      </div>
    </Loading>
  )
}

export default DetailsOrderPage