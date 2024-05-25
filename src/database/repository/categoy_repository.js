const { createInsertQuery, createUpdateQuery, createSelectQuery, createDeleteQuery } = require('../sqlite_client.js');

async function getCategories() {
    return await createSelectQuery('category', '1=1');
}

module.exports = {
    getCategories
}