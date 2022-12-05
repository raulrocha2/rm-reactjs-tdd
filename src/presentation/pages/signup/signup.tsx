/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'
import Styles from './signup-styles.scss'
import { Footer, FormStatus, Input, Header } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Link } from 'react-router-dom'

const Signup: React.FC = () => {
  return (
    <div className={Styles.signup}>
      <Header />
      <Context.Provider value={{ state: {} }}>
        <form className={Styles.form}>
          <h2> Criar Conta </h2>
          <Input type="text" name="name" placeholder='Digite seu nome'/>
          <Input type="email" name="email" placeholder='Digite seu e-mail'/>
          <Input type="password" name="password" placeholder='Digite sua senha'/>
          <Input type="password" name="passwordConfirmation" placeholder='Repita sua senha'/>
          <button
            data-testid="submit"
            type="submit"
          >Entrar</button>
          <Link to="/login" className={Styles.link}>Voltar Para Login</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Signup
