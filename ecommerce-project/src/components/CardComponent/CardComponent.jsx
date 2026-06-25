import React from "react";
import { StyleNameProduct,
    WrapperReportText, WrapperPriceText,
    WrapperDiscountText, WrapperCardStyle, WrapperStyleTextSell } from './style'
import {
  StarFilled,
} from '@ant-design/icons';
import logo from '../../assets/images/logo.png'

const CardComponent = (props) => { 
    const { name, price, rating, selled, discount } = props
    return (
    <WrapperCardStyle
        hoverable
        headStyle={{ width: '200px', height: '200px' }}
        variant="borderless"
        style={{ width: 200 }}
        bodyStyle={{padding: '10px'}}
        cover={
        <img draggable={false}alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
        >
            <img
                src={logo}
                alt="logo"
                style={{
                    width: '68px',
                    height: '14px',
                    position: 'absolute',
                    top: -1,
                    left: -1,
                    borderTopLeftRadius: '3px'
                }}
            />
        <StyleNameProduct>{name}</StyleNameProduct>
        <WrapperReportText>
            <span style={{ marginRight: '4px' }}>
                <span>{rating} </span><StarFilled style={{fontSize: '12px', color: 'yellow'}}/>
            </span>
            <WrapperStyleTextSell>{selled || 1000}+ bought</WrapperStyleTextSell>
           
        </WrapperReportText>
         <WrapperPriceText>
           <span style={{ marginRight: '8px' }}>${price}</span>
                <WrapperDiscountText>
                    {discount || 5}%
                </WrapperDiscountText>
        </WrapperPriceText>
    </WrapperCardStyle>
    );
}   

export default CardComponent;