const Joi = require("joi");
const { createProduct } =  require('../../../database/repository/product_repository');
const error = require("../../../common/error");

const productSchema = Joi.object({
    description: Joi.string().required().empty(''),
    barcode_enable: Joi.boolean().required(),
    unit_of_measurement: Joi.string().required(),
    barcode: Joi.string().allow('').required(), // Permitir cadena vacía como valor válido
    quantity: Joi.number().required(),
    net_price: Joi.number().required(),
    price: Joi.number().required(),
    wholesale_price: Joi.number().required(),
    discount_enable: Joi.boolean().required(),
    id_category: Joi.number().required(),
    discount_unique_id: Joi.number().required(),
    discount_pack_id: Joi.number().required(),
    discount_bundle_id: Joi.number().required(),
});

function generateNewProduct(productData) {
    return {
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
};

async function create_product_controller(data) {
    console.log('Init process to create product');
    try {
        const newProduct = generateNewProduct(data);
        const { error: errorProductValidation } = productSchema.validate(newProduct);

        if (errorProductValidation) {
            console.log('End process to create product with error');
             throw new error.newError(errorProductValidation, error.ErrorType.InputValidationError, `Error in create product controller msg: ${errorProductValidation.message}`);
        }

        await createProduct(newProduct);

        console.log('End process to create product');
        return { success: true, message: 'Product created successfully' };
    } catch (failure) {
        console.error(failure.message);
        throw failure;
    };

};

module.exports = {
    create_product_controller
};