import { getPIA } from "../library/observable-functions";
describe("Header", () => {
  it("renders correctly", async () => {
  	expect.assertions(1);
  	var value = await getPIA(3500, "1956-01-02", null, false)
    expect(value).toBe(Number("1639.1"))
  })
})