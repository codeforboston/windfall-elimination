import React from "react";
import { SEO, TextBlock, ListItem, UnorderedList, H3, WarningBox } from "../components";

const Unlaunched = () => {
  return <WarningBox><label><strong>The calculations on this app are not final.</strong>
     &nbsp;More contributions and calculation changes are being added
      and it will be launched in early 2020 with this message removed.
      </label></WarningBox>
}

export default () => (
    <div>
      <SEO title="Social Security Benefit Calculator" keywords={[`gatsby`, `application`, `react`]} />
      <H3>This app will:</H3>
      <TextBlock>
        <UnorderedList>
          <ListItem>
            help you estimate your retirement benefits, including how you may be
            affected by early or delayed retirement or the Windfall Elimination
            Provision
          </ListItem>
          <ListItem>help you handle an overpayment</ListItem>
          <ListItem>
            {" "}
            give you some starting points to take political action
          </ListItem>
        </UnorderedList>
      </TextBlock>

      <H3>Who can use this app?</H3>
      <TextBlock>
        Anyone who has paid into Social Security at some point in their career
        can use this app, including those affected by the Windfall Elimination
        Provision.
      </TextBlock>
      <TextBlock>
        However, please note that this app will be most accurate for users
        within 5 - 10 years of retirement.
      </TextBlock>

      <H3>How is my information used?</H3>
      <TextBlock>
        This application is intended as a tool for users to calculate their
        Social Security benefits. No data is saved, stored, or passed along to
        third-party services and/or government entities. All data is deleted
        after use.
      </TextBlock>
      <H3>Before You Begin</H3>
      <TextBlock>
      Have a copy of your earnings record (digital or printed) on hand
      (you can <a href="https://www.dropbox.com/s/7y55twj8c1dfs1j/Windfall_App_Sample_20.xml?raw=1&dl=1">
        download a sample one here</a>).
      </TextBlock>
      <H3>[Legal Disclaimer]</H3>
      <TextBlock>
        Your future benefits may be affected by
        changes in your employment or changes to the SSA’s formula.
        This site is for informational purposes only, and should not be taken as
        legal, tax, investment, financial, or other advice. You should consult
        with a financial advisor or attorney to determine what is best for your
        individual circumstances.
      </TextBlock>
    </div>
);
