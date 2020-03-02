<template>
  <div>
    <titulo texto="Professores" btnVoltar="true" />
    <table>
      <thead>
        <th>Cód.</th>
        <th>Nome</th>
        <th>Qtd Alunos</th>
      </thead>
      <tbody v-if="Professores.length">
        <tr v-for="(professor, index) in Professores" :key="index">
          <td>{{ professor.id }}</td>
          <!-- templatestring -->
          <router-link
            v-bind:to="`/alunos/${professor.id}`"
            tag="td"
            style="cursor:pointer"
            >{{ professor.nome }} {{ professor.sobrenome }}</router-link
          >
          <td>
            {{ professor.qtdAlunos }}
          </td>
        </tr>
      </tbody>
      <div v-else>
        Nenhum aluno encontrado.
      </div>
    </table>
  </div>
</template>

<script>
import Titulo from "../components/_shared/Titulo";
export default {
  components: {
    Titulo
  },
  data() {
    return {
      /* Dados Diretos
            Professores: [
                {id: 1, nome: "Vinicius"},
                {id: 2, nome: "Paula"},
                {id: 3, nome: "Luna"}
            ] */
      Professores: [],
      Alunos: []
    };
  },
  created() {
    this.$http
      .get("http://localhost:3000/alunos")
      .then(res => res.json())
      .then(alunos_res => {
        this.Alunos = alunos_res;
        this.carregarProfessores();
      });
  },
  props: {},
  methods: {
    pegarQtdAlunosPorProf() {
      this.Professores.forEach((professor, index) => {
        professor = {
          id: professor.id,
          nome: professor.nome,
          qtdAlunos: this.Alunos.filter(
            aluno => aluno.professor.id == professor.id
          ).length
        };
        this.Professores[index] = professor;
      });
    },
    carregarProfessores() {
      this.$http
        .get("http://localhost:3000/professores")
        .then(res => res.json())
        .then(professor => {
          this.Professores = professor;
          this.pegarQtdAlunosPorProf();
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
