//Model
const User = require("../models/user");
const Connect = require("../models/user");

exports.create = (req, res) => {
  const newConnect = new Connect({
    request_sent: req.body.request_sent,
    request_received: req.body.request_received
  });

  newConnect
    .save()
    .then(() => res.json({ status: 200, data: "Request sent" }))
    .catch(err => {
      console.log(err);
      res.json({ status: 400, data: "Something went wrong" });
    });
};

exports.accept = (req, res) => {
  User.findById(req.body.request_sent)
    .then(requestSent => User.findByIdAndUpdate(req.body.request_sent, { connections: requestSent.connections.push(req.body.request_received) }))
    .then(() => findById(req.body.request_received))
    .then(requestReceived => User.findByIdAndUpdate(req.body.request_received, { connections: requestReceived.connections.push(req.body.request_sent) }))
    .then(() =>
      Connect.findByIdAndUpdate(req.body.id, { active: false })
        .then(() => res.json({ status: 200, data: "Request Accepted Successfully" }))
        .catch(err => {
          console.log(err);
          res.json({ status: 400, data: "Something went wrong" });
        })
    )
    .catch(err => {
      console.log(err);
      res.json({ status: 400, data: "Something went wrong" });
    });
};

exports.ignore = (req, res) => {
  Connect.findByIdAndUpdate(req.body.id, { active: false, ignored: true })
    .then(() => res.json({ status: 200, data: "Request Rejected Successfully" }))
    .catch(err => {
      console.log(err);
      res.json({ status: 400, data: "Something went wrong" });
    });
};

exports.cancel = (req, res) => {
  Connect.findByIdAndDelete(req.body.id)
    .then(() => res.json({ status: 200, data: "Request deleted successfully" }))
    .catch(err => {
      console.log(err);
      res.json({ status: 400, data: "Something went wrong" });
    });
};
