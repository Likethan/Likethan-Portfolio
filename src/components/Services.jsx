import React from 'react';

export default function Services() {
  const servicesList = [
    {
      icon: '⚡',
      name: 'Full Stack Dev',
      desc: 'End-to-end web applications from polished UI to robust backend.',
      delayClass: '',
    },
    {
      icon: '🤖',
      name: 'AI Solutions',
      desc: 'AI model integration to build intelligent, data-driven apps.',
      delayClass: 'd1',
    },
    {
      icon: '🧠',
      name: 'Prompt Engineering',
      desc: 'Precision prompts and LLM workflows for optimal AI output.',
      delayClass: 'd2',
    },
    {
      icon: '🎨',
      name: 'Web Development',
      desc: 'Responsive, cinematic websites with premium animations.',
      delayClass: 'd3',
    },
    {
      icon: '🔐',
      name: 'Cyber Consultation',
      desc: 'Security assessment, OSINT analysis, vulnerability identification.',
      delayClass: '',
    },
  ];

  return (
    <section id="services">
      <div className="container">
        <div className="stag">What I Do</div>
        <h2 className="stitle reveal">Services &<br /><span className="gt">Offerings</span></h2>
        <div className="svgrid">
          {servicesList.map((svc, idx) => (
            <div key={idx} className={`svc reveal ${svc.delayClass}`}>
              <div className="svic">{svc.icon}</div>
              <div className="svn">{svc.name}</div>
              <p className="svd">{svc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
