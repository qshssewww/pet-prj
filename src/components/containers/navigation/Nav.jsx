import React, {useState} from 'react';
import './Nav.css'

export const weekday = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']

const Nav = () => {

    let dateNow = new Date(Date.now())
    //так как отсчет (о котором я говрил в фале Main.jsx) введется с воскресенья, мы вычитаем 1
    const [activeIndex, setActiveIndex] = useState(dateNow.getDay())
    window.sessionStorage.setItem('weekday', activeIndex)

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
