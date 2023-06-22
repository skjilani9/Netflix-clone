const User = require("../models/usermodel")


module.exports.addToLikedMovies = async (req, res) => {
    try {
        const { email, data } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const { likedmovies } = user;
            const movieAlreadyLiked = likedmovies.find(({ id }) => id === data.id);
            if (!movieAlreadyLiked) {
                await User.findByIdAndUpdate(
                    user._id,
                    {
                        likedmovies: [...user.likedmovies, data],
                    },
                    { new: true }
                );
            } else return res.json({ msg: "Movie already added to the liked list." });
        } else await User.create({ email, likedmovies: [data] });
        return res.json({ msg: "Movie successfully added to liked list." });
    } catch (error) {
        return res.json({ msg: "Error adding movie to the liked list" });
    }
};


module.exports.getlikedmovies = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });
        if (user) {
            return res.json({ msg: "success", movies: user.likedmovies });
        } else return res.json({ msg: "User with given email not found." });
    } catch (error) {
        return res.json({ msg: "Error fetching movies/shows" });
    }
}


module.exports.removelike = async(req,res)=>{
    try {
        const { email, movieId } = req.body;
        const user = await User.findOne({ email });
        if (user) {
          const movies = user.likedmovies;
          const movieIndex = movies.findIndex(({ id }) => id === movieId);
          if (!movieIndex) {
            res.status(400).send({ msg: "Movie not found." });
          }
          movies.splice(movieIndex, 1);
          await User.findByIdAndUpdate(
            user._id,
            {
                likedmovies: movies,
            },
            { new: true }
          );
          return res.json({ msg: "Movie successfully removed.", movies });
        } else return res.json({ msg: "User with given email not found." });
      } catch (error) {
      }
}