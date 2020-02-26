import React from "react";
import styled from "@emotion/styled";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { colors } from "../constants";
import dayjs from "dayjs";
import Carousel from "react-slick";
import stepImg1 from "../images/step1.png"
import stepImg2 from "../images/step2.png"
import stepImg3 from "../images/step3.png"
import finalImg from "../images/final.png"


import {
  TextBlock,
  SEO,
  Card,
  H2,
} from "../components";

const H4 = styled.h4`
margin: 5px 0;
`

const P = styled.p`
margin:  10px 70px 10px 70px;
padding:  10px 10px 10px 50px;
`

const OL = styled.ol`
margin:  10px 70px 10px 70px;
padding:  10px 10px 10px 50px;
`

const H3 = styled.h3`
margin:  10px 70px 10px 70px;
padding:  10px 10px 10px 50px;
font-weight: bold;
`

const Img = styled.p`
margin:  10px 70px 10px 70px;
padding:  10px 10px 10px 50px;
`

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      css={{...style, ":before": {color: "black"}}}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      css={{ ...style, ":before": {color: "black"} }}
      onClick={onClick}
    />
  );
}


export default class Screen2a extends React.Component {
    constructor(props, context){
      super(props, context)

    }

    setArrowDisplay = currentSlide => {
        const { cityList } = this.props;
        const displayLeftArrow = currentSlide !== 0;
        const displayRightArrow = currentSlide !== cityList.length - this.slidesToShow;

        this.setState({ displayRightArrow, displayLeftArrow });
    };

    clickHandler = (direction) => {
      if (direction === 'left') {
        this.slider.slickPrev();
      } else if (direction === 'right') {
        this.slider.slickNext();
      }
    };

    render() {

        const settings = {
          dots: true,
          infinite: false,
          speed: 700,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          arrows: true,
          pauseOnHover: true,
          nextArrow: <NextArrow />,
          prevArrow: <PrevArrow />
        };

        return (
            <div>
                <SEO title="Pre-Screen 2a" keywords={[`gatsby`, `application`, `react`]} />
                <H2>Benefit Formula</H2>
                <Carousel {...settings}>
                  <section>
                    <H3><b>How does Social Security calculate my benefits?</b></H3>
                    <P>Social Security uses three things to calculate your Primary Insurance Amount, or your basic benefit before adjusting for early or late retirement.

                      The three inputs are:
                    </P>
                      <OL>
                      <li> Date of Birth </li>
                      <li> Lifetime average earnings, adjusted for inflation </li>
                      <li> Monthly non-Social Security pernsion </li>
                      </OL>
                    <P>
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
                    <Img>
                       <img src={stepImg1} width="500" height="400"/>
                    </Img>
                  </section>
                  <section>
                    <H3>Step 2:</H3>
                    <P>
                       Social Security calculates how much of your Average Indexed Monthly Earnings fall below your first <em>bend </em> and second <em>bend points.</em>
                    </P>
                    <Img>
                       <img src={stepImg2} width="500" height="400"/>
                    </Img>
                  </section>

                  <section>
                    <H3>Step 3:</H3>
                    <P>
                       Social Security calculates how much of your Average Indexed Monthly Earnings fall below your second <em>bend point.</em>
                    </P>
                    <Img>
                       <img src={stepImg3} width="500" height="400"/>
                    </Img>
                  </section>

                  <section>
                    <H3> Final Calculation </H3>
                    <P>
                        Finally, Social Security adds all the results from the three previous steps altogether.
                    </P>
                    <Img>
                       <img src={finalImg} width="500" height="400"/>
                    </Img>
                  </section>
                </Carousel>
            </div>
         )
    }
}
