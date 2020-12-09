import styled from '@emotion/styled';
import SectionsCarousel from 'react-slick';
import { breakPoints, colors } from '../constants';
import { H2, SEO } from '../components';
import { radii, spacing } from '../constants';
import { FunctionComponent } from 'react';
import {
  UserState,
  EarningsEnum,
  useUserState,
} from '../library/user-state-context';
import {
  UserStateActions,
  useUserStateActions,
} from '../library/user-state-actions-context';
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
  const Arrow = ({
    className,
    onClick,
  }: {
    className?: string;
    onClick?: () => void;
  }) => (
    <ArrowElement
      className={className}
      isArrowLeft={className ? className.includes('slick-prev') : false}
      onClick={onClick}
    />
  );

  return (
    <Wrapper>
      <SEO
        keywords={['application', 'gatsby', 'react']}
        title="Pre-Screen 2a"
      />
      <H2> Benefit Formula </H2>
      <SectionsList>{SliderSections()}</SectionsList>
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
  );
};

const BarChart = (bottomPercent: number) => {
  // console.log('bottomPercent: ', bottomPercent.bottomPercent);
  return (
    <div className="barContainer">
      <div
        className="barTop"
        style={{ height: `${200 - 200 * bottomPercent.bottomPercent}px` }}
      ></div>
      <div
        className="barBottom"
        style={{ height: `${200 * bottomPercent.bottomPercent}px` }}
      >
        {bottomPercent.bottomPercent * 100}%
      </div>
    </div>
  );
};

const SliderSections = ({ isInCarousel }: { isInCarousel?: boolean } = {}) => {
  const userState = useUserState(); // react hook always on top of functional components
  const key = `screen-2a-${isInCarousel ? 'carousel' : 'list'}-section-`;
  const userStateTablePage1 =
    userState && userState.userProfile && userState.userProfile.bendPoints;
  const userStateYearOf62 = userState && userState.year62;
  const userAIME =
    userState && userState.userProfile && userState.userProfile.aime;
  const beforeFirstBendPoint =
    (userStateTablePage1 &&
      userStateTablePage1[0] &&
      userStateTablePage1[0].Amount) ||
    805.5;
  const beforeFirstBendPointPercent =
    (userStateTablePage1 &&
      userStateTablePage1[0] &&
      userStateTablePage1[0].Percent) ||
    0.9;
  const afterFirstBendPoint =
    (userStateTablePage1 &&
      userStateTablePage1[1] &&
      userStateTablePage1[1].Amount) ??
    1440.64;
  const afterFirstBendPointPercent =
    (userStateTablePage1 &&
      userStateTablePage1[1] &&
      userStateTablePage1[1].Percent) ||
    0.32;
  const pastSecondBendPoint =
    (userStateTablePage1 &&
      userStateTablePage1[2] &&
      userStateTablePage1[2].Amount) ??
    90.45;
  const pastSecondBendPointPercent =
    (userStateTablePage1 &&
      userStateTablePage1[2] &&
      userStateTablePage1[2].Percent) ||
    0.15;
  var totalPrimaryInsuranceAmount =
    beforeFirstBendPoint + afterFirstBendPoint + pastSecondBendPoint;
  const formatValue = format('$,.1f');
  const formatPercent = format('.0%');
  const explanationAIME = (
    yearOf62: number | null,
    aime: number | null
  ): string => {
    //   For this    //       example, we are using the bend points for someone who turned 62 in 2018,
    //       and had AIME of $6,000.
    if (yearOf62 === null || aime === null) {
      return `For this example, we are using the bend points for someone who turned 62 in 2018, and had AIME of $6,000.`;
    } else {
      return `In your case, the bend points are for people who turned 62 in ${yearOf62} year and had an AIME of $${aime}`;
    }
  };

  return [
    <Section isInCarousel={isInCarousel} key={key + '1'}>
      <h3> How does Social Security calculate my benefits? </h3>
      <p>
        Social Security uses three things to calculate your Primary Insurance
        Amount, or your basic benefit before adjusting for early or late
        retirement. <b>{explanationAIME(userStateYearOf62, userAIME)} </b>
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

    <Section isInCarousel={isInCarousel} key={key + '2'}>
      <h3> Step 1: </h3>
      <p>
        Social Security calculates how much of your Average Indexed Monthly
        Earnings (AIME) fall below your first <em> bend point.</em> Bend points
        are set by law and correspond to the year of your birth.
        <br />
        <br />
        You get {formatPercent(beforeFirstBendPointPercent)} of what falls under
        this bend point.
      </p>

      <TableBarChart style={{ columnWidth: '20px' }}>
        <tr>
          <td>1st Bucket</td>
          <td>1st Bend Point = ${beforeFirstBendPoint}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            <BarChart bottomPercent={beforeFirstBendPointPercent} />
          </td>
          <td style={{ borderRight: '1px dashed black' }}></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td colSpan={2}>
            You get back {formatPercent(beforeFirstBendPointPercent)} of the
            amount, or {formatValue(beforeFirstBendPoint)}
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </TableBarChart>

      <DisplayTable>
        <tr>
          <TableHeader colSpan={4}>
            Primary Insurance Amount Formula
          </TableHeader>
        </tr>
        <tr>
          <td>step 1</td>
          <td>step 2</td>
          <td>step 3</td>
          <td>PIA</td>
        </tr>
        <tr>
          <td>{formatValue(beforeFirstBendPoint)}</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </DisplayTable>

      <p>
        However, if you answered “Yes” to the first question in the “Employment
        Status” section of this website, the amount you get back of this first
        bucket will be different. To learn more, please see the
        <a href="https://www.ssa.gov/pubs/EN-05-10045.pdf">
          Windfall Elimination Provision pamphlet
        </a>
      </p>
    </Section>,

    <Section isInCarousel={isInCarousel} key={key + '3'}>
      <h3> Step 2: </h3>
      <p>
        Social Security calculates how much of your AIME fall below your first
        and second <em> bend points. </em>
      </p>

      <TableBarChart style={{ columnWidth: '20px' }}>
        <tr>
          <td>1st Bucket</td>
          <td>1st Bend Point = ${beforeFirstBendPoint}</td>
          <td></td>
          <td>2nd Bucket</td>
          <td>2nd Bend Point = ${afterFirstBendPoint}</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            <BarChart bottomPercent={beforeFirstBendPointPercent} />
          </td>
          <td style={{ borderRight: '1px dashed black' }}></td>
          <td></td>
          <td>
            <BarChart bottomPercent={afterFirstBendPointPercent} />
          </td>
          <td style={{ borderRight: '1px dashed black' }}></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td colSpan={2}>
            You get back {formatPercent(beforeFirstBendPointPercent)} of the
            amount, or {formatValue(beforeFirstBendPoint)}
          </td>
          <td></td>
          <td colSpan={2}>
            You get back {formatPercent(afterFirstBendPointPercent)} of the
            amount, or {formatValue(afterFirstBendPoint)}
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </TableBarChart>

      <DisplayTable>
        <tr>
          <TableHeader colSpan={4}>
            AIME or Average Income Monthly Earnings
          </TableHeader>
        </tr>
        <tr>
          <td>step 1</td>
          <td>step 2</td>
          <td>step 3</td>
          <td>PIA</td>
        </tr>
        <tr>
          <td>{formatValue(beforeFirstBendPoint)}</td>
          <td>{formatValue(afterFirstBendPoint)}</td>
          <td></td>
          <td></td>
        </tr>
      </DisplayTable>
    </Section>,

    <Section isInCarousel={isInCarousel} key={key + '4'}>
      <h3> Step 3: </h3>
      <p>
        Social Security calculates how much of your AIME fall below your second
        <em> bend point. </em>
      </p>

      <TableBarChart style={{ columnWidth: '20px' }}>
        <tr>
          <td>1st Bucket</td>
          <td>1st Bend Point = ${beforeFirstBendPoint}</td>
          <td></td>
          <td>2nd Bucket</td>
          <td>2nd Bend Point = ${afterFirstBendPoint}</td>
          <td></td>
          <td>3rd Bucket</td>
          <td></td>
        </tr>
        <tr>
          <td>
            <BarChart bottomPercent={beforeFirstBendPointPercent} />
          </td>
          <td style={{ borderRight: '1px dashed black' }}></td>
          <td></td>
          <td>
            <BarChart bottomPercent={afterFirstBendPointPercent} />
          </td>
          <td style={{ borderRight: '1px dashed black' }}></td>
          <td></td>
          <td>
            <BarChart bottomPercent={pastSecondBendPointPercent} />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            You get back {formatPercent(beforeFirstBendPointPercent)} of the
            amount, or {formatValue(beforeFirstBendPoint)}
          </td>
          <td></td>
          <td colSpan={2}>
            You get back {formatPercent(afterFirstBendPointPercent)} of the
            amount, or {formatValue(afterFirstBendPoint)}
          </td>
          <td></td>
          <td colSpan={2}>
            You get back {formatPercent(pastSecondBendPointPercent)} of the
            amount, or {formatValue(pastSecondBendPoint)}
          </td>
        </tr>
      </TableBarChart>

      <DisplayTable>
        <tr>
          <TableHeader colSpan={4}>
            AIME or Average Income Monthly Earnings
          </TableHeader>
        </tr>
        <tr>
          <td>step 1</td>
          <td>step 2</td>
          <td>step 3</td>
          <td>PIA</td>
        </tr>
        <tr>
          <td>{formatValue(beforeFirstBendPoint)}</td>
          <td>{formatValue(afterFirstBendPoint)}</td>
          <td>{formatValue(pastSecondBendPoint)}</td>
          <td></td>
        </tr>
      </DisplayTable>
    </Section>,

    <Section isInCarousel={isInCarousel} key={key + '5'}>
      <h3> Final Calculation </h3>
      <p>
        Finally, Social Security adds the results of the three previous steps
        altogether.
      </p>

      <TableBarChart style={{ columnWidth: '20px' }}>
        <tr>
          <td>1st Bucket</td>
          <td>1st Bend Point = ${beforeFirstBendPoint}</td>
          <td></td>
          <td>2nd Bucket</td>
          <td>2nd Bend Point = ${afterFirstBendPoint}</td>
          <td></td>
          <td>3rd Bucket</td>
          <td></td>
        </tr>
        <tr>
          <td>
            <BarChart bottomPercent={beforeFirstBendPointPercent} />
          </td>
          <td style={{ borderRight: '1px dashed black' }}></td>
          <td></td>
          <td>
            <BarChart bottomPercent={afterFirstBendPointPercent} />
          </td>
          <td style={{ borderRight: '1px dashed black' }}></td>
          <td></td>
          <td>
            <BarChart bottomPercent={pastSecondBendPointPercent} />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            You get back {formatPercent(beforeFirstBendPointPercent)} of the
            amount, or {formatValue(beforeFirstBendPoint)}
          </td>
          <td></td>
          <td colSpan={2}>
            You get back {formatPercent(afterFirstBendPointPercent)} of the
            amount, or {formatValue(afterFirstBendPoint)}
          </td>
          <td></td>
          <td colSpan={2}>
            You get back {formatPercent(pastSecondBendPointPercent)} of the
            amount, or {formatValue(pastSecondBendPoint)}
          </td>
        </tr>
      </TableBarChart>

      <DisplayTable>
        <tr>
          <TableHeader colSpan={4}>
            AIME or Average Income Monthly Earnings
          </TableHeader>
        </tr>
        <tr>
          <td>step 1</td>
          <td>step 2</td>
          <td>step 3</td>
          <td>PIA</td>
        </tr>
        <tr>
          <td>{formatValue(beforeFirstBendPoint)}</td>
          <td>{formatValue(afterFirstBendPoint)}</td>
          <td>{formatValue(pastSecondBendPoint)}</td>
          <td>{formatValue(totalPrimaryInsuranceAmount)}</td>
        </tr>
      </DisplayTable>
      <p>
        Remember: this is the basic amount you are paid before Social Security
        adjusts your benefits lower for early retirement, or higher for delayed
        retirement.
      </p>
    </Section>,

    <Section isInCarousel={isInCarousel} key={key + '6'}>
      <div style={{ margin: 'auto' }}>
        <h3>Commonly Asked Questions </h3>

        <p>I currently have an overpayment, so what should I do?</p>
        <a href="https://www.ssa.gov/pubs/EN-05-10098.pdf" target="_blank">
          See the SSA document on Overpayments
        </a>

        <p>How can I work on changing this law?</p>
        <a
          href="https://www.house.gov/representatives/find-your-representative"
          target="_blank"
        >
          Find your Representative
        </a>

        <p>How can I talk with my representative about Social Security?</p>
        <a href="https://casework.civicapp.us/casework/" target="_blank">
          Request for your Representative's staff to look at your case
        </a>
      </div>
    </Section>,
  ];
};

const TableBarChart = styled.table`
  font-size: 75%;
  margin-bottom: 20px;
  margin-top: 20px;

  td {
    width: 12.5%;
  }

  .barContainer {
    height: 200px;
  }

  .barTop {
    background-color: #dddddd;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .barBottom {
    background-color: #433a74;
    justify-content: center;
    display: flex;
    align-items: center;
  }
`;

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
  margin-top: ${(props) => !props.isInCarousel && '3rem'};
  outline: none;
  padding: ${(props) => props.isInCarousel && '0 1rem'};
`;

const Image = styled.img`
  margin: auto;
  max-width: 40rem;
  width: 100%;
`;

const ArrowElement = styled.div<{ isArrowLeft?: boolean }>`
  height: 2.5rem;
  left: ${(props) => props.isArrowLeft && '-2.75rem'};
  right: ${(props) => !props.isArrowLeft && '-2.75rem'};
  width: 2.5rem;
  &:before {
    color: ${colors.purple};
    font-size: 2.5rem;
  }
`;

const ChartTable = styled.table`
  margin: auto;
  width: 100%;
  text-align: center;
  vertical-align: bottom;
  column-width: 33.3%;
`;

export const DisplayTable = styled('table')`
  table-layout: fixed;
  border: 1px solid black;
  border-radius: ${radii[0]};
  margin: auto;
`;

export const TableHeader = styled('th')`
  background-color: #dddddd;
  border: 1px solid #888888;
  text-align: left;
  padding: 8px;
`;

export const td = styled('tr')`
  border: 1px solid #888888;
  text-align: center;
  padding: 8px;
`;

export default Screen2a;
