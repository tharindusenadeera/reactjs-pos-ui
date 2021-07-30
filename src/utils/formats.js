import React from 'react';

export const convertToDecimal = (value, decimals) => {
    return (Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)).toFixed(2);
}

