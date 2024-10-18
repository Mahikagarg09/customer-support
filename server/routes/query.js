const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const Query = require("../models/query")

// Add a query to the database
router.post("/add", async (req, res) => {
    try {
        const { userId, message } = req.body;
        const query = new Query({
          userId,
          message,
        });
        if (await query.save()) {
          res.status(201).json({
            message: "Query added successfully",
          });
        } else {
          res.status(400).json({
            message: "Failed to add query",
          });
        }
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
});

// Get all queries of a user from the database
router.post("/all", async (req, res) => {
    try {
        const { userId } = req.body;
        let queries;
        if (userId == "") {
          queries = await Query.find({ requested: "" }).sort({ timestamp: 1 });
        } else {
          queries = await Query.find({ userId, resolved: "" }).sort({
            timestamp: 1,
          });
        }
        if (queries) {
          res.status(200).json({
            queries,
          });
        } else {
          res.status(400).json({
            message: "Failed to get queries",
          });
        }
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
});

// Get current admin queries that are not resolved
router.post("/admin", async (req, res) => {
    try {
        const { userId } = req.body;
        const queries = await Query.find({ requested: userId, resolved: "" }).sort({
          timestamp: 1,
        });
        if (queries) {
          res.status(200).json({
            queries,
          });
        } else {
          res.status(400).json({
            message: "Failed to get queries",
          });
        }
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
});

// Get the queries resolved by the admin
router.post("/customer", async (req, res) => {
    try {
        const { userId } = req.body;
        const queries = await Query.find({ userId, resolved: { $ne: "" } }).sort({
          timestamp: 1,
        });
        if (queries) {
          res.status(200).json({
            queries,
          });
        } else {
          res.status(400).json({
            message: "Failed to get queries",
          });
        }
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
});

// Book slots by resolving queries
router.post("/slots", async (req, res) => {
    try {
        const { userId, ids } = req.body;
        const queries = await Query.updateMany(
          { _id: { $in: ids } },
          { requested: userId }
        );
        if (queries) {
          res.status(200).json({
            message: "Slots booked successfully",
          });
        } else {
          res.status(400).json({
            message: "Failed to resolve queries",
          });
        }
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
});

// Resolve a query
router.post("/resolve", async (req, res) => {
    try {
        const { queryId, solution } = req.body;
        const query = await Query.findOneAndUpdate(
          { _id: queryId },
          { resolved: solution }
        );
        if (query) {
          res.status(200).json({
            message: "Query resolved successfully",
          });
        } else {
          res.status(400).json({
            message: "Failed to resolve query",
          });
        }
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
});

module.exports = router;
