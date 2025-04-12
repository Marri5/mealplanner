import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const dietaryPreferenceSchema = new mongoose.Schema({
  type: { type: String, enum: ['vegetarian', 'vegan', 'pescatarian', 'keto', 'paleo', 'gluten-free', 'dairy-free', 'other'] },
  notes: String,
});

const allergySchema = new mongoose.Schema({
  ingredient: { type: String, required: true },
  severity: { type: String, enum: ['mild', 'moderate', 'severe'], required: true },
  notes: String,
});

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  avatar: String,
  bio: String,
  dietaryPreferences: [dietaryPreferenceSchema],
  allergies: [allergySchema],
  favoriteRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
  createdRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
  mealPlans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MealPlan' }],
  settings: {
    measurementSystem: { type: String, enum: ['metric', 'imperial'], default: 'metric' },
    language: { type: String, default: 'en' },
    emailNotifications: { type: Boolean, default: true },
    theme: { type: String, enum: ['light', 'dark', 'system'], default: 'system' },
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  lastLogin: Date,
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to get public profile
userSchema.methods.getPublicProfile = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.settings;
  delete userObject.role;
  delete userObject.isActive;
  return userObject;
};

export const User = mongoose.model('User', userSchema); 