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
            <v-row align="center">
                <v-col cols="6">
                    <v-select :items="grupos" item-text="id_mesa" outlined v-on:change="habilitarGrupo" label="Selecione a Mesa">
                    </v-select>
                </v-col>
                <v-col cols="6">
                    <v-select :items="grupo_atual" item-text="descricao" :disabled="desabilitar" v-on:change="selecionarGrupo" outlined label="Selecione um Grupo">
                    </v-select>
                </v-col>
                <v-col cols="12">
                    <v-textarea outlined v-on:change="receberObs" label="Observações"></v-textarea>
                </v-col>
        </v-row>
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
    props:["itens", "grupos"],
    data:() => {
        return {
            grupo_atual: [],
            desabilitar: true,
            id_grupo: '',
            obs: ''
        }
        
    },
    methods: {
        emitClick() {
            let array = this.itens.reduce((array, item) =>{
                if(item.qtd > 0){
                    let i = 0
                    while(i < item.qtd){
                        array.push(item)
                        i++
                    }
                }
                return array;
            }, []);
            let dados = { id_grupo: this.id_grupo, obs: this.obs, pedidos: array}
            this.$emit('emit-click', dados);
        },
        habilitarGrupo(valor){
            this.grupo_atual = []
            this.grupos.map((grupos)=>{
                if(valor == grupos.id_mesa)
                    this.grupo_atual.push({id: grupos.id, descricao: grupos.descricao})
            })         
            if(this.grupo_atual.length > 0)
                this.desabilitar = false
            else
                this.desabilitar = true
        },
        selecionarGrupo(valor){
            this.id_grupo = valor.id
        }
        ,
        receberObs(valor){
            this.obs = valor
        }
    }
}

</script>
