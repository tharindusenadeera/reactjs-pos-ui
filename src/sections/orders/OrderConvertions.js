import React from 'react';
import { GenerateUniqueId } from '../../utils/generateUniqueId';

/**
 * * this function will process the order and create a object compatible to the selectedProperties
 * ? Line 28 shouldn't pick 0 th element as it should be not array
 * @param { user clicked order details} order 
 * @param {initial product details} products 
 * @returns formatted item list array
 */
export const getFormattedOrder = (order, products) => {
    const formattedOrder = [];
    const {customer, customer_id, order_type, status, id, billing_address_1, billing_address_2} = order;


    order?.order_menu_items_full?.forEach((orderProduct) => {
        const quantity = orderProduct?.qty;
        const productId = orderProduct?.id;
        let array = [];

        const fullProduct = products.find((product) => product.productKey === productId);

        fullProduct?.menu_option_categories.forEach((option) => {
            const orderCategoryTypes = option?.id;
            const categoryTypes =  orderProduct?.order_menu_item_option_categories;
            const orderItem = categoryTypes?.find((category) => category.id === orderCategoryTypes)
            const item = orderItem?.order_menu_item_options[0];
            const tagName = `${option?.name} : ${item?.name}`;
            const tagId = `${option?.key}-${item?.id}`;

            array.push({
                id: option?.id,
                key: option?.key,
                categoryName: option?.name,
                value: option?.name,
                itemName: item?.name,
                tag: item?.name ? tagName : '',
                tagId: item?.id ? tagId : '',
                item: item ? {...item, key: item?.id, value: item?.name} : '',
            });
        })

        const processedOrder = {
            ...fullProduct,
            categories: array,
            quantity: quantity,
            subtotal: fullProduct?.price * quantity,
        }

        const uniqueKey = GenerateUniqueId(processedOrder);

        formattedOrder.push({...processedOrder, key: uniqueKey});
    })

    return {
        productList: formattedOrder,
        metaData: {
            customer: customer,
            customer_id: customer_id,
            billing_address_1: billing_address_1,
            billing_address_2: billing_address_2,
            order_type: order_type,
            status: status,
            order_id: id
        }
    };
}
