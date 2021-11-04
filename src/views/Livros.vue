<template>
    <div class="livros">
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
                        <router-link to="/livros" class="active" style="color: white"
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
                        <router-link to="/editoras" style="color: white"
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
            <v-data-table :headers="headers" :items="livros" :search="search" :items-per-page="5" class="elevation-1">
                <template v-slot:top>
                    <v-toolbar flat color="#008DC0" class="barra">
                        <v-toolbar-title class="titulo"
                            ><v-icon color="primari">{{ svgPath }}</v-icon
                            >Livros</v-toolbar-title
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
                            Novo Livro
                        </v-btn>

                        <v-dialog v-model="dialog" max-width="500px">
                            <v-card>
                                <v-card-title>
                                    <span class="adicionar">{{ formTitle }}</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-form ref="form" v-model="valid" lazy-validation>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12">
                                                    <v-text-field
                                                        v-model="editedItem.nome"
                                                        :rules="nameRules"
                                                        :counter="80"
                                                        prepend-icon="mdi-book"
                                                        label="Nome do Livro*"
                                                        required
                                                        class="dark--text"
                                                    ></v-text-field>
                                                </v-col>

                                                <v-col cols="12">
                                                    <v-select
                                                        v-model="editedItem.editora"
                                                        :items="editoras"
                                                        item-text="nome"
                                                        item-value="id"
                                                        :rules="editoraRules"
                                                        prepend-icon="mdi-bookshelf"
                                                        label="Escolha uma editora*"
                                                        return-object
                                                        required
                                                        class="dark--text"
                                                    ></v-select>
                                                </v-col>

                                                <v-col cols="12">
                                                    <v-text-field
                                                        v-model="editedItem.autor"
                                                        :rules="nameRules"
                                                        :counter="50"
                                                        prepend-icon="mdi-account-edit"
                                                        label="Nome do Autor*"
                                                        required
                                                        class="dark--text"
                                                    ></v-text-field>
                                                </v-col>

                                                <v-container>
                                                    <v-row>
                                                        <v-col cols="12">
                                                            <v-menu
                                                                ref="menu1"
                                                                v-model="menu1"
                                                                :close-on-content-click="false"
                                                                transition="scale-transition"
                                                                offset-y
                                                                max-width="290px"
                                                                min-width="auto"
                                                            >
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-text-field
                                                                        v-model="editedItem.lancamento"
                                                                        label="Data de lançamento"
                                                                        persistent-hint
                                                                        prepend-icon="mdi-calendar"
                                                                        v-bind="attrs"
                                                                        @blur="date = parseDate(dateFormatted)"
                                                                        v-on="on"
                                                                        :rules="dataRules"
                                                                        required
                                                                    ></v-text-field>
                                                                </template>
                                                                <v-date-picker
                                                                    :max="nowDate"
                                                                    v-model="date"
                                                                    no-title
                                                                    @input="menu1 = false"
                                                                ></v-date-picker>
                                                            </v-menu>
                                                        </v-col>
                                                    </v-row>
                                                </v-container>

                                                <v-col cols="12">
                                                    <v-text-field
                                                        v-model="editedItem.quantidade"
                                                        :rules="quantRules"
                                                        prepend-icon="mdi-numeric"
                                                        label="Quantidade*"
                                                        type="number"
                                                        onkeypress="return event.charCode > 48"
                                                        min="1"
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
import Livro from '../services/livros.js';
import Editora from '../services/editora.js';
import { mdiBook, mdiAccountCircle, mdiBookshelf, mdiBookAccount, mdiBookPlusOutline, mdiHome } from '@mdi/js';
export default {
    name: 'Livros',

    data: () => ({
        dialog: false,
        dialogDelete: false,
        valid: true,

        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
        nowDate: new Date().toISOString().slice(0, 10),
        menu1: false,
        menu2: false,

        livro: {
            id: '',
            nome: '',
            editora: {
                id: '',
                nome: '',
                cidade: ''
            },
            autor: '',
            lancamento: '',
            quantidade: ''
        },
        livros: [],

        editora: {
            id: '',
            nome: '',
            cidade: ''
        },
        autor: '',
        lancamento: '',
        quantidade: '',

        nameRules: [
            v => !!v || 'Este campo é obrigatório',
            v => (v && v.length <= 50) || 'Deve ter menos de 50 caracteres',
            v => (v && v.length >= 3) || 'Deve ter mais de 3 caracteres'
        ],
        quantRules: [v => !!v || 'Este campo é obrigatório', v => (v && !isNaN(v)) || 'Informe um número válido'],
        editoraRules: [v => (v && v.nome != null) || 'Selecione uma editora'],
        dataRules: [v => !!v || 'Este campo é obrigatório'],

        search: '',
        headers: [
            { text: 'ID', value: 'id' },
            { text: 'Nome', value: 'nome' },
            { text: 'Editora', value: 'editora.nome' },
            { text: 'Autor', value: 'autor' },
            { text: 'Lançamento', value: 'lancamento' },
            { text: 'Quantidade', value: 'quantidade' },
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
            editora: {
                id: '',
                nome: '',
                cidade: ''
            },
            autor: '',
            lancamento: '',
            quantidade: ''
        },

        editedItem: {
            id: 0,
            nome: null,
            editora: {
                id: '',
                nome: null,
                cidade: ''
            },
            autor: '',
            lancamento: '',
            quantidade: ''
        }
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Cadastrar Livro' : 'Editar Livro';
        },
        computedDateFormatted() {
            return this.formatDate(this.date);
        }
    },

    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
        date(val) {
            this.editedItem.lancamento = this.formatDate(this.date);
        }
    },

    mounted() {
        this.listar();
        this.listarEditora();
        this.validacaoAnoLancamento();
    },

    methods: {
        validacaoAnoLancamento() {
            var data = new Date();
            var anoo = data.getFullYear();

            this.ano = anoo;
        },
        formatDate(date) {
            if (!date) return null;

            const [year, month, day] = date.split('-');
            return `${year}-${month}-${day}`;
        },
        parseDate(date) {
            if (!date) return null;

            const [month, day, year] = date.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        },
        openDialog() {
            this.dialog = true;
            this.editedIndex = -1;
        },

        validate() {
            this.$refs.form.validate();
        },

        resetValidation() {
            this.$refs.form.resetValidation();
        },

        listar() {
            Livro.listar().then(resposta => {
                this.livros = resposta.data;
                var ultimo = this.livros[this.livros.length - 1];
                console.log(ultimo);
            });
        },

        listarEditora() {
            Editora.listar().then(resposta => {
                this.editoras = resposta.data;
            });
        },

        editItem(item) {
            this.editedIndex = this.livros.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            this.editedIndex = this.livros.indexOf(item);
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
            this.editedIndex = this.livros.indexOf(item);
            this.editedItem = Object.assign({}, item);

            this.$swal({
                title: 'Você tem certeza que deseja deletar este livro?',
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
                        editora: this.editedItem.editora,
                        autor: this.editedItem.autor,
                        lancamento: this.editedItem.lancamento,
                        quantidade: this.editedItem.quantidade
                    };
                    Livro.deletar(del)
                        .then(resposta => {
                            Toast.fire('Livro deletado com sucesso!', '', 'success');
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
                    editora: this.editedItem.editora,
                    autor: this.editedItem.autor,
                    lancamento: this.editedItem.lancamento,
                    quantidade: this.editedItem.quantidade
                };
                Livro.alterar(edit).then(resposta => {
                    if (resposta != null) {
                        Toast.fire('Livro editado com sucesso!', '', 'success');
                        this.listar();
                        this.close();
                    }
                });
            } else {
                var save = {
                    nome: this.editedItem.nome,
                    editora: this.editedItem.editora,
                    autor: this.editedItem.autor,
                    lancamento: this.editedItem.lancamento,
                    quantidade: this.editedItem.quantidade
                };
                Livro.salvar(save).then(resposta => {
                    if (resposta != null) {
                        Toast.fire('Livro cadastrado com sucesso!', '', 'success');
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
.livros {
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
