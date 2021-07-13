import dayjs from "dayjs";
import { useUserStateActions } from "../library/user-state-actions-context";

describe("calculations", () => {
  const birthDate = new Date();
  birthDate.setFullYear(1957, 4, 23);

  /* async */ function setRetireDate(dateOfBirth: Date, retireAge: number) {
    const retireAgeInRoundedMonths = Math.round((/* await */ retireAge) * 12);
    var retireDate = dayjs(dateOfBirth)
      .add(retireAgeInRoundedMonths, "month")
      .toDate();
    // userStateActions.setRetireDate(retireDate);
    return retireDate;
  }

  function setRetireDateNew(dateOfBirth: Date, retireAge: number) {
    const retireAgeInRoundedMonths = Math.round(retireAge * 12);
    const retireDate = dayjs(dateOfBirth)
      .add(retireAgeInRoundedMonths, "month")
      .toDate();
    return retireDate;
  }

  it("sets retirement date", () => {
    const oldDate = setRetireDate(birthDate, 66.5)
    const newDate = setRetireDateNew(birthDate, 66.5);
    console.log(oldDate, newDate)
    expect(oldDate).toEqual(newDate);
  });
});
