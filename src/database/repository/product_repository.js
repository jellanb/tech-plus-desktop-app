const { createInsertQuery, createUpdateQuery, createSelectQuery, createDeleteQuery } = require('../sqlite_client.js');
const error = require("../../common/error");

const tableName = 'product';

async function createProduct(productData) {

    let newProduct = {
        description: productData.productDescription,
        barcode_enable: productData.barcodeEnable,
        unit_of_measurement: productData.unitOfMeasurement,
        barcode: productData.barcode,
        quantity: productData.quantity,
        net_price: productData.priceNet,
        price: productData.price,
        wholesale_price: productData.wholesalePrice,
        discount_enable: false,
        id_category: 0,//TODO: find this value productData.id_category,
        discount_unique_id: 0,//productData.discount_unique_id,
        discount_pack_id: 0,//productData.discount_pack_id,
        discount_bundle_id: 0 // productData.discount_bundle_id
    };

    const result = await createInsertQuery(tableName, Object.keys(newProduct), Object.values(newProduct));
    if (result != undefined) {
        throw result.error;
    };
}

function updateProductByDescription(productData) {
    const newProduct = {
        description: productData.description,
        barcode_enable: productData.barcode_enable,
        barcode: productData.barcode,
        quantity: productData.quantity,
        net_price: productData.net_price,
        price: productData.price,
        brand: productData.brand,
        unit_of_measurement: productData.unit_of_measurement,
        wholesale_price: productData.wholesale_price,
        discount_enable: productData.discount_enable,
        id_category: productData.id_category,
        discount_unique_id: productData.discount_unique_id,
        discount_pack_id: productData.discount_pack_id,
        discount_bundle_id: productData.discount_bundle_id
    };

    const condition = `description = ${newProduct.description}`;

    createUpdateQuery(tableName, Object.keys(newProduct), newProduct, condition)
}

function getProductByDescription(productData) {
    const condition = `description = ${productData.description}`;

    createSelectQuery(tableName, condition);
}

function deleteProductByDescription(tableName, productData) {
    const condition = `description = ${productData.description}`;

    createDeleteQuery(tableName, condition);
}


module.exports = {
    createProduct,
    updateProductByDescription,
    getProductByDescription,
    deleteProductByDescription
}