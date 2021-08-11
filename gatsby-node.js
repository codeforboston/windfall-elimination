/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.onCreateWebpackConfig = ({ stage, actions }) => {
    actions.setWebpackConfig({

        //allow us to not use ENVIRONMENT=web when compiling anypia-js, test it
        // https://stackoverflow.com/questions/59487224/webpack-throws-error-with-emscripten-cant-resolve-fs
       "node": { "fs": "empty" },
       "resolve": { fallback: { "path": false, "fs": false, "crypto": false } }
    })
  }
