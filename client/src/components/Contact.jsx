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
  const altchaRef = useRef();

  useEffect(() => {
    const widget = document.querySelector('altcha-widget');
    if (widget) {
      widget.addEventListener('statechange', (ev) => {
        console.log('ALTCHA state:', ev.detail.state);
        if (ev.detail.state === 'verified') {
          console.log('ALTCHA payload:', ev.detail.payload);
        }
      });

      widget.addEventListener('error', (err) => {
        console.error('ALTCHA error:', err);
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

    const altchaToken = altchaRef.current?.value;

    if (!altchaToken) {
      setFormStatus('Captcha verification failed.');
      console.error('No ALTCHA token received.');
      setIsSubmitting(false);
      return;
    }

    console.log('ALTCHA Token:', altchaToken);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, altchaToken }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      setFormStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
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
            ref={altchaRef}
            style={{ '--altcha-max-width': '100%' }}
            challengeurl="/altcha-challenge"
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
