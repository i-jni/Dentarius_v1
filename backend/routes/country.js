import express from 'express';
import { 
  getAllCountries, 
  getCountryById, 
  createCountry, 
  updateCountry, 
  deleteCountry 
} from '../controllers/countryController.js';

const countryRouter = express.Router();

countryRouter.get('/', getAllCountries);
countryRouter.get('/:id', getCountryById);
countryRouter.post('/', createCountry);
countryRouter.put('/:id', updateCountry);
countryRouter.delete('/:id', deleteCountry);

export default countryRouter;