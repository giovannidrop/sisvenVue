<template>
    <div class="container">
      <h1>Productos</h1>
      <div class="row">
        <div class="col-md-6">
          <h2>Nuevo Producto</h2>
          <form @submit.prevent="createProduct">
            <div class="form-group">
              <label for="name">Nombre:</label>
              <input type="text" class="form-control" id="name" v-model="newProduct.name">
            </div>
            <div class="form-group">
              <label for="price">Precio:</label>
              <input type="number" class="form-control" id="price" v-model="newProduct.price">
            </div>
            <div class="form-group">
              <label for="stock">Stock:</label>
              <input type="number" class="form-control" id="stock" v-model="newProduct.stock">
            </div>
            <div class="form-group">
              <label for="category_id">Categoría:</label>
              <select class="form-control" id="category_id" v-model="newProduct.category_id">
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">Crear</button>
          </form>
        </div>
        <div class="col-md-6">
          <h2>Lista de Productos</h2>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td>{{ product.id }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.stock }}</td>
                <td>{{ product.category.name }}</td> 
                <td>
                  <button class="btn btn-warning btn-sm" @click="editProduct(product)">Editar</button>
                  <button class="btn btn-danger btn-sm" @click="deleteProduct(product.id)">Eliminar</button>
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
        products: [],
        categories: [], // Asegúrate de obtener las categorías
        newProduct: {
          name: '',
          price: 0,
          stock: 0,
          category_id: null,
        },
        editProductData: {
          id: null,
          name: '',
          price: 0,
          stock: 0,
          category_id: null,
        },
      };
    },
    mounted() {
      this.fetchProducts();
      this.fetchCategories();
    },
    methods: {
      fetchProducts() {
        axios.get('http://127.0.0.1:8000/api/products')
          .then(response => {
            this.products = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      fetchCategories() {
        axios.get('http://127.0.0.1:8000/api/categories')
          .then(response => {
            this.categories = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      createProduct() {
        axios.post('http://127.0.0.1:8000/api/products', this.newProduct)
          .then(response => {
            this.products.push(response.data);
            this.newProduct = { name: '', price: 0, stock: 0, category_id: null };
          })
          .catch(error => {
            console.error(error);
          });
      },
      editProduct(product) {
        this.editProductData = Object.assign({}, product);
      },
      updateProduct() {
        axios.put(`http://127.0.0.1:8000/api/products/${this.editProductData.id}`, this.editProductData)
          .then(response => {
            const index = this.products.findIndex(prod => prod.id === this.editProductData.id);
            this.products.splice(index, 1, response.data);
            this.editProductData = { id: null, name: '', price: 0, stock: 0, category_id: null };
          })
          .catch(error => {
            console.error(error);
          });
      },
      deleteProduct(id) {
        axios.delete(`http://127.0.0.1:8000/api/products/${id}`)
          .then(() => {
            this.products = this.products.filter(product => product.id !== id);
          })
          .catch(error => {
            console.error(error);
          });
      },
    },
  };
  </script>