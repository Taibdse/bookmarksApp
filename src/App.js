import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './assets/css/bootstrap.min.css';
import './App.css';

import BookmarkNavbar from './components/bookmarks/Navbar';
import BookmarkSidebar from './components/bookmarks/Sidebar';
import BookmarkIndex from './components/bookmarks/BookmarkIndex';
import Topics from './components/topics/Topics';

import { GlobalState } from './context/GlobalState';

const App = () => {
    return (
       <GlobalState>
         <Router>
          <BookmarkNavbar/>
          <BookmarkSidebar/>
          
          <Route exact path="/" component={BookmarkIndex} />
          <Route exact path="/topic" component={Topics} />
        </Router>
       </GlobalState>
    );
}

export default App;
