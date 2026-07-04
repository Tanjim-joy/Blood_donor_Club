export default function Stats({ stats }) {
  if (!stats) return <div className="empty">Loading stats…</div>

  const groups = stats.donors_by_blood || []

  return (
    <>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="num">{stats.total_donors || 0}</div>
          <div className="label">Registered Donors</div>
        </div>
        <div className="stat-card">
          <div className="num">{stats.open_requests || 0}</div>
          <div className="label">Open Requests</div>
        </div>
        <div className="stat-card">
          <div className="num">{stats.fulfilled_requests || 0}</div>
          <div className="label">Lives Saved</div>
        </div>
        <div className="stat-card">
          <div className="num">{stats.total_requests || 0}</div>
          <div className="label">Total Requests</div>
        </div>
      </div>

      {groups.length > 0 && (
        <>
          <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--primary-dark)' }}>
            Donors by Blood Group
          </h3>
          <div className="blood-breakdown">
            {groups.map(g => (
              <div className="blood-pill" key={g.blood_group}>
                <div className="count">{g.count}</div>
                <div className="group">{g.blood_group}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}
