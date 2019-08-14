module.exports = {
  pathPrefix: "/misk-web",
  siteMetadata: {
    title: 'Misk-Web'
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
            label: 'Misk-Web'
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
              href: '/docs/guides/changelog',
              label: 'Changelog',
              category: 'Info'
            },
            {
              href: '/docs/guides/building-a-tab',
              label: 'Building a Tab',
              category: 'Guides'
            },
            {
              href: '/docs/guides/integrating-with-misk',
              label: 'Integrating with Misk',
              category: 'Guides'
            },
            {
              href: '/docs/guides',
              label: 'Other',
              category: 'Guides'
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
