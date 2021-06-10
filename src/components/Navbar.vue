<template>
  <div>
    <v-app-bar dense color="indigo" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>GIGASYSTEM</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text small> Se deconnecté </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item
            v-for="link in links"
            :key="link.text"
            router
            :to="link.route"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    links: [
      { icon: "mdi-home", text: "Home", route: "/" },
      { icon: "mdi-face", text: "Client", route: "/client" },
      { icon: "mdi-table", text: "Produit", route: "/produit" },
      { icon: "mdi-book", text: "Document", route: "/document" },
    ],
  }),
};
</script>
