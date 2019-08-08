const util = require('util');
const ModTemplate = require('../../lib/templates/template');

function Hospital(app) {

  if (!(this instanceof Hospital)) { return new Hospital(app); }

  Hospital.super_.call(this);

  this.app             = app;

  this.name            = "Hospital";
  this.browser_active  = 0;

  return this;
}

module.exports = Hospital;
util.inherits(Hospital, ModTemplate);






/////////////////////////
// Handle Web Requests //
/////////////////////////
Hospital.prototype.webServer = function webServer(app, expressapp) {

  var reddit_self = this;

  expressapp.get('/hospital/', function (req, res) {
    res.sendFile(__dirname + '/web/index.html');
    return;
  });
  expressapp.get('/hospital/style.css', function (req, res) {
    res.sendFile(__dirname + '/web/style.css');
    return;
  });
  expressapp.get('/hospital/script.js', function (req, res) {
    res.sendFile(__dirname + '/web/script.js');
    return;
  });
  expressapp.get('/hostipal/img/:imagefile',  (req, res) => {
    var imgf = '/web/img/'+req.params.imagefile;
    if (imgf.indexOf("\/") != false) { return; }
    res.sendFile(__dirname + imgf);
    return;
  });

}







Hospital.prototype.onConfirmation = function onConfirmation(blk, tx, conf, app) {

  if (tx.transaction.msg.module != "Hospital") { return; }

  if (conf == 0) {

    let hospital = app.modules.returnModule("hospital");

  }
}



