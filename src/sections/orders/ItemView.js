import React, { useEffect } from "react";
import { SelectField } from "../../components/field/SelectField";
import { InputNumberField } from "../../components/field/InputNumberField";
import { TagCustom } from "../../components/tag";
import styled from "styled-components";
import Theme from "../../utils/Theme";

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
  margin-bottom: 5px;
`;

export const ItemView = ({ selectedProperties, updateSelectedproperties }) => {
  
  const onClickPlus = () => {
    const newQty = selectedProperties?.quantity
      ? selectedProperties?.quantity + 1
      : 1;
    updateSelectedproperties({ ...selectedProperties, quantity: newQty });
  };

  const onClickMinus = () => {
    const newQty =
      !selectedProperties ||
      !selectedProperties?.quantity ||
      selectedProperties?.quantity === 0
        ? 0
        : selectedProperties?.quantity - 1;
    updateSelectedproperties({ ...selectedProperties, quantity: newQty });
  };

  const onChangeQuantity = (quantity) => {
    if (!isNaN(quantity)) {
      updateSelectedproperties({
        ...selectedProperties,
        quantity: parseInt(quantity),
      });
    }
  };

  /**
   * * If a Category selected from dropdown then the displaying Item will remove and new One will show (with isShow property)
   * @param {* Id of the Category Dropdown} id
   */

  const onChangeCategory = (id) => {
    // categories which are not selected
    if (
      !selectedProperties.categories?.find((category) => category.id === id)
    ) {
      const array = selectedProperties?.categories
        ? selectedProperties?.categories
        : [];
      const selectedCategory = selectedProperties?.menu_option_categories?.find(
        (category) => category.id === id
      );
      // other categories hide
      array?.map((category) => (category.isShow = false));
      // new category show and push to the array
      array.push({
        id: id,
        key: id,
        categoryName: selectedCategory?.name,
        value: selectedCategory?.name,
        item: "",
        isShow: true,
      });

      updateSelectedproperties({ ...selectedProperties, categories: array });
    } else {
      // selected category showing and hiding others
      const categories = selectedProperties?.categories?.map((category) => ({
        ...category,
        isShow: category.key === id,
      }));
      updateSelectedproperties({
        ...selectedProperties,
        categories: categories,
      });
    }
  };

  /**
   * * Selected item will be update in selectedProperties under the key 'item'
   * @param {* Id of the Category Items Dropdown} id
   */

  const onChangeCategoryItem = (key) => {
    // Get the displaying category Item
    const categoryItemObject = selectedProperties.categories.find(
      (category) => category?.isShow
    );
    // Get the displaying category Item's details
    const selectedCategoryItemList = selectedProperties?.menu_option_categories.find(
      (category) => category.key === categoryItemObject.key
    );;
    // From that find the selecting item detail
    const selectedCategoryItem = selectedCategoryItemList?.menu_item_options.find(
      (item) => item.key === key
    );

    const categories = selectedProperties?.categories?.map((category) => {
      if (category.key === categoryItemObject.key) {
        return {
          ...category,
          item: selectedCategoryItem,
          tag: `${category.categoryName} : ${selectedCategoryItem.value}`,
          tagId: `${category.key}-${selectedCategoryItem.key}`,
          itemName: selectedCategoryItem.value,
        };
      } else {
        return category;
      }
    });

    updateSelectedproperties({ ...selectedProperties, categories: categories });
  };

  /**
   * * Simply delete the item from the selectedProperties.categories
   * @param {* id of the tag which is deleted} } tagId
   */

  const onCloseTag = (tagId) => {
    const categories = selectedProperties?.categories?.filter(
      (category) => category.tagId !== tagId
    );
    updateSelectedproperties({ ...selectedProperties, categories: categories });
  };

  const getCategoryItemLabel = (key) => {
    const category = selectedProperties?.menu_option_categories?.find((category) => category.key === key);
    return category.value;
  };

  const getCategoryItemPlcaeHolder = (key) => {
    const category = selectedProperties?.menu_option_categories?.find((category) => category.key === key);
    return `Choose a ${category.value}`;
  };

  const getCategoryItemOptions = (key) => {
    const category = selectedProperties?.menu_option_categories?.find((category) => category.key === key);
    return category?.menu_item_options || {};
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
          <div className="col-6">
            <SelectField
              label="Category Options"
              value="Choose a Category"
              options={selectedProperties.menu_option_categories}
              onChange={onChangeCategory}
            />
          </div>
          <div className="col-6">
            {selectedProperties?.categories?.map(
              (category) =>
                category.isShow && (
                  <SelectField
                    label={getCategoryItemLabel(category.key)}
                    key={category.key}
                    placeholder={getCategoryItemPlcaeHolder(category.key)}
                    options={getCategoryItemOptions(category.key)}
                    onChange={onChangeCategoryItem}
                    value={category.itemName || "Choose a Category"}
                  />
                )
            )}
          </div>
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
      </ItemForm>
    </ItemDetail>
  );
};
