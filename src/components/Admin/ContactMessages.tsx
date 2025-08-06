import React from 'react';

const ContactMessages = () => {
  const messages = [
    { id: 1, name: 'John Doe', email: 'john@example.com', message: 'I love your products!' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', message: 'Do you offer discounts for bulk orders?' },
  ];

  return (
    <div className="card shadow rounded-4 p-4">
      <h3 className="mb-4"><i className={`fas fa-phone`}></i> Contact Messages</h3>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {messages.map(msg => (
              <tr key={msg.id}>
                <td>{msg.id}</td>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactMessages;
