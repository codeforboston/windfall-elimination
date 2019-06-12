import styled from "@emotion/styled";
import { fontSizes, spacing } from "../constants";

export const QuestionText = styled("h2")`
  font-size: ${fontSizes[1]};
  margin-top: ${spacing[1]};
  width: 75vw;
  text-align: center;

  /*
  @media screen and (min-width: 800px){
    text-align: left;
  }*/
`;
