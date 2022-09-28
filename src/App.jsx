import React from "react";
import axios from 'axios';

import Header from "./components/Header/Header";
import Categories from "./components/Categories/Categories";
import './scss/app.scss';
import Sort from "./components/Sort/Sort";
import PizzaBlock from "./components/PizzaBlock/PizzaBlock";


function App() {

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
    }, []);

    const renderItems = () => {
        const filtredItems = items.filter((item) =>
            item.title.toLowerCase(),
        );
        return (isLoading ? [...Array(3)] : filtredItems).map((item, index) => (
            <PizzaBlock
                key={index}
                isLoading={isLoading}
                {...item}
            />
        ));
    };

    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories />
                        <Sort />
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {renderItems()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
