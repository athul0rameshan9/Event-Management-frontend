import { useEffect, useState } from 'react';
import api from '../utils/api';
import './admindash.css';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
  });

  const fetchData = async () => {
    const eventRes = await api.get('/events');
    const regRes = await api.get('/registrations');
    setEvents(eventRes.data);
    setRegistrations(regRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteEvent = async (id) => {
    await api.delete(`/events/${id}`);
    fetchData();
  };

  const createEvent = async () => {
    if (newEvent.title && newEvent.description && newEvent.location && newEvent.date) {
      await api.post('/events', newEvent);
      fetchData();
      setShowCreateModal(false);
      setNewEvent({ title: '', description: '', location: '', date: '' });
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="p-4">
      <h2>Admin Dashboard</h2>
      <button onClick={() => setShowCreateModal(true)}>Create Event</button>
      <h3>Events</h3>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <p><strong>Title:</strong> {event.title}</p>
            <p><strong>Description:</strong> {event.description}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
            <button onClick={() => deleteEvent(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>Registrations</h3>
      <ul>
        {registrations.map((r) => (
          <li key={r.id}>
            <p><strong>User:</strong> {r.user_name}</p>
            <p><strong>Event ID:</strong> {r.event_id}</p>
          </li>
        ))}
      </ul>

      {showCreateModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Create Event</h3>
            <label>
              Title:
              <input
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
            </label>
            <label>
              Description:
              <textarea
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              />
            </label>
            <label>
              Date:
              <input
                type="datetime-local"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              />
            </label>
            <button onClick={createEvent}>Submit</button>
            <button onClick={() => setShowCreateModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
