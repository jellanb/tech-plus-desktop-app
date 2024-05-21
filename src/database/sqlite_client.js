const sqlite3 = require('sqlite3').verbose();
const error = require('./../common/error');
const database = new sqlite3.Database('./data.db');


function closeDataBase() {
    database.close();
}


function createDataBase() {
    database.serialize(() => {
        database.run('CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, name TEXT, last_name TEXT, rut TEXT, email TEXT, phone TEXT, bird_date DATE)');
        database.run('CREATE TABLE IF NOT EXISTS client (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, last_name TEXT, rut TEXT, phone TEXT, address TEXT, max_amount REAL, balance REAL)')
        database.run('CREATE TABLE IF NOT EXISTS category (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)')
        database.run('CREATE TABLE IF NOT EXISTS unique_discount (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, quantity INTEGER, discount_amount REAL)')
        database.run('CREATE TABLE IF NOT EXISTS pack_discount (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, item_quantity INTEGER, discount_amount REAL)')
        database.run('CREATE TABLE IF NOT EXISTS bundle_discount (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, item_quantity INTEGER, discount_amount REAL)')
        database.run('CREATE TABLE IF NOT EXISTS product (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, barcode_enable INTEGER, unit_of_measurement TEXT,  barcode TEXT, quantity INTEGER, net_price INTEGER, price INTEGER, wholesale_price INTEGER, discount_enable INTEGER, id_category INTEGER, discount_unique_id INTEGER, discount_pack_id INTEGER, discount_bundle_id INTEGER, FOREIGN KEY (id_category) REFERENCES category(id), FOREIGN KEY (discount_unique_id) REFERENCES unique_discount(id), FOREIGN KEY (discount_pack_id) REFERENCES pack_discount(id), FOREIGN KEY (discount_bundle_id) REFERENCES bundle_discount(id))')
        database.run('CREATE TABLE IF NOT EXISTS products_sale (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, barcode TEXT, quantity INTEGER, brand TEXT, net_price INTEGER, price INTEGER, whole_sale INTEGER, discount INTEGER, product_id INTEGER, FOREIGN KEY (product_id) REFERENCES product(id))')
        database.run('CREATE TABLE IF NOT EXISTS sales (id INTEGER PRIMARY KEY AUTOINCREMENT, date DATE, user_id INTEGER, amount REAL, payment_method_ TEXT, change REAL, folio INTEGER, type_document INTEGER, discount_amount INTEGER, tax INTEGER, client_id INTEGER, product_sale_id INTEGER, FOREIGN KEY (client_id) REFERENCES client(id), FOREIGN KEY (product_sale_id) REFERENCES products_sale(id))')
        database.run('CREATE TABLE IF NOT EXISTS inventory (id INTEGER PRIMARY KEY AUTOINCREMENT, product_description TEXT, barcode TEXT, quantity INTEGER, amount_sold INTEGER, net_price INTEGER, brand TEXT, minimum_quantity INTEGER, category_id INTEGER, FOREIGN KEY (category_id) REFERENCES category(id))')
        database.run('CREATE TABLE IF NOT EXISTS sales_summary (id INTEGER PRIMARY KEY AUTOINCREMENT, date DATE, money_amount INTEGER, debit_amount INTEGER, credit_amount INTEGER, init_amount_ INTEGER, end_amount INTEGER, money_ingress INTEGER, money_output INTEGER, cancelled_amount INTEGER, total_sales_amount INTEGER, total_profits_amount INTEGER, client_credit_amount INTEGER, user_id INTEGER, FOREIGN KEY (user_id) REFERENCES user(id))')
        database.run('CREATE TABLE IF NOT EXISTS sales_cancelled (id INTEGER PRIMARY KEY AUTOINCREMENT, date DATE, amount INTEGER, user_id INTEGER, client_id INTEGER, sales_id INTEGER, FOREIGN KEY (user_id) REFERENCES user(id), FOREIGN KEY (client_id) REFERENCES client(id), FOREIGN KEY (sales_id) REFERENCES sales(id))')
    });
};

function createSelectQuery(tableName, condition) {
    const query = `SELECT * FROM ${tableName} WHERE ${condition}`;

    database.all(query, [], (err, rows) => {
        if (err) {
            return error.newError(err, error.ErrorType.SqliteException, `Error finding ${tableName}: ${err.message}`);
        }
        return rows
    });
}

async function createInsertQuery(tableName, fields, values) {
    const placeholders = fields.map(() => '?').join(', '); // Crear los marcadores de posición

    const query = `INSERT INTO ${tableName} (${fields.join(', ')}) VALUES (${placeholders})`;

    database.run(query, values, function(err) {
        if (err) {
            return error.newError(err, error.ErrorType.SqliteException, `Error saving ${tableName}: ${err.message}`);
        }
        console.log(`New ${tableName} created with ID:`, this.lastID);
        return this.lastID;
    });
}

function createUpdateQuery(tableName, fieldsToUpdate, newData, condition){
    const setClause = fieldsToUpdate.map(field => `${field} = ?`).join(', ');
    const query = `UPDATE ${tableName} SET ${setClause} WHERE ${condition}`;

    database.run(query, fieldsToUpdate, function (err) {
        if (err) {
            return error.newError(err, error.ErrorType.SqliteException, `Error updating ${tableName}: ${err.message}`);
        }
        console.log(`Rows updated in ${tableName}: ${this.changes}`);
    });
}

function createDeleteQuery(tableName, condition) {
    const query = `DELETE FROM ${tableName} WHERE ${condition}`;

    database.run(query, [], function(err) {
        if (err) {
            return error.newError(err, error.ErrorType.SqliteException, `Error deleting in ${tableName}: ${err.message}`);
        }
        console.log(`Rows deleted in ${tableName}: ${this.changes}`);
    });
}

module.exports = {
    createDataBase,
    closeDataBase,
    createSelectQuery,
    createInsertQuery,
    createUpdateQuery,
    createDeleteQuery
};


