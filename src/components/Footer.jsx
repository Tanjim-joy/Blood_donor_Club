export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>🩸 <strong>RoktoDao</strong> — A non-profit blood donor community</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
          Built with ❤️ for social welfare. Every donor is a hero.
        </p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', opacity: 0.7 }}>
          © {new Date().getFullYear()} RoktoDao. Free to use for humanitarian causes.
        </p>
      </div>
    </footer>
  )
}
