
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

function changeContent(contentElementId, navButtonId) {
    //hidden all content
    /*const main = document.getElementById("main-content")
    main.querySelectorAll("[id^='content']").forEach(content => {
        content.classList.add('hidden');
    });*/

    //change css menu item buttons
    const navItems = document.getElementById('nav-item-list')
    navItems.querySelectorAll("[id^='nav-item-']").forEach(button => {
        button.className ='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700';
    });

    document.getElementById(navButtonId).className = 'block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500';


    //show only content from menu
    //document.getElementById(contentElementId).classList.remove('hidden');

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

        document.getElementById('add-product-button').addEventListener('click', (event) => {
            event.preventDefault();

            const productDescription = document.getElementById('input-new-product-description').value;
            const barcodeEnable = document.getElementById('checkbox-new-product-barcode-enable').checked;
            const barcode = document.getElementById('input-new-product-barcode').value;
            const priceNet = document.getElementById('input-new-product-price-net').value;
            const price = document.getElementById('input-new-product-price').value;
            const wholesalePrice = document.getElementById('input-new-product-wholesale-price').value;
            const iva = document.getElementById('input-new-product-iva').value;
            const ivaAmount = document.getElementById('input-new-product-iva-amount').value;
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

            if (newProduct.unitOfMeasurement === undefined){
                const targetModal = document.getElementById('default-modal');
                if (targetModal) {
                    targetModal.classList.toggle('hidden');
                    targetModal.classList.toggle('flex');
                }
                return;
            };

            window.action.addProduct('create-product', newProduct);
        });
        // End Products Sub Content Buttons
    };
    if (contentElementId === 'content-products-module') {

    }
};

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
}