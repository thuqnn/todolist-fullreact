import React, { memo, useState } from 'react';

const Header = memo(props =>{
    const [text, setText ] = useState('') //luu text
    const { addTodo ,isCheckedAll} = props
    const onAddTodo = (e = {}) =>{
        if(e.key === 'Enter' && text){
            //console.log('text' + text);
            addTodo({
                id: new Date().valueOf(),
                text,
                idCompleted: false
            })
            setText('')
        }
    }
    return( //lay text da go
        <header className="header"> 
            <h1>Todos</h1>
            <input className="new-todo" 
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => onAddTodo(e)} 
            checked={isCheckedAll}
            /> 
        </header>
    )
})
export default Header;