import { useState, useEffect } from 'react'
import axios from 'axios'
import personsService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [notification, setNotification] = useState({
    message: null,
    className: null
  });

  useEffect(() => {
    personsService
      .getAll()
      .then(personsData => {
        setPersons(personsData);
      });
  }, []);

  const showNotification = (message, className) => {
    setNotification({
      message: message,
      className: className
    });
    setTimeout(() => {
      setNotification({
        message: null,
        className: null
      });
    }, 5000);
  }

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
          })
          .catch(error => {
            showNotification(error.response.data.error, 'error');
          });
      }
      return;
    }
    personsService
      .create(newPerson)
      .then(personsData => {
        showNotification(`Added ${newName}`, 'success');
        setPersons(persons.concat(personsData));
        setNewName('');
        setNewNumber('');
      })
      .catch(error => {
        showNotification(error.response.data.error, 'error');
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
          })
          .catch(error => {
            showNotification(error.response.data.error, 'error');
          });
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} className={notification.className} />
      <Filter handleSearchTerm={handleSearchTerm} searchTerm={searchTerm} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} newName={newName} handleNumberChange={handleNumberChange} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} searchTerm={searchTerm} handleDelete={handleDelete} />
    </div>
  )
}

export default App
