import React from 'react';
import styled from "@emotion/styled";
import { colors, spacing, fontSizes } from "../constants";

const GlossaryContainer = styled.div`
position:fixed; 
right:0;
width: 250px;
color: ${colors.gray};
`;

const Term = styled.div`
  border-left: 5px solid ${colors.gray};
  padding: 0px 5px;
  font-weight: 600;
`;
const Explanation = styled.div`
  font-size: 16px;
  margin: 15px 0;
`;
const Link = styled.a`
color: black;
font-weight: 600;
`;

const ContentBox = styled.div`
  padding: 10px;
`;


const Glossary = ({ title, link, children,linkText }) =>  (
    <GlossaryContainer>
      <Term>
        {title}
      </Term>
      <ContentBox>
      <Explanation>
        {children}
      </Explanation>
      <Link href={link}>
        {linkText}
      </Link>
      </ContentBox>
    </GlossaryContainer>
)

export default Glossary;
    
