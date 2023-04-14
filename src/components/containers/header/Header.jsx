import React from 'react';
import './Header.css'

const tabs = ['Выполнить', 'Выполнено', 'Корзина']
const quotes = [
    {text: '«Сделайте сегодняшний день незабываемым.»', author: 'Зиг Зиглар'},
    {text: '«Нет возможностей, пока вы их не создадите.»', author: 'Крис Гроссер'},
    {text: '«Цель тренировки — не только подтянуть тело, но и укрепить дух.»', author: 'Морихей Уэсиба'},
    {text: '«Если вы думаете, что образование дорогое, попробуйте жить в невежестве.»', author: 'Энди Макинтайр'},
    {text: '«Лучший способ предсказать будущее — создать его.»', author: 'Питер Друкер'},
    {text: '«Образование рождает уверенность, уверенность рождает надежду, а надежда рождает мир.»', author: 'Конфуций'},
    {text: '«Прогресс происходит за пределами вашей зоны комфорта.»', author: 'Михал Джоан Бобак'},
    {text: '«Цели никогда не должны быть простыми. Они должны быть неудобными, чтобы заставить вас работать.»', author: 'Майкл Фелпс'},
    {text: '«Чтение — это то же самое для ума, что и упражнение для тела.»', author: 'Брайан Трейси'},
]
const Header = ({activeIndex, setActiveIndex}) => {

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
    }
    const res = getRandomIntInclusive(0,8)
    return (
        <header className={'header'}>
            <div className={'header_main-block'}>
                <div className={'header_title-block'}>
                    <h1 className={'header_title'}>Простой список дел</h1>
                    <p className={'header_subtitle'}>Сегодня потрясающий день. Погода замечательная, вы тоже замечательны!</p>
                </div>
                <div className={'header_quote-block'}>
                    <p className={'header_quote'}>{quotes[res].text}</p>
                    <p className={'header_author'}>{quotes[res].author}</p>
                </div>
            </div>
            <div className={'header_page-btns'}>
                {
                    //расскрываем массив tabs
                    tabs.map((tab, i) => (
                        <button onClick={() => setActiveIndex(i)} className={activeIndex === i ? 'btn header_btn active' : 'btn header_btn'} key={i}>{tab}</button>
                    ))
                }
            </div>
        </header>
    );
};
export default Header;
