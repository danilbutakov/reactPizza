import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { fetchPizzas } from '../redux/slices/pizzasSlice';
import {
	setCategoryId,
	setCurrentPage,
	setFilters,
} from '../redux/slices/filterSlice';
import { sortList } from '../components/Sort/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock/Index';
import Sort from '../components/Sort/Sort';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import AppContext from '../context';
import Pagination from '../components/Pagination/Index';

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);
	const { items, status } = useSelector((state) => state.pizza);
	const { categoryId, sort, currentPage } = useSelector(
		(state) => state.filter,
	);

	const { searchValue } = React.useContext(AppContext);

	const onChangeCategory = React.useCallback((idx) => {
		dispatch(setCategoryId(idx));
	}, []);

	const onChangePage = (page) => {
		dispatch(setCurrentPage(page));
	};

	const getPizzas = async () => {
		const sortBy = sort.sortProperty.replace('-', '');
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `search=${searchValue}` : '';
		dispatch(
			fetchPizzas({
				sortBy,
				order,
				category,
				search,
				currentPage,
			}),
		);
	};

	// Если изменили параметры и был первый рендер
	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});

			navigate(`?${queryString}`);
		}
		isMounted.current = true;
	}, [categoryId, sort.sortProperty, currentPage]);

	// Если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе
	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));

			const sort = sortList.find(
				(obj) => obj.sortProperty === params.sortProperty,
			);

			dispatch(
				setFilters({
					...params,
					sort,
				}),
			);
			isSearch.current = true;
		}
	}, []);

	// Если был первый рендер, то запрашиваем пиццы
	React.useEffect(() => {
		window.scrollTo(0, 0);

		if (!isSearch.current) {
			getPizzas();
		}

		isSearch.current = false;
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);

	const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

	const skeleton = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	));

	return (
		<div className='container'>
			{status === 'error' ? (
				<div className='content__error-info'>
					<h2>Произошла ошибка 😕</h2>
					<p>
						К сожалению не удалось получить пиццы ;( <br />{' '}
						Попробуйте повторить попытку позже
					</p>
				</div>
			) : (
				<div>
					<div className='content__top'>
						<Categories
							value={categoryId}
							onChangeCategory={onChangeCategory}
						/>
						<Sort />
					</div>
					<h2 className='content__title'>Все пиццы</h2>

					<div className='content__items'>
						{status === 'loading' ? skeleton : pizzas}
					</div>

					<Pagination
						currentPage={currentPage}
						onChangePage={onChangePage}
					/>
				</div>
			)}
		</div>
	);
};

export default Home;
