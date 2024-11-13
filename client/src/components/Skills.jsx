import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';
import skillsData from '../data/Skills.json';
import '../style/Skills.css';

ChartJS.register(Tooltip, Legend, ArcElement);

// Plugin to draw logos inside each slice
const createDrawLogosPlugin = (skills) => ({
  id: 'drawLogos',
  afterDatasetDraw(chart) {
    const { ctx } = chart;
    const dataset = chart.data.datasets[0];
    

    dataset.data.forEach((data, index) => {
      const meta = chart.getDatasetMeta(0).data[index];
      const skillLogo = new Image();
      skillLogo.src = skills[index].logo;
      
      // Calculate the position for each logo in the middle of its pie slice
      const { x, y } = meta.tooltipPosition();
      const logoSize = 35; // Adjust logo size as needed

      // Draw each logo centered within the slice
      ctx.drawImage(skillLogo, x - logoSize / 2, y - logoSize / 2, logoSize, logoSize);
    });
  },
});

function Skills() {
  return (
    <section className="skills section-container right">
      <h2 className="skills-title title-banner">Compétences</h2>

      <div className="pie-chart-container">
        {skillsData.map((category) => {
          const pieData = {
            labels: category.skills.map(skill => skill.name),
            datasets: [
              {
                label: category.category,
                data: category.skills.map(skill =>
                  skill.level === 'Expert' ? 100 : skill.level === 'Advanced' ? 75 : 50
                ),
                backgroundColor: category.skills.map(skill => 'rgba(30, 30, 30, 0.3)'),
                hoverBackgroundColor: category.skills.map(skill => 'rgba(50, 50, 50, 0.8)'),
                borderColor: 'rgba(255, 255, 255, 0.8)',
                borderWidth: 1,
              },
            ],
          };

          const pieOptions = {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
              padding: 15, // Add padding for hover expansion
            },
            plugins: {
              legend: { display: false },
              tooltip: {
                enabled: false, // Disable default tooltip
              },
            },
            hoverOffset: 20,
          };

          const drawLogosPlugin = createDrawLogosPlugin(category.skills);

          return (
            <div key={category.category} className="category-container">
              <h3 className="category-title">{category.category}</h3>
              <div className="pie-chart-wrapper">
                <Pie
                  data={pieData}
                  options={pieOptions}
                  plugins={[drawLogosPlugin]}
                  width={300}
                  height={300}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Skills;
