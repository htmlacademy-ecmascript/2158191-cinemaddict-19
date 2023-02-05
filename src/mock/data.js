import { getRandomArrayElement } from '../utils/utile.js';
import { POSTERS } from '../const.js';

export const mockComments = [{
  id: '0',
  author: 'Ilya Reilly',
  comment: 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
  date: '2005-05-11T16:12:32.554Z',
  emotion: 'smile'
},

{
  id: '1',
  author: 'Piter Parker',
  comment: 'This film much worse than mine',
  date: '2015-01-09T16:12:32.554Z',
  emotion: 'puke'
},

{
  id: '2',
  author: 'Zmei Gorynych',
  comment: 'Turn this sh*t off after 5 minutes',
  date: '2021-09-11T12:12:32.554Z',
  emotion: 'angry'
},

{
  id: '3',
  author: 'Volchara',
  comment: 'This film is awesome',
  date: '2023-01-26T16:29:32.554Z',
  emotion: 'smile'
},

{
  id: '4',
  author: 'Donald Trump',
  comment: 'Biden must see this',
  date: '2023-01-26T14:13:32.554Z',
  emotion: 'sleeping'
},

{
  id: '5',
  author: 'Rihanna',
  comment: 'Shine bright like a diamond',
  date: '2021-05-11T19:12:32.554Z',
  emotion: 'smile'
},

{
  id: '6',
  author: 'Rihanna',
  comment: 'Shine bright like a diamond',
  date: '2021-05-11T19:12:32.554Z',
  emotion: 'smile'
},

{
  id: '7',
  author: 'Donald Trump',
  comment: 'Shine bright like a diamond',
  date: '2021-05-11T19:12:32.554Z',
  emotion: 'smile'
},

{
  id: '8',
  author: 'Volchara',
  comment: 'This film is awesome',
  date: '2023-01-26T16:29:32.554Z',
  emotion: 'smile'
},

{
  id: '9',
  author: 'Zmei Gorynych',
  comment: 'Turned this sh*t off',
  date: '2021-09-11T12:12:32.554Z',
  emotion: 'angry'
},

{
  id: '10',
  author: 'Zmei Gorynych',
  comment: 'Turn this sh*t off after 5 minutes',
  date: '2021-09-11T12:12:32.554Z',
  emotion: 'angry'
},

{
  id: '11',
  author: 'Zmei Gorynych',
  comment: 'Turn this sh*t off after 5 minutes',
  date: '2021-09-11T12:12:32.554Z',
  emotion: 'puke'
},

{
  id: '12',
  author: 'Zmei Gorynych',
  comment: 'Turn this sh*t off after 5 minutes',
  date: '2021-09-11T12:12:32.554Z',
  emotion: 'angry'
},
];

export const mockMovies = [
  {
    id: '0',
    comments: ['1'],
    filmInfo: {
      title: 'A Little Pony Without The Carpet',
      alternativeTitle: 'Laziness Who Sold Themselves',
      totalRating: 5.3,
      poster: getRandomArrayElement(POSTERS),
      ageRating: 0,
      director: 'Tom Ford',
      writers: 'Takeshi Kitano',
      actors: 'Morgan Freeman',
      release: {
        date: '2019-05-11T00:00:00.000Z',
        releaseCountry: 'Finland'
      },
      duration: 77,
      genre: 'Comedy',
      description: 'Oscar-winning film, a war drama about two young people, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.'
    },
    userDetails: {
      watchlist: false,
      alreadyWatched: true,
      watchingDate: '2019-04-12T16:12:32.554Z',
      favorite: false
    }
  },

  {
    id: '1',
    comments: ['2'],
    filmInfo: {
      title: 'Pirates of the Caribbean: Dead Men Tell No Tales',
      alternativeTitle: 'Captain Jack Sparrow',
      totalRating: 8.3,
      poster: getRandomArrayElement(POSTERS),
      ageRating: 10,
      director: 'Joachim Rønning, Espen Sandberg',
      writers: 'Jerry Bruckheimer',
      actors: 'Stephen Graham, Kaya Scodelario, Golshifteh Farahani, Johnny Depp',
      release: {
        date: '2022-05-11T00:00:00.000Z',
        releaseCountry: 'USA'
      },
      duration: 97,
      genre: 'Adventure',
      description: 'The rip-roaring adventure finds down-on-his-luck Captain Jack feeling the winds of ill-fortune blowing strongly his way when deadly ghost sailors, led by the terrifying Captain Salazar (Javier Bardem), escape from the Devil\'s Triangle bent on killing every pirate at sea—notably Jack.'
    },
    userDetails: {
      watchlist: false,
      alreadyWatched: true,
      watchingDate: '2021-04-12T16:12:32.554Z',
      favorite: true
    }
  },

  {
    id: '2',
    comments: ['3'],
    filmInfo: {
      title: 'Avengers: Endgame',
      alternativeTitle: 'Guys in costumes',
      totalRating: 7.8,
      poster: getRandomArrayElement(POSTERS),
      ageRating: 13,
      director: 'Anthony Russo, Joe Russo',
      writers: 'Christopher Markus, Stephen McFeely',
      actors: 'Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth, Scarlett Johansson',
      release: {
        date: '2023-01-26T00:00:00.000Z',
        releaseCountry: 'USA'
      },
      duration: 181,
      genre: 'Action',
      description: 'The grave course of events set in motion by Thanos that wiped out half the universe and fractured the Avengers ranks compels the remaining Avengers to take one final stand.'
    },
    userDetails: {
      watchlist: true,
      alreadyWatched: false,
      watchingDate: '2023-03-12T16:12:32.554Z',
      favorite: true
    }
  },

  {
    id: '3',
    comments: ['4'],
    filmInfo: {
      title: 'Star Wars: The Rise of Skywalker',
      alternativeTitle: 'May force be with you',
      totalRating: 7.2,
      poster: getRandomArrayElement(POSTERS),
      ageRating: 12,
      director: 'J.J. Abrams',
      writers: 'Derek Connolly, Colin Trevorrow, Chris Terrio, J.J. Abrams',
      actors: 'Carrie Fisher, Mark Hamill, Adam Driver, Daisy Ridley, John Boyega',
      release: {
        date: '2019-12-20T00:00:00.000Z',
        releaseCountry: 'USA'
      },
      duration: 142,
      genre: 'Adventure',
      description: 'In Star Wars: The Rise of Skywalker, the riveting conclusion of the landmark Skywalker saga, new legends will be born—and the final battle for freedom is yet to come.'
    },
    userDetails: {
      watchlist: false,
      alreadyWatched: false,
      watchingDate: '2020-04-13T16:12:32.554Z',
      favorite: false
    }
  },

  {
    id: '4',
    comments: ['5'],
    filmInfo: {
      title: 'Raya and the Last Dragon',
      alternativeTitle: 'Girl and Dragon',
      totalRating: 7.9,
      poster: getRandomArrayElement(POSTERS),
      ageRating: 0,
      director: 'Don Hall, Carlos López Estrada',
      writers: 'Qui Nguyen, Adele Lim',
      actors: 'Kelly Marie Tran, Awkwafina',
      release: {
        date: '2019-12-20T00:00:00.000Z',
        releaseCountry: 'Finland'
      },
      duration: 90,
      genre: 'Action-Adventure',
      description: 'Humans and dragons lived together in harmony long ago. But when an evil force threatened the land, the dragons sacrificed themselves to save humanity.'
    },
    userDetails: {
      watchlist: false,
      alreadyWatched: false,
      watchingDate: '2018-01-12T16:12:32.554Z',
      favorite: true
    }
  },

  {
    id: '5',
    comments: ['6'],
    filmInfo: {
      title: 'Alice Through the Looking Glass',
      alternativeTitle: 'Strange girl, strange world',
      totalRating: 7.5,
      poster: getRandomArrayElement(POSTERS),
      ageRating: 0,
      director: 'James Bobin',
      writers: 'Linda Woolverton',
      actors: 'Johnny Depp, Mia Wasikowska, Helena Bonham Carter',
      release: {
        date: '2016-05-27T00:00:00.000Z',
        releaseCountry: 'Australia',
      },
      duration: 100,
      genre: 'Fantasy',
      description: 'Alice returns to the whimsical world of Underland and travels back in time to save the Mad Hatter.'
    },
    userDetails: {
      watchlist: true,
      alreadyWatched: false,
      watchingDate: '2018-01-12T16:12:32.554Z',
      favorite: false
    }
  },

  {
    id: '6',
    comments: ['7'],
    filmInfo: {
      title: 'A Little Pony Without The Carpet',
      alternativeTitle: 'Laziness Who Sold Themselves',
      totalRating: 5.3,
      poster: getRandomArrayElement(POSTERS),
      ageRating: 0,
      director: 'Tom Ford',
      writers: 'Takeshi Kitano',
      actors: 'Morgan Freeman',
      release: {
        date: '2019-05-11T00:00:00.000Z',
        releaseCountry: 'Finland'
      },
      duration: 77,
      genre: 'Comedy',
      description: 'Oscar-winning film, a war drama about two young people, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.'
    },
    userDetails: {
      watchlist: false,
      alreadyWatched: true,
      watchingDate: '2019-04-12T16:12:32.554Z',
      favorite: false
    }
  },

  {
    id: '7',
    comments: ['8'],
    filmInfo: {
      title: 'Pirates of the Caribbean: Dead Men Tell No Tales',
      alternativeTitle: 'Captain Jack Sparrow',
      totalRating: 8.3,
      poster: getRandomArrayElement(POSTERS),
      ageRating: 10,
      director: 'Joachim Rønning, Espen Sandberg',
      writers: 'Jerry Bruckheimer',
      actors: 'Stephen Graham, Kaya Scodelario, Golshifteh Farahani, Johnny Depp',
      release: {
        date: '2017-05-11T00:00:00.000Z',
        releaseCountry: 'USA'
      },
      duration: 97,
      genre: 'Adventure',
      description: 'The rip-roaring adventure finds down-on-his-luck Captain Jack feeling the winds of ill-fortune blowing strongly his way when deadly ghost sailors, led by the terrifying Captain Salazar (Javier Bardem), escape from the Devil\'s Triangle bent on killing every pirate at sea—notably Jack.'
    },
    userDetails: {
      watchlist: false,
      alreadyWatched: true,
      watchingDate: '2021-04-12T16:12:32.554Z',
      favorite: true
    }
  },

  {
    id: '8',
    comments: ['9'],
    filmInfo: {
      title: 'Avengers: Endgame',
      alternativeTitle: 'Guys in costumes',
      totalRating: 7.8,
      poster: getRandomArrayElement(POSTERS),
      ageRating: 13,
      director: 'Anthony Russo, Joe Russo',
      writers: 'Christopher Markus, Stephen McFeely',
      actors: 'Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth, Scarlett Johansson',
      release: {
        date: '2019-04-26T00:00:00.000Z',
        releaseCountry: 'USA'
      },
      duration: 181,
      genre: 'Action',
      description: 'The grave course of events set in motion by Thanos that wiped out half the universe and fractured the Avengers ranks compels the remaining Avengers to take one final stand.'
    },
    userDetails: {
      watchlist: true,
      alreadyWatched: true,
      watchingDate: '2020-03-12T16:12:32.554Z',
      favorite: true
    }
  },

  {
    id: '9',
    comments: ['10'],
    filmInfo: {
      title: 'Star Wars: The Rise of Skywalker',
      alternativeTitle: 'May force be with you',
      totalRating: 7.2,
      poster: getRandomArrayElement(POSTERS),
      ageRating: 12,
      director: 'J.J. Abrams',
      writers: 'Derek Connolly, Colin Trevorrow, Chris Terrio, J.J. Abrams',
      actors: 'Carrie Fisher, Mark Hamill, Adam Driver, Daisy Ridley, John Boyega',
      release: {
        date: '2019-12-20T00:00:00.000Z',
        releaseCountry: 'USA'
      },
      duration: 142,
      genre: 'Adventure',
      description: 'In Star Wars: The Rise of Skywalker, the riveting conclusion of the landmark Skywalker saga, new legends will be born—and the final battle for freedom is yet to come.'
    },
    userDetails: {
      watchlist: false,
      alreadyWatched: false,
      watchingDate: '2020-04-13T16:12:32.554Z',
      favorite: false
    }
  },

  {
    id: '10',
    comments: ['11'],
    filmInfo: {
      title: 'Raya and the Last Dragon',
      alternativeTitle: 'Girl and Dragon',
      totalRating: 7.9,
      poster: getRandomArrayElement(POSTERS),
      ageRating: 0,
      director: 'Don Hall, Carlos López Estrada',
      writers: 'Qui Nguyen, Adele Lim',
      actors: 'Kelly Marie Tran, Awkwafina',
      release: {
        date: '2021-03-5T00:00:00.000Z',
        releaseCountry: 'Finland'
      },
      duration: 90,
      genre: 'Action-Adventure',
      description: 'Humans and dragons lived together in harmony long ago. But when an evil force threatened the land, the dragons sacrificed themselves to save humanity.'
    },
    userDetails: {
      watchlist: false,
      alreadyWatched: false,
      watchingDate: '2018-01-12T16:12:32.554Z',
      favorite: true
    }
  },

  {
    id: '11',
    comments: ['12'],
    filmInfo: {
      title: 'Alice Through the Looking Glass',
      alternativeTitle: 'Strange girl, strange world',
      totalRating: 7.5,
      poster: getRandomArrayElement(POSTERS),
      ageRating: 0,
      director: 'James Bobin',
      writers: 'Linda Woolverton',
      actors: 'Johnny Depp, Mia Wasikowska, Helena Bonham Carter',
      release: {
        date: '2016-05-27T00:00:00.000Z',
        releaseCountry: 'Australia',
      },
      duration: 100,
      genre: 'Fantasy',
      description: 'Alice returns to the whimsical world of Underland and travels back in time to save the Mad Hatter.'
    },
    userDetails: {
      watchlist: true,
      alreadyWatched: false,
      watchingDate: '2018-01-12T16:12:32.554Z',
      favorite: false
    }
  },
];
