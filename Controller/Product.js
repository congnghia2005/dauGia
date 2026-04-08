import Product from "../Model/Product.js";

export const getProductsByCategory = async (req, res) => {
  try {
    const category = req.query.category;

    if (!category) {
      return res.status(400).json({ message: "Thiếu category" });
    }

    const products = await Product.find({ category: category });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
