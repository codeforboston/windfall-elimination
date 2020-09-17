import React from "react";
import styled from "@emotion/styled";
import {
  TextBlock,
  H3,
  PrintButton,
  UnorderedList,
  ListItem
} from "../components";

const AboutContainer = styled.div`
  display: block;
`;


export default () => (
  <AboutContainer>
    <H3>How did this project come about?</H3>
    <TextBlock>
      As Congressman Moulton’s constituent services team, we believe that
      government should be easy to use, easy to access, and easy to understand.
      This is why we teamed up with Code for Boston to help retirees and their
      families understand how the Windfall Elimination Provision formula works,
      predict the amount of their retirement benefits, and effectively advocate
      for themselves with the Social Security Administration.
    </TextBlock>

    <H3>[LEGAL DISCLAIMER]</H3>
    <TextBlock>
      It will not ask you for any information that could put your identity at
      risk. This app will also not store your data, although you can save or
      print out your results at the end.
      </TextBlock>

    <H3>Credits</H3>
    <TextBlock>
      <UnorderedList>
        <ListItem>
          Font Awesome by Dave Gandy - <a href="http://fontawesome.io" target="_blank">http://fontawesome.io</a>
        </ListItem>
      </UnorderedList>
    </TextBlock>

    <br></br>
    <PrintButton onClick={() => window.open("https://github.com/codeforboston/windfall-elimination")}>
      See Our Work on GitHub
	</PrintButton>

  </AboutContainer>

);
