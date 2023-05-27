import styled from 'styled-components';
import {
  Button,
  Input,
  InputWrapper,
  Label,
  Modal,
  Textarea,
} from '../../util/styles';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, editProducts, removeProduct } from '../../store/reducer';
import ProductType from '../../types/ProductType';

const Container = styled.div`
  width: 450px;
  height: 600px;
  background-color: white;
  border-radius: 8px;
  overflow-y: scroll;
  box-sizing: border-box;
  padding: 30px;
  display: flex;
  gap: 25px 0;
  flex-direction: column;
`;

const ButtonsRow = styled.div`
  display: flex;
  gap: 12px 0;
  flex-direction: column;
`;
export default function EditingProduct({
  setVisibility,
  product,
}: {
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  product: ProductType;
}) {
  const dispatch = useDispatch();
  const [data, setData] = useState<{
    name: string;
    price: number;
    sale: number;
    type: string;
    introduction: string;
  }>({
    name: '',
    price: 0,
    sale: 0,
    type: '',
    introduction: '',
  });

  const [disabled, setDisabled] = useState<boolean>(true);

  function onChange(key: string, value: string | number) {
    if (key === 'price' && (value as number) < 0) {
      return;
    }

    if (key === 'sale' && ((value as number) < 0 || (value as number) > 100)) {
      return;
    }
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = e.target as HTMLTextAreaElement;
    if (target.className.includes('modal')) {
      setVisibility((prev) => false);
    }
  }

  async function patchProduct() {
    const response = fetch('/products', {
      method: 'PATCH',
      body: JSON.stringify({
        product: { productIdx: product.productIdx, ...data },
      }),
    });
    return response;
  }

  async function handleEdit() {
    try {
      await patchProduct();
      dispatch(editProducts({ productIdx: product.productIdx, ...data }));
      alert('제품이 성공적으로 수정되었습니다.');
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteProduct() {
    const response = fetch(`/products/${product.productIdx}`, {
      method: 'DELETE',
    });
    return response;
  }

  async function handleDelete() {
    try {
      // eslint-disable-next-line no-restricted-globals
      if (confirm('정말 삭제하시겠습니까?')) {
        await deleteProduct();
        dispatch(removeProduct(product.productIdx));
        alert('제품이 성공적으로 생성되었습니다.');
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    setDisabled(
      !(
        data.name.length > 0 &&
        data.type.length > 0 &&
        data.introduction.length > 0 &&
        data.price.toString().length > 0 &&
        data.sale.toString().length > 0
      )
    );
  }, [data]);

  useEffect(() => {
    setData(product);
  }, [product]);

  return (
    <Modal isItTransparent={false} className="modal" onClick={onClick}>
      <Container>
        <InputWrapper>
          <Label>NAME</Label>
          <Input
            value={data.name}
            onChange={(e) => onChange('name', e.target.value)}
          ></Input>
        </InputWrapper>
        <InputWrapper>
          <Label>PRICE (WON)</Label>
          <Input
            type="number"
            value={data.price}
            onChange={(e) => onChange('price', e.target.value)}
          ></Input>
        </InputWrapper>
        <InputWrapper>
          <Label>SALE (%)</Label>
          <Input
            type="number"
            value={data.sale}
            onChange={(e) => onChange('sale', e.target.value)}
          ></Input>
        </InputWrapper>
        <InputWrapper>
          <Label>TYPE</Label>
          <Input
            value={data.type}
            onChange={(e) => onChange('type', e.target.value)}
          ></Input>
        </InputWrapper>
        <InputWrapper>
          <Label>INTRODUCTION</Label>
          <Textarea
            value={data.introduction}
            onChange={(e) => onChange('introduction', e.target.value)}
          ></Textarea>
        </InputWrapper>
        <ButtonsRow>
          <Button
            color="#198CED"
            background="#EBF6FD"
            disabled={disabled}
            onClick={handleEdit}
            style={{ opacity: disabled ? 0.3 : 1 }}
          >
            EDIT
          </Button>
          <Button color="#FF0000" background="#FEE7E7" onClick={handleDelete}>
            DELETE
          </Button>
        </ButtonsRow>
      </Container>
    </Modal>
  );
}
