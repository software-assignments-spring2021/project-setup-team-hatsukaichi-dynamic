// This file contains mock data for handling Mockaroo rate limit exceeded errors
const createMockUser = (id) => {
  return ({
    "id": id,
    "username": "mlaffan0",
    "password": "njb9oAB",
    "email": "jparkin0@utexas.edu",
    "bio": "Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
    "img": "http://dummyimage.com/182x112.jpg/dddddd/000000",
    "shows": mockShows,
    }
  )
}

const mockShows = JSON.parse(`[{
  "id": 36,
  "platform": "Babblestorm",
  "completed": false,
  "progess": 30
},{
  "id": 3,
  "platform": "Topiclounge",
  "completed": false,
  "progess": 78
},
{
  "id": 54,
  "platform": "Fiveclub",
  "completed": true,
  "progess": 8
},
{
  "id": 42,
  "platform": "Feednation",
  "completed": false,
  "progess": 71
},
{
  "id": 96,
  "platform": "Gigashots",
  "completed": false,
  "progess": 17
},
{
  "id": 11,
  "platform": "Gigaclub",
  "completed": true,
  "progess": 22
}]`)

const mockShowAPI = {
  '54': {
    "id": 54,
    "name": "Ladies They Talk About",
    "description": "Aenean sit amet justo.",
    "genres": "Drama|Romance",
    "isMovie": false,
    "episodes": 66,
    "coverPhoto": "http://dummyimage.com/243x117.png/dddddd/000000"
  },
  '42': {
    "id": 42,
    "name": "Samouraï, Le (Godson, The)",
    "description": "Etiam pretium iaculis justo.",
    "genres": "Crime|Drama|Thriller",
    "isMovie": false,
    "episodes": 56,
    "coverPhoto": "http://dummyimage.com/246x181.png/cc0000/ffffff"
  },
  '96': {
    "id": 96,
    "name": "Bob Saget: That Ain't Right",
    "description": "Proin eu mi. Nulla ac enim.",
    "genres": "Comedy",
    "isMovie": true,
    "episodes": 1,
    "coverPhoto": "http://dummyimage.com/174x138.png/dddddd/000000"
  },
  '11': {
    "id": 11,
    "name": "Ca$h",
    "description": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
    "genres": "Crime|Thriller",
    "isMovie": true,
    "episodes": 1,
    "coverPhoto": "http://dummyimage.com/225x181.png/cc0000/ffffff"
  }
};

module.exports = {
  createMockUser: createMockUser,
  mockShowAPI: mockShowAPI,
}