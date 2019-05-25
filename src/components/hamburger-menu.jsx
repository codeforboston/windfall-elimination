import React from 'react';
import { Link } from "gatsby";
import styled from "@emotion/styled"
import { colors, radii } from "../constants";

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
    z-index: 1;

  	transform-origin: 4px 0px;

  	transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
              background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
              opacity 0.55s ease;
`;

//Hamburger menu
export const HamburgerMenu = styled('ul')`
  position: absolute;
  width: 100px;
  margin: 30px 0 0 -1px;
  padding: 50px;
  padding-top: 25px;

  background: #ededed;
  list-style-type: none;
  -webkit-font-smoothing: antialiased;
  /* to stop flickering of text in safari */

  transform-origin: 0% 0%;
  transform: translate(-100%, 0);

  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);

  li {
    padding: 10px 0;
    font-size: 22px;
  }
`;

//Hidden checkbox, checked state triggers menu opening
export const HamburgerButton= styled('input')`
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
    background: ${colors.darkGreen};
    border-size: 1px;
    border-color: ${colors.darkGreen};
    float: left;
    margin-top: 25px;

  input:checked ~ ${HamburgerBuns} {
    opacity: 1;
    transform: rotate(45deg) translate(-3px, -3px);
  }

  input:checked ~ ${HamburgerBuns}:nth-of-type(2) {
    opacity: 0;
    transform: rotate(0deg) scale(0.2, 0.2);
  }

  input:checked ~ ${HamburgerBuns}:nth-of-type(3) {
    opacity: 1;
    transform: rotate(-45deg) translate(0, -3px);
  }

  input:checked ~ ul {
    transform: none;
  }
`;

export default class HamburgerHelper extends React.Component {
	render() {
		return(
			<nav role="navigation">
			  <Hamburger>
			  	<HamburgerButton type='checkbox' ></HamburgerButton>
			  	<HamburgerBuns></HamburgerBuns>
  				<HamburgerBuns></HamburgerBuns>
  				<HamburgerBuns></HamburgerBuns>
			  	<HamburgerMenu>
			  			<li><Link to="/" style={{ textDecoration: `none`,}}>Home</Link></li>
							<li><Link to="/admin/" style={{ textDecoration: `none`,}}>Admin Page</Link></li>
							<li><a href="https://github.com/codeforboston/windfall-elimination" target="__blank" style={{ textDecoration: `none`,}}>Github</a></li>
							<li><Link to="/about/" style={{ textDecoration: `none`,}}>About</Link></li>
				</HamburgerMenu>
			  </Hamburger>
			</nav>
		)
	}
}
