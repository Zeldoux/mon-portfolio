// src/components/Skills.js
import React from 'react';
import skillsData from '../data/Skills.json';
import '../style/Skills.css';
import SkillPieChart from './SkillPieChart';

function Skills() {
  return (
    <section className="skills section-container right">
      <h2 className="skills-title title-banner">Compétences</h2>

      <div className="pie-chart-container">
        {skillsData.map((category) => (
          <SkillPieChart key={category.category} category={category} />
        ))}
      </div>
    </section>
  );
}

export default Skills;