import React from 'react';

export default function Skills() {
  const skillCategories = [
    {
      title: 'Frontend',
      delayClass: '',
      items: ['HTML5', 'CSS3', 'JavaScript', 'React'],
    },
    {
      title: 'Backend',
      delayClass: 'd1',
      items: ['Python', 'Flask', 'REST APIs', 'MySQL'],
    },
    {
      title: 'AI & Data Science',
      delayClass: 'd2',
      items: ['Machine Learning', 'Data Analysis', 'Prompt Engineering', 'Gemini API'],
    },
    {
      title: 'Cybersecurity',
      delayClass: 'd1',
      items: ['Ethical Hacking', 'OSINT', 'Security Assessment', 'CTF Challenges'],
    },
    {
      title: 'Hardware / Tools',
      delayClass: 'd2',
      items: ['Arduino', 'Raspberry Pi', 'Jupyter Notebook', 'Google Colab'],
    },
    {
      title: 'Core CS',
      delayClass: 'd3',
      items: ['DBMS', 'Data Structures', 'Algorithms', 'System Design'],
    },
  ];

  return (
    <section id="skills">
      <div className="container">
        <div className="stag">Expertise</div>
        <h2 className="stitle reveal">
          Skills & <span className="gt">Technologies</span>
        </h2>
        <p className="ssub reveal d1">
          Full-spectrum toolkit spanning frontend, backend, AI, security, and hardware.
        </p>
        <div className="skgrid">
          {skillCategories.map((category, idx) => (
            <div key={idx} className={`skc reveal ${category.delayClass}`}>
              <div className="skct">{category.title}</div>
              {category.items.map((item, itemIdx) => (
                <div key={itemIdx} className="ski">
                  <span className="skd"></span>
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
