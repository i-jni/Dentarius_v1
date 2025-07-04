import server from "./server.js";
import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});