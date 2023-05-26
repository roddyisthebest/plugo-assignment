import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: sticky;
  top: 0;
  height: 100px;
  padding: 0 50px;
  display: flex;
  align-items: center;
  gap: 0 100px;
  z-index: 10;
  background-color: #f0f0f0;
`;

const Title = styled.div`
  font-size: 30px;
  color: rgba(0, 0, 0, 0.8);
  font-weight: 600;
`;

const Routes = styled.div`
  display: flex;
  align-items: center;
  gap: 0 20px;
`;

export default function Header({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Container>
      <Title>{title}</Title>
      <Routes>{children}</Routes>
    </Container>
  );
}
