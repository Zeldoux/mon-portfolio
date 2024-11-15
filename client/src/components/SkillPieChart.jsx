// src/components/SkillPieChart.js

import React, { useRef, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

import { Chart as ChartJS, registerables } from 'chart.js';

// Register all necessary Chart.js components
ChartJS.register(...registerables);

function SkillPieChart({ category }) {
  // Reference to the chart instance
  const chartRef = useRef(null);

  // Cleanup effect to remove the tooltip element when the component unmounts
  useEffect(() => {
    return () => {
      const tooltipEl = document.getElementById('chartjs-tooltip');
      if (tooltipEl) {
        tooltipEl.remove();
      }
    };
  }, []);

  // Create an object to store loaded images
  const loadedImages = {};

  // Data for the chart
  const pieData = {
    labels: category.skills.map((skill) => skill.name),
    datasets: [
      {
        label: category.category,
        data: category.skills.map((skill) =>
          skill.level === 'Expert' ? 100 : skill.level === 'Advanced' ? 75 : 50
        ),
        backgroundColor: category.skills.map(() => 'rgba(30, 30, 30, 0.3)'),
        hoverBackgroundColor: category.skills.map(() => 'rgba(50, 50, 50, 0.8)'),
        borderColor: 'rgba(255, 255, 255, 0.8)',
        borderWidth: 1,
      },
    ],
  };

  // External tooltip handler function
  function externalTooltipHandler(context) {
    const { chart, tooltip } = context;

    let tooltipEl = document.getElementById('chartjs-tooltip');

    // Create tooltip element on first render
    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.id = 'chartjs-tooltip';
      tooltipEl.innerHTML = '<div class="tooltip-content"></div>';
      document.body.appendChild(tooltipEl);
    }

    // Hide the tooltip if it's not visible
    if (!tooltip || tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }

    // Set the content of the tooltip
    if (tooltip.body && tooltip.dataPoints && tooltip.dataPoints.length > 0) {
      const index = tooltip.dataPoints[0].dataIndex;

      // Check if the index is valid
      if (category.skills && category.skills[index]) {
        const skill = category.skills[index];

        const tooltipContent = tooltipEl.querySelector('.tooltip-content');
        tooltipContent.innerHTML = `
          <img src="${skill.logo}" alt="${skill.name}" class="tooltip-logo">
          <div>
            <strong>${skill.name}</strong>
            <p>${skill.description}</p>
          </div>
        `;
      } else {
        // Hide the tooltip if the skill doesn't exist
        tooltipEl.style.opacity = 0;
        return;
      }
    } else {
      // Hide the tooltip if there's no data
      tooltipEl.style.opacity = 0;
      return;
    }

    // Position the tooltip
    const position = chart.canvas.getBoundingClientRect();

    // Display, position, and style the tooltip
    tooltipEl.style.opacity = 1;
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.left =
      position.left + window.pageXOffset + tooltip.caretX + 'px';
    tooltipEl.style.top =
      position.top + window.pageYOffset + tooltip.caretY + 'px';
    tooltipEl.style.pointerEvents = 'none';
  }

  // Chart options with external tooltip handler
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 15,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: false, // Disable the default tooltip
        external: externalTooltipHandler, // Use our external tooltip handler
      },
    },
    hoverOffset: 20,
  };

  // Plugin to draw logos in each slice of the chart
  const drawLogosPlugin = {
    id: 'drawLogos',
    afterDatasetDraw(chart) {
      const { ctx } = chart;
      const dataset = chart.data.datasets[0];

      dataset.data.forEach((data, index) => {
        const meta = chart.getDatasetMeta(0).data[index];

        // Check if the skill exists
        if (category.skills && category.skills[index]) {
          const skill = category.skills[index];

          // Check if the image is already loaded
          let skillLogo = loadedImages[skill.logo];

          if (!skillLogo) {
            // If the image is not loaded, load it
            skillLogo = new Image();
            skillLogo.src = skill.logo;

            // Store the image in loadedImages once it's loaded
            skillLogo.onload = () => {
              loadedImages[skill.logo] = skillLogo;

              // Redraw the chart to display the loaded image
              if (chart && chart.ctx) {
                chart.update();
              }
            };

            // Store the image even if it's not yet loaded to avoid reloading
            loadedImages[skill.logo] = skillLogo;
          }

          // Draw the image if it's loaded
          if (skillLogo.complete) {
            const { x, y } = meta.tooltipPosition();
            const logoSize = 35;

            ctx.drawImage(
              skillLogo,
              x - logoSize / 2,
              y - logoSize / 2,
              logoSize,
              logoSize
            );
          }
        }
      });
    },
  };

  return (
    <div className="category-container">
      <h3 className="category-title">{category.category}</h3>
      <div className="pie-chart-wrapper" style={{ position: 'relative' }}>
        <Pie
          ref={chartRef}
          data={pieData}
          options={pieOptions}
          plugins={[drawLogosPlugin]}
          width={300}
          height={300}
        />
      </div>
    </div>
  );
}

export default SkillPieChart;
