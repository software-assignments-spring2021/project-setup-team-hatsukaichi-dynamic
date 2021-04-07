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

const createMockUser = (id, username, password, email) => {
  return {
    id: id,
    username: username || 'mlaffan0',
    password: password || 'njb9oAB',
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
    password: 'njb9oAB',
    email: 'jparkin0@utexas.edu',
    bio:
      'Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
    img: 'http://dummyimage.com/182x112.jpg/dddddd/000000',
    shows: mockShows
  },
  2: {
    id: 2,
    username: 'fgoodlett1',
    password: 'Y3DJKGN2',
    email: 'rgrolmann1@cloudflare.com',
    bio: 'Mauris sit amet cursus integer. Ut tellus.',
    img: 'https://dummyimage.com/194x133.png/ffffff/000000',
    shows: mockShows
  },
  3: {
    id: 3,
    username: 'msuff2',
    password: 'hrqkb4',
    email: 'msuff2',
    bio:
      'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
    img: 'https://dummyimage.com/194x133.png/dddddd/000000',
    shows: mockShows
  },
  4: {
    id: 4,
    username: 'dstuckford3',
    password: 'ykBWYvO',
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

const mockErrorMessage = {
  response: {
    status: 500,
    message: 'mockaroo api limit exceeded (probably)'
  }
}

module.exports = {
  createMockUser: createMockUser,
  mockShowAPI: mockShowAPI,
  mockAllShows: mockAllShows,
  mockUserAPI: mockUserAPI,
  mockUserUpdate: mockUserUpdate,
  mockErrorMessage: mockErrorMessage
}
