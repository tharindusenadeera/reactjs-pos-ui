
/**
 * * Key Generation Scenario 
 * * {product_id | menu_option_category_menu_option_id | ...}
 * @param {Food Item} item 
 * @returns 
 */

export const GenerateUniqueId = (item) => {
    let category_id_array = [];
    let addon_id_array = [];
    
    item?.categories?.forEach(category => {
        const item_key = category?.item?.menu_option_category_menu_option_id;
        
        if (item_key) {
            category_id_array.push(item_key);
        }
    });

    item.selectAddons.forEach((addonName) => {
            item.menu_item_addons?.forEach((addon)=> {
            if (addonName === addon.name) {
                addon_id_array.push(addon.pivot.addon_id);
            }
        })
    })

    const product_key = item.productKey;
    const category_key =  category_id_array.join('-');
    const addon_key = addon_id_array.join('-');
    const key = (''+product_key).concat(category_key ? '|'+ category_key : '|-').concat(addon_key ? '|' + addon_key :'|-');

    return key;
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
    let newCategoryIdArray = idArrayNew[1].split('-');
    let newAddonIdArray = idArrayNew[2].split('-');

    let isMatch = false;
    let matchedItem = {};

    for (let j = 0; j < existingItems?.length; j++) {
        
        let item = existingItems[j];
        let idArrayOld = item?.key?.split('|');
        let oldProductId = idArrayOld[0];
        let oldCategoryIdArray = idArrayOld[1].split('-');
        let oldAddonIdArray = idArrayOld[2].split('-');
        
        // if the product name not matching no need to continue further and move to next
        if (newProductId !== oldProductId) {
            continue;

        // if the id's length not match no need to continue further nd move to next
        } else if (newCategoryIdArray.length !== oldCategoryIdArray.length || newAddonIdArray.length !== oldAddonIdArray.length) {
            continue;

        // if the item has only product key check the match
        // if matching then match item found |  if it is not matching move to next
        } else if (!(newAddonIdArray.length > 0 || newCategoryIdArray.length > 0)) {
            if (newProductId === idArrayOld[0]) {
                isMatch = true;
                matchedItem = item;
                break;
            } else {
                continue;
            }
        } else {
            // match for remaining id's
            // if matching then match item found |  if it is not matching move to next
            let isMatchedCategory = compareTwoArrays(newCategoryIdArray, oldCategoryIdArray);
            let isMatchedAddons = compareTwoArrays(newAddonIdArray, oldAddonIdArray);
            
            if (isMatchedCategory && isMatchedAddons) {
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