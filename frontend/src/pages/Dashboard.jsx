import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [hasProfile, setHasProfile] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(userData));

    fetch('http://localhost:3001/api/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setHasProfile(data.hasProfile && data.hasPreferences);
      })
      .catch((err) => console.error('Profile check failed:', err));
  }, [navigate]);

  if (!user) return <div className="page-loading">Loading...</div>;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p className="dashboard-subtitle">Welcome, {user.username || user.email}!</p>
        </div>
      </header>

      {!hasProfile && (
        <section className="dashboard-card incomplete-profile">
          <div className="incomplete-profile-text">
            <h3>Complete your profile</h3>
            <p>Fill out your housing preferences so we can start matching you with roommates.</p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/onboarding')}>
            Complete Profile
          </button>
        </section>
      )}

      <section className="dashboard-card">
        <h3>How to use Bruin Match</h3>
        <ul>
            <>
              <li>Create your profile with housing preferences.</li>
              <li>Browse potential roommates based on your vibe.</li>
              <li>Send invites to start a group.</li>
              <li>Start chatting!</li>
            </>
        </ul>
      </section>
    </div>
  );
}

export default Dashboard;