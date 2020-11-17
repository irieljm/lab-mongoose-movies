const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Celebrity = require('../models/celebrity');
const Movies = require('../models/Movie');

router.get('/', (req, res, next) => {
  Movie.find().populate('cast')
  .then(movies => {
      console.log(movies)
      res.render('movies/index.hbs', { movies });
  })
      .catch(err => {
          next(err);
      });
});


router.get('/new', (req, res, next) => {
    Celebrity.find().then(celebrities => {
        res.render('movies/new.hbs', { celebrities });
    })
});


router.post('/', (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast })
      .then(() => {
          res.redirect('/movies');
      })
      .catch(err => {
          next(err);
      })
});


router.get('/:id', (req, res, next) => {
    Movie.findById(req.params.id)
        .then(Movie => {
            res.render('movies/show.hbs', { Movie });
        })
        .catch(err => {
            next(err);
        });
  });


router.get('/:id/edit', (req, res, next) => {
    Movie.findById(req.params.id).populate('cast')
        .then(Movie => {
            res.render('celebrities/edit', { Movie });
        })
        .catch(err => {
            next(err);
        });
 });


router.post('/:id', (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(req.params.id, { title, genre, plot, cast })
      .then(() => {
          res.redirect('/movies');
      })
      .catch(err => {
          next(err);
      });
})

router.get('/:id/edit', (req, res, next) => {
    Movie.findById(req.params.id)
        .then(movie => {
            res.render('/movies/edit', { movie });
        })
        .catch(err => {
            next(err);
        });
});



// router.post('/:id/delete', (req, res, next) => {
//   Movie.findByIdAndRemove(req.params.id)
//       .then(() => {
//           res.redirect('/movies');
//       })
//       .catch(err => {
//           next(err);
//       })
// });








module.exports = router;