<template>
    <div class="editoras">
        <div class="menu">
            <nav>
                <input type="checkbox" id="check" />
                <label for="check" class="checkbtn">
                    <i class="fas fa-bars"></i>
                </label>
                <img src="../assets/logo1.png" /><label class="logo">WDA Livraria</label>
                <ul>
                    <li>
                        <router-link to="/" style="color: white"
                            ><v-icon color="primari">{{ svgPath6 }}</v-icon
                            >Início</router-link
                        >
                    </li>
                    <li>
                        <router-link to="/livros" style="color: white"
                            ><v-icon color="primari">{{ svgPath }}</v-icon
                            >Livros</router-link
                        >
                    </li>
                    <li>
                        <router-link to="/usuarios" style="color: white"
                            ><v-icon color="primari">{{ svgPath2 }}</v-icon
                            >Usuários</router-link
                        >
                    </li>
                    <li>
                        <router-link to="/editoras" class="active" style="color: white"
                            ><v-icon color="primari">{{ svgPath3 }}</v-icon
                            >Editoras</router-link
                        >
                    </li>
                    <li>
                        <router-link to="/alugueis" style="color: white"
                            ><v-icon color="primari">{{ svgPath4 }}</v-icon
                            >Alugueis</router-link
                        >
                    </li>
                </ul>
            </nav>
        </div>
        <div class="container">
            <v-data-table :headers="headers" :items="editoras" :search="search" :items-per-page="5" class="elevation-1">
                <template v-slot:top>
                    <v-toolbar flat color="#008DC0" class="barra">
                        <v-toolbar-title class="titulo"
                            ><v-icon color="primari">{{ svgPath3 }}</v-icon
                            >Editoras</v-toolbar-title
                        >
                        <v-divider class="mx-4" inset vertical></v-divider>

                        <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Pesquisar"
                            single-line
                            hide-details
                            dark
                            text
                        ></v-text-field>
                        <v-spacer></v-spacer>

                        <v-btn color="primari" class="mb-2 md-5" @click="openDialog" style="color: #008DC0"
                            ><v-icon>{{ svgPath5 }}</v-icon>
                            Nova Editora
                        </v-btn>

                        <v-dialog v-model="dialog" max-width="500px">
                            <v-card>
                                <v-card-title>
                                    <span class="text-h5">{{ formTitle }}</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-form ref="form" v-model="valid" lazy-validation>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12">
                                                    <v-text-field
                                                        v-model="editedItem.nome"
                                                        :rules="nameRules"
                                                        :counter="50"
                                                        prepend-icon="mdi-bookshelf"
                                                        label="Nome da Editora*"
                                                        required
                                                        class="dark--text"
                                                    ></v-text-field>
                                                </v-col>

                                                <v-col cols="12">
                                                    <v-text-field
                                                        v-model="editedItem.cidade"
                                                        :rules="nameRules"
                                                        :counter="50"
                                                        prepend-icon="mdi-city"
                                                        label="Cidade da Editora*"
                                                        required
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-form>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn :disabled="!valid" color="secondary" class="mr-4" @click="save">
                                        Salvar
                                    </v-btn>

                                    <v-btn color="error" class="mr-4" @click="close">
                                        Cancelar
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-dialog v-model="dialogDelete" max-width="500px">
                            <v-card>
                                <v-card-title class="text-h5"
                                    >Tem certeza de que deseja excluir este item?</v-card-title
                                >
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon color="accent" class="mr-2" @click="editItem(item)">
                        mdi-pencil
                    </v-icon>
                    <v-icon color="error" @click="deleteItem(item)">
                        mdi-delete
                    </v-icon>
                </template>
            </v-data-table>
        </div>
    </div>
</template>

<script>
import Editora from '../services/editora';
import { mdiBook, mdiAccountCircle, mdiBookshelf, mdiBookAccount, mdiBookPlusOutline, mdiHome } from '@mdi/js';
export default {
    name: 'Editoras',

    data: () => ({
        dialog: false,
        dialogDelete: false,
        valid: true,

        editora: {
            id: '',
            nome: '',
            cidade: ''
        },
        editoras: [],

        nome: '',
        cidade: '',
        nameRules: [
            v => !!v || 'Este campo é obrigatório',
            v => (v && v.length <= 50) || 'Deve ter menos de 50 caracteres',
            v => (v && v.length >= 3) || 'Deve ter mais de 3 caracteres',
            v => /[a-zA-ZÀ-ú]+$/.test(v) || 'Nome inválido!',
            v => /^[a-zA-ZÀ-ú ]+$/.test(v) || 'Nome inválido!',
            v => /^[^-\s]/.test(v) || 'Informe um nome sem espaçamentos no início'
        ],
        search: '',
        headers: [
            { text: 'ID', value: 'id' },
            { text: 'Nome', value: 'nome' },
            { text: 'Cidade', value: 'cidade' },
            { text: 'Ações', value: 'actions', sortable: false }
        ],

        svgPath: mdiBook,
        svgPath2: mdiAccountCircle,
        svgPath3: mdiBookshelf,
        svgPath4: mdiBookAccount,
        svgPath5: mdiBookPlusOutline,
        svgPath6: mdiHome,

        desserts: [],
        editedIndex: -1,
        editedIndex: {
            id: 0,
            nome: '',
            cidade: ''
        },

        editedItem: {
            id: 0,
            nome: '',
            cidade: ''
        },
        defaultItem: {
            id: 0,
            nome: '',
            cidade: ''
        }
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Cadastrar Editora' : 'Editar Editora';
        }
    },

    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        }
    },

    mounted() {
        this.listar();
    },

    methods: {
        atualizarModal() {
            this.editedItem = {
                id: 0,
                nome: '',
                cidade: ''
            };
        },
        openDialog() {
            this.dialog = true;
            this.editedIndex = -1;
            this.atualizarModal();
            this.resetValidation();
        },

        validate() {
            this.$refs.form.validate();
        },
        resetValidation() {
            this.$refs.form.resetValidation();
        },
        listar() {
            Editora.listar().then(resposta => {
                this.editoras = resposta.data;
            });
        },
        editItem(item) {
            this.editedIndex = this.editoras.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            this.editedIndex = this.editoras.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            this.desserts.splice(this.editedIndex, 1);
            this.closeDelete();
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
                this.resetValidation();
            });
        },

        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        deleteItem(item) {
            this.editedIndex = this.editoras.indexOf(item);
            this.editedItem = Object.assign({}, item);

            this.$swal({
                title: 'Você tem certeza que deseja deletar esta editora?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#008DC0',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não'
            }).then(result => {
                if (result.isConfirmed) {
                    var del = {
                        id: this.editedItem.id,
                        nome: this.editedItem.nome,
                        cidade: this.editedItem.cidade
                    };
                    Editora.deletar(del)
                        .then(resposta => {
                            Toast.fire('Editora deletada com sucesso!', '', 'success');
                            if (resposta != null) {
                                this.listar();
                            }
                            if (result.isCancel) {
                                this.close();
                            }
                        })
                        .catch(resposta => {
                            var erro = resposta.response.data.error;
                            this.$swal({
                                icon: 'error',
                                text: erro,
                                confirmButtonColor: '#008DC0',
                                confirmButtonText: 'Ok'
                            });
                        });
                }
            });
        },

        save() {
            if (this.editedIndex > -1) {
                var edit = {
                    id: this.editedItem.id,
                    nome: this.editedItem.nome,
                    cidade: this.editedItem.cidade
                };
                Editora.alterar(edit).then(resposta => {
                    if (resposta != null) {
                        Toast.fire('Editora editada com sucesso!', '', 'success');
                        this.listar();
                        this.close();
                    }
                });
            } else {
                var save = {
                    nome: this.editedItem.nome,
                    cidade: this.editedItem.cidade
                };
                Editora.salvar(save).then(resposta => {
                    if (resposta != null) {
                        Toast.fire('Editora cadastrada com sucesso!', '', 'success');
                        this.listar();
                        this.close();
                    }
                });
            }
            this.$refs.form.validate();
        }
    }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
body {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
}
.editoras {
    background-color: #e0e0e0;
    height: 100%;
}
label.logo {
    color: white;
    font-size: 20px;
    line-height: 80px;
    padding: 0 100px;
    font-weight: bold;
    margin-top: 4px;
    margin-left: -95px;
}
img {
    margin-top: -8px;
    margin-left: 120px;
}
nav {
    background-color: #008dc0;
    height: 80px;
    width: 100%;
}
.titulo {
    color: white;
}
nav ul {
    float: right;
    margin-right: 20px;
}

nav ul li {
    display: inline-block;
    line-height: 80px;
    margin: 0 5px;
}
.menu {
    color: white;
}
.adicionar {
    font-size: 25px;
}
nav ul li a {
    color: white;
    font-size: 17px;
    padding: 15px 13px;
    border-radius: 3px;
    text-transform: capitalize;
    text-decoration: none;
}
.v-icon {
    margin-top: -3px;
}

a.active,
a:hover {
    transition: 0, 5s;
    background-color: #006494;
    color: white;
    height: 100%;
}

.checkbtn {
    font-size: 30px;
    color: white;
    float: right;
    line-height: 80px;
    margin-right: 40px;
    cursor: pointer;
    display: none;
}
.barra {
    width: 100%;
    margin-top: 10px;
}
#check {
    display: none;
}
</style>
