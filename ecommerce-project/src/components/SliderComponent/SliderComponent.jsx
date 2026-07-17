import React from 'react'
import { WrapperSliderStyle } from './style';

const SliderComponent = ({ children }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4500,
        adaptiveHeight: true
    };
    return (
        <WrapperSliderStyle {...settings}>
            {children}
        </WrapperSliderStyle>
    )
}

export default SliderComponent