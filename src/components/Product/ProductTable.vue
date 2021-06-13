/* eslint-disable */
<template>
  <v-data-table
    :headers="headers"
    :items="products"
    sort-by="Ref"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Liste des produits</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" rounded dark class="mb-2" v-bind="attrs" v-on="on">
              <v-icon left> mdi-plus </v-icon>
              Nouveau
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.designation"
                      label="Désignation"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="editedItem.categorie"
                      :items="categories"
                      item-text="intitule"
                      item-value="intitule"
                      label="Catégorie*"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.description"
                      label="description"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="editedItem.fournisseur"
                      :items="providers"
                      item-text="nom"
                      item-value="nom"
                      label="Fournisseur"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.prix"
                      label="Prix"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="close"> Fermer </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Sauvegarder
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="600px">
          <v-card>
            <v-card-title class="text-h5"
              >Êtes-vous sûr de bien vouloir supprimer l'élément ?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-5" text @click="closeDelete"
                >Non</v-btn
              >
              <v-btn color="red darken-5" text @click="deleteItemConfirm"
                >Oui</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
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
      { text: "Actions", value: "actions", sortable: false },
    ],
    products: [],
    categories: [],
    providers: [],
    editedIndex: -1,
    isToDelete: 0,
    editedItem: {
      designation: "",
      description: "",
      prix: "",
      fournisseur: "",
      categorie: "",
    },
    defaultItem: {
      designation: "",
      description: "",
      prix: "",
      fournisseur: "",
      categorie: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nouveau produit" : "Modifier produit";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize(),
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

  methods: {
    initialize() {
      axios
        .get(`http://localhost:9001/microservice-product/product/all`)
        .then((response) => {
          this.products = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    editItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.isToDelete = this.editedItem.id;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      axios.delete(
        `http://localhost:9001/microservice-product/product/delete/${this.isToDelete}`
      );
      this.products.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      var i;
      for (i = 0; i < this.categories.length; i++) {
        if (this.categories[i].intitule == this.editedItem.categorie) {
          this.editedItem.categorie = this.categories[i];
          break;
        }
      }
      for (i = 0; i < this.providers.length; i++) {
        if (this.providers[i].nom == this.editedItem.fournisseur) {
          this.editedItem.fournisseur = this.providers[i];
          break;
        }
      }
      var path;
      if (this.editedIndex > -1) {
        path = `http://localhost:9001/microservice-product/product/update/${
          this.products[this.editedIndex].id
        }/category/${this.editedItem.categorie.id}/provider/${
          this.editedItem.fournisseur.id
        }`;
        axios
          .post(path, {
            designation: this.editedItem.designation,
            description: this.editedItem.description,
            prix: parseFloat(this.editedItem.prix),
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((e) => {
            console.log("erreur");
            this.errors.push(e);
          });
        Object.assign(this.products[this.editedIndex], this.editedItem);
      } else {
        path = `http://localhost:9001/microservice-product/product/add/category/${this.editedItem.categorie.id}/provider/${this.editedItem.fournisseur.id}`;
        axios
          .post(path, {
            designation: this.editedItem.designation,
            description: this.editedItem.description,
            prix: parseFloat(this.editedItem.prix),
          })
          .then((response) => {
            this.products.push(response.data);
            alert("Produit ajouter");
          })
          .catch((e) => {
            console.log("erreur");
            this.errors.push(e);
          });
      }
      this.close();
    },
  },
};
</script>
