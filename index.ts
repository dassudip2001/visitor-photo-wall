import { createApp } from "./src/app";

const PORT = Number(process.env.PORT || 5678);
const HOST: string = process.env.HOST || "0.0.0.0"; // Listen on all network interfaces

async function startServer() {
  try {
    const { server } = await createApp();

    server.listen(PORT, HOST, () => {
      console.log(`✅ Server running at http://${HOST}:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
