import React, {useState} from 'react';
import './Nav.css'

const weekday = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']

const Nav = () => {

    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <div className={'nav'}>
            <h2 className={'nav_title'}>Выполнить</h2>
            <nav className={'nav_main-block'}>
                {
                    //расскрываем массив weekday
                    weekday.map((day, i) => (
                        <button onClick={() => setActiveIndex(i)} key={i} className={activeIndex === i ? 'btn nav_btn active' : 'btn nav_btn'}>{day}</button>
                    ))
                }
            </nav>
        </div>
    );
};

export default Nav;