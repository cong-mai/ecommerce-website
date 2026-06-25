import { Col, Row, Image } from "antd";
import React from "react";  
import imageProduct from '../../assets/images/test.jpg';
import imageProductSmall from '../../assets/images/imagesmall.webp';
import {WrapperStyleImageSmall, WrapperStyleColImage, WrapperStyleNameProduct, 
     WrapperStyleTextSell, WrapperPriceProduct, WrapperPriceTextProduct, WrapperAddressProduct, 
     WrapperQualityProduct, WrapperInputNumber} from './style'
import {StarFilled, MinusOutlined, PlusOutlined} from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'

const ProductDetailsComponent = () => {
     const onChange = () => {}
    return (
        <Row style={{padding: '16px', background: '#fff'}}>
            <Col span={10} style={{borderRight: '1px solid #e5e5e5', paddingRight: '8px'}}>
                <Image src={imageProduct} alt="image product" preview={false}/>
                <Row style={{paddingTop: '10px', justifyContent: 'space-between'}}>
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
             <Col span={14} style={{paddingLeft: '10px'}}>
                <WrapperStyleNameProduct>Iphone 15</WrapperStyleNameProduct>
                <div>
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
                     <WrapperStyleTextSell> | 500+ bought in past month</WrapperStyleTextSell>
           
                </div>
                <WrapperPriceProduct>
                    <WrapperPriceTextProduct>
                         $500
                    </WrapperPriceTextProduct>
                </WrapperPriceProduct>
                <WrapperAddressProduct>
                    <span>Ship to </span>
                    <span className="address">132 saint Helena Pl, New Orleans </span>
                    <span className="change-address"> - Change address </span>
                </WrapperAddressProduct>
          
               <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
                    <div style={{ marginBottom: '10px' }}>Quality: </div>
                    <WrapperQualityProduct>
                         <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                              <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                         </button>
                         <WrapperInputNumber onChange={onChange} defaultValue={3} min={1} max={3} />
                         <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} >
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
                                textButton={'Buy'}
                                styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                            ></ButtonComponent>
                            
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
    )
}

export default ProductDetailsComponent