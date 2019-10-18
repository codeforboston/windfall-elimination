import React from "react";
import {
  TextBlock,
  SEO,
  Card,
  TextBlockHeader
} from "../components";

export default () => (
  <>
    <TextBlockHeader>How did this project come about?</TextBlockHeader>
    <TextBlock>
      On Congressman Moulton’s constituent services team, we believe that
      government should be easy to use, easy to access, and easy to understand.
      This is why we teamed up with Code for Boston to help retirees and their
      families understand how the Windfall Elimination Provision formula works,
      predict the amount of their retirement benefits, and effectively advocate
      for themselves with the Social Security Administration.
    </TextBlock>

    <h4>[LEGAL DISCLAIMER]</h4>
      <TextBlock>
        It will not ask you for any information that could put your identity at
        risk. This app will also not store your data, although you can save or
        print out your results at the end.
      </TextBlock>
  </>
);
