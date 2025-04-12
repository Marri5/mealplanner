import { Recipe } from '~/server/models/Recipe';

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const {
      search = '',
      cuisine = '',
      difficulty = '',
      time = '',
      page = 1,
      limit = 12,
    } = query;

    // Build filter object
    const filter: any = { isPublic: true };
    
    if (cuisine) {
      filter.cuisine = cuisine;
    }
    
    if (difficulty) {
      filter.difficulty = difficulty;
    }
    
    if (time) {
      filter.$expr = {
        $lte: [
          { $add: ['$prepTime', '$cookTime'] },
          parseInt(time as string),
        ],
      };
    }
    
    if (search) {
      filter.$text = { $search: search };
    }

    // Execute query with pagination
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    
    const [recipes, total] = await Promise.all([
      Recipe.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit as string))
        .populate('author', 'name'),
      Recipe.countDocuments(filter),
    ]);

    return {
      recipes,
      pagination: {
        total,
        page: parseInt(page as string),
        pages: Math.ceil(total / parseInt(limit as string)),
      },
    };
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw createError({
      statusCode: 500,
      message: 'Error fetching recipes',
    });
  }
}); 