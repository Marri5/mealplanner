import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
  recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
  servings: { type: Number, required: true },
  notes: String,
  type: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'], required: true },
});

const dayPlanSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  meals: [mealSchema],
  notes: String,
});

const mealPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  days: [dayPlanSchema],
  isTemplate: { type: Boolean, default: false },
  templateName: String,
  shoppingList: [{
    ingredient: { type: String, required: true },
    amount: Number,
    unit: String,
    checked: { type: Boolean, default: false },
    category: String, // e.g., produce, dairy, meat, etc.
  }],
  nutritionSummary: {
    averageCaloriesPerDay: Number,
    averageProteinPerDay: Number,
    averageCarbsPerDay: Number,
    averageFatPerDay: Number,
  },
  tags: [String],
  isPublic: { type: Boolean, default: false },
}, {
  timestamps: true,
});

// Index for efficient querying
mealPlanSchema.index({ user: 1, startDate: -1 });
mealPlanSchema.index({ isTemplate: 1, user: 1 });

// Virtual for duration in days
mealPlanSchema.virtual('durationDays').get(function() {
  return Math.ceil((this.endDate - this.startDate) / (1000 * 60 * 60 * 24));
});

// Method to generate shopping list
mealPlanSchema.methods.generateShoppingList = async function() {
  // This would be implemented to aggregate ingredients across all meals
  // and combine similar items
};

// Method to calculate nutrition summary
mealPlanSchema.methods.calculateNutritionSummary = async function() {
  // This would be implemented to calculate average nutrition values
  // across all meals in the plan
};

export const MealPlan = mongoose.model('MealPlan', mealPlanSchema); 