import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css'
import { Error404 } from './containers/errors/Error404'
import { Home } from './containers/Home'

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route  path="*" element={<Error404 />} />
          <Route  path="/" element={<Home />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
