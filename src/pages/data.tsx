import React from "react";
import { bendpoints } from "../static/json";
import styled from "@emotion/styled";

const Wrapper = styled("div")`
    border: 1px solid black;
    border-radius: 4px;
    margin: 15px 0;
    padding: 15px;
`;

export default () => {
    return (
        <>
            <h1>Benefit Formula Bendpoints</h1>
            <h2>This is a demo showing data we can use for calculations in this project.</h2>
            {
                bendpoints.map((bendpoint, index) => (
                    <Wrapper key={index}>
                        <h3 >Year: { bendpoint.year }</h3>
                        <p>First amount: ${ bendpoint.firstAmount }</p>
                        <p>Second amount: ${ bendpoint.secondAmount }</p>
                    </Wrapper>
                ))
            }
        </>
    )
};
