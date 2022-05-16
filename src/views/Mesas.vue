<template>
  <div>
    <v-dialog v-model="dialog" width="1200" persistent>
      <Tabela
        :itens="grupos"
        :var="id_mesa"
        @emit-click="updateGrupos"
        :dialogTabela="dialog"
      ></Tabela>
    </v-dialog>

    <v-row dense>
      <v-col v-for="card in cards" :key="card.id_mesa">
        <v-card class="mx-auto" color="grey lighten-5">
          <v-responsive :aspect-ratio="3 / 1">
            <v-card-title class="text-h5">
              Mesa #{{ card.id_mesa }}
              <v-row>
                <v-col cols="12">
                  <div class="text-right">
                    <v-chip
                      :color="card.cor"
                      label
                      text-color="white"
                      class="ma-2"
                    >
                      {{ card.cor_nome }}
                    </v-chip>
                  </div>
                </v-col>
              </v-row>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row v-if="card.status != '2'">
                <v-col align="center">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        Nenhum cliente ou pedido solicitado
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
              <v-row v-else>
                <v-col cols="6" align="center">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        <div v-if="card.grupo == '1'">
                          <b>{{ card.grupo }} Grupo</b>
                        </div>
                        <div v-else>
                          <b>{{ card.grupo }} Grupos</b>
                        </div>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="6" align="center">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        <div v-if="card.quantidade == '1'">
                          <b>{{ card.quantidade }} Pessoa</b>
                        </div>
                        <div v-else>
                          <b>{{ card.quantidade }} Pessoas</b>
                        </div>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-row>
                <v-col>
                  <v-btn
                    block
                    v-if="card.status == '1'"
                    color="accent"
                    @click="dialogGrupos(card.id_mesa)"
                  >
                    Abrir
                  </v-btn>
                  <v-btn
                    v-else
                    block
                    color="secondary"
                    @click="dialogGrupos(card.id_mesa)"
                  >
                    Detalhes
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-responsive>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Mesa from "../services/mesas";
import Grupo from "../services/grupos.js";
import Tabela from "../components/TabelaGrupos.vue";
export default {
  name: "Mesas",
  components: {
    Tabela,
  },
  data: () => ({
    cards: [],
    dialog: false,
    id_mesa: "",
    grupos: [],
  }),
  methods: {
    dialogGrupos(id) {
      this.dialog = true;
      this.id_mesa = id;
      Grupo.getGruposId(this.id_mesa).then((res) => {
        let array = res.data.response;
        array.forEach((item) => {
          this.grupos.push(item);
        });
      });
    },
    updateGrupos(dados, update) {
      if (dados) {
        
        let pessoa_aux = 0;
        if (update) {
          dados.status = true;
          Grupo.updateGrupos(dados);
          if (dados.id == null) {
            pessoa_aux = parseInt(dados.qtd);

            //atualiza dados da mesa
            this.cards.forEach((e) => {
              if (e.id_mesa == this.id_mesa) {
                e.grupo++;
                e.quantidade += pessoa_aux;
              }
            });
          } else {
            this.cards.forEach((e) => {
              if (e.id_mesa == this.id_mesa) {
                e.quantidade = parseInt(e.quantidade)
                e.quantidade += parseInt(dados.oldItemQtd)
              }
            });
          }
        } else {
          dados.status = "2";
          Grupo.updateGrupos(dados);
          // atualizando dados da mesa
          this.cards.forEach((e) => {
            if (e.id_mesa == this.id_mesa) {
              e.grupo -= 1;
              e.quantidade -= dados.qtd;
            }
          });
        }
      }
      this.grupos = [];
      this.dialog = false;
    },
  },
  mounted() {
    Mesa.getMesa().then((res) => {
      this.cards = res.data.response;
      this.cards.map((card) => {
        if (card.status == 1) {
          card.cor = "green darken-4";
          card.cor_nome = "Disponível";
        } else if (card.status == 2) {
          card.cor = "yellow lighten-1";
          card.cor_nome = "Em atendimento";
        } else {
          card.cor = "blue-grey darken-3";
          card.cor_nome = "Fechada";
        }
      });
    });
  },
};
</script>
