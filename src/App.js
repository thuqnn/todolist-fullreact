import React, { PureComponent } from 'react';

//Component
import Header from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

//Css
import './App.css';
import './css/Todo.css';

const isNotCheckedAll = (todos = []) => todos.find(todo => !todo.isCompleted)
const filterByStatus = (todos = [], status = '',id = '') => {
  switch(status){
    case 'ACTIVE':
      return todos.filter(todo => !todo.isCompleted);
    case 'COMPLETED':
      return todos.filter(todo => todo.isCompleted);
    case 'REMOVE':
      return todos.filter(todo => todo.id !== id);
    default:
    return todos;
  }
}
class App extends PureComponent {
  state = {
    todosList: [{
      id: 1,
      text: 'todo 1',
      isCompleted: true
    },
    {
      id: 2,
      text: 'todo 2',
      isCompleted: false
    }],
    todoEditingId: '',
    isCheckedAll: false,
    status: 'ALL'
  }

  componentWillMount(){
    this.setState({
      isCheckedAll: !isNotCheckedAll(this.state.todosList)
    })
  }
  addTodo = (todo = {}) => {//day vao todolist
    this.setState(preState => ({
      todosList: [...preState.todosList, todo]
    }))
  }

  getTodoEditingId = (id = '') => {
    this.setState ({ todoEditingId: id })
  }
  onEditTodo = (todo = {}, index = -1)=>{
    if(index >= 0){
      const {todosList: list} = this.state
      list.splice(index, 1, todo)
      this.setState({
      todosList: list,
      todoEditingId: ''
      })
    }
  }
  markCompleted = (id ='') =>{
    const { todosList} = this.state
    const updatedList = todosList.map(todo => todo.id === id ? ({...todo, isCompleted: !todo.isCompleted}) :todo)
    this.setState(preState => ({
      todosList: updatedList,
      isCheckedAll: !isNotCheckedAll(updatedList)
    }))
  }
  checkAllTodos = () =>{
    const{todosList,isCheckedAll} = this.state
    this.setState (preState =>({
      todosList: todosList.map(todo => ({...todo, isCompleted: !isCheckedAll})),
      isCheckedAll: !preState.isCheckedAll
    }))
  }
  setStatusFilter = (status = '')=>{
    this.setState({
      status
    })
  }
  clearCompleted = () => {
    const { todosList } = this.state
    this.setState({
      todosList: filterByStatus (todosList,'ACTIVE')
    })
  }
  removeTodo = (id = '') => {
    const {todosList} = this.state
    this.setState({
      todosList: filterByStatus(todosList, 'REMOVE', id)
    })
  }
  render(){
    const { todosList, todoEditingId ,isCheckedAll, status} = this.state
    return ( //truyen props cho con chu y TodoList cua App thi se truyen prop cho TodoList.js
      <div className="todoapp">
          <Header 
          addTodo= {this.addTodo}
          isCheckedAll = {isCheckedAll}
          />
          <TodoList 
          todosList={filterByStatus (todosList,status)}
          getTodoEditingId = {this.getTodoEditingId}
          todoEditingId = {todoEditingId}
          onEditTodo = {this.onEditTodo}
          markCompleted = {this.markCompleted}
          isCheckedAll = {isCheckedAll}
          checkAllTodos ={this.checkAllTodos}
          removeTodo = {this.removeTodo}
          /> 
          <Footer 
            setStatusFilter = {this.setStatusFilter}
            status = {status}
            clearCompleted = {this.clearCompleted}
            numOfTodos = {todosList.length}
            numOfTodosLeft = {filterByStatus(todosList, 'ACTIVE').length}
          />
      </div>
    );
  }
}

export default App;
