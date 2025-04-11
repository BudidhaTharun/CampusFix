import React from 'react';
import { Wrench, Zap, Scissors } from 'lucide-react';

export default function Services() {
  const styles = {
    page: {
      background: '#F9FAFB',
      color: '#1F2937',
      padding: '4rem',
      minHeight: '100vh',
      textAlign: 'center',
      fontFamily: 'Inter, sans-serif',
      boxSizing: 'border-box',
    },
    title: {
      fontSize: '2.5rem',
      marginBottom: '0.5rem',
      background: 'linear-gradient(135deg, #7678f6 0%, #d9a7c7 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    subtitle: {
      fontSize: '1rem',
      marginBottom: '2rem',
      opacity: 0.8,
      maxWidth: '600px',
      margin: '0 auto 2rem',
    },
    list: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '2rem',
      marginTop: '2rem',
    },
    card: {
      background: '#ffffff',
      borderRadius: '1rem',
      padding: '2rem',
      width: '250px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
    },
    cardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
    },
    cardIcon: {
      color: '#10B981',
    },
    cardTitle: {
      margin: '1rem 0 0.5rem',
      fontSize: '1.25rem',
    },
    cardText: {
      fontSize: '0.9rem',
      opacity: 0.8,
      lineHeight: 1.4,
    },
  };

  // simple hover effect state
  const [hovered, setHovered] = React.useState(null);

  const services = [
    {
      Icon: Wrench,
      title: 'Plumbing',
      desc: 'Emergency pipe repairs, leak fixes, and drainage solutions.',
    },
    {
      Icon: Zap,
      title: 'Electrical',
      desc:
        'Fast response for wiring issues, power outages, and appliance repairs.',
    },
    {
      Icon: Scissors,
      title: 'Carpentry',
      desc:
        'Furniture repairs, door/window fixes, and custom installations.',
    },
  ];

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Our Services</h1>
      <p style={styles.subtitle}>
        We keep your campus running smoothly with expert maintenance and
        support.
      </p>
      <div style={styles.list}>
        {services.map((svc, idx) => {
          const isHovered = hovered === idx;
          return (
            <div
              key={idx}
              style={{
                ...styles.card,
                ...(isHovered ? styles.cardHover : {}),
              }}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              <svc.Icon size={48} style={styles.cardIcon} />
              <h2 style={styles.cardTitle}>{svc.title}</h2>
              <p style={styles.cardText}>{svc.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
