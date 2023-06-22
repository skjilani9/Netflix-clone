const express = require("express");
const { addToLikedMovies, getlikedmovies, removelike } = require("../controls/userctr");
const router = express.Router();


router.route("/add").post(addToLikedMovies)
router.route("/movies/:email").get(getlikedmovies)
router.route("/remove").put(removelike)







module.exports = router