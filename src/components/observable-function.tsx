import React from "react";
import {Runtime, Inspector} from "@observablehq/notebook-runtime";
import notebook from "windfall-awareness-notebook-prototype";

export default class ObservableFunction extends React.Component {
	constructor(props, context) {
	    super(props, context);

	    this.defaultRef = React.createRef();
	    this.handleWidget = this.handleWidget.bind(this);
	   	this.displayHTML = this.displayHTML.bind(this);

	    this.state = {
	      newfunction: '',
	      widget: false,
	      widgetvalue: ''
	    };
	 }


	componentDidMount() {
		Runtime.load(notebook, (cell) => {
			if (cell.name == this.props.cellname) {
				var newfunc = cell.value
				if (newfunc instanceof Function) {
					if (newfunc.toString()[0] === 'f') {
						this.setState({
		        			newfunction: newfunc
		        		})
					} else {
						return {fulfilled: (value) => {
	          				this.setState({
	          					widget: true,
	          					widgetvalue: value
	          				})
							}
						}
					}

	        	} else {
	        		return new Inspector(this.defaultRef.current);
	        	}
			}

      	});

	}

	handleWidget(e) {
		this.setState({
			widgetvalue: e.target.value
		})
	}

	displayHTML() {
		if (this.state.widget) {
			if (this.props.isTable) {
				var tablerows = this.state.widgetvalue.split(/\r?\n/).map((element, index) => {
					return <tr key={index}><td>{element}</td></tr>
				});
				return (
					<div>
						<table><tbody>{tablerows}</tbody></table>
					</div>
				)
			} else {
				return (
					<div>
						<label>{this.state.widgetvalue}</label>
						<input type="range" min="0" max={this.props.widgetmax} step="1" value={this.state.widgetvalue} onChange={this.handleWidget} />
					</div>
				)
			}
		} else if (this.state.newfunction) {
			if (this.props.isImage) {
				var result = this.state.newfunction()
				var node = this.defaultRef.current
				node.appendChild(result)
			}
			return <div ref={this.defaultRef}></div>
		} else {
			return <div ref={this.defaultRef}></div>
		}
	}

	render() {
		return (
			<div>
				{this.displayHTML()}
			</div>
		)
	}

}
