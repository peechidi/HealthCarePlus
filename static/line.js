// Data for disease trends (example data)
const diseaseTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [{
      label: 'COVID-19',
      data: [30, 50, 45, 60, 70, 80, 75, 90, 100, 110],
      borderColor: '#00796b',
      fill: false
    },
    {
      label: 'MonkeyPox',
      data: [20, 35, 40, 55, 65, 75, 70, 85, 95, 105],
      borderColor: '#4caf50',
      fill: false
    },
    {
      label: 'Cholera',
      data: [19, 23, 50, 60, 65, 71, 56, 85, 95, 100],
      borderColor: '#f57c00',
      fill: false
    }
  ]
  };
  
  // Configuration for line chart
  const config = {
    type: 'line',
    data: diseaseTrendData,
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Months'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Cases'
          },
          beginAtZero: true
        }
      }
    }
  };
  
  // Render the chart
  const ctx = document.getElementById('diseaseTrendChart').getContext('2d');
  new Chart(ctx, config);

  // Sample heatmap data: [region, disease A cases, disease B cases, etc.]
  const heatmapData = [
    { region: 'North', diseasea: 80, diseaseb: 70 },  // lowercase keys for diseaseA and diseaseB
    { region: 'South', diseasea: 100, diseaseb: 95 },
    { region: 'East', diseasea: 65, diseaseb: 60 },
    { region: 'West', diseasea: 120, diseaseb: 110 }
  ];
  
  
  // Set dimensions and margins
  const margin = { top: 30, right: 30, bottom: 50, left: 80 },
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
  
  // Append SVG object to the body
  const svg = d3.select("#heatmap")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
  // X axis: Disease types
  const diseaseTypes = ['Disease A', 'Disease B'];
  const x = d3.scaleBand()
    .range([0, width])
    .domain(diseaseTypes)
    .padding(0.05);
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));
  
  // Y axis: Regions
  const y = d3.scaleBand()
    .range([height, 0])
    .domain(heatmapData.map(d => d.region))
    .padding(0.05);
  svg.append("g")
    .call(d3.axisLeft(y));
  
  // Color scale
  const colorScale = d3.scaleSequential()
    .interpolator(d3.interpolateBlues)
    .domain([0, 150]);  // Maximum cases
  
  // Create the heatmap squares
  svg.selectAll()
  .data(heatmapData)
  .enter()
  .selectAll("rect")
  .data(d => diseaseTypes.map(type => {
    const key = type.toLowerCase().replace(' ', ''); // 'Disease A' becomes 'diseasea'
    return { region: d.region, disease: type, value: d[key] };
  }))
  .enter()
  .append("rect")
  .attr("x", d => x(d.disease))
  .attr("y", d => y(d.region))
  .attr("width", x.bandwidth())
  .attr("height", y.bandwidth())
  .style("fill", d => colorScale(d.value));

  
  // Add title to heatmap squares
  svg.selectAll("rect")
    .append("title")
    .text(d => `Region: ${d.region}\nDisease: ${d.disease}\nCases: ${d.value}`);
  
    // Bar Chart Configuration
const barChartConfig = {
  type: 'bar',
  data: {
    labels: ['COVID-19', 'MonkeyPox', 'Cholera'],
    datasets: [{
      label: 'Cases',
      data: [300, 150, 100],
      backgroundColor: ['#4caf50', '#f57c00', '#d32f2f']
    }]
  },
  options: { responsive: true }
};

// Render Bar Chart
const barCtx = document.getElementById('diseaseBarChart').getContext('2d');
new Chart(barCtx, barChartConfig);

// Pie Chart Configuration
const pieChartConfig = {
  type: 'pie',
  data: {
    labels: ['COVID-19', 'MonkeyPox', 'Cholera'],
    datasets: [{
      data: [40, 35, 25],
      backgroundColor: ['#4caf50', '#f57c00', '#d32f2f']
    }]
  },
  options: { responsive: true }
};

// Render Pie Chart
const pieCtx = document.getElementById('diseasePieChart').getContext('2d');
new Chart(pieCtx, pieChartConfig);
