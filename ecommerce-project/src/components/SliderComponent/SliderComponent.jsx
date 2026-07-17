import React from 'react'
import { WrapperSliderStyle } from './style';

const SliderComponent = ({ children }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 7000,
        adaptiveHeight: true
    };
    return (
        <WrapperSliderStyle {...settings}>
            {children}
        </WrapperSliderStyle>
    )
}

export default SliderComponent