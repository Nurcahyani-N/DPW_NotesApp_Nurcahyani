import { useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import useNotes from "./hooks/useNotes";
import Dashboard from "./pages/Dashboard";
import AllNotes from "./pages/AllNotes";
import Favorites from "./pages/Favorites";
import Trash from "./pages/Trash";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import ViewNote from "./pages/ViewNote";
import NotFound from "./pages/NotFound";
import "./App.css";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const data = useNotes();
  const location = useLocation();

  const actions = {
    onFavorite: data.toggleFavorite,
    onDelete: data.moveToTrash,
    onRestore: data.restoreNote,
    onDeleteForever: (id) => {
      if (confirm("Hapus catatan ini secara permanen?")) data.deleteForever(id);
    },
    emptyTrash: data.emptyTrash,
  };

  const isFormPage =
    location.pathname.includes("/new") || location.pathname.includes("/edit");

  return (
    <div className="app-shell">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="main-area">
        <Topbar onMenu={() => setMenuOpen(true)} />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={<Dashboard notes={data.notes} actions={actions} />}
          />
          <Route
            path="/notes"
            element={<AllNotes notes={data.notes} actions={actions} />}
          />
          <Route
            path="/notes/new"
            element={<CreateNote onSave={data.addNote} />}
          />
          <Route
            path="/notes/:id"
            element={<ViewNote notes={data.notes} actions={actions} />}
          />
          <Route
            path="/notes/:id/edit"
            element={<EditNote notes={data.notes} onSave={data.updateNote} />}
          />
          <Route
            path="/favorites"
            element={<Favorites notes={data.notes} actions={actions} />}
          />
          <Route
            path="/trash"
            element={<Trash notes={data.notes} actions={actions} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {!isFormPage && (
          <footer className="app-footer">
            <span>♥</span> Nurcahyani | 25071104584 | TI-C <span>♥</span>
          </footer>
        )}
      </main>
    </div>
  );
}
