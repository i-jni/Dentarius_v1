import express from "express";
import cors from "cors";
import studentRouter from "./routes/student.js"; 
import errorRouter from "./routes/error.js";
import authRouter from "./routes/auth.js";
import courseRouter from "./routes/course.js";



const app = express();
const router = express.Router();

router.use(cors({
  origin: ["http://localhost:5173"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
router.use(express.json());

router.use("/student", studentRouter); 
router.use("/auth", authRouter);
router.use("/course", courseRouter);
router.use(errorRouter);

app.use("/api", router);

export default app ;