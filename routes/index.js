import express from 'express'
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.status(200).json({
    "title": "Welcome to Mini Shop API Documentation",
    "tools": {
      "nodeJs": true,
      "jsonwebtoken": true,
      "prisma": true,
      "bcryptJs": true,
      "joi": true
    },
  })
});

export default router