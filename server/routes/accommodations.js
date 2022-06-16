const express = require("express");
const router = express.Router();

const { dataSourceConnector } = require("../connectors/data-service");

router.get("/", async function (req, res) {
  const accommodations = await dataSourceConnector.getAllAccommodations();

  res.json(accommodations);
});

router.get("/:accommodationId", async function (req, res) {
  const accommodation = await dataSourceConnector.getAccommodationById(
    req.params.accommodationId
  );

  if (!accommodation) {
    return res.status(404).end();
  }

  res.json(accommodation);
});

module.exports = router;
