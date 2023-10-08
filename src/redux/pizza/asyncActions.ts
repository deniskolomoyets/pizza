import axios from "axios";
import { Pizza, SearchPizzaParams } from "./type";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://64aaeb3e0c6d844abedefbc9.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
); //pizza/fetchPizzasStatus - pizza- name our slice, fetchPizzasStatus-name our action
