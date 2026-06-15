import React from 'react';

export default function Trust() {
  const trustItems = [
    {
      emoji: '🚀',
      name: 'Innovation-First',
      text: 'Exploring emerging technologies and applying them to solve real problems creatively.',
      delayClass: '',
    },
    {
      emoji: '🎯',
      name: 'Precision Engineering',
      text: 'Clean architecture, readable code, and thoughtful system design at every layer.',
      delayClass: 'd1',
    },
    {
      emoji: '🤝',
      name: 'Collaborative Spirit',
      text: 'Strong team player with leadership experience, driving projects from idea to deploy.',
      delayClass: 'd2',
    },
    {
      emoji: '⚡',
      name: 'Fast Execution',
      text: 'Rapid prototyping and delivery without sacrificing quality or standards.',
      delayClass: 'd3',
    },
  ];

  return (
    <section id="trust">
      <div className="container" style={{ textAlign: 'center' }}>
        <div className="stag" style={{ margin: '0 auto 1rem' }}>Philosophy</div>
        <h2 className="stitle reveal" style={{ margin: '0 auto 1rem' }}>
          "Building Intelligent<br />
          <span className="gt">Digital Experiences"</span>
        </h2>
        <p className="ssub reveal d1" style={{ margin: '0 auto 2.75rem' }}>
          Every project is a commitment to excellence — combining technical rigor with creative vision to build solutions that matter.
        </p>
        <div className="trgrid">
          {trustItems.map((item, idx) => (
            <div key={idx} className={`trc reveal ${item.delayClass}`}>
              <div className="tremo">{item.emoji}</div>
              <div className="trn">{item.name}</div>
              <p className="trt2">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
