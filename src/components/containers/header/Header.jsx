import React, {useState} from 'react';
import './Header.css'

const tabs = ['Выполнить', 'Выполнено', 'Корзина']

const Header = () => {

    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <header className={'header'}>
            <div className={'header_main-block'}>
                <div className={'header_title-block'}>
                    <h1 className={'header_title'}>Простой список дел</h1>
                    <p className={'header_subtitle'}>Сегодня потрясающий день. Погода замечательная, вы тоже замечательные!</p>
                </div>
                <div className={'header_quote-block'}>
                    <p className={'header_quote'}>«Вы не можете изменить обстоятельства или время года, но можете изменить себя»</p>
                    <p className={'header_author'}>Джим Рон</p>
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
