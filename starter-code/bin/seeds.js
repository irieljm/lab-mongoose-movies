const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity');

mongoose.connect('mongodb://localhost/Celebrities', {
  useNewUrlParser: true
});

const celebrities = [
  {
    name: "Beyonce",
    ocupation: "Singer/Actress",
    catchPhrase: "The most alluring thing a woman can have is Confidence.",
  },
  {
    name: "Robert De Niro",
    ocupation: "Actor",
    catchPhrase: "Don’t let yourself get attached to anything you are not willing to walk out on in 30 seconds flat if you feel the heat coming around the corner’ ",
  },
  {
    name: "Dave Grohl",
    ocupation: "musician, singer, and songwriter.",
    catchPhrase: "No one is you and that is your biggest power"
    
  },
  {
    name: "Robin Williams",
    ocupation: "Actor/comedian",
    catchPhrase: "No matter what anybody tells you, words and ideas can change the world.",
  }

];

Celebrity.insertMany(celebrities)
  .then(data => {
    console.log(`Success! ${data.length} celebrities info added to the collection`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  });