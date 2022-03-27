var express = require('express');
var router = express.Router();
const reviewController = require('../controllers/review')

router.post('/sites/:id/reviews', reviewController.addReview)
router.delete('/sites/:siteId/reviews/:reviewId', reviewController.deleteOne);

module.exports = router
