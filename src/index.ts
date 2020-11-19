import "module-alias/register";
import app from "./app";

const FASTIFY_PORT = process.env.PORT || 3006;

app.listen(FASTIFY_PORT, "0.0.0.0", (err, address) => {
  if (err) console.log("Cannot start Fastify server", err);
  console.log(`\nFastify server running on ${address}`);
});
