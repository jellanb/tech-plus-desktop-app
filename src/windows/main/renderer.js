
// Init Main Menu Buttons
document.getElementById('nav-item-shell').addEventListener('click',  async () => {
    const content = document.getElementById('content');
    content.innerHTML = await (await fetch('../sales/content.html')).text();
    changeContent('content-shell-module', 'nav-item-shell');
});

document.getElementById('nav-item-client').addEventListener('click', async () => {
    const content = document.getElementById('content');
    content.innerHTML = await (await fetch('../client/content.html')).text();
    changeContent('content-client-module', 'nav-item-client');
});

document.getElementById('nav-item-products').addEventListener('click', async () => {
    const content = document.getElementById('content');
    content.innerHTML = await (await fetch('../products/content.html')).text();
    changeContent('content-products-module', 'nav-item-products');
});

document.getElementById('nav-item-category').addEventListener('click', async () => {
    const content = document.getElementById('content');
    content.innerHTML = await (await fetch('../category/content.html')).text();
    changeContent('content-category-module', 'nav-item-category');
});

document.getElementById('nav-item-inventory').addEventListener('click', async () => {
    const content = document.getElementById('content');
    content.innerHTML = await (await fetch('../inventory/content.html')).text();
    changeContent('content-inventory-module', 'nav-item-inventory');
});

document.getElementById('nav-item-config').addEventListener('click', async () => {
    const content = document.getElementById('content');
    content.innerHTML = await (await fetch('../configuration/content.html')).text();
    changeContent('content-configuration-module', 'nav-item-config');
});

document.getElementById('nav-item-cutoff').addEventListener('click', async () => {
    const content = document.getElementById('content');
    content.innerHTML = await (await fetch('../cutoff/content.html')).text();
    changeContent('content-cutoff-module', 'nav-item-cutoff');
});
// End Main Menu Buttons

//Init modal buttons
document.getElementById('default-modal-button-cancel').addEventListener('click', () => {
    document.getElementById('default-modal').classList.add('hidden');
});

document.getElementById('default-modal-button-accept').addEventListener('click', () => {
    document.getElementById('default-modal').classList.add('hidden');
});

document.getElementById('default-modal-button-close').addEventListener('click', () => {
    document.getElementById('default-modal').classList.add('hidden');
});
//End modal buttons

async function changeContent(contentElementId, navButtonId) {

    //change css menu item buttons
    const navItems = document.getElementById('nav-item-list')
    navItems.querySelectorAll("[id^='nav-item-']").forEach(button => {
        button.className ='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700';
    });

    document.getElementById(navButtonId).className = 'block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500';

    if (contentElementId === 'content-shell-module') {
        document.getElementById('button-product-without-register').addEventListener('click', () => {
            console.log('click');
            window.action.openWindow('sales/product-without-register/index.html', 800, 600);
        });

        document.getElementById('button-pay').addEventListener('click', () => {
            console.log('click');
            window.action.openWindow('sales/pay/index.html', 900, 700);
        });
    };

    if (contentElementId === 'content-client-module') {
        document.getElementById('button-new-client').addEventListener('click', () => {
            window.action.openWindow('client/new-client/index.html', 900, 600);
        });
        document.getElementById('button-credit-report').addEventListener('click', () => {
            window.action.openWindow('client/credit-report/index.html', 1000, 850);
        });
    };

    if (contentElementId === 'content-products-module') {
        // Init Products Sub Content Buttons
        const categories = await window.action.addProduct('get-categories', {});

        if (!!categories) {
            categories.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.id
                optionElement.textContent = option.name
                document.getElementById('input-new-product-category').appendChild(optionElement);
            });

        };

        const inputPrice = document.getElementById('input-new-product-price');
        const inputIva = document.getElementById('input-new-product-iva-amount');

        inputPrice.addEventListener('input', () => {
            const price = parseInt(inputPrice.value);
            if (!isNaN(price)) {
                inputIva.value = (price * 0.19).toFixed(2);
            };
        });

        document.getElementById('add-category-button').addEventListener('click', async () => {
            const content = document.getElementById('content');
            content.innerHTML = await (await fetch('../category/content.html')).text();
            changeContent('content-category-module', 'nav-item-category');
        });


        if (!!!categories.name) {
            document.getElementById('section-add-category-button').classList.remove('hidden');
        } else {
            document.getElementById('section-add-category-button').classList.add('hidden');
        }


        let barcodeCheckbox = document.getElementById('checkbox-new-product-barcode-enable').checked;
        let inventoryCheckbox = document.getElementById('checkbox-new-product-inventory-enable').checked;
        document.getElementById('checkbox-new-product-barcode-enable').addEventListener('change', () => {
            barcodeCheckbox = !barcodeCheckbox;
            if (barcodeCheckbox) document.getElementById('container-barcode').classList.remove('hidden');
            else document.getElementById('container-barcode').classList.add('hidden');

        });

        document.getElementById('checkbox-new-product-inventory-enable').addEventListener('change', () => {
            inventoryCheckbox = !inventoryCheckbox;
            if (inventoryCheckbox) {
                document.getElementById('container-inventory-current-quantity').classList.remove('hidden');
                document.getElementById('container-inventory-min-quantity').classList.remove('hidden');
            }
            else {
                document.getElementById('container-inventory-current-quantity').classList.add('hidden');
                document.getElementById('container-inventory-min-quantity').classList.add('hidden');
            }
        })

        document.getElementById('menu-button-new-product').addEventListener('click', () => {
            changeProductsContent('sub-content-add-new-product', 'menu-button-new-product');
        });

        document.getElementById('menu-button-edit-product').addEventListener('click', () => {
            changeProductsContent('sub-content-edit-new-product', 'menu-button-edit-product');
        });

        document.getElementById('menu-button-delete-product').addEventListener('click', () => {
            changeProductsContent('sub-content-delete-product', 'menu-button-delete-product');
        });

        document.getElementById('menu-button-promotion-product').addEventListener('click', () => {
            changeProductsContent('sub-content-promotion-product', 'menu-button-promotion-product');
        });

        document.getElementById('menu-button-import-product').addEventListener('click', () => {
            changeProductsContent('sub-content-import-product', 'menu-button-import-product');
        });
        let newProduct;

        const btnGrams = document.getElementById('button-product-grams-type');
        const btnPack = document.getElementById('button-product-pack-type');
        const btnUnit = document.getElementById('button-product-unit-type');
        btnGrams.addEventListener('click', () => {
            btnGrams.className ='px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-600 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white';
            btnPack.className='px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white';
            btnUnit.className='px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white';
            const unitOfMeasurement = 'grams';
            newProduct = { ...newProduct, unitOfMeasurement };
        });

        btnPack.addEventListener('click', () => {
            btnPack.className ='px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-600 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white';
            btnGrams.className='px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white';
            btnUnit.className='px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white';
            const unitOfMeasurement = 'pack';
            newProduct = { ...newProduct, unitOfMeasurement };
        });

        btnUnit.addEventListener('click', () => {
            btnUnit.className ='px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-600 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white';
            btnGrams.className='px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white';
            btnPack.className='px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white';
            const unitOfMeasurement = 'unit';
            newProduct = { ...newProduct, unitOfMeasurement };
        });

        document.getElementById('add-product-button').addEventListener('click', async (event) => {
            event.preventDefault();

            const productDescription = document.getElementById('input-new-product-description').value;
            const barcodeEnable = document.getElementById('checkbox-new-product-barcode-enable').checked;
            const barcode = document.getElementById('input-new-product-barcode').value;
            const priceNet = document.getElementById('input-new-product-price-net').value;
            const price = inputPrice.value;
            const wholesalePrice = document.getElementById('input-new-product-wholesale-price').value;
            const iva = document.getElementById('input-new-product-iva').value;
            const ivaAmount = inputIva.value;
            const category = document.getElementById('input-new-product-category').value;
            const inventoryEnable = document.getElementById('checkbox-new-product-inventory-enable').checked;
            const quantity = document.getElementById('input-new-product-current-quantity').value;
            const minQuantity = document.getElementById('input-new-product-min-quantity').value;

            newProduct = {
                ...newProduct,
                productDescription,
                barcodeEnable,
                barcode,
                priceNet,
                price,
                wholesalePrice,
                iva,
                ivaAmount,
                category,
                inventoryEnable,
                quantity,
                minQuantity
            };

            if (!!!newProduct.unitOfMeasurement){
                modalErrorDescription('Error guardando Prodcuto','Se debe seleccionar una unidad de medidad para el nuevo producto');
                return;
            };

            if (!!!newProduct.productDescription) {
                modalErrorDescription('Error guardando Prodcuto','Se debe ingresar una descripción para el producto');
                return;
            };

            if (!!!newProduct.priceNet) {
                modalErrorDescription('Error guardando Prodcuto','Se debe ingresar el precio de costo del producto!');
                return;
            };

            if (!!!newProduct.price) {
                modalErrorDescription('Error guardando Prodcuto','Se debe ingresar el precio de venta del producto!');
                return;
            };

            if (document.getElementById('checkbox-new-product-barcode-enable').checked){
                if (!!!newProduct.barcode){
                    modalErrorDescription('Error guardando Prodcuto','Se debe ingresar una valor para el código de barra');
                    return;
                }
            }

            if (document.getElementById('checkbox-new-product-inventory-enable').checked){
                if (!!!newProduct.quantity){
                    modalErrorDescription('Error guardando Prodcuto','Se debe ingresar una valor para la cantidad del inventario');
                    return;
                }
                if (!!!newProduct.minQuantity){
                    modalErrorDescription('Error guardando Prodcuto', 'Se debe ingresar una valor para la cantidad minima del inventario');
                    return;
                }
            }

            const productResult = await window.action.addProduct('create-product', newProduct);
            console.log(productResult);
            if (!!productResult) {
                document.getElementById('input-new-product-description').value = '';
                document.getElementById('checkbox-new-product-barcode-enable').checked = true;
                document.getElementById('input-new-product-barcode').value = '';
                document.getElementById('input-new-product-price-net').value = '';
                inputPrice.value = true;
                document.getElementById('input-new-product-wholesale-price').value = '';
                inputIva.value = '';
                document.getElementById('input-new-product-category').value = '';
                document.getElementById('checkbox-new-product-inventory-enable').checked = true;
                document.getElementById('input-new-product-current-quantity').value = '';
                document.getElementById('input-new-product-min-quantity').value = '';

                modalErrorDescription('Correcto','Producto creado correctamente!');
            };
        });
        // End Products Sub Content Buttons
    };
    if (contentElementId === 'content-products-module') {

    }
}

function changeProductsContent(subContentProduct, buttonProductId) {
    //hidden all content
    const main = document.getElementById("sub-content-products")
    main.querySelectorAll("[id^='sub-content-']").forEach(content => {
        content.classList.add('hidden');
    });

    //change css menu item buttons
    const productButtons = document.getElementById('menu-product-buttons')
    productButtons.querySelectorAll("[id^='menu-button-']").forEach(button => {
        button.className ='flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-lg md:w-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800';
    });

    document.getElementById(buttonProductId).className = 'flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-lg md:w-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 dark:bg-gray-700 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800';

    //show only content from menu
    document.getElementById(subContentProduct).classList.remove('hidden');
};

function modalErrorDescription(title, errorDescription) {
    const targetModal = document.getElementById('default-modal');
    if (targetModal) {
        targetModal.classList.toggle('hidden');
        document.getElementById('default-modal-title').innerText = title;
        document.getElementById('default-modal-text').innerText = errorDescription;
    }
}