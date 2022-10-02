import { useState, useEffect } from 'react'
import axios from 'axios'
import personsService from './services/persons'

const Filter = ({ handleSearchTerm, searchTerm }) => (
  <div>
    <input onChange={handleSearchTerm} value={searchTerm} />
  </div>
)

const PersonForm = ({ addPerson, handleNameChange, newName, handleNumberChange, newNumber }) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input onChange={handleNameChange} value={newName} />
    </div>
    <div>
      number: <input onChange={handleNumberChange} value={newNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({ persons, searchTerm, handleDelete }) => {
  const numbers = persons.filter(person => {
    return searchTerm === '' || person.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
  }).map(person => {
    return <div key={person.name}>{person.name} {person.number} <button onClick={handleDelete(person)}>delete</button></div>
  });

  return (
    <div>
      {numbers}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(personsData => {
        setPersons(personsData);
      });
  }, [])

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const existing = persons.find(person => person.name === newName);
    if(existing !== undefined) {
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with the new one?`)) {
        personsService
          .update(existing.id, newPerson)
          .then(personsData => {
            setPersons(persons.map(person => person.id === existing.id ? personsData : person));
            setNewName('');
            setNewNumber('');
          });
      }
      return;
    }
    personsService
      .create(newPerson)
      .then(personsData => {
        setPersons(persons.concat(personsData));
        setNewName('');
        setNewNumber('');
      });
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleDelete = (person) => {
    return () => {
      if(window.confirm(`Delete ${person.name}?`)) {
        personsService
          .deleteRecord(person.id)
          .then(response => {
            setPersons(persons.filter(personData => person.id !== personData.id));
          });
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearchTerm={handleSearchTerm} searchTerm={searchTerm} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} newName={newName} handleNumberChange={handleNumberChange} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} searchTerm={searchTerm} handleDelete={handleDelete} />
    </div>
  )
}

export default App
