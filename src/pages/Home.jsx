import React from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId } from '../redux/slices/filterSlice';
import Categories from '../components/Categories'
import PizzaBlock from '../components/PizzaBlock/Index'
import Sort from '../components/Sort/Sort'
import { Skeleton } from '../components/PizzaBlock/Skeleton'
import AppContext from '../context';
import Pagination from '../components/Pagination/Index';

const Home = () => {

    const dispatch = useDispatch();
    const { categoryId, sort } = useSelector((state) => state.filter);

    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState(1);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    }

    const { searchValue } = React.useContext(AppContext);

    React.useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);

                const sortBy = sort.sortProperty.replace('-', '');
                const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
                const category = categoryId > 0 ? `category=${categoryId}` : '';
                const search = searchValue ? `&search=${searchValue}` : '';

                const itemsResponse = await axios.get(`https://63343f9f433198e79dd3b5ea.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);

                setIsLoading(false);
                setItems(itemsResponse.data);
            } catch (error) {
                alert('Ошибка при запросе данных ;(');
                console.error(error);
            }
        }
        fetchData();
        window.scrollTo(0, 0);
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    const pizzas = items.map((obj) => (
        <PizzaBlock
            key={obj.id}
            {...obj}
        />));

    const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className='container'>
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading ? skeleton : pizzas
                }
            </div>
            <Pagination onChangePage={(number) => setCurrentPage(number)} />
        </div>
    )
}

export default Home;