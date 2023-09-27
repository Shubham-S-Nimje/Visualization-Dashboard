const path = require("path");
const express = require("express");
const router = express.Router();

const dataController = require("../controllers/data");

router.use("/fetch-all", dataController.fetchAll);

router.use("/fetch-intensity", dataController.fetchIntensity);

router.use("/fetch-likelihood", dataController.fetchLikelihood);

router.use("/fetch-relevance", dataController.fetchRelevance);

// router.use("/fetch-country", dataController.fetchcountry);

// router.use("/fetch-topics", dataController.fetchtopics);

// router.use("/fetch-region", dataController.fetchregion);

// router.use("/fetch-city", dataController.fetchcity);

// router.use("/fetch-year", dataController.fetchYear);

module.exports = router;
