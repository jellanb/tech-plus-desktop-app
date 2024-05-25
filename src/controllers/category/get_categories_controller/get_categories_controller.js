const { getCategories } =  require('../../../database/repository/categoy_repository');

async function get_categories_controller() {
    console.log('Init process to get categories');
    try {
        const categories = getCategories();
        if (!!categories){
            console.log('End process to get categories');
            return categories;
        } else {
            console.log('End process to get categories');
            return [{ id: 0, name: '' }];
        }
    } catch (failure) {
        console.error(failure.message);
        throw failure;
    }
}

module.exports = {
    get_categories_controller
}