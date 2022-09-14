import React, { ReactElement } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styles from './ProjectPartners.module.css'
import Carousel from './Carousel'
import Container from '../atoms/Container'
import Img, { FluidObject } from 'gatsby-image'

const query = graphql`
  {
    allFile(
      filter: { absolutePath: { regex: "/src/images/projectPartners/" } }
      sort: { fields: [base] }
    ) {
      edges {
        node {
          childImageSharp {
            id
            fluid(maxWidth: 400) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

interface Logo {
  node: {
    childImageSharp: {
      id: string
      fluid: FluidObject
    }
  }
}

export default function ProjectPartners(): ReactElement {
  const data = useStaticQuery(query)
  const logos: Logo[] = data?.allFile?.edges

  return (
    <div className={styles.wrapper}>
      <Container className={styles.container}>
        <h3 className={styles.title}>Project Partners</h3>
        <Carousel show={4}>
          {logos.map((logo) => (
            <div
              key={logo.node.childImageSharp.id}
              className={styles.logoContainer}
            >
              <Img
                fluid={logo.node.childImageSharp.fluid}
                imgStyle={{ objectFit: `contain` }}
                className={styles.logo}
              />
            </div>
          ))}
        </Carousel>
      </Container>
    </div>
  )
}
