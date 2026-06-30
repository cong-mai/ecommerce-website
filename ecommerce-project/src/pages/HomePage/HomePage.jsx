import React, { useEffect, useState } from "react";
import TypeProduct from "../../components/TypeProduct/typeProduct";
import { WrapperTypeProduct, WrapperButtonMore, WrapperProducts } from "./styles";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slide1 from "../../assets/images/slide1.webp";
import slide2 from "../../assets/images/slide2.webp";
import slide3 from "../../assets/images/slide3.webp";
import CardComponent from "../../components/CardComponent/CardComponent";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import * as ProductService from '../../services/ProductService'
import { useSelector } from "react-redux";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search)
  const searchDebounce = useDebounce(searchProduct, 500)
  const [pending] = useState(false)
  const [limit, setLimit] = useState(6)
  const [typeProducts, setTypeProducts] = useState([])

  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1]
    const search = context?.queryKey && context?.queryKey[2]
    const res = await ProductService.getAllProduct(search, limit)
    return res
  }

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct()
    if (res?.status === 'OK') {
      setTypeProducts(res?.data)
    }
  }

  const { isPending, isFetching, data: products } = useQuery({
    queryKey: ['products', limit, searchDebounce],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000,
    placeholderData: keepPreviousData,
  })

  useEffect(() => {
    fetchAllTypeProduct()
  }, [])

  return (
    <Loading isLoading={isPending || isFetching || pending}>
      <div style={{ padding: '0 120px' }}>
        <WrapperTypeProduct>
          {typeProducts.map((item) => {
            return (
              <TypeProduct name={item} key={item} />
            )
          })}
        </WrapperTypeProduct>
      </div>
      <div style={{ backgroundColor: '#ececec', padding: '16px 120px 40px' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <SliderComponent arrImages={[slide1, slide2, slide3]} />
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '20px 16px', marginTop: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#333', marginBottom: '4px', borderLeft: '4px solid rgb(26,148,255)', paddingLeft: '10px' }}>
            Featured Products
          </h3>
          <WrapperProducts>
            {products?.data?.map((product) => (
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
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
            <WrapperButtonMore
              textButton="Load More"
              type="outline"
              styleButton={{
                border: `1px solid ${products?.total === products?.data?.length ? '#d9d9d9' : 'rgb(13, 92, 182)'}`,
                color: `${products?.total === products?.data?.length ? '#d9d9d9' : 'rgb(13, 92, 182)'}`,
                width: '240px', height: '38px', borderRadius: '4px'
              }}
              disabled={products?.total === products?.data?.length || products?.totalPage === 1}
              styleTextButton={{ fontWeight: 500 }}
              onClick={() => setLimit((prev) => prev + 6)}
            />
          </div>
        </div>
      </div>
    </Loading>
  )
}

export default HomePage;