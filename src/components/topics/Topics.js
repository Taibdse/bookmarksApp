import React, { useContext, useState } from 'react';
import { Dropdown, InputGroup, FormControl, Button } from 'react-bootstrap';
import { TopicContext } from '../../context/TopicContext';
import { isEmpty } from '../../utils/validate';
import { showErrorMessage } from '../../utils/alert';

const Topics = (props) => {

    const topicContext = useContext(TopicContext);
    const [ filters, setFilters ] = useState({ name: '' })
   
    const onChange = (e) => {
        const topic = Object.assign({}, topicContext.topic);
        topic[e.target.name] = e.target.value;
        topicContext.changeTopic(topic);
    }

    const remove = (e, topic) => {
        e.preventDefault();
        topicContext.removeTopic(topic.id);
    }

    const edit = (e, topic) => {
        e.preventDefault();
        topicContext.changeTopic(topic);
    }

    const submit = async (e) => {
        e.preventDefault();
        const { topic } = topicContext;
        if(isEmpty(topic.name)) return showErrorMessage({ title: 'Topic name is required!' });

        if(isEmpty(topic.id)){
            topicContext.insertTopic(topic);
        } else {
            topicContext.updateTopic(topic);
        }
    }

    const filterTopics = (topics) => {
        if(isEmpty(topics)) return [];
        const { name } = filters;
        return topics.filter(topic => {
            return topic.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
        })
    }

    const onChangeFilters = (e) => {
        const newFilters = Object.assign({}, filters);
        newFilters[e.target.name] = e.target.value;
        setFilters(newFilters);
    } 

    const topics = filterTopics(topicContext.topics);

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-6 mx-auto">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="text-center">Topics</h4>
                            <form onSubmit={submit}>
                                <InputGroup className="mb-3">
                                        <input 
                                        className="form-control" 
                                        placeholder="Enter topic..." 
                                        value={topicContext.topic.name}
                                        onChange={onChange} 
                                        name="name"
                                    />
                                    <InputGroup.Append>
                                        <Button variant="outline-success" onClick={submit}>
                                            { topicContext.topic.id ? 'Update' : 'Insert' }
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </form>

                        </div>
                        <div className="card-body">
                            <div className="form-group px-5">
                                <input 
                                    className="form-control" 
                                    placeholder="Search topic..."
                                    name="name"
                                    value={filters.name}
                                    onChange={onChangeFilters} />
                            </div>

                            <ul className="list-group">
                                { topics.map(topic => (
                                    <li className="list-group-item" key={topic.id}>
                                        { topic.name }
                                        <Dropdown className="float-right">
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#" 
                                                    onClick={(e) => remove(e, topic)}>
                                                    Remove
                                                </Dropdown.Item> 
                                                <Dropdown.Item href="#" 
                                                    onClick={(e) => edit(e, topic)}>
                                                    Edit
                                                </Dropdown.Item> 
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </li>
                                )) }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Topics;
