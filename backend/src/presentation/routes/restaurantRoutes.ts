import express from 'express';
import { CreateRestaurantController } from '../controllers/CreateRestaurantController';
import { FetchRestaurantController } from '../controllers/FetchRestaurantController';
import { UpdateRestaurantController } from '../controllers/UpdateRestaurantController';
import { DeleteRestaurantController } from '../controllers/DeleteRestaurantController';

export const restaurantRouter = (createRestaurantController: CreateRestaurantController,fetchRestaurantController: FetchRestaurantController,updateRestaurantController: UpdateRestaurantController,deleteRestaurantController: DeleteRestaurantController) => {
  
    const router = express.Router();

    router.post('/', (req, res) => createRestaurantController.handler(req, res));
    router.get('/', (req, res) => fetchRestaurantController.handler(req, res));
    router.put('/:id', (req, res) => updateRestaurantController.handler(req, res));
    router.delete('/:id', (req, res) => deleteRestaurantController.handler(req, res));

  return router;
};
