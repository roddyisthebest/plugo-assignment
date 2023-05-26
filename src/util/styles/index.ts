import styled from 'styled-components';

const Modal = styled.div<{ isItTransparent: boolean }>`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: ${(props) =>
    props.isItTransparent ? 'transparent' : '#0000008c'};
  top: 0;
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

const Textarea = styled.textarea`
  padding: 20px;
  color: rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  border: 1px solid #e1e1e1;
  height: 200px;
  resize: none;
`;

export { Modal, ModalTitle, InputWrapper, Input, Textarea, Label, Button };