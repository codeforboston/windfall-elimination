import { getPIA, getAIMEFromEarnings, getYearsSE, finalCalculation } from "../library/observable-functions";
import { delayedRetirementValues, fullRetirementValues, sample20RetirementValues } from "../library/testFiles";

describe("Working Example", () => {
  it("just to show a working example", async () => {
  	expect.assertions(1);
  	var value = await getPIA(3500, "1956-01-02", null, false)
    expect(value).toBe(Number("1639.1"))
  })
})

describe("John Q. Public (Full Retirement)", () => {

	const earnings = fullRetirementValues['osss:OnlineSocialSecurityStatementData']['osss:EarningsRecord']['osss:Earnings'];
	const userDOB = new Date("1947-10-10");
	const userDOR = new Date("2014-10-10").toLocaleDateString("en-US");
	const year62 = "2009";
	const userYSE = getYearsSE(earnings);
	const userPension = 0;

	it("Correctly calculates getAIMEFromEarnings from a full earnings record.", async () => {
		expect.assertions(1);
	    
	  	var AIME = await getAIMEFromEarnings(earnings, 2014)

	    expect(AIME).toBe(3711)
  	})

	it("Correctly calculates Payable Benefit from a full earnings record.", async () => {
 		expect.assertions(1);

	  	var userAIME = getAIMEFromEarnings(earnings, year62)

	   	var userCalc = await finalCalculation(userDOB, userDOR, year62, userYSE, userPension, userAIME)

	    expect(Number(userCalc["MPB"])).toBe(1635.21)
	 })
})

describe("Sample 20 AnyPIA (Full Retirement)", () => {
	
	//Background finance info for Sample20 
	const earnings = sample20RetirementValues['osss:OnlineSocialSecurityStatementData']['osss:EarningsRecord']['osss:Earnings'];
	const userDOB = new Date("1952-06-22");
	const userDOR = new Date("2014-07-22").toLocaleDateString("en-US");
	const year62 = "2014";
	const userYSE = getYearsSE(earnings);
	const userPension = 1500;


	//Test AIME calculations
	it("Correctly calculates getAIMEFromEarnings from a full earnings record.", async () => {
		expect.assertions(1);
	    
	  	var AIME = await getAIMEFromEarnings(earnings, 2014)

	    expect(AIME).toBe(3403)
  	})

	//Test MPB calculations
	it("Correctly calculates Payable Benefit from a full earnings record.", async () => {
 		expect.assertions(1);

	  	var userAIME = getAIMEFromEarnings(earnings, year62)

	   	var userCalc = await finalCalculation(userDOB, userDOR, year62, userYSE, userPension, userAIME)

	    expect(Number(userCalc["MPB"])).toBe(1336.47)
	 })
})

//getAIMEFromEarnings solo test function
describe("getAIMEFromEarnings test solo function", () => {
  it("Correctly calculates getAIMEFromEarnings from a full earnings record.", async () => {
  	expect.assertions(1);

  	var AIME = await getAIMEFromEarnings(fullRetirementValues['osss:OnlineSocialSecurityStatementData']['osss:EarningsRecord']['osss:Earnings'], 2014);

    expect(AIME).toBe(3711)
  })
})