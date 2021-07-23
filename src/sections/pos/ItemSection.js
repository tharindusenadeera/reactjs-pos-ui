import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectCustom } from "../../components/select";
import styled from "styled-components";
import Theme from "../../utils/Theme";
import { ContentModal } from "../../components/modal/ContentModal";
import { ItemView } from "../orders/ItemView";
import { addItem, updateItem } from "../../actions/selectedItems";
import { GenerateUniqueId, CheckforMatch, GetItemFromId} from "../../utils/generateUniqueId";
import { categoryList } from "../../api/category";

import { productsList } from "../../api/products";

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
  const [selectedItems, setSelectedItems] = useState(0);
  const [categories, setCategories] = useState([]);

  const [selectedProperties, setSelectedProperties] = useState({});
  const [disableOk, setDisableOk] = useState(true);

  const alreadyAddedItems = useSelector((state) => state.selectedItems);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllProducts();
    categoryList().then((res) => {
      handleCategories(res.data.data);
    });
  }, []);

  const isRealValue = (obj) => {
    return obj && obj !== 'null' && obj !== 'undefined' && obj !== '';
  }

  useEffect(() => {
    let isItemSelected = selectedProperties?.categories?.filter((category) => isRealValue(category.item));

    if (
      isItemSelected &&
      isItemSelected?.length &&
      selectedProperties?.quantity &&
      selectedProperties?.quantity !== 0
    ) {
      setDisableOk(false);
    }
  }, [selectedProperties]);

  const handleProducts = (data) => {
    let itemArr = [];

    data.forEach((element) => {
      let obj = {
        productKey: element.id,
        category: element.menu_category,
        name: element.name,
        image: element.image,
        price: element.price,
        qty: element.qty,
        branch_id: element.branch_id,
        status: element.status,
        created_at: element.created_at,
        updated_at: element.updated_at,
      };
      itemArr.push(obj);
    });
    setProducts(itemArr);
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
      obj.id = value;
    } else {
      obj.item = value;
    }
    productsList(obj).then((res) => {
      handleProducts(res.data.data);
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
    // disounted value and total value should update with services
    return { ...item, subtotal: item?.price * item?.quantity, key: itemKey };
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

  const selectItem = (item) => {
    setSelectedProperties(item);
  }

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
        value: element.category_name,
        status: element.status,
        created_at: element.created_at,
        updated_at: element.updated_at,
      };
      newArr.push(obj);
    });
    newArr.unshift(allSampleObj);
    setCategories(newArr);
  };

  const handleSearch = (value) => {
    let strLength = value.length;

    if (strLength % 3 === 0) {
      getFilteredProducts("item", value);
    } else {
      return;
    }
  };

  return (
    <Fragment>
      <Head>
        <div className="row">
          <div className="col-6">
            <SelectCustom
              showSearch={true}
              placeholder="Choose an item"
              options={categories && categories}
              onChange={handleItemsSelect}
            />
          </div>
          <div className="col-6">
            <SelectCustom
              showSearch={true}
              placeholder="Type item to search"
              onSearch={handleSearch}
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
                      <ProductImg src={item.image} alt="product image" />
                      <span className="prod-title">{item.name}</span>
                      <span className="prod-price">$ {item.price}</span>
                    </ProductCard>
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
