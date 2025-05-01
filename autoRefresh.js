// Exports a function that accepts sensorData (we import this in app.js)
module.exports = (sensorData) => {
  const express = require('express');
  const router = express.Router();

  router.get('/ui/:sensor_id', (req, res) => {
      const sensorId = req.params.sensor_id;
      const data = sensorData[sensorId];

      // Define the refresh script to be reused whether data available or not
      const autoRefreshScript = `
          <script>
            setTimeout(() => {
              location.reload();
            }, 5000);
          </script>
      `;

      // If no data, send fallback page with auto-refresh
      if (!data) {
          return res.send(`
              <html>
                <head>
                  <title>No Data</title>
                  ${autoRefreshScript}
                </head>
                <body>
                  <h2>No data found for sensor "${sensorId}"</h2>
                </body>
              </html>
          `);
      }

      // If data exists, display it with auto-refresh
      res.send(`
          <html>
            <head>
              <title>Sensor ${sensorId}</title>
              ${autoRefreshScript}
            </head>
            <body>
              <h2>Sensor ID: ${sensorId}</h2>
              <p>Last updated: ${new Date().toLocaleTimeString()}</p>
              <pre>${JSON.stringify(data, null, 2)}</pre>
            </body>
          </html>
      `);
  });

  return router;
};
