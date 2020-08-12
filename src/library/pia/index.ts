import { PiaFormat } from "./pia-format";
import { UserProfile } from "../user-state-context";
import { PiaEarnings } from "./pia-types";

///////////////////////////////
// Final Calculation Display //
///////////////////////////////

export async function finalCalculation(
  birthDatePicked: string,
  retireDatePicked: string,
  earnings: PiaEarnings
) {
  //const userFullRetireDate = getFullRetirementDate(new Date(birthDatePicked));

  const piaFormat = new PiaFormat();
  //piaFormat.setBirthDate(birthDatePicked).setEntitlementDate(retireDatePicked).setOsdiEarnings(earnings);
  const userProfile: UserProfile = {
    "Standard PIA": "0",
    "WEP PIA": "0", //.toFixed(2),
    "WEP Diff": "0",
    MPB: "0", //wepMPB.toFixed(2),
    yearsSubstantialEarnings: 0,
    pensionNonCoveredMonthly: 0,
    aime: 0,
    fullRetireDate: new Date("1900-1-1").toLocaleDateString("en-US"),
  };

  return userProfile;
}
