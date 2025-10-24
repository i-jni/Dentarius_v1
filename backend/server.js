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

// CORS intelligent selon l'environnement
const corsOptions = {
  origin: (origin, callback) => {
    // En développement, tout passer
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    
    // En production, vérifier l'origine
    const allowedOrigins = ['https://dentarius.org'];
    
    // Si pas d'origine (requête directe) → bloquer
    if (!origin) {
      return callback(new Error('Accès direct non autorisé'), false);
    }
    
    // Si origine autorisée → OK
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Sinon → bloquer
    callback(new Error('Non autorisé par CORS'), false);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

router.use(cors(corsOptions));
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

export default app;