const router = require('express').Router();
const { User, Hike } = require('../models');
const handle = require('../utils/promise-handler');

// C.R.U.D. METHODS

// **********
// CREATE/POST a new entry for a user
// **********
const createHike = async (req, res) => {
  const [hikeErr, hikeData] = await handle(Hike.create(req.body));

  if (hikeErr) {
    console.log(hikeErr);
    return res.json(hikeErr);
  };
  
  return User.update(
    {
      _id: req.user._id
    },
    {
      $push: { 
        hikes: {
          $each: [hikeData._id],
          $position: 0
        }
      }
    },
    {
      new: true
    }
  )
    .then((userInfo) => {
      if (userInfo !== null) {
        return res.json(userInfo);
      };
    })
    .catch((err) => {
      return res.json(err);
    });
};


// **********
// READ/GET a single entry by _id
// **********
const getHikeById = async (req, res) => {
  const [hikeFindErr, hikeData] = await handle(Hike.findById(req.params.id));

  if (hikeFindErr) {
    return res.status(500).json(userFindErr)
  }

  return res.status(200).json(hikeData) 
};


// **********
// UPDATE/PUT a note by its _id
// **********
const updateHike = async (req, res) => {
  const [hikeFindErr, hikeData] = await handle(Hike.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body
    },
    {
      new: true
    }
  ));

  if (hikeFindErr) {
    return res.status(500).json(userFindErr)
  }

  return res.status(200).json(hikeData) 
};


// **********
// DELETE/REMOVE a note by its _id
// **********
const deleteHike = async (req, res) => {
  const [hikeFindErr, hikeData] = await handle(Hike.findByIdAndDelete(req.params.id));

  if (hikeFindErr) {
    return res.status(500).json(hikeFindErr)
  };

  // delete entry from User schema
  const [userFindErr, userData] = await handle(User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: {
        hikes: req.params.id
      }
    },
    {
      new: true
    }
  ));

  if (userFindErr) {
    return res.status(500).json(userFindErr)
  }

  return res.status(200).json(userData) 

};


module.exports = {
  createHike,
  getHikeById,
  updateHike,
  deleteHike
};