import React from 'react';

export default function Marquee() {
  const skills = [
    { icon: '⚡', name: 'HTML' },
    { icon: '🎨', name: 'CSS' },
    { icon: '🛠', name: 'JavaScript' },
    { icon: '🐍', name: 'Python' },
    { icon: '⚗️', name: 'Flask' },
    { icon: '⚛️', name: 'React' },
    { icon: '🗄️', name: 'MySQL' },
    { icon: '🤖', name: 'Machine Learning' },
    { icon: '🧠', name: 'Gemini API' },
    { icon: '🔐', name: 'Cybersecurity' },
    { icon: '📡', name: 'IoT' },
    { icon: '🔬', name: 'OSINT' },
  ];

  // Repeat twice for seamless infinite scrolling
  const repeatedSkills = [...skills, ...skills];

  return (
    <div id="mq">
      <div className="mqt">
        {repeatedSkills.map((skill, index) => (
          <React.Fragment key={index}>
            <span className="mqi">
              {skill.icon} {skill.name}
            </span>
            {index < repeatedSkills.length - 1 && <span className="mqs">·</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
