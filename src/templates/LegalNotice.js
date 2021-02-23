import React from 'react';
import { graphql } from 'gatsby';
import { createUseStyles } from 'react-jss';
import { SEO, StickyFooter, ContentHeader } from 'components';

import { Sidebar } from 'components/legal-notice';

const useStyles = createUseStyles((theme) => ({
  content: theme.preMadeStyles.content,

  main: {},

  aside: {
    paddingTop: 16,
  },

  article: {
    paddingLeft: 32,
    paddingTop: 32,
  },

  ul: {
    listStyle: 'none',
    padding: 0,
  },

  [`@media (min-width: ${theme.breakpoints.values.md}px)`]: {
    main: {
      display: 'flex',
    },

    aside: {
      minWidth: 250,
    },
  },
}));

const LegalNotice = ({ data: { notice, site }, location }) => {
  const siteTitle = site.siteMetadata.title;
  const classes = useStyles();

  return (
    <>
      <SEO
        title={`${notice.frontmatter.title} | ${siteTitle}`}
        description={notice.frontmatter.description}
      />

      <StickyFooter location={location}>
        <main className={classes.main}>
          <Sidebar location={location} />

          <article className={classes.article}>
            <ContentHeader frontmatter={notice.frontmatter} dateKey="lastUpdated" />

            <section
              className={classes.content}
              dangerouslySetInnerHTML={{ __html: notice.html }}
            />
          </article>
        </main>
      </StickyFooter>
    </>
  );
};

export default LegalNotice;

export const pageQuery = graphql`
  query LegalNoticeBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        social {
          twitter
        }
      }
    }

    notice: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        description
        title
        lastUpdated
      }
    }
  }
`;
