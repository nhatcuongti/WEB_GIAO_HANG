import couch from "./utils/couchDB.js";
import clientModel from "./models/client.model.js";
import productModel from "./models/product.model.js";
import companyModel from "./models/company.model.js";
import accountModel from "./models/account.model.js";

const dbName = "delivery";


// const data = productModel.getNameProductWithID(null).then(
//     function (data, headers, status){
//         console.log(data.data.rows);
//     },
//     function (err){
//         console.log(err);
//     }
// )


const mangoQuery = {
    selector: {
        "_id":"25136122f493f9fec6a3bcfe47012d18"
    }
};
const parameters = {};

couch.mango(dbName, mangoQuery, parameters).then(
    function (data, headers, status){
        console.log(data.data.docs[0]);
    },
    function (err){
        console.log(err);
    }
)



// const couch = new NodeCouchDB({
//     auth : {
//         user : 'admin',
//         pass : '123456'
//     }
// });
//
// const dbName = "delivery";
// const viewUrl = "_design/store/_view/view-store";



// couch.uniqid().then(function(ids){
//     const id = ids[0];
//
//     couch.insert(dbName, {
//         "_id" : id,
//         "type": "client",
//         "Name": "Bui Nguyen Nhat Cuong",
//         "Address": "Binh Phuoc, Loc Ninh"
//     }).then(
//         function (data, headers, status){
//             console.log("Successfully !!");
//         },
//         function (err){
//             console.log("Fail !!");
//         }
//     )
// })



