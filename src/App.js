import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

const Name = props => {
  const { person } = props // person = { name: 'Tom', id: 234 }
  return (
    <div>
      {person.name}{' '}
      <button onClick={() => props.onClickChange(person)}>Update Name</button>
    </div>
  )
}
const People = props =>
  <div>
    {props.peopleList.map(p =>
      <Name key={p.id} person={p} onClickChange={props.clickNameChange} />
    )}
  </div>

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fruit: 'banana',
      people: [
        {
          name: 'Tom',
          id: 234,
        },
        {
          name: 'blah',
          id: 123,
        },
      ],
    }
  }

  changeTomToJerry = person => {
    this.setState((state, props) => {
      const { people } = state
      const personToUpdate = people.filter(p => p.id === person.id)[0]
      console.log('before update', personToUpdate)
      personToUpdate.name = personToUpdate.name === 'Jerry' ? 'Tom' : 'Jerry'

      return {
        people: [
          ...people.slice(0, people.indexOf(person)),
          personToUpdate,
          ...people.slice(people.indexOf(person) + 1),
        ],
      }
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <People
          peopleList={this.state.people}
          clickNameChange={this.changeTomToJerry}
        />
      </div>
    )
  }
}

export default App
