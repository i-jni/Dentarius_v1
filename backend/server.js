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
import topicRouter from "./routes/topic.js";


const app = express();
const router = express.Router();

router.use(cors({
  origin:[  
    'https://dentarius.org',  
    'http://localhost:5173',  
    'http://localhost:3000',  
    'http://127.0.0.1:5173',  
    'http://127.0.0.1:3000'  
  ],
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
router.use("/topic", topicRouter);
router.use(errorRouter);

app.use("/api", router);

export default app ;