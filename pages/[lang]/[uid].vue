<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { createClient } from '@prismicio/client';

const client = createClient('https://vanilla-leagues.cdn.prismic.io/api/v2');
const route = useRoute();
const router = useRouter();

// Extract `lang` and `uid` from the route
const lang = route.params.lang || 'en-us';
const uid = route.params.uid;

// Fetch League Data
const league = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchLeague = async () => {
  try {
    league.value = await client.getByUID('league', uid, { lang });
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
};

fetchLeague();

// Switch Language
const switchLanguage = (newLang) => {
  router.push(`/${newLang}/${uid}`);
};

// Go Back to the Leagues Page
const goBackToLeagues = () => {
  router.push(`/`);
};
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">
    <p>Error loading league data: {{ error.message }}</p>
  </div>
  <div class="teams-wrapper" v-else>
    <h1>{{ league?.data?.name[0]?.text }} Teams</h1>
    <!-- Language Switcher -->
    <div class="language-switcher">
      <button class="back-button" @click="goBackToLeagues">
        Back to Leagues
      </button>
      <button
        :class="{ active: lang === 'en-us' }"
        @click="switchLanguage('en-us')">
        English
      </button>
      <button
        :class="{ active: lang === 'es-mx' }"
        @click="switchLanguage('es-mx')">
        Español
      </button>
    </div>

    <img
      :src="league.data.logo.url"
      :alt="league.data.logo.alt"
      class="league-logo" />

    <div class="teams-container">
      <div
        v-for="team in league?.data?.teams"
        :key="team.team_name[0].text"
        class="card team-card">
        <img
          :src="team.team_logo.url"
          :alt="team.team_name[0].text"
          class="team-logo" />
        <h3>{{ team.team_name[0]?.text }}</h3>
        <p>Est. {{ team.founded_year[0]?.text }}</p>
        <!-- Render the stadium field with PrismicRichText -->
        <PrismicRichText
          :field="team.stadium"
          :components="componentsSerializer" />
        <div class="team-colors">
          <div
            v-if="team.main_color_1"
            class="color"
            :style="{ backgroundColor: team.main_color_1[0]?.text }"></div>
          <span>{{ team.main_color_1[0]?.text }}</span>
        </div>
        <div class="team-colors">
          <div
            v-if="team.main_color_2"
            class="color"
            :style="{ backgroundColor: team.main_color_2[0]?.text }"></div>
          <span>{{ team.main_color_2[0]?.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>

</style>
