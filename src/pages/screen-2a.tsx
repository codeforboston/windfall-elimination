import styled from "@emotion/styled";
import SectionsCarousel from "react-slick";
import { breakPoints, colors } from "../constants";
import { H2, SEO} from "../components";
import stepImg1 from "../images/step1.png";
import stepImg2 from "../images/step2.png";
import stepImg3 from "../images/step3.png";
import finalImg from "../images/final.png";
import {radii, spacing } from "../constants";
import { FunctionComponent } from 'react'; 
import {
  UserState,
  EarningsEnum,
  useUserState,
} from "../library/user-state-context";
import {
  UserStateActions,
  useUserStateActions,
} from "../library/user-state-actions-context";
import { format } from 'd3-format';



interface Screen2aProps {
  userState: UserState;
  userStateActions: UserStateActions;
}



export const Screen2a: FunctionComponent<Screen2aProps> = () => {
  // const {
  //     userState: { haveEarnings, haveSSAAccount, earningsFormat },
  // } = this.props;

  
 // debugger
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
          {SliderSections()}
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
          {SliderSections({ isInCarousel: true })}
        </SectionsCarousel>
    </Wrapper>
  )
};

const SliderSections = ({ isInCarousel }: { isInCarousel?: boolean } = {}) => {
  const userState = useUserState(); // react hook always on top of functional components
  const key = `screen-2a-${isInCarousel ? "carousel" : "list"}-section-`;
  const userStateTablePage1 = userState && userState.userProfile && userState.userProfile.bendPoints;
  const beforeFirstBendPoint = (userStateTablePage1 && userStateTablePage1[0] && userStateTablePage1[0].Amount) || 805.5;
  const afterFirstBendPoint = (userStateTablePage1 && userStateTablePage1[1] && userStateTablePage1[1].Amount) || 1440.64;
  const pastSecondBendPoint = (userStateTablePage1 && userStateTablePage1[2] && userStateTablePage1[2].Amount) || 90.45;
  var totalPrimaryInsuranceAmount = beforeFirstBendPoint + afterFirstBendPoint + pastSecondBendPoint;
  const formatValue = format('$,.4r');
  console.log('userStateTablePage1',  userStateTablePage1) ;


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
       <DisplayTable>
        <tr>
          <TableHeader>step1</TableHeader>
          <TableHeader>step2</TableHeader>
          <TableHeader>step3</TableHeader>
          <TableHeader>PIA</TableHeader>
        </tr>
        <tr>
          <td>{formatValue(beforeFirstBendPoint)}</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </DisplayTable>

      <Image src={stepImg1} />
    </Section>,

    <Section isInCarousel={isInCarousel} key={key + "3"}>
      <h3> Step 2: </h3>
      <p>
        Social Security calculates how much of your AIME fall below your first
        and second <em> bend points. </em>
      </p>
       <DisplayTable>
        <tr>
          <TableHeader>step1</TableHeader>
          <TableHeader>step2</TableHeader>
          <TableHeader>step3</TableHeader>
          <TableHeader>PIA</TableHeader>
        </tr>
        <tr>
          <td>{formatValue(beforeFirstBendPoint)}</td>
          <td>{formatValue(afterFirstBendPoint)}</td>
          <td></td>
        <td></td>
        </tr>
      </DisplayTable>
      <Image src={stepImg2} />
    </Section>,

    <Section isInCarousel={isInCarousel} key={key + "4"}>
      <h3> Step 3: </h3>
      <p>
        Social Security calculates how much of your AIME fall below your second
        <em> bend point. </em>
      </p>
       <DisplayTable>
        <tr>
          <TableHeader>step1</TableHeader>
          <TableHeader>step2</TableHeader>
          <TableHeader>step3</TableHeader>
          <TableHeader>PIA</TableHeader>
        </tr>
        <tr>
          <td>{formatValue(beforeFirstBendPoint)}</td>
          <td>{formatValue(afterFirstBendPoint)}</td>
          <td>{formatValue(pastSecondBendPoint)}</td>
        <td></td>
        </tr>
      </DisplayTable>      
      <Image src={stepImg3} />
    </Section>,

    <Section isInCarousel={isInCarousel} key={key + "5"}>
      <h3> Final Calculation </h3>
      <p>
        Finally, Social Security adds the results of the three previous steps
        altogether.
      </p>
       <DisplayTable>
        <tr>
          <TableHeader>step1</TableHeader>
          <TableHeader>step2</TableHeader>
          <TableHeader>step3</TableHeader>
          <TableHeader>PIA</TableHeader>
        </tr>
        <tr>
          <td>{formatValue(beforeFirstBendPoint)}</td>
          <td>{formatValue(afterFirstBendPoint)}</td>
          <td>{formatValue(pastSecondBendPoint)}</td>
        <td>{formatValue(totalPrimaryInsuranceAmount)}</td>
        </tr>
      </DisplayTable>

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

export const DisplayTable = styled("table")`
  table-layout: fixed;
  border: 1px solid black;
  border-radius: ${radii[0]};
  margin: auto;
`;

export const TableHeader = styled("th")`
  background-color: #dddddd;
  border: 1px solid #888888;
  text-align: left;
  padding: 8px;
`;

export const td= styled("tr")`
  border: 1px solid #888888;
  text-align: center;
  padding: 8px;
`;


export default Screen2a;
