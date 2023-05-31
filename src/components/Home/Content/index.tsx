import React, { ReactElement } from 'react'
import styles from './index.module.css'
import classNames from 'classnames/bind'
import content from '../../../../content/pages/home/content.json'
import Container from '@components/@shared/atoms/Container'
import Markdown from '@components/@shared/Markdown'
import Button from '@components/@shared/atoms/Button'
import InteractiveModalImage from '@components/@shared/atoms/InteractiveModalImage'
import IconBlog from '@images/social_blog.svg'
import IconTwitter from '@images/social_twitter.svg'
import IconLinkedIn from '@images/social_linkedin.svg'

const cx = classNames.bind(styles)

interface SocialParams {
  icon: string
  label: string
  target: string
}

interface HomeContentData {
  teaser: {
    title: string
    text: string
  }
  paragraphs: {
    title: string
    body: string
    image: string
    cta?: string
    ctaTo?: string
  }[]
  footer: {
    title: string
    socials: SocialParams[]
  }
}

const iconMap = {
  blog: <IconBlog />,
  twitter: <IconTwitter />,
  linkedin: <IconLinkedIn />
}

export default function HomeContent(): ReactElement {
  const { paragraphs, teaser, footer }: HomeContentData = content

  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.teaser}>
          <h2>{teaser.title}</h2>
          <Markdown text={teaser.text} />
        </div>
        <div className={styles.paragraphs}>
          {paragraphs.map((paragraph, i) => (
            <div
              key={paragraph.title}
              className={
                i % 2 === 1
                  ? cx({ paragraph: true, mirror: true })
                  : styles.paragraph
              }
            >
              <div className={styles.interactivity}>
                <InteractiveModalImage
                  src={paragraph.image}
                  alt={paragraph.title}
                />
              </div>
              <div className={styles.content}>
                <h2>{paragraph.title}</h2>
                <Markdown text={paragraph.body} />
                {paragraph.cta && (
                  <Button href={paragraph.ctaTo} style="primary">
                    {paragraph.cta}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.contentFooter}>
          <h2>{footer.title}</h2>
          <div className={styles.iconsContainer}>
            {footer.socials.map((social: SocialParams) => (
              <div key={social.label} className={styles.socialContainer}>
                <a
                  className={styles.social}
                  href={social.target}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {iconMap[social.icon]}
                  <span>{social.label}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}
