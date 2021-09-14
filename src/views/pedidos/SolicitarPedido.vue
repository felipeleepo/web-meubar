<template>
  <div class="pa-4">
    
    <v-data-table
      :headers="headers"
      :items="itens"
      item-key="nome"
      sort-by="nome"
      group-by="Categoria"
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

                    <v-card>
                        <v-card-title class="text-h5 grey lighten-2">
                        Lista de Itens
                        </v-card-title>

                        <v-card-text>
                            <div v-for="item in itens" :key="item.nome">
                                <v-list-item v-if="item.qtd > 0">
                                    <v-list-item-content>
                                        <v-list-item-title>{{ item.nome }} ------------- {{ item.qtd }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </div>
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="default" @click="dialog = false">
                            CANCELAR
                        </v-btn>
                        <v-btn color="primary" @click="dialog = false">
                            SOLICITAR
                        </v-btn>
                        </v-card-actions>
                    </v-card>
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
  export default {
    data () {
      return {
        botao: true,
        dialog: false,
        headers: [
          { text: 'Item', value: 'nome', align: 'start', groupable: false, sortable: false},
          { text: 'Categoria', value: 'Categoria', align: 'right' },
          { text: 'Quantidade', value: 'qtd', align: 'right', groupable: false, sortable: false }
        ],
        itens: [
          {
            nome: 'Espeto de Frango',
            Categoria: 'Espetos',
            qtd: 0
          },
          {
            nome: 'Espeto de Língua',
            Categoria: 'Espetos',
            qtd: 0
          },
          {
            nome: 'Caldo de Camarão',
            Categoria: 'Caldos',
            qtd: 0
          },
          {
            nome: 'Heiniken 330ml',
            Categoria: 'Cervejas',
            qtd: 0
          },
          {
            nome: 'Caldo Sertanejo',
            Categoria: 'Caldos',
            qtd: 0
          }
        ],
      }
    },
    methods: {
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
    }
  }
</script>
