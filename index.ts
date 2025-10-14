import { createApp } from "./src/app";

const PORT = 3000;
const HOST = "0.0.0.0"; // listen on all interfaces

const { server } = createApp();

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
