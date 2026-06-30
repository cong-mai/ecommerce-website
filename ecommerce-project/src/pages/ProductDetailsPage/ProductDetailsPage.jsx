import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailsPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    return (
        <div style={{ padding: '16px 120px 40px', background: '#ececec', minHeight: 'calc(100vh - 140px)' }}>
            <h3 style={{ marginBottom: '12px', color: '#555', fontWeight: 400 }}>
                <span style={{ cursor: 'pointer', color: 'rgb(26,148,255)', fontWeight: 600 }} onClick={() => navigate('/')}>Home</span>
                {' – Product Detail'}
            </h3>
            <ProductDetailsComponent idProduct={id} />
        </div>
    )
}

export default ProductDetailsPage