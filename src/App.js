import React, { Component } from 'react';
import './App.css';
import { Input, Title, SubTitle, Notification } from 'reactbulma'
import Header from './components/Header'
import axios from 'axios';


class App extends Component {

  state = {
    tasks: [],
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
      axios.post('/api/tasks', {
        todo: this.state.searchPhrase,
        time: new Date(),
        complete: false
        })
        .then((response) => {
          console.log(response);
          this.setState({
            tasks: [response.data, ...this.state.tasks ],
            // Reset search phrase to an empty string
            searchPhrase: ''
          })
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
        this.setState({
          searchPhrase: ''
        })
    }
    // Add the new task to the list of Tasks
    // Update the state with the new Task
  }

  toggleComplete = (_id) => {
    const foundTodoIndex = this.state.tasks.findIndex(task => task._id === _id)
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
           <Input primary large autoFocus
           placeholder='search / add a todo!'
           value={ searchPhrase }
           onChange={ this.onChangeQuery }
           />
        </form>
        {
          tasks.filter(myTask => myTask.todo.includes(searchPhrase))
          .map(myTask => <ListItem key={myTask._id} {...myTask} toggleComplete={this.toggleComplete}/>)
        }
      </div>
    );
  }
  componentDidMount() {
    axios.get('api/tasks')
    .then((response) => {

      console.log('Success!')
      console.log(response.data)

      this.setState({
        tasks: response.data
      })
    })
    .catch((error) => {
      console.log('Whoops')
      console.log(error)
    });
  }
}

const ListItem = ({ todo, time, complete, toggleComplete, _id }) => (
  <Notification onClick={ () => toggleComplete(_id)}>
    {complete ? <Title is='3' className="completed">{todo}👻</Title> : <Title is="3">{todo}</Title>}
    <SubTitle is='6'>{time.toLocaleString()}</SubTitle>
  </Notification>
)

export default App;
