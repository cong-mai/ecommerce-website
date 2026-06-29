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
        limit: 10,
        total: 1,
    })
    const fetchProductType = async (type, page, limit) => {
        setLoading(true)
        const res = await ProductService.getProductType(type, page, limit)
        if (res?.status === 'OK') {
            setLoading(false)
            setProducts(res?.data)
            setPanigate({ ...panigate, total: res?.totalPage })
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
        setPanigate({ ...panigate, page: current - 1, limit: pageSize })
    }
    return (
        <Loading isLoading={loading}>
            <div style={{ padding: '0 120px', background: '#efefef', display: 'flex', flexDirection: 'column' }}>
                <Row style={{ flexWrap: 'nowrap', paddingTop: '10px', flex: 1 }}>
                    <WrapperNavbar span={4} >
                        <NavBarComponent />
                    </WrapperNavbar>
                    <Col span={20} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <WrapperCategoryTitle>{state}</WrapperCategoryTitle>
                        <WrapperProducts >
                            {products?.filter((pro) => {
                                if (searchDebounce === '') return true
                                return pro?.name?.toLowerCase()?.includes(searchDebounce?.toLowerCase())
                            })?.map((product) => {
                                return (
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
                                )
                            })}
                        </WrapperProducts>
                        <Pagination defaultCurrent={panigate.page + 1} total={panigate?.total} onChange={onChange} style={{ textAlign: 'center', marginTop: '10px' }} />
                    </Col>
                </Row>

            </div>
        </Loading>
    )
}

export default TypeProductPage