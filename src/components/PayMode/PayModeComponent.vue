<template>
    <div class="container">
      <h1>Modos de Pago</h1>
      <div class="row">
        <div class="col-md-6">
          <h2>Nuevo Modo de Pago</h2>
          <form @submit.prevent="createPayMode">
            <div class="form-group">
              <label for="name">Nombre:</label>
              <input type="text" class="form-control" id="name" v-model="newPayMode.name">
            </div>
            <div class="form-group">
              <label for="observation">Observación:</label>
              <textarea class="form-control" id="observation" v-model="newPayMode.observation"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Crear</button>
          </form>
        </div>
        <div class="col-md-6">
          <h2>Lista de Modos de Pago</h2>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Observación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="payMode in payModes" :key="payMode.id">
                <td>{{ payMode.id }}</td>
                <td>{{ payMode.name }}</td>
                <td>{{ payMode.observation }}</td>
                <td>
                  <button class="btn btn-warning btn-sm" @click="editPayMode(payMode)">Editar</button>
                  <button class="btn btn-danger btn-sm" @click="deletePayMode(payMode.id)">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        payModes: [],
        newPayMode: {
          name: '',
          observation: '',
        },
        editPayModeData: {
          id: null,
          name: '',
          observation: '',
        },
      };
    },
    mounted() {
      this.fetchPayModes();
    },
    methods: {
      fetchPayModes() {
        axios.get('http://127.0.0.1:8000/api/pay_modes')
          .then(response => {
            this.payModes = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      createPayMode() {
        axios.post('http://127.0.0.1:8000/api/pay_modes', this.newPayMode)
          .then(response => {
            this.payModes.push(response.data);
            this.newPayMode = { name: '', observation: '' };
          })
          .catch(error => {
            console.error(error);
          });
      },
      editPayMode(payMode) {
        this.editPayModeData = Object.assign({}, payMode);
      },
      updatePayMode() {
        axios.put(`http://127.0.0.1:8000/api/pay_modes/${this.editPayModeData.id}`, this.editPayModeData)
          .then(response => {
            const index = this.payModes.findIndex(pm => pm.id === this.editPayModeData.id);
            this.payModes.splice(index, 1, response.data);
            this.editPayModeData = { id: null, name: '', observation: '' };
          })
          .catch(error => {
            console.error(error);
          });
      },
      deletePayMode(id) {
        axios.delete(`http://127.0.0.1:8000/api/pay_modes/${id}`)
          .then(() => {
            this.payModes = this.payModes.filter(payMode => payMode.id !== id);
          })
          .catch(error => {
            console.error(error);
          });
      },
    },
  };
  </script>