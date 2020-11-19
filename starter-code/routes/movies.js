const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Celebrity = require('../models/celebrity');
const Movies = require('../models/Movie');
const { options } = require('../app');

router.get('/', (req, res, next) => {
  Movie.find().populate('cast')
  .then(movies => {
      console.log(movies)
      res.render('movies/index', { movies });
  })
      .catch(err => {
          next(err);
      });
});


router.get('/new', (req, res, next) => {
    Celebrity.find().then(celebrities => {
        res.render('movies/new', { celebrities });
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
        .then(movie => {
            res.render('movies/show.hbs', { movie });
        })
        .catch(err => {
            next(err);
        });
  });

// router.get('/:id/edit', (req, res, next) => {
//     Movie.findById(req.params.id).populate('cast')
//         .then(movie => {
//             console.log(movie);
//             Celebrity.find().then(celebrities => {
//                 console.log(movie.cast);
//                 let option = '';
//                 let selected = '';
//                 celebrities.forEach(actor => {
//                     selected = movie.cast.map(el => el._id).includes(actor._id) ? ' selected' : ' not selected';
//                     option += '<option value="${actor._id}" ${selected}>${actor.name}</option>';
//                 });
//                 console.log(options)
//             })
//             // res.render('movies/edit', { movie, celebrities });
//             res.render('movies/edit', { movie, options });
//         })
//         .catch(err => {
//             next(err);
//         });
//  });
router.get('/edit/:id', (req, res, next) => {
    Movie.findById(req.params.id)
        .then(movie => {
            Celebrity.find().then(celebrities => {
            res.render('movies/edit', { movie, celebrities });
            })
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