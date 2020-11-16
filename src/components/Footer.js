import React, { memo } from 'react';

const Footer = memo(props =>{
    const { status, setStatusFilter, numOfTodosLeft, numOfTodos, clearCompleted} = props
    const filterBtns = [{ //cha gui props cho con
        title: 'All',
        isActived: status === "ALL",
        onClick: () => setStatusFilter('ALL'),
        link: ''
    },
    {
        title: 'Active',
        isActived: status === "ACTIVE",
        onClick: () => setStatusFilter('ACTIVE'),
        link: '/active'
    },
    {
        title: 'Completed',
        isActived: status === "COMPLETED",
        onClick: () => setStatusFilter('COMPLETED'),
        link: '/completed'
    }]
    return(
        //ui footer count => ul show active => clear completed
        <footer className="footer"> 
            <span className="todo-count"> 
                <strong>{numOfTodosLeft}</strong> 
                    <span></span>
                    <span>{numOfTodosLeft <= 1 ? ' Item' : ' Items'}</span>
                    <span> Left</span>
            </span>
            <ul className="filters">
                { 
                filterBtns.map(btn => (
                    <FilterBtn
                    {...btn} 
                    key={`btn${btn.title}`}
                    
                    />
                ))
                }
            </ul>
            {numOfTodos > numOfTodosLeft && <button className="clear-completed" onClick={clearCompleted}> Clear completed </button>}
        </footer>
    )
})

const FilterBtn = memo(props =>{
    //day la thang con
    const{ title ,onClick, link, isActived} = props
    return(
        <>
            <li>
                <a
                    href={`#/${link}`}
                    className={`${isActived ? 'selected' : ''} `} 
                    onClick={onClick}
                >
                    {title}
                </a>
            </li>
        </>
    )
})

export default Footer;