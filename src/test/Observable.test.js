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
	const userDOR = new Date("2013-10-10").toLocaleDateString("en-US"); // 66 is their full retirement age
	const year62 = "2009";
	const userYSE = getYearsSE(earnings);
	const userPension = 0;


	it("Correctly tallies years of substantial earnings from a full earnings record.", async () => {
		expect.assertions(1);
		
		expect(userYSE).toBe(30)
	})

	it("Correctly calculates getAIMEFromEarnings from a full earnings record.", async () => {
		expect.assertions(1);
	    
	  	var AIME = await getAIMEFromEarnings(earnings, year62)
		//3383 is value for Observable notebook with correct birthdate.
	    expect(AIME).toBe(3383)
  	})

	it("Correctly calculates Payable Benefit from a full earnings record according to observable (good).", async () => {
 		expect.assertions(1);

	  	var userAIME = getAIMEFromEarnings(earnings, year62)

	   	var userCalc = await finalCalculation(userDOB, userDOR, year62, userYSE, userPension, userAIME)

		/* detailed calculator says 1,595.10 while observable says 1514.08, XML said 1811.00 (likely flawed)  */
	    expect(Number(userCalc["MPB"])).toBe(1514.08)
	 })

	/* it("Correctly calculates Payable Benefit from a full earnings record (best, XML may be flawed)", async () => {
		expect.assertions(1);

		 var userAIME = getAIMEFromEarnings(earnings, year62)

		  var userCalc = await finalCalculation(userDOB, userDOR, year62, userYSE, userPension, userAIME)

		// detailed calculator says 1,595.10 while observable says 1514.08, XML said 1811.00 (likely flawed) 
		expect(Number(userCalc["MPB"])).toBe(1595.10)
	}) */
})

describe("Sample 20 AnyPIA (Full Retirement)", () => {
	
	//Background finance info for Sample20 
	const earnings = sample20RetirementValues['osss:OnlineSocialSecurityStatementData']['osss:EarningsRecord']['osss:Earnings'];
	const userDOB = new Date("1952-06-22");
	const userDOR = new Date("2018-07-22").toLocaleDateString("en-US"); // 66yo is their full retirement age.
	const year62 = "2014";
	const userYSE = getYearsSE(earnings);
	const userPension = 1500;

	it("Correctly tallies years of substantial earnings from a full earnings record.", async () => {
		expect.assertions(1);
		
		expect(userYSE).toBe(22)
	})

	//Test AIME calculations
	it("Correctly calculates getAIMEFromEarnings from a full earnings record.", async () => {
		expect.assertions(1);
	    
	  	var AIME = await getAIMEFromEarnings(earnings, 2014)

	    expect(AIME).toBe(3403)
  	})

	//Test MPB calculations
	it("Correctly calculates Payable Benefit from a full earnings record (best).", async () => {
 		expect.assertions(1);

	  	var userAIME = getAIMEFromEarnings(earnings, year62)

	   	var userCalc = await finalCalculation(userDOB, userDOR, year62, userYSE, userPension, userAIME)

		/* both Detailed Calculator and Observable matched this value for me with the 1500 pension -tk */
	    expect(Number(userCalc["MPB"])).toBe(1235.84)
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