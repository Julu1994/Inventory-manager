import { ProductModel } from '../models/product.model.js';
import { RemovedProductModel } from '../models/removedProduct.model.js';
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

export const getRemovedProductsPerDay = (req, res, next) => {
  RemovedProductModel.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$removedAt" },
          month: { $month: "$removedAt" },
          day: { $dayOfMonth: "$removedAt" },
        },
        count: { $sum: 1 }
      }
    }
  ])
    .then(results => {
      res.status(200).json(results.map(result => ({
        date: `${result._id.year}-${result._id.month}-${result._id.day}`,
        count: result.count
      })));
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
