<template>
  <div class="pa-4">
    
    <v-data-table
      :headers="headers"
      :items="itens"
      item-key="nome"
      sort-by="nome"
      group-by="secao"
      class="elevation-1"
      :hide-default-footer="true">

        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title class="text-h4">Solicitar Pedido</v-toolbar-title>
                <v-spacer></v-spacer>
                
                <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" class="mb-2" :disabled="botao" depressed v-bind="attrs" v-on="on">
                            CONFIRMAR
                        </v-btn>
                    </template>

                    <ListarItens :itens="itens" @emit-click="solicitarPedido"/>
                </v-dialog>
    
            </v-toolbar>
           
        </template>

        <template v-slot:item.qtd="{ item }">
            <v-row align="center">
                <v-col cols="9"></v-col>
                <v-col cols="1"><v-icon small class="mr-2" color="black" @click="diminuirQtd(item)">mdi-minus</v-icon></v-col>
                <v-col cols="1">
                    <v-chip label outlined>
                        {{item.qtd}}
                    </v-chip>
                </v-col>
                <v-col cols="1"><v-icon small class="mr-2" color="black" @click="aumentarQtd(item)">mdi-plus</v-icon></v-col>
            </v-row>
        </template>

    </v-data-table>

  </div>
</template>

<script>
  import ListarItens from '../../components/ListarItens.vue'
  import Itens from '../../services/pedidos.js'
  export default {
    components:{
      ListarItens
    },
    data () {
      return {
        botao: true,
        dialog: false,
        headers: [
          { text: 'Item', value: 'nome', align: 'start', groupable: false, sortable: false},
          { text: 'Categoria', value: 'secao', align: 'right' },
          { text: 'Quantidade', value: 'qtd', align: 'right', groupable: false, sortable: false }
        ],
        itens: [
        ],
      }
    },
    methods: {
      solicitarPedido(dados){
        console.log(dados)
        if(dados){
          console.log("pedido salvo")
        }else{
          console.log("fechar dialog")
        }
        
        this.dialog = false;
      },
      diminuirQtd(item) {
          if(item.qtd !== 0)
              item.qtd--
          
          if(item.qtd == 0){
              let aux = 0;
              this.itens.map(item => {
                  aux += item.qtd;
                  console.log(aux)
              })
              if (aux == 0)
                  this.botao = true
          }
      },
      aumentarQtd(item) {
          item.qtd++
          this.botao = false
      }
    },
    mounted(){
      Itens.verItens().then( res => {
        this.itens = res.data.response
      })
    }
  }
</script>
