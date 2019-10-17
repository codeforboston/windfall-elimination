import React from 'react';
import styled from "@emotion/styled";
import { colors, spacing, fontSizes } from "../constants";

const GlossaryContainer = styled.div`
position:fixed; 
right: 5px;
width: 20%;
color: ${colors.gray};
`;

const Term = styled.h5`
  border-left: 5px solid ${colors.gray};
  padding: 0px 5px;
  font-weight: 600;
  font-size: 16px;
  overflow-wrap: break-word;
  margin: 0;
`;
const Explanation = styled.div`
  font-size: 16px;
  margin: 15px 0;
`;
const Link = styled.a`
color: black;
font-weight: 600;
overflow-wrap: break-word;
`;

const ContentBox = styled.div`
  padding: 0 10px;
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
    
