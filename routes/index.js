var express = require('express');
var router = express.Router();
const passport = require('passport');

const tourSiteController = require('../controllers/tourSite')

// views
router.get('/', tourSiteController.showAll);
router.get('/sites/new', tourSiteController.createView)
router.get('/sites/:id', tourSiteController.showOne)
router.get('/sites/:id/edit', tourSiteController.editView)

// api
router.post('/sites', tourSiteController.createSite)
router.post('/sites/:id', tourSiteController.editSite)

// login
router.get('/auth/google', passport.authenticate(
    'google',
    {
      scope: ['profile', 'email'],
      // Optionally force pick account every time
      // prompt: "select_account"
    }
));
router.get('/oauth2callback', passport.authenticate(
    'google',
    {
      successRedirect : '/',
      failureRedirect : '/'
    }
));
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});


module.exports = router;
