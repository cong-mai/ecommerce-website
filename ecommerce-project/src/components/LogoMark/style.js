import styled from "styled-components";

const badgeSize = { sm: 26, md: 34, lg: 56 }
const badgeFont = { sm: 11, md: 14, lg: 22 }
const textSize = { sm: 'var(--font-size-sm)', md: 'var(--font-size-md)', lg: 'var(--font-size-lg)' }

export const WrapperLogoMark = styled.div`
    display: inline-flex;
    align-items: center;
    gap: ${(props) => (props.$layout === 'column' ? '10px' : '8px')};
    flex-direction: ${(props) => (props.$layout === 'column' ? 'column' : 'row')};
`

export const WrapperLogoBadge = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: ${(props) => badgeSize[props.$size || 'md']}px;
    height: ${(props) => badgeSize[props.$size || 'md']}px;
    border-radius: ${(props) => (props.$size === 'lg' ? '16px' : '9px')};
    background: ${(props) => (props.$variant === 'onLight'
        ? 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)'
        : 'linear-gradient(135deg, #ffffff 0%, #d8ecff 100%)')};
    color: ${(props) => (props.$variant === 'onLight' ? 'var(--color-white)' : 'var(--color-primary-hover)')};
    font-weight: 800;
    font-size: ${(props) => badgeFont[props.$size || 'md']}px;
    letter-spacing: -0.5px;
    flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
`

export const WrapperLogoText = styled.span`
    font-size: ${(props) => textSize[props.$size || 'md']};
    font-weight: 800;
    letter-spacing: 0.2px;
    white-space: nowrap;
    color: ${(props) => (props.$variant === 'onLight' ? 'var(--color-text)' : 'var(--color-white)')};
`
