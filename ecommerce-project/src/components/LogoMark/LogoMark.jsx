import React from 'react'
import { WrapperLogoMark, WrapperLogoBadge, WrapperLogoText } from './style'

const LogoMark = ({ size = 'md', variant = 'onDark', layout = 'row', className }) => {
    return (
        <WrapperLogoMark $layout={layout} className={className}>
            <WrapperLogoBadge $size={size} $variant={variant}>CM</WrapperLogoBadge>
            <WrapperLogoText $size={size} $variant={variant}>Cong Mai</WrapperLogoText>
        </WrapperLogoMark>
    )
}

export default LogoMark
