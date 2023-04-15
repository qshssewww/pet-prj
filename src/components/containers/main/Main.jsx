import React, {useEffect, useState} from 'react';
import './Main.css'
import {TimePicker} from "antd";
import Nav, {weekday} from "./components/navigation/Nav";


const Main = ({activeIndex}) => {

    let dateNow = new Date(Date.now())
    const [tasks, setTasks] = useState([])
    const [doBlockOpen, setDoBlockOpen] = useState(-1)
    const [changeTask, setChangeTask] = useState('')
    const [isTaskWindowOpen, setIsTaskWindowOpen] = useState(false)
    const [isWeekdayArrOpen, setIsWeekdayArrOpen] = useState(false)
    const [taskId, setTaskId] = useState(0)
    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const [textTask, setTextTask] = useState('')
    const [dayTask, setDayTask] = useState('')
    const [dayTaskNum, setDayTaskNum] = useState(dateNow.getDay() - 1)
    //так как отсчет (о котором я говрил в фале Main.jsx) введется с воскресенья, мы вычитаем 1
    const [activeIndexN, setActiveIndexN] = useState(dateNow.getDay() - 1)

    useEffect(() => {
        const persistedValue = JSON.parse(window.localStorage.getItem('tasks'));
        setTasks(persistedValue?.length ? (persistedValue) : [])
        setTaskId(tasks.length !== 0 ? Number(window.localStorage.getItem('id')) : 0)
    }, [])

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
    const taskToBasket = (task) => {
        setTasks(tasks.map(item => {
            if (item.id === task.id){
                task.inBasket = true
            }
            return item
        }))
    }

    //Дает вотзможность изменить задачу
    const taskChange = (task) => {
        setIsTaskWindowOpen(true)
        setTasks(tasks.map(item => {
            if (item.id === task.id){
                task.startTime = timeStart
                task.endTime = timeEnd
                task.taskText = textTask
                task.taskDay = dayTask
                task.taskDayNum = dayTaskNum
            }
            return item
        }))
        setChangeTask('')
    }

    //Помечает задачу как выполненную
    const taskIsDoneChange = (task) => {
        setTasks(tasks.map(item => {
            if (item.id === task.id){
                task.isDone = !task.isDone
            }
            return item
        }))
    }

    //Возвращает задачу из корзины к списку дел
    const taskOutBasket = (task) => {
        setTasks(tasks.map(item => {
            if (item.id === task.id){
                task.inBasket = false
            }
            return item
        }))
    }

    //Полностью удалает задачу
    const taskDeleteForever = (task) => {
        setTasks(tasks.filter((item) => task.id !== item.id))
    }

    //Добавляет задачу в список
    const addTask = () => {
        setTasks([...tasks, {
            id: taskId,
            startTime: timeStart,
            endTime: timeEnd,
            taskText: textTask,
            taskDay: dayTask,
            taskDayNum: dayTaskNum,
            isDone: false,
            inBasket: false
        }])
        setTaskId(taskId + 1)
    }

    //открывает/закрыват окно действий (добавить в корзину или изменить)
    const openDeleteBlock = (task) => {
        if(doBlockOpen === task.id || doBlockOpen === -1){
                    if (document.getElementById(task.id).classList.length === 1){
                        setDoBlockOpen(task.id)
                        document.getElementById(task.id).classList.add('main_do-block')
                        document.querySelector(`.main_task${task.id}`).classList.add('main_task-m')
                    } else {
                        setDoBlockOpen(-1)
                        document.getElementById(task.id).classList.remove('main_do-block')
                        document.querySelector(`.main_task${task.id}`).classList.remove('main_task-m')
                    }
                } else {
                    document.querySelector('.main_do-block')?.classList.remove('main_do-block')
                    document.querySelector('.main_task-m')?.classList.remove('main_task-m')
                    setDoBlockOpen(task.id)
                    document.getElementById(task.id).classList.add('main_do-block')
                    document.querySelector(`.main_task${task.id}`).classList.add('main_task-m')
                }
    }

    useEffect(() =>{
        //Выводит в консоль список задач (для удобства)
        console.log(tasks)
        //изменяет/записывает в локальное хранилище массив с задачами
        window.localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    useEffect(() => {
        if(!isTaskWindowOpen){
            setChangeTask('')
        }
    }, [isTaskWindowOpen])

    useEffect(() =>{
        window.localStorage.setItem('id', JSON.stringify(taskId))
    }, [taskId])

    return (
        <>
            <Nav activeIndexN={activeIndexN} setActiveIndexN={setActiveIndexN}/>
            <div className={'main'}>
                <div className={'main_tasks'}>
                    {
                        activeIndex === 0 ?
                        tasks.filter(task => task.taskDayNum === activeIndexN).map((task) => (
                            <div style={task.inBasket ? {display: "none"} : {}} key={task.id} className={`main_task main_task${task.id}`}>
                                <img onClick={() => openDeleteBlock(task)} className={'main_points-img'} src="/points.svg" alt="points"/>
                                <label className={'main_task-label'}>
                                    <input checked={task.isDone} onChange={() => 1} className={'main_input'} type={"checkbox"}/>
                                    <span onClick={() => taskIsDoneChange(task)} className={'main_fake-inp'}></span>
                                    <span style={{fontSize: 16}} onClick={() => taskIsDoneChange(task)} className={task.isDone ? 'main_task-done' : ''}>{task.taskText ? task.taskText : 'Задача'} {task.startTime && '(' + task.startTime + (task.endTime ? '-' + task.endTime : '') + ')'}</span>
                                </label>
                                <div id={task.id} className={'main_do-block-none'}>
                                    <div onClick={() => {
                                        taskToBasket(task)
                                        document.querySelector('.main_do-block')?.classList.remove('main_do-block')
                                        document.querySelector('.main_task-m')?.classList.remove('main_task-m') 
                                    }} className={'main_delete-block'}>
                                        <img src="/deleteIcon.svg" alt="deleteIcon"/>
                                        <p className={'main_delete-text'}>Переместить в корзину</p>
                                    </div>
                                    <div onClick={() => {
                                        setChangeTask(task)
                                    }} className={'main_change-block'}>
                                        <img src="/changeIcon.svg" alt="changeIcon"/>
                                        <p className={'main_change-text'}>Изменить</p>
                                    </div>
                                </div>
                            </div>
                        ))
                            : activeIndex === 1 ?
                                tasks.filter(task => task.taskDayNum === activeIndexN && task.isDone).map((task) => (
                                    <div style={task.inBasket ? {display: "none"} : {}} key={task.id} className={`main_task main_task${task.id}`}>
                                        <img onClick={() => openDeleteBlock(task)} className={'main_points-img'} src="/points.svg" alt="points"/>
                                        <label className={'main_task-label'}>
                                            <input checked={task.isDone} onChange={() => 1} className={'main_input'} type={"checkbox"}/>
                                            <span onClick={() => taskIsDoneChange(task)} className={'main_fake-inp'}></span>
                                            <span style={{fontSize: 16}} onClick={() => taskIsDoneChange(task)} className={task.isDone ? 'main_task-done' : ''}>{task.taskText ? task.taskText : 'Задача'} {task.startTime && '(' + task.startTime + (task.endTime ? '-' + task.endTime : '') + ')'}</span>
                                        </label>
                                        <div id={task.id} className={'main_do-block-none'}>
                                            <div onClick={() => taskToBasket(task)} className={'main_delete-block'}>
                                                <img src="/deleteIcon.svg" alt="deleteIcon"/>
                                                <p className={'main_delete-text'}>Переместить в корзину</p>
                                            </div>
                                            <div onClick={() => {
                                                setChangeTask(task)
                                                setIsTaskWindowOpen(true)
                                            }} className={'main_change-block'}>
                                                <img src="/changeIcon.svg" alt="changeIcon"/>
                                                <p className={'main_change-text'}>Изменить</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            : activeIndex === 2 ?
                                tasks.filter(task => task.taskDayNum === activeIndexN && task.inBasket).map((task) => (
                                    <div key={task.id} className={`main_task main_task${task.id}`}>
                                        <img onClick={() => openDeleteBlock(task)} className={'main_points-img'} src="/points.svg" alt="points"/>
                                        <label className={'main_task-label'}>
                                            <input checked={task.isDone} onChange={() => 1} className={'main_input'} type={"checkbox"}/>
                                            <span onClick={() => taskIsDoneChange(task)} className={'main_fake-inp'}></span>
                                            <span style={{fontSize: 16}} onClick={() => taskIsDoneChange(task)} className={task.isDone ? 'main_task-done' : ''}>{task.taskText ? task.taskText : 'Задача'} {task.startTime && '(' + task.startTime + (task.endTime ? '-' + task.endTime : '') + ')'}</span>
                                        </label>
                                        <div style={{paddingRight: 16}} id={task.id} className={'main_do-block-none'}>
                                            <div onClick={() => taskDeleteForever(task)} className={'main_delete-block'}>
                                                <img src="/deleteIcon.svg" alt="deleteIcon"/>
                                                <p className={'main_delete-text'}>Удалить навсегда</p>
                                            </div>
                                            <div onClick={() => taskOutBasket(task)} className={'main_change-block'}>
                                                <img src="/changeIcon.svg" alt="changeIcon"/>
                                                <p className={'main_change-text'}>Вернуть к списку дел</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                : ''
                    }
                </div>
                <div className={'main_add-task'}>
                    <div onClick={() => setIsTaskWindowOpen(!isTaskWindowOpen)} className={'main_plus-task-none main_plus-task'}>
                        <img src="/plus.svg" alt="plus"/>
                    </div>
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
                                            <p onClick={() => {
                                                setDayTask(day)
                                                setDayTaskNum(i)
                                            }} key={i} className={'main_weekday-p'}>{day}</p>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            changeTask ?
                                <button onClick={() => taskChange(changeTask)} style={isWeekdayArrOpen ? {} : {marginTop: 20}} className={'main_add-btn btn'}>Изменить</button>
                                :
                                <button onClick={addTask} style={isWeekdayArrOpen ? {} : {marginTop: 20}} className={'main_add-btn btn'}>Добавить</button>
                        }
                    </div>
                    <div onClick={() => setIsTaskWindowOpen(!isTaskWindowOpen)} className={'main_plus-task'}>
                        <img src="/plus.svg" alt="plus"/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Main;