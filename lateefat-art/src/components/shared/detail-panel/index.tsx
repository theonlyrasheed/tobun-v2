import * as React from "react";
import ReactDOM from "react-dom";

export interface DetailRecord {
  kicker?: string;
  title: string;
  meta?: readonly string[];
  img?: string;
  paragraphs?: readonly string[];
  gallery?: readonly string[];
  cta?: { label: string; href: string };
}

interface DetailPanelProps {
  open: boolean;
  record: DetailRecord | null;
  onClose: () => void;
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="3" y1="3" x2="15" y2="15"/><line x1="15" y1="3" x2="3" y2="15"/>
    </svg>
  );
}

export function DetailPanel({ open, record, onClose }: DetailPanelProps) {
  const sheetRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    sheetRef.current?.focus();
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!record) return null;

  const panel = (
    <div className={`detail-panel${open ? " open" : ""}`} role="dialog" aria-modal="true" aria-label={record.title}>
      <div className="dp-scrim" onClick={onClose} aria-hidden="true" />
      <div className="dp-sheet" ref={sheetRef} tabIndex={-1}>
        <button className="dp-x" onClick={onClose} aria-label="Close panel">
          <CloseIcon />
        </button>

        {record.img && (
          <div className="dp-media">
            <img src={record.img} alt={record.title} />
          </div>
        )}

        <div className="dp-content">
          {record.kicker && <p className="dp-kicker">{record.kicker}</p>}
          <h2 className="dp-title">{record.title}</h2>

          {record.meta && record.meta.length > 0 && (
            <div className="dp-meta">
              {record.meta.map((m) => (
                <span key={m} className="dp-chip">{m}</span>
              ))}
            </div>
          )}

          {record.paragraphs && record.paragraphs.length > 0 && (
            <div className="dp-text">
              {record.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          )}

          {record.gallery && record.gallery.length > 0 && (
            <div className="dp-gallery">
              {record.gallery.map((src, i) => (
                <div key={i} className="dp-thumb">
                  <img src={src} alt="" loading="lazy" />
                </div>
              ))}
            </div>
          )}

          {record.cta && (
            <div className="dp-cta">
              <a href={record.cta.href} className="btn btn-primary">{record.cta.label}</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;
  return ReactDOM.createPortal(panel, document.body);
}
