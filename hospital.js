const util = require('util');
const ModTemplate = require('../../lib/templates/template');

function Hospital(app) {

  if (!(this instanceof Hospital)) { return new Hospital(app); }

  Todo.super_.call(this);

  this.app             = app;

  this.name            = "Hospital";
  this.browser_active  = 0;

  return this;
}

module.exports = Hospital;
util.inherits(Hospital, ModTemplate);





Hospital.prototype.onConfirmation = function onConfirmation(blk, tx, conf, app) {

  if (tx.transaction.msg.module != "Hospital") { return; }

  if (conf == 0) {

    let hospital = app.modules.returnModule("hospital");

  }
}



