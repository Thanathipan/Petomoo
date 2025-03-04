import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>TBD</h2>
        <nav>
          <ul>
            <li className="active">Dashboard</li>
            <li>Users</li>
            <li>Notification <span className="badge">3</span></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="content">
        {/* Header */}
        <header className="topbar">
          <input type="text" placeholder="Search..." />
          <div className="profile">
            <span>Austin Robertson</span>
            <p>Marketing Administrator</p>
          </div>
        </header>

        {/* Stats Cards */}
        <section className="stats">
          <div className="card">
            <h3>Total number of users</h3>
            <p>24</p>
          </div>
          <div className="card">
            <h3>Total number of farmers</h3>
            <p>3</p>
          </div>
          <div className="card">
            <h3>Total number of buyers</h3>
            <p>10</p>
          </div>
          <div className="card">
            <h3>Total number of laborers</h3>
            <p>11</p>
          </div>
        </section>

        {/* Tasks Table */}
        <section className="tasks">
          <h2>Tasks</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone number</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array(8).fill({
                name: "Lorem ipsum dolor",
                email: "loremipsumdolor@gmail.com",
                phone: "088 672 5625",
                role: "Farmer",
              }).map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="delete-btn">✖</button>
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

export default Dashboard;
