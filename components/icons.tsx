type P = { className?: string };

export function WhatsAppIcon({ className = "size-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.71.23 1.36.2 1.88.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.8h-.01a9.74 9.74 0 0 1-4.97-1.36l-.36-.21-3.69.97.99-3.6-.23-.37a9.75 9.75 0 0 1-1.5-5.2c0-5.38 4.39-9.76 9.78-9.76 2.6 0 5.06 1.02 6.9 2.87a9.7 9.7 0 0 1 2.85 6.9c0 5.39-4.38 9.77-9.76 9.77zm8.3-18.07A11.65 11.65 0 0 0 12.04.3C5.58.3.32 5.56.32 12.02c0 2.07.54 4.08 1.57 5.86L.22 24l6.27-1.64a11.7 11.7 0 0 0 5.55 1.41h.01c6.46 0 11.72-5.26 11.72-11.72 0-3.13-1.22-6.07-3.43-8.29z" />
    </svg>
  );
}

export function InstagramIcon({ className = "size-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ArrowIcon({ className = "size-4" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={`arrow ${className}`} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
