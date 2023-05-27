import styled from 'styled-components';

const Modal = styled.div<{ isItTransparent: boolean }>`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: ${(props) =>
    props.isItTransparent ? 'transparent' : '#0000008c'};
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalTitle = styled.div`
  text-align: center;
  font-size: 25px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.8);
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px 0;
`;

const Input = styled.input`
  padding: 20px;
  color: rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  border: 1px solid #e1e1e1;
`;

const Label = styled.span`
  color: rgba(0, 0, 0, 0.8);
  font-size: 15px;
  font-weight: 600;
`;

const Button = styled.button<{ color: string; background: string }>`
  padding: 20px;
  border-radius: 5px;
  color: ${(props) => props.color};
  background-color: ${(props) => props.background};
  border: none;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
`;

const NavigateButton = styled.button`
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

const Textarea = styled.textarea`
  padding: 20px;
  color: rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  border: 1px solid #e1e1e1;
  height: 200px;
  resize: none;
`;

const Type = styled.div`
  padding: 2px;
  background-color: rgba(48, 46, 46, 1);
  color: white;
  font-size: 10px;
`;

const Text = styled.span`
  font-weight: 700;
  font-size: 12.5px;
`;

const Name = styled(Text)`
  color: rgba(87, 85, 85, 1);
`;

const Price = styled(Text)<{ onSale: boolean }>`
  color: #797878;
  text-decoration: ${(props) => (props.onSale ? 'line-through' : 'none')};
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

export {
  Modal,
  ModalTitle,
  InputWrapper,
  Input,
  Textarea,
  Label,
  Button,
  NavigateButton,
  Type,
  Name,
  Price,
  SaledPrice,
  SaleColumn,
  Sale,
};
