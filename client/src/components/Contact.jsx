// src/components/Contact.js

import React, { useState } from 'react';
import '../style/Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true); // submit start

    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        setIsSubmitting(false); // submit end
        if (!response.ok) throw new Error('Failed to send message');
        return response.json();
      })
      .then(() => {
        setFormStatus('Message envoyé avec succès !');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch(() => {
        setFormStatus('Erreur lors de l\'envoi du message. Veuillez réessayer.');
      });
  };

  return (
    <section className="contact-section">
      <h2 className="title-banner">Me Contacter</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <label>
          Nom
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isSubmitting} // disable while submit is going on 
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </label>
        <label>
          Message
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </label>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer un Message'}
        </button>
      </form>
      {formStatus && <p className="form-status">{formStatus}</p>}
    </section>
  );
}

export default Contact;