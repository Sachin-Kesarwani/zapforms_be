// middleware/validateRequiredItems.js

const validateRequiredItems = (requiredItems) => {
    return (req, res, next) => {
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
  