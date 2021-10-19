<template>
  <v-card class="mb-4">
    <v-card-title>
      <span class="text-h5">Cadastrar aluno</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-text-field
          v-model="ra_aluno"
          label="RA"
          :rules="raRules"
          required
        ></v-text-field>

        <v-text-field
          v-model="name"
          label="Nome"
          :rules="nameRules"
          required
        ></v-text-field>

        <v-text-field
          v-model="cpf"
          label="CPF"
          :rules="cpfRules"
        ></v-text-field>

        <v-text-field
          v-model="email"
          label="E-mail"
          :rules="emailRules"
        ></v-text-field>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="close">
        Cancel
      </v-btn>
      <v-btn color="primary darken-1" text @click="post">
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      ra_aluno: '',
      name: '',
      cpf: '',
      email: '',
      dialogPost: false,
      error: undefined,
      dialogDelete: false,
      raRules: [v => !!v || 'RA é obrigatório'],
      nameRules: [v => !!v || 'Nome é obrigatório'],
      emailRules: [
        v => !!v || 'E-mail é obrigatório',
        v => /.+@.+\..+/.test(v) || 'E-mail precisa ser válido',
      ],
      cpfRules: [
        v => !!v || 'CPF precisa ser válido',
        v =>
          /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2})$/.test(
            v
          ) || 'CPF precisa ser válido',
      ],
    };
  },
  methods: {
    close() {
      this.$store.state.register = false;
    },
    post() {
      axios
        .post('http://localhost:3333/api/users', {
          ra_aluno: this.ra_aluno,
          name: this.name,
          cpf: this.cpf,
          email: this.email,
        })
        .then(() => {
          this.$store.dispatch('createUser');
          this.$store.state.register = false;
        })
        .catch(err => console.log(err));
    },
  },
};
</script>

<style></style>
