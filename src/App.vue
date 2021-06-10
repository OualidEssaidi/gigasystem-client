<template>
  <v-app>
    <Navbar />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  name: "App",
  // eslint-disable-next-line vue/no-unused-components
  components: { Navbar },
  data: () => ({
    //
  }),
};
</script>
