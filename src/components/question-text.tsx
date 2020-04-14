import styled from "@emotion/styled";
import { fontSizes, spacing } from "../constants";

export const QuestionText = styled("h1")`
  font-size: ${fontSizes[1]};
  margin-top: ${spacing[1]};
  width: 45vw;
  word-wrap: break-word;
  
  @media (max-width: 767px){
    width: 100%;
  }

  /*
  @media screen and (min-width: 800px){
    text-align: left;
  }*/
`;
