import React from 'react';
import './assets/css/bootstrap.min.css';
import './App.css';
import BookMarks from './components/bookmarks/BookMarks';
import FormBookMark from './components/bookmarks/FormBookMark';
import BookmarkNavbar from './components/bookmarks/Navbar';
import BookmarkService from './services/bookmark.service';
import { showSuccessMessage } from './utils/alert';


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      bookmarks: [],
      bookmark: {}
    }
  }

  componentDidMount = async () => {
    this.getBookmarks();
  }

  getBookmarks = async () => {
    const bookmarks = await BookmarkService.getBookmarks();
    this.setState({ bookmarks });
  }

  addBookmark = async (bookmark) => {
    await BookmarkService.insertBookmark(bookmark);
    this.getBookmarks();
    this.setState({ bookmark: {} });
    showSuccessMessage({ title: 'Insert successfully!' })
  }

  updateBookmark = async (bookmark) => {
    await BookmarkService.updateBookmark(bookmark);
    this.getBookmarks();
    this.setState({ bookmark: {} });
    showSuccessMessage({ title: 'Update successfully!' })
  }

  removeBookmark = async (bookmark) => {
    await BookmarkService.removeBookmark(bookmark.id);
    this.getBookmarks();
    if(bookmark.id === this.state.bookmark.id) this.setState({ bookmark: {} });
    showSuccessMessage({ title: 'Remove successfully!' })
  }

  editBookmark = (bookmark) => {
    this.setState({ bookmark: { ...bookmark } }, () => {
      window.scrollTo(0, 0);
    });
    // document.body.scrollTop = '10px';
  }

  render(){
    const { bookmarks, bookmark } = this.state;
    return (
      <>
        <BookmarkNavbar/>
        <div className="container">
          <div className="row mt-3">
            <div className="col-md-6 mx-auto">
              <FormBookMark 
                bookmark={bookmark}
                onAddBookmark={this.addBookmark}
                onUpdateBookmark={this.updateBookmark}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-8 mx-auto">
              <BookMarks 
                bookmarks={bookmarks}
                onRemoveBookmark={this.removeBookmark}
                onEditBookmark={this.editBookmark}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
