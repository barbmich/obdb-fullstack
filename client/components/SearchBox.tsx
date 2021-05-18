export default function SearchBox({
  search,
  handleSearch,
  setSearch,
  handleClear,
}) {
  console.log(search);
  return (
    <form className="search-box" onSubmit={handleSearch}>
      <input
        className="input"
        type="text"
        aria-label="Search input"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <button type="submit" className="button search">
        Search
      </button>
      <button
        className={`button clear${search === "" ? " disabled" : ""}`}
        onClick={() => handleClear()}
      >
        Clear search
      </button>
    </form>
  );
}
