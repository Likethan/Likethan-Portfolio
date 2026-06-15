import React from 'react';

export default function Certifications() {
  const certs = [
    {
      badge: '🤖',
      name: 'Arduino Robotics',
      issuer: 'Top Engineers, Chennai',
      delayClass: '',
    },
    {
      badge: '📡',
      name: 'IoT using Python & Raspberry Pi',
      issuer: 'Industry Certification',
      delayClass: 'd1',
    },
    {
      badge: '🔐',
      name: 'Ethical Hacking & Cyber Security',
      issuer: 'CTF Challenge Certified',
      delayClass: 'd2',
    },
    {
      badge: '💡',
      name: 'Tech Byte 2024 Workshop',
      issuer: 'Technical Excellence Award',
      delayClass: 'd3',
    },
  ];

  return (
    <section id="certifications">
      <div className="container">
        <div className="stag">Credentials</div>
        <h2 className="stitle reveal">Certifications &<br /><span className="gt">Achievements</span></h2>
        <div className="cgrid">
          {certs.map((cert, idx) => (
            <div key={idx} className={`cc reveal ${cert.delayClass}`}>
              <div className="cbadge">{cert.badge}</div>
              <div className="cname">{cert.name}</div>
              <div className="ciss">{cert.issuer}</div>
              <div className="cver">✓ Verified</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
