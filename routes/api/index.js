const router = require('express').Router();
const hikeRoutes = require('./hikes-routes');
const userRoutes = require('./user-routes');

router.use('/hike', hikeRoutes);
router.use('/user', userRoutes)

module.exports = router;