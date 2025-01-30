const { v4: uuidv4 } = require('uuid'); // Use UUID for unique ID generation
const { currentTimeInSeconds } = require('.');

function customPluginInModels(schema) {
  // Add a custom `id` field
  schema.add({
    createdAt: {
      type: String,
      unique: true,
      default: currentTimeInSeconds, // Auto-generate a UUID
    },
  });

  // Ensure `id` is always included in JSON and Object outputs
  schema.set('toJSON', {
    virtuals: true, 
    transform: (doc, ret) => {
      delete ret._id; // Remove `_id` from the output
      delete ret.__v; // Remove `__v` from the output
      return ret;
    },
  });

  schema.set('toObject', { virtuals: true });
}

module.exports = {customPluginInModels};
