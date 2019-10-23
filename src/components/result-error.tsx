import React from 'react'
import styled from "@emotion/styled";
import { ButtonLink, SEO, H2, Card, Message, HelperText, Glossary } from "./";


const ButtonContainer = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 330px;
  margin-top: 30px;
`;

const resultError = () => {
  return (
  <>
    <label>For Christ's sake Please go back and fill out all information to calculate results. </label>
    <ButtonContainer>
      <ButtonLink to="/print/" disabled={true}>Print Results</ButtonLink>
    </ButtonContainer>
  </>
  )
}

export default resultError