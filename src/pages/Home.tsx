import React from "react";

import {
  Skeleton,
  Categories,
  PizzaBlock,
  Sort,
  Pagination,
} from "../components";
import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/filter/selectors";
import { selectPizzaData } from "../redux/pizza/selectors";
import { setCategoryId, setCurrentPage } from "../redux/filter/filterSlice";
import { fetchPizzas } from "../redux/pizza/asyncActions";
import { useSelector } from "react-redux";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter); // вытаскиваю свой стейт с помощью этого хука описываю всё что нужно через . мне вытищить
  const { items, status } = useSelector(selectPizzaData); //фун-ия создана в pizzaSlice показывает что меняется в фильтрации

  const onChangeCategory = React.useCallback(
    (idx: number) => {
      dispatch(setCategoryId(idx));
    },
    [dispatch]
  ); //create on the first render as useEffect and don't re-create anymore keep it in memory and when I say give onChangeCategory give me the power for the very first render

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace("-", ""); //replace("-") из св-ства удали - если будет
    const order = sort.sortProperty.includes("-") ? "asc" : "desc"; // проверка на если есть - то делай сортировку по возрастанию иначе по убыванию
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      })
    );
    window.scrollTo(0, 0);
  };

  //if was first render, request pizzas
  React.useEffect(() => {
    //если сейчас нет поиска то делаю  fetchPizzas() запрос
    getPizzas();
  }, [categoryId, sort.sortProperty, currentPage, searchValue]); //массив зависимости следит если изменения иди в бэкенд и делается запрос на получение новых пицц

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>
            Error <span>😕</span>
          </h2>
          <p>Failed to get pizzas</p>{" "}
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
export default Home;
