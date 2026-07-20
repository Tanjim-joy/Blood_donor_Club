const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

export default function SearchDonors({ donors, search, setSearch }) {
  return (
    <>
      <div className="search-bar">
        <select
          value={search.blood_group}
          onChange={(e) => setSearch({ ...search, blood_group: e.target.value })}
        >
          <option value="">All blood groups</option>
          {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
        </select>
        <input
          placeholder="Area (e.g. Chapai Nawabganj Sador)"
          value={search.area}
          onChange={(e) => setSearch({ ...search, area: e.target.value })}
        />
        <button onClick={() => setSearch({ blood_group: '', area: '' })} className="secondary">Clear</button>
      </div>

      {donors.length === 0 ? (
        <div className="empty">No donors match your search. Try clearing the filters.</div>
      ) : (
        <div className="list">
          {donors.map(d => (
            <div className="card" key={d.id}>
              <div className="head">
                <h3>{d.name}</h3>
                <span className="bg-badge">{d.blood_group}</span>
              </div>
              <div className="meta">
                📞 <strong>{d.phone}</strong><br />
                📍 {d.area}{d.city ? `, ${d.city}` : ''}<br />
                {d.available
                  ? <span style={{ color: 'var(--success)', fontWeight: 600 }}>● Available</span>
                  : <span style={{ color: 'var(--muted)' }}>○ Not available</span>}
                {d.notes && <><br />📝 {d.notes}</>}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
