
/**
 * * Key Generation Scenario 
 * * {product_id | menu_option_category_menu_option_id | ...}
 * @param {Food Item} item 
 * @returns 
 */

export const GenerateUniqueId = (item) => {
    let id_array = [];
    
    item?.categories?.forEach(category => {
        const item_key = category?.item?.menu_option_category_menu_option_id;
        
        if (item_key) {
            id_array.push(item_key);
        }
    });

    const product_key = id_array.length > 0 ? ''+item.productKey+'|' : ''+item.productKey;

    return product_key+ id_array.join('|');
}

/**
 * 
 * @param { array 1} array1 
 * @param { array 2} array2 
 * @returns array 1 === array 2 ?
 */
const compareTwoArrays = (array1, array2) => {

    let a1 = array1.map((item) => {
        return parseInt(item);
    });

    let a2 = array2.map((item) => {
        return parseInt(item);
    });

    let sortedArray1 = a1.sort((a, b) => {
        return a - b;
    });

    let sortedArray2 = a2.sort((a, b) => {
        return a - b;
    });

    return sortedArray1.join(',') === sortedArray2.join(',');
}


/**
 * @param {newly created ID} newId 
 * @param {Saved items already} existingItems 
 * @returns { Will returen object containing isMatch and matchedItem]}
 */

 const Search = (newId, existingItems) => {
    let idArrayNew =  newId?.split('|');
    let newProductId = idArrayNew[0];
    let isMatch = false;
    let matchedItem = {};

    for (let j = 0; j < existingItems?.length; j++) {
        
        let item = existingItems[j];
        let idArrayOld = item?.key?.split('|');
        
        if (newProductId !== idArrayOld[0]) {
            continue;
        } else if (idArrayNew.length !== idArrayOld.length) {
            continue;
        } else if (idArrayNew.length === 1) {
            if (newProductId === idArrayOld[0]) {
                isMatch = true;
                matchedItem = item;
                break;
            } else {
                continue;
            }
        } else {
            let isMatched = compareTwoArrays(idArrayNew?.slice(1),idArrayOld?.slice(1));
            
            if (isMatched) {
                isMatch = true;
                matchedItem = item;
                break;
            } else {
                continue;
            }
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