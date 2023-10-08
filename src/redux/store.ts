import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import filter from "./filter/filterSlice";
import cart from "./cart/cartSlice";
import pizza from "./pizza/pizzaSlice";

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
});

export type RootState = ReturnType<typeof store.getState>; // global state that include filter,cart,pizza(getState reterun all state, all redux)
// returntype - содержимое функции превращает в тип

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
