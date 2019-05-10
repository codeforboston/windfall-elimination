import React from "react";
import {Runtime, Inspector} from "@observablehq/notebook-runtime";
import notebook from "windfall-awareness-notebook-prototype";
import { node } from "prop-types";
import { generateRuntime } from './observable-dock';

export const ObservableContext = React.createContext();


export class ObservableRuntime extends React.Component {
  constructor(props, context) {
      super(props, context);
      this.registerCellRef = this.registerCellRef.bind(this);
      this.resetCellRefs = this.resetCellRefs.bind(this);
      this.storeCellValues = this.storeCellValues.bind(this);
      this.generateDom = this.generateDom.bind(this);
      this.main = generateRuntime(notebook);
      this.observer = (dom) => {return new Inspector(dom)}
      this.state = {
        childrenCellRefs: [],
        runtimeState: {},
        allCells: [],
        allNamedCells: [],
        valueStore: {}
      };
   }

  componentDidMount() {

    if (this.state.childrenCellRefs !== 0) {
      this.state.childrenCellRefs.map(this.generateDom)
    }

    this.state.allNamedCells = this.state.allCells.map((n) => n.name).filter(n => n!== undefined)
    //"viewof yearsSubstantialEarningsPicked", "yearsSubstantialEarningsPicked", "viewof AIMEPicked", "AIMEPicked",
    // "viewof birthDatePicked", "birthDatePicked", "viewof ageToRetirePicked", "ageToRetirePicked", "viewof ageToRetireExtraMonthsPicked",
    // "ageToRetireExtraMonthsPicked", "viewof pensionNonCoveredMonthly", "pensionNonCoveredMonthly", "calculationDisplay", "viewof retireDatePicked", 
    // "retireDatePicked", "yearOf62yo", "viewof v", "v", "variableRetireDate", "rangeData", "viewof sourceOfRetireeProfile", "sourceOfRetireeProfile",
    //  "loadRetireeXML", "viewof perYearEarnings", "perYearEarnings", "getAIMEfromEarningRecord", "getSubstantialEarningsYears", "gestAIME", "getBenefitReduction",
    // "findBendPoints", "getPIA", "getWepMPB", "firstPiaFactor", "getGuaranteeLimit", "viewof useCacheUrlNotSheets", "useCacheUrlNotSheets", "checkCache",
    // "ColaTable", "benefitReductionTable", "substantialEarningsMarks", "bendPoints", "parsedXmlFileText", "fileTextTemp", "makePerYearEarningsTable",
    // "addRetirementAgeToBirthdate", "dayjs", "fastXml", "d3", "Tesseract", "viewof applyWEP", "applyWEP", "image", "ocrResult", "ocrParsedData"
  }

  componentDidUpdate() {
    this.main = generateRuntime(notebook);
    if (this.state.childrenCellRefs !== 0) {
      this.state.childrenCellRefs.map(this.generateDom)
    }
  }

  generateDom(cell) {

    this.state.allCells.push(cell)

    this.main.variable(this.observer(cell.domRef)).define([cell.cellName], widget => widget)

  }

  registerCellRef(cellName, domRef) {
    this.state.childrenCellRefs.push({cellName, domRef})
  }

  resetCellRefs() {
    this.state.childrenCellRefs = []
  }

  storeCellValues(cellName, cellValue) {
    this.state.valueStore[cellName] = cellValue
  }

  render() {
      return <ObservableContext.Provider value={{
           registerCellRef: this.registerCellRef, 
           resetCellRefs: this.resetCellRefs,
           storeCellValues: this.storeCellValues
           }}>
         {this.props.children}
       </ObservableContext.Provider>
  }

}
