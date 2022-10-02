const Filter = ({ handleSearchTerm, searchTerm }) => (
  <div>
    <input onChange={handleSearchTerm} value={searchTerm} />
  </div>
)

export default Filter;