const HttpError = require('../models/http-error');
const { v4: uuid4 } = require('uuid');
const { validationResult } = require('express-validator');
const getCoordsForAddress = require('../util/location');
const Place = require('../models/place');

const getPlaceById = async (req, res, next) => {
  console.log('GET request in places');
  const placeId = req.params.pid; //{pid: p1}
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (e) {
    const error = new HttpError(
      'Something went wrong, could not find a place.',
      500
    );
    return next(error);
  }
  if (!place) {
    const error = new HttpError(
      'Could not find place for the provided id.',
      404
    );
    return next(error);
  }
  res.json({ place: place.toObject({ getters: true }) }); //{id: place} => { place: place}
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid; //{pid: p1}

  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (e) {
    const error = new HttpError(
      'Fetching places failed, please try again.',
      500
    );
    return next(error);
  }
  if (!places || places.length === 0) {
    return next(
      HttpError('Could not find places for the provided user id.', 404)
    );
  }
  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  }); //{creactor: place} => { place: place}
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid input passed, please check your data.', 422)
    );
  }
  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  // const title = req.body.title
  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    creator,
  });

  try {
    await createdPlace.save();
  } catch (error) {
    return next(new HttpError('Create place failed, please try again.', 500));
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      'Invalid input passed, please check your data.',
      422
    );
    return next(error);
  }
  const { title, description } = req.body;
  const placeId = req.params.pid; //{pid: p1}

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (e) {
    const error = new HttpError(
      'Something went wrong, could not update place.',
      500
    );
    return next(error);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (e) {
    const error = new HttpError(
      'Something went wrong, could not update place.',
      500
    );
    return next(error);
  }

  res.status(200).json({ place: (await place).toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid; //{pid: p1}
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (e) {
    const error = new HttpError(
      'Something went wrong, could not delete place.',
      500
    );
    return next(error);
  }

  try {
    await place.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete place.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Place deleted.' });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
