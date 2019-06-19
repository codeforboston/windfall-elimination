import styled from "@emotion/styled";
import { fontSizes, spacing } from "../constants";

export const HelperText = styled("p")`
  font-size: ${fontSizes[0]};
  max-width: 500px;
  text-align: left;
  margin: ${spacing[1]} auto;
`;
