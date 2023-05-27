import styled from 'styled-components';
import Header from '../components/display/Header';
import Product from '../components/card/Product';
import ProductsWrapper from '../components/display/ProductsWrapper';
import { useSelector } from 'react-redux';
import State from '../types/State';
import CreatingProduct from '../components/modal/CreatingProduct';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigateButton } from '../util/styles';
const Container = styled.div`
  min-height: 100vh;
`;

const Contents = styled.div`
  padding: 50px;
`;

export default function Admin() {
  const [visibility, setVisibility] = useState<boolean>(false);
  const products = useSelector((state: State) => state.products);
  const navigate = useNavigate();
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
        <NavigateButton onClick={() => setVisibility(true)}>
          CREATE PRODUCT
        </NavigateButton>
        <NavigateButton onClick={() => navigate('/')}>USER</NavigateButton>
      </Header>
      <Contents>
        <ProductsWrapper>
          {products.length > 0 ? (
            products.map((product) => (
              <Product
                data={product}
                key={product.productIdx}
                editable={true}
              ></Product>
            ))
          ) : (
            <span>등록된 상품이 없습니다.</span>
          )}
        </ProductsWrapper>
      </Contents>
      {visibility && (
        <CreatingProduct setVisibility={setVisibility}></CreatingProduct>
      )}
    </Container>
  );
}
