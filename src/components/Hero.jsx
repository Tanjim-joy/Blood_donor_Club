export default function Hero() {
  return (
    <header className="hero" id="home">
      <div className="pulse">🩸</div>
      <h1>Donate Blood. Save Lives.</h1>
      <p>
        A small act of kindness can give someone a lifetime.
        Join our community of voluntary blood donors and be the reason someone goes home.
      </p>
      <div className="cta-group">
        <a href="#register" className="btn btn-primary">Register as Donor</a>
        <a href="#request" className="btn btn-ghost">Request Blood</a>
      </div>
    </header>
  )
}
