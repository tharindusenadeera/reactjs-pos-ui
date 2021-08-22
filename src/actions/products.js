import { SAVE_PRODUCT } from '../constants/ActionTypes';
import * as api from '../api/products';

export const getProducts = () => async (dispatch) => {
    try {
        const {res} = await api.productsList();

        if (res?.status === "success") {
            let itemArr = [];

            res?.data.forEach((element) => {
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
                  menu_item_addons: element.active_menu_item_addons.map((addon)=>{
                    return {
                      ...addon,
                      label : addon.name+" ( $"+ addon.pivot.amount+" )",
                      value: addon.name
                    }
                  }),
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

            dispatch({type : SAVE_PRODUCT, payload : itemArr});
        }
    } catch (error) {
        console.log(error);
    }
}
