<template>
  <div>
    <v-row dense>
      <v-col v-for="card in cards" :key="card.id_mesa">
        <v-card class="mx-auto"  color="grey lighten-5">
          <v-responsive :aspect-ratio="3/1">
          <v-card-title class="text-h5">
            Mesa #{{card.id_mesa}}
            <v-row>
              <v-col cols="12">
                <div class="text-right">
                  <v-chip :color="card.cor" label text-color="white" class="ma-2">
                    {{card.cor_nome}}
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
                      <div v-if="card.grupo == '1'"><b>{{card.grupo}} Grupo</b></div>
                      <div v-else><b>{{card.grupo}} Grupos</b></div>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="6" align="center">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      <div v-if="card.quantidade == '1'"><b>{{card.quantidade}} Pessoa</b></div>
                      <div v-else><b>{{card.quantidade}} Pessoas</b></div>
                      </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-row>
              <v-col>
                <v-btn block v-if="card.status == '1'" color="accent">
                  Abrir
                </v-btn>
                <v-btn v-else block color="secondary">
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
  
  import Mesa from '../services/mesas'
  export default {
    name: 'Mesas',
    data: () => ({
      cards: [],
    }),
    methods: {},
    mounted(){
      Mesa.getMesa().then( res => {
        this.cards = res.data.response
        this.cards.map( card => {
          if(card.status == 1){
            card.cor = "green darken-4"
            card.cor_nome = "Disponível"
          }else if(card.status == 2){
            card.cor = "yellow lighten-1"
            card.cor_nome = "Em atendimento"
          }else{
            card.cor = "blue-grey darken-3"
            card.cor_nome = "Fechada"
          }
        })
      })
    }
  }
</script>
