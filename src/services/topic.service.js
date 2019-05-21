import db from '../db/db';

class TopicService {
    static getTopics() {
        return db.topics.toArray();
    }

    static insertTopic(topic) {
        return db.topics.add(topic);
    }

    static updateTopic(topic) {
        const { id } = topic;
        delete topic.id;
        return db.topics.update(id, topic);
    }

    static removeTopic(id) {
        return db.topics.delete(id);
    }

    
}

export default TopicService;