import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBook, updateBook, clearBook, deleteBook } from './../../actions';

class EditBook extends PureComponent {
  state = {
    formData: {
      _id: this.props.match.params.id,
      name: '',
      author: '',
      review: '',
      pages: '',
      rating: '',
      price: ''
    }
  };

  handleInput = (e, name) => {
    let newFormData = {
      ...this.state.formData
    };
    newFormData[name] = e.target.value;
    this.setState({
      formData: newFormData
    });
  };

  submitForm = e => {
    e.preventDefault();
    this.props.dispatch(updateBook(this.state.formData));
  };

  deletePost = () => {
    this.props.dispatch(deleteBook(this.props.match.params.id));
  };

  redirectUser = () => {
    setTimeout(() => {
      this.props.history.push('/user/reviews');
    }, 1000);
  };

  componentWillMount() {
    this.props.dispatch(getBook(this.props.match.params.id));
  }

  componentWillReceiveProps(nextProps) {
    let book = nextProps.books.book;
    this.setState({
      formData: {
        _id: book._id,
        name: book.name,
        author: book.author,
        review: book.review,
        pages: book.pages,
        rating: book.rating,
        price: book.price
      }
    });
  }

  componentWillUnmount() {
    this.props.dispatch(clearBook());
  }

  render() {
    let books = this.props.books;
    return (
      <div className="rl_container article">
        {books.updateBook ? (
          <div className="edit_confirm">
            Post updated,
            <Link to={`/books/${books.book._id}`}> See your post here</Link>
          </div>
        ) : null}
        {books.postDeleted ? (
          <div className="red_tag">
            Post deleted,
            {this.redirectUser()}
          </div>
        ) : null}
        <form onSubmit={this.submitForm}>
          <h2>Edit review</h2>
          <div className="form_element">
            <input
              type="text"
              placeholder="Enter name"
              value={this.state.formData.name}
              onChange={e => this.handleInput(e, 'name')}
            />
          </div>
          <div className="form_element">
            <input
              type="text"
              placeholder="Enter author"
              value={this.state.formData.author}
              onChange={e => this.handleInput(e, 'author')}
            />
          </div>
          <div className="form_element">
            <textarea
              type="text"
              placeholder="Enter review"
              value={this.state.formData.review}
              onChange={e => this.handleInput(e, 'review')}
            />
          </div>
          <div className="form_element">
            <input
              type="number"
              placeholder="Enter pages"
              value={this.state.formData.pages}
              onChange={e => this.handleInput(e, 'pages')}
            />
          </div>
          <div className="form_element">
            <select
              value={this.state.formData.rating}
              onChange={e => this.handleInput(e, 'rating')}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="form_element">
            <input
              type="number"
              placeholder="Enter price"
              value={this.state.formData.price}
              onChange={e => this.handleInput(e, 'price')}
            />
          </div>
          <button type="submit">Edit review</button>
          <div className="delete_post">
            <div className="button" onClick={this.deletePost}>
              Delete review
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.books
  };
}

export default connect(mapStateToProps)(EditBook);
