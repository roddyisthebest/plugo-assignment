import styled from 'styled-components';
import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ProductType from '../../types/ProductType';
import { BiDotsVertical } from 'react-icons/bi';
import EditingProduct from '../modal/EditingProduct';
import { Name, Price, Sale, SaledPrice, Type } from '../../util/styles';

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
  cursor: pointer;
`;

function Product({ data, editable }: { data: ProductType; editable: boolean }) {
  const navigate = useNavigate();

  const [visibility, setVisibility] = useState<boolean>(false);
  const check = {
    onSale: () => data.sale !== 0,
  };

  const onClick = () => {
    if (!editable) {
      return navigate(`/product/${data.productIdx}`);
    }

    setVisibility(true);
  };

  useEffect(() => {
    if (visibility) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [visibility]);

  return (
    <Wrapper>
      {editable && (
        <EditButton>
          <BiDotsVertical></BiDotsVertical>
        </EditButton>
      )}

      <Container onClick={onClick}>
        <ImageSection
          url={`https://picsum.photos/1500?random=${data.productIdx}`}
        >
          <Type>{data.type}</Type>
        </ImageSection>
        <InfoSection>
          <Name>{data.name}</Name>
          <Price onSale={check.onSale()}>Won {data.price}</Price>
          {check.onSale() && (
            <>
              <SaledPrice>
                Won {data.price - data.price * 0.01 * data.sale}
              </SaledPrice>
              <div>
                <Sale>-{data.sale}%</Sale>
              </div>
            </>
          )}
        </InfoSection>
      </Container>
      {visibility && (
        <EditingProduct
          setVisibility={setVisibility}
          product={data}
        ></EditingProduct>
      )}
    </Wrapper>
  );
}

export default memo(Product);
