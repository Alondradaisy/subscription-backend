const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
    let data = await axios.get(
        "https://api.stripe.com",
        {
            headers: {
                Accept: "application/json",
                "Authorization: Bearer sk_test_51I6td0KUZUZuIjL9pLkO9AKO7EhSBALlSDil95hmnxIyDGjwHR5mbtaF6mFSa1Lcj45wbTNvOruu6opCLHmj9LPf00QRIQTtgu",
            },
        }
    );
    res.status(200).json(data.data);
});
module.exports = router;