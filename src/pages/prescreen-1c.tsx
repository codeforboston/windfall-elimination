import React from "react";
import {
  ButtonLink,
  ButtonLinkRed,
  TextBlock,
  SEO,
  ListText,
  LinkButton
} from "../components";

export default () => (
  <>
    <SEO title="Pre-Screen" keywords={[`gatsby`, `application`, `react`]} />
    <h2>What do I need?</h2>
    <TextBlock>
      To calculate your WEP-adjusted Benefit amount, we will need your
      assistance in providing relevant Social Security information.
    </TextBlock>
    <TextBlock>Before you begin, please have at your disposal:</TextBlock>
    <ListText>
      <li>Average Indexed Monthly Earnings (AIME)</li>
      <li>Earnings Record</li>
      <TextBlock>
        The above items can be obtained from the Social Security website. If you
        are unsure on how to obtain your Earnings Record, instructions can be
        found <LinkButton to="/prescreen-2/">Here</LinkButton>
      </TextBlock>
      <li>Birthdate</li>
      <li>Retirement Date (year and month)</li>
      <li>Benefit Start Date</li>
    </ListText>
    <ButtonLinkRed to="/prescreen-1b/">Go back!</ButtonLinkRed>
    <ButtonLink to="/screen-1/">Start</ButtonLink>
  </>
);
