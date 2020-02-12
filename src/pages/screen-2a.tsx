import React from "react";
import styled from "@emotion/styled";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { colors } from "../constants";
import { SessionStore } from "../library/session-store";
import dayjs from "dayjs";
import Carousel from "react-slick";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
import "../static/slick.css";
import "../static/slick-theme.css";
import {
  TextBlock,
  SEO,
  Card,
  H2,
} from "../components";

const H4 = styled.h4`
margin: 5px 0;
`

const StyleCarousel = styled(Carousel)`
margin: 20px 30px 15px 40px;
`

const P = styled.p`
margin:  20px 30px 15px 40px;
padding:  10px 30px 15px 40px;
`

const H3 = styled.h3`
margin:  20px 30px 15px 40px;
padding:  10px 30px 15px 40px;
font-weight: bold;
`

export default class Prescreen1c extends React.Component {
  constructor(props, context){
    super(props, context)
    this.state = {
    };
  }


    render() {
        const settings = {
          dots: true,
          infinite: false,
          speed: 700,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: false,
          dots: true

        };

        return (
            <div>
                <SEO title="Pre-Screen 2a" keywords={[`gatsby`, `application`, `react`]} />
                <H2>Benefit Formula</H2>
                <StyleCarousel {...settings}>
                  <section>
                    <H3><b>How does Social Security calculate my benefits?</b></H3>
                    <P>Social Security uses three things to calculate your Primary Insurance Amount, or your basic benefit before adjusting for early or late retirement.

                      The three inputs are:

                      1) Date of Birth
                      2) Lifetime average earnings, adjusted for inflation
                      3) Monthly non-Social Security pernsion

                      We'll walk you through those three steps in the following pages.
                    </P>
                  </section>
                  <section>
                    <H3>Step 1:</H3>
                    <P>
                       <span>
                         Social Security calculates how much of your Average Indexed Monthly Earnings fall below your first <em>bend point</em>.
                         Bend points are set by law and correspond to be the year of your brith. For this example, we are using the bend points
                         for someone who turned 62 in 2018, and had Average indexed Monthly Earnings of $6,000.

                         You get 90% of what falls under this bend point.
                       </span>
                    </P>
                    <P>
                       . Image .
                    </P>
                  </section>
                  <section>
                    <H3>Step 2:</H3>
                    <P>
                       Social Security calculates how much of your Average Indexed Monthly Earnings fall below your first <em>bend </em> and  second <em>bend points</em>
                    </P>
                    <P>
                       .Image.
                    </P>
                  </section>

                  <section>
                    <H3>Step 3:</H3>
                    <P>
                       Social Security calculates how much of your Average Indexed Monthly Earnings fall below your second <em>bend point</em>.
                    </P>
                    <P>

                    .Image.
                    </P>
                  </section>

                  <section>
                    <H3> Final Calculation </H3>
                    <P>
                        Finally, Social Security adds all the results from the three previous steps altogether.
                    </P>
                    <P>
                       .Image.
                    </P>
                  </section>
                </StyleCarousel>
            </div>
         )
    }
}
