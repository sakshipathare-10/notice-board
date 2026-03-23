const Filters = ({
  search,
  setSearch,
  category,
  setCategory,
  year,
  setYear,
  years,
  categories,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-2 mb-4">

     
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full"
      />

    
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded"
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* Year */}
      <select
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
        className="border p-2 rounded"
      >
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

    </div>
  );
};

export default Filters;