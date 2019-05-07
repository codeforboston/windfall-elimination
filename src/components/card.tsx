import styled from "@emotion/styled";
import { colors, radii, spacing } from "../constants";

export const Card = styled("div")`
    border: 1px solid ${colors.lightblack};
    border-radius: ${radii[1]};
    padding: ${spacing[2]};
    margin: ${spacing[1]};
`;
