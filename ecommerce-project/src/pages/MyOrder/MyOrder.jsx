import React, { useEffect } from 'react'
import Loading from '../../components/LoadingComponent/Loading';
import { useQuery } from '@tanstack/react-query';
import * as OrderService from '../../services/OrderService'
import { useSelector } from 'react-redux';
import { WrapperItemOrder, WrapperListOrder, WrapperHeaderItem, WrapperFooterItem, WrapperContainer, WrapperStatus, WrapperStatusBadge } from './style';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as message from '../../components/Message/Message'

const MyOrderPage = () => {
  const location = useLocation()
  const { state } = location
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const userId = state?.id || user?.id
  const token = state?.token || user?.access_token

  const fetchMyOrder = async () => {
    const res = await OrderService.getOrderByUserId(userId, token)
    return res.data
  }

  const queryOrder = useQuery({
    queryKey: ['orders', userId],
    queryFn: fetchMyOrder,
    enabled: !!(userId && token)
  })
  const { isPending, data } = queryOrder

  const handleDetailsOrder = (id) => {
    navigate(`/details-order/${id}`, {
      state: {
        token: state?.token
      }
    })
  }

  const mutation = useMutationHooks(
    (data) => {
      const { id, token, orderItems, userId } = data
      const res = OrderService.cancelOrder(id, token, orderItems, userId)
      return res
    }
  )

  const handleCanceOrder = (order) => {
    mutation.mutate({ id: order._id, token: state?.token, orderItems: order?.orderItems, userId: user.id }, {
      onSuccess: () => {
        queryOrder.refetch()
      },
    })
  }
  const { isPending: isLoadingCancel, isSuccess: isSuccessCancel, isError: isErrorCancle, data: dataCancel } = mutation


  useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === 'OK') {
      message.success()
    } else if (isSuccessCancel && dataCancel?.status === 'ERR') {
      message.error(dataCancel?.message)
    } else if (isErrorCancle) {
      message.error()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorCancle, isSuccessCancel])

  const renderProduct = (data) => {
    return data?.map((order) => {
      return <WrapperHeaderItem key={order?._id}>
        <img src={order?.image} alt={order?.name}
          style={{
            width: '64px',
            height: '64px',
            objectFit: 'cover',
            borderRadius: '6px',
            border: '1px solid rgb(238, 238, 238)',
            flexShrink: 0
          }}
        />
        <div style={{
          flex: 1,
          minWidth: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          marginLeft: '14px',
          fontSize: '14px',
          color: '#333',
          fontWeight: 500
        }}>{order?.name}</div>
        <span style={{ fontSize: '14px', color: '#242424', fontWeight: 600, marginLeft: '16px', flexShrink: 0 }}>${order?.price}</span>
      </WrapperHeaderItem>
    })
  }

  return (
    <Loading isLoading={isPending || isLoadingCancel}>
      <WrapperContainer>
        <div style={{ boxSizing: 'border-box', padding: '24px 120px 40px', margin: '0 auto' }}>
          <h2 style={{ fontWeight: 700, color: '#333' }}>My Orders</h2>
          {!isPending && !data?.length && (
            <div style={{ textAlign: 'center', color: '#888', fontSize: '14px', marginTop: '40px' }}>
              You have no orders yet.
            </div>
          )}
          <WrapperListOrder>
            {data?.map((order) => {
              return (
                <WrapperItemOrder key={order?._id}>
                  <WrapperStatus>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#333' }}>Status</span>
                    <WrapperStatusBadge $active={order.isDelivered}>
                      {order.isDelivered ? 'Delivered' : 'Not delivered'}
                    </WrapperStatusBadge>
                    <WrapperStatusBadge $active={order.isPaid}>
                      {order.isPaid ? 'Paid' : 'Not paid'}
                    </WrapperStatusBadge>
                  </WrapperStatus>
                  {renderProduct(order?.orderItems)}
                  <WrapperFooterItem>
                    <div>
                      <span style={{ color: '#666', fontSize: '13px' }}>Total: </span>
                      <span
                        style={{ fontSize: '18px', color: 'rgb(254, 56, 52)', fontWeight: 700 }}
                      >${order?.totalPrice}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <ButtonComponent
                        onClick={() => handleCanceOrder(order)}
                        size={40}
                        styleButton={{
                          height: '36px',
                          background: '#fff',
                          border: '1px solid rgb(255, 77, 79)',
                          borderRadius: '6px'
                        }}
                        textButton={'Cancel order'}
                        styleTextButton={{ color: 'rgb(255, 77, 79)', fontSize: '14px', fontWeight: 500 }}
                      >
                      </ButtonComponent>
                      <ButtonComponent
                        onClick={() => handleDetailsOrder(order?._id)}
                        size={40}
                        styleButton={{
                          height: '36px',
                          background: 'rgb(26, 148, 255)',
                          border: 'none',
                          borderRadius: '6px'
                        }}
                        textButton={'View details'}
                        styleTextButton={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}
                      >
                      </ButtonComponent>
                    </div>
                  </WrapperFooterItem>
                </WrapperItemOrder>
              )
            })}
          </WrapperListOrder>
        </div>
      </WrapperContainer>
    </Loading>
  )
}

export default MyOrderPage