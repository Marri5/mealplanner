<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <nav class="bg-white dark:bg-gray-800 shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <NuxtLink to="/" class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                Meal Planner
              </NuxtLink>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NuxtLink to="/recipes" class="nav-link">
                Recipes
              </NuxtLink>
              <NuxtLink to="/meal-plans" class="nav-link">
                Meal Plans
              </NuxtLink>
              <NuxtLink to="/shopping-list" class="nav-link">
                Shopping List
              </NuxtLink>
            </div>
          </div>
          <div class="flex items-center">
            <button class="p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300">
              <span class="sr-only">Toggle color mode</span>
              <!-- Add color mode icon here -->
            </button>
            <div class="ml-4">
              <NuxtLink to="/login" class="nav-button">
                Sign In
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main>
      <NuxtPage />
    </main>

    <footer class="bg-white dark:bg-gray-800 shadow mt-auto">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p class="text-center text-gray-500 dark:text-gray-400">
          © {{ new Date().getFullYear() }} Meal Planner. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<style>
.nav-link {
  @apply inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100;
}

.nav-button {
  @apply inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500;
}
</style>
