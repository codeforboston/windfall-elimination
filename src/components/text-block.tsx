import styled from "@emotion/styled";
import { breakPoints, fontSizes, spacing } from "../constants";

export const TextBlock = styled("p")`
  text-align: justify;
  font-size: ${fontSizes[1]};
  max-width: ${breakPoints[3]};
  margin: 0 auto ${spacing[2]};
`;
