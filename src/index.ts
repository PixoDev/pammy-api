import app from "./app";
const FASTIFY_PORT = Number(process.env.PORT) || 3006;

app.listen(FASTIFY_PORT, err => {
  if (err) console.log("Cannot start Fastify server", err);
  console.log(`\nFastify server running on port ${FASTIFY_PORT}`);
});
