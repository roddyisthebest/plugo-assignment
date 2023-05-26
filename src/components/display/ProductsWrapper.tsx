import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px 20px;
`;

export default function ProductsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Container>{children}</Container>;
}
