const mongoose = require('mongoose')
const Review = require('../models/review')
const Site = require('../models/tourSite')

function addReview(req, res) {
    const siteId = req.params.id
    const review =  new Review(req.body)
    const user = res.locals.user
    review.user = mongoose.Types.ObjectId(user.id)
    review.save(err => {
        if (err) { console.log(err) }
        Site.findById(siteId, (err, site) => {
            if (err) { console.log(err) }
            site.reviews.push(review)
            site.save(err => {
                if (err) { console.log(err) }
                res.redirect('/sites/' + siteId)
            })
        })
    })
}

function deleteOne(req, res) {
    const siteId = req.params.siteId
    const reviewId = req.params.reviewId
    console.log(siteId)
    console.log(reviewId)
    Site.findByIdAndUpdate(
        siteId,
        {$pull: { reviews: {_id: reviewId} }},
        {safe: true, upsert: true},
        (err, site ) => {
            if (err) { console.log(err) }
            res.redirect('/sites/' +  siteId)
        }
    )
}

module.exports = {
    addReview,
    deleteOne
}