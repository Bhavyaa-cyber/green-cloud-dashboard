// Mock data for AWS and Kubernetes services
let ec2Usage = 65; // EC2 usage in percentage
let s3Usage = 40; // S3 usage in percentage
let rdsUsage = 30; // RDS usage in percentage
let k8sPodsUsage = 50; // Kubernetes Pods usage in percentage

// Function to fetch data from the backend API
async function fetchResourceData() {
  try {
    const response = await fetch("http://localhost:3000/resources");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

// Function to update progress bars and text
function updateProgressBars(ec2Usage, s3Usage, rdsUsage, k8sPodsUsage) {
  // Update EC2
  document.getElementById("ec2-progress").style.width = `${ec2Usage}%`;
  document.getElementById("ec2-text").innerText = `${ec2Usage}% utilized`;

  // Update S3
  document.getElementById("s3-progress").style.width = `${s3Usage}%`;
  document.getElementById("s3-text").innerText = `${s3Usage}% utilized`;

  // Update RDS
  document.getElementById("rds-progress").style.width = `${rdsUsage}%`;
  document.getElementById("rds-text").innerText = `${rdsUsage}% utilized`;

  // Update Kubernetes Pods
  document.getElementById("k8s-pods-progress").style.width = `${k8sPodsUsage}%`;
  document.getElementById("k8s-pods-text").innerText = `${k8sPodsUsage}% utilized`;
}

// Function to update charts
function updateCharts(ec2Chart, s3Chart, rdsChart, k8sPodsChart, ec2Usage, s3Usage, rdsUsage, k8sPodsUsage) {
  ec2Chart.data.datasets[0].data = [ec2Usage];
  s3Chart.data.datasets[0].data = [s3Usage];
  rdsChart.data.datasets[0].data = [rdsUsage];
  k8sPodsChart.data.datasets[0].data = [k8sPodsUsage];
  ec2Chart.update();
  s3Chart.update();
  rdsChart.update();
  k8sPodsChart.update();
}

// Initialize Charts
const ec2Ctx = document.getElementById("ec2Chart").getContext("2d");
const ec2Chart = new Chart(ec2Ctx, {
  type: "bar",
  data: {
    labels: ["EC2 Usage"],
    datasets: [
      {
        label: "EC2 Usage (%)",
        data: [0],
        backgroundColor: "rgba(46, 139, 87, 0.6)",
        borderColor: "rgba(46, 139, 87, 1)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  },
});

const s3Ctx = document.getElementById("s3Chart").getContext("2d");
const s3Chart = new Chart(s3Ctx, {
  type: "bar",
  data: {
    labels: ["S3 Usage"],
    datasets: [
      {
        label: "S3 Usage (%)",
        data: [0],
        backgroundColor: "rgba(46, 139, 87, 0.6)",
        borderColor: "rgba(46, 139, 87, 1)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  },
});

const rdsCtx = document.getElementById("rdsChart").getContext("2d");
const rdsChart = new Chart(rdsCtx, {
  type: "bar",
  data: {
    labels: ["RDS Usage"],
    datasets: [
      {
        label: "RDS Usage (%)",
        data: [0],
        backgroundColor: "rgba(46, 139, 87, 0.6)",
        borderColor: "rgba(46, 139, 87, 1)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  },
});

const k8sPodsCtx = document.getElementById("k8sPodsChart").getContext("2d");
const k8sPodsChart = new Chart(k8sPodsCtx, {
  type: "bar",
  data: {
    labels: ["Kubernetes Pods Usage"],
    datasets: [
      {
        label: "Kubernetes Pods Usage (%)",
        data: [0],
        backgroundColor: "rgba(46, 139, 87, 0.6)",
        borderColor: "rgba(46, 139, 87, 1)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  },
});

// Function to fetch and update data periodically
async function updateDashboard() {
  const data = await fetchResourceData();
  if (data) {
    const { ec2, s3, rds, k8sPods } = data;
    updateProgressBars(ec2, s3, rds, k8sPods);
    updateCharts(ec2Chart, s3Chart, rdsChart, k8sPodsChart, ec2, s3, rds, k8sP