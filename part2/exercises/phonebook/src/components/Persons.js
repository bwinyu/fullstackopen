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

export default Persons