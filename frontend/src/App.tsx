import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css'
import { Error404 } from './containers/errors/Error404'
import Home from './containers/Home'
import Signup from './containers/auth/Signup'
import Login from './containers/auth/Login'
import Activate from './containers/auth/Activate'
import ResetPassword from './containers/auth/ResetPassword'
import ResetPasswordConfirm from './containers/auth/ResetPasswordConfirm'
import Shop from './containers/Shop'
import ProductDetail from './containers/pages/ProductDetail'
import Search from './containers/pages/Search'
import Cart from './containers/pages/Cart'
import CheckOut from './containers/pages/CheckOut'
import PrivateRoute from './hocs/PrivateRoute'



function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Error Display */}
          <Route  path="*" element={<Error404 />} />

          <Route  path="/" element={<Home />} />
          <Route  path="/cart" element={<Cart />} />
          <Route  path="/checkout" element={<PrivateRoute outlet={<CheckOut />} />} />


          {/* Authentication */}
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/activate/:uid/:token' element={<Activate />} />
          <Route path='/reset_password' element={<ResetPassword />} />
          <Route path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm />} />

          <Route  path="/shop" element={<Shop />} />
          <Route  path="/product/:productId" element={<ProductDetail />} />
          <Route  path="/search" element={<Search />} />


        </Routes>
      </Router>
    </Provider>
  )
}

export default App
