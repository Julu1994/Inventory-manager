import { ProductModel } from '../models/product.model.js';
import { QuantityChangeModel } from '../models/quantityChange.model.js';
import { RemovedProductModel } from '../models/removedProduct.model.js';

/**
 * Counts the total number of products in the database.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const getProductCount = async (req, res) => {
  try {
    const productCount = await ProductModel.countDocuments({});
    res.json({ count: productCount });
  } catch (error) {
    res.status(500).json({ error: "Could not fetch product count" });
  }
};

/**
 * Counts newly added products each day.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
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

/**
 * Counts products by category.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
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

/**
 * Counts removed products from database showing the date as well.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
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

/**
 * Counts products inbound/quantity on daily basis. 
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const getProductsQuantity = async (req, res) => {
  try {
    const data = await QuantityChangeModel.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt"
            }
          },
          totalQuantity: {
            $sum: "$change"
          }
        }
      },
      {
        $sort: { "_id": 1 }
      }
    ]);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

/**
 * Counts products type - regular and discounted products.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const getProductsType = async (req, res) => {
  try {
    const data = await ProductModel.aggregate([
      {
        $group: {
          _id: "$type",
          count: {
            $sum: 1
          }
        }
      }
    ]);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
/**
 * Counts total products quantity on daily basis.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const getTotalProductsQuantity = async (req, res) => {
  try {
    const data = await QuantityChangeModel.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt"
            }
          },
          totalQuantity: {
            $sum: "$change"
          }
        }
      },
      {
        $sort: { "_id": 1 }
      }
    ]);

    let cumulativeData = [];
    let total = 0;
    for (let item of data) {
      total += item.totalQuantity;
      cumulativeData.push({
        _id: item._id,
        totalQuantity: total
      });
    }

    res.json(cumulativeData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
