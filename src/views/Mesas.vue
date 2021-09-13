<template>
  <div>
    <v-row dense>
      <v-col
          v-for="card in cards"
          :key="card.id_mesa"
        >
        <v-card
          class="mx-auto" :class="card.cor"
          max-width="344"
        >
          <v-card-text>
            <p class="text-h4 text--primary">
              Mesa #{{card.id_mesa}}
            </p>
            <div class="text--primary">
              <v-icon>mdi-account-group</v-icon> {{card.status}}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              color="accent-4"
            >
              Detalhes
            </v-btn>
          </v-card-actions>
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
          if(card.status == 1)
            card.cor = "yellow"
          else if(card.status == 2)
            card.cor = "red"
          else
            card.cor = "green"
        })
      })
    }
  }
</script>
