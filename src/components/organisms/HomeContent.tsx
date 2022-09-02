import React, { ReactElement } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Markdown from '../atoms/Markdown'
import styles from './HomeContent.module.css'
import classNames from 'classnames/bind'
import Button from '../atoms/Button'
import Container from '../atoms/Container'
import InteractiveModalImage from '../molecules/InteractiveModalImage'
import { ReactComponent as IconBlog } from '../../images/social_blog.svg'
import { ReactComponent as IconTwitter } from '../../images/social_twitter.svg'
import { ReactComponent as IconLinkedIn } from '../../images/social_linkedin.svg'

const cx = classNames.bind(styles)

const query = graphql`
{
  file(absolutePath: {regex: "/content\\.json/"}) {
    childIndexJson {
      content {
        teaser {
          title
          text
        }
        paragraphs {
          title
          body
          image {
            childImageSharp {
              original {
                src
              }
            }
          }
        }
        footer {
          title
          text
          socials {
            icon
            label
            target
          }
        }
      }
    }
  }
}
`

interface SocialParams {
  icon: keyof typeof iconMap
  label: string
  target: string
}

interface HomeContentData {
  file: {
    childIndexJson: {
      content: {
        teaser: {
          title: string
          text: string
        }
        paragraphs: {
          title: string
          body: string
          cta?: string
          ctaTo?: string
          image: { childImageSharp: { original: { src: string } } }
        }[]
        footer: {
          title: string
          text: string
          socials: SocialParams[]
        }
      }
    }
  }
}

const iconMap = {
  blog: <IconBlog />,
  twitter: <IconTwitter />,
  linkedin: <IconLinkedIn />
}

export default function HomeContent(): ReactElement {
  const data: HomeContentData = useStaticQuery(query)
  const { paragraphs, teaser, footer } = data.file.childIndexJson.content

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
                  src={paragraph.image.childImageSharp.original.src}
                  alt={paragraph.title}
                />
              </div>
              <div className={styles.content}>
                <h2>{paragraph.title}</h2>
                <Markdown text={paragraph.body} />
                {paragraph?.cta && (
                  <Button
                    href={paragraph.ctaTo}
                    style="primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
          <Markdown text={footer.text} />
        </div>
      </div>
    </Container>
  )
}
