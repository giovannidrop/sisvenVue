<template>
    <div class="container">
      <h1>Categorías</h1>
      <div class="row">
        <div class="col-md-6">
          <h2>Nueva Categoría</h2>
          <form @submit.prevent="createCategory">
            <div class="form-group">
              <label for="name">Nombre:</label>
              <input type="text" class="form-control" id="name" v-model="newCategory.name">
            </div>
            <div class="form-group">
              <label for="description">Descripción:</label>
              <textarea class="form-control" id="description" v-model="newCategory.description"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Crear</button>
          </form>
        </div>
        <div class="col-md-6">
          <h2>Lista de Categorías</h2>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="category in categories" :key="category.id">
                <td>{{ category.id }}</td>
                <td>{{ category.name }}</td>
                <td>{{ category.description }}</td>
                <td>
                  <button class="btn btn-warning btn-sm" @click="editCategory(category)">Editar</button>
                  <button class="btn btn-danger btn-sm" @click="deleteCategory(category.id)">Eliminar</button>
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
        categories: [],
        newCategory: {
          name: '',
          description: '',
        },
        editCategoryData: {
          id: null,
          name: '',
          description: '',
        },
      };
    },
    mounted() {
      this.fetchCategories();
    },
    methods: {
      fetchCategories() {
        axios.get('http://127.0.0.1:8000/api/categories')
          .then(response => {
            this.categories = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      createCategory() {
        axios.post('http://127.0.0.1:8000/api/categories', this.newCategory)
          .then(response => {
            this.categories.push(response.data);
            this.newCategory = { name: '', description: '' };
          })
          .catch(error => {
            console.error(error);
          });
      },
      editCategory(category) {
        this.editCategoryData = Object.assign({}, category);
      },
      updateCategory() {
        axios.put(`http://127.0.0.1:8000/api/categories/${this.editCategoryData.id}`, this.editCategoryData)
          .then(response => {
            const index = this.categories.findIndex(cat => cat.id === this.editCategoryData.id);
            this.categories.splice(index, 1, response.data);
            this.editCategoryData = { id: null, name: '', description: '' };
          })
          .catch(error => {
            console.error(error);
          });
      },
      deleteCategory(id) {
        axios.delete(`http://127.0.0.1:8000/api/categories/${id}`)
          .then(() => {
            this.categories = this.categories.filter(category => category.id !== id);
          })
          .catch(error => {
            console.error(error);
          });
      },
    },
  };
  </script>