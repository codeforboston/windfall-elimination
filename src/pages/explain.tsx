import React from "react"
import { ButtonLink, ButtonLinkRed, Form, SEO, ObservableCell, Card, Message, UnorderedList } from "../components";

export default class Explain extends React.Component {
	constructor(props, context) {
        super(props)
    }

    render() {
    	return(
			<>
                <SEO title="Explanation" keywords={[`gatsby`, `application`, `react`]} />
                <Card>
                	Your lifetime earnings in Social Security are indexed (adjusted for inflation) and then averaged to come up with an Average Indexed Monthly Earnings amount, or AIME.
                	<ObservableCell cellname='AIMEPicked' />
                	Your AIME is divided into buckets. The buckets are based on bend points, or arbitrary cutoff points set by the Social Security Administration. 
                </Card>
                <Card>
					The bend points change every year. Social Security uses the bend points for the year you turned 62.
					<UnorderedList>
						<li>Social Security gives you back a different percentage of what you paid into each bucket. If you are NOT AFFECTED BY WEP:</li>
						<li>Social Security gives you back 90% of what you paid into the first bucket.</li>
						<li>Social Security gives you back 32% of what you paid into the second bucket.</li>
						<li>Social Security gives you back 15% of what you paid into the third bucket.</li>
					</UnorderedList>

                </Card>
                <Card>
                	The sum of what the SSA returns to you from each bucket is called your Primary Insurance Amount, or PIA. 
                	This is the basic amount the SSA will pay you for your retirement benefits, although it will be adjusted up or down on a few other factors.
                </Card>
                <Card>
                	If you ARE affected by WEP, the percentage of the first bucket changes.

                	The percentage the SSA gives you of your first bucket depends on how many years you paid a “Substantial Amount” into Social Security. 
                	The more years you paid in, the more Social Security gives you back of the first bucket.
                </Card>
        		<ButtonLinkRed to="/screen-2/">Go back!</ButtonLinkRed>
            </>
    	)
    }
}