import React, { useEffect, useRef, useState } from "react";
import { Empty, Result, Button } from "antd";
import { ArrowRightOutlined, ThunderboltOutlined } from "@ant-design/icons";
import TypeProduct from "../../components/TypeProduct/typeProduct";
import { WrapperTypeProduct, WrapperButtonMore, WrapperProducts } from "./styles";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import {
  HeroSlide, HeroSlideText, HeroSlideEyebrow, HeroSlideTitle,
  HeroSlideSubtitle, HeroSlideButton, HeroSlideImage, HeroSlideIcon
} from "../../components/SliderComponent/style";
import laptopHero from "../../assets/images/macbook.jpg";
import phoneHero from "../../assets/images/iphone.jpg";
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
  const featuredRef = useRef(null)

  const scrollToFeatured = () => {
    featuredRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1]
    const search = context?.queryKey && context?.queryKey[2]
    const res = search?.trim().length >= 2
      ? await ProductService.searchSemantic(search, limit)
      : await ProductService.getAllProduct(search, limit)
    return res
  }

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct()
    if (res?.status === 'OK') {
      setTypeProducts(res?.data)
    }
  }

  const { isPending, isFetching, isError, refetch, data: products } = useQuery({
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
      <div style={{ padding: '0 var(--space-page-x)' }}>
        <WrapperTypeProduct>
          {typeProducts.map((item) => {
            return (
              <TypeProduct name={item} key={item} />
            )
          })}
        </WrapperTypeProduct>
      </div>
      <div style={{ backgroundColor: 'var(--color-bg-page)', padding: '16px var(--space-page-x) 40px' }}>
        <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <SliderComponent>
            <HeroSlide $background="linear-gradient(135deg, #1a94ff 0%, #0d5cb6 100%)">
              <HeroSlideText>
                <HeroSlideEyebrow>Laptops</HeroSlideEyebrow>
                <HeroSlideTitle>Power Through Your Day</HeroSlideTitle>
                <HeroSlideSubtitle>Top-rated laptops for work, study and gaming.</HeroSlideSubtitle>
                <HeroSlideButton onClick={scrollToFeatured}>
                  Shop Now <ArrowRightOutlined />
                </HeroSlideButton>
              </HeroSlideText>
              <HeroSlideImage src={laptopHero} alt="Laptops" />
            </HeroSlide>
            <HeroSlide $background="linear-gradient(135deg, #262d3d 0%, #454f66 100%)">
              <HeroSlideText>
                <HeroSlideEyebrow>Phones</HeroSlideEyebrow>
                <HeroSlideTitle>The Latest Smartphones</HeroSlideTitle>
                <HeroSlideSubtitle>Discover this season's newest arrivals.</HeroSlideSubtitle>
                <HeroSlideButton onClick={scrollToFeatured}>
                  Shop Now <ArrowRightOutlined />
                </HeroSlideButton>
              </HeroSlideText>
              <HeroSlideImage src={phoneHero} alt="Phones" />
            </HeroSlide>
            <HeroSlide $background="linear-gradient(135deg, #ff9142 0%, #ff3945 100%)">
              <HeroSlideText>
                <HeroSlideEyebrow>Free Shipping</HeroSlideEyebrow>
                <HeroSlideTitle>Free Delivery Over $50</HeroSlideTitle>
                <HeroSlideSubtitle>Shop more, save more on delivery fees.</HeroSlideSubtitle>
                <HeroSlideButton onClick={scrollToFeatured}>
                  Start Shopping <ArrowRightOutlined />
                </HeroSlideButton>
              </HeroSlideText>
              <HeroSlideIcon><ThunderboltOutlined /></HeroSlideIcon>
            </HeroSlide>
          </SliderComponent>
        </div>

        <div ref={featuredRef} style={{ backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-md)', padding: '20px 16px', marginTop: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, color: 'var(--color-text)', marginBottom: '4px', borderLeft: '4px solid var(--color-primary)', paddingLeft: '10px' }}>
            Featured Products
          </h3>
          {isError ? (
            <Result
              status="warning"
              title="Couldn't load products"
              subTitle="Something went wrong while fetching products. Please try again."
              extra={<Button type="primary" onClick={() => refetch()}>Retry</Button>}
            />
          ) : !isPending && !isFetching && products?.data?.length === 0 ? (
            <Empty
              description={searchDebounce?.trim() ? `No products found for "${searchDebounce}"` : 'No products found'}
              style={{ padding: '40px 0' }}
            />
          ) : (
            <>
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
                    border: `1px solid ${products?.total === products?.data?.length ? 'var(--color-border)' : 'var(--color-primary-hover)'}`,
                    color: `${products?.total === products?.data?.length ? 'var(--color-border)' : 'var(--color-primary-hover)'}`,
                    width: '240px', height: '38px', borderRadius: 'var(--radius-sm)'
                  }}
                  disabled={products?.total === products?.data?.length || products?.totalPage === 1}
                  styleTextButton={{ fontWeight: 500 }}
                  onClick={() => setLimit((prev) => prev + 6)}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </Loading>
  )
}

export default HomePage;
