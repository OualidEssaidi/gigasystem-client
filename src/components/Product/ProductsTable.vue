<template>
  <div>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="products"
      item-key="designation"
      show-select
      class="elevation-1"
      :search="search"
      :custom-filter="filterOnlyCapsText"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search (UPPER CASE ONLY)"
          class="mx-4"
        ></v-text-field>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      search: "",
      products: [],
      errors: [],
    };
  },
  computed: {
    headers() {
      return [
        {
          text: "Ref",
          align: "start",
          sortable: false,
          value: "id",
        },
        {
          text: "Categorie",
          value: "categorie.intitule",
        },
        { text: "Designation", value: "designation" },
        { text: "Description", value: "description" },
        { text: "Prix HT (Dhs)", value: "prix" },
        { text: "Fournisseur", value: "fournisseur.nom" },
      ];
    },
  },
  methods: {
    filterOnlyCapsText(value, search) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().toLocaleUpperCase().indexOf(search) !== -1
      );
    },
  },
  created() {
    axios
      .get(`http://localhost:9001/microservice-product/product/all`)
      .then((response) => {
        this.products = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
};
</script>
