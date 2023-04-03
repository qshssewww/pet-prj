import React, {useEffect, useState} from 'react';
import './Main.css'
import {TimePicker} from "antd";
import {weekday} from "../navigation/Nav";

const Main = () => {

    const [isTaskWindowOpen, setIsTaskWindowOpen] = useState(false)
    const [tasks, setTasks] = useState([])
    const [isWeekdayArrOpen, setIsWeekdayArrOpen] = useState(false)
    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const [textTask, setTextTask] = useState('')
    const [dayTask, setDayTask] = useState('')

    //метод getDay() возвращзает число от 0 до 6. 0 - Воскресенье, 1 - Понедельник, 2 - Вторник и так далее
    useEffect(() => {
        let dateNow = new Date(Date.now())//нынешнее время, дата, год
        if (dateNow.getDay() === 0){
            setDayTask('Воскресенье')
        } else if (dateNow.getDay() === 1){
            setDayTask('Понедельник')
        } else if (dateNow.getDay() === 2){
            setDayTask('Вторник')
        } else if (dateNow.getDay() === 3){
            setDayTask('Среда')
        } else if (dateNow.getDay() === 4){
            setDayTask('Четверг')
        } else if (dateNow.getDay() === 5){
            setDayTask('Пятница')
        } else if (dateNow.getDay() === 6){
            setDayTask('Суббота')
        }
    }, [])


    const format = 'HH:mm';

    const addStartTime = (value, dateString) => {
        console.log('Time Start', dateString);
        setTimeStart(dateString);
    }

    const addEndTime = (value, dateString) => {
        console.log('Time End', dateString);
        setTimeEnd(dateString);
    }

    const addTask = () => {
        setTasks([...tasks, {
            startTime: timeStart,
            endTime: timeEnd,
            taskText: textTask,
            tasksDay: dayTask,
            isDone: false,
            inBasket: false
        }])
    }
    useEffect(() =>{
        console.log(tasks)
    }, [tasks])


    return (
        <div className={'main'}>
            <div className={'main_tasks'}>
                {
                    tasks.filter(obj => obj.tasksDay === 'Понедельник').map((task, i) => (
                        <div className={'main_task'} key={i}>
                            <input className={'main_input'} type={"checkbox"}/>
                            <label className={'main_task-text'}>{task.taskText} ({task.startTime}-{task.endTime})</label>
                        </div>
                    ))
                }
            </div>
            <div className={'main_add-task'}>
                <div style={isTaskWindowOpen ? {} : {display: "none"}} className={'main_task-window'}>
                    <h4 className={'main_window-title'}>Добавить новую задачу</h4>
                    <textarea value={textTask} onChange={e => setTextTask(e.target.value)} placeholder={'Введите текст...'} className={'main_textarea'}></textarea>
                    <div className={'main_time-task'}>
                        <div className={'main_start-task main_time'}>
                            <p className={'main_p'}>Начало</p>
                            <TimePicker onChange={addStartTime} format={format}/>
                        </div>
                        <div className={'main_end-task main_time'}>
                            <p className={'main_p'}>Конец</p>
                            <TimePicker onChange={addEndTime} format={format}/>
                        </div>
                        <div className={'main_weekday-task main_time'}>
                            <p className={'main_p'}>День недели</p>
                            <div onClick={() => setIsWeekdayArrOpen(!isWeekdayArrOpen)} className={'main_slider-block'}>
                                <p className={'main_slider-p main_p'}>{dayTask !== '' ? dayTask : 'Понедельник'}</p>
                                <img className={isWeekdayArrOpen ? 'main_arrow-down open' : 'main_arrow-down close'} src="/slider.svg" alt="123"/>
                            </div>
                            <div style={isWeekdayArrOpen ? {} : {display: "none"}} className={'main_weekday-arr'}>
                                {
                                    weekday.map((day, i) => (
                                        <p onClick={() => setDayTask(day)} key={i} className={'main_weekday-p'}>{day}</p>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <button onClick={addTask} style={isWeekdayArrOpen ? {} : {marginTop: 20}} className={'btn main_add-btn'}>Добавить</button>
                </div>
                <div onClick={() => setIsTaskWindowOpen(!isTaskWindowOpen)} className={'main_plus-task'}>
                    <img src="/plus.svg" alt="img"/>
                </div>
            </div>
        </div>
    );
};

export default Main;