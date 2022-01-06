import NodeCouchDB from 'node-couchdb';

const couch = new NodeCouchDB({
    auth : {
        user : 'admin',
        pass : '0909845284'
    }
});



export default couch;