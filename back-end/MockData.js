// This file contains mock data for handling Mockaroo rate limit exceeded errors
const mockShows = JSON.parse(`[{
  "id": 36,
  "platform": "Netflix",
  "completed": false,
  "seasons": 2,
  "episodes": 30
},{
  "id": 3,
  "platform": "Amazon Prime",
  "completed": false,
  "seasons": 6,
  "episodes": 78
},
{
  "id": 54,
  "platform": "Disney Plus",
  "completed": true,
  "seasons": 0,
  "episodes": 8
},
{
  "id": 42,
  "platform": "HBO",
  "completed": false,
  "seasons": 5,
  "episodes": 71
},
{
  "id": 96,
  "platform": "Crunchyroll",
  "completed": false,
  "seasons": 2,
  "episodes": 17
},
{
  "id": 11,
  "platform": "Other",
  "completed": true,
  "seasons": 3,
  "episodes": 22
}]`)

const mockSingleShow = JSON.parse(`{
  "id": 36,
  "platform": "Netflix",
  "completed": false,
  "seasons": 2,
  "episodes": 30
}`)

const createMockUser = (id, username, password, email) => {
  return {
    id: id,
    username: username || 'mlaffan0',
    password: password || 'njb9oAB111',
    email: email || 'jparkin0@utexas.edu',
    bio: '',
    img: '',
    shows: []
  }
}

const mockUserAPI = {
  1: {
    id: 1,
    username: 'mlaffan0',
    password: 'njb9oAB111',
    email: 'jparkin0@utexas.edu',
    bio:
      'Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    img: 'http://dummyimage.com/182x112.jpg/dddddd/000000',
    shows: mockShows
  },
  2: {
    id: 2,
    username: 'fgoodlett1',
    password: 'Y3DJKGN2111',
    email: 'rgrolmann1@cloudflare.com',
    bio: 'Mauris sit amet cursus integer. Ut tellus.',
    img: 'https://dummyimage.com/194x133.png/ffffff/000000',
    shows: mockShows
  },
  3: {
    id: 3,
    username: 'msuff2',
    password: 'hrqkB4111',
    email: 'msuff2@gmail.com',
    bio:
      'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
    img: 'https://dummyimage.com/194x133.png/dddddd/000000',
    shows: mockShows
  },
  4: {
    id: 4,
    username: 'dstuckford3',
    password: 'ykBWYvO111',
    email: 'mjosilevich3@apple.com',
    bio: 'Etiam faucibus cursus urna. Ut tellus.',
    img: 'https://dummyimage.com/194x133.png/ffffff/000000',
    shows: mockShows
  }
}

const mockUserUpdate = (id, newUser) => {
  const thirdUser = mockUserAPI[id]
  Object.keys(newUser).map((key) => {
    thirdUser[key] = newUser[key]
  })
  mockUserAPI[id] = thirdUser
  return thirdUser
}

const mockShowAPI = {
  54: {
    id: 54,
    name: 'Ladies They Talk About',
    description: 'Aenean sit amet justo.',
    genres: 'Drama|Romance',
    isMovie: false,
    episodes: 66,
    coverPhoto: 'http://dummyimage.com/243x117.png/dddddd/000000'
  },
  42: {
    id: 42,
    name: 'Samouraï, Le (Godson, The)',
    description: 'Etiam pretium iaculis justo.',
    genres: 'Crime|Drama|Thriller',
    isMovie: false,
    episodes: 56,
    coverPhoto: 'http://dummyimage.com/246x181.png/cc0000/ffffff'
  },
  96: {
    id: 96,
    name: "Bob Saget: That Ain't Right",
    description: 'Proin eu mi. Nulla ac enim.',
    genres: 'Comedy',
    isMovie: true,
    episodes: 1,
    coverPhoto: 'http://dummyimage.com/174x138.png/dddddd/000000'
  },
  11: {
    id: 11,
    name: 'Ca$h',
    description:
      'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    genres: 'Crime|Thriller',
    isMovie: true,
    episodes: 1,
    coverPhoto: 'http://dummyimage.com/225x181.png/cc0000/ffffff'
  },
  3: {
    id: 3,
    name: 'Forest (Rengeteg)',
    description:
      'Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam.',
    genres: 'Drama',
    isMovie: false,
    episodes: 10,
    coverPhoto: 'http://dummyimage.com/219x233.png/cc0000/ffffff'
  },
  36: {
    id: 36,
    name: 'Man in the Saddle',
    description: 'Vestibulum sed magna at nunc commodo placerat.',
    genres: 'Western',
    isMovie: true,
    episodes: 1,
    coverPhoto: 'http://dummyimage.com/184x242.png/ff4444/ffffff'
  },
  10: {
    id: 10,
    name: 'Deck the Halls',
    description:
      'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis.',
    genres: 'Comedy',
    isMovie: false,
    episodes: 10,
    coverPhoto: 'http://dummyimage.com/175x231.png/dddddd/000000'
  }
}

const mockAllShows = JSON.parse(`[{
  "id": 36,
  "name": "Man in the Saddle",
  "description": "Vestibulum sed magna at nunc commodo placerat.",
  "genres": "Western",
  "isMovie": true,
  "episodes": 1,
  "coverPhoto": "http://dummyimage.com/184x242.png/ff4444/ffffff"
},{
  "id": 3,
  "name": "Forest (Rengeteg)",
  "description": "Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam.",
  "genres": "Drama",
  "isMovie": false,
  "episodes": 10,
  "coverPhoto": "http://dummyimage.com/219x233.png/cc0000/ffffff"
},
{
  "id": 54,
  "name": "Ladies They Talk About",
  "description": "Aenean sit amet justo.",
  "genres": "Drama|Romance",
  "isMovie": false,
  "episodes": 66,
  "coverPhoto": "http://dummyimage.com/243x117.png/dddddd/000000"
},
{
  "id": 42,
  "name": "Samouraï, Le (Godson, The)",
  "description": "Etiam pretium iaculis justo.",
  "genres": "Crime|Drama|Thriller",
  "isMovie": false,
  "episodes": 56,
  "coverPhoto": "http://dummyimage.com/246x181.png/cc0000/ffffff"
},
{
  "id": 96,
  "name": "Bob Saget: That Ain't Right",
  "description": "Proin eu mi. Nulla ac enim.",
  "genres": "Comedy",
  "isMovie": true,
  "episodes": 1,
  "coverPhoto": "http://dummyimage.com/174x138.png/dddddd/000000"
},
{
  "id": 11,
  "name": "Ca$h",
  "description": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
  "genres": "Crime|Thriller",
  "isMovie": true,
  "episodes": 1,
  "coverPhoto": "http://dummyimage.com/225x181.png/cc0000/ffffff"
},
{
  "id": 9,
  "name": "Smart People",
  "description": "Proin risus. Praesent lectus.",
  "genres": "Comedy|Drama|Romance",
  "isMovie": true,
  "episodes": 1,
  "coverPhoto": "http://dummyimage.com/247x193.png/dddddd/000000"
}, {
  "id": 10,
  "name": "Deck the Halls",
  "description": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis.",
  "genres": "Comedy",
  "isMovie": false,
  "episodes": 10,
  "coverPhoto": "http://dummyimage.com/175x231.png/dddddd/000000"
}]`)

const mockPopularShows = JSON.parse(
  `[
    {
      "title":"Game of Thrones",
      "year":2011,
      "ids":{
        "trakt":1390,
        "slug":"game-of-thrones",
        "tvdb":121361,
        "imdb":"tt0944947",
        "tmdb":1399,
        "tvrage":24493
      }
    }, {
      "title":"Breaking Bad",
      "year":2008,
      "ids":{
        "trakt":1388,
        "slug":"breaking-bad",
        "tvdb":81189,
        "imdb":"tt0903747",
        "tmdb":1396,
        "tvrage":18164
      }
    }, {
      "title":"The Walking Dead",
      "year":2010,
      "ids":{
        "trakt":1393,
        "slug":"the-walking-dead",
        "tvdb":153021,
        "imdb":"tt1520211",
        "tmdb":1402,"tvrage":25056
      }
    }, {
      "title":"The Big Bang Theory",
      "year":2007,
      "ids":{
        "trakt":1409,
        "slug":"the-big-bang-theory",
        "tvdb":80379,
        "imdb":"tt0898266",
        "tmdb":1418,
        "tvrage":8511
      }
    }, {
      "title":"Sherlock",
      "year":2010,
      "ids":{
        "trakt":19792,
        "slug":"sherlock",
        "tvdb":176941,
        "imdb":"tt1475582",
        "tmdb":19885,
        "tvrage":23433
      }
    }, {
      "title":"How I Met Your Mother",
      "year":2005,
      "ids":{
        "trakt":1095,
        "slug":"how-i-met-your-mother",
        "tvdb":75760,
        "imdb":"tt0460649",
        "tmdb":1100,
        "tvrage":3918
      }
    }, {
      "title":"Dexter",
      "year":2006,
      "ids":{
        "trakt":1396,
        "slug":"dexter",
        "tvdb":79349,
        "imdb":"tt0773262",
        "tmdb":1405,
        "tvrage":null
      }
    }, {
      "title":"Friends",
      "year":1994,
      "ids":{
        "trakt":1657,
        "slug":"friends",
        "tvdb":79168,
        "imdb":"tt0108778",
        "tmdb":1668,
        "tvrage":3616
      }
    }, {
      "title":"Stranger Things",
      "year":2016,
      "ids":{
        "trakt":104439,
        "slug":"stranger-things",
        "tvdb":305288,
        "imdb":"tt4574334",
        "tmdb":66732,
        "tvrage":48493
      }
    }, {
      "title":"Arrow",
      "year":2012,
      "ids":{
        "trakt":1403,
        "slug":"arrow",
        "tvdb":257655,
        "imdb":"tt2193021",
        "tmdb":1412,"tvrage":30715
      }
    }
  ]`
)

const mockGOT = JSON.parse(
  `{
    "title": "Game of Thrones",
      "year": 2011,
      "ids": {
        "trakt": 353,
        "slug": "game-of-thrones",
        "tvdb": 121361,
        "imdb": "tt0944947",
        "tmdb": 1399
      },
      "first_aired": "2011-04-18T01:00:00.000Z",
      "airs": {
        "day": "Sunday",
        "time": "21:00",
        "timezone": "America/New_York"
      },
      "runtime": 60,
      "certification": "TV-MA",
      "network": "HBO",
      "country": "us",
      "updated_at": "2014-08-22T08:32:06.000Z",
      "trailer": null,
      "homepage": "http://www.hbo.com/game-of-thrones/index.html",
      "status": "returning series",
      "rating": 9,
      "votes": 111,
      "comment_count": 92,
      "language": "en",
      "available_translations": [
        "en",
        "tr",
        "sk",
        "de",
        "ru",
        "fr",
        "hu",
        "zh",
        "el",
        "pt",
        "es",
        "bg",
        "ro",
        "it",
        "ko",
        "he",
        "nl",
        "pl"
      ],
      "genres": [
        "drama",
        "fantasy"
      ],
      "aired_episodes": 50
  }`
)

const mockSeasons = JSON.parse(
  `[
    {
      "number": 0,
      "ids": {
        "trakt": 1,
        "tvdb": 137481,
        "tmdb": 3627
      },
      "rating": 9,
      "votes": 111,
      "episode_count": 10,
      "aired_episodes": 10,
      "title": "Specials",
      "overview": null,
      "first_aired": "2010-12-06T02:00:00.000Z",
      "udpated_at": "2010-12-07T01:023:00.000Z",
      "network": "HBO"
    },
    {
      "number": 1,
      "ids": {
        "trakt": 2,
        "tvdb": 364731,
        "tmdb": 3624
      },
      "rating": 9,
      "votes": 111,
      "episode_count": 10,
      "aired_episodes": 10,
      "title": "Season 1",
      "overview": "Season 1 overview.",
      "first_aired": "2011-04-09T02:00:00.000Z",
      "udpated_at": "2010-12-07T01:023:00.000Z",
      "network": "HBO"
    },
    {
      "number": 2,
      "ids": {
        "trakt": 3,
        "tvdb": 473271,
        "tmdb": 3625
      },
      "rating": 9,
      "votes": 111,
      "episode_count": 10,
      "aired_episodes": 10,
      "title": "Season 2",
      "overview": "Season 2 overview.",
      "first_aired": "2012-04-02T02:00:00.000Z",
      "udpated_at": "2010-12-07T01:023:00.000Z",
      "network": "HBO"
    },
    {
      "number": 3,
      "ids": {
        "trakt": 4,
        "tvdb": 488434,
        "tmdb": 3626
      },
      "rating": 9,
      "votes": 111,
      "episode_count": 10,
      "aired_episodes": 10,
      "title": "Season 3",
      "overview": "Season 3 overview.",
      "first_aired": "2013-04-01T02:00:00.000Z",
      "udpated_at": "2010-12-07T01:023:00.000Z",
      "network": "HBO"
    },
    {
      "number": 4,
      "ids": {
        "trakt": 5,
        "tvdb": 522882,
        "tmdb": 3628
      },
      "rating": 9,
      "votes": 111,
      "episode_count": 10,
      "aired_episodes": 10,
      "title": "Season 4",
      "overview": "Season 4 overview",
      "first_aired": "2014-04-07T02:00:00.000Z",
      "udpated_at": "2010-12-07T01:023:00.000Z",
      "network": "HBO"
    }
  ]`
)

const mockFileInfo = JSON.parse(
  `{
    "backdrops": [
        {
            "aspect_ratio": 1.777777777777778,
            "file_path": "/suopoADq0k8YZr4dQXcU6pToj6s.jpg",
            "height": 1080,
            "iso_639_1": null,
            "vote_average": 5.518,
            "vote_count": 10,
            "width": 1920
        }
    ], 
    "id": 1399,
        "posters": [
            {
                "aspect_ratio": 0.6666666666666666,
                "file_path": "/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
                "height": 3000,
                "iso_639_1": "en",
                "vote_average": 6.33,
                "vote_count": 36,
                "width": 2000
            }
        ]
    }`
)
const mockErrorMessage = {
  response: {
    status: 500,
    message: 'mockaroo api limit exceeded (probably)'
  }
}

const mockTraktShow = {
  title: 'Game of Thrones',
  year: 2011,
  ids: {
    trakt: 1390,
    slug: 'game-of-thrones',
    tvdb: 121361,
    imdb: 'tt0944947',
    tmdb: 1399,
    tvrage: 24493
  },
  overview:
    "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
  first_aired: '2011-04-18T01:00:00.000Z',
  airs: { day: 'Sunday', time: '21:00', timezone: 'America/New_York' },
  runtime: 60,
  certification: 'TV-MA',
  network: 'HBO',
  country: 'us',
  trailer: 'https://youtube.com/watch?v=bjqEWgDVPe0',
  homepage: 'http://www.hbo.com/game-of-thrones',
  status: 'ended',
  rating: 9.0961,
  votes: 119962,
  comment_count: 379,
  updated_at: '2021-04-21T18:29:48.000Z',
  language: 'en',
  available_translations: [
    'ar',
    'be',
    'bg',
    'bs',
    'cn',
    'cs',
    'da',
    'de',
    'el',
    'en',
    'eo',
    'es',
    'et',
    'fa',
    'fi',
    'fr',
    'he',
    'hr',
    'hu',
    'id',
    'is',
    'it',
    'ja',
    'ka',
    'ko',
    'lb',
    'lt',
    'lv',
    'ml',
    'nl',
    'no',
    'pl',
    'pt',
    'ro',
    'ru',
    'sk',
    'sr',
    'sv',
    'ta',
    'th',
    'tr',
    'tw',
    'uk',
    'uz',
    'vi',
    'zh'
  ],
  genres: ['drama', 'fantasy', 'science-fiction', 'action', 'adventure'],
  aired_episodes: 73
}

const mockPosterCall = {
  id: 1399,
  posters: [
    {
      aspect_ratio: 0.6666666666666666,
      file_path: '/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg',
      height: 3000,
      iso_639_1: 'en',
      vote_average: 6.366,
      vote_count: 37,
      width: 2000
    },
    {
      aspect_ratio: 0.6666666666666666,
      file_path: '/44rw2cOQrgUthZMhp3eibpXVy9p.jpg',
      height: 1500,
      iso_639_1: 'en',
      vote_average: 5.708,
      vote_count: 9,
      width: 1000
    },
    {
      aspect_ratio: 0.6666666666666666,
      file_path: '/gKepMfnseLPwbZ0U9E1LmMW2x4V.jpg',
      height: 3000,
      iso_639_1: 'en',
      vote_average: 5.456,
      vote_count: 5,
      width: 2000
    },
    {
      aspect_ratio: 0.6666666666666666,
      file_path: '/7WUHnWGx5OO145IRxPDUkQSh4C7.jpg',
      height: 1920,
      iso_639_1: 'en',
      vote_average: 5.394,
      vote_count: 10,
      width: 1280
    },
    {
      aspect_ratio: 0.6666666666666666,
      file_path: '/nC0dXhtcAdcqQ4anJfRz82XLL9l.jpg',
      height: 2175,
      iso_639_1: 'es',
      vote_average: 5.384,
      vote_count: 2,
      width: 1450
    },
    {
      aspect_ratio: 0.6666666666666666,
      file_path: '/bk7SJsNtVP97faavetnurgXdrOF.jpg',
      height: 1500,
      iso_639_1: 'en',
      vote_average: 5.384,
      vote_count: 2,
      width: 1000
    },
    {
      aspect_ratio: 0.7012622720897616,
      file_path: '/p7DZWrEqTik2LGzMuvoigQGGTW0.jpg',
      height: 1426,
      iso_639_1: 'he',
      vote_average: 5.384,
      vote_count: 2,
      width: 1000
    },
    {
      aspect_ratio: 0.6666666666666666,
      file_path: '/gwPSoYUHAKmdyVywgLpKKA4BjRr.jpg',
      height: 3000,
      iso_639_1: 'en',
      vote_average: 5.374,
      vote_count: 39,
      width: 2000
    },
    {
      aspect_ratio: 0.6666666666666666,
      file_path: '/bw6DlqljVFIinhBA7uDSNha6Lnp.jpg',
      height: 3000,
      iso_639_1: 'en',
      vote_average: 5.322,
      vote_count: 5,
      width: 2000
    },
    {
      aspect_ratio: 0.6666666666666666,
      file_path: '/3hDtRuwTfQQYRst3kjhvp4Cogjw.jpg',
      height: 2175,
      iso_639_1: 'es',
      vote_average: 5.318,
      vote_count: 3,
      width: 1450
    },
    {
      aspect_ratio: 0.6666666666666666,
      file_path: '/t4IinrhH2BN7clHpEVBbHEjSB7U.jpg',
      height: 1500,
      iso_639_1: 'en',
      vote_average: 5.312,
      vote_count: 1,
      width: 1000
    }
  ]
}

const mockSeasonsCall = [
  {
    number: 0,
    ids: {
      trakt: 3962,
      tvdb: 137481,
      tmdb: 3627,
      tvrage: {}
    }
  },
  {
    number: 1,
    ids: {
      trakt: 3963,
      tvdb: 364731,
      tmdb: 3624,
      tvrage: {}
    }
  },
  {
    number: 2,
    ids: {
      trakt: 3964,
      tvdb: 473271,
      tmdb: 3625,
      tvrage: {}
    }
  },
  {
    number: 3,
    ids: {
      trakt: 3965,
      tvdb: 488434,
      tmdb: 3626,
      tvrage: {}
    }
  },
  {
    number: 4,
    ids: {
      trakt: 3966,
      tvdb: 568657,
      tmdb: 3628,
      tvrage: {}
    }
  },
  {
    number: 5,
    ids: {
      trakt: 3967,
      tvdb: 607490,
      tmdb: 62090,
      tvrage: {}
    }
  },
  {
    number: 6,
    ids: {
      trakt: 114727,
      tvdb: 651357,
      tmdb: 71881,
      tvrage: {}
    }
  },
  {
    number: 7,
    ids: {
      trakt: 140912,
      tvdb: 703353,
      tmdb: 81266,
      tvrage: {}
    }
  },
  {
    number: 8,
    ids: {
      trakt: 184210,
      tvdb: 793782,
      tmdb: 107971,
      tvrage: {}
    }
  }
]

const mockExpectedShow = {
  ...mockTraktShow,
  seasons: 8,
  'poster-url': `https://image.tmdb.org/t/p/w500${mockPosterCall.posters[0].file_path}`,
  type: 'show'
}

module.exports = {
  createMockUser: createMockUser,
  mockShowAPI: mockShowAPI,
  mockAllShows: mockAllShows,
  mockUserAPI: mockUserAPI,
  mockGOT: mockGOT,
  mockSeasons: mockSeasons,
  mockFileInfo: mockFileInfo,
  mockUserUpdate: mockUserUpdate,
  mockPopularShows: mockPopularShows,
  mockSingleShow: mockSingleShow,
  mockErrorMessage: mockErrorMessage,
  mockTraktShow: mockTraktShow,
  mockPosterCall: mockPosterCall,
  mockSeasonsCall: mockSeasonsCall,
  mockExpectedShow: mockExpectedShow
}
