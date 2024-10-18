const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const Query = require("../models/query")

// USER ADDS A QUERY
router.post("/add", async (req, res) => {
    const { userId, sender, message, queryId } = req.body;

    if (!userId || !sender || !message) {
        return res.status(400).send('All fields are required.');
    }

    try {
        let userQuery;

        if (queryId) {
            // If a queryId is provided, find the existing query
            userQuery = await Query.findById(queryId);

            if (!userQuery) {
                return res.status(404).send('Query not found.');
            }

            // Add the new message to the existing query's messages array
            userQuery.messages.push({ sender, message });
        } else {
            // If no queryId is provided, create a new query
            userQuery = new Query({
                userId,
                messages: [{ sender, message }],
            });
        }

        // Save the query (new or updated)
        await userQuery.save();

        res.status(200).json({ message: 'Message saved successfully', data: userQuery });
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ message: 'Error saving the message', error });
    }
});

//AGENT REPLIES TO QUERY
router.post("/resolve", async (req, res) => {
    try {
        const { queryId, agentMessage, resolve } = req.body;

        // Ensure queryId and agentMessage are provided
        if (!queryId || !agentMessage) {
            return res.status(400).json({
                message: "Query ID and agent message are required.",
            });
        }

        // Find the query by ID
        const query = await Query.findOne({ _id: queryId });

        if (!query) {
            return res.status(404).json({
                message: "Query not found",
            });
        }

        // Append the agent's reply to the messages array
        query.messages.push({
            sender: 'agent',
            message: agentMessage,
        });

        // Optionally mark the query as resolved if the agent chooses to do so
        if (resolve === true) {
            query.resolved = true;
        }

        // Save the updated query document
        await query.save();

        res.status(200).json({
            message: `Agent reply added${resolve ? ' and query resolved' : ''} successfully`,
            data: query,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
});

//IF QUERY IS RESOLVED
router.put("/mark-resolved", async (req, res) => {
    try {
        const { queryId } = req.body;  // The query ID is sent in the request body

        // Ensure the queryId is provided
        if (!queryId) {
            return res.status(400).json({
                message: "Query ID is required to mark it as resolved",
            });
        }

        // Find the query by ID and set resolved to true
        const query = await Query.findOneAndUpdate(
            { _id: queryId },
            { resolved: true },
            { new: true }  // Return the updated document
        );

        if (!query) {
            return res.status(404).json({
                message: "Query not found",
            });
        }

        res.status(200).json({
            message: "Query marked as resolved successfully",
            data: query,  // Return the updated query details
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
})

//FETCH ALLL QUERIES
router.post("/all", async (req, res) => {
    try {
        const { userId } = req.body;
        let queries;
        if (userId == "") {
            //it retrieves all queries that haven't been requested yet
            queries = await Query.find({ requested: "" }).sort({ timestamp: 1 });
        } else {
            // it retrieves only that user's unresolved queries 
            queries = await Query.find({ userId, resolved: false }).sort({
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

//GET ALL ADMIN QUERIES WHICH ARE ALLOTED TO HIM ANF NOT RESOLVED
router.post("/admin", async (req, res) => {
    try {
        const { userId } = req.body;
        const queries = await Query.find({ requested: userId, resolved: false }).sort({
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

//TO GET QUERIES RESOLVED BY AGENT
router.post("/customer", async (req, res) => {
    try {
        const { userId } = req.body;
        const queries = await Query.find({ userId, resolved: false }).sort({
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

//FETCH QUERY CONVERSATION
router.get('/:queryId', async (req, res) => {
    try {
        const { queryId } = req.params;

        // Find the query by ID
        const query = await Query.findById(queryId);

        if (!query) {
            return res.status(404).json({ message: 'No query found with this ID.' });
        }

        // Return messages associated with the query
        return res.status(200).json({ messages: query.messages });
    } catch (error) {
        console.error("Error fetching messages:", error);
        return res.status(500).json({ message: 'Server error.' });
    }
});
module.exports = router;