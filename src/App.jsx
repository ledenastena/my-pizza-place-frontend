import React from 'react'
import './App.scss'
import { Route, Switch } from 'react-router-dom'
import HomePage from './pages/home/home.component'
import ProductsPage from './pages/products/products.component'
import Header from './components/header/header.component'
import Footer from './components/footer/footer.component'
import LoginPage from './pages/login/login.component'
import SignUpPage from './pages/sign-up/sign-up.component'
import EditProductPage from './pages/edit-product/edit-product.component'
import AddProductPage from './pages/add-product/add-product.component'
import CheckoutPage from './pages/checkout/checkout.component'
import ProfilePage from './pages/profile/profile.component'

class App extends React.Component {
  hashCode = (str = '') => {
    let hash = 0

    if (str.length === 0) {
      return hash
    }
    for (let i = 0; i < str.length; i += 1) {
      const char = str.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash &= hash // Convert to 32bit integer
    }
    return hash
  }

  render() {
    return (
      <div className="app-container">
        <Header />
        <div className="width-container">
          <Switch>
            <Route path="/add-product" component={AddProductPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/sign-up" component={SignUpPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/edit-product/:_id" component={EditProductPage} />
            <Route path="/checkout" component={CheckoutPage} />
            <Route
              path="/products/:type?"
              render={(props) => (
                <ProductsPage
                  key={this.hashCode(props.match.params.type)}
                  match={props.match}
                />
              )}
            />
            {/* Using hashCode function to get a unique key based on the 'type' parameter which is a string
                This way we ensure that ProductPage components  remounts when the route parameter changes      */}
            <Route path="/" component={HomePage} />
          </Switch>
        </div>
        <Footer />
      </div>
    )
  }
}

export default App
