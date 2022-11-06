import React, { useState, useEffect } from 'react'
import Styles from './login-styles.scss'
import { Footer, FormStatus, Input, Header } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { IValidation } from '@/presentation/protocols/validaion'

type Props = {
  validation: IValidation
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: 'Campo obrigatório',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    })
  }, [state.email, state.password])

  return (
    <div className={Styles.login}>
      <Header />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2> Login </h2>
          <Input type="email" name="email" placeholder='Digite seu e-mail'/>
          <Input type="password" name="password" placeholder='Digite sua senha'/>
          <button data-testid="submit" disabled className={Styles.submit} type="submit">Entrar</button>
          <span className={Styles.link}> Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
