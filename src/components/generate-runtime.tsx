import {Runtime, Inspector, Library} from "@observablehq/runtime";
import notebook from "windfall-awareness-notebook-prototype";

export function generateRuntime(notebook) {
	 	const {modules, id} = notebook;
	 	var library = new Library();
	    var map = new Map;
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

	 	return main
}