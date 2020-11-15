let express = require('express');
let router = express.Router();
let send = require("../utils/send");
let deleteQueue = require("../utils/delete");
let getMsg = require("../utils/getMsg");


router.post('/send', (req, res, next) => {
  let {msg} = req.body;
  send(msg).then(
    () => {
      res.send("ok");
    }
  )
});

router.post("/deleteQueue", (req, res, next) => {
  let {queue} = req.body;
  deleteQueue(queue).then(
    () => {
      res.send("ok");
    }
  )
});

router.get("/getMsg", (req, res, next) => {
  let {queue} = req.query;
  getMsg(queue).then(
    msg => {
      res.json(msg);
    }
  )
})

module.exports = router;