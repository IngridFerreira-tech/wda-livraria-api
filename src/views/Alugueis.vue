<template>
    <div class="alugueis">
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
                        <router-link to="/editoras" style="color: white"
                            ><v-icon color="primari">{{ svgPath3 }}</v-icon
                            >Editoras</router-link
                        >
                    </li>
                    <li>
                        <router-link to="/alugueis" class="active" style="color: white"
                            ><v-icon color="primari">{{ svgPath4 }}</v-icon
                            >Alugueis</router-link
                        >
                    </li>
                </ul>
            </nav>
        </div>
        <div class="container">
            <v-data-table :headers="headers" :items="alugueis" :search="search" :items-per-page="5" class="elevation-1">
                <template v-slot:top>
                    <v-toolbar flat color="#008DC0" class="barra">
                        <v-toolbar-title class="titulo"
                            ><v-icon color="primari">{{ svgPath4 }}</v-icon
                            >Alugueis</v-toolbar-title
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
                            Novo Aluguel
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
                                                <v-col v-if="editedIndex == -1" cols="12">
                                                    <v-select
                                                        v-model="editedItem.livro"
                                                        :rules="livroRules"
                                                        :items="livros"
                                                        item-text="nome"
                                                        item-value="id"
                                                        prepend-icon="mdi-book"
                                                        label="Escolha um Livro*"
                                                        return-object
                                                        required
                                                        class="dark--text"
                                                    ></v-select>
                                                </v-col>

                                                <v-col v-if="editedIndex == -1" cols="12">
                                                    <v-select
                                                        v-model="editedItem.usuario"
                                                        :rules="usuarioRules"
                                                        :items="usuarios"
                                                        item-text="nome"
                                                        item-value="id"
                                                        prepend-icon="mdi-bookshelf"
                                                        label="Escolha um usuário*"
                                                        return-object
                                                        required
                                                        class="dark--text"
                                                    ></v-select>
                                                </v-col>

                                                <v-container>
                                                    <v-row>
                                                        <v-col v-if="editedIndex == -1" cols="12">
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
                                                                        v-model="editedItem.data_aluguel"
                                                                        :rules="dataRules"
                                                                        label="Data do Aluguel"
                                                                        persistent-hint
                                                                        prepend-icon="mdi-calendar"
                                                                        v-bind="attrs"
                                                                        @blur="date = parseDate(dateFormatted)"
                                                                        v-on="on"
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

                                                <v-col v-if="editedIndex == -1" cols="12">
                                                    <v-menu
                                                        ref="menu2"
                                                        v-model="menu2"
                                                        :close-on-content-click="false"
                                                        transition="scale-transition"
                                                        offset-y
                                                        max-width="290px"
                                                        min-width="auto"
                                                    >
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field
                                                                v-model="editedItem.data_previsao"
                                                                :rules="[rules.required, rules.dataPrevisaoRules]"
                                                                label="Previsão de devolução"
                                                                persistent-hint
                                                                prepend-icon="mdi-calendar"
                                                                v-bind="attrs"
                                                                @blur="date2 = parseDate(dateFormatted)"
                                                                v-on="on"
                                                                required
                                                            ></v-text-field>
                                                        </template>
                                                        <v-date-picker
                                                            v-model="date2"
                                                            no-title
                                                            @input="menu2 = false"
                                                        ></v-date-picker>
                                                    </v-menu>
                                                </v-col>

                                                <v-col cols="12">
                                                    <v-menu
                                                        v-if="editedIndex != -1"
                                                        ref="menu3"
                                                        v-model="menu3"
                                                        :close-on-content-click="false"
                                                        transition="scale-transition"
                                                        offset-y
                                                        max-width="290px"
                                                        min-width="auto"
                                                    >
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field
                                                                v-model="editedItem.data_devolucao"
                                                                :rules="dataRules"
                                                                label="Data da devolução"
                                                                persistent-hint
                                                                prepend-icon="mdi-calendar"
                                                                v-bind="attrs"
                                                                @blur="date3 = parseDate(dateFormatted)"
                                                                v-on="on"
                                                                required
                                                            ></v-text-field>
                                                        </template>
                                                        <v-date-picker
                                                            v-model="date3"
                                                            no-title
                                                            @input="menu3 = false"
                                                        ></v-date-picker>
                                                    </v-menu>
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

                <template v-slot:[`item.status`]="{ item }">
                    <v-chip v-if="item.data_devolucao == null" color="accent">
                        Livro em aluguel
                    </v-chip>

                    <v-chip
                        v-else-if="item.data_devolucao.valueOf() < item.data_previsao.valueOf()"
                        color="#008DC0"
                        dark
                    >
                        Entregue no prazo
                    </v-chip>

                    <v-chip
                        v-else-if="item.data_devolucao.valueOf() == item.data_previsao.valueOf()"
                        color="#008DC0"
                        dark
                    >
                        Entregue no prazo
                    </v-chip>

                    <v-chip v-else color="red" dark>
                        Entregue com atraso
                    </v-chip>
                </template>
                <template v-slot:[`item.data_devolucao`]="{ item }">
                    <div outlined v-if="item.data_devolucao == null">
                        Não Devolvido
                    </div>
                    <div v-else>
                        {{ item.data_devolucao }}
                    </div>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-tooltip v-if="item.data_devolucao == null" top color="secondary">
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon color="secondary" class="mr-2" @click="editItem(item)" v-bind="attrs" v-on="on">
                                mdi-book-check
                            </v-icon>
                        </template>
                        <span>Devolver</span>
                    </v-tooltip>
                    <v-tooltip v-else top color="error">
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon color="error" class="mr-2" @click="deleteItem(item)" v-bind="attrs" v-on="on">
                                mdi-delete
                            </v-icon>
                        </template>
                        <span>Deletar</span>
                    </v-tooltip>
                </template>
            </v-data-table>
        </div>
        <!--<v-footer padless>
            <v-col style="flex: 1" class="text-center" id="footer" cols="12"
                ><strong color="#008DC0">2021 - WDA Livraria </strong>
            </v-col>
        </v-footer> -->
    </div>
</template>
<script>
import Livro from '../services/livros.js';
import Usuario from '../services/usuario.js';
import Alugueis from '../services/alugueis.js';
import { mdiBook, mdiAccountCircle, mdiBookshelf, mdiBookAccount, mdiBookPlusOutline, mdiHome } from '@mdi/js';
export default {
    name: 'Alugueis',

    data: () => ({
        dialog: false,
        dialogDelete: false,
        valid: true,

        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
        date2: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
        date3: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
        nowDate: new Date().toISOString().slice(0, 10),
        menu1: false,
        menu2: false,
        menu3: false,

        alugueis: {
            id: '',
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
            usuario: {
                id: '',
                nome: '',
                endereco: '',
                cidade: '',
                email: ''
            },
            data_aluguel: '',
            data_previsao: '',
            data_devolucao: ''
        },
        alugueis: [],

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
        usuario: {
            id: '',
            nome: '',
            endereco: '',
            cidade: '',
            email: ''
        },
        data_aluguel: '',
        data_previsao: '',
        data_devolucao: '',

        dataRules: [v => !!v || 'Este campo é obrigatório'],
        livroRules: [v => (v && v.nome != null) || 'Selecione um livro'],
        usuarioRules: [v => (v && v.nome != null) || 'Selecione um usuário'],
        rules: {
            required: v => !!v || 'Este campo é obrigatório.',
            dataPrevisaoRules: v => v >= this.editedItem.data_aluguel || 'Não Pode'
        },
        search: '',
        headers: [
            { text: 'ID', value: 'id' },
            { text: 'Livro', value: 'livro.nome' },
            { text: 'Usuário ', value: 'usuario.nome' },
            { text: 'Aluguel', value: 'data_aluguel' },
            { text: 'Previsão', value: 'data_previsao' },
            { text: 'Devolução', value: 'data_devolucao' },
            { text: 'Status', value: 'status', sortable: false },
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
            usuario: {
                id: '',
                nome: '',
                endereco: '',
                cidade: '',
                email: ''
            },
            data_aluguel: '',
            data_previsao: '',
            data_devolucao: ''
        },

        editedItem: {
            id: 0,
            livro: {
                id: '',
                nome: null,
                editora: {
                    id: '',
                    nome: '',
                    cidade: ''
                },
                autor: '',
                lancamento: '',
                quantidade: ''
            },
            usuario: {
                id: '',
                nome: null,
                endereco: '',
                cidade: '',
                email: ''
            },
            data_aluguel: '',
            data_previsao: '',
            data_devolucao: ''
        }
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Cadastrar Aluguel' : 'Editar Aluguel';
        },
        computedDateFormatted() {
            return this.formatDate(this.date);
        },
        computedDate2Formatted() {
            return this.formatDate(this.date2);
        },
        computedDate3Formatted() {
            return this.formatDate(this.date3);
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
            this.editedItem.data_aluguel = this.formatDate(this.date);
        },
        date2(val) {
            this.editedItem.data_previsao = this.formatDate(this.date2);
        },
        date3(val) {
            this.editedItem.data_devolucao = this.formatDate(this.date3);
        }
    },

    created() {
        this.initialize();
    },

    mounted() {
        this.listar();
        this.listarLivro();
        this.listarUsuario();
    },

    methods: {
        formatDate(date) {
            if (!date) return null;

            const [year, month, day] = date.split('-');
            return `${year}/${month}/${day}`;
        },
        parseDate(date) {
            if (!date) return null;

            const [month, day, year] = date.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        },

        formatDate(date2) {
            if (!date2) return null;

            const [year, month, day] = date2.split('-');
            return `${day}/${month}/${year}`;
        },
        parseDate(date2) {
            if (!date2) return null;

            const [month, day, year] = date2.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        },

        formatDate(date3) {
            if (!date3) return null;

            const [year, month, day] = date3.split('-');
            return `${year}-${month}-${day}`;
        },
        parseDate(date3) {
            if (!date3) return null;

            const [month, day, year] = date3.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        },
        openDialog() {
            this.dialog = true;
            this.editedIndex = -1;
        },

        openDialog() {
            this.dialog = true;
            this.editedIndex = -1;
        },

        validate() {
            this.$refs.form.validate();
        },
        reset() {
            this.$refs.form.reset();
        },
        resetValidation() {
            this.$refs.form.resetValidation();
        },

        listar() {
            Alugueis.listar().then(resposta => {
                this.alugueis = resposta.data;
            });
        },

        listarLivro() {
            Livro.listar().then(resposta => {
                this.livros = resposta.data;
            });
        },

        listarUsuario() {
            Usuario.listar().then(resposta => {
                this.usuarios = resposta.data;
            });
        },

        editItem(item) {
            this.editedIndex = this.alugueis.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            this.editedIndex = this.alugueis.indexOf(item);
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
            this.editedIndex = this.alugueis.indexOf(item);
            this.editedItem = Object.assign({}, item);

            this.$swal({
                title: 'Você tem certeza que deseja deletar este aluguel?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#008DC0',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não'
            }).then(result => {
                if (result.isConfirmed) {
                    Toast.fire('Aluguel deletado com sucesso!', '', 'success');

                    var del = {
                        id: this.editedItem.id,
                        livro: this.editedItem.livro,
                        usuario: this.editedItem.usuario,
                        data_aluguel: this.editedItem.data_aluguel,
                        data_previsao: this.editedItem.data_previsao,
                        data_devolucao: this.editedItem.data_devolucao
                    };
                    Alugueis.deletar(del).then(resposta => {
                        if (resposta != null) {
                            this.listar();
                        }
                        if (result.isCancel) {
                            this.close();
                        }
                    });
                }
            });
        },

        save() {
            if (this.editedIndex > -1) {
                if (this.editedItem.data_devolucao < this.editedItem.data_aluguel) {
                    Toast.fire('A data de devolução não pode ser anterior a data do aluguel', '', 'error');
                    this.listar();
                } else {
                    var edit = {
                        id: this.editedItem.id,
                        livro: this.editedItem.livro,
                        usuario: this.editedItem.usuario,
                        data_aluguel: this.editedItem.data_aluguel,
                        data_previsao: this.editedItem.data_previsao,
                        data_devolucao: this.editedItem.data_devolucao
                    };
                    Alugueis.alterar(edit).then(resposta => {
                        if (resposta != null) {
                            Toast.fire('Aluguel editado com sucesso!', '', 'success');
                            this.listar();
                            this.close();
                        }
                    });
                }
            } else {
                var save = {
                    livro: this.editedItem.livro,
                    usuario: this.editedItem.usuario,
                    data_aluguel: this.editedItem.data_aluguel,
                    data_previsao: this.editedItem.data_previsao
                };
                if (this.editedItem.data_previsao < this.editedItem.data_aluguel) {
                    Toast.fire('A data de previsão não pode ser anterior a data do aluguel', '', 'error');
                    this.listar();
                } else {
                    Alugueis.salvar(save).then(resposta => {
                        if (resposta != null) {
                            Toast.fire('Aluguel cadastrado com sucesso!', '', 'success');
                            this.listar();
                            this.close();
                        }
                    });
                }
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
.alugueis {
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
#footer {
    background-color: #008dc0;
    color: white;
}
</style>
