import styled from 'styled-components';
import Header from '../components/display/Header';
import { NavigateButton } from '../util/styles';
import { useNavigate } from 'react-router-dom';
import ProductsWrapper from '../components/display/ProductsWrapper';
import State from '../types/State';
import { useSelector } from 'react-redux';
import Product from '../components/card/Product';

const Container = styled.div`
  min-height: 100vh;
`;

const Contents = styled.div`
  padding: 50px;
`;

export default function Home() {
  const navigate = useNavigate();
  const products = useSelector((state: State) => state.products);

  return (
    <Container>
      <Header title="USER">
        <NavigateButton onClick={() => navigate('/cart')}>CART</NavigateButton>
        <NavigateButton onClick={() => navigate('/admin')}>
          ADMIN
        </NavigateButton>
      </Header>
      <Contents>
        <ProductsWrapper>
          {products.length > 0 ? (
            products.map((product) => (
              <Product
                data={product}
                key={product.productIdx}
                editable={false}
              ></Product>
            ))
          ) : (
            <span>등록된 상품이 없습니다.</span>
          )}
        </ProductsWrapper>
      </Contents>
    </Container>
  );
}
