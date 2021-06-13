/* eslint-disable */
<template>
  <v-data-table
    :headers="headers"
    :items="providers"
    sort-by="Ref"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Liste des fournisseurs</v-toolbar-title>
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
                      v-model="editedItem.nom"
                      label="Nom complet"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                     <v-text-field
                      v-model="editedItem.ville"
                      label="Ville"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.telephone"
                      label="Téléphone"
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
      { text: "Nom complet", value: "nom" },
      { text: "Vile", value: "ville" },
      { text: "E-mail", value: "email" },
      { text: "Téléphone", value: "telephone" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    providers: [],
    editedIndex: -1,
    idToDelete: 0,
    editedItem: {
      nom: "Dell maroc",
      ville: "Casablanca",
      email: "contact@dellmaroc.ma",
      telephone: "0535216974",
    },
    defaultItem: {
      nom: "",
      ville: "",
      email: "",
      telephone: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nouveau Fournisseur" : "Modifier fournisseur";
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
    this.initialize();
  },

  methods: {
    initialize() {
      axios
        .get(`http://localhost:9001/microservice-product/provider/all`)
        .then((response) => {
          this.providers = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    editItem(item) {
      this.editedIndex = this.providers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.providers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.idToDelete = this.editedItem.id;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      axios.delete(
        `http://localhost:9001/microservice-product/provider/delete/${this.idToDelete}`
      );
      this.providers.splice(this.editedIndex, 1);
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
      var path;
      if (this.editedIndex > -1) {
        path = `http://localhost:9001/microservice-product/provider/update/${this.providers[this.editedIndex].id}`;
        axios
          .post(path, this.editedItem)
          .then(() => {
            alert("Fournisseur modifier");
          })
          .catch((e) => {
            console.log("erreur");
            this.errors.push(e);
          });
        Object.assign(this.providers[this.editedIndex], this.editedItem);
      } else {
        path = `http://localhost:9001/microservice-product/provider/add`;
        axios
          .post(path, this.editedItem)
          .then((response) => {
            this.providers.push(response.data);
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
