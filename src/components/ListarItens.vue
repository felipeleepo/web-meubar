<template>
    <v-card>
        <v-card-title class="text-h5 grey lighten-2">
        Lista de Itens
        </v-card-title>

        <v-card-text>
            <div v-for="item in itens" :key="item.nome">
                <v-list-item v-if="item.qtd > 0">
                    <v-list-item-content class="pt-6 font-weight-medium">
                        <v-list-item-title>
                            <v-row cols="12" class="mb-2">
                                <v-col cols="8">
                                    {{ item.nome }} 
                                </v-col>
                                <v-col cols="4" align="right">
                                    {{ item.qtd }}
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                    </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="default" @click="emitClick(false)">
            CANCELAR
        </v-btn>
        <v-btn color="primary" @click="emitClick(true)">
            SOLICITAR
        </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
    props:["itens"],
    methods: {
        emitClick() {
            let dados = this.itens.reduce((dados, item) =>{
                if(item.qtd > 0){
                    dados.push(item)
                }
                return dados;
            }, []);
            this.$emit('emit-click', dados);
        }
    }
}

</script>
