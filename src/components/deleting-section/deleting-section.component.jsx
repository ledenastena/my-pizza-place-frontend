import React from 'react'
import './deleting-section.styles.scss'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import CustomButton from '../custom-button/custom-button.component'
import {
  selectDeletingProduct,
  selectDeletingError,
} from '../../redux/product/product.selectors'
import { selectAuthToken } from '../../redux/user/user.selectors'
import { deleteProductStart } from '../../redux/product/product.actions'

class DeletingSection extends React.Component {
  componentDidUpdate(prevProps) {
    const { deletingProduct, deletingError, history, prevPath } = this.props

    if (prevProps.deletingProduct && !deletingProduct && !deletingError) {
      history.push(prevPath)
    }
  }

  handleDeleteClick = () => {
    const { product, authToken, deleteProductStart } = this.props

    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProductStart({
        _id: product._id,
        token: authToken,
      })
    }
  }

  render() {
    const { deletingProduct } = this.props

    return (
      <div className="deleting-section-container">
        <CustomButton
          isLoading={deletingProduct}
          type="button"
          buttonStyle="delete"
          onClick={this.handleDeleteClick}
        >
          <FontAwesomeIcon icon={faTrash} />
          Delete
        </CustomButton>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authToken: selectAuthToken(state),
  deletingProduct: selectDeletingProduct(state),
  deletingError: selectDeletingError(state),
})

const mapDispatchToProps = (dispatch) => ({
  deleteProductStart: (reqObj) => dispatch(deleteProductStart(reqObj)),
})

DeletingSection.defaultProps = {
  authToken: null,
  deletingProduct: false,
  deletingError: null,
  product: {},
  prevPath: '/',
  history: {
    push: null,
  },
  deleteProductStart: null,
}

DeletingSection.propTypes = {
  authToken: PropTypes.string,
  deletingProduct: PropTypes.bool,
  deletingError: PropTypes.string,
  product: PropTypes.object,
  prevPath: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  deleteProductStart: PropTypes.func,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DeletingSection))
