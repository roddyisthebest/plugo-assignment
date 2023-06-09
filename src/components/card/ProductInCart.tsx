import { memo } from 'react';
import styled from 'styled-components';
import {
  AiFillCheckSquare,
  AiOutlineCheckSquare,
  AiOutlinePlus,
  AiOutlineMinus,
} from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Name, Price, Type } from '../../util/styles';
import ProductInCartType from '../../types/ProductInCartType';
import { useDispatch } from 'react-redux';
import { editProductsInCart, removeProductInCart } from '../../store/reducer';

const Container = styled.div`
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ebebeb;
  background-color: white;
  min-width: 400px;
  display: flex;
  gap: 0 15px;
`;

const CheckSection = styled.div`
  width: 30px;
  /* background-color: blue; */
`;

const ImageSection = styled.div`
  width: 50px;
`;

const Image = styled.div<{ url: string }>`
  background-image: url(${(props) => props.url});
  background-position: center center;
  background-color: #cecdcd;
  background-size: cover;
  width: 100%;
  height: 50px;
`;

const Button = styled.button`
  background-color: transparent;
  padding: 0;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CheckedIcon = styled(AiFillCheckSquare)`
  color: #4b4025;
  font-size: 30px;
`;
const UncheckedIcon = styled(AiOutlineCheckSquare)`
  color: #4b4025;
  font-size: 30px;
`;

const DeleteIcon = styled(RiDeleteBin6Line)`
  color: red;
  font-size: 20px;
`;

const PlusIcon = styled(AiOutlinePlus)`
  color: #4b4025;
  font-size: 15px;
`;

const MinusIcon = styled(AiOutlineMinus)`
  color: #4b4025;
  font-size: 15px;
`;
const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px 0;
  padding: 3px;
  width: 100%;
`;

const Column = styled.div`
  display: flex;
  gap: 0 10px;
`;
const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5.5px 0;
`;

const EditSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EditAmountSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0 20px;
  color: #4b4025;
  font-size: 15px;
`;

function ProductInCart({ data }: { data: ProductInCartType }) {
  const dispatch = useDispatch();

  async function deleteProductsInCart() {
    const response = fetch(`/productsInCart/${data.productInCartIdx}`, {
      method: 'DELETE',
    });
    return response;
  }

  async function patchProductsInCart(productInCart: ProductInCartType) {
    const response = fetch('/productsInCart', {
      method: 'PUT',
      body: JSON.stringify({ productInCart }),
    });
    return response;
  }

  async function handleCheck() {
    try {
      await patchProductsInCart({ ...data, check: !data.check });

      dispatch(
        editProductsInCart({
          productInCartIdx: data.productInCartIdx,
          key: 'check',
          value: !data.check,
        })
      );
    } catch (e) {
      console.log(e);
    }
  }

  async function handleAmount(isItAdd: boolean) {
    if (!isItAdd && data.amount - 1 < 1) {
      return;
    }

    try {
      await patchProductsInCart({
        ...data,
        amount: isItAdd ? data.amount + 1 : data.amount - 1,
      });
      dispatch(
        editProductsInCart({
          productInCartIdx: data.productInCartIdx,
          key: 'amount',
          value: isItAdd ? data.amount + 1 : data.amount - 1,
        })
      );
    } catch (e) {
      console.log(e);
    }
  }

  async function handleDelete() {
    try {
      await deleteProductsInCart();
      dispatch(removeProductInCart(data.productInCartIdx));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Container>
      <CheckSection>
        <Button onClick={handleCheck}>
          {data.check ? (
            <CheckedIcon></CheckedIcon>
          ) : (
            <UncheckedIcon></UncheckedIcon>
          )}
        </Button>
      </CheckSection>
      <ContentSection>
        <Column>
          <ImageSection>
            <Image
              url={`https://picsum.photos/1500?random=${data.productIdx}`}
            ></Image>
          </ImageSection>
          <InfoSection>
            <div style={{ display: 'flex' }}>
              <Type>{data.type}</Type>
            </div>
            <Name>{data.name}</Name>
            <Price onSale={false}>Won {data.price}</Price>
          </InfoSection>
        </Column>
        <EditSection>
          <Button onClick={handleDelete}>
            <DeleteIcon></DeleteIcon>
          </Button>
          <EditAmountSection>
            <Button onClick={() => handleAmount(false)}>
              <MinusIcon></MinusIcon>
            </Button>
            {data.amount}
            <Button onClick={() => handleAmount(true)}>
              <PlusIcon></PlusIcon>
            </Button>
          </EditAmountSection>
        </EditSection>
      </ContentSection>
    </Container>
  );
}

export default memo(ProductInCart);
