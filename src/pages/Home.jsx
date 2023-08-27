import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../Pagination';
import { SearchContext } from '../App';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMounted = React.useRef(false);

  const { items, status } = useSelector((state) => state.pizza);

  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const currentPage = useSelector((state) => state.filter.currentPage);

  const { searchValue } = React.useContext(SearchContext); //контекст из апп.джсх

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'decs';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    // await axios
    //   .get(
    //     `https://-64aaeb3e0c6d844abedefbc9.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    //   )
    //   .then((res) => {
    //     setItems(res.data); //answer from backend is stored in date
    //     setIsLoading(false);
    //   }).catch((err) => {
    //     setIsLoading(false);
    //   })

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      }),
    );
    window.scrollTo(0, 0);
  };

  // if changed parameters and was first render
  //если первого рендера не было, не надо вшивать в адресную строчку параметры (больше как лайфхак)
  React.useEffect(() => {
    if (isMounted.current) {
      //если был 1 рендер  если это будет true то делай нижнюю информацию
      const queryString = qs.stringify({
        // если пришли параметры превращаю их в одну строчку
        sortProperty: sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage, searchValue]);

  //if was first render, check url-parameters and save in redux
  React.useEffect(() => {
    if (window.location.search) {
      //если window.location.search есть то буду парсить из парпаметров и превращать в объект
      const params = qs.parse(window.location.search.substring(1)); //парсим и убираем вопросительный знак

      const sort = list.find((obj) => obj.sortProperty === params.sortProperty); // необходимо пробежаться по каждому сво-тву и найти в объекте sortProperty то что есть в params.sortProperty

      dispatch(
        setFilters({
          ...params, //sortProperty(ссылка) передаеться как строчка, поэтому в const sort мы пробегаемся по листу и сравниваем, передавая при этом обьект
          sort,
        }),
      );
    }
  }, []);

  //if was first render, request pizzas
  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sortType, currentPage, searchValue ]);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            Error <span>😕</span>
          </h2>
          <p>
          Failed to get pizzas
          </p>{' '}
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
export default Home;
