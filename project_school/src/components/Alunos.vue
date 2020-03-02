<template>
  <div>
    <titulo
      :texto="
        professor.id != undefined
          ? 'Professor: ' + professor.nome
          : 'Todos os Alunos'
      "
      btnVoltar="true"
    />

    <div v-if="professor.id != undefined">
      <input
        type="text"
        placeholder="Nome do Aluno"
        v-model="nome"
        v-on:keyup.enter="addAluno()"
      />
      <button class="btn btnInput" @click="addAluno()">Adicionar</button>
    </div>
    <table>
      <thead>
        <th>Mat.</th>
        <th>Nome</th>
        <th>Opções</th>
      </thead>
      <tbody v-if="alunos.length">
        <tr v-for="(aluno, index) in alunos" :key="index">
          <td>{{ aluno.id }}</td>
          <td>
            <router-link
              :to="`/alunoDetalhe/${aluno.id}`"
              tag="td"
              style="cursor:pointer"
              >{{ aluno.nome }} {{ aluno.sobrenome }}</router-link
            >
          </td>
          <td>
            <button class="btn" @click="remover(aluno)">Remover</button>
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
      titulo: "Aluno",
      nome: "",
      professorid: this.$route.params.prof_id,
      professor: [],
      alunos: []
      /*Exemplo data direto
      alunos: [
        {id: 1, nome: 'Marcus', sobrenome: 'Xavier'},
        {id: 2, nome: 'Lucas', sobrenome: 'Amaral'},
        {id: 3, nome: 'Paulo', sobrenome: 'Henrique'},
      ]
*/
    };
  },
  created() {
    if (this.professorid) {
      this.carregarProfessores();
      this.$http
        .get("http://localhost:3000/alunos/?professor.id=" + this.professorid)
        .then(res => res.json())
        .then(alunos_res => (this.alunos = alunos_res));
    } else {
      this.$http
        .get("http://localhost:3000/alunos")
        .then(res => res.json())
        .then(alunos_res => (this.alunos = alunos_res));
    }
  },
  props: {},
  methods: {
    /* AddAluno sem Post
    addAluno() {
      let aluno = {
        nome: this.nome
      }
      this.alunos.push(aluno);
      console.log('-------');
      this.alunos.forEach(alunoel => {
        console.log(alunoel)
      });
    }, */
    addAluno() {
      let _aluno = {
        nome: this.nome,
        sobrenome: "",
        professor: {
          id: this.professor.id,
          nome: this.professor.nome
        }
      };

      this.$http
        .post("http://localhost:3000/alunos", _aluno)
        .then(res => res.json())
        .then(retorno => {
          this.alunos.push(retorno);
          this.nome = "";
        });
    },
    /* remover ser http
    remover(aluno){
      let indice = this.alunos.indexOf(aluno);
      this.alunos.splice(indice, 1);
    } */
    remover(aluno) {
      this.$http.delete(`http://localhost:3000/alunos/${aluno.id}`).then(() => {
        //Retira da lista em caso de sucesso
        let indice = this.alunos.indexOf(aluno);
        this.alunos.splice(indice, 1);
      });
    },
    carregarProfessores() {
      this.$http
        .get("http://localhost:3000/professores/" + this.professorid)
        .then(res => res.json())
        .then(professor => {
          this.professor = professor;
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  border: 0;
  padding: 20px;
  font-size: 1.3em;
  color: #687f7f;
  display: inline;
}
.btnInput {
  width: 150px;
  border: 0px;
  padding: 20px;
  font-size: 1.3em;
  background-color: rgb(116, 115, 115);
}
</style>
