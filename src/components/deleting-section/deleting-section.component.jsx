import React from 'react'
import './deleting-section.styles.scss'
import CustomButton from '../custom-button/custom-button.component'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {  selectDeletingProduct } from '../../redux/product/product.selectors'
import { selectAuthToken } from '../../redux/user/user.selectors'
import { deleteProductStart } from '../../redux/product/product.actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

class DeletingSection extends React.Component {

  componentDidUpdate(prevProps) {
    const { deletingProduct, deletingError } = this.props

    if (prevProps.deletingProduct && !deletingProduct && !deletingError) {
      this.props.history.push(this.props.prevPath)
    }
  }

  handleDeleteClick = () => {
    const { product, authToken, deleteProductStart } = this.props

    if (confirm('Are you sure you want to delete this product?')) {
      deleteProductStart({ 
        _id: product._id,
        token: authToken
      })
    }
  }

  render() {
    const { deletingProduct, deletingError } = this.props

    return (
      <div className='deleting-section-container'>
        <CustomButton isLoading={ deletingProduct } type='button' buttonStyle='delete' onClick={ this.handleDeleteClick } >
          <FontAwesomeIcon icon={ faTrash } />
          Delete
        </CustomButton>
      </div>
  )
  }
}

const mapStateToProps = (state) => ({
  authToken: selectAuthToken(state),
  deletingProduct: selectDeletingProduct(state)
})

const mapDispatchToProps = (dispatch) => ({
  deleteProductStart: (reqObj) => dispatch(deleteProductStart(reqObj))
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DeletingSection))
          