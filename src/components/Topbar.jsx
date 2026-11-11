import { Menu, Plus, Search, Command } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const titles = {
  "/dashboard": [
    "Your little archive",
    "A home for thoughts, plans, and everything in between.",
  ],
  "/notes": ["All notes", "Every thought has a place. Find yours."],
  "/favorites": ["Saved moments", "The thoughts you want to keep close."],
  "/trash": ["Archive bin", "A second chance for notes you removed."],
  "/notes/new": ["Create a note", "Start with a thought. Let the rest follow."],
};

export default function Topbar({ onMenu }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [title, subtitle] = titles[location.pathname] || [
    "Edit your note",
    "Make it yours.",
  ];
  return (
    <header className="topbar">
      <button
        className="icon-button menu-button"
        onClick={onMenu}
        aria-label="Buka menu"
      >
        <Menu size={21} />
      </button>
      <div className="topbar-heading">
        <span className="topbar-overline">HI, DEAR! YOUR SPACE IS READY</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="topbar-actions">
        <button className="top-search" onClick={() => navigate("/notes")}>
          <Search size={16} />
          <span>Find a thought</span>
        </button>
        <button
          className="primary-button top-create"
          onClick={() => navigate("/notes/new")}
        >
          <Plus size={17} />
          <span>New note</span>
        </button>
      </div>
    </header>
  );
}
