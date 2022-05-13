<template>
  <v-card>
    <v-card-title class="text-h5 grey lighten-2"> Grupos </v-card-title>
    <template>
      <v-form v-model="valid">
        <v-container>
          <v-card-text>
            <div v-for="grupo in grupos" :key="grupo.id">
              <v-row>
                <v-col cols="2">
                  <v-text-field
                    v-model="grupo.id"
                    label="#"
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="6" align="right">
                  <v-text-field
                    v-model="grupo.descricao"
                    :rules="regras"
                  ></v-text-field>
                </v-col>
                <v-col cols="4" align="right">
                  <v-text-field
                    v-model="grupo.qtd"
                    label="Quantidade"
                    :rules="regras"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
            <v-row v-if="adicionar">
              <v-col cols="2">
                <v-text-field
                  v-model="id_grupo_insert"
                  label="#"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="6" align="right">
                <v-text-field
                  v-model="descricao_insert"
                  label="Descrição"
                  :rules="regras"
                ></v-text-field>
              </v-col>
              <v-col cols="4" align="right">
                <v-text-field
                  v-model="qtd_insert"
                  label="Quantidade"
                  :rules="regras"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col cols="12">
                <v-btn color="default" block @click="novoGrupo()"
                  >ADICIONAR</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text>
        </v-container>
      </v-form>
    </template>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="default" @click="emitClick(false)"> CANCELAR </v-btn>
      <v-btn color="primary" @click="emitClick(true)">
        SALVAR
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: ["id_mesa", "grupos"],
  data: () => {
    return {
      valid: true,
      adicionar: false,
      id_grupo_insert: null,
      descricao_insert: "",
      qtd_insert: "",
      regras: [(v) => !!v || "Preencha o campo"],
    };
  },
  methods: {
    novoGrupo() {
      this.adicionar = true;
    },
    emitClick(salvar) {
      let dados;
      if (salvar) {
        dados = this.grupos;
        if (this.adicionar)
          dados.push({
            id: this.id_grupo_insert,
            descricao: this.descricao_insert,
            qtd: this.qtd_insert,
            id_mesa: this.id_mesa,
          });
        this.$emit("emit-click", dados);
      } else {
        this.$emit("emit-click", false);
      }
      this.adicionar = false;
      this.id_grupo_insert = null;
      this.descricao_insert = "";
      this.qtd_insert = "";
    },
  },
};
</script>
