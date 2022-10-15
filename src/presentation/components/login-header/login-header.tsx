import React, { memo } from 'react'
import Logo from '../logo/logo'
import Styles from './login-header-styles.scss'

const LoginHeader: React.FC = () => {
  return (
    <header className={Styles.header}>
      <Logo />
    <h1>4-Dev - Enquete para Programadores</h1>
  </header>
  )
}

export default memo(LoginHeader)
