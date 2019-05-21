import React from 'react';
import PropTypes from 'prop-types';
import FormBookMark from './FormBookMark';
import BookMarks from './BookMarks';

const BookmarkIndex = () => {
    return (
        <div className="container">
            <div className="row mt-3">
              <div className="col-md-6 mx-auto">
                <FormBookMark />
              </div>
            </div>
            <div className="row mt-3" style={{ marginBottom: '120px' }}>
              <div className="col-md-8 mx-auto">
                <BookMarks />
              </div>
            </div>
        </div>
    );
};

export default BookmarkIndex;
