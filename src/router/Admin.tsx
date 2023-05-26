import styled from 'styled-components';
import Header from '../components/display/Header';
import Product from '../components/card/Product';
import ProductsWrapper from '../components/display/ProductsWrapper';

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
  return (
    <Container>
      <Header title="ADMIN">
        <Button>CREATE PRODUCT</Button>
        <Button>USER</Button>
      </Header>
      <Contents>
        <ProductsWrapper>
          <Product></Product>
          <Product></Product>
          <Product></Product>
          <Product></Product>
          <Product></Product>
          <Product></Product>
          <Product></Product>
          <Product></Product>
          <Product></Product>
        </ProductsWrapper>
      </Contents>
    </Container>
  );
}
