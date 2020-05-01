const express = require('express');

const SessionController = require('./controllers/SessionController');
const CategoryController = require('./controllers/CategoryController');
const ItemController = require('./controllers/ItemController');
const UserController = require('./controllers/UserController');
const AddressController = require('./controllers/AddressController');
const OrderController = require('./controllers/OrderController');
const OrderItemController = require('./controllers/OrderItemController');

const routes = express.Router();

// REST methods
routes.post('/sessions', SessionController.create);

routes.post('/categories', CategoryController.create);
routes.get('/categories', CategoryController.index);
routes.delete('/categories/:id', CategoryController.delete);

// routes.post('/items', ItemController.create);
// routes.get('/items', ItemController.index);
// routes.get('/items', ItemController.index_category)
// routes.get('/items/:id', ItemController.info);
// routes.put('/items/:id', ItemController.update);
// routes.delete('/items/:id', ItemController.delete);

routes.post('/users', UserController.create);
routes.get('/users', UserController.index);
routes.put('/users', UserController.update);
routes.put('/users/authority', UserController.updateAuthority);
routes.delete('/users/:id', UserController.delete);

// routes.post('/address', AddressController.create);
// routes.get('/address/:user_id', AddressController.index);
// routes.get('/address/:id', AddressController.info);
// routes.put('/address/:id', AddressController.update);
// routes.delete('/address/:id', AddressController.delete);

// routes.post('/orders', OrderController.create);
// routes.get('/orders', OrderController.index);
// routes.get('/orders/:id', OrderController.info);
// routes.put('/orders/:id', OrderController.update);

// routes.post('orderitems', OrderItemController.create);
// routes.get('orderitems', OrderItemController.index);
// routes.delete('orderitems', OrderItemController.delete);


module.exports = routes;