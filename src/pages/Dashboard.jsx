import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Heart,
  NotebookPen,
  Sparkles,
  Trash2,
  CalendarDays,
  Sun,
  PenLine,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import EmptyState from "../components/EmptyState";

const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function Dashboard({ notes, actions }) {
  const navigate = useNavigate();
  const today = new Date();
  const [shownMonth, setShownMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState(toDateKey(today));

  const active = notes.filter((note) => !note.isDeleted);
  const recent = [...active]
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt) -
        new Date(a.updatedAt || a.createdAt),
    )
    .slice(0, 4);

  const favorites = active.filter((note) => note.isFavorite).length;
  const stats = [
    {
      label: "TOTAL NOTES",
      value: active.length,
      icon: NotebookPen,
      tone: "stat-apricot",
      detail: "thoughts collected",
    },
    {
      label: "SAVED MOMENTS",
      value: favorites,
      icon: Heart,
      tone: "stat-blush",
      detail: "kept close to heart",
    },
    {
      label: "IN THE ARCHIVE",
      value: notes.filter((note) => note.isDeleted).length,
      icon: Trash2,
      tone: "stat-olive",
      detail: "ready to restore",
    },
  ];

  const year = shownMonth.getFullYear();
  const month = shownMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const notesByDate = useMemo(() => {
    const grouped = {};
    active.forEach((note) => {
      const key =
        note.eventDate || (note.createdAt ? note.createdAt.slice(0, 10) : "");
      if (key) grouped[key] = [...(grouped[key] || []), note];
    });
    return grouped;
  }, [active]);

  const selectedNotes = notesByDate[selectedDate] || [];

  function changeMonth(amount) {
    setShownMonth(new Date(year, month + amount, 1));
  }

  return (
    <div className="page-content dashboard-page">
      <section className="dashboard-hero">
        <div className="hero-copy">
          <span className="eyebrow hero-eyebrow">
            <Sun size={13} /> A SOFTER WAY TO STAY ORGANIZED
          </span>
          <h2>
            Collect thoughts.
            <br />
            <em>Keep what matters.</em>
          </h2>
          <p>
            Your personal space to gather ideas, little plans, and passing
            thoughts before they disappear.
          </p>
          <button
            className="hero-button"
            onClick={() => navigate("/notes/new")}
          >
            <PenLine size={16} /> Write something <ArrowUpRight size={15} />
          </button>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-note hero-note-back">
            <span>field notes / 01</span>
            <b>
              observe
              <br />
              the little
              <br />
              things.
            </b>
          </div>
          <div className="hero-note hero-note-front">
            <span>NOTE TO SELF</span>
            <strong>
              Ideas grow
              <br />
              when you
              <br />
              <i>write them.</i>
            </strong>
            <small>✳ &nbsp; KEEP GROWING</small>
          </div>
          <span className="hero-stamp">N° 01</span>
        </div>
        <div className="hero-index">A PERSONAL ARCHIVE — EST. 2026</div>
      </section>

      <section className="stats-grid">
        {stats.map(({ label, value, icon: Icon, tone, detail }, index) => (
          <article className={`stat-card ${tone}`} key={label}>
            <div className="stat-card-head">
              <span>{label}</span>
              <Icon size={17} />
            </div>
            <div className="stat-card-bottom">
              <strong>{value.toString().padStart(2, "0")}</strong>
              <span>{detail}</span>
            </div>
            <span className="stat-index">0{index + 1}</span>
          </article>
        ))}
      </section>

      <div className="dashboard-columns">
        <section className="recent-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">YOUR LATEST THOUGHTS</span>
              <h2>Recently collected</h2>
              <p className="recent-subtitle">
                Your four latest moments, all in one place.
              </p>
            </div>
            <Link to="/notes" className="text-link">
              View collection <ArrowUpRight size={15} />
            </Link>
          </div>

          {recent.length ? (
            <div className="notes-grid">
              {recent.map((note) => (
                <NoteCard key={note.id} note={note} {...actions} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="A fresh page awaits"
              description="Your first note doesn't need to be perfect. Just begin."
            />
          )}
        </section>

        <aside className="dashboard-aside">
          <section className="calendar-card">
            <div className="aside-card-heading">
              <span className="eyebrow">YOUR MEMORY CALENDAR</span>
              <CalendarDays size={17} />
            </div>

            <div className="calendar-navigation">
              <button
                className="icon-button"
                onClick={() => changeMonth(-1)}
                aria-label="Bulan sebelumnya"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="calendar-month">
                {shownMonth.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <button
                className="icon-button"
                onClick={() => changeMonth(1)}
                aria-label="Bulan berikutnya"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="calendar-grid">
              {weekday.map((day) => (
                <span className="calendar-day-label" key={day}>
                  {day}
                </span>
              ))}
              {Array.from({ length: firstDay }, (_, i) => (
                <span key={`blank-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const date = new Date(year, month, day);
                const key = toDateKey(date);
                const hasNotes = Boolean(notesByDate[key]?.length);
                const isToday = key === toDateKey(today);
                return (
                  <button
                    type="button"
                    key={key}
                    className={`calendar-date ${isToday ? "today" : ""} ${selectedDate === key ? "selected" : ""} ${hasNotes ? "has-notes" : ""}`}
                    onClick={() => setSelectedDate(key)}
                    title={
                      hasNotes
                        ? `${notesByDate[key].length} catatan`
                        : "Pilih tanggal"
                    }
                  >
                    {day}
                    {hasNotes && <span className="calendar-marker" />}
                  </button>
                );
              })}
            </div>

            <div className="calendar-selected">
              <div className="calendar-selected-heading">
                <div>
                  <span className="eyebrow">SELECTED DAY</span>
                  <strong>
                    {new Date(`${selectedDate}T00:00:00`).toLocaleDateString(
                      "id-ID",
                      { day: "numeric", month: "long", year: "numeric" },
                    )}
                  </strong>
                </div>
                <button
                  className="calendar-add-button"
                  onClick={() => navigate(`/notes/new?date=${selectedDate}`)}
                  title="Buat catatan untuk tanggal ini"
                >
                  <Plus size={14} /> Add
                </button>
              </div>

              {selectedNotes.length ? (
                <ul className="calendar-note-list">
                  {selectedNotes.map((note) => (
                    <li key={note.id}>
                      <button onClick={() => navigate(`/notes/${note.id}`)}>
                        <span
                          className={`calendar-note-dot dot-${note.color || "apricot"}`}
                        />
                        {note.title}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="calendar-empty">
                  Belum ada catatan untuk tanggal ini.
                </p>
              )}
            </div>
          </section>

          <section className="prompt-card">
            <div className="prompt-top">
              <span className="eyebrow">A LITTLE PROMPT</span>
              <Sparkles size={17} />
            </div>
            <p>
              “What is one small thing you don't want to forget about today?”
            </p>
            <button onClick={() => navigate("/notes/new")}>
              Capture this thought <ArrowUpRight size={14} />
            </button>
          </section>

          <div className="aside-signoff">
            <span>✳</span>
            <div>
              <strong>Made of moments.</strong>
              <small>One note at a time.</small>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
