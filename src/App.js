import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { state } from './state'

const immutableES6StyleStateUpdate = person => (state, props) => {
  const { people } = state
  const personToUpdate = people.filter(p => p.id === person.id)[0]
  personToUpdate.name = personToUpdate.name === 'Jerry' ? 'Tom' : 'Jerry'

  people[people.indexOf(person)].name = 'Banana'

  const newState = {
    ...state,
    people
  }

  // const newState = {
  //   ...state, // spread all the old state, the people that come next will overwrite the old array of objects
  //   people: [
  //     ...people.slice(0, people.indexOf(person)), // take everything up to (but not including) the target person
  //     personToUpdate, // shove in the update in place
  //     ...people.slice(people.indexOf(person) + 1), // spread (...) everything after
  //   ],
  // }

  return newState
}

const Name = (
  { person, toggleTomAndJerry } // person = { name: 'Tom', id: 234 }
) =>
  <div>
    {person.name}{' '}
    <button onClick={() => toggleTomAndJerry(person)}>Update Name</button>
  </div>

const People = (
  { peopleList, ...rest } // you can use ...rest to just throw down other props (like functions) that you don't want to worry about
) =>
  <div>
    {peopleList.map(p => <Name key={p.id} person={p} {...rest} />)}
  </div>

class App extends Component {
  constructor(props) {
    super(props)
    this.state = state
  }

  toggleTomAndJerry = person =>
    this.setState(immutableES6StyleStateUpdate(person)) // this expects a function that takes (state, props)

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Drew's Example</h2>
        </div>
        <pre>
          {JSON.stringify(this.state, null, 2)}
        </pre>
      </div>
    )
  }
}

export default App
