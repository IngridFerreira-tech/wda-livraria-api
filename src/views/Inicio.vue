<template>
    <div class="inicio">
        <div class="menu">
            <nav>
                <input type="checkbox" id="check" />
                <label for="check" class="checkbtn">
                    <i class="fas fa-bars"></i>
                </label>
                <img src="../assets/logo1.png" /><label class="logo">WDA Livraria</label>
                <ul>
                    <li>
                        <router-link to="/" style="color: white" class="active"
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
                        <router-link to="/alugueis" style="color: white"
                            ><v-icon color="primari">{{ svgPath4 }}</v-icon
                            >Alugueis</router-link
                        >
                    </li>
                </ul>
            </nav>
        </div>
        <div class="cards">
            <v-container>
                <v-row dense>
                    <v-col cols="20">
                        <v-card color="#008DC0" dark>
                            <v-card-title class="text-h5">
                                <v-icon class="mr-1" color="primari">{{ svgPath }}</v-icon
                                >Último Livro Cadastrado
                            </v-card-title>
                            <v-card-text>
                                <div class="flex3" v-for="(livro, inicio) in ultimoLivro" :key="inicio">
                                    <h6><b class="titulo">Nome:</b> {{ livro.nome }}</h6>
                                    <h6><b class="titulo">Autor:</b> {{ livro.autor }}</h6>
                                </div>
                                <div class="flex4" v-for="(livro, inicio) in ultimoLivro" :key="inicio">
                                    <h6><b class="titulo">Editora:</b> {{ livro.editora.nome }}</h6>
                                    <h6><b class="titulo">Lançamento:</b> {{ livro.lancamento }}</h6>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
            <v-container>
                <v-row dense>
                    <v-col cols="20">
                        <v-card color="#008DC0" dark>
                            <v-card-title class="text-h5">
                                <v-icon class="mr-1" color="primari">{{ svgPath4 }}</v-icon
                                >Último Aluguel Cadastrado
                            </v-card-title>
                            <v-card-text v-if="ultimoAluguel != 0">
                                <div class="flex1" v-for="(alugueis, inicio) in ultimoAluguel" :key="inicio">
                                    <h6><b class="titulo">Livro:</b> {{ alugueis.livro.nome }}</h6>
                                    <h6><b class="titulo">Usuário:</b> {{ alugueis.usuario.nome }}</h6>
                                </div>
                                <div class="flex2" v-for="(alugueis, inicio) in ultimoAluguel" :key="inicio">
                                    <h6><b class="titulo">Data do Aluguel:</b> {{ alugueis.data_aluguel }}</h6>
                                    <h6><b class="titulo">Previsão de devolução:</b> {{ alugueis.data_previsao }}</h6>
                                </div>
                            </v-card-text>
                            <div v-if="alugueis == 0">
                                <v-card-title>Aluguéis não encontrados</v-card-title>
                            </div>
                            <div v-if="livros == 0">
                                <v-card-title>Livros não encontrados</v-card-title>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>
        <v-container>
            <v-row dense>
                <v-col cols="10">
                    <v-card class="cardg">
                        <v-card-title class="title">Resumo das situações dos aluguéis</v-card-title>
                        <div class="grafico">
                            <apexchart
                                v-if="!loading"
                                type="pie"
                                width="590"
                                :options="chartOptions"
                                :series="series"
                            ></apexchart>
                        </div>
                    </v-card> </v-col></v-row
        ></v-container>
        <Footer />
    </div>
</template>
<script>
import { mdiBook, mdiAccountCircle, mdiBookshelf, mdiBookAccount, mdiBookPlusOutline, mdiHome } from '@mdi/js';
import Livro from '../services/inicio.js';
import Usuario from '../services/inicio.js';
import Alugueis from '../services/inicio.js';
import Footer from '../components/Footer.vue';
export default {
    name: 'Inicio',
    components: { Footer },
    data: () => {
        return {
            svgPath: mdiBook,
            svgPath2: mdiAccountCircle,
            svgPath3: mdiBookshelf,
            svgPath4: mdiBookAccount,
            svgPath5: mdiBookPlusOutline,
            svgPath6: mdiHome,

            loading: true,

            series: [0, 0, 0],
            chartOptions: {
                chart: {
                    type: 'pie'
                },

                colors: ['#006494', '#13293D', '#009DCF'],

                labels: ['Livro em aluguel', 'Entregue com atraso', 'Entregue no prazo'],
                responsive: [
                    {
                        breakpoint: 480,

                        options: {
                            chart: {
                                width: 220
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }
                ]
            },

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
            ultimoLivro: [],
            ultimoAluguel: [],
            alugueis: []
        };
    },

    created() {
        this.listarAluguel();
    },
    mounted() {
        this.listarLivros();

        this.listarUsuarios();
    },

    methods: {
        listarLivros() {
            Livro.listarLivros().then(resposta => {
                this.livros = resposta.data;
                var ultimoLivro = this.livros[this.livros.length - 1];
                console.log(ultimoLivro);
                this.ultimoLivro = [ultimoLivro];
            });
        },

        listarAluguel() {
            Alugueis.listarAluguel().then(resposta => {
                this.alugueis = resposta.data;
                var ultimoAluguel = this.alugueis[this.alugueis.length - 1];
                console.log(ultimoAluguel);

                this.ultimoAluguel = [ultimoAluguel];

                this.alugueis.forEach(alugueis => {
                    if (alugueis.data_devolucao <= alugueis.data_previsao) {
                        this.series[2]++;
                    }
                });
                this.alugueis.forEach(alugueis => {
                    if (alugueis.data_devolucao == null) {
                        this.series[0]++;
                    }
                });
                this.alugueis.forEach(alugueis => {
                    if (alugueis.data_devolucao > alugueis.data_previsao) {
                        this.series[1]++;
                    }
                });

                this.loading = false;
            });
        },

        listarUsuarios() {
            Usuario.listarUsuarios().then(resposta => {
                this.usuarios = resposta.data;
                var ultimoUsuario = this.usuarios[this.usuarios.length - 1];
                console.log(ultimoUsuario);
                this.ultimoUsuario = [ultimoUsuario];
            });
        }
    }
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
body {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    background-color: #e0e0e0;
}
.inicio {
    height: 100%;
    background-color: #e0e0e0;
}
.cards {
    display: flex;
    width: 100%;
}
.titulo {
    color: #ffffff;
}

.flex2 {
    margin-left: 350px;
    margin-top: -55px;
}

.flex4 {
    margin-left: 400px;
    margin-top: -53px;
}
.grafico {
    margin-top: 20px;
    margin-left: 150px;
}
.title {
    color: #008dc0;
    margin-left: 160px;
    font-family: 'Montserrat', sans-serif;
}
.cardg {
    margin-left: 220px;
}
#footer {
    background-color: #008dc0;
    color: white;
}
</style>
