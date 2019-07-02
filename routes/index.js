const router = require('express').Router();
const apiRoutes = require('./api');
const authRoutes = require('./auth-routes');
const path = require('path');

router.use('/auth', authRoutes);
router.use('/api', apiRoutes);

// set up wildcard route to serve up react front end
if (process.env.NODE_ENV === 'production') {
  router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  });
}

module.exports = router;