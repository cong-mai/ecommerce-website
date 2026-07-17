import React from 'react'
import { Col, Row } from 'antd'
import { FacebookOutlined, YoutubeOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import LogoMark from '../LogoMark/LogoMark'

const WrapperFooter = styled.div`
    background-color: var(--color-primary);
    padding: 40px var(--space-page-x) 20px;
    color: var(--color-white);
    margin-top: auto;
`

const FooterTitle = styled.h4`
    color: var(--color-white);
    font-weight: 700;
    font-size: var(--font-size-sm);
    margin-bottom: 16px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`

const FooterLink = styled(Link)`
    display: block;
    color: rgba(255,255,255,0.85);
    font-size: var(--font-size-sm);
    margin-bottom: 8px;
    &:hover { color: var(--color-white); text-decoration: underline; }
`

const FooterText = styled.p`
    color: rgba(255,255,255,0.85);
    font-size: var(--font-size-sm);
    margin-bottom: 8px;
    margin: 0 0 8px;
`

const SocialIcon = styled.a`
    color: var(--color-white);
    font-size: var(--font-size-xl);
    margin-right: 14px;
    &:hover { color: rgba(255,255,255,0.7); }
`

const Divider = styled.div`
    border-top: 1px solid rgba(255,255,255,0.3);
    margin: 24px 0 16px;
`

const FooterComponent = () => {
    return (
        <WrapperFooter>
            <Row gutter={[32, 24]}>
                <Col xs={24} sm={12} md={6}>
                    <LogoMark />
                    <FooterText style={{ marginTop: 14 }}>Your trusted online shopping destination for electronics, phones, and accessories.</FooterText>
                    <div style={{ marginTop: 16 }}>
                        <SocialIcon href="#"><FacebookOutlined /></SocialIcon>
                        <SocialIcon href="#"><YoutubeOutlined /></SocialIcon>
                        <SocialIcon href="#"><InstagramOutlined /></SocialIcon>
                        <SocialIcon href="#"><TwitterOutlined /></SocialIcon>
                    </div>
                </Col>

                <Col xs={24} sm={12} md={6}>
                    <FooterTitle>Customer Support</FooterTitle>
                    <FooterLink to="#">Help Center</FooterLink>
                    <FooterLink to="#">How to Order</FooterLink>
                    <FooterLink to="#">Return Policy</FooterLink>
                    <FooterLink to="#">Track My Order</FooterLink>
                    <FooterLink to="#">Contact Us</FooterLink>
                </Col>

                <Col xs={24} sm={12} md={6}>
                    <FooterTitle>About Us</FooterTitle>
                    <FooterLink to="#">About Cong Mai</FooterLink>
                    <FooterLink to="#">Careers</FooterLink>
                    <FooterLink to="#">Privacy Policy</FooterLink>
                    <FooterLink to="#">Terms of Service</FooterLink>
                </Col>

                <Col xs={24} sm={12} md={6}>
                    <FooterTitle>Contact</FooterTitle>
                    <FooterText>📞 +1 (504) 344-5222</FooterText>
                    <FooterText>✉️ support@congmai.com</FooterText>
                    <FooterText style={{ marginTop: 12 }}>🕐 Mon – Sat: 8:00 AM – 10:00 PM</FooterText>
                </Col>
            </Row>

            <Divider />
            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.75)', fontSize: 'var(--font-size-sm)' }}>
                © {new Date().getFullYear()} Cong Mai. All rights reserved.
            </div>
        </WrapperFooter>
    )
}

export default FooterComponent
