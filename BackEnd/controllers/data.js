const Blackcoffer = require("../models/data-table");

exports.fetchAll = async (req, res, next) => {
  try {
    const result = await Blackcoffer.find();

    if (result.length > 0) {
      res
        .status(200)
        .json({ message: "Data fetched successfully", data: result });
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error while fetching data", error: err });
  }
};

exports.fetchIntensity = async (req, res, next) => {
  try {
    const result = await Blackcoffer.find(
      { intensity: { $exists: true } },
      {
        _id: 0,
        intensity: 1,
        added: 1,
        sector: 1,
        topic: 1,
        region: 1,
        country: 1,
        end_year: 1,
      }
    );

    if (result.length > 0) {
      res
        .status(200)
        .json({ message: "Data fetched successfully", data: result });
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error while fetching data", error: err });
  }
};

exports.fetchLikelihood = async (req, res, next) => {
  try {
    const result = await Blackcoffer.find(
      { likelihood: { $exists: true } },
      {
        _id: 0,
        likelihood: 1,
        added: 1,
        sector: 1,
        topic: 1,
        region: 1,
        country: 1,
        end_year: 1,
      }
    );

    if (result.length > 0) {
      res
        .status(200)
        .json({ message: "Data fetched successfully", data: result });
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error while fetching data", error: err });
  }
};

exports.fetchRelevance = async (req, res, next) => {
  try {
    const result = await Blackcoffer.find(
      { relevance: { $exists: true } },
      {
        _id: 0,
        relevance: 1,
        added: 1,
        sector: 1,
        topic: 1,
        region: 1,
        country: 1,
        end_year: 1,
      }
    );

    if (result.length > 0) {
      res
        .status(200)
        .json({ message: "Data fetched successfully", data: result });
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error while fetching data", error: err });
  }
};

// exports.fetchYear = async (req, res, next) => {
//   try {
//     const result = await Blackcoffer.find(
//       { added: { $exists: true } },
//       {
//         _id: 0,
//         intensity: 1,
//         added: 1,
//         sector: 1,
//         topic: 1,
//         region: 1,
//         country: 1,
//       }
//     );

//     if (result.length > 0) {
//       res
//         .status(200)
//         .json({ message: "Data fetched successfully", data: result });
//     } else {
//       res.status(404).json({ message: "Data not found" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: "Error while fetching data", error: err });
//   }
// };

// exports.fetchIntensity = async (req, res, next) => {
//   try {
//     const result = await Blackcoffer.find(
//       { intensity: { $exists: true } },
//       {
//         _id: 0,
//         intensity: 1,
//         added: 1,
//         sector: 1,
//         topic: 1,
//         region: 1,
//         country: 1,
//       }
//     );

//     if (result.length > 0) {
//       res
//         .status(200)
//         .json({ message: "Data fetched successfully", data: result });
//     } else {
//       res.status(404).json({ message: "Data not found" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: "Error while fetching data", error: err });
//   }
// };

// exports.fetchIntensity = async (req, res, next) => {
//   try {
//     const result = await Blackcoffer.find(
//       { intensity: { $exists: true } },
//       {
//         _id: 0,
//         intensity: 1,
//         added: 1,
//         sector: 1,
//         topic: 1,
//         region: 1,
//         country: 1,
//       }
//     );

//     if (result.length > 0) {
//       res
//         .status(200)
//         .json({ message: "Data fetched successfully", data: result });
//     } else {
//       res.status(404).json({ message: "Data not found" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: "Error while fetching data", error: err });
//   }
// };

// exports.fetchIntensity = async (req, res, next) => {
//   try {
//     const result = await Blackcoffer.find(
//       { intensity: { $exists: true } },
//       {
//         _id: 0,
//         intensity: 1,
//         added: 1,
//         sector: 1,
//         topic: 1,
//         region: 1,
//         country: 1,
//       }
//     );

//     if (result.length > 0) {
//       res
//         .status(200)
//         .json({ message: "Data fetched successfully", data: result });
//     } else {
//       res.status(404).json({ message: "Data not found" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: "Error while fetching data", error: err });
//   }
// };
