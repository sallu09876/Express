module.exports.logger = app.use((req, res, next) => {
  const path = req.url;
  const method = req.method;
  const started_time = Date.now();
  response.on("finish", () => {
    const ended_time = Date.now();
    const duration = ended_time - started_time;
    console.log(`${method} ${path} ${response.statusCode} - ${duration}ms`);
  });
  next();
});
