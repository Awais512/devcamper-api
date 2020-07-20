const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
//@desc      Get all Bootcamps
//@Route     GET /api/v1/bootcamps
//@access    Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();
  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});

//@desc      Get Single Bootcamps
//@Route     GET /api/v1/bootcamps/:id
//@access    Private
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return new ErrorResponse(
      `Bootcamp does not found with the id of ${req.params.id}`,
      404
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
});

//@desc      Create new Bootcamp
//@Route     Post /api/v1/bootcamps
//@access    Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

//@desc      Update Bootcamp
//@Route     PUT /api/v1/bootcamps/:id
//@access    Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp) {
    return new ErrorResponse(
      `Bootcamp does not found with the id of ${req.params.id}`,
      404
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
});

//@desc      Delete Bootcamp
//@Route     DELETE /api/v1/bootcamps/:id
//@access    Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    return new ErrorResponse(
      `Bootcamp does not found with the id of ${req.params.id}`,
      404
    );
  }
  res.status(200).json({ success: true, data: {} });
});
