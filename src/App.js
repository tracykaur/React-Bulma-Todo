import React, { Component } from 'react';
import './App.css';
import { Input, Title, SubTitle, Notification } from 'reactbulma'
import Header from './components/Header'

let currentId = 5;
const genId = () => ++currentId
class App extends Component {

  state = {
    tasks: [
      { id : 1, todo:'Go for a run', time: '29/11/2017, 13:26:31', complete: true},
      { id : 2, todo:'Go for a walk', time: '29/11/2017, 13:26:31', complete: false}
    ],
    searchPhrase: ''
  }
  onChangeQuery = (event) => {
    // console.log(event.target.value)
    this.setState({
      searchPhrase: event.target.value
    })
  }

  addTask = (event) => {
    event.preventDefault();
    const existingItem = this.state.tasks.find(task => task.todo === this.state.searchPhrase);
    if (!existingItem) {
      this.setState({
        tasks: [{ id: genId(), todo: this.state.searchPhrase,
          time: new Date().toLocaleString()}, ...this.state.tasks ],
        // Reset search phrase to an empty string
        searchPhrase: ''
      })
    } else {
        this.setState({
          searchPhrase: ''
        })
    }
    // Add te new task to the list of Tasks
    // Update the state with the new Task
  }

  toggleComplete = (id) => {
    const foundTodoIndex = this.state.tasks.findIndex(task => task.id === id)
    this.setState(prevState => {
      const tasks = prevState.tasks
      tasks[foundTodoIndex].complete = !tasks[foundTodoIndex].complete
      return {tasks}
    })
  }

  render() {

    const  {tasks, searchPhrase } = this.state
    return (
      <div className='App'>

        <Header totalIncomplete={ tasks.filter(task => !task.complete).length } totalComplete={ tasks.filter(task => task.complete).length } />
        <hr/>
        <form onSubmit={ this.addTask }>
           <Input primary large
           placeholder='search / add a todo!'
           value={ searchPhrase }
           onChange={ this.onChangeQuery }
           />
        </form>
        {
          tasks.filter(myTask => myTask.todo.includes(searchPhrase))
          .map(myTask => <ListItem {...myTask} toggleComplete={this.toggleComplete}/>)
        }
      </div>
    );
  }
}

const ListItem = ({ todo, time, complete, toggleComplete, id }) => (
  <Notification onClick={ () => toggleComplete(id)}>
    {complete ? <Title is='3' className="completed">{todo}👻</Title> : <Title is="3">{todo}</Title>}
    <SubTitle is='6'>{time}</SubTitle>
  </Notification>
)

export default App;
