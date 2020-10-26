import React from 'react'
import './header.styles.scss'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import {
  selectCurrentUser,
  selectAuthToken,
} from '../../redux/user/user.selectors'
import { userLogoutStart } from '../../redux/user/user.actions'
import MenuDropdown from '../menu-dropdown/menu-dropdown.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import { selectSelectedCurrency } from '../../redux/product/product.selectors'
import { changeCurrency } from '../../redux/product/product.actions'
import { selectCartVisible } from '../../redux/cart/cart.selectors'
import { toggleCartVisible } from '../../redux/cart/cart.actions'

class Header extends React.Component {
  state = {
    menuDropdownVisible: false,
  }

  cartButtonRef = null

  menuButtonRef = null

  setCartButtonRef = (node) => {
    this.cartButtonRef = node
  }

  handleCartIconClick = () => {
    const { toggleCartVisible } = this.props

    toggleCartVisible()
  }

  toggleMenuDropdownVisible = () => {
    this.setState((prevState) => ({
      menuDropdownVisible: !prevState.menuDropdownVisible,
    }))
  }

  setHamburgerRef = (node) => {
    this.menuButtonRef = node
  }

  handleHamburgerClick = () => {
    this.toggleMenuDropdownVisible()
  }

  handleCurrencyClick = (currString) => {
    const { selectedCurrency, changeCurrency } = this.props

    if (
      (currString === 'eur' && selectedCurrency === 'usd') ||
      (currString === 'usd' && selectedCurrency === 'eur')
    ) {
      changeCurrency()
    }
  }

  handleLogout = () => {
    const { userLogoutStart, authToken } = this.props
    const { menuDropdownVisible } = this.state

    userLogoutStart(authToken)

    if (menuDropdownVisible) {
      this.setState({
        menuDropdownVisible: false,
      })
    }
  }

  // initialize click handler passed through the callback if the key pressed is ENTER
  handleKeyDown = (e, callback) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      callback()
    }
  }

  render() {
    const { cartVisible, selectedCurrency, currentUser, location } = this.props
    const { menuDropdownVisible } = this.state

    return (
      <div className="header-container">
        <div className="header-content-width">
          <div className="home-link">
            <Link to="/">My Pizza Place</Link>
          </div>
          <div className="navigation-links">
            <div className="regular-menu">
              <Link to="/products">All Products</Link>
              <Link to="/products/pizzas">Pizzas</Link>
              <Link to="/products/drinks">Drinks</Link>
              <Link to="/products/desserts">Desserts</Link>
              {currentUser ? (
                <div
                  data-testid="regular-menu-logout-button"
                  className="logout-button"
                  onClick={this.handleLogout}
                  onKeyDown={(e) => this.handleKeyDown(e, this.handleLogout)}
                  role="button"
                  tabIndex={0}
                >
                  Log Out
                </div>
              ) : (
                <Link
                  data-testid="regular-menu-login-button"
                  to={{
                    pathname: '/login',
                    state: { prevPath: location.pathname },
                  }}
                >
                  Log In
                </Link>
              )}
            </div>
            <div
              data-testid="hamburger-menu-button"
              className="hamburger-menu-button"
              onClick={this.handleHamburgerClick}
              onKeyDown={(e) =>
                this.handleKeyDown(e, this.handleHamburgerClick)
              }
              ref={this.setHamburgerRef}
              role="button"
              tabIndex={0}
            >
              <div className="hamburger-bar" />
              <div className="hamburger-bar" />
              <div className="hamburger-bar" />
            </div>
            {currentUser ? (
              <Link
                data-testid="profile-button"
                to="/profile"
                className="profile-button"
              >
                <FontAwesomeIcon icon={faUserAlt} />
              </Link>
            ) : (
              ''
            )}
            <div
              data-testid="cart-button"
              className="cart-button"
              onClick={this.handleCartIconClick}
              onKeyDown={(e) => this.handleKeyDown(e, this.handleCartIconClick)}
              ref={this.setCartButtonRef}
              role="button"
              tabIndex={0}
            >
              <FontAwesomeIcon icon={faShoppingBasket} />
            </div>
            <div className="currency-select">
              <div
                data-testid="eur-currency-button"
                className={`currency-button ${
                  selectedCurrency === 'eur' && 'selected-currency'
                }`}
                onClick={() => this.handleCurrencyClick('eur')}
                onKeyDown={(e) =>
                  this.handleKeyDown(e, () => {
                    this.handleCurrencyClick('eur')
                  })
                }
                role="button"
                tabIndex={0}
              >
                EUR
              </div>
              |
              <div
                data-testid="usd-currency-button"
                className={`currency-button ${
                  selectedCurrency === 'usd' && 'selected-currency'
                }`}
                onClick={() => this.handleCurrencyClick('usd')}
                onKeyDown={(e) =>
                  this.handleKeyDown(e, () => {
                    this.handleCurrencyClick('usd')
                  })
                }
                role="button"
                tabIndex={0}
              >
                USD
              </div>
            </div>
            {cartVisible ? (
              <CartDropdown cartButtonRef={this.cartButtonRef} />
            ) : (
              ''
            )}
            {menuDropdownVisible ? (
              <MenuDropdown
                menuButtonRef={this.menuButtonRef}
                toggleMenuDropdownVisible={this.toggleMenuDropdownVisible}
                userLoggedIn={!!currentUser}
                handleLogout={this.handleLogout}
              />
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  authToken: selectAuthToken(state),
  cartVisible: selectCartVisible(state),
  selectedCurrency: selectSelectedCurrency(state),
})

const mapDispatchToProps = (dispatch) => ({
  userLogoutStart: (token) => dispatch(userLogoutStart(token)),
  toggleCartVisible: () => dispatch(toggleCartVisible()),
  changeCurrency: () => dispatch(changeCurrency()),
})

Header.defaultProps = {
  currentUser: null,
  authToken: null,
  cartVisible: false,
  selectedCurrency: 'eur',
  userLogoutStart: null,
  toggleCartVisible: null,
  changeCurrency: null,
  location: {
    pathname: '',
  },
}

Header.propTypes = {
  currentUser: PropTypes.object,
  authToken: PropTypes.string,
  cartVisible: PropTypes.bool,
  selectedCurrency: PropTypes.string,
  userLogoutStart: PropTypes.func,
  toggleCartVisible: PropTypes.func,
  changeCurrency: PropTypes.func,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))
