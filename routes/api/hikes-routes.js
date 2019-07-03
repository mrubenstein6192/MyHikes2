const router = require('express').Router();
const authCheck = require('../../middleware/authentication');
const {
  createHike,
  getHikeById,
  updateHike,
  deleteHike
} = require('../../controllers/hike-controller');

// set up authentication middleware for these routes
// router.use(authCheck);

// GET and POST routes for /api/entry
router
  .route('/')
  .post(createHike);

// GET/PUT/DELETE routes for /api/entry/:id
router
  .route('/:id')
  .get(getHikeById)
  .put(updateHike)
  .delete(deleteHike);

  module.exports = router;