import React from 'react';
import {Runtime, Inspector, Library} from "@observablehq/notebook-runtime";
import notebook from "windfall-awareness-notebook-prototype";
import { ButtonLink, ObservableFunction } from '../components';
import { Link } from "gatsby"

export default class ObservableDock extends React.Component {
	constructor(props, context) {
	    super(props, context);
	    this.cellStore = {}
	    this.obsRuntime = this.obsRuntime.bind(this);
      	this.inspector = this.inspector.bind(this);

	    this.defaultRef = React.createRef();
	    this.secondRef = React.createRef();
	    this.state = {
	      storeLoaded: false,
	      widget: false,
	      widgetvalue: '',
	      obsObj: ''
	    };

	 }

	 componentDidMount() {
	 	if (!this.state.storeLoaded){
	 		
	 		this.obsRuntime(notebook, this.inspector, this.returnMap);
      		
      		this.setState({
      			storeLoaded: true,
      		});
		}
		
	 }

	 inspector(cell) {
	 		switch (cell) {
	 			case 'AIMEPicked':
	 				return new Inspector(document.getElementById('a'));

	 			case "viewof birthDatePicked":
	 				return new Inspector(document.getElementById('b'));

	 			case "viewof yearsSubstantialEarningsPicked":
	 				return new Inspector(document.getElementById('c'));

	 			case "viewof pensionNonCoveredMonthly":
	 				return new Inspector(document.getElementById('d'));

	 			case 'viewof retireDatePicked':
	 				return new Inspector(document.getElementById('e'));

	 			case "calculationDisplay":

	 				return new Inspector(document.getElementById('f'));

	 			default:
	 				// code...
	 				break;
	 		}
	 	}

	 obsRuntime(notebook, observer, finalmap) {
	 	const {modules, id} = notebook;
	 	var library = new Library();
	    var map = new Map;
	    var returnMap = new Map;
	    var runtime = new Runtime(library);
	    const main = runtime_module(id);
	    

	    function runtime_module(id) {
		    let module = map.get(id);
		    if (!module) map.set(id, module = runtime.module());
		    return module;
	  	}

	 	for (const m of modules) {
	 		const module = runtime_module(m.id);
	 		let i = 0;
	 		for (const v of m.variables) {
	 				if (v.from) {
	 					module.import(v.remote, v.name, runtime_module(v.from)); 				
	 				} else if (module === main) { 
		 				module.variable().define(v.name, v.inputs, v.value);
	 				} else {
	 					module.define(v.name, v.inputs, v.value);	
	 				}
		 			++i;
		 		}

	 	}
	 	main.variable(observer('AIMEPicked')).define(["viewof AIMEPicked"], widget => widget)
	 	main.variable(observer("viewof birthDatePicked")).define(["viewof birthDatePicked"], widget => widget)
	 	main.variable(observer("viewof yearsSubstantialEarningsPicked")).define(["viewof yearsSubstantialEarningsPicked"], widget => widget)
	 	main.variable(observer("viewof pensionNonCoveredMonthly")).define(["viewof pensionNonCoveredMonthly"], widget => widget)
	 	main.variable(observer("viewof retireDatePicked")).define(['viewof retireDatePicked'], widget => widget)
	 	//main.variable(observer("calculationDisplay")).define(["calculationDisplay"], widget => widget)

	 	this.setState({
	 		obsObj: main
	 	})
	 }

	render() {
		if(this.state.obsObj) {
			var obsFunc = <ObservableFunction mod={this.state.obsObj} inspector={this.inspector} />;
		} else {
			var obsFunc = <></>
		}
		var k=""
		return(
			<>
			<div id='a'></div>
			<div id='b'></div>
			<div id='c'></div>
			<div id='d'></div>
			<div id='e'></div>
			<div id='f'></div>
			{obsFunc}
			</>
		)
	}
}