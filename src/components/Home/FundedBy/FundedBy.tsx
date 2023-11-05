import { ReactElement } from 'react'
import styles from './FundedBy.module.css'
import Container from '@components/@shared/atoms/Container'

export default function FundedBy(): ReactElement {
  return (
    <Container className={styles.wrapper}>
      <h3>Funded By</h3>
      <div className={styles.container}>
        <img className={styles.logo} src="images/BMWK-EU_funded_en_RGB.png" />
      </div>
    </Container>
  )
}
