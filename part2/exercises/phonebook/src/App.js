import { useState } from 'react'

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

const Persons = ({ persons, searchTerm }) => {
  const numbers = persons.filter(person => {
    return searchTerm === '' || person.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
  }).map(person => {
    return <div key={person.name}>{person.name} {person.number}</div>
  });

  return (
    <div>
      {numbers}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123-456-7890' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const addPerson = (e) => {
    e.preventDefault();
    if(persons.filter(person => person.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`)
      return;
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearchTerm={handleSearchTerm} searchTerm={searchTerm} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} newName={newName} handleNumberChange={handleNumberChange} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} searchTerm={searchTerm} />
    </div>
  )
}

export default App
