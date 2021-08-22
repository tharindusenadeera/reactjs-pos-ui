import React, { useEffect, useState } from "react";
import { SelectField } from "../../components/field/SelectField";
import { InputNumberField } from "../../components/field/InputNumberField";
import { TagCustom } from "../../components/tag";
import styled from "styled-components";
import Theme from "../../utils/Theme";
import { CheckboxGroupField } from "../../components/field/CheckboxGroupField";

import { Typography } from "antd";

const ItemDetail = styled.div`
  @media ${Theme.device.sm} {
    display: flex;
  }
`;

const Image = styled.div`
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media ${Theme.device.xs} {
    width: 100%;
    height: 25vh;
  }
  @media ${Theme.device.sm} {
    width: 375px;
    margin-right: 30px;
  }
`;

const ItemForm = styled.div`
  width: 100%;
  padding: 20px;

  h3 {
    margin-bottom: 35px;
  }
`;

const TagRow = styled.div`
  margin-left: 5px;
  margin-bottom: 10px;
`;

export const ItemView = ({
  selectedProperties,
  updateSelectedproperties,
  alreadyAddedItems,
  qunatityErrorHandle,
  quantityError,
}) => {
  const setQuantityStatus = (currentQuantity) => {
    // get the other orders of from selected product list which is not itself (importance when edit happen from table)
    const prevAddedItems = alreadyAddedItems?.filter(
      (item) =>
        item.productKey === selectedProperties.productKey &&
        item.key !== selectedProperties.key
    );
    let prevAddedQuantity = 0;

    prevAddedItems.forEach((item) => {
      prevAddedQuantity += item.quantity;
    });

    let isCurrentQuantityAvailable =
      prevAddedQuantity + currentQuantity <= selectedProperties?.qty;

    if (isCurrentQuantityAvailable) {
      qunatityErrorHandle({ status: 0, message: "" });
    } else {
      qunatityErrorHandle({
        status: 1,
        message: `Only ${
          selectedProperties?.qty - prevAddedQuantity
        } items available !`,
      });
    }
  };

  const onClickPlus = () => {
    const newQty = selectedProperties?.quantity
      ? selectedProperties?.quantity + 1
      : 1;

    updateSelectedproperties({ ...selectedProperties, quantity: newQty });
    setQuantityStatus(newQty);
  };

  const onClickMinus = () => {
    const newQty =
      !selectedProperties ||
      !selectedProperties?.quantity ||
      selectedProperties?.quantity === 0
        ? 0
        : selectedProperties?.quantity - 1;

    updateSelectedproperties({ ...selectedProperties, quantity: newQty });
    setQuantityStatus(newQty);
  };

  const onChangeQuantity = (quantity) => {
    if (!isNaN(quantity)) {
      updateSelectedproperties({
        ...selectedProperties,
        quantity: parseInt(quantity),
      });
    }
    setQuantityStatus(parseInt(quantity) || 0);
  };

  /**
   * * Selected item will be update in selectedProperties under the key 'item'
   * @param {* Id of the Category Items Dropdown} id
   */

  const onChangeCategoryItem = (key) => {
    let selectCategory = undefined;
    let selectOption = undefined;

    selectedProperties.menu_option_categories.forEach((category) => {
      category.menu_item_options.forEach((menuItemOption) => {
        if (menuItemOption.key === key) {
          selectCategory = category;
          selectOption = menuItemOption;
        }
      });
    });

    // create the new categories object and update with dispatch
    const categories = selectedProperties?.categories?.map((category) => {
      if (category.key === selectCategory.key) {
        return {
          ...category,
          item: selectOption,
          tag: `${category.categoryName} : ${selectOption.value}`,
          tagId: `${category.key}-${selectOption.key}`,
          itemName: selectOption.value,
        };
      } else {
        return category;
      }
    });

    updateSelectedproperties({ ...selectedProperties, categories: categories });
  };

  /**
   * * Simply delete the item from the selectedProperties.categories.item
   * @param {* id of the tag which is deleted} } tagId
   */

  const onCloseTag = (tagId) => {
    const categories = selectedProperties?.categories?.map((category) => {
      return {
        ...category,
        item: "",
      };
    });
    updateSelectedproperties({ ...selectedProperties, categories: categories });
  };

  const getCategoryItemLabel = (key) => {
    const category = selectedProperties?.menu_option_categories?.find(
      (category) => category.key === key
    );
    return category.value;
  };

  const getCategoryItemPlcaeHolder = (key) => {
    const category = selectedProperties?.menu_option_categories?.find(
      (category) => category.key === key
    );
    return `Choose a ${category.value}`;
  };

  const getCategoryItemOptions = (key) => {
    const category = selectedProperties?.menu_option_categories?.find(
      (category) => category.key === key
    );
    return category?.menu_item_options || {};
  };

  const handleAddonChange = (checkedValues) => {
    let addonCost = 0;
    
    checkedValues.forEach((addon) => {
      selectedProperties.menu_item_addons.forEach((item) => {
        if (addon === item.name) {
          addonCost += parseFloat(item.pivot.amount);
        }
      })
    })

    updateSelectedproperties({
      ...selectedProperties,
      selectAddons: checkedValues,
      addonCost: addonCost
    });
  };

  return (
    <ItemDetail>
      <Image
        style={{
          backgroundImage: `url(${
            selectedProperties.image &&
            process.env.REACT_APP_IMAGE_URL + selectedProperties.image
          })`,
        }}
      />
      {/* <img src={item && item.image} alt="Item" /> */}

      <ItemForm className="mt-3 mt-sm-0">
        <h3>{selectedProperties && selectedProperties.name}</h3>

        <div className="row">
          {selectedProperties?.categories?.map((category) => (
            <div className="col-6" key={category.key}>
              <SelectField
                label={getCategoryItemLabel(category.key)}
                key={category.key}
                placeholder={getCategoryItemPlcaeHolder(category.key)}
                options={getCategoryItemOptions(category.key)}
                onChange={onChangeCategoryItem}
                value={category.itemName || "Choose a Category"}
              />
            </div>
          ))}
        </div>

        <TagRow className="row">
          {selectedProperties?.categories?.map(
            (category) =>
              category.tag && (
                <TagCustom
                  tag={category.tag}
                  key={category.tagId}
                  value={category.tagId}
                  onClose={onCloseTag}
                />
              )
          )}
        </TagRow>

        {selectedProperties?.menu_item_addons.length > 0 && (
          <div className="row">
            <div className="col-12">
              <CheckboxGroupField
                onChange={handleAddonChange}
                label="Additions"
                options={selectedProperties?.menu_item_addons}
                // defaultValue={["Apple"]}
                value={selectedProperties?.selectAddons}
              />
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-6">
            <InputNumberField
              label="Quantity"
              defaultValue={0}
              value={
                selectedProperties?.quantity ? selectedProperties?.quantity : 0
              }
              onClickPlus={onClickPlus}
              onClickMinus={onClickMinus}
              onChange={onChangeQuantity}
            />
          </div>
        </div>

        {quantityError && quantityError?.status === 1 && (
          <Typography.Text type="danger" strong>
            {quantityError.message}
          </Typography.Text>
        )}
      </ItemForm>
    </ItemDetail>
  );
};
