import express from 'express';
import { 
  getAllCountries, 
  getCountryById, 
  createCountry, 
  updateCountry, 
  deleteCountry 
} from '../controllers/countryController.js';
import { validate } from "../middleware/validate.js";
import { createCountrySchema, updateCountrySchema } from "../validators/schemas.js";

const countryRouter = express.Router();

countryRouter.get('/', getAllCountries);
countryRouter.get('/:id', getCountryById);
countryRouter.post('/', validate(createCountrySchema), createCountry);
countryRouter.put('/:id', validate(updateCountrySchema), updateCountry);
countryRouter.delete('/:id', deleteCountry);

export default countryRouter;