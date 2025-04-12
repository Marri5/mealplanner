import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  unit: { type: String, required: true },
  notes: String,
});

const instructionSchema = new mongoose.Schema({
  step: { type: Number, required: true },
  description: { type: String, required: true },
  time: Number, // in minutes
  temperature: {
    value: Number,
    unit: { type: String, enum: ['C', 'F'] },
  },
});

const nutritionSchema = new mongoose.Schema({
  calories: Number,
  protein: Number,
  carbohydrates: Number,
  fat: Number,
  fiber: Number,
  sugar: Number,
});

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  description: { type: String, required: true },
  ingredients: [ingredientSchema],
  instructions: [instructionSchema],
  prepTime: { type: Number, required: true }, // in minutes
  cookTime: { type: Number, required: true }, // in minutes
  servings: { type: Number, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  cuisine: { type: String, index: true },
  categories: [{ type: String, index: true }],
  nutrition: nutritionSchema,
  image: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: Number,
    comment: String,
    date: { type: Date, default: Date.now },
  }],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tags: [{ type: String, index: true }],
  isPublic: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

// Add text search index
recipeSchema.index({ 
  title: 'text', 
  description: 'text', 
  'ingredients.name': 'text' 
});

// Virtual for total time
recipeSchema.virtual('totalTime').get(function() {
  return this.prepTime + this.cookTime;
});

// Method to check if user has favorited
recipeSchema.methods.isFavoritedBy = function(userId: string) {
  return this.favorites.includes(userId);
};

export const Recipe = mongoose.model('Recipe', recipeSchema);