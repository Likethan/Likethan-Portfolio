import React from 'react';

export default function Projects() {
  const otherProjects = [
    {
      icon: '🔐',
      name: 'Cyber Analyzer',
      description: 'Cybersecurity assessment tool using OSINT-based vulnerability analysis to identify security weaknesses and deliver actionable security recommendations.',
      tags: ['Python', 'OSINT', 'Security'],
      link: 'https://github.com/Likethan',
      delayClass: '',
    },
    {
      icon: '📡',
      name: 'IoT Monitoring System',
      description: 'Raspberry Pi & Python-powered IoT sensor dashboard with real-time data collection, analysis, and remote monitoring for smart environments.',
      tags: ['Raspberry Pi', 'Python', 'IoT'],
      link: 'https://github.com/Likethan',
      delayClass: 'd1',
    },
    {
      icon: '🤖',
      name: 'Robotics Automation',
      description: 'Arduino-based robotics project with autonomous navigation logic, sensor fusion, and real-time motor control for intelligent task automation.',
      tags: ['Arduino', 'C++', 'Robotics'],
      link: 'https://github.com/Likethan',
      delayClass: 'd2',
    },
  ];

  return (
    <section id="projects">
      <div className="container">
        <div className="stag">More Work</div>
        <h2 className="stitle reveal">Other <span className="gt">Projects</span></h2>
        <div className="pgrid">
          {otherProjects.map((proj, idx) => (
            <div key={idx} className={`pcard reveal ${proj.delayClass}`}>
              <div className="pico">{proj.icon}</div>
              <div className="pname">{proj.name}</div>
              <p className="pdesc">{proj.description}</p>
              <div className="tags" style={{ marginBottom: '1rem' }}>
                {proj.tags.map((tag, tagIdx) => (
                  <span key={tagIdx} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <a href={proj.link} target="_blank" rel="noopener noreferrer" className="plink">
                ⌥ GitHub →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
