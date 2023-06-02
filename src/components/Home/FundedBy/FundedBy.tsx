import React, { ReactElement } from 'react'
import styles from './FundedBy.module.css'
import Container from '@components/@shared/atoms/Container'

export default function FundedBy(): ReactElement {
  return (
    <Container className={styles.wrapper}>
      <h3>Funded By</h3>
      <div className={styles.container}>
        <img
          className={styles.logo}
          src="images/BMWE_Fz_2017_Office_Farbe_en.png"
        />
      </div>
    </Container>
  )
}
