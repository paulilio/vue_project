<template>
  <div>
    <titulo texto="Aluno"/>
    <input  type="text" placeholder="Nome do Aluno" v-model="nome"
    v-on:keyup.enter="addAluno()">
    <button class="btn btnInput" @click="addAluno()">Adicionar</button>

    <table>
    <thead>
      <th>Mat.</th>
      <th>Nome</th>
      <th>Opções</th>
    </thead>
    <tbody v-if="alunos.length">
      <tr v-for="(aluno, index) in alunos" :key="index">
        <td>{{aluno.id}}</td>
        <td>{{aluno.nome}} {{aluno.sobrenome}}</td>
        <td>
          <button class="btn" @click="remover(aluno)">Remover</button>
        </td>
      </tr>
    </tbody>
    <ifoot v-else>
      Nenhum aluno encontrado.
    </ifoot>
    </table>
  </div>
</template>

<script>
import Titulo from '../components/_shared/Titulo'

export default {
  components: {
    Titulo
  },
  data() {
    return {
      titulo: 'Aluno',
      nome: "",
      alunos: []
/*Exemplo data direto
      alunos: [
        {id: 1, nome: 'Marcus', sobrenome: 'Xavier'},
        {id: 2, nome: 'Lucas', sobrenome: 'Amaral'},
        {id: 3, nome: 'Paulo', sobrenome: 'Henrique'},
      ]
*/
    }
  },
  created() {
    this.$http.get('http://localhost:3000/alunos')
    .then(res => res.json())
    .then(alunos_res => this.alunos = alunos_res)
  },
  props: { 
  },
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
        sobrenome: ""
      }
      
      this.$http.post('http://localhost:3000/alunos', _aluno)
      .then(res => res.json())
      .then(retorno => {
        this.alunos.push(retorno);
        this.nome = '';
      })
      
    },
/* remover ser http
    remover(aluno){
      let indice = this.alunos.indexOf(aluno);
      this.alunos.splice(indice, 1);
    } */
  remover(aluno){
      this.$http.delete(`http://localhost:3000/alunos/${aluno.id}`)
      .then(() => {
        //Retira da lista em caso de sucesso
        let indice = this.alunos.indexOf(aluno);
        this.alunos.splice(indice, 1);
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
border: 0;
padding: 20px;
font-size: 1.3em;
color: #687f7f;
display: inline
}
.btnInput {
 width: 150px;
 border: 0px;
 padding: 20px;
 font-size: 1.3em;
 background-color: rgb(116,115,115);

}
</style>
