import { NavLink } from "react-router-dom";
import {
  BookHeart,
  LayoutDashboard,
  NotebookPen,
  Heart,
  Trash2,
  X,
  CircleHelp,
  Flower,
} from "lucide-react";
import NoteCard from "./NoteCard";

const links = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/notes", label: "All notes", icon: NotebookPen },
  { to: "/favorites", label: "Saved moments", icon: Heart },
  { to: "/trash", label: "Archive bin", icon: Trash2 },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      <div
        className={`sidebar-overlay ${open ? "show" : ""}`}
        onClick={onClose}
      />
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="brand-row">
          <div className="brand-mark">
            <BookHeart size={21} strokeWidth={1.8} />
          </div>
          <div className="brand-copy">
            <strong>
              Noerlyst<span className="brand-dot">.</span>
            </strong>
            <span>YOUR PERSONAL ARCHIVE</span>
          </div>
          <button
            className="icon-button mobile-close"
            onClick={onClose}
            aria-label="Tutup menu"
          >
            <X size={19} />
          </button>
        </div>

        <div className="sidebar-label">WORKSPACE</div>
        <nav className="side-nav">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <Icon size={17} strokeWidth={1.8} />
              <span>{label}</span>
              {to === "/favorites" && <span className="nav-spark">✳</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-collection">
          <span className="collection-kicker">A NOTE TO SELF</span>
          <div className="collection-icon">
            <Flower size={19} />
          </div>
          <h3>Make room for good thoughts.</h3>
          <p>A quiet corner for everything worth remembering.</p>
          <span className="collection-line" />
          <span className="collection-number">
            YOUR SUPER ULTRA NUMBER 1 SPACE
          </span>
        </div>

        <div className="sidebar-bottom">
          <CircleHelp size={15} />
          <span>Made for your little ideas</span>
        </div>
      </aside>
    </>
  );
}
