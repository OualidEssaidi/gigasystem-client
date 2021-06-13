<template>
  <div>
    <v-card>
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title>Service des Produits</v-toolbar-title>
      </v-toolbar>
      <v-tabs horizental>
        <v-tab>
          <v-icon left> mdi-table </v-icon>
          Produits
        </v-tab>
        <v-tab>
          <v-icon left> mdi-account </v-icon>
          Fournisseurs
        </v-tab>
        <v-tab>
          <v-icon left> mdi-table </v-icon>
          Catégories
        </v-tab>

        <v-tab-item>
          <Table />
        </v-tab-item>
        <v-tab-item>
          <ProviderTable />
        </v-tab-item>
        <v-tab-item>
          <CategorieTable />
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>
<!--
<template>
  <div class="pa-md-4">
    <Table />
  </div>
</template>
-->
<script>
import Table from "../components/Product/ProductTable.vue";
import ProviderTable from "../components/Product/ProviderTable.vue";
import CategorieTable from "../components/Product/CategoryTable.vue";

export default {
  name: "product page",

  components: {
    Table,
    ProviderTable,
    CategorieTable,
  },
};
</script>
