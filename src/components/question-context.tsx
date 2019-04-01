import React from "react";
import { Card } from "../components";

type ContextProps = {
    // TODO flesh out values
    hasSocialSecurityAccount: boolean;
    nonCoveredEmployment: boolean;
    pensionOrRetirementAccount: boolean;
    dateOfBirth: string;
    socialSecurityBenefitsAmount: number;
    yearsOfSubstantialEarnings: number;
    amountOfNonCoveredPension: number;
};

const QuestionContext = React.createContext<ContextProps>(null!);

type Props = {};
type State = ContextProps;
export class QuestionProvider extends React.Component<Props, State> {
    state: State = {
        hasSocialSecurityAccount: false,
        nonCoveredEmployment: false,
        pensionOrRetirementAccount: false,
        dateOfBirth: "",
        socialSecurityBenefitsAmount: 0,
        yearsOfSubstantialEarnings: 0,
        amountOfNonCoveredPension: 0,
    };
    render() {
        const { children } = this.props;
        return (
            <QuestionContext.Provider value={{
                // TODO flesh out values
                hasSocialSecurityAccount: this.state.hasSocialSecurityAccount,
                nonCoveredEmployment: this.state.nonCoveredEmployment,
                pensionOrRetirementAccount: this.state.pensionOrRetirementAccount,
                dateOfBirth: this.state.dateOfBirth,
                socialSecurityBenefitsAmount: this.state.socialSecurityBenefitsAmount,
                yearsOfSubstantialEarnings: this.state.yearsOfSubstantialEarnings,
                amountOfNonCoveredPension: this.state.yearsOfSubstantialEarnings
            }}>
                <QuestionValues values={this.state} />
                { children }
            </QuestionContext.Provider>
        )
    }
}

export const QuestionConsumer = QuestionContext.Consumer;

type QuestionValuesProps = {
    values: ContextProps;
}
const QuestionValues: React.FC<QuestionValuesProps> = ({ values }) => (
    <Card>
        <div>Question values</div>
        <ul style={{ listStyle: "none" }}>
            <li>Social Security: {values.hasSocialSecurityAccount.toString()}</li>
            <li>Non-covered Employment: {values.nonCoveredEmployment.toString()}</li>
            <li>Pension or retirement Account: {values.pensionOrRetirementAccount.toString()}</li>
            <li>Date of birth: {values.dateOfBirth}</li>
            <li>Social Security benefits amount: {values.socialSecurityBenefitsAmount}</li>
            <li>Years of earnings: {values.yearsOfSubstantialEarnings}</li>
            <li>Amount of non-covered pension: {values.amountOfNonCoveredPension}</li>
        </ul>
    </Card>
)