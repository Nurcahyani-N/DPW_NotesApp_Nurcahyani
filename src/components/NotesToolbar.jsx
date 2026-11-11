import { Search, SlidersHorizontal } from "lucide-react";
import { categories } from "../data/categories";

export default function NotesToolbar({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
}) {
  return (
    <div className="toolbar">
      <div className="search-box">
        <Search size={18} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari judul atau isi catatan..."
        />
      </div>
      <div className="toolbar-controls">
        <select
          aria-label="Filter kategori"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <div className="sort-control">
          <SlidersHorizontal size={16} />
          <select
            aria-label="Urutkan catatan"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
            <option value="az">Judul A–Z</option>
          </select>
        </div>
      </div>
    </div>
  );
}
