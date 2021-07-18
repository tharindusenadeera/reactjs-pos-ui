import React from 'react';

const generateUniqueKey = (item) => {
    // this key is generated unising product, taste and the size
    return `${item.productKey}${item.tasteKey}${item.sizeKey}`;
}

export default generateUniqueKey;
