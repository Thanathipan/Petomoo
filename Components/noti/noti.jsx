import React from "react";
import "./niti.css";

const notifications = Array(10).fill({
  timestamp: "2024 / 12 / 29 - 12 : 25 : 49 P.M.",
  message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
});

const Notifications = () => {
  return (
    <div className="notifications-container">
      <aside className="sidebar">
        <h2>TBD</h2>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Users</li>
            <li className="active">Notification <span className="badge">8</span></li>
          </ul>
        </nav>
      </aside>
      
      <main className="content">
        <header className="topbar">
          <input type="text" placeholder="Search..." />
          <div className="profile">
            <span>Austin Robertson</span>
            <p>Marketing Administrator</p>
          </div>
        </header>
        
        <section className="notifications">
          <h1>Notifications</h1>
          <table>
            <thead>
              <tr>
                <th>Time Stamp</th>
                <th>Notification</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notif, index) => (
                <tr key={index}>
                  <td>{notif.timestamp}</td>
                  <td>{notif.message}</td>
                  <td>
                    <button className="delete-btn">🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Notifications;
