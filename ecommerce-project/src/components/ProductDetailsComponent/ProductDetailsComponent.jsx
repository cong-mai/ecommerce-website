import { Row, Image, Rate, message } from "antd";
import React, { useEffect, useState } from "react";
import imageProductSmall from '../../assets/images/imagesmall.webp';
import {
     WrapperStyleImageSmall, WrapperStyleColImage, WrapperStyleNameProduct,
     WrapperStyleTextSell, WrapperPriceProduct, WrapperPriceTextProduct,
     WrapperPriceDiscount, WrapperDiscountBadge,
     WrapperQualityProduct, WrapperInputNumber,
     WrapperCountButton, WrapperStockInfo,
     WrapperImageCol, WrapperInfoCol
} from './style'
import { MinusOutlined, PlusOutlined, ShoppingCartOutlined, ThunderboltOutlined } from '@ant-design/icons'
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
               if (!limited) setNumProduct(numProduct + 1)
          } else {
               if (!limited) setNumProduct(numProduct - 1)
          }
     }

     const { isPending, data: productDetails } = useQuery({
          queryKey: ['product-details', idProduct],
          queryFn: fetchGetDetailsProduct,
          enabled: !!idProduct
     })

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

     const originalPrice = productDetails?.discount
          ? Math.round(productDetails?.price / (1 - productDetails.discount / 100))
          : null

     return (
          <Loading isLoading={isPending}>
               <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                    <Row>
                         {/* Left: Images */}
                         <WrapperImageCol xs={24} md={10}>
                              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', background: '#fafafa', borderRadius: 'var(--radius-md)', padding: '16px' }}>
                                   <Image
                                        src={productDetails?.image}
                                        alt={productDetails?.name}
                                        preview={false}
                                        style={{ maxHeight: '320px', objectFit: 'contain' }}
                                   />
                              </div>
                              <Row gutter={[8, 8]} justify="center">
                                   {[...Array(6)].map((_, i) => (
                                        <WrapperStyleColImage key={i} span={4}>
                                             <WrapperStyleImageSmall
                                                  src={productDetails?.image || imageProductSmall}
                                                  alt={`img-${i}`}
                                                  preview={false}
                                             />
                                        </WrapperStyleColImage>
                                   ))}
                              </Row>
                         </WrapperImageCol>

                         {/* Right: Info */}
                         <WrapperInfoCol xs={24} md={14}>
                              {/* Name */}
                              <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>

                              {/* Rating */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                   <Rate allowHalf value={productDetails?.rating} disabled style={{ fontSize: 'var(--font-size-base)' }} />
                                   <WrapperStyleTextSell>({productDetails?.rating}) | 500+ bought in past month</WrapperStyleTextSell>
                              </div>

                              {/* Price */}
                              <WrapperPriceProduct>
                                   <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                        <WrapperPriceTextProduct>${productDetails?.price}</WrapperPriceTextProduct>
                                        {originalPrice && (
                                             <WrapperPriceDiscount>${originalPrice}</WrapperPriceDiscount>
                                        )}
                                        {productDetails?.discount > 0 && (
                                             <WrapperDiscountBadge>-{productDetails.discount}%</WrapperDiscountBadge>
                                        )}
                                   </div>
                              </WrapperPriceProduct>

                              {/* Stock */}
                              <WrapperStockInfo $inStock={productDetails?.countInStock > 0}>
                                   {productDetails?.countInStock > 0
                                        ? `✓ In stock (${productDetails.countInStock} available)`
                                        : '✗ Out of stock'}
                              </WrapperStockInfo>

                              {/* Quantity */}
                              <div style={{ margin: '16px 0', padding: '16px 0', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0' }}>
                                   <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '10px' }}>Quantity</div>
                                   <WrapperQualityProduct>
                                        <WrapperCountButton
                                             onClick={() => handleChangeCount('decrease', numProduct === 1)}
                                             disabled={numProduct === 1}
                                        >
                                             <MinusOutlined />
                                        </WrapperCountButton>
                                        <WrapperInputNumber
                                             onChange={onChange}
                                             defaultValue={1}
                                             min={1}
                                             max={productDetails?.countInStock}
                                             value={numProduct}
                                             size="small"
                                        />
                                        <WrapperCountButton
                                             onClick={() => handleChangeCount('increase', numProduct === productDetails?.countInStock)}
                                             disabled={numProduct === productDetails?.countInStock}
                                        >
                                             <PlusOutlined />
                                        </WrapperCountButton>
                                   </WrapperQualityProduct>
                                   {errorLimitOrder && (
                                        <div style={{ color: 'var(--color-danger)', fontSize: 'var(--font-size-sm)', marginTop: '6px' }}>
                                             ⚠ Product is out of stock or limit reached
                                        </div>
                                   )}
                              </div>

                              {/* Buttons */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                                   <ButtonComponent
                                        size={40}
                                        styleButton={{
                                             background: 'var(--color-danger)',
                                             height: '48px',
                                             flex: '1 1 150px',
                                             maxWidth: '200px',
                                             border: 'none',
                                             borderRadius: 'var(--radius-sm)',
                                             display: 'flex',
                                             alignItems: 'center',
                                             justifyContent: 'center',
                                             gap: '6px'
                                        }}
                                        onClick={handleAddOrderProduct}
                                        textButton={'Buy now'}
                                        styleTextButton={{ color: 'var(--color-white)', fontSize: 'var(--font-size-sm)', fontWeight: '700' }}
                                   />
                                   <ButtonComponent
                                        size={40}
                                        styleButton={{
                                             background: 'var(--color-white)',
                                             height: '48px',
                                             flex: '1 1 150px',
                                             maxWidth: '200px',
                                             border: '1px solid var(--color-primary)',
                                             borderRadius: 'var(--radius-sm)',
                                        }}
                                        onClick={handleAddOrderProduct}
                                        textButton={'Add to cart'}
                                        styleTextButton={{ color: 'var(--color-primary)', fontSize: 'var(--font-size-sm)', fontWeight: '600' }}
                                   />
                              </div>

                              {/* Sold */}
                              <div style={{ marginTop: '16px', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                                   <ShoppingCartOutlined style={{ marginRight: 4 }} />
                                   {productDetails?.selled || 0}+ sold
                                   <ThunderboltOutlined style={{ marginLeft: 12, marginRight: 4, color: '#faad14' }} />
                                   Fast delivery available
                              </div>
                         </WrapperInfoCol>
                    </Row>

                    {/* Description */}
                    {productDetails?.description && (
                         <div style={{ borderTop: '1px solid #f0f0f0', padding: '24px var(--space-4)' }}>
                              <div style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, color: 'var(--color-text)', marginBottom: '12px' }}>
                                   Product Description
                              </div>
                              <div style={{ fontSize: 'var(--font-size-sm)', lineHeight: '24px', color: 'var(--color-text-secondary)', whiteSpace: 'pre-wrap' }}>
                                   {productDetails.description}
                              </div>
                         </div>
                    )}
               </div>
          </Loading>
     )
}

export default ProductDetailsComponent
