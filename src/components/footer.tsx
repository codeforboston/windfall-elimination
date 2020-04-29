import styled from "@emotion/styled";

export const Footer = (props : {children: any}) => (
  <Wrapper>
    {props.children}
  </Wrapper>
)

const Wrapper = styled("footer")`
  backdrop-filter: blur(2px);
  background: rgba(128, 128, 128, 0.3);
  bottom: 0;
  display: flex;
  left: 0;
  justify-content: center;
  position: fixed;
  bottom: 0;
  min-width: 760px;
  @media (max-width: 767px) {
    min-width: unset;
    justify-content: flex-end;
  }
`;
