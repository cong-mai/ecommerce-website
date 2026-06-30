import { LaptopOutlined, MobileOutlined, TabletOutlined, AppstoreOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { WrapperContent, WrapperLableText, WrapperTextValue } from './style'
import * as ProductService from '../../services/ProductService'

const CATEGORY_ICONS = {
    laptop: <LaptopOutlined />,
    phone: <MobileOutlined />,
    tablet: <TabletOutlined />,
}

const getIcon = (name) => {
    const key = name?.toLowerCase()
    return CATEGORY_ICONS[key] || <AppstoreOutlined />
}

const NavBarComponent = () => {
    const navigate = useNavigate()
    const [typeProducts, setTypeProducts] = useState([])

    useEffect(() => {
        ProductService.getAllTypeProduct().then((res) => {
            if (res?.status === 'OK') setTypeProducts(res.data)
        })
    }, [])

    const handleNavigate = (type) => {
        navigate(
            `/product/${type.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ /g, '_')}`,
            { state: type }
        )
    }

    return (
        <div>
            <WrapperLableText>Categories</WrapperLableText>
            <WrapperContent>
                {typeProducts.map((type) => (
                    <WrapperTextValue key={type} onClick={() => handleNavigate(type)}>
                        {getIcon(type)}
                        {type}
                    </WrapperTextValue>
                ))}
            </WrapperContent>
        </div>
    )
}

export default NavBarComponent
