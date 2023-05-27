import { useNavigate } from 'react-router-dom';
import ProductInCart from '../components/card/ProductInCart';
import styled from 'styled-components';
import { NavigateButton } from '../util/styles';
import Header from '../components/display/Header';
import { useSelector } from 'react-redux';
import State from '../types/State';
import { useEffect, useState } from 'react';
const Container = styled.div`
  min-height: 100vh;
`;

const Contents = styled.div`
  padding: 50px;
`;

const ProductsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px 20px;
  padding-bottom: 80px;
`;

const StatusSection = styled.div`
  width: 100vw;
  height: 80px;
  background-color: white;
  padding: 0 50px;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 0 30px;
`;

const Column = styled.div`
  display: flex;
  gap: 0 7.5px;
  align-items: center;
`;

const StatusKeyText = styled.span`
  color: #5a5858;
`;
const StatusValText = styled.span`
  color: #5a5858;
  font-weight: 700;
`;

const BuyButton = styled.button`
  padding: 12.5px;
  background-color: #4b4025;
  border-radius: 5px;
  color: white;
  font-weight: 700;
  font-size: 11px;
  border: none;
  cursor: pointer;
`;

export default function Cart() {
  const navigate = useNavigate();
  const productsInCart = useSelector((state: State) => state.productsInCart);

  const totalPrice = useSelector((state: State) => state.totalPrice);

  return (
    <Container>
      <Header title="CART">
        <NavigateButton onClick={() => navigate(-1)}>HOME</NavigateButton>
      </Header>
      <Contents>
        <ProductsWrapper>
          {productsInCart.map((productInCart) => (
            <ProductInCart
              key={productInCart.productInCartIdx}
              data={productInCart}
            ></ProductInCart>
          ))}
        </ProductsWrapper>
      </Contents>
      <StatusSection>
        <Column>
          <StatusKeyText>TOTAL: {totalPrice}</StatusKeyText>
          <StatusValText>won</StatusValText>
        </Column>
        <BuyButton>PROCEED TO CHECKOUT</BuyButton>
      </StatusSection>
    </Container>
  );
}
