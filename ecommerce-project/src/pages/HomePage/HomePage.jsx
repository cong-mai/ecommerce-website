import React from "react";
import TypeProduct from "../../components/TypeProduct/typeProduct";
import { WrapperTypeProduct, WrapperButtonMore, WrapperProducts } from "./styles";
import { Slider } from "antd";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slide1 from "../../assets/images/slide1.webp";
import slide2 from "../../assets/images/slide2.webp";
import slide3 from "../../assets/images/slide3.webp";
import CardComponent from "../../components/CardComponent/CardComponent";
import NavBarComponent from "../../components/NavbarComponent/NavbarComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from '../../services/ProductService'

const HomePage = () => {
  const product = ['Laptop', 'Phone', 'Tablet', 'Accessories'];
 
  const fetchProductAll = async () => {
    const res = await ProductService.getAllProduct()
    console.log('res', res)
    return res
  }
   const {isLoading, data: products} = useQuery({ queryKey: ['product'], queryFn: fetchProductAll, retry: 3, retryDelay: 1000 })
   console.log('data',products)
  return (
    <>
      <div style={{padding: '0 120px'}}>
        <WrapperTypeProduct>
          {product.map((item) => (
            <TypeProduct name={item} key={item} />
          ))}
        </WrapperTypeProduct>
      </div>
      <div id="container" style={{backgroundColor: "#efefef", padding:'0 120px',}}>
          <SliderComponent  arrImages={[slide1, slide2, slide3]}/>
          <WrapperProducts>
            {products?.data?.map((product) => {

              return ( <CardComponent
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
                  />
              )
            })}

          </WrapperProducts>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
             <WrapperButtonMore
                textButton={'Load more'} type="outline" styleButton={{
                  border: `1px solid rgb (11, 116, 229)`,
                  color: 'rgb(11, 116, 229)',
                  width: '240px', height: '38px', borderRadius: '4px'
                }}
                  styleTextButton={{fontweight: 55}}
              />
            </div>
      </div>
    </>
  );
};

export default HomePage;