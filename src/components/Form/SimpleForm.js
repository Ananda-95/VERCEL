import React, { useState } from "react";

const SimpleForm = () => {
  // State to hold form input values
  const [formData, setFormData] = useState({ name: "", email: "" });

  // State to hold submitted data
  const [submittedData, setSubmittedData] = useState([]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add current form data to the submitted data array
    setSubmittedData([...submittedData, formData]);
    // Clear form inputs
    setFormData({ name: "", email: "" });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2>Simple Form</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      <h3>Submitted Data</h3>
      {submittedData.length === 0 ? (
        <p>No data submitted yet.</p>
      ) : (
        <ul>
          {submittedData.map((data, index) => (
            <li key={index}>
              Name: {data.name}, Email: {data.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SimpleForm;
