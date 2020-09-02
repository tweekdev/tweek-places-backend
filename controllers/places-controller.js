const HttpError = require('../models/http-error');
const { v4: uuid4 } = require('uuid');
let DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: 'u1',
  },
];

const getPlaceById = (req, res, next) => {
  console.log('GET request in places');
  const placeId = req.params.pid; //{pid: p1}
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  if (!place) {
    throw new HttpError('Could not find place for the provided id.', 404);
  }
  res.json({ place }); //{id: place} => { place: place}
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid; //{pid: p1}
  const places = DUMMY_PLACES.filter((p) => {
    return p.creator === userId;
  });
  if (!places || places.length === 0) {
    return next(
      HttpError('Could not find places for the provided user id.', 404)
    );
  }
  res.json({ places }); //{creactor: place} => { place: place}
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, adress, creator } = req.body;
  // const title = req.body.title
  const createdPlace = {
    id: uuid4(),
    title: title,
    description: description,
    coordinates: coordinates,
    adress: adress,
    creator: creator,
  };

  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid; //{pid: p1}
  const updatedPlace = {
    ...DUMMY_PLACES.find((p) => {
      return p.id === placeId;
    }),
  };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid; //{pid: p1}
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: 'Place deleted.' });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
