import { useState } from 'react'
import { createRequest } from '../api'

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

export default function RequestForm({ onCreated }) {
  const [form, setForm] = useState({
    patient_name: '', blood_group: '', units: 1, hospital: '',
    contact: '', area: '', needed_by: '', urgency: 'normal', requested_by: '',
  })
  const [status, setStatus] = useState({ type: '', msg: '' })
  const [loading, setLoading] = useState(false)

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setStatus({ type: '', msg: '' })
    setLoading(true)
    try {
      const payload = { ...form, units: parseInt(form.units) || 1 }
      await createRequest(payload)
      setStatus({ type: 'success', msg: '✅ Request posted! Donors will be notified.' })
      setForm({ patient_name: '', blood_group: '', units: 1, hospital: '', contact: '', area: '', needed_by: '', urgency: 'normal', requested_by: '' })
      onCreated?.()
    } catch (err) {
      setStatus({ type: 'error', msg: '❌ ' + (err.response?.data?.error || err.message) })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit}>
      <div className="form-grid">
        <div className="field">
          <label>Patient Name *</label>
          <input value={form.patient_name} onChange={update('patient_name')} required />
        </div>
        <div className="field">
          <label>Blood Group *</label>
          <select value={form.blood_group} onChange={update('blood_group')} required>
            <option value="">Select…</option>
            {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Units Needed *</label>
          <input type="number" min="1" max="10" value={form.units} onChange={update('units')} required />
        </div>
        <div className="field">
          <label>Urgency</label>
          <select value={form.urgency} onChange={update('urgency')}>
            <option value="normal">Normal (within 24h)</option>
            <option value="urgent">Urgent (within 6h)</option>
            <option value="critical">Critical (immediately)</option>
          </select>
        </div>
        <div className="field">
          <label>Hospital *</label>
          <input value={form.hospital} onChange={update('hospital')} required />
        </div>
        <div className="field">
          <label>Contact Number *</label>
          <input value={form.contact} onChange={update('contact')} required />
        </div>
        <div className="field">
          <label>Area *</label>
          <input value={form.area} onChange={update('area')} required placeholder="e.g. Mirpur" />
        </div>
        <div className="field">
          <label>Needed By (date/time)</label>
          <input type="datetime-local" value={form.needed_by} onChange={update('needed_by')} />
        </div>
        <div className="field field-full">
          <label>Your Name (requester)</label>
          <input value={form.requested_by} onChange={update('requested_by')} />
        </div>
      </div>
      <button className="submit-btn" type="submit" disabled={loading}>
        {loading ? 'Posting…' : '🆘 Post Blood Request'}
      </button>
      {status.msg && <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-error'}`}>{status.msg}</div>}
    </form>
  )
}
