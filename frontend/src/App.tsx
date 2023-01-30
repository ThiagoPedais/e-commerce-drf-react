import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css'
import { Error404 } from './containers/errors/Error404'
import { Home } from './containers/Home'
import { Signup } from './containers/auth/Signup'
import { Login } from './containers/auth/Login'
import { Activate } from './containers/auth/Activate'



function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Error Display */}
          <Route  path="*" element={<Error404 />} />

          <Route  path="/" element={<Home />} />

          {/* Authentication */}
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/activate/:uid/:token' element={<Activate />} />

        </Routes>
      </Router>
    </Provider>
  )
}

export default App
