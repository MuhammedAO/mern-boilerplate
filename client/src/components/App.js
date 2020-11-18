import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LoginPage from './LoginPage'
import LandingPage from './LandingPage'
import RegisterPage from './RegisterPage'
import NavBar from './Navbar/NavBar'
import Auth from "../hoc/auth"
function App() {
  return (
    <React.Fragment>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path='/' component={Auth(LandingPage, null)} />
          <Route path='/login' component={Auth(LoginPage, false)} />
          <Route path='/register' component={Auth(RegisterPage, false)} />
        </Switch>
      </div>
    </React.Fragment>
  )
}

export default App
