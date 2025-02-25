// routes/requestRoutes.js
const express = require('express');
const {
  createRequest,
  getServiceRequests,
  acceptRequest,
  markAsSuccessful,
  getRequestHistory,
  getStudentRequestHistory
} = require('../controllers/requestController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createRequest);                 // Create a new request (Student)
router.get('/', protect, getServiceRequests);             // Get list of requests (Service Person)
router.put('/:id/accept', protect, acceptRequest);        // Accept a request (Service Person)
router.put('/:id/success', protect, markAsSuccessful);    // Mark a request as successful (Service Person)
router.get('/history', protect, getRequestHistory);
router.get('/student-history',protect,getStudentRequestHistory);
// Get request history (Service Person)

module.exports = router;
