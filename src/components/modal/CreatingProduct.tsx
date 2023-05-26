import styled from 'styled-components';
import {
  Button,
  Input,
  InputWrapper,
  Label,
  Modal,
  ModalTitle,
  Textarea,
} from '../../util/styles';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../store/reducer';

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

export default function CreatingProduct({
  setVisibility,
}: {
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
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
      setVisibility(false);
    }
  }

  async function postProduct() {
    const response = fetch('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.then((res) => res.json());
  }

  async function handleSubmit() {
    try {
      const product = await postProduct();
      dispatch(addProduct(product));
      alert('제품이 성공적으로 생성되었습니다.');
      setVisibility(false);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    setDisabled(
      !(
        data.name.length > 0 &&
        data.type.length > 0 &&
        data.introduction.length > 0
      )
    );
  }, [data]);

  return (
    <Modal isItTransparent={false} className="modal" onClick={onClick}>
      <Container>
        <ModalTitle>CREATE PRODUCT</ModalTitle>
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
        <Button
          color="white"
          background="#4B4025"
          onClick={handleSubmit}
          disabled={disabled}
          style={{ opacity: disabled ? 0.3 : 1 }}
        >
          CREATE
        </Button>
      </Container>
    </Modal>
  );
}
