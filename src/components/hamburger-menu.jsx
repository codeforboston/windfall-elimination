import React from 'react';
import { Link } from "gatsby";
import styled from "@emotion/styled"
import { colors, radii } from "../constants";

export const HamburgerGarnish= styled('span')`
    background-color: ${colors.red};
    display: block;
    width: 33px;
    height: 4px;
    background: #cdcdcd;
    border-size: 1px;
    border-color: ${colors.black};
    border-radius: ${radii[2]};
    margin: 4px;
`;

export class HamburgerBuns extends React.Component {

	renderMenu() {
		if (this.props.showBuns !== true) {
			return (
				<ul>
				<li><Link
					to="/admin/"
                    style={{
                        textDecoration: `none`,
                    }}>
                    Admin Page
                 </Link></li>
				<li><a href="https://github.com/codeforboston/windfall-elimination">Github Repo</a></li>
				<li>About</li>
				</ul>
			)
		} else {
			return (
				<div>
					<HamburgerGarnish></HamburgerGarnish>
					<HamburgerGarnish></HamburgerGarnish>
					<HamburgerGarnish></HamburgerGarnish>
				</div>
			)
		}
		
	}
	render() {
		return(
			<div></div>
			)
	}
}

export default class HamburgerHelper extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.handleClick = this.handleClick.bind(this);
		this.state = {
	      showBuns: false
	    };
	}

	handleClick() {
		console.log('Here')
		this.setState({
			showBuns: true
		})
	}

	render() {
		return(
			<nav role="navigation">
			  <div id="menuToggle">
			  	<button onClick={this.handleClick} hidden={this.state.showBuns}>
			  		<HamburgerBuns />
				</button>
			  </div>
			</nav>
		)
	}
}
