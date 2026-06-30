const express = require("express");

const router = express.Router();


// =================================================
// IMPORT CONTROLLER
// =================================================

const aiController = require(
  "../controllers/aiController"
);


// =================================================
// ROUTES
// =================================================

// POST : /api/ai/chat

router.post(
  "/chat",
  aiController.generateAIResponse
);


// =================================================
// EXPORT ROUTER
// =================================================

module.exports = router;