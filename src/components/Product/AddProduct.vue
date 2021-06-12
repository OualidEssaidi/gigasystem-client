<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mx-2"
          fab
          dark
          normal
          color="success"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Nouveau produit</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="postBody.designation"
                  label="Désignatione*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="categorie"
                  :items="categories"
                  item-text="intitule"
                  item-value="id"
                  label="Catégorie*"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="postBody.description"
                  label="Description"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="provider"
                  :items="providers"
                  item-text="nom"
                  item-value="id"
                  label="Fournisseur"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="postBody.prix"
                  label="Prix*"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="addProduct()"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    postBody: {
      designation: "",
      description: "",
      prix: "",
    },
    provider: "",
    categorie: "",
    dialog: false,
    categories: [],
    providers: [],
  }),
  methods: {
    addProduct: function () {
      var i;
      for (i = 0; i < this.categories.length; i++) {
        if (this.categories.intitule == this.categorie) {
          this.categorie = this.categories.id;
          break;
        }
      }
      for (i = 0; i < this.providers.length; i++) {
        if (this.providers.nom == this.provider) {
          this.provider = this.providers.id;
          break;
        }
      }
      this.postBody.prix = parseFloat(this.postBody.prix);

      axios
        .post(
          `http://localhost:9001/microservice-product/product/add/category/${this.categorie}/provider/${this.provider}`,
          this.postBody
        )
        .then((response) => {
          console.log(response.data);
          this.dialog = false;
          this.postBody.designation = "";
          this.postBody.description = "";
          this.postBody.prix = "";
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
  created() {
    axios
      .get(`http://localhost:9001/microservice-product/categorie/all`)
      .then((response) => {
        this.categories = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
    axios
      .get(`http://localhost:9001/microservice-product/provider/all`)
      .then((response) => {
        this.providers = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
};
</script>
