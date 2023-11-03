import { ReactElement } from 'react'
import styles from './ProjectPartners.module.css'
import Carousel from '@components/@shared/Carousel/Carousel'
import Container from '@components/@shared/atoms/Container'

export default function ProjectPartners(): ReactElement {
  const projectPartnersList = require
    .context(
      '../../../../public/images/projectPartners',
      false,
      /\.(png|jpe?g)$/
    )
    .keys()
    .filter((e) => e.startsWith('./'))
    .map((x) => x.replace('./', ''))

  return (
    <div className={styles.wrapper}>
      <Container className={styles.container}>
        <h3 className={styles.title}>Project Partners</h3>
        <Carousel show={4}>
          {projectPartnersList?.map((logo) => (
            <div key={logo} className={styles.logoContainer}>
              <img
                src={`/images/projectPartners/${logo}`}
                className={styles.logo}
                alt="Partner logo"
              />
            </div>
          ))}
        </Carousel>
      </Container>
    </div>
  )
}
