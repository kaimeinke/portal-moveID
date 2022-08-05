import React, { ReactElement } from 'react'
import { ReactComponent as LogoAssetFull } from '@oceanprotocol/art/logo/logo.svg'
import { ReactComponent as LogoAssetBranding } from '../../images/gaia-x-logo.svg'
import { ReactComponent as LogoAsset } from '../../images/ocean-logo.svg'
import styles from './Logo.module.css'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export default function Logo({
  noWordmark,
  branding
}: {
  noWordmark?: boolean
  branding?: boolean
}): ReactElement {
  const styleClasses = cx({
    logo: true,
    branding: branding
  })

  return branding ? (
    // <LogoAssetBranding className={styleClasses} />
    // TODO replace with logo
    <h4 style={{ margin: 0, color: 'var(--color-primary)' }}>moveID</h4>
  ) : noWordmark ? (
    <LogoAsset className={styleClasses} />
  ) : (
    <LogoAssetFull className={styleClasses} />
  )
}
