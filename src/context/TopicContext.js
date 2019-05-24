import React, { useState, useEffect } from 'react';
import { isEmpty } from '../utils/validate';
import { showErrorMessage, showSuccessMessage } from '../utils/alert';
import swal from 'sweetalert';
import TopicService from '../services/topic.service';
import BookmarkService from '../services/bookmark.service';

export const TopicContext = React.createContext();

export const TopicProvider = (props) => {
    const [topics, setTopics] = useState([]);
    const [topic, setTopic] = useState({});

    useEffect(() => {
        getTopics();
    }, []);

    const getTopics = async () => {
        const topics = await TopicService.getTopics();
        setTopics(topics);
    }

    const updateTopic = async (topic) => {
        TopicService.updateTopic(topic);
        getTopics();
        changeTopic({});
        showSuccessMessage({ title: 'Update topic successfully!' });
    }

    const removeTopic = async (id) => {
        const topic = await BookmarkService.isTopicExisted(id);
        if(isEmpty(topic)) return showErrorMessage({ 
            title: 'Can not remove this topic', 
            text: 'This topic belongs to some bookmarks' 
        })
       
        // await TopicService.removeTopic(id);
        // getTopics();
        // if(topic.id === id) changeTopic({});
        // showSuccessMessage({ title: 'Delete topic successfully!' });
    }

    const insertTopic = async (topic) => {
        await TopicService.insertTopic(topic);
        getTopics();
        changeTopic({});
        showSuccessMessage({ title: 'Insert topic successfully' });
    }

    const onInsertTopic = () => {
        swal({
          content: {
            element: "input",
            attributes: {
              placeholder: "Type topic",
              type: "text",
            },
          },
        })
        .then(async (topic) => {
          if(isEmpty(topic)) return showErrorMessage({ title: 'No topic inserted' });
          await insertTopic({ name: topic });
        })
        .catch(err => console.log(err));
    }

    const changeTopic = (topic) => {
        if(isEmpty(topic)) topic = { name: '' };
        setTopic(topic);
    }

    const state = { topic, topics };
    const methods = { changeTopic, updateTopic, removeTopic, onInsertTopic, getTopics, insertTopic };

    return (
        <TopicContext.Provider value={{
            ...state,
            ...methods
        }}>
            { props.children }
        </TopicContext.Provider>
    )
}