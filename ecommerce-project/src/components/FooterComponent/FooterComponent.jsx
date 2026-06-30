import React from 'react'
import { Col, Row } from 'antd'
import { FacebookOutlined, YoutubeOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const WrapperFooter = styled.div`
    background-color: rgb(26, 148, 255);
    padding: 40px 120px 20px;
    color: #fff;
    margin-top: auto;
`

const FooterTitle = styled.h4`
    color: #fff;
    font-weight: 700;
    font-size: 15px;
    margin-bottom: 16px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`

const FooterLink = styled(Link)`
    display: block;
    color: rgba(255,255,255,0.85);
    font-size: 13px;
    margin-bottom: 8px;
    &:hover { color: #fff; text-decoration: underline; }
`

const FooterText = styled.p`
    color: rgba(255,255,255,0.85);
    font-size: 13px;
    margin-bottom: 8px;
    margin: 0 0 8px;
`

const SocialIcon = styled.a`
    color: #fff;
    font-size: 22px;
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
                    <FooterTitle>CONG MAI</FooterTitle>
                    <FooterText>Your trusted online shopping destination for electronics, phones, and accessories.</FooterText>
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
            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.75)', fontSize: 13 }}>
                © {new Date().getFullYear()} Cong Mai. All rights reserved.
            </div>
        </WrapperFooter>
    )
}

export default FooterComponent
