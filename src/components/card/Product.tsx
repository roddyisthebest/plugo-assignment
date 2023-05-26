import styled from 'styled-components';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  height: 300px;
  width: 200px;
  position: relative;
`;

const Container = styled.button`
  width: 100%;
  height: 100%;
  position: absolute;
  flex-direction: column;
  display: flex;
  gap: 30px 0;
  padding: 0;
  border: none;
  text-align: start;
  cursor: pointer;
  text-decoration: none;
  z-index: 4;
`;

const ImageSection = styled.div<{ url: string }>`
  width: 100%;
  height: 200px;
  background-image: url(${(props) => props.url});
  background-position: center center;
  background-color: #cecdcd;
  background-size: cover;
  display: flex;
  align-items: flex-end;
  padding: 5px;
  box-sizing: border-box;
`;

const Type = styled.div`
  padding: 2px;
  background-color: rgba(48, 46, 46, 1);
  color: white;
  font-size: 10px;
`;

const InfoSection = styled.div`
  flex: 1;
  display: flex;

  display: flex;
  flex-direction: column;
  gap: 3.5px 0;
  position: relative;
`;

const EditButton = styled.button`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 0px;
  top: 230px;
  z-index: 5;
  border: none;
`;

const Text = styled.span`
  font-weight: 700;
  font-size: 12.5px;
`;

const Name = styled(Text)`
  color: rgba(87, 85, 85, 1);
`;

const Price = styled(Text)`
  color: #797878;
  text-decoration: line-through;
`;

const SaledPrice = styled(Text)`
  color: rgba(87, 85, 85, 1);
`;

const SaleColumn = styled.div``;
const Sale = styled.span`
  padding: 2px;
  background-color: rgba(48, 46, 46, 1);
  color: white;
  font-size: 10px;
`;

function Product() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <EditButton></EditButton>
      <Container onClick={() => navigate('/product/312')}>
        <ImageSection url={`https://picsum.photos/200?random=${Math.random()}`}>
          <Type>Ada Stock</Type>
        </ImageSection>
        <InfoSection>
          <Name>Raya Scarf</Name>
          <Price>Won 199,000</Price>
          <SaledPrice>Won 199,000</SaledPrice>
          <SaleColumn>
            <Sale>-10%</Sale>
          </SaleColumn>
        </InfoSection>
      </Container>
    </Wrapper>
  );
}

export default memo(Product);
