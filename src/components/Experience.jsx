import React from 'react';

export default function Experience() {
  const experiences = [
    {
      date: '2024 — Present',
      role: 'Web Development Intern',
      company: 'Emglitz Technologies',
      description: 'Contributed to frontend and web development tasks, gaining industry-level exposure to production-grade software workflows, client requirements, and real-world development practices.',
      tags: ['HTML/CSS', 'JavaScript', 'Frontend Dev', 'UI/UX'],
      delayClass: '',
    },
    {
      date: '2024',
      role: 'Data Science Intern',
      company: 'Training Trains',
      description: 'Worked on data preprocessing pipelines, machine learning fundamentals, model evaluation strategies, and Python-based statistical analysis to extract actionable insights from datasets.',
      tags: ['Python', 'Machine Learning', 'Data Preprocessing', 'Model Evaluation'],
      delayClass: 'd1',
    },
  ];

  return (
    <section id="experience">
      <div className="container">
        <div className="stag">Career</div>
        <h2 className="stitle reveal">
          Work <span className="gt">Experience</span>
        </h2>
        <div className="tl">
          {experiences.map((exp, idx) => (
            <div key={idx} className={`tli reveal ${exp.delayClass}`}>
              <div className="tldot"></div>
              <div className="tldate">{exp.date}</div>
              <div className="tlrole">{exp.role}</div>
              <div className="tlco">{exp.company}</div>
              <div className="tldesc">{exp.description}</div>
              <div className="tags">
                {exp.tags.map((tag, tagIdx) => (
                  <span key={tagIdx} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
