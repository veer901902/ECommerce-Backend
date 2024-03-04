import Brand from "../model/Brands.js"


export const fetchBrands = async (req, res) =>{
    try{
        const brands = await Brand.find({});
        res.status(200).json(brands);
    }
    catch(error){
        res.status(400).json(error);
    }
}

export const createBrand = async (req, res) => {
    try {
      const brand = await Brand.create(req.body);
      res.status(201).json(brand);
    } catch (error) {
      res.status(400).json(error);
    }
  };