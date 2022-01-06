import NodeCouchDB from 'node-couchdb';

const couch = new NodeCouchDB({
    auth : {
        user : 'admin',
        pass : '123456'
    }
});



export default couch;