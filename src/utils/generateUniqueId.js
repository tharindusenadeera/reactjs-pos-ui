
/**
 * * Key Generation Scenario 
 * * {product_id | category_id1-item_id1 | category_id2-item_id2 | ...}
 * @param {Food Item} item 
 * @returns 
 */

export const GenerateUniqueId = (item) => {
    let id_array = [];
    const product_key = ''+item.productKey+'|';

    item?.categories?.forEach(category => {
        const category_key = category?.key;
        const item_key = category?.item?.key;
        
        if (item_key && category_key) {
            id_array.push(`${category_key}-${item_key}`);
        }
    });

    return product_key+ id_array.join('|');
}

/**
 * @param {newly created ID} newId 
 * @param {Saved items already} existingItems 
 * @returns { Will returen object containing isMatch and matchedItem]}
 */

const Search = (newId, existingItems) => {
    // let newId = GenerateUniqueId(item);
    let sections =  newId?.split('|');
    let newItemCategoriesId = sections?.slice(1);
    let isMatch = false;
    let matchedItem = {};

    for (let i = 0; i < existingItems?.length; i++) {
        let item = existingItems[i];
        let idArray = item?.key?.split('|');
        let itemMatch = false;

        // Id's Dont match if the product keys are not matching
        if (idArray[0] !== sections[0]) break;

        // categories and its items should match
        if (idArray.length !== sections?.length) break;
        
        let categoriesId = idArray?.slice(1);

        for (let j = 0; j < categoriesId?.length; j++) {
            let categoryId = categoriesId[j];
            let categoryOld = categoryId?.split('-')[0];
            let itemOld = categoryId?.split('-')[1];
            let status = true;

            for (let k = 0; k < newItemCategoriesId?.length; k++) {
                let newItemCategoryId = newItemCategoriesId[k];
                let categoryNew = newItemCategoryId?.split('-')[0];
                let itemNew = newItemCategoryId?.split('-')[1];
                
                if (categoryOld === categoryNew && itemOld !== itemNew) {
                    status = false;
                    break;
                }
            }

            if (status) {
                itemMatch = true;
            } else {
                itemMatch = false;
                break;
            }

        }
        
        if (itemMatch) {
            isMatch = true;
            matchedItem = item;
            break;
        }

    }

    return {isMatch, matchedItem};
}

/**
 * @param { if of the matching item } id 
 * @param { already existing item } existingItems 
 * @returns {matched or not}
 */

export const CheckforMatch = (id, existingItems) => {
    let {isMatch} = Search(id, existingItems);
    return isMatch;
}

/**
 * @param { if of the matching item } id 
 * @param { already existing item } existingItems  
 * @returns {Matched Item}
 */

export const GetItemFromId = (id, existingItems) => {
    let {matchedItem} = Search(id, existingItems);
    return matchedItem;
}