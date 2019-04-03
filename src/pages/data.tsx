import React from "react";
import { bendpoints } from "../static/json";
import { Card } from "../components";

export default () => (
    <>
        <h1>Benefit Formula Bendpoints</h1>
        <h2>This is a demo showing data we can use for calculations in this project.</h2>
        {
            bendpoints.map((bendpoint, index) => (
                <Card key={index}>
                    <h3 >Year: { bendpoint.year }</h3>
                    <p>First amount: ${ bendpoint.firstAmount }</p>
                    <p>Second amount: ${ bendpoint.secondAmount }</p>
                </Card>
            ))
        }
    </>
)
