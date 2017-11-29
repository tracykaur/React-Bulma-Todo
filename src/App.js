import React, { Component } from 'react';
import './App.css';
import { Input } from 'reactbulma'
import Header from './components/Header'

class App extends Component {

  state = {
    tasks: ['Do the washing', 'Walk the dog'],
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
    const currentTasks = [...this.state.tasks];

    // Add te new task to the list of Tasks
    currentTasks.push(this.state.searchPhrase);
    // Update the state with the new Tasks
    this.setState({
      tasks: currentTasks,
      // Reset search phrase to an empty string
      searchPhrase: ''
    })

  }

  render() {

    const  {tasks, searchPhrase } = this.state
    return (
      <div className="App">

        <Header totalIncomplete={ tasks.length } title="Tasks" />

        <form onSubmit={ this.addTask }>
           <Input primary large
           placeholder="search / add a todo!"
           value={ searchPhrase }
           onChange={ this.onChangeQuery }
           />
        </form>
        {
          tasks.filter(myTask => myTask.includes(searchPhrase))
          .map(myTask => <p>{myTask}</p>)
        }
      </div>
    );
  }
}

export default App;
