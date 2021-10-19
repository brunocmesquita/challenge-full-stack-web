<template>
  <div>
    <v-card flat>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" class="mb-2" dark @click="initialize"
          ><v-icon dark>
            mdi-refresh
          </v-icon></v-btn
        >
        <v-btn color="primary" dark class="mb-2" @click="toogleRegister">
          Cadastrar aluno
        </v-btn>
      </v-card-actions>
    </v-card>
    <register-dialog v-show="$store.state.register"></register-dialog>
    <template>
      <v-data-table
        :headers="headers"
        :items="users"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-toolbar-title class="text-center"
              >Challenge Alunos</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="700px">
              <v-card>
                <v-card-title>
                  <span class="text-h5">Editar aluno</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          :disabled="editedIndex !== -1"
                          v-model="editedItem.ra_aluno"
                          label="RA"
                          :rules="raRules"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Nome"
                          :rules="nameRules"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.cpf"
                          label="CPF"
                          :rules="cpfRules"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.email"
                          label="E-mail"
                          :rules="emailRules"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </template>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  created() {
    this.initialize();
  },
  data() {
    return {
      dialog: false,
      register: false,
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
      headers: [
        {
          text: 'RA',
          align: 'start',
          sortable: false,
          value: 'ra_aluno',
        },
        { text: 'Nome', value: 'name' },
        { text: 'CPF', value: 'cpf' },
        { text: 'E-mail', value: 'email' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        cpf: '',
        email: '',
      },
      defaultItem: {
        name: '',
        cpf: '',
        email: '',
      },
      users: [],
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    initialize() {
      axios
        .get('http://localhost:3333/api/users')
        .then(res => (this.users = res.data.data));
    },
    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.users.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        axios
          .delete(`http://localhost:3333/api/users/${this.editedItem.id}`)
          .then(() => this.$store.dispatch('deleteUser'));
      });
    },
    save() {
      if (this.editedIndex > -1) {
        axios
          .put(`http://localhost:3333/api/users/${this.editedItem.id}`, {
            name: this.editedItem.name,
            cpf: this.editedItem.cpf,
            email: this.editedItem.email,
          })
          .then(() => {
            this.$store.dispatch('updateUser');
            this.initialize();
            this.close();
          })
          .catch(err => {
            let msgErro = err.message;
            this.error = msgErro;
          });
      } else {
        this.users.push(this.editedItem);
      }
      this.close();
    },
    toogleRegister() {
      this.$store.state.register = !this.$store.state.register;
    },
  },
  components: {
    'register-dialog': require('@/components/data/RegisterDialog.vue').default,
  },
};
</script>

<style></style>
