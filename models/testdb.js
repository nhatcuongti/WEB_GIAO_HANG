import knex from "../utils/knex.js";

function test(){
    return knex('student');
}

export default test;