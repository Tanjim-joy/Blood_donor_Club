export default function RequestList({ requests }) {
  if (!requests || requests.length === 0) {
    return <div className="empty">No open requests right now. Good news! 🎉</div>
  }

  const urgencyClass = {
    critical: 'urgency-critical',
    urgent: 'urgency-urgent',
    normal: '',
  }

  return (
    <div className="list">
      {requests.map(r => (
        <div className="card" key={r.id}>
          <div className="head">
            <h3>{r.patient_name}</h3>
            <span className="bg-badge">{r.blood_group}</span>
          </div>
          <div className="meta">
            🏥 <strong>{r.hospital}</strong><br />
            📍 {r.area}<br />
            💉 Units needed: <strong>{r.units}</strong><br />
            📞 Contact: <strong>{r.contact}</strong><br />
            {r.needed_by && <>⏰ Needed by: {new Date(r.needed_by).toLocaleString()}<br /></>}
            <span className={urgencyClass[r.urgency]}>
              {r.urgency === 'critical' && '🚨 CRITICAL — needed immediately'}
              {r.urgency === 'urgent' && '⚠️ URGENT — within hours'}
              {r.urgency === 'normal' && '🕐 Normal urgency'}
            </span>
            {r.requested_by && <><br />👤 Requested by: {r.requested_by}</>}
          </div>
        </div>
      ))}
    </div>
  )
}
