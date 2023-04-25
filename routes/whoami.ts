import express from "express";

const whoami = express();

whoami.get("/", (req, res) => {
  res.json(req.session.sgid || {});
});

export default whoami;
