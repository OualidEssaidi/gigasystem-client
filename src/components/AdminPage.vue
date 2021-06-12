<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/giga.png')"
          class="my-5"
          contain
          height="150"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Welcome to Vuetify</h1>

        <p class="subheading font-weight-regular">
          For help and collaboration with other Vuetify developers,
          <br />please join our online
          <a href="https://community.vuetifyjs.com" target="_blank"
            >Discord Community</a
          >
        </p>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">
          Liste des serveurs d'administrations
        </h2>

        <v-row justify="center">
          <a
            v-for="(next, i) in whatsNext"
            :key="i"
            :href="next.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ next.text }}
          </a>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AdminPage",

  data: () => ({
    whatsNext: [
      {
        text: "Keycloak Server",
        href: "http://localhost:8080",
      },
      {
        text: "Administration Server",
        href: "http://localhost:9103/wallboard",
      },
      {
        text: "Eureka Server",
        href: "http://localhost:9102",
      },
    ],
  }),
};
</script>
