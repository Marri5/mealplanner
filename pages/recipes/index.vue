<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Page Header -->
    <div class="md:flex md:items-center md:justify-between mb-8">
      <div class="flex-1 min-w-0">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
          Recipes
        </h2>
      </div>
      <div class="mt-4 flex md:mt-0 md:ml-4">
        <NuxtLink to="/recipes/new" class="btn-primary">
          Add Recipe
        </NuxtLink>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg mb-8">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">Filters</h3>
      </div>
      <div class="p-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <!-- Search -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Search</label>
          <input
            type="text"
            v-model="filters.search"
            class="input-primary mt-1"
            placeholder="Search recipes..."
          />
        </div>

        <!-- Cuisine -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Cuisine</label>
          <select v-model="filters.cuisine" class="input-primary mt-1">
            <option value="">All Cuisines</option>
            <option v-for="cuisine in cuisines" :key="cuisine" :value="cuisine">
              {{ cuisine }}
            </option>
          </select>
        </div>

        <!-- Difficulty -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Difficulty</label>
          <select v-model="filters.difficulty" class="input-primary mt-1">
            <option value="">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <!-- Time -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Total Time</label>
          <select v-model="filters.time" class="input-primary mt-1">
            <option value="">Any Time</option>
            <option value="15">15 minutes or less</option>
            <option value="30">30 minutes or less</option>
            <option value="60">1 hour or less</option>
            <option value="120">2 hours or less</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Loading recipes...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500">{{ error }}</p>
      <button @click="refresh" class="btn-primary mt-4">
        Try Again
      </button>
    </div>

    <!-- Recipe Grid -->
    <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="recipe in data?.recipes" :key="recipe._id" class="card">
        <div class="relative pb-2/3">
          <img
            :src="recipe.image || '/images/placeholder-recipe.jpg'"
            :alt="recipe.title"
            class="absolute h-full w-full object-cover rounded-t-lg"
          />
        </div>
        <div class="p-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            <NuxtLink :to="`/recipes/${recipe._id}`" class="hover:text-emerald-600 dark:hover:text-emerald-400">
              {{ recipe.title }}
            </NuxtLink>
          </h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ recipe.description }}</p>
          <div class="mt-4 flex items-center justify-between">
            <div class="flex items-center">
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {{ recipe.prepTime + recipe.cookTime }} mins
              </span>
              <span class="mx-2 text-gray-500 dark:text-gray-400">•</span>
              <span class="text-sm text-gray-500 dark:text-gray-400 capitalize">
                {{ recipe.difficulty }}
              </span>
            </div>
            <div class="flex items-center">
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {{ recipe.rating.average.toFixed(1) }}
              </span>
              <svg class="h-5 w-5 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!pending && !error && (!data?.recipes || !data.recipes.length)" class="text-center py-12">
      <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No recipes found</h3>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Try adjusting your filters or add a new recipe.
      </p>
    </div>

    <!-- Pagination -->
    <div v-if="data?.pagination && data.pagination.pages > 1" class="mt-8 flex justify-center">
      <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
        <button
          @click="page > 1 && (page--)"
          :disabled="page <= 1"
          class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          :class="{ 'opacity-50 cursor-not-allowed': page <= 1 }"
        >
          <span class="sr-only">Previous</span>
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
        <button
          v-for="p in data.pagination.pages"
          :key="p"
          @click="page = p"
          :class="[
            p === page
              ? 'z-10 bg-emerald-50 border-emerald-500 text-emerald-600'
              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
            'relative inline-flex items-center px-4 py-2 border text-sm font-medium'
          ]"
        >
          {{ p }}
        </button>
        <button
          @click="page < data.pagination.pages && (page++)"
          :disabled="page >= data.pagination.pages"
          class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          :class="{ 'opacity-50 cursor-not-allowed': page >= data.pagination.pages }"
        >
          <span class="sr-only">Next</span>
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

// Available cuisines
const cuisines = [
  'Italian',
  'Chinese',
  'Mexican',
  'Indian',
  'Japanese',
  'Thai',
  'Mediterranean',
  'American',
  'French',
];

// Filters and pagination state
const filters = ref({
  search: '',
  cuisine: '',
  difficulty: '',
  time: '',
});

const page = ref(1);
const limit = 12;

// Fetch recipes with filters
const { data, pending, error, refresh } = await useFetch('/api/recipes', {
  query: computed(() => ({
    ...filters.value,
    page: page.value,
    limit,
  })),
});

// Reset page when filters change
watch(filters, () => {
  page.value = 1;
}, { deep: true });
</script>

<style scoped>
.pb-2\/3 {
  padding-bottom: 66.666667%;
}
</style> 