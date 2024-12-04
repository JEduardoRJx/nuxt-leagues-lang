<script setup>
import * as prismic from '@prismicio/client';
import { ref } from 'vue';

useHead({
  title: 'Leagues - Football App',
  meta: [
    {
      name: 'description',
      content: 'Explore football leagues and teams across the world.',
    },
  ],
});

const client = prismic.createClient(
  'https://vanilla-leagues.cdn.prismic.io/api/v2'
);

const leagues = ref([]);

const fetchLeagues = async () => {
  try {
    const fetchedLeagues = await client.getAllByType('league');
    leagues.value = fetchedLeagues;
  } catch (error) {
    console.error('Error fetching leagues:', error);
  }
};

fetchLeagues();

</script>

<template>
  <div>
    <h1>Leagues</h1>
    <div class="leagues-container">
      <!-- Render each league dynamically -->
      <NuxtLink
        v-for="league in leagues"
        :key="league.id"
        :to="`/${league.lang}/${league.uid}`"
        :id="`${league.id}`"
        class="card league-card"
      >
        <!-- League Logo -->
        <img
          :src="league.data.logo.url"
          :alt="league.data.name[0]?.text || 'League Logo'"
          class="league-logo"
        />
        <!-- League Name -->
        <h2 class="league-name">
          {{ league.data.name[0]?.text || 'Unnamed League' }}
        </h2>
        <!-- Last Updated -->
        <p class="last-updated">
          Last Updated: {{ new Date(league.last_publication_date).toLocaleDateString() }}
        </p>
      </NuxtLink>
    </div>
  </div>
</template>
