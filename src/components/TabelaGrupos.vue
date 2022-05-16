<template>
  <v-data-table
    :headers="headers"
    :items="itens"
    class="elevation-1"
    hide-default-footer
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Grupos</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-row class="d-flex justify-end">
              <v-col>
                <v-btn color="default" @click="sair"> Cancelar </v-btn>
              </v-col>
              <v-col>
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                  Novo
                </v-btn>
              </v-col>
            </v-row>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.descricao"
                      label="Descrição"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.qtd"
                      label="Quantidade"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="default" @click="close"> CANCELAR </v-btn>
              <v-btn color="primary" @click="save"> SALVAR </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Deseja desativar esse Grupo?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >CANCELAR</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
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
  </v-data-table>
</template>

<script>
export default {
  // HEADERS CAMPOS: text, value, align, sortable, groupable
  // VAR: caso faça um GET com ID
  props: ["itens", "var", "dialogTabela"],
  data: () => ({
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    oldItemQtd: 0,
    editedItem: {
      descricao: "",
      qtd: "",
    },
    defaultItem: {
      descricao: "",
      qtd: "",
    },
    headers: [
      {
        text: "#",
        value: "id",
      },
      {
        text: "Descrição",
        value: "descricao",
      },
      {
        text: "Quantidade",
        value: "qtd",
      },
      {
        text: "Ações",
        value: "actions",
      },
    ],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Novo Grupo" : "Editar Grupo";
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
    initialize() {},

    editItem(item) {
      this.oldItemQtd = parseInt(item.qtd);
      this.editedIndex = this.itens.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.itens.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.itens.splice(this.editedIndex, 1);
      this.closeDelete();
      this.$emit("emit-click", this.editedItem, false);
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
      if (this.editedIndex > -1) {
        Object.assign(this.itens[this.editedIndex], this.editedItem);
        this.editedItem.oldItemQtd = parseInt(this.editedItem.qtd) - this.oldItemQtd;
      } else {
        (this.editedItem.id = null), (this.editedItem.id_mesa = this.var);
        this.itens.push(this.editedItem);
      }
      this.$emit("emit-click", this.editedItem, true);
      this.close();
    },

    sair() {
      this.$emit("emit-click", false, false);
    },
  },
};
</script>