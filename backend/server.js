import express from "express";
import cors from "cors";
import studentRouter from "./routes/student.js"; 
import errorRouter from "./routes/error.js";
import authRouter from "./routes/auth.js";
import courseRouter from "./routes/course.js";
import levelRouter from "./routes/level.js";
import countryRouter from "./routes/country.js";
import courseTopicRouter from "./routes/courseTopic.js";
import { setupSwagger } from "./docs/swagger.js";


const app = express();
const router = express.Router();

router.use(cors({
  origin: ["http://localhost:5173"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
router.use(express.json());

// Setup Swagger  
setupSwagger(app);

router.use("/student", studentRouter); 
router.use("/auth", authRouter);
router.use("/course", courseRouter);
router.use("/level", levelRouter);
router.use("/country", countryRouter);
router.use("/course-topic", courseTopicRouter);
router.use(errorRouter);

app.use("/api", router);

export default app ;