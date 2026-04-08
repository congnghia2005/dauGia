import User from "../Model/User.js";

export const getUsersByExactAge = async (req, res) => {
  try {
    const age = parseInt(req.query.age);

    if (!age) {
      return res.status(400).json({ message: "Thiếu age" });
    }

    const users = await User.aggregate([
      {
        $addFields: {
          dobDate: {
            $dateFromString: {
              dateString: "$dob",
              format: "%Y-%m-%d"
            }
          }
        }
      },
      {
        $addFields: {
          age: {
            $dateDiff: {
              startDate: "$dobDate",
              endDate: new Date(),
              unit: "year"
            }
          }
        }
      },
      {
        $match: {
          age: age
        }
      },
      {
        $project: {
          username: 1,
          email: 1,
          age: 1,
          local:1,
          _id: 0
        }
      }
    ]);

    res.json(users);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};