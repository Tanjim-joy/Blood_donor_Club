import { useEffect, useState } from 'react'
import { getDonors, getRequests, getStats } from './api'
import Hero from './components/Hero'
import Stats from './components/Stats'
import DonorForm from './components/DonorForm'
import RequestForm from './components/RequestForm'
import SearchDonors from './components/SearchDonors'
import RequestList from './components/RequestList'
import Footer from './components/Footer'
import './App.css'

export default function App() {
  const [donors, setDonors] = useState([])
  const [requests, setRequests] = useState([])
  const [stats, setStats] = useState(null)
  const [search, setSearch] = useState({ blood_group: '', area: '' })

  const refresh = async () => {
    try {
      const [d, r, s] = await Promise.all([
        getDonors(search),
        getRequests(),
        getStats(),
      ])
      setDonors(d.donors || [])
      setRequests(r.requests || [])
      setStats(s)
    } catch (e) {
      console.error('Fetch failed', e)
    }
  }

  useEffect(() => { refresh() }, [search.blood_group, search.area])

  return (
    <div className="app">
      <nav className="nav">
        <div className="container">
          <div className="logo">🩸 <span>RoktoDao</span></div>
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#stats">Stats</a>
            <a href="#register">Register</a>
            <a href="#search">Find Donor</a>
            <a href="#request">Request</a>
          </div>
        </div>
      </nav>

      <Hero />

      <section className="section" id="stats">
        <div className="container">
          <h2>Our Impact</h2>
          <p className="sub">Every drop counts. Here's what we've done together.</p>
          <Stats stats={stats} />
        </div>
      </section>

      <section className="section section-alt" id="register">
        <div className="container">
          <h2>Become a Donor</h2>
          <p className="sub">Register yourself. You might save a life tomorrow.</p>
          <DonorForm onCreated={refresh} />
        </div>
      </section>

      <section className="section" id="search">
        <div className="container">
          <h2>Find a Donor</h2>
          <p className="sub">Search by blood group and area.</p>
          <SearchDonors
            donors={donors}
            search={search}
            setSearch={setSearch}
          />
        </div>
      </section>

      <section className="section section-alt" id="request">
        <div className="container">
          <h2>Request Blood</h2>
          <p className="sub">In an emergency? Post a request. Our donors will respond.</p>
          <RequestForm onCreated={refresh} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Open Requests</h2>
          <p className="sub">People who need blood right now.</p>
          <RequestList requests={requests} />
        </div>
      </section>

      <Footer />
    </div>
  )
}
