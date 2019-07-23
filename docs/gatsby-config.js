module.exports = {
  pathPrefix: "/misk-web",
  siteMetadata: {
    title: 'Misk-Web Docs'
  },
  plugins: [
    {
      resolve: '@westegg/gatsby-theme-core'
    },
    {
      resolve: '@westegg/gatsby-theme-misk',
      options: {
        header: {
          home: {
            href: '/',
            label: 'Misk-Web Docs'
          },
          links: [
            {
              href: '/docs/packages/cli',
              label: '@misk/cli',
              category: 'Packages'
            },
            {
              href: '/docs/packages/common',
              label: '@misk/common',
              category: 'Packages'
            },
            {
              href: '/docs/packages/core',
              label: '@misk/core',
              category: 'Packages'
            },
            {
              href: '/docs/packages/dev',
              label: '@misk/dev',
              category: 'Packages'
            },
            {
              href: '/docs/packages/prettier',
              label: '@misk/prettier',
              category: 'Packages'
            },
            {
              href: '/docs/packages/simpleredux',
              label: '@misk/simpleredux',
              category: 'Packages'
            },
            {
              href: '/docs/packages/test',
              label: '@misk/test',
              category: 'Packages'
            },
            {
              href: '/docs/packages/tslint',
              label: '@misk/tslint',
              category: 'Packages'
            },
            {
              href: '/docs/examples',
              label: 'Examples',
              category: 'Info'
            },
            {
              href: '/docs/guides',
              label: 'Guides',
              category: 'Info'
            },
            {
              href: 'https://github.com/cashapp/misk-web/',
              label: 'Repo',
              category: 'Info'
            }
          ]
        },
        notes: "docs",
        notesPath: "/docs",
        postsPath: '/blog',
        projects: 'portfolio',
        projectsPath: '/portfolio'
      }
    }
  ]
}
