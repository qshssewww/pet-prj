import React, {useState} from 'react';
import './Main.css'

const Main = () => {

    const [isTaskWindowOpen, setIsTaskWindowOpen] = useState(false)
    //const [tasks, setTasks] = useState([])

    return (
        <div className={'main'}>
            <div>
                <input type="checkbox"/>
                <input type="checkbox"/>
                <input type="checkbox"/>
                <input type="checkbox"/>
            </div>
            <div className={'main_add-task'}>
                <div style={isTaskWindowOpen ? {} : {display: "none"}} className={'main_task-window'}>
                    <h4 className={'main_window-title'}>Добавить новую задачу</h4>
                    <textarea placeholder={'Введите текст...'} className={'main_textarea'}></textarea>
                    <div className={'main_time-task'}>
                        <div className={'main_start-task main_time'}>
                            <p className={'main_p'}>Начало</p>
                            <input className={'main_input'} type="time"/>
                        </div>
                        <div className={'main_end-task main_time'}>
                            <p className={'main_p'}>Конец</p>
                            <input className={'main_input'} type="time"/>
                        </div>
                        <div className={'main_weekday-task main_time'}>
                            <p className={'main_p'}>День недели</p>
                            <input className={'main_input'} type="time"/>
                        </div>
                    </div>
                </div>
                <div onClick={() => setIsTaskWindowOpen(!isTaskWindowOpen)} className={'main_plus-task'}>
                    <img src="/plus.svg" alt="img"/>
                </div>
            </div>
        </div>
    );
};

export default Main;