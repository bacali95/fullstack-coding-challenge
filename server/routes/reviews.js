const express = require("express");
const _ = require("underscore");
const router = express.Router();

const { getAverageRatings, getAverageTravelledWith } = require("../_util");
const { dataSourceConnector } = require("../connectors/data-service");

router.get("/:accommodationId", async function (req, res) {
  const reviews = await dataSourceConnector.getAccommodationReviews(
    req.params.accommodationId
  );

  if (!reviews) {
    return res.status(404).end();
  }

  const { page = "0", limit = 10, filterBy, sortBy = "entryDate" } = req.query;
  const filtered = reviews.filter((review) =>
    filterBy ? review.traveledWith === filterBy : true
  );
  const sorted = _.sortBy(filtered, sortBy).reverse(); // reverse to sort desc
  const paginated = sorted.slice(+page * limit, (+page + 1) * limit);

  res.json({ data: paginated, total: filtered.length, page: +page });
});

router.get("/average/:accommodationId", async function (req, res) {
  const reviews = await dataSourceConnector.getAccommodationReviews(
    req.params.accommodationId
  );

  if (!reviews) {
    return res.status(404).end();
  }

  let { generalAvg, aspectsAvg } = getAverageRatings(reviews);
  let traveledWithAvg = getAverageTravelledWith(reviews);
  res.json({ generalAvg, aspectsAvg, traveledWithAvg });
});

module.exports = router;
