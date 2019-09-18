import React from 'react';
import { Link } from "gatsby";
import styled from "@emotion/styled"
import { colors, radii, fontSizes } from "../constants";

//Hamburger buns
export const HamburgerBuns= styled('span')`
    background-color: ${colors.red};
    display: block;
    width: 33px;
    height: 4px;
    background: #cdcdcd;
    border-size: 1px;
    border-color: ${colors.black};
    border-radius: ${radii[2]};
    margin: 4px;
    margin-left: 1rem;
    z-index: 1;

  	transform-origin: 4px 0px;

  	transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
              background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
              opacity 0.55s ease,
              background 0.5 ease;
`;

//Hamburger menu
export const HamburgerMenu = styled('ul')`
  position: absolute;
  width: 100px;
  height: 100%;
  margin: 73px 0 0 -1px;
  padding: 50px 0px 0px 50px;

  background: ${colors.lightGray};
  list-style-type: circle;
  -webkit-font-smoothing: antialiased;
  /* to stop flickering of text in safari */

  transform-origin: 0% 0%;
  transform: translate(-100%, 0);

  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);

  li {
    display: inline-block;
    padding: 10px 0;
    font-size: ${fontSizes[1]};
  }
`;

//Hidden checkbox, checked state triggers menu opening
export const HamburgerButton = styled("input")`
  display: block;
  width: 40px;
  height: 32px;
  position: absolute;
  top: -7px;
  left: -5px;
  margin-top: 25px;

  cursor: pointer;

  opacity: 0;
  z-index: 2; /* and place it over the hamburger */

  -webkit-touch-callout: none;
  &:hover {
    background-color: ${colors.lime};
    color: ${colors.white};
    cursor: pointer;
  }
`;

//Outlying div, controls transformations of spans/menu
export const Hamburger= styled('div')`
    background: ${colors.white};
    border-size: 1px;
    border-color: ${colors.darkGreen};
    margin-top: 25px;
    z-index:-1;

   	input:checked ~ ${HamburgerBuns} {opacity: 1; background:${colors.black};
  	transform: rotate(45deg) translate(-3px, -3px);}

    input:checked ~ ${HamburgerBuns}:nth-of-type(2) {
    opacity: 0;
    transform: rotate(0deg) scale(0.2, 0.2);
    }

	  input:checked ~ ${HamburgerBuns}:nth-of-type(3) {opacity: 1; background:black;
  	transform: rotate(-45deg) translate(0, -3px);
    background:${colors.black};}

    input:checked ~ ul
  	{
  	  transform: none;
  	}
`;

export default class HamburgerHelper extends React.Component {

	render() {
		return(
			<nav role="navigation">
			  <Hamburger>
			  	<HamburgerButton type='checkbox' label="hamburger-layers"></HamburgerButton>
			  	<HamburgerBuns></HamburgerBuns>
  				<HamburgerBuns></HamburgerBuns>
  				<HamburgerBuns></HamburgerBuns>
			  	<HamburgerMenu>
			  			<li><Link to="/" style={{ textDecoration: `none`,}}>Home</Link></li>
							<li><Link to="/admin/" style={{ textDecoration: `none`,}}>Admin Page</Link></li>
							<li><a href="https://github.com/codeforboston/windfall-elimination" target="__blank" style={{ textDecoration: `none`,}}>Github</a></li>
							<li><Link to="/about/" style={{ textDecoration: `none`,}}>About</Link></li>
				</HamburgerMenu>
        <span style={{'margin-left': '0.75rem'}}>Menu</span>
			  </Hamburger>
			</nav>
		)
	}
}
