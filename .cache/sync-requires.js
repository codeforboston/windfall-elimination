const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/alex/Documents/dev/windfall-elimination/.cache/dev-404-page.js"))),
  "component---src-pages-404-jsx": hot(preferDefault(require("/Users/alex/Documents/dev/windfall-elimination/src/pages/404.jsx"))),
  "component---src-pages-index-jsx": hot(preferDefault(require("/Users/alex/Documents/dev/windfall-elimination/src/pages/index.jsx"))),
  "component---src-pages-screen-1-jsx": hot(preferDefault(require("/Users/alex/Documents/dev/windfall-elimination/src/pages/screen-1.jsx"))),
  "component---src-pages-screen-2-jsx": hot(preferDefault(require("/Users/alex/Documents/dev/windfall-elimination/src/pages/screen-2.jsx"))),
  "component---src-pages-screen-3-jsx": hot(preferDefault(require("/Users/alex/Documents/dev/windfall-elimination/src/pages/screen-3.jsx")))
}

