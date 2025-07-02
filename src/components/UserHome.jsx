import { useEffect, useState } from 'react';
import api from '../utils/api';
import './userhome.css'; // Assuming you have a CSS file for styling

const UserHome = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [userName, setUserName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    api.get('/events/').then((res) => setEvents(res.data));
  }, []);

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setUserName('');
    setIsModalOpen(false);
  };

  const register = async () => {
    if (userName) {
      try {
        await api.post('/register/', { user_name: userName, event_id: selectedEvent.id });
        alert('Registered successfully');
        closeModal();
      } catch (error) {
        alert('Registration failed. Please try again.');
      }
    } else {
      alert('Please enter your name.');
    }
  };

  return (
    <div className="p-4">
      <h2>Available Events</h2>
      <ul>
        {events.map((e) => (
          <li key={e.id} className="mb-4">
            <h3>{e.title}</h3>
            <p><strong>Description:</strong> {e.description}</p>
            <p><strong>Location:</strong> {e.location}</p>
            <p><strong>Date:</strong> {new Date(e.date).toLocaleString()}</p>
            <button onClick={() => openModal(e)}>Register</button>
          </li>
        ))}
      </ul>

      {isModalOpen && selectedEvent && (
        <div className="modal">
          <div className="modal-content">
            <h3>Register for Event</h3>
            <p><strong>Event ID:</strong> {selectedEvent.id}</p>
            <p><strong>Title:</strong> {selectedEvent.title}</p>
            <p><strong>Description:</strong> {selectedEvent.description}</p>
            <p><strong>Location:</strong> {selectedEvent.location}</p>
            <p><strong>Date:</strong> {new Date(selectedEvent.date).toLocaleString()}</p>
            <input
              type="text"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="input-field"
            />
            <div className="modal-actions">
              <button onClick={register} className="btn btn-primary">Submit</button>
              <button onClick={closeModal} className="btn btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHome;
