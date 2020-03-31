import { useEffect, useRef, useState } from "react"

// A custom hook for tracking window width. React components may subscribe to
// this hook, causing them to rerender upon changes to the hook's state with
// access to the hook's new state value. Components may then use this value to
// render subcomponents according to screenwidth.
//
// NOTE: IMO, this approach is preferrable to using `display: none` media
// queries to implement responsive design (ex: the mobile version doesn't need
// to render the Header's "FAQ" and "About" buttons), as otherwise the app
// renders and then hides unnecessary React components/DOM elements, leading to
// suboptimal performance.
//
// See:
// https://www.pluralsight.com/guides/re-render-react-component-on-window-resize
// https://reactjs.org/docs/hooks-custom.html
// ~ RM
const useWindowWidth = () => {
  // The `window` object is available in development but not production due to
  // the app's use of server-side rendering. To account for the latter case it's
  // necessary to hold off on referencing `window` until running in a browser
  // environment.
  // See: stackoverflow.com/a/59278596
  const isBrowserEnvironment = typeof window !== "undefined"
  const initialWindowWidth = isBrowserEnvironment ? window.innerWidth : 0
  const [windowWidth, setWindowWidth] = useState(initialWindowWidth)
  const isPausing = useRef(false)

  // Reset window width every 0.25 seconds while resizing
  useEffect(() => {
    const handleResize = () => {
      if (!isPausing.current) {
        isPausing.current = true
        setTimeout(() => {
          isPausing.current = false
          setWindowWidth(window.innerWidth)
        }, 100)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isPausing])

  return windowWidth
}

export default useWindowWidth
