import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectCustom } from "../../components/select";
import styled from "styled-components";
import Theme from "../../utils/Theme";
import { ContentModal } from "../../components/modal/ContentModal";
import { ItemView } from "../orders/ItemView";
import { addItem, updateItem } from "../../actions/selectedItems";
import {
  GenerateUniqueId,
  CheckforMatch,
  GetItemFromId,
} from "../../utils/generateUniqueId";
import { categoryList } from "../../api/category";

import { SAVE_PRODUCT } from "../../constants/ActionTypes";
import { productsList } from "../../api/products";
import { SelectNInputField } from "../../components/field/SelectNInputField";
import { InputField } from "../../components/field/InputField";

const Head = styled.div`
  padding: 1.25rem;
`;

const Body = styled.div`
  overflow: scroll;
  overflow-x: hidden;
  padding: 1.25rem;

  @media ${Theme.device.xs} {
    max-height: calc(100vh - 232px) !important;
  }
  @media ${Theme.device.sm} {
    max-height: calc(100vh - 248px) !important;
  }
  @media ${Theme.device.md} {
    max-height: calc(100vh - 630px) !important;
  }
  @media ${Theme.device.lg} {
    max-height: calc(100vh - 180px) !important;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${Theme.colors.$greyd3d7dc};
    //outline: 1px solid ${Theme.colors.$greye9ecef};
  }

  .ant-btn {
    margin-bottom: 25px;
    border-radius: 0.3rem;
  }
`;

const ProductCard = styled.div`
  display: block;
  .prod-title {
    font-size: 0.875rem;
    margin-top: 10px;
    display: block;
    color: ${Theme.colors.$black};
    transition: color ease-in-out 0.3s;
    white-space: break-spaces;
  }
  .prod-price {
    font-size: 0.813rem;
    font-weight: 500;
    color: ${Theme.colors.$green};
  }

  &:hover,
  :focus {
    .prod-title {
      color: ${Theme.colors.$primaryHover};
    }
  }
`;

const ProductImg = styled.img`
  width: 100%;
  height: 6.875rem;
  object-fit: cover;
  object-position: center;
  border-radius: 0.3rem;
`;

export const ItemSection = () => {
  const [products, setProducts] = useState([]);
  const productsFromStore = useSelector((state) => state.products);
  const orderMetaData = useSelector((state) => state.selectedItems.metaData);

  const [selectedItems, setSelectedItems] = useState(0);
  const [categories, setCategories] = useState([]);

  const [selectedProperties, setSelectedProperties] = useState({});
  const [disableOk, setDisableOk] = useState(true);
  const [quantityError, setQuantityError] = useState({});
  const [search, setSearch] = useState('');

  const alreadyAddedItems = useSelector(
    (state) => state.selectedItems.productList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setSearch('');
    setProducts(productsFromStore);
  },[productsFromStore])

  useEffect(() => {
    getAllProducts();
    categoryList().then((res) => {
      handleCategories(res.data.data);
    });
  }, []);

  const isRealValue = (obj) => {
    return obj && obj !== "null" && obj !== "undefined" && obj !== "";
  };

  useEffect(() => {
    let isCategoryAvailable =
      selectedProperties?.menu_option_categories?.length > 0;
    let items = selectedProperties?.categories?.filter((category) =>
      isRealValue(category.item)
    );
    let isItemSelected = (items && items?.length) || !isCategoryAvailable;

    if (
      isItemSelected &&
      selectedProperties?.quantity &&
      selectedProperties?.quantity !== 0 &&
      (!quantityError.status || quantityError.status === 0)
    ) {
      setDisableOk(false);
    }
  }, [selectedProperties]);

  const handleProducts = (data, isFilteredProduct) => {
    let itemArr = [];
    data &&
      data.forEach((element) => {
        let obj = {
          productKey: element.id,
          category: element.menu_category,
          name: element.name,
          image: element.main_image,
          price: element.price,
          qty: element.qty,
          branch_id: element.branch_id,
          status: element.status,
          created_at: element.created_at,
          updated_at: element.updated_at,
          menu_item_addons: element.active_menu_item_addons.map((addon) => {
            return {
              ...addon,
              label: addon.name + " ( $" + addon.pivot.amount + " )",
              value: addon.name,
            };
          }),
          // menu_item_addons: addons,
          menu_option_categories: element?.menu_option_categories?.map(
            (category) => {
              return {
                ...category,
                value: category.name,
                key: category.id,
                menu_item_options: category?.menu_item_options?.map((item) => {
                  return {
                    ...item,
                    value: item.name,
                    key: item.id,
                  };
                }),
              };
            }
          ),
        };
        itemArr.push(obj);
      });

    // setProducts(itemArr);
    if (!isFilteredProduct) {
      dispatch({ type: SAVE_PRODUCT, payload: itemArr });
    } else {
      setProducts(itemArr);
    }
  };

  const handleItemsSelect = (value) => {
    if (value === 0) {
      getAllProducts();
    } else {
      getFilteredProducts("id", value);
    }
    setSelectedItems(value);
  };

  const getAllProducts = () => {
    productsList().then((res) => {
      handleProducts(res.data.data);
    });
  };

  const getFilteredProducts = (type, value) => {
    let obj = {};
    if (type === "id") {
      obj.cat_id = value;
    } else {
      obj.item = value;
    }
    productsList(obj).then((res) => {
      // passing tag for to identify filered products
      handleProducts(res.data.data, true);
    });
  };

  /**
   * * This function will do the price calculation update with the quantity
   * todo: maybe this function need to handle separately after services
   * @param { Selected or new Item} item
   * @param { key} itemKey
   * @returns
   */

  const handlePriceCalculation = (item, itemKey) => {
    const addonCost = item.addonCost ? item.addonCost : 0;
    // disounted value and total value should update with services
    return {
      ...item,
      subtotal: (parseFloat(item?.price) + addonCost) * item?.quantity,
      key: itemKey,
    };
  };

  /**
   * * Simply Tring add a food item to table
   * * If the new food item and other properties same with existing item then that item will udpate
   */

  const clickOk = () => {
    const itemKey = GenerateUniqueId(selectedProperties);
    const newItem = handlePriceCalculation(selectedProperties, itemKey);
    const existingItem = CheckforMatch(itemKey, alreadyAddedItems);

    if (existingItem) {
      const item = GetItemFromId(itemKey, alreadyAddedItems);

      const updatedItem = handlePriceCalculation(
        { ...item, quantity: newItem.quantity + item.quantity },
        itemKey
      );
      dispatch(updateItem(updatedItem));
    } else {
      dispatch(addItem(newItem));
    }

    setSelectedProperties({});
    setDisableOk(true);
  };

  /**
   * * Modal click cancel event handling
   */

  const clickCancel = () => {
    setSelectedProperties({});
    setDisableOk(true);
  };

  /**
   * * Update function which triggered from the ItemSection and save the state in here
   * @param { Item with user update } updatedItem
   */

  const updateSelectedproperties = (updatedItem) => {
    setSelectedProperties(updatedItem);
    setDisableOk(true);
  };

  /**
   * * adding value property for dropdown
   * @param { use clicked item from Production section} item
   */
  const selectItem = (item) => {
    const array = [];
    item.menu_option_categories.forEach((option) => {
      array.push({
        id: option?.id,
        key: option?.key,
        categoryName: option?.name,
        value: option?.name,
        item: "",
      });
    });

    setSelectedProperties({ ...item, categories: array, selectAddons: [] });
    setQuantityError({});
  };

  const handleCategories = (data) => {
    let newArr = [];
    let allSampleObj = {
      key: 0,
      value: "All",
      status: "",
      created_at: "",
      updated_at: "",
    };
    data.forEach((element) => {
      let obj = {
        key: element.id,
        value: element.name,
        status: element.status,
        created_at: element.created_at,
        updated_at: element.updated_at,
      };
      newArr.push(obj);
    });
    newArr.unshift(allSampleObj);
    setCategories(newArr);
  };

  const handleSearch = (e) => {
    let value = e.target.value;
    let strLength = value.length;

    setSearch(value);
    if (strLength % 3 === 0) {
      getFilteredProducts("item", value);
    } else {
      return;
    }
  };

  const qunatityErrorHandle = (data) => {
    setQuantityError(data);
  };

  return (
    <Fragment>
      <Head>
        <div className="row">
          <div className="col-6">
            <SelectCustom
              showSearch={false}
              placeholder="Choose an item"
              options={categories && categories}
              onChange={handleItemsSelect}
            />
          </div>
          <div className="col-6">
            <InputField
              placeholder="Type item to search"
              onChange={handleSearch}
              value={search}
            />
          </div>
        </div>
      </Head>

      <Body>
        <div className="row">
          {products.map((item, key) => {
            return (
              <div
                key={key}
                className="col-xl-4 col-lg-2 col-md-3 col-sm-4 col-6"
              >
                <ContentModal
                  btnContent={
                    <ProductCard>
                      <ProductImg
                        src={process.env.REACT_APP_IMAGE_URL + item.image}
                        alt="product image"
                      />
                      <span className="prod-title">{item.name}</span>
                      <span className="prod-price">$ {item.price}</span>
                    </ProductCard>
                  }
                  btnDisabled={
                    orderMetaData && orderMetaData.payment_status === "success"
                  }
                  btnClass="green"
                  okText="Add to order"
                  className="body-nonpadding"
                  disableOk={disableOk}
                  clickOk={clickOk}
                  clickCancel={clickCancel}
                  record={item}
                  selectItem={selectItem}
                >
                  <ItemView
                    selectedProperties={selectedProperties}
                    updateSelectedproperties={updateSelectedproperties}
                    alreadyAddedItems={alreadyAddedItems}
                    qunatityErrorHandle={qunatityErrorHandle}
                    quantityError={quantityError}
                  />
                </ContentModal>
              </div>
            );
          })}
        </div>
      </Body>
    </Fragment>
  );
};
