import React from 'react'
import axios from 'axios';

import Categories from '../components/Categories'
import PizzaBlock from '../components/PizzaBlock/Index'
import Sort from '../components/Sort/Sort'
import { Skeleton } from '../components/PizzaBlock/Skeleton'

const Home = () => {

    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchData() {
            try {
                const [itemsResponse] = await Promise.all([
                    axios.get('https://63343f9f433198e79dd3b5ea.mockapi.io/items'),
                ]);

                setIsLoading(false);
                setItems(itemsResponse.data);
            } catch (error) {
                alert('Ошибка при запросе данных ;(');
                console.error(error);
            }
        }
        fetchData();
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='container'>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index} />) : items.map((obj) => (
                        <PizzaBlock
                            key={obj.id}
                            {...obj}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Home;