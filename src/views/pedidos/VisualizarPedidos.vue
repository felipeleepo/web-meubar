<template>
  <div class="pa-4">
    
    <v-data-table
      :headers="headers"
      :items="pedidos"
      item-key="nome"
      :sort-by="[data_pedido, id_mesa]"
      group-by="id_mesa"
      show-group-by 
      class="elevation-1"
      :hide-default-footer="true">

        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title class="text-h4">Pedidos</v-toolbar-title>
                <v-spacer></v-spacer>
    
            </v-toolbar>
           
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip
            :color="getColor(item.status)"
            dark
            label 
            outlined
          >
            {{ item.status }}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon  v-if="exibirEditar(item)" small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon v-if="exibirExcluir(item)" small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
          <v-icon v-if="exibirEntregar(item)"  @click="deleteItem(item)">
            mdi-arrow-right-bold
          </v-icon>
        </template>
        <template v-slot:group.header="{ group, headers, toggle, isOpen }">
            <td :colspan="headers.length">
                <v-btn @click="toggle" x-small icon :ref="group">
                    <v-icon v-if="isOpen">mdi-plus</v-icon>
                    <v-icon v-else>mdi-minus</v-icon>
                </v-btn>
                <span class="mx-5 font-weight-bold">Mesa #{{ group }}</span>
            </td> 
        </template>
        
    </v-data-table>

  </div>
</template>

<script>
  import Pedidos from '../../services/pedidos.js'
  export default {
    components:{
      
    },
    data () {
      return {
        botao: true,
        dialog: false,
        headers: [
          { text: 'Mesa', value: 'id_mesa', align: 'start',  sortable: false},
          { text: 'Grupo', value: 'id_grupo', align: 'start', groupable: false, sortable: false},
          { text: 'Item', value: 'nome', align: 'start', groupable: false, sortable: false},
          { text: 'Status', value: 'status', align: 'center', groupable: false, sortable: false },
          { text: 'Ações', value: 'actions', align: 'right', groupable: false, sortable: false },
          { text: '', value: 'data_pedido', align: 'right', groupable: false, sortable: false }
        ],
        pedidos: [],
        grupos: [],
        mesas: []
      }
    },
    methods:{
      getColor(item){
          if(item == "Entregue")
            return "green"
          else if (item == "Produzido")
            return "primary"
          else
            return "warning"
      },
      exibirEditar(item){
        if (item.status == "Solicitado")
          return true
        else
          return false
      }, 
      exibirExcluir(item){
        if (item.status == "Solicitado")
          return true
        else
          return false
      }, 
      exibirEntregar(item){
        if (item.status == "Produzido")
          return true
        else
          return false
      }  
    },
    mounted(){
      Pedidos.visualizarPedidos().then( res => {
        this.pedidos = res.data.response
        console.log(this.pedidos)
      })
      
    }
  }
</script>
