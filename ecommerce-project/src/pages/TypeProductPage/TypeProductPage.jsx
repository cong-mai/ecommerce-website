import React, { useEffect, useState } from "react";
import NavBarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Row, Pagination } from 'antd';
import { WrapperProducts, WrapperNavbar, WrapperCategoryTitle } from "./style";
import * as ProductService from '../../services/ProductService'
import { useLocation } from "react-router-dom";
import Loading from "../../components/LoadingComponent/Loading";
import { useSelector } from 'react-redux'
import { useDebounce } from '../../hooks/useDebounce'

const TypeProductPage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 500)

    const { state } = useLocation()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [panigate, setPanigate] = useState({
        page: 0,
        limit: 12,
        total: 1,
    })

    const fetchProductType = async (type, page, limit) => {
        setLoading(true)
        const res = await ProductService.getProductType(type, page, limit)
        if (res?.status === 'OK') {
            setLoading(false)
            setProducts(res?.data)
            setPanigate((prev) => ({ ...prev, total: res?.totalPage }))
        } else {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (state) {
            fetchProductType(state, panigate.page, panigate.limit)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, panigate.page, panigate.limit])

    const onChange = (current, pageSize) => {
        setPanigate((prev) => ({ ...prev, page: current - 1, limit: pageSize }))
    }

    const filteredProducts = products?.filter((pro) => {
        if (searchDebounce === '') return true
        return pro?.name?.toLowerCase()?.includes(searchDebounce?.toLowerCase())
    })

    return (
        <Loading isLoading={loading}>
            <div style={{ padding: '0 var(--space-page-x) 40px', background: 'var(--color-bg-page)', minHeight: 'calc(100vh - 140px)' }}>
                <Row style={{ alignItems: 'flex-start' }}>
                    {/* Sidebar */}
                    <WrapperNavbar xs={24} md={4}>
                        <NavBarComponent />
                    </WrapperNavbar>

                    {/* Main content */}
                    <Col xs={24} md={20} style={{ display: 'flex', flexDirection: 'column' }}>
                        <WrapperCategoryTitle>
                            {state}
                        </WrapperCategoryTitle>

                        <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-md)', padding: '16px 20px', marginTop: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                                {filteredProducts?.length || 0} products found
                            </div>

                            <WrapperProducts>
                                {filteredProducts?.map((product) => (
                                    <CardComponent
                                        key={product._id}
                                        countInStock={product.countInStock}
                                        description={product.description}
                                        image={product.image}
                                        name={product.name}
                                        price={product.price}
                                        rating={product.rating}
                                        type={product.type}
                                        selled={product.selled}
                                        discount={product.discount}
                                        id={product._id}
                                    />
                                ))}
                            </WrapperProducts>

                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
                                <Pagination
                                    current={panigate.page + 1}
                                    total={panigate?.total * panigate.limit}
                                    pageSize={panigate.limit}
                                    onChange={onChange}
                                    showSizeChanger={false}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Loading>
    )
}

export default TypeProductPage
