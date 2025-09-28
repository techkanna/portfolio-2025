// MermaidChart.jsx
import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const MermaidChart = ({ chartDefinition }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      // Clear previous content to ensure re-rendering
      chartRef.current.innerHTML = ''; 

      // Initialize Mermaid (can be done once globally if preferred)
      mermaid.initialize({ startOnLoad: false }); 

      // Render the chart
      mermaid.render('mermaid-chart', chartDefinition, (svgCode) => {
        chartRef.current.innerHTML = svgCode;
      });
    }
  }, [chartDefinition]); // Re-render when chartDefinition changes

  return <div ref={chartRef} className="mermaid-container"></div>;
};

export default MermaidChart;