import Vue from "vue";
import Router from "vue-router";
import Alunos from "./components/Alunos.vue";
import AlunoDetalhe from "./components/AlunoDetalhe.vue";
import Professor from "./components/Professor.vue";
import Sobre from "./components/Sobre.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/professores",
      nome: "Professores",
      component: Professor
    },
    {
      path: "/alunos/:prof_id",
      nome: "Alunos",
      component: Alunos
    },
    {
      path: "/alunosall",
      nome: "AlunosTodos",
      component: Alunos
    },
    {
      path: "/AlunoDetalhe/:id",
      nome: "AlunoDetalhe",
      component: AlunoDetalhe
    },
    {
      path: "/sobre",
      nome: "Sobre",
      component: Sobre
    }
  ]
});
