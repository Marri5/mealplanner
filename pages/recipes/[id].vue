<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Loading State -->
    <div v-if="pending" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Loading recipe...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500">{{ error }}</p>
      <button @click="refresh" class="btn-primary mt-4">
        Try Again
      </button>
    </div>

    <!-- Recipe Content -->
    <div v-else-if="recipe" class="space-y-8">
      <!-- Recipe Header -->
      <div class="relative">
        <img
          :src="recipe.image || '/images/placeholder-recipe.svg'"
          :alt="recipe.title"
          class="w-full h-96 object-cover rounded-lg"
        />
        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-lg">
          <h1 class="text-3xl font-bold text-white">{{ recipe.title }}</h1>
          <div class="mt-2 flex items-center space-x-4 text-white/80">
            <span>{{ recipe.prepTime + recipe.cookTime }} mins</span>
            <span>•</span>
            <span class="capitalize">{{ recipe.difficulty }}</span>
            <span>•</span>
            <span>{{ recipe.cuisine }}</span>
          </div>
        </div>
      </div>

      <!-- Recipe Info -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Ingredients -->
        <div class="md:col-span-1">
          <h2 class="text-xl font-semibold mb-4">Ingredients</h2>
          <ul class="space-y-2">
            <li v-for="(ingredient, index) in recipe.ingredients" :key="index" class="flex items-start">
              <span class="mr-2">•</span>
              <span>{{ ingredient }}</span>
            </li>
          </ul>
        </div>

        <!-- Instructions -->
        <div class="md:col-span-2">
          <h2 class="text-xl font-semibold mb-4">Instructions</h2>
          <ol class="space-y-4">
            <li v-for="(step, index) in recipe.instructions" :key="index" class="flex">
              <span class="mr-3 font-semibold">{{ index + 1 }}.</span>
              <span>{{ step }}</span>
            </li>
          </ol>
        </div>
      </div>

      <!-- Recipe Footer -->
      <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <span class="text-sm text-gray-500 dark:text-gray-400">
              Created by {{ recipe.author?.name || 'Anonymous' }}
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
</template>

<script setup lang="ts">
const route = useRoute();
const { data: recipe, pending, error, refresh } = await useFetch(`/api/recipes/${route.params.id}`);
</script> 