const router = require('express').Router();
const authCheck = require('../../middleware/authentication');
const { getUserProfile } = require('../../controllers/user-controller');

router.use(authCheck);

router
  .route('/')
  .get(getUserProfile);

module.exports = router;