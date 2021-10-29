<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item to="/cardapio">
          <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Início</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item to="/">
          <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Mesas</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-group
          :value="true"
          prepend-icon="mdi-image"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Pedidos</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item to="/pedidos">
            <v-list-item-title>Solicitar</v-list-item-title>
          </v-list-item>

        </v-list-group>
        <v-divider></v-divider>
      <!--</v-list-item>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>-->
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => (
      { drawer: null,
        items: 
          [
            { title: 'Mesas', icon: 'mdi-view-dashboard', to: '/', id: 2 },
            { title: 'Solicitar', icon: 'mdi-image', to: '/pedidos', id: 1 },
            { title: 'About', icon: 'mdi-help-box', to: '/cardapio', id: 2 },
          ],
          menus: [
            { name: "Pedidos", id: 1, icon: 'mdi-view-dashboard',},
            { name: "Mesas", id: 2, icon: 'mdi-view-dashboard',}
          ] 
        })
  }
</script>