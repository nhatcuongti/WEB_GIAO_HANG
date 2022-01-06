import couch from "./utils/couchDB.js";
import clientModel from "./models/client.model.js";
import productModel from "./models/product.model.js";

const dbName = "delivery";
const viewUrl = "_design/store/_view/view-product-store";

const key = "5e80f0f983145f1508d5853013002b1e";
const queryOptions = {
    key
};

// const data = productModel.getNameProductWithID(null).then(
//     function (data, headers, status){
//         console.log(data.data.rows);
//     },
//     function (err){
//         console.log(err);
//     }
// )

async function test(){
    const data = await productModel.getNameProductWithID('id1');
    console.log(data.data.rows);
}

test();





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



