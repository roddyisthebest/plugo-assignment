import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: #0000008c;
  top: 0;
  z-index: 10;
`;

export default function Modal({ children }: { children: React.ReactNode }) {
  return <Container>{children}</Container>;
}
