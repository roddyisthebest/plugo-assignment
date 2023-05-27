import styled from 'styled-components';
import Header from '../components/display/Header';
import {
  Button,
  Name,
  NavigateButton,
  Price,
  Sale,
  SaleColumn,
  SaledPrice,
} from '../util/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import ProductType from '../types/ProductType';
import { Type } from '../util/styles';
import { BsCart4 } from 'react-icons/bs';
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Contents = styled.div`
  padding: 0 50px 50px 50px;
  display: flex;
  gap: 0 20px;
  flex: 1;
`;
const BackIcon = styled(BiArrowBack)`
  font-size: 20px;
`;

const ImageSection = styled.div<{ url: string }>`
  background-image: url(${(props) => props.url});
  background-position: center center;
  background-color: #cecdcd;
  background-size: cover;
  flex: 1;
  display: flex;
`;

const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px 0;
`;

const ModifiedType = styled(Type)`
  padding: 10px;
  font-size: 13px;
`;

const ModifiedName = styled(Name)`
  font-size: 30px;
`;

const ModifiedButton = styled(Button)`
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0 15px;
`;

const Introduction = styled.div`
  margin-top: 10px;
  padding-top: 30px;
  border-top: 1px solid #d3d3d3;
  color: #2d2d2d;
  font-size: 20px;
  width: 60%;
`;

export default function Detail() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [data, setData] = useState<ProductType | null>(null);

  const check = {
    onSale: () => data?.sale !== 0,
  };

  async function getProduct() {
    const response = fetch(`/products/${pathname.split('/')[2]}`);
    return response.then((res) => res.json());
  }

  async function exec() {
    try {
      const product = await getProduct();
      console.log(product);
      setData(product);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    exec();
  }, []);

  return (
    <Container>
      {data ? (
        <>
          <Header title="">
            <NavigateButton onClick={() => navigate(-1)}>
              <BackIcon></BackIcon>
            </NavigateButton>
          </Header>
          <Contents>
            <ImageSection
              url={`https://picsum.photos/1500?random=${data.productIdx}`}
            ></ImageSection>

            <InfoSection>
              <div style={{ display: 'flex' }}>
                <ModifiedType>{data.type}</ModifiedType>
              </div>
              <ModifiedName>{data.name}</ModifiedName>
              <Price onSale={check.onSale()}>Won {data.price}</Price>
              {check.onSale() && (
                <>
                  <SaledPrice>
                    Won {data.price - data.price * 0.01 * data.sale}
                  </SaledPrice>
                  <SaleColumn>
                    <Sale>-{data.sale}%</Sale>
                  </SaleColumn>
                </>
              )}
              <ModifiedButton color="white" background="#4B4025">
                <BsCart4></BsCart4>
                ADD CART
              </ModifiedButton>
              <Introduction>{data.introduction}</Introduction>
            </InfoSection>
          </Contents>
        </>
      ) : (
        <span>로딩중</span>
      )}
    </Container>
  );
}
