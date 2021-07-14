import { checkJSONCache } from "./wep-cache";
import { csv } from 'd3-fetch';

var getWepTables = (function() {

	var ColaTable = function() {
		const ColaTable = checkJSONCache("ColaTable") || csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0KGd5_ZHdYIIFPdSzBHkG38FAkGQ04ADGHKkT-ODA64Qr79Ia8g-W1DMNFb4LEC2sh502ybgPeQDF/pub?gid=1291489757&single=true&output=csv",
		                    ({Year, COLA}) => 
		                    ({year: +Year,
		                      Cola: Number(COLA)})
                   			)

		return ColaTable
	}
	
	var actuarialValueLumpSumTable = function(){
		const actuarialValueLumpSumTable = checkJSONCache("actuarialValueLumpSumTable") || csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0KGd5_ZHdYIIFPdSzBHkG38FAkGQ04ADGHKkT-ODA64Qr79Ia8g-W1DMNFb4LEC2sh502ybgPeQDF/pub?gid=1500974875&single=true&output=csv',
		                    ({age, Column20160601, Column20110531, Column20070601, Column20070531}) => 
		                    ({age: +age,
		                      column20160601: +Column20160601,
		                      column20110531: +Column20110531,
		                      column20070601: +Column20070601,
		                      column20070531: +Column20070531
		                     })
		               )
				return actuarialValueLumpSumTable
	}

	var benefitReductionTable = function(){
		const benefitReductionTable = checkJSONCache("benefitReductionTable") || csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0KGd5_ZHdYIIFPdSzBHkG38FAkGQ04ADGHKkT-ODA64Qr79Ia8g-W1DMNFb4LEC2sh502ybgPeQDF/pub?gid=297756699&single=true&output=csv',
                    ({YearOfBirth, NormalRetirementAge, PctCreditForEachDelayYear, age62,age63,age64,age65,age66,age67,age68,age69,age70}) => 
                    ({year: +YearOfBirth,
                      NormalRetirementAge: +NormalRetirementAge,
                      PctCreditForEachDelayYear: +PctCreditForEachDelayYear,
                      yearsFrom62: [age62,age63,age64,age65,age66,age67,age68,age69,age70].map(d => +d/100)
                      })
                    )

        return benefitReductionTable
	}

	var substantialEarningsMarks = function() {
		const substantialEarningsMarks = checkJSONCache("substantialEarningsMarks") || csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0KGd5_ZHdYIIFPdSzBHkG38FAkGQ04ADGHKkT-ODA64Qr79Ia8g-W1DMNFb4LEC2sh502ybgPeQDF/pub?gid=1895732439&single=true&output=csv',
                    ({Year, SubstantialEarnings}) => 
                    ({year: +Year,
                      SubstantialEarnings: Number(SubstantialEarnings.replace("$",""))})
                   )

		return substantialEarningsMarks
	}


	var bendPoints = function() {
		const bendPoints = checkJSONCache("bendPoints") || csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0KGd5_ZHdYIIFPdSzBHkG38FAkGQ04ADGHKkT-ODA64Qr79Ia8g-W1DMNFb4LEC2sh502ybgPeQDF/pub?gid=1610617310&single=true&output=csv',
                    ({Year, FirstDollarAmtPIA, SecondDollarAmtPIA, DollarAmtInMaxFamilyBenefitFormula, NA, IsActualValue}) => 
                    ({year: +Year,
                      FirstDollarAmtPIA: Number(FirstDollarAmtPIA.replace("$","")),
                      SecondDollarAmtPIA: Number(SecondDollarAmtPIA.replace("$","").replace(",", "")),
					  DollarAmtInMaxFamilyBenefitFormula: Number(DollarAmtInMaxFamilyBenefitFormula.replace("$","").replace(",", "")),
					  isActualValue: IsActualValue==="Yes" || IsActualValue==="yes"
					})
                   ) //

		return bendPoints
	}
	var maximumEarningsCreditable = function() {
		// used only for the AIME from earnings calculation.
		const maximumEarningsCreditable = checkJSONCache("maximumEarningsCreditable") || csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0KGd5_ZHdYIIFPdSzBHkG38FAkGQ04ADGHKkT-ODA64Qr79Ia8g-W1DMNFb4LEC2sh502ybgPeQDF/pub?gid=519940844&single=true&output=csv',
                    ({Year, TaxRatePct, MaximumWagesTaxable, MaximumAnnualContributions}) => 
                    ({year: +Year,
                      maximumEarningsCreditable: +MaximumWagesTaxable
                     })
               )
		return maximumEarningsCreditable
	}

	var averageWageIndexTable = function() {

		const averageWageIndexTable = checkJSONCache("averageWageIndexTable") || csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0KGd5_ZHdYIIFPdSzBHkG38FAkGQ04ADGHKkT-ODA64Qr79Ia8g-W1DMNFb4LEC2sh502ybgPeQDF/pub?gid=1069245443&single=true&output=csv',
                    ({Year, AverageWageIndex,LowWage20192, HighWage20192, CalcPercent, TrusteeReportIntermediate20192, TrusteeReportHigh20192, TrusteeReportLow20192,IsActualValue}) => 
                    ({year: +Year,
					  averageWageIndex: +AverageWageIndex,
					  isActualValue: IsActualValue === "Yes" || IsActualValue === "yes"
                     })
               )

		return averageWageIndexTable
	}

	var fullRetirementAgeTable = function() {

		const fullRetirementAge = checkJSONCache("fullRetirementAgeTable")

		return fullRetirementAge
	}

	return {
		ColaTable: ColaTable,
			actuarialValueLumpSumTable: actuarialValueLumpSumTable,
	    benefitReductionTable: benefitReductionTable,
	    substantialEarningsMarks: substantialEarningsMarks,
	    bendPoints: bendPoints,
	    maximumEarningsCreditable: maximumEarningsCreditable,
	    averageWageIndexTable: averageWageIndexTable,
	    fullRetirementAgeTable: fullRetirementAgeTable
  	}

})();

export { getWepTables }