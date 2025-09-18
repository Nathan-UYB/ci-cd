const express = require("express");
const client = require("prom-client");

const app = express();
const port = 3001;

// ----- Prometheus metrics -----
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics(); // CPU, mémoire, event loop...

// Custom counter: count requests to /hello
const helloCounter = new client.Counter({
  name: "hello_requests_total",
  help: "Nombre total de requêtes sur /hello"
});

// ----- Routes -----
app.get("/hello", (req, res) => {
  helloCounter.inc(); // Incrémente le compteur
  res.send("Hello World!");
});

// Expose Prometheus metrics at /metrics
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

// ----- Start server -----
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
  console.log(`👉 Try /hello and /metrics`);
});
