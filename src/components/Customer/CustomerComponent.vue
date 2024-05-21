<template>
    <div class="container">
      <h1>Clientes</h1>
      <div class="row">
        <div class="col-md-6">
          <h2>Nuevo Cliente</h2>
          <form @submit.prevent="createCustomer">
            <div class="form-group">
              <label for="document_number">DNI:</label>
              <input type="text" class="form-control" id="document_number" v-model="newCustomer.document_number">
            </div>
            <div class="form-group">
              <label for="first_name">Nombre:</label>
              <input type="text" class="form-control" id="first_name" v-model="newCustomer.first_name">
            </div>
            <div class="form-group">
              <label for="last_name">Apellido:</label>
              <input type="text" class="form-control" id="last_name" v-model="newCustomer.last_name">
            </div>
            <div class="form-group">
              <label for="address">Dirección:</label>
              <input type="text" class="form-control" id="address" v-model="newCustomer.address">
            </div>
            <div class="form-group">
              <label for="birthday">Fecha de Nacimiento:</label>
              <input type="date" class="form-control" id="birthday" v-model="newCustomer.birthday">
            </div>
            <div class="form-group">
              <label for="phone_number">Teléfono:</label>
              <input type="text" class="form-control" id="phone_number" v-model="newCustomer.phone_number">
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" class="form-control" id="email" v-model="newCustomer.email">
            </div>
            <button type="submit" class="btn btn-primary">Crear</button>
          </form>
        </div>
        <div class="col-md-6">
          <h2>Lista de Clientes</h2>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>DNI</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Dirección</th>
                <th>Fecha de Nacimiento</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="customer in customers" :key="customer.id">
                <td>{{ customer.id }}</td>
                <td>{{ customer.document_number }}</td>
                <td>{{ customer.first_name }}</td>
                <td>{{ customer.last_name }}</td>
                <td>{{ customer.address }}</td>
                <td>{{ customer.birthday }}</td>
                <td>{{ customer.phone_number }}</td>
                <td>{{ customer.email }}</td>
                <td>
                  <button class="btn btn-warning btn-sm" @click="editCustomer(customer)">Editar</button>
                  <button class="btn btn-danger btn-sm" @click="deleteCustomer(customer.id)">Eliminar</button>
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
        customers: [],
        newCustomer: {
          document_number: '',
          first_name: '',
          last_name: '',
          address: '',
          birthday: null,
          phone_number: '',
          email: '',
        },
        editCustomerData: {
          id: null,
          document_number: '',
          first_name: '',
          last_name: '',
          address: '',
          birthday: null,
          phone_number: '',
          email: '',
        },
      };
    },
    mounted() {
      this.fetchCustomers();
    },
    methods: {
      fetchCustomers() {
        axios.get('http://127.0.0.1:8000/api/customers')
          .then(response => {
            this.customers = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      createCustomer() {
        axios.post('http://127.0.0.1:8000/api/customers', this.newCustomer)
          .then(response => {
            this.customers.push(response.data);
            this.newCustomer = { document_number: '', first_name: '', last_name: '', address: '', birthday: null, phone_number: '', email: '' };
          })
          .catch(error => {
            console.error(error);
          });
      },
      editCustomer(customer) {
        this.editCustomerData = Object.assign({}, customer);
      },
      updateCustomer() {
        axios.put(`http://127.0.0.1:8000/api/customers/${this.editCustomerData.id}`, this.editCustomerData)
          .then(response => {
            const index = this.customers.findIndex(cust => cust.id === this.editCustomerData.id);
            this.customers.splice(index, 1, response.data);
            this.editCustomerData = { id: null, document_number: '', first_name: '', last_name: '', address: '', birthday: null, phone_number: '', email: '' };
          })
          .catch(error => {
            console.error(error);
          });
      },
      deleteCustomer(id) {
        axios.delete(`http://127.0.0.1:8000/api/customers/${id}`)
          .then(() => {
            this.customers = this.customers.filter(customer => customer.id !== id);
          })
          .catch(error => {
            console.error(error);
          });
      },
    },
  };
  </script>