const Request = require('../models/Request');
const nodemailer = require('nodemailer');
const User = require('../models/User');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

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

const acceptRequest = async (req, res) => {
  if (req.user.role === 'Student') {
    return res.status(403).json({ message: 'Students cannot accept service requests' });
  }

  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    if (request.servicePerson) return res.status(400).json({ message: 'Request has already been accepted' });

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

    const student = await User.findById(request.student);

    if (student?.email) {
      const acceptMailOptions = {
        from: 'campusfix.admn@gmail.com',
        to: student.email,
        subject: 'Your service request has been accepted',
        text: `Hello ${student.name},\n\nYour request for "${request.serviceType}" has been accepted by ${req.user.name} on ${new Date().toLocaleString()}.\n\nThey will attend to it soon.\n\nThank you for using our service.`,
      };

      await transporter.sendMail(acceptMailOptions);
    }

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markAsSuccessful = async (req, res) => {
  if (req.user.role === 'Student') {
    return res.status(403).json({ message: 'Students cannot update request status' });
  }

  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    if (request.servicePerson.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only update requests you are assigned to' });
    }

    request.status = 'Successful';
    await request.save();

    const student = await User.findById(request.student);

    if (student?.email) {
      const completionMailOptions = {
        from: 'campusfix.admn@gmail.com',
        to: student.email,
        subject: 'Your service request has been completed',
        text: `Hello ${student.name},\n\nYour request for "${request.serviceType}" has been successfully completed by ${req.user.name} on ${new Date().toLocaleString()}.\n\nThanks for using our service.`,
      };

      await transporter.sendMail(completionMailOptions);
    }

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRequestHistory = async (req, res) => {
  if (req.user.role === 'Student') {
    return res.status(403).json({ message: 'Students cannot view request history' });
  }

  try {
    const history = await Request.find({ servicePerson: req.user._id })
      .sort({ createdAt: -1 })  // ✅ Sort by newest first
      .select('serviceType description status roomNumber student createdAt')
      .exec();

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getStudentRequestHistory = async (req, res) => {
  if (req.user.role !== 'Student') {
    return res.status(403).json({ message: 'Only students can view their request history' });
  }

  try {
    const history = await Request.find({ student: req.user._id })
      .sort({ createdAt: -1 })
      .select('serviceType description status roomNumber createdAt')
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
