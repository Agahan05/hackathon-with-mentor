import React, { useReducer, useState } from "react";
import { watchesApi } from "../helpers/const";

export const ClientContext = React.createContext();

const reducer = (state, action) => {
  if (action.type === "GET_WATCHES") {
    return {
      ...state,
      watches: action.payload,
    };
  }
  return state;
};

function ClientProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    watches: [],
  });
  const [searchWord, setSearchWord] = useState("");
  const [filterByPrice, setfilterByPrice] = useState([0, 9999]);
  const limit = 3;
  const [pagesCount, setPagesCount] = useState(1);
  const [currentPages, setCurrentPage] = useState(1);
  // ! Math.ceil(1.2) 2
  // ! Math.floor(1.2) 1
  // ! Math.round(1.2, 1,6) 1, 2

  const getWatches = () => {
    fetch(
      `${watchesApi}?q=${searchWord}&price_gte=${filterByPrice[0]}&price_lte${filterByPrice[1]}&_limit=${limit}&_page=${currentPages}`
    )
      .then((res) => {
        let count = Math.ceil(res.headers.get("X-Total-Count") / limit);
        setPagesCount(count);
        return res.json();
      })
      .then((data) => {
        let action = {
          type: "GET_WATCHES",
          payload: data,
        };
        dispatch(action);
      });
  };

  const addWatchToBasket = (watch) => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (!basket) {
      basket = {
        totalPrice: 0,
        products: [],
      };
    }
    let watchToBasket = {
      ...watch,
      count: 1,
      subPrice: watch.price,
    };
    basket.products.push(watchToBasket);
    basket.totalPrice = basket.products.reduce((prev, item) => {
      return prev + item.subPrice;
    }, 0);
    console.log(basket);
  };

  const data = {
    watches: state.watches,
    searchWord,
    filterByPrice,
    pagesCount,
    currentPages,
    getWatches,
    setSearchWord,
    setfilterByPrice,
    setCurrentPage,
    addWatchToBasket,
  };

  return (
    <ClientContext.Provider value={data}>{children}</ClientContext.Provider>
  );
}

export default ClientProvider;
