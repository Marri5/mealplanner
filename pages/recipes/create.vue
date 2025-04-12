<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold mb-8">Create New Recipe</h1>

    <form @submit.prevent="handleSubmit" class="space-y-8">
      <!-- Basic Information -->
      <div class="space-y-6">
        <h2 class="text-xl font-semibold">Basic Information</h2>
        
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Recipe Title</label>
          <input
            type="text"
            id="title"
            v-model="form.title"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            id="description"
            v-model="form.description"
            rows="3"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600"
          ></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label for="prepTime" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Prep Time (minutes)</label>
            <input
              type="number"
              id="prepTime"
              v-model="form.prepTime"
              required
              min="0"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label for="cookTime" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Cook Time (minutes)</label>
            <input
              type="number"
              id="cookTime"
              v-model="form.cookTime"
              required
              min="0"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label for="servings" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Servings</label>
            <input
              type="number"
              id="servings"
              v-model="form.servings"
              required
              min="1"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="difficulty" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Difficulty</label>
            <select
              id="difficulty"
              v-model="form.difficulty"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div>
            <label for="cuisine" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Cuisine</label>
            <input
              type="text"
              id="cuisine"
              v-model="form.cuisine"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>
      </div>

      <!-- Ingredients -->
      <div class="space-y-6">
        <h2 class="text-xl font-semibold">Ingredients</h2>
        <div v-for="(ingredient, index) in form.ingredients" :key="index" class="flex items-center space-x-4">
          <input
            type="text"
            v-model="form.ingredients[index]"
            required
            class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <button
            type="button"
            @click="removeIngredient(index)"
            class="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
        <button
          type="button"
          @click="addIngredient"
          class="text-emerald-600 hover:text-emerald-700"
        >
          + Add Ingredient
        </button>
      </div>

      <!-- Instructions -->
      <div class="space-y-6">
        <h2 class="text-xl font-semibold">Instructions</h2>
        <div v-for="(instruction, index) in form.instructions" :key="index" class="flex items-start space-x-4">
          <span class="mt-2 font-semibold">{{ index + 1 }}.</span>
          <textarea
            v-model="form.instructions[index]"
            required
            rows="2"
            class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600"
          ></textarea>
          <button
            type="button"
            @click="removeInstruction(index)"
            class="mt-2 text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
        <button
          type="button"
          @click="addInstruction"
          class="text-emerald-600 hover:text-emerald-700"
        >
          + Add Step
        </button>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-end">
        <button
          type="submit"
          class="btn-primary"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Creating...' : 'Create Recipe' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const isSubmitting = ref(false);

const form = ref({
  title: '',
  description: '',
  prepTime: 0,
  cookTime: 0,
  servings: 1,
  difficulty: 'medium',
  cuisine: '',
  ingredients: [''],
  instructions: ['']
});

const addIngredient = () => {
  form.value.ingredients.push('');
};

const removeIngredient = (index: number) => {
  form.value.ingredients.splice(index, 1);
};

const addInstruction = () => {
  form.value.instructions.push('');
};

const removeInstruction = (index: number) => {
  form.value.instructions.splice(index, 1);
};

const handleSubmit = async () => {
  try {
    isSubmitting.value = true;
    const response = await fetch('/api/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    });

    if (!response.ok) {
      throw new Error('Failed to create recipe');
    }

    const data = await response.json();
    router.push(`/recipes/${data.id}`);
  } catch (error) {
    console.error('Error creating recipe:', error);
    // TODO: Show error message to user
  } finally {
    isSubmitting.value = false;
  }
};
</script> 