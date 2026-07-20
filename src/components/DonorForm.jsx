import { useState } from 'react'
import { createDonor } from '../api'

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

export default function DonorForm({ onCreated }) {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', blood_group: '', age: '', gender: '',
    area: '', city: '', notes: '', available: true,
  })
  const [status, setStatus] = useState({ type: '', msg: '' })
  const [loading, setLoading] = useState(false)

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setStatus({ type: '', msg: '' })
    setLoading(true)
    try {
      const payload = { ...form, age: form.age ? parseInt(form.age) : 0 }
      await createDonor(payload)
      setStatus({ type: 'success', msg: '✅ Thank you! You are registered as a donor.' })
      setForm({ name: '', phone: '', email: '', blood_group: '', age: '', gender: '', area: '', city: '', notes: '', available: true })
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
          <label>Full Name *</label>
          <input value={form.name} onChange={update('name')} required />
        </div>
        <div className="field">
          <label>Phone *</label>
          <input value={form.phone} onChange={update('phone')} required />
        </div>
        <div className="field">
          <label>Email</label>
          <input type="email" value={form.email} onChange={update('email')} />
        </div>
        <div className="field">
          <label>Blood Group *</label>
          <select value={form.blood_group} onChange={update('blood_group')} required>
            <option value="">Select…</option>
            {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Age</label>
          <input type="number" min="18" max="65" value={form.age} onChange={update('age')} />
        </div>
        <div className="field">
          <label>Gender</label>
          <select value={form.gender} onChange={update('gender')}>
            <option value="">Select…</option>
            <option>Male</option><option>Female</option><option>Other</option>
          </select>
        </div>
        <div className="field">
          <label>Area / Thana *</label>
          <input value={form.area} onChange={update('area')} required placeholder="e.g. Mistreepara" />
        </div>
        <div className="field">
          <label>City *</label>
          <input value={form.city} onChange={update('city')} required placeholder="e.g. Chapai Nawabgan" />
        </div>
        <div className="field field-full">
          <label>Notes (last donation, health conditions, etc.)</label>
          <textarea rows="2" value={form.notes} onChange={update('notes')} />
        </div>
        <div className="field field-full">
          <label className="checkbox-row">
            <input type="checkbox" checked={form.available} onChange={(e) => setForm({...form, available: e.target.checked})} />
            I am currently available to donate
          </label>
        </div>
      </div>
      <button className="submit-btn" type="submit" disabled={loading}>
        {loading ? 'Submitting…' : '🩸 Register as Donor'}
      </button>
      {status.msg && <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-error'}`}>{status.msg}</div>}
    </form>
  )
}
