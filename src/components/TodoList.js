import React, { memo } from 'react';
import Todo from './Todo';

const TodoList = memo(props =>{
    const { todosList ,isCheckedAll,checkAllTodos} = props
    return(// con nhan tu cha
        <section className="main">
            <input readOnly
            className="toggle-all"  
            type="checkbox"
            checked={isCheckedAll}
            />
            <label htmlFor="toggle-all" onClick={checkAllTodos}/>
            <ul className="todo-list">
                {
                    todosList.map((todo, index) => <Todo {...{ todo } } key={`todo${todo.id}`} {...props} index={index}/>)
                }
            </ul>
        </section>
    )
})

export default TodoList;