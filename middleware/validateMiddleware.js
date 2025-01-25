// middleware/validateRequiredItems.js

const validateRequiredItems = (requiredItems) => {
  console.log("line 4")
    return (req, res, next) => {
      console.log("inside validateRequiredItems" , req.body)
      for (let item of requiredItems) {
        if (!req.body[item]) {
          return res.status(400).json({
            error: `${item} is required`,
          });
        }
      }
      next();
    };
  };
  
  module.exports = validateRequiredItems;
  