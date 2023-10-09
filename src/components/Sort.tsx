import React from "react";
import { useDispatch } from "react-redux";
import { Sort as SortType, SortPropertyEnum } from "../redux/filter/types";
import { setSort } from "../redux/filter/filterSlice";

type ListItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

// type PopUpClick = MouseEvent & { path: Node[] };

type SortPopUpProps = {
  value: SortType;
};

export const list: ListItem[] = [
  { name: "популярности (DESC)", sortProperty: SortPropertyEnum.RATING_DESC },
  { name: "популярности (ASC)", sortProperty: SortPropertyEnum.RATING_ASC },

  { name: "цене (DESC)", sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: "цене (ASC)", sortProperty: SortPropertyEnum.PRICE_ASC },

  { name: "алфавиту (DESC)", sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: "алфавиту (ASC)", sortProperty: SortPropertyEnum.TITLE_ASC },
];

export const Sort: React.FC<SortPopUpProps> = React.memo(({ value }) => {
  const dispatch = useDispatch();
  // const sort = useSelector(selectSort); //смотрит за изменениями, если они будут то будет перерендер
  const sortRef = React.useRef<HTMLDivElement>(null); //ссылка на дом-элемент; передает по умолчанию нул или дивэлемент

  const [open, setOpen] = React.useState(false);

  const onClickListItem = (obj: ListItem) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside); //добавляет обработчик событий при клике на бади. старые при этом не удаляются, для того чтобы такого не было делаем анмаунт.

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
    //ретерн - это анмаунт. удаляем обработчик событий из бади, и указываем какой обработчик.  вызывается когда мы уходим из страницы(в нашем случае бади)(если компонент уд-ся со стр то удаляю обработчик события с body на клик, т,е было размонтирование и вызови эту фу-ию)
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{value.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(obj)}
                className={
                  value.sortProperty === obj.sortProperty ? "active" : ""
                }
              >
                {obj.name}
                {/* наш list */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
