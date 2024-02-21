function plotGraph() {
  const a = parseFloat(document.getElementById('a').value);
  const b = parseFloat(document.getElementById('b').value);
  const c = parseFloat(document.getElementById('c').value);

  // Remove the existing canvas element
  const oldCanvas = document.getElementById('graphCanvas');
  const parent = oldCanvas.parentNode;
  parent.removeChild(oldCanvas);

  // Create a new canvas element
  const newCanvas = document.createElement('canvas');
  newCanvas.id = 'graphCanvas';
  parent.appendChild(newCanvas);

  const ctx = newCanvas.getContext('2d');

  // Generate x values
  const xValues = [];
  for (let x = -10; x <= 10; x += 0.1) {
    xValues.push(x);
  }

  // Calculate y values using the quadratic equation
  const yValues = xValues.map(x => a * x * x + b * x + c);

  // Plot the graph using Chart.js
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: xValues,
      datasets: [{
        label: 'y = ax^2 + bx + c',
        borderColor: 'rgba(75, 192, 192, 1)',
        data: yValues,
      }],
    },
    options: {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
        },
        y: {
          type: 'linear',
          position: 'left',
        },
      },
    },
  });

  // Calculate roots
  const discriminant = b ** 2 - 4 * a * c;
  let rootsMessage = 'Roots: ';
  if (discriminant > 0) {
    const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    rootsMessage += `root1: ${root1.toFixed(2)}, root2: ${root2.toFixed(2)}`;
  } else if (discriminant === 0) {
    const root = -b / (2 * a);
    rootsMessage += `double root: ${root.toFixed(2)}`;
  } else {
    rootsMessage += 'no real roots';
  }

  // Display roots message or create the element if it doesn't exist
  let messageElement = document.getElementById('rootsMessage');
  if (!messageElement) {
    messageElement = document.createElement('div');
    messageElement.id = 'rootsMessage';
    parent.appendChild(messageElement);
  }
  messageElement.innerText = rootsMessage;
}

