import React from 'react';
import { BookmarkProvider } from './BookmarkContext';
import { TopicProvider } from './TopicContext';
import { ViewProvider } from './ViewContext';

function ProviderComposer({ contexts, children }) {
    return contexts.reduceRight((kids, parent) => (
        React.cloneElement(parent, {
            children: kids
        })
    ), children)
}

const GlobalState = (props) => {
    return (
        <ProviderComposer contexts={[ <BookmarkProvider/>, <TopicProvider/>, <ViewProvider/> ]}>
            { props.children }
        </ProviderComposer>
    )
} 

export default GlobalState;
