import React, { useState, useRef, useEffect } from 'react';
import 'altcha';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const altchaPayloadRef = useRef(null);

  useEffect(() => {
    const widget = document.querySelector('altcha-widget');

    if (widget) {
      widget.addEventListener('statechange', (ev) => {
        console.log('ALTCHA state:', ev.detail.state);

        if (ev.detail.state === 'verified') {
          console.log('ALTCHA payload:', ev.detail.payload);
          altchaPayloadRef.current = ev.detail.payload; // Save verified payload
        } else if (ev.detail.state === 'error') {
          console.error('ALTCHA error:', ev.detail.error);
          altchaPayloadRef.current = null; // Clear payload if error occurs
        }
      });

      widget.addEventListener('error', (err) => {
        console.error('ALTCHA widget error:', err);
        altchaPayloadRef.current = null;
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    // Reset ALTCHA token for this attempt
    altchaPayloadRef.current = null;
    
  
    // Reset form fields (optional, based on your UX preference)
    setFormData({ name: '', email: '', message: '' });
  
    const widget = document.querySelector('altcha-widget');
    if (widget) {
      widget.reset(); // Reset ALTCHA widget (if supported)
    }
  
    // Retrieve ALTCHA token after resetting
    const altchaToken = altchaPayloadRef.current;
  
    if (!altchaToken) {
      setFormStatus('Captcha verification failed. Please complete the CAPTCHA again.');
      setIsSubmitting(false);
      return;
    }
  
    try {
      // Send form data and ALTCHA token to the backend
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, altchaToken }),
      });
  
      if (!response.ok) {
        let errorMessage;
  
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || 'An unexpected error occurred.';
        } catch {
          errorMessage = await response.text();
        }
  
        setFormStatus(`Error: ${errorMessage}`);
        throw new Error(errorMessage);
      }
  
      setFormStatus('Message sent successfully!');
    } catch (error) {
      console.error('Error:', error);
      setFormStatus('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section section-container">
      <h2 className="title-banner">Contact Me</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isSubmitting}
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
        <fieldset>
          <altcha-widget
            style={{ '--altcha-max-width': '100%' }}
            challengeurl="https://eu.altcha.org/api/v1/challenge?apiKey=ckey_01598c0f05be4c592ad4d425f0d8"
            spamfilter
          />
        </fieldset>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
      {formStatus && <p className="form-status">{formStatus}</p>}
    </section>
  );
}

export default Contact;
