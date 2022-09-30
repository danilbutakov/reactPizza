import React from 'react'
import axios from 'axios';

import Categories from '../components/Categories'
import PizzaBlock from '../components/PizzaBlock/Index'
import Sort from '../components/Sort/Sort'
import { Skeleton } from '../components/PizzaBlock/Skeleton'
import AppContext from '../context';
import Pagination from '../components/Pagination/Index';

const Home = () => {

    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [categoryID, setCategoryID] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [sortType, setSortType] = React.useState({
        name: 'популярности',
        sortProperty: 'rating'
    });

    const { searchValue } = React.useContext(AppContext);

    React.useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);

                const sortBy = sortType.sortProperty.replace('-', '');
                const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
                const category = categoryID > 0 ? `category=${categoryID}` : '';
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
    }, [categoryID, sortType, searchValue, currentPage]);

    const pizzas = items.map((obj) => (
        <PizzaBlock
            key={obj.id}
            {...obj}
        />));

    const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className='container'>
            <div className="content__top">
                <Categories value={categoryID} onChangeCategory={(i) => setCategoryID(i)} />
                <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
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