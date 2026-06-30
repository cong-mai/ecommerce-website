import { Form, Radio } from 'antd'
import React, { useEffect, useState } from 'react'
import { Lable, WrapperCard, WrapperInfo, WrapperLeft, WrapperRadio, WrapperRight, WrapperSummaryCard, WrapperTotal } from './style';

import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as  UserService from '../../services/UserService'
import * as OrderService from '../../services/OrderService'
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/userSlide';
import { useNavigate } from 'react-router-dom';
import { removeAllOrderProduct } from '../../redux/slides/orderSlide';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import * as PaymentService from '../../services/PaymentService'

const PaymentPage = () => {
  const order = useSelector((state) => state.order)
  const user = useSelector((state) => state.user)

  const [delivery, setDelivery] = useState('fast')
  const [payment, setPayment] = useState('later_money')
  const navigate = useNavigate()
  const [paypalClientId, setPaypalClientId] = useState('')

  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: ''
  })
  const [form] = Form.useForm();

  const dispatch = useDispatch()


  useEffect(() => {
    form.setFieldsValue(stateUserDetails)
  }, [form, stateUserDetails])

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetails({
        city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenModalUpdateInfo])

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true)
  }

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSlected?.reduce((total, cur) => {
      return total + ((cur.price * cur.amount))
    }, 0)
    return result
  }, [order])

  const priceDiscountMemo = useMemo(() => {
    const result = order?.orderItemsSlected?.reduce((total, cur) => {
      const totalDiscount = cur.discount ? cur.discount : 0
      return total + (priceMemo * (totalDiscount * cur.amount) / 100)
    }, 0)
    if (Number(result)) {
      return result
    }
    return 0
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order])

  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo >= 20 && priceMemo < 50) {
      return 10
    } else if (priceMemo >= 50 || order?.orderItemsSlected?.length === 0) {
      return 0
    } else {
      return 20
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceMemo])

  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
  }, [priceMemo, priceDiscountMemo, diliveryPriceMemo])

  const handleAddOrder = () => {
    if (user?.access_token && order?.orderItemsSlected && user?.name
      && user?.address && user?.phone && user?.city && priceMemo && user?.id) {
      // eslint-disable-next-line no-unused-expressions
      mutationAddOrder.mutate(
        {
          token: user?.access_token,
          orderItems: order?.orderItemsSlected,
          fullName: user?.name,
          address: user?.address,
          phone: user?.phone,
          city: user?.city,
          paymentMethod: payment,
          itemsPrice: priceMemo,
          shippingPrice: diliveryPriceMemo,
          totalPrice: totalPriceMemo,
          user: user?.id,
          email: user?.email
        }
      )
    }
  }

  const mutationUpdate = useMutationHooks(
    (data) => {
      const { id,
        token,
        ...rests } = data
      const res = UserService.updateUser(
        id,
        { ...rests }, token)
      return res
    },
  )

  const mutationAddOrder = useMutationHooks(
    (data) => {
      const {
        token,
        ...rests } = data
      const res = OrderService.createOrder(
        { ...rests }, token)
      return res
    },
  )

  const { isPending } = mutationUpdate
  const { data: dataAdd, isPending: isLoadingAddOrder, isSuccess, isError } = mutationAddOrder

  useEffect(() => {
    if (isSuccess && dataAdd?.status === 'OK') {
      const arrayOrdered = []
      order?.orderItemsSlected?.forEach(element => {
        arrayOrdered.push(element.product)
      });
      dispatch(removeAllOrderProduct({ listChecked: arrayOrdered }))
      message.success('Order placed successfully')
      navigate('/orderSuccess', {
        state: {
          delivery,
          payment,
          orders: order?.orderItemsSlected,
          totalPriceMemo: totalPriceMemo
        }
      })
    } else if (isSuccess && dataAdd?.status === 'ERR') {
      message.error(dataAdd?.message || 'Order failed')
    } else if (isError) {
      message.error('Something went wrong')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError])

  const handleCancleUpdate = () => {
    setStateUserDetails({
      name: '',
      email: '',
      phone: '',
      isAdmin: false,
    })
    form.resetFields()
    setIsOpenModalUpdateInfo(false)
  }

  const onSuccessPaypal = (details, data) => {
    mutationAddOrder.mutate(
      {
        token: user?.access_token,
        orderItems: order?.orderItemsSlected,
        fullName: user?.name,
        address: user?.address,
        phone: user?.phone,
        city: user?.city,
        paymentMethod: payment,
        itemsPrice: priceMemo,
        shippingPrice: diliveryPriceMemo,
        totalPrice: totalPriceMemo,
        user: user?.id,
        isPaid: true,
        paidAt: details.update_time,
        email: user?.email
      }
    )
  }


  const handleUpdateInforUser = () => {
    const { name, address, city, phone } = stateUserDetails
    if (name && address && city && phone) {
      mutationUpdate.mutate({ id: user?.id, token: user?.access_token, ...stateUserDetails }, {
        onSuccess: () => {
          dispatch(updateUser({ name, address, city, phone }))
          setIsOpenModalUpdateInfo(false)
        }
      })
    }
  }

  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value
    })
  }
  const handleDilivery = (e) => {
    setDelivery(e.target.value)
  }

  const handlePayment = (e) => {
    setPayment(e.target.value)
  }

  useEffect(() => {
    PaymentService.getConfig().then(({ data }) => {
      if (data) setPaypalClientId(data)
    }).catch(() => { })
  }, [])

  return (
    <div style={{ background: '#ececec', width: '100%', minHeight: '75vh' }}>
      <div style={{ boxSizing: 'border-box', padding: '24px 120px 40px', maxWidth: '1300px', margin: '0 auto' }}>
        <Loading isLoading={isLoadingAddOrder}>
          <h3 style={{ fontWeight: 700, color: '#333' }}>Payment</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start', gap: '0 24px' }}>
            <WrapperLeft>
              <WrapperCard>
                <Lable>Choose delivery method</Lable>
                <WrapperRadio onChange={handleDilivery} value={delivery}>
                  <Radio value="fast"><span style={{ color: '#ea8500', fontWeight: 'bold' }}>FAST</span> Economy delivery</Radio>
                  <Radio value="gojek"><span style={{ color: '#ea8500', fontWeight: 'bold' }}>GO_JEK</span> Economy delivery</Radio>
                </WrapperRadio>
              </WrapperCard>
              <WrapperCard>
                <Lable>Choose payment method</Lable>
                <WrapperRadio onChange={handlePayment} value={payment}>
                  <Radio value="later_money"> Cash on delivery</Radio>
                  <Radio value="paypal"> Pay with PayPal</Radio>
                </WrapperRadio>
              </WrapperCard>
            </WrapperLeft>
            <WrapperRight>
              <WrapperSummaryCard>
                <WrapperInfo>
                  <div>
                    <span>Address: </span>
                    <span style={{ fontWeight: 'bold' }}>{`${user?.address} ${user?.city}`} </span>
                    <span onClick={handleChangeAddress} style={{ color: 'rgb(26, 148, 255)', cursor: 'pointer' }}>Change</span>
                  </div>
                </WrapperInfo>
                <WrapperInfo>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Subtotal</span>
                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>${priceMemo}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Discount</span>
                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>-${priceDiscountMemo}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Delivery fee</span>
                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>${diliveryPriceMemo}</span>
                  </div>
                </WrapperInfo>
                <WrapperTotal>
                  <span>Total</span>
                  <span style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>${totalPriceMemo}</span>
                    <span style={{ color: '#000', fontSize: '11px' }}>(TAX included if applicable)</span>
                  </span>
                </WrapperTotal>
              </WrapperSummaryCard>
              {payment === 'paypal' && paypalClientId ? (
                <PayPalScriptProvider options={{ clientId: paypalClientId, currency: 'USD' }}>
                  <PayPalButtons
                    style={{ layout: 'horizontal', height: 48 }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [{ amount: { value: String(totalPriceMemo) } }]
                      })
                    }}
                    onApprove={async (data, actions) => {
                      const details = await actions.order.capture()
                      onSuccessPaypal(details, data)
                    }}
                  />
                </PayPalScriptProvider>
              ) : payment === 'paypal' && !paypalClientId ? (
                <div style={{ color: '#999', fontSize: '13px', marginTop: '8px' }}>Loading PayPal...</div>
              ) : (
                <ButtonComponent
                  onClick={() => handleAddOrder()}
                  size={40}
                  styleButton={{
                    background: 'rgb(255, 57, 69)',
                    height: '48px',
                    width: '320px',
                    border: 'none',
                    borderRadius: '4px'
                  }}
                  textButton={'Place Order'}
                  styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                ></ButtonComponent>
              )}
            </WrapperRight>
          </div>
          <ModalComponent
            title={<span style={{ fontSize: '17px', fontWeight: 700, color: '#333' }}>Update delivery information</span>}
            open={isOpenModalUpdateInfo}
            onCancel={handleCancleUpdate}
            onOk={handleUpdateInforUser}
            okText="Save changes"
            cancelText="Cancel"
            centered
            width={480}
            okButtonProps={{ style: { background: 'rgb(26, 148, 255)', borderColor: 'rgb(26, 148, 255)', fontWeight: 600 } }}
            cancelButtonProps={{ style: { fontWeight: 500 } }}
          >
            <Loading isLoading={isPending}>
              <Form
                name="basic"
                layout="vertical"
                requiredMark={false}
                style={{ marginTop: '12px' }}
                autoComplete="on"
                form={form}
              >
                <Form.Item
                  label={<span style={{ fontWeight: 600, color: '#333' }}>Name</span>}
                  name="name"
                  rules={[{ required: true, message: 'Please input your name!' }]}
                >
                  <InputComponent size="large" value={stateUserDetails['name']} onChange={handleOnchangeDetails} name="name" />
                </Form.Item>
                <Form.Item
                  label={<span style={{ fontWeight: 600, color: '#333' }}>City</span>}
                  name="city"
                  rules={[{ required: true, message: 'Please input your city!' }]}
                >
                  <InputComponent size="large" value={stateUserDetails['city']} onChange={handleOnchangeDetails} name="city" />
                </Form.Item>
                <Form.Item
                  label={<span style={{ fontWeight: 600, color: '#333' }}>Phone</span>}
                  name="phone"
                  rules={[{ required: true, message: 'Please input your  phone!' }]}
                >
                  <InputComponent size="large" value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" />
                </Form.Item>
                <Form.Item
                  label={<span style={{ fontWeight: 600, color: '#333' }}>Address</span>}
                  name="address"
                  rules={[{ required: true, message: 'Please input your  address!' }]}
                  style={{ marginBottom: 0 }}
                >
                  <InputComponent size="large" value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address" />
                </Form.Item>
              </Form>
            </Loading>
          </ModalComponent>
        </Loading>
      </div>
    </div>
  )
}

export default PaymentPage