import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Save,
  Feather,
  Bold,
  Italic,
  Underline,
  Highlighter,
  CalendarDays,
  List,
  ListOrdered,
  ImagePlus,
  X,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { categories, noteColors } from "../data/categories";

export default function NoteForm({ initialNote, onSave }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editorRef = useRef(null);
  const coverInputRef = useRef(null);

  const requestedDate = searchParams.get("date");
  const [title, setTitle] = useState(initialNote?.title || "");
  const [content, setContent] = useState(initialNote?.content || "");
  const [category, setCategory] = useState(initialNote?.category || "Kuliah");
  const [color, setColor] = useState(initialNote?.color || "apricot");
  const [coverImage, setCoverImage] = useState(initialNote?.coverImage || "");
  const [eventDate, setEventDate] = useState(
    initialNote?.eventDate ||
      initialNote?.createdAt?.slice(0, 10) ||
      requestedDate ||
      new Date().toISOString().slice(0, 10),
  );
  const [highlightColor, setHighlightColor] = useState("#F0A599");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialNote?.content || "";
      setContent(initialNote?.content || "");
    }
  }, [initialNote]);

  function handleCoverImageChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Pilih file gambar yang valid.");
      event.target.value = "";
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Ukuran gambar maksimal 2 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setCoverImage(String(reader.result || ""));
      setError("");
      event.target.value = "";
    };
    reader.onerror = () => {
      setError("Gambar gagal dibaca. Coba lagi.");
      event.target.value = "";
    };
    reader.readAsDataURL(file);
  }

  function applyFormat(command, value = null) {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    if (editorRef.current) setContent(editorRef.current.innerHTML);
  }

  function applyHighlight(value) {
    setHighlightColor(value);
    editorRef.current?.focus();
    document.execCommand("hiliteColor", false, value);
    if (editorRef.current) setContent(editorRef.current.innerHTML);
  }

  function handleEditorInput() {
    setContent(editorRef.current?.innerHTML || "");
  }

  function handleEditorKeyDown(event) {
    if (event.key !== "Enter") return;

    const selection = window.getSelection();
    let node = selection?.anchorNode;
    if (node?.nodeType === Node.TEXT_NODE) node = node.parentElement;

    // Di dalam daftar, Enter membuat bullet/nomor berikutnya secara otomatis.
    if (node?.closest?.("li")) return;

    // Di luar daftar, Enter membuat paragraf/baris baru yang terbaca juga saat melihat catatan.
    event.preventDefault();
    document.execCommand("insertParagraph");
    handleEditorInput();
  }

  const plainContent = content
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .trim();

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !plainContent) {
      setError("Judul dan isi catatan tidak boleh kosong.");
      return;
    }

    onSave({
      title: title.trim(),
      content: content.trim(),
      category,
      color,
      eventDate,
      coverImage,
    });

    navigate("/notes");
  }

  return (
    <div className="form-page-inner">
      <button type="button" className="back-link" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} /> Back to your space
      </button>

      <form className="note-form" onSubmit={handleSubmit}>
        <div className="form-heading">
          <span className="eyebrow">
            <Feather size={13} /> YOUR THOUGHTS, YOUR SPACE
          </span>
          <h2>
            {initialNote ? "Refine this thought." : "A new thought begins."}
          </h2>
          <p>Give your idea a name, a home, and a little room to grow.</p>
        </div>

        <label htmlFor="note-title">TITLE</label>
        <input
          id="note-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="A thought worth keeping..."
          maxLength={80}
        />

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="note-category">COLLECTION</label>
            <select
              id="note-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories
                .filter((item) => item !== "Semua")
                .map((item) => (
                  <option key={item}>{item}</option>
                ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="note-date">DATE / MEMORY DAY</label>
            <div className="date-input-wrap">
              <CalendarDays size={15} />
              <input
                id="note-date"
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="form-field note-cover-field">
          <label>NOTE IMAGE</label>
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            onChange={handleCoverImageChange}
            hidden
          />
          <div className="note-cover-controls">
            <button
              type="button"
              className="note-cover-upload"
              onClick={() => coverInputRef.current?.click()}
            >
              <ImagePlus size={16} />
              {coverImage ? "Ganti gambar" : "Pilih gambar"}
            </button>
            {coverImage && (
              <button
                type="button"
                className="note-cover-remove"
                onClick={() => setCoverImage("")}
              >
                <X size={14} /> Hapus gambar
              </button>
            )}
          </div>
          {coverImage && (
            <img
              className="note-cover-preview"
              src={coverImage}
              alt="Preview gambar catatan"
            />
          )}
          <span className="selected-color-name">
            Gambar ini akan tampil di kartu catatan. Maksimal 2 MB.
          </span>
        </div>

        <div className="form-field note-color-field">
          <label>NOTE COLOR</label>
          <div className="color-options">
            {noteColors.map((item) => (
              <button
                type="button"
                key={item.name}
                aria-label={item.label}
                title={item.label}
                className={`color-choice ${color === item.name ? "selected" : ""}`}
                style={{ background: item.value }}
                onClick={() => setColor(item.name)}
              />
            ))}
          </div>
          <span className="selected-color-name">
            {noteColors.find((item) => item.name === color)?.label}
          </span>
        </div>

        <label htmlFor="note-content-editor">YOUR NOTE</label>

        <div
          className="editor-toolbar"
          role="toolbar"
          aria-label="Format catatan"
        >
          <button
            type="button"
            title="Bold"
            aria-label="Bold"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => applyFormat("bold")}
          >
            <Bold size={16} />
          </button>
          <button
            type="button"
            title="Italic"
            aria-label="Italic"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => applyFormat("italic")}
          >
            <Italic size={16} />
          </button>
          <button
            type="button"
            title="Underline"
            aria-label="Underline"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => applyFormat("underline")}
          >
            <Underline size={16} />
          </button>
          <span className="toolbar-divider" />
          <button
            type="button"
            title="Bulleted list"
            aria-label="Bulleted list"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => applyFormat("insertUnorderedList")}
          >
            <List size={16} />
          </button>
          <button
            type="button"
            title="Numbered list"
            aria-label="Numbered list"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => applyFormat("insertOrderedList")}
          >
            <ListOrdered size={16} />
          </button>
          <span className="toolbar-divider" />
          <span className="highlight-label">
            <Highlighter size={14} /> Highlight:
          </span>
          <div className="highlight-palette">
            {noteColors.map((item) => (
              <button
                type="button"
                key={item.name}
                className={`highlight-swatch ${highlightColor === item.value ? "selected" : ""}`}
                style={{ background: item.value }}
                title={`Stabilo ${item.label}`}
                aria-label={`Stabilo ${item.label}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => applyHighlight(item.value)}
              />
            ))}
          </div>
          <span className="toolbar-hint">
            Pilih teks, lalu pilih format atau warna stabilo.
          </span>
        </div>

        <div
          id="note-content-editor"
          ref={editorRef}
          className="note-rich-editor"
          contentEditable
          suppressContentEditableWarning
          role="textbox"
          aria-label="Isi catatan"
          aria-multiline="true"
          data-placeholder="Let it out. You can organize it later..."
          onInput={handleEditorInput}
          onKeyDown={handleEditorKeyDown}
        />

        {error && <p className="form-error">{error}</p>}

        <div className="form-footer">
          <span>{plainContent.length} characters</span>
          <button className="primary-button" type="submit">
            <Save size={16} /> Save this note
          </button>
        </div>
      </form>
    </div>
  );
}
