import NodeCouchDb from 'node-couchdb';

const couch = new NodeCouchDb({
    auth: {
        user: 'sa',
        pass: '123'
    }
});

export default couch;