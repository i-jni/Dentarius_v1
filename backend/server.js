import express from "express";
import cors from "cors";
import studentRouter from "./routes/student.js"; 

const app = express();
const router = express.Router();

router.use(cors({
  origin: ["http://localhost:5173"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
router.use(express.json());

router.use("/student", studentRouter); 
app.use("/api", router);

export default app;