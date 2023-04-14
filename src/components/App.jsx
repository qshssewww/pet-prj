import React, {useState} from 'react';
import Header from "./containers/header/Header";
import Main from "./containers/main/Main";
import '../global.css'


const App = () => {

    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <div className={'wrapper'}>
            <Header activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            <Main activeIndex={activeIndex}/>
        </div>
    );
};

export default App;