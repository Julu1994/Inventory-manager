export const getProductCount = async (req, res) => {
  try {
    const productCount = await ProductModel.countDocuments({});
    res.json({ count: productCount });
  } catch (error) {
    res.status(500).json({ error: "Could not fetch product count" });
  }
};

export const getDailyProductCount = async (req, res) => {
  try {
    const dailyProductCount = await ProductModel.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(dailyProductCount);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch daily product count" });
  }
};
