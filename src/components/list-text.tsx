import styled from "@emotion/styled";
import { breakPoints, fontSizes, spacing } from "../constants";

export const ListText = styled("ul")`
  font-size: ${fontSizes[1]};
  max-width: ${breakPoints[3]};
  text-align: justify;
  margin: ${spacing[2]} 0;
`;
