import { useEffect, useState } from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"
import { breakPoints, colors } from "../constants"
import useWindowWidth from "../library/useWindowWidth"

export const Header = () => {
  const [isShowingMenu, setIsShowingMenu] = useState(false)
  const breakPoint = Number(breakPoints[3].slice(0, -2))
  const windowWidth = useWindowWidth()

  useEffect(() => {
    if (isShowingMenu && windowWidth >= breakPoint) {
      setIsShowingMenu(false)
    }
  }, [breakPoint, isShowingMenu, windowWidth])

  return (
    <Wrapper>
      <Heading to="/"> Social Security Benefit Calculator </Heading>
      {windowWidth >= breakPoint && (
        <ExtraLinks>
          <ExtraLink activeClassName="active" to="/about"> About </ExtraLink>
          <ExtraLink activeClassName="active" to="/faq"> FAQ </ExtraLink>
        </ExtraLinks>
      )}
    </Wrapper>
  )
}

const Wrapper = styled("header")`
  --excess-width: calc(100% - var(--global-container-max-width));
  --global-container-max-width: ${breakPoints[4]};
  --spacing-horizontal: 1.5rem;
  --height: 3.75rem;
  align-items: center;
  box-sizing: border-box;
  background: ${colors.purple};
  color: ${colors.white};
  display: flex;
  height: var(--height);
  justify-content: space-between;
  min-height: var(--height);
  padding-left: var(--spacing-horizontal);
  padding-right: var(--spacing-horizontal);
  width: 100%;
  @media screen and (min-width: ${breakPoints[4]}) {
    padding-left: calc(var(--excess-width) / 2 + 1.5rem);
    padding-right: calc(var(--excess-width) / 2 + 1.5rem);
  };
`

// QUESTION: Should fonts be imported from `/src/constants/fonts.ts`?
const Heading = styled(Link)`
  color: ${colors.white};
  font-family: 'Merriweather', serif;
  font-size: 1rem;
  line-height: 2rem;
  margin: 0 auto;
  text-decoration: none;
  white-space: nowrap;
  @media screen and (min-width: ${breakPoints[1]}) {
    font-size: 1.4rem;
  };
  @media screen and (min-width: ${breakPoints[2]}) {
    font-size: 2rem;
  };
  @media screen and (min-width: ${breakPoints[3]}) {
    margin-left: inherit;
  };
`

const ExtraLinks = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: var(--spacing-horizontal);
  width: 11.25rem;
`

const ExtraLink = styled(Link)`
  border-color: ${colors.white};
  border-radius: 3rem;
  border-style: solid;
  border-width: 0.125rem;
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.25rem;
  padding: 0.125rem 0.75rem;
  text-decoration: none;
  &:hover {
    background-color: ${colors.darkPurple};
  }
  &.active {
    background-color: ${colors.white};
    color: ${colors.purple};
    &:hover {
      background-color: ${colors.whiteSmoke};
    }
  };
`
