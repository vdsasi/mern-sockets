const express = require("express");
const router = express.Router();

router.post("/login", async (req, res) => {
  console.log("hitting endpoint of login");
});

router.post("/register", async (req, res) => {
  console.log("hitting endpoint of register");
});

module.exports = router;
