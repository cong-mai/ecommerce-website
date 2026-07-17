import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailsPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    return (
        <div style={{ padding: '16px var(--space-page-x) 40px', background: 'var(--color-bg-page)', minHeight: 'calc(100vh - 140px)' }}>
            <h3 style={{ marginBottom: '12px', color: 'var(--color-text-secondary)', fontWeight: 400 }}>
                <span style={{ cursor: 'pointer', color: 'var(--color-primary)', fontWeight: 600 }} onClick={() => navigate('/')}>Home</span>
                {' – Product Detail'}
            </h3>
            <ProductDetailsComponent idProduct={id} />
        </div>
    )
}

export default ProductDetailsPage