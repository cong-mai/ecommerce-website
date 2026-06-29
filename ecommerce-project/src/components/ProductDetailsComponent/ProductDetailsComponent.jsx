import { Col, Row, Image, Rate, message } from "antd";
import React, { useEffect, useState } from "react";
import imageProductSmall from '../../assets/images/imagesmall.webp';
import {
     WrapperStyleImageSmall, WrapperStyleColImage, WrapperStyleNameProduct,
     WrapperStyleTextSell, WrapperPriceProduct, WrapperPriceTextProduct, WrapperAddressProduct,
     WrapperQualityProduct, WrapperInputNumber
} from './style'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import * as ProductService from '../../services/ProductService'
import { useQuery } from "@tanstack/react-query";
import Loading from "../LoadingComponent/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct, resetOrder } from "../../redux/slides/orderSlide";

const ProductDetailsComponent = ({ idProduct }) => {
     const [numProduct, setNumProduct] = useState(1)
     const user = useSelector((state) => state.user)
     const order = useSelector((state) => state.order)
     const navigate = useNavigate()
     const location = useLocation()
     const dispatch = useDispatch()
     const [errorLimitOrder, setErrorLimitOrder] = useState(false)
     const onChange = (value) => {
          setNumProduct(Number(value))
     }
     const fetchGetDetailsProduct = async (context) => {
          const id = context?.queryKey && context?.queryKey[1]
          if (id) {
               const res = await ProductService.getDetailProduct(id)
               return res.data
          }
     }

     useEffect(() => {
          const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
          if ((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
               setErrorLimitOrder(false)
          } else if (productDetails?.countInStock === 0) {
               setErrorLimitOrder(true)
          }
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [numProduct])

     useEffect(() => {
          if (order.isSucessOrder) {
               message.success('Added to cart')
          } else if (order.isErrorOrder) {
               message.error('Product is out of stock')
          }
          return () => {
               dispatch(resetOrder())
          }
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [order.isSucessOrder, order.isErrorOrder])

     const handleChangeCount = (type, limited) => {
          if (type === 'increase') {
               if (!limited) {
                    setNumProduct(numProduct + 1)
               }
          } else {
               if (!limited) {
                    setNumProduct(numProduct - 1)
               }
          }
     }
     const { isPending, data: productDetails } = useQuery({ queryKey: ['product-details', idProduct], queryFn: fetchGetDetailsProduct, enabled: !!idProduct })
     const handleAddOrderProduct = () => {
          if (!user?.id) {
               navigate('/sign-in', { state: location?.pathname })
               return
          }
          if (!productDetails?.countInStock) {
               setErrorLimitOrder(true)
               return
          }
          const orderRedux = order.orderItems?.find((item) => item.product === productDetails?._id)
          if (!orderRedux || (orderRedux.amount + numProduct) <= orderRedux.countInstock) {
               dispatch(addOrderProduct({
                    orderItem: {
                         name: productDetails?.name,
                         amount: numProduct,
                         image: productDetails?.image,
                         price: productDetails?.price,
                         product: productDetails?._id,
                         discount: productDetails?.discount,
                         countInstock: productDetails?.countInStock,
                    }
               }))
          } else {
               setErrorLimitOrder(true)
          }
     }
     return (
          <Loading isLoading={isPending}>
               <Row style={{ padding: '16px', background: '#fff' }}>
                    <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px' }}>
                         <Image src={productDetails?.image} alt="image product" preview={false} />
                         <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
                              <WrapperStyleColImage span={4} >
                                   <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                              </WrapperStyleColImage>

                              <WrapperStyleColImage span={4} >
                                   <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                              </WrapperStyleColImage>

                              <WrapperStyleColImage span={4} >
                                   <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                              </WrapperStyleColImage>

                              <WrapperStyleColImage span={4} >
                                   <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                              </WrapperStyleColImage>

                              <WrapperStyleColImage span={4} >
                                   <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                              </WrapperStyleColImage>

                              <WrapperStyleColImage span={4} >
                                   <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                              </WrapperStyleColImage>

                         </Row>
                    </Col>
                    <Col span={14} style={{ paddingLeft: '10px' }}>
                         <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>
                         <div>
                              <Rate allowHalf defaultValue={productDetails?.rating} value={productDetails?.rating} />
                              <WrapperStyleTextSell> | 500+ bought in past month</WrapperStyleTextSell>

                         </div>
                         <WrapperPriceProduct>
                              <WrapperPriceTextProduct>
                                   ${productDetails?.price}
                              </WrapperPriceTextProduct>
                         </WrapperPriceProduct>
                         <WrapperAddressProduct>
                              <span>Ship to </span>
                              <span className="address">{user?.address} </span>
                              <span className="change-address"> - Change address </span>
                         </WrapperAddressProduct>

                         <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
                              <div style={{ marginBottom: '10px' }}>Quality: </div>
                              <WrapperQualityProduct>
                                   <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', numProduct === 1)}>
                                        <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                                   </button>
                                   <WrapperInputNumber onChange={onChange} defaultValue={1} min={1} max={productDetails?.countInStock} value={numProduct} />
                                   <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase', numProduct === productDetails?.countInStock)}>
                                        <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
                                   </button>
                              </WrapperQualityProduct>
                         </div>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <div>
                                   <ButtonComponent
                                        size={40}
                                        styleButton={{
                                             background: 'rgb(255, 57, 69)',
                                             height: '48px',
                                             width: '220px',
                                             border: 'none',
                                             borderRadius: '4px'
                                        }}
                                        onClick={handleAddOrderProduct}
                                        textButton={'Buy'}
                                        styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                                   ></ButtonComponent>
                                   {errorLimitOrder && <div style={{ color: 'red' }}>Out of stock</div>}
                              </div>
                              <ButtonComponent
                                   size={40}
                                   styleButton={{
                                        background: '#fff',
                                        height: '48px',
                                        width: '220px',
                                        border: '1px solid rgb(13, 92, 182)',
                                        borderRadius: '4px'
                                   }}
                                   textButton={'Payment'}
                                   styleTextButton={{ color: 'rgb(13, 92, 182)', fontSize: '15px' }}
                              ></ButtonComponent>
                         </div>
                    </Col>
               </Row>
          </Loading>
     )
}

export default ProductDetailsComponent