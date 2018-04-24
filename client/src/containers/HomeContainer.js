import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBooks } from './../actions';
import BookItem from './../widgetsUI/BookItem';

class HomeContainer extends Component {
  componentWillMount() {
    this.props.dispatch(getBooks(1, 0, 'desc'));
  }

  renderItems = books =>
    books.list
      ? books.list.map(item => <BookItem key={item._id} {...item} />)
      : null;

  loadmore = () => {
    let count = this.props.books.list.length;
    this.props.dispatch(getBooks(1, count, 'desc', this.props.books.list));
  };

  render() {
    return (
      <div>
        {this.renderItems(this.props.books)}
        <div className="loadmore" onClick={this.loadmore}>
          Load More
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.books
  };
}

export default connect(mapStateToProps)(HomeContainer);