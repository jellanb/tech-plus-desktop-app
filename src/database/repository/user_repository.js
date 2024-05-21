const { createInsertQuery, createUpdateQuery, createSelectQuery, createDeleteQuery } = require('../sqlite_client.js');

const tableName = 'user';

function createUser(userData) {
    const newUserData = {
        username: userData.username,
        password: userData.password,
        name: userData.name,
        last_name: userData.last_name,
        rut: userData.rut,
        email: userData.email,
        phone: userData.phone,
        bird_date: userData.bird_date
    };

    createInsertQuery(tableName, Object.keys(userData), newUserData);
}

function updateUserByUserUserName(userData) {
    const newUserData = {
        username: userData.username,
        password: userData.password,
        name: userData.name,
        last_name: userData.last_name,
        rut: userData.rut,
        email: userData.email,
        phone: userData.phone,
        bird_date: userData.bird_date
    };

    const condition = `username = ${userData.username}`;

    createUpdateQuery(tableName, Object.keys(userData), newUserData, condition)
}

function getUserByUserName(userData) {
    const condition = `username = ${userData.username}`;

    createSelectQuery(tableName, condition);
}

function deleteUserByUserName(tableName, userData) {
    const condition = `username = ${userData.username}`;

    createDeleteQuery(tableName, condition);
}


module.exports = {
    createUser,
    updateUserByUserUserName,
    getUserByUserName,
    deleteUserByUserName
}