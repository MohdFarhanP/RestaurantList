import express from 'express';
import { CreateRestaurantController } from '../controllers/CreateRestaurantController';
import { FetchRestaurantController } from '../controllers/FetchRestaurantController';
import { UpdateRestaurantController } from '../controllers/UpdateRestaurantController';
import { DeleteRestaurantController } from '../controllers/DeleteRestaurantController';
import { SearchRestaurantController } from '../controllers/SearchRestaurantController';

export const restaurantRouter = (createRestaurantController: CreateRestaurantController,fetchRestaurantController: FetchRestaurantController,updateRestaurantController: UpdateRestaurantController,deleteRestaurantController: DeleteRestaurantController,searchRestaurantController:SearchRestaurantController) => {
  
    const router = express.Router();

    router.post('/addRestaurant', (req, res) => createRestaurantController.handler(req, res));
    router.get('/fetchRestaurant', (req, res) => fetchRestaurantController.handler(req, res));
    router.put('/updateRestaurant/:id', (req, res) => updateRestaurantController.handler(req, res));
    router.delete('/deleteRestaurant/:id', (req, res) => deleteRestaurantController.handler(req, res));
    router.get('/', (req, res) => searchRestaurantController.handler(req, res));

  return router;
};
