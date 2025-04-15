// controllers/requestController.js
const Request = require('../models/Request');

// Create a new service request (Student only)
const createRequest = async (req, res) => {
  if (req.user.role !== 'Student') {
    return res.status(403).json({ message: 'Only students can create service requests' });
  }

  const { serviceType, description, roomNumber } = req.body;

  try {
    const newRequest = await Request.create({
      serviceType,
      description,
      roomNumber,
      student: req.user._id,
    });

    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get requests for service person based on their role
const getServiceRequests = async (req, res) => {
  if (req.user.role === 'Student') {
    return res.status(403).json({ message: 'Students cannot view service requests' });
  }

  try {
    const requests = await Request.find({ serviceType: req.user.role, status: 'Pending' });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Accept a service request (Service person only)
const acceptRequest = async (req, res) => {
  if (req.user.role === 'Student') {
    return res.status(403).json({ message: 'Students cannot accept service requests' });
  }

  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (request.servicePerson) {
      return res.status(400).json({ message: 'Request has already been accepted' });
    }

    const activeRequest = await Request.findOne({
      servicePerson: req.user._id,
      status: 'Processing',
    });

    if (activeRequest) {
      return res.status(400).json({ message: 'You are already processing another request' });
    }

    request.servicePerson = req.user._id;
    request.status = 'Processing';
    await request.save();

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update request status to Successful (Service person only)
const markAsSuccessful = async (req, res) => {
  if (req.user.role === 'Student') {
    return res.status(403).json({ message: 'Students cannot update request status' });
  }

  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (request.servicePerson.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only update requests you are assigned to' });
    }

    request.status = 'Successful';
    await request.save();

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get request history for service person
const getRequestHistory = async (req, res) => {
  if (req.user.role === 'Student') {
    return res.status(403).json({ message: 'Students cannot view request history' });
  }

  try {
    const history = await Request.find({ servicePerson: req.user._id });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get request history for students (Student only)
const getStudentRequestHistory = async (req, res) => {
  if (req.user.role !== 'Student') {
    return res.status(403).json({ message: 'Only students can view their request history' });
  }

  try {
    const history = await Request.find({ student: req.user._id })
      .sort({ createdAt: -1 })  // Sort by most recent
      .select('serviceType description status roomNumber createdAt')  // Select relevant fields
      .exec();

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createRequest,
  getServiceRequests,
  acceptRequest,
  markAsSuccessful,
  getRequestHistory,
  getStudentRequestHistory
};
