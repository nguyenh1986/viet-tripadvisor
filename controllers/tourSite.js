const { populate } = require('../models/tourSite')
const Site = require('../models/tourSite')

function calcRating(site) {
    if (!site.reviews || site.reviews.length == 0) { return 0 }
    return site.reviews
    .map(r => parseInt(r.stars))
    .reduce((a,b) => a + b, 0) / site.reviews.length
}

function showAll(req, res) {
    Site.find({}, (err, sites) => {
        sites.forEach(s => s.rating = calcRating(s))
        res.render('index' , { sites: sites })
    })
}

function showOne(req, res) {
    Site.findById(req.params.id)
    .populate('reviews.user')
    .exec((err, site) => {
        if (err) { console.log(err) }
        res.render('sites/show', { site: site })
    })
}

function createView(req, res) {
    res.render('sites/new')
}

function createSite(req, res) {
    const site = new Site(req.body)
    site.save(err => {
        if (err) { console.log(err) }
        res.redirect('/')
    })
}

function editView(req, res) {
    Site.findById(req.params.id, (err, site) => {
        if (err) { console.log(err) }
        res.render('sites/edit', { site:  site })
    })
}

function editSite(req, res) {
    const id = req.params.id
    Site.findById(req.params.id, (err, site) => {
        if (err) { console.log(err) }
        Object.assign(site, req.body)
        site.save(err => {
            if (err) { console.log(err) }
            res.redirect('/sites/' + id)
        })
    })
}

module.exports = {
    showAll,
    showOne,
    createView,
    createSite,
    editView,
    editSite
}