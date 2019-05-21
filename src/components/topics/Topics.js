import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, InputGroup, FormControl, Button } from 'react-bootstrap';
import { Context } from '../../context/GlobalState';
import { isEmpty } from '../../utils/validate';
import { showErrorMessage } from '../../utils/alert';

class Topics extends React.Component {

    static contextType = Context;

    constructor(props) {
        super(props);
        this.state = {
            filters: { name: '' }
        };
    }

    onChange = (e) => {
        const topic = Object.assign({}, this.context.topic);
        topic[e.target.name] = e.target.value;
        this.context.changeTopic(topic);
    }

    remove = (e, topic) => {
        e.preventDefault();
        this.context.removeTopic(topic.id);
    }

    edit = (e, topic) => {
        e.preventDefault();
        this.context.changeTopic(topic);
    }

    submit = async (e) => {
        e.preventDefault();
        
        const { topic } = this.context;
        if(isEmpty(topic.name)) return showErrorMessage({ title: 'Topic name is required!' });

        if(isEmpty(topic.id)){
            this.context.insertTopic(topic);
        } else {
            this.context.updateTopic(topic);
        }
    }

    filterTopics = (topics) => {
        if(isEmpty(topics)) return [];
        const { name } = this.state.filters;
        return topics.filter(topic => {
            return topic.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
        })
    }

    onChangeFilters = (e) => {
        const filters = Object.assign({}, this.state.filters);
        filters[e.target.name] = e.target.value;
        this.setState({ filters });
    } 

    render() {
        const { context, state } = this;
        const topics = this.filterTopics(context.topics);

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 mx-auto">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="text-center">Topics</h4>
                                <form onSubmit={this.submit}>
                                    <InputGroup className="mb-3">
                                         <input 
                                            className="form-control" 
                                            placeholder="Enter topic..." 
                                            value={context.topic.name}
                                            onChange={this.onChange} 
                                            name="name"
                                        />
                                        <InputGroup.Append>
                                            <Button variant="outline-success" onClick={this.submit}>
                                                { context.topic.id ? 'Update' : 'Insert' }
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
                                        value={state.filters.name}
                                        onChange={this.onChangeFilters} />
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
                                                        onClick={(e) => this.remove(e, topic)}>
                                                        Remove
                                                    </Dropdown.Item> 
                                                    <Dropdown.Item href="#" 
                                                        onClick={(e) => this.edit(e, topic)}>
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
}

Topics.propTypes = {};

export default Topics;
