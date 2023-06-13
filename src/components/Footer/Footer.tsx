import React, { ReactElement } from 'react'
import styles from './Footer.module.css'
import Markdown from '@shared/Markdown'
import Links from './Links'
import { useMarketMetadata } from '@context/MarketMetadata'
import BrandLogo from '@images/brand-logo.svg'
import Container from '@components/@shared/atoms/Container'

export default function Footer(): ReactElement {
  const { siteContent } = useMarketMetadata()
  const { siteTitle, footer } = siteContent
  const { copyright, subtitle } = footer

  return (
    <footer className={styles.footer}>
      <Container className={styles.container}>
        <div>
          <p className={styles.siteTitle}>{siteTitle}</p>
          <div className={styles.main}>
            <BrandLogo />
          </div>
        </div>
        <Links />
      </Container>
      <div className={styles.copyright}>
        <Markdown text={copyright} />
      </div>
    </footer>
  )
}
