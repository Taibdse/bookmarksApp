import React from 'react';
import FormBookMark from './FormBookMark';
import BookMarks from './BookMarks';

const BookmarkIndex = () => {
    return (
        <div className="container">
            <div className="row mt-3">
              <div className="col-md-4 ">
                <FormBookMark />
              </div>
              <div className="col-md-8 ">
                <BookMarks />
              </div>
            </div>
            {/* <div className="row mt-3" style={{ marginBottom: '120px' }}>
              
            </div> */}
        </div>
    );
};

export default BookmarkIndex;
