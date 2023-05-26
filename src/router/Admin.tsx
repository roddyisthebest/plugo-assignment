import styled from 'styled-components';
import Header from '../components/display/Header';
import Product from '../components/card/Product';
import ProductsWrapper from '../components/display/ProductsWrapper';
import { useSelector } from 'react-redux';
import State from '../types/State';
import CreatingProduct from '../components/modal/CreatingProduct';
import { useEffect, useState } from 'react';

const Container = styled.div`
  min-height: 100vh;
`;

const Button = styled.button`
  padding: 0 20px;
  border-radius: 8px;
  height: 50px;
  font-size: 15px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
  border: none;
  background-color: transparent;
  cursor: pointer;

  transition: all 300ms ease;

  &:hover {
    background-color: #e1e1e1;
  }
`;

const Contents = styled.div`
  padding: 50px;
`;

export default function Admin() {
  const [visibility, setVisibility] = useState<boolean>(false);
  const products = useSelector((state: State) => state.products);

  useEffect(() => {
    if (visibility) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [visibility]);

  return (
    <Container>
      <Header title="ADMIN">
        <Button onClick={() => setVisibility(true)}>CREATE PRODUCT</Button>
        <Button>USER</Button>
      </Header>
      <Contents>
        <ProductsWrapper>
          {products.map((product) => (
            <Product data={product} key={product.productIdx}></Product>
          ))}
        </ProductsWrapper>
      </Contents>
      {visibility && (
        <CreatingProduct setVisibility={setVisibility}></CreatingProduct>
      )}
    </Container>
  );
}
