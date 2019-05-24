import styled from "@emotion/styled";
import { colors, spacing, radii } from "../constants";

export const DisplayTable = styled("table")`
  border-radius: ${radii[0]};
  margin: ${spacing[0]};
  border: 1px solid ${colors.gray};
  padding: ${spacing[0]};
`;
