import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    }, // -метод который получает стейт и действие(экшн).-то что передаем в метод, идет в экшн.пэйлоад
  },
});

export const { setCategoryId } = filterSlice.actions;

export default filterSlice.reducer;