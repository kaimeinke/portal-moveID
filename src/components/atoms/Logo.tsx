import React, { ReactElement } from 'react'
import { ReactComponent as LogoAssetFull } from '@oceanprotocol/art/logo/logo.svg'
import { ReactComponent as LogoAssetBranding } from '../../images/gaia-x-logo.svg'
import { ReactComponent as LogoAsset } from '../../images/ocean-logo.svg'
import styles from './Logo.module.css'
import classNames from 'classnames/bind'
import { graphql, useStaticQuery } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'

const cx = classNames.bind(styles)

const query = graphql`
  query {
    logo: allFile(filter: { relativePath: { eq: "moveID-logo.png" } }) {
      edges {
        node {
          childImageSharp {
            original {
              src
            }
          }
        }
      }
    }
  }
`

interface Logo {
  logo: {
    edges: {
      node: {
        childImageSharp: {
          original: {
            src: string
          }
        }
      }
    }[]
  }
}

export default function Logo({
  noWordmark,
  branding
}: {
  noWordmark?: boolean
  branding?: boolean
}): ReactElement {
  const data: Logo = useStaticQuery(query)
  const { logo } = data

  const styleClasses = cx({
    logo: true,
    branding: branding
  })

  return branding ? (
    <img
      src={logo.edges[0].node.childImageSharp.original.src}
      alt="moveID logo"
      className={styleClasses}
    />
  ) : noWordmark ? (
    <LogoAsset className={styleClasses} />
  ) : (
    <LogoAssetFull className={styleClasses} />
  )
}
