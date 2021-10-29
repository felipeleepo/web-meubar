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
          <v-toolbar-title class="text-h4">Cardápio</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:group.header="{ group, headers, toggle, isOpen }">
            <td :colspan="headers.length">
                <v-btn @click="toggle" x-small icon :ref="group">
                    <v-icon v-if="isOpen">mdi-plus</v-icon>
                    <v-icon v-else>mdi-minus</v-icon>
                </v-btn>
                <span class="mx-5 font-weight-bold">{{ group }}</span>
            </td> 
        </template>

    </v-data-table>

  </div>
</template>

<script>
  export default {
    data () {
      return {

        headers: [
          { text: 'Item', value: 'nome', align: 'start', groupable: false, sortable: false},
          { text: 'Categoria', value: 'Categoria', align: 'right' },
          { text: 'Valor (R$)', value: 'valor', align: 'right', groupable: false, sortable: false }
        ],
        itens: [
          {
            nome: 'Espeto de Frango',
            Categoria: 'Espetos',
            valor: 2.50
          },
          {
            nome: 'Espeto de Língua',
            Categoria: 'Espetos',
            valor: 2.50
          },
          {
            nome: 'Camarão',
            Categoria: 'Caldos',
            valor: 2.50
          },
          {
            nome: 'Heiniken 330ml',
            Categoria: 'Cervejas',
            valor: 2.50
          },
          {
            nome: 'Sertanejo',
            Categoria: 'Caldos',
            valor: 2.50
          }
        ],
      }
    },
  }
</script>
