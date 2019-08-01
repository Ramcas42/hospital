const util = require('util');
const ModTemplate = require('../../lib/templates/template');

function Hospital(app) {

  if (!(this instanceof Hospital)) { return new Hospital(app); }

  Todo.super_.call(this);

  this.app             = app;

  this.tasks           = {};

  this.name            = "Hospital";
  this.browser_active  = 0;
  this.handlesEmail    = 1;
  this.emailAppName    = "Hospital";

  return this;
}

module.exports = Hospital;
util.inherits(Hospital, ModTemplate);

Hospital.prototype.onConfirmation = function onConfirmation(blk, tx, conf, app) {
    if (tx.transaction.msg.module != "Hospital") { return; }
    if (conf == 0) {
      hospital = app.modules.returnModule("hospital");
      switch (tx.transaction.msg.type) {
        case "task":
          this.addTask(tx);
        case "checkbox":
          this.toggleCheckbox(tx);
        default:
          break;
      }
    }
  }

  Hospital.prototype.createHospitalTX = function createHospitalTx(data) {
    var newtx = this.app.wallet.createUnsignedTransactionWithDefaultFee(this.app.wallet.returnPublicKey());
  
    newtx.transaction.msg = Object.assign({}, data, { module: "Hospital" });
  
    var newtx = this.app.wallet.signTransaction(newtx);
  
    this.app.network.propagateTransactionWithCallback(newtx, () => {
      if (this.app.BROWSER) {
        alert("your message was propagated")
      }
    });
  
    return newtx;
  }