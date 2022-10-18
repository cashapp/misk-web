module.exports = {
  pathPrefix: "/misk-web",
  siteMetadata: {
    title: "Misk-Web"
  },
  plugins: [
    "gatsby-plugin-mdx",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs`,
        path: `${__dirname}/docs/`,
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
    },
  ]
}
