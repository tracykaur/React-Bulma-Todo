import React, { Component } from 'react';
import './App.css';
import { Input, Title, SubTitle } from 'reactbulma'
import Header from './components/Header'

class App extends Component {

  state = {
    tasks: [
      { todo:'Go for a run', time: '29/11/2017, 13:26:31', complete: true},
      { todo:'Go for a walk', time: '29/11/2017, 13:26:31', complete: false}
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
        tasks: [{ todo: this.state.searchPhrase,
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

  render() {

    const  {tasks, searchPhrase } = this.state
    return (
      <div className='App'>

        <Header totalIncomplete={ tasks.length } title='Tasks' />

        <form onSubmit={ this.addTask }>
           <Input primary large
           placeholder='search / add a todo!'
           value={ searchPhrase }
           onChange={ this.onChangeQuery }
           />
        </form>
        {
          tasks.filter(myTask => myTask.todo.includes(searchPhrase))
          .map(myTask => <ListItem todo={myTask.todo}
            time={myTask.time}
            complete={myTask.complete} />)
        }
      </div>
    );
  }
}

const ListItem = ({ todo, time, complete }) => (
  <div>
    <Title is='3'>{todo}</Title>
    <SubTitle is='6'>{time}</SubTitle>
    {complete && <p>"👻"</p>}        
  </div>
)

export default App;
