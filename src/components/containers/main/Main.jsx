import React, {useEffect, useState} from 'react';
import './Main.css'
import {TimePicker} from "antd";
import {weekday} from "../navigation/Nav";


const Main = () => {

    const [tasks, setTasks] = useState(() => {
        const persistedValue = window.localStorage.getItem('tasks');
        return persistedValue !== null ? JSON.parse(persistedValue) : [];
    })
    const [isTaskWindowOpen, setIsTaskWindowOpen] = useState(false)
    const [isWeekdayArrOpen, setIsWeekdayArrOpen] = useState(false)
    const [taskId, setTaskId] = useState(0)
    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const [textTask, setTextTask] = useState('')
    const [dayTask, setDayTask] = useState('')


    useEffect(() => {
        //метод getDay() возвращзает число от 0 до 6. 0 - Воскресенье, 1 - Понедельник, 2 - Вторник и так далее
        let dateNow = new Date(Date.now())
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

    //Добавляет время начала задачи
    const addStartTime = (value, dateString) => {
        console.log('Time Start', dateString);
        setTimeStart(dateString);
    }

    //Добавляет время окончания задачи
    const addEndTime = (value, dateString) => {
        console.log('Time End', dateString);
        setTimeEnd(dateString);
    }

    //Помещает задачу в корзину
    const taskToBasket = (i) => {
        const res = tasks.map(task => task.id === i ? ({...task, inBasket: true}) : task)
        setTasks(res)
    }

    //Помечает задачу как выполненную
    const taskIsDoneChange = (i) => {
        const res = tasks.map(task => task.id === i ? ({ ...task, isDone: true}) : task)
        setTasks(res)
    }

    //Добавляет задачу в список
    const addTask = () => {
        setTasks([...tasks, {
            id: taskId,
            startTime: timeStart,
            endTime: timeEnd,
            taskText: textTask,
            tasksDay: dayTask,
            isDone: false,
            inBasket: false
        }])
        setTaskId(taskId + 1)
    }


    //Выводит в консоль список задач (для удобства)
    useEffect(() =>{
        console.log(tasks)
        window.localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    return (
        <div className={'main'}>
            <div className={'main_tasks'}>
                {
                    tasks.filter(obj => obj.tasksDay === 'Понедельник').map((task, i) => (
                        <div style={task.inBasket ? {display: "none"} : {}} key={i} className={'main_task'}>
                            <img onClick={() => taskToBasket(i)} className={'main_points-img'} src="/points.svg" alt="points"/>
                            <label onClick={() => taskIsDoneChange(i)} className={'main_task-label'}>
                                <input className={'main_input'} type={"checkbox"}/>
                                <span className={'main_fake-inp'}></span>
                                <span className={task.isDone ? 'main_task-done' : ''}>{task.taskText ? task.taskText : 'Задача'} {task.startTime && '(' + task.startTime + '-' + (task.endTime ? task.endTime : '00:00') + ')'}</span>
                            </label>
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
                    <img src="/plus.svg" alt="plus"/>
                </div>
            </div>
        </div>
    );
};

export default Main;