import { ProductModel } from '../models/product.model.js';
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

export const getProductsCountByCategory = async (req, res) => {
  try {
    const result = await ProductModel.aggregate([
      {
        $group: {
          _id: '$catagory',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          count: 1
        }
      }
    ]);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch category product count' });
  }
}