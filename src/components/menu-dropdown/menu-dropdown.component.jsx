import React from 'react'
import './menu-dropdown.styles.scss'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

class MenuDropdown extends React.Component {
  elementRef = null

  componentDidMount() {
    window.addEventListener('mousedown', this.handleClickOutsideMenuDropdown)
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleClickOutsideMenuDropdown)
  }

  setRef = (node) => {
    this.elementRef = node
  }

  handleClickOutsideMenuDropdown = (e) => {
    const { menuButtonRef } = this.props
    if (
      this.elementRef &&
      !this.elementRef.contains(e.target) &&
      !menuButtonRef.contains(e.target)
    ) {
      this.props.toggleMenuDropdownVisible()
    }
  }

  // Initialize click handler on ENTER key press
  handleKeyDown = (e) => {
    const { handleLogout } = this.props

    if (e.keyCode === 13) {
      e.preventDefault()
      handleLogout()
    }
  }

  render() {
    const {
      toggleMenuDropdownVisible,
      userLoggedIn,
      handleLogout,
      location,
    } = this.props
    return (
      <div
        data-testid="menu-dropdown"
        className="menu-dropdown-container"
        ref={this.setRef}
      >
        <Link
          to="/products"
          className="menu-dropdown-item"
          onClick={toggleMenuDropdownVisible}
        >
          All Products
        </Link>
        <hr />
        <Link
          data-testid="menu-dropdown-pizzas-link"
          to="/products/pizzas"
          className="menu-dropdown-item"
          onClick={toggleMenuDropdownVisible}
        >
          Pizzas
        </Link>
        <hr />
        <Link
          to="/products/drinks"
          className="menu-dropdown-item"
          onClick={toggleMenuDropdownVisible}
        >
          Drinks
        </Link>
        <hr />
        <Link
          to="/products/desserts"
          className="menu-dropdown-item"
          onClick={toggleMenuDropdownVisible}
        >
          Desserts
        </Link>
        <hr />
        {userLoggedIn ? (
          <div
            className="logout-button menu-dropdown-item"
            onClick={handleLogout}
            onKeyDown={this.handleKeyDown}
            role="button"
            tabIndex={0}
          >
            Log Out
          </div>
        ) : (
          <Link
            className="menu-dropdown-item"
            to={{ pathname: '/login', state: { prevPath: location.pathname } }}
            onClick={toggleMenuDropdownVisible}
          >
            Log In
          </Link>
        )}
      </div>
    )
  }
}

MenuDropdown.defaultProps = {
  menuButtonRef: null,
  toggleMenuDropdownVisible: null,
  userLoggedIn: false,
  handleLogout: null,
  location: {},
}

MenuDropdown.propTypes = {
  menuButtonRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.node }),
  ]),
  toggleMenuDropdownVisible: PropTypes.func,
  userLoggedIn: PropTypes.bool,
  handleLogout: PropTypes.func,
  location: PropTypes.object,
}

export default withRouter(MenuDropdown)
