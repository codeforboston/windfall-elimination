import styled from "@emotion/styled";
import SectionsCarousel from "react-slick";
import { breakPoints, colors } from "../constants";
import { H2, SEO } from "../components";
import stepImg1 from "../images/step1.png";
import stepImg2 from "../images/step2.png";
import stepImg3 from "../images/step3.png";
import finalImg from "../images/final.png";

const Screen2a = () => {
  const Arrow = ({ className, onClick }: {
    className?: string,
    onClick?: () => void
  }) => (
    <ArrowElement
      className={className}
      isArrowLeft={className ? className.includes("slick-prev") : false }
      onClick={onClick}
    />
  );

  return (
    <Wrapper>
      <SEO
        keywords={["application", "gatsby", "react"]}
        title="Pre-Screen 2a"
      />
      <H2> Benefit Formula </H2>
        <SectionsList>
          {renderSections()}
        </SectionsList>
        <SectionsCarousel
          arrows={true}
          className="screen-2a-carousel-container"
          dots={true}
          infinite={false}
          nextArrow={<Arrow />}
          pauseOnHover={true}
          prevArrow={<Arrow />}
          slidesToScroll={1}
          slidesToShow={1}
          speed={700}
        >
          {renderSections({ isInCarousel: true })}
        </SectionsCarousel>
    </Wrapper>
  )
};

const renderSections = ({ isInCarousel }: { isInCarousel?: boolean } = {}) => {
  const key = `screen-2a-${isInCarousel ? "carousel" : "list"}-section-`

  return ([
    <Section isInCarousel={isInCarousel} key={key + "1"}>
      <h3> How does Social Security calculate my benefits? </h3>
      <p>
        Social Security uses three things to calculate your Primary Insurance
        Amount, or your basic benefit before adjusting for early or late
        retirement.
        <br />
        <br />
        The three inputs are:
      </p>
      <ol>
        <li> Date of birth </li>
        <li> Lifetime average earnings, adjusted for inflation </li>
        <li> Monthly non-Social Security pension </li>
      </ol>
      <p> We'll walk you through an example in the following steps. </p>
    </Section>,

    <Section isInCarousel={isInCarousel} key={key + "2"}>
      <h3> Step 1: </h3>
      <p>
        Social Security calculates how much of your Average Indexed Monthly
        Earnings (AIME) fall below your first <em> bend point.</em> Bend points
        are set by law and correspond to the year of your birth. For this
        example, we are using the bend points for someone who turned 62 in 2018,
        and had AIME of $6,000.
        <br />
        <br />
        You get 90% of what falls under this bend point.
      </p>
       <Table>
        <tr>
          <TD>step1</TD>
          <TD>step2</TD>
          <TD>step3</TD>
          <TD>PIA</TD>
        </tr>
        <tr>
         <TD>$805</TD>
          <TD>0</TD>
     
          <TD>0</TD>
          <TD>$100</TD>
        </tr>
      </Table>

      <Image src={stepImg1} />
    </Section>,

    <Section isInCarousel={isInCarousel} key={key + "3"}>
      <h3> Step 2: </h3>
      <p>
        Social Security calculates how much of your AIME fall below your first
        and second <em> bend points. </em>
      </p>
      <Image src={stepImg2} />
    </Section>,

    <Section isInCarousel={isInCarousel} key={key + "4"}>
      <h3> Step 3: </h3>
      <p>
        Social Security calculates how much of your AIME fall below your second
        <em> bend point. </em>
      </p>
      <Image src={stepImg3} />
    </Section>,

    <Section isInCarousel={isInCarousel} key={key + "5"}>
      <h3> Final Calculation </h3>
      <p>
        Finally, Social Security adds the results of the three previous steps
        altogether.
      </p>
      <Image src={finalImg} />
    </Section>
  ])
};

const Wrapper = styled.div`
  width: 100%;
  .screen-2a-carousel-container {
    display: none;
    margin: 1rem auto 0;
    max-width: 40rem;
    width: calc(100% - 2rem);
    @media (min-width: ${breakPoints[3]}) {
      display: block;
    }
  }
`;

const SectionsList = styled.div`
  display: block;
  @media (min-width: ${breakPoints[3]}) {
    display: none;
  }
`;

const Section = styled.section<{ isInCarousel?: boolean }>`
  box-sizing: border-box;
  margin-top: ${props => !props.isInCarousel && "3rem"};
  outline: none;
  padding: ${props => props.isInCarousel && "0 1rem"};
`;

const Image = styled.img`
  margin: auto;
  max-width: 40rem;
  width: 100%;
`;

const ArrowElement = styled.div<{ isArrowLeft?: boolean }>`
  height: 2.5rem;
  left: ${props => props.isArrowLeft && "-2.75rem"};
  right: ${props => !props.isArrowLeft && "-2.75rem"};
  width: 2.5rem;
  &:before {
    color: ${colors.purple};
    font-size: 2.5rem;
  }
`;

const Table = styled.table`
margin-left: auto;
margin-right: auto;
width: 60%;
border: solid;
`;

export default Screen2a;
