<template>
  <div id="app">
    <Header></Header>
    <!-- <img src="./assets/logo.png"> -->
    <transition name="modal"><router-view/></transition>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  created () {
    Vue.prototype.$config = {
      varHttp: 'http://',
      varHttps: 'https://',
      apiLocalhost: 'localhost',
      apiAmazon: 'elb-quantum-765679294.eu-west-1.elb.amazonaws.com',
      apiProjects: '/api/projects',
      apiProjectsTechnologies: '/api/projects/technologies',
      apiProjectsNames: '/api/projects/names',
      apiCategories: '/api/projects/categories',
      apiWorkplaces: '/api/projects/workplaces',
      apiProjectsById: '/api/projects/id',
      apiPersonsById: '/api/persons/id',
      apiRoles: '/api/persons/roles',
      apiPersonsTechnologies: '/api/persons/technologies',
      apiPersonsNames: '/api/persons/names',
      apiPersons: '/api/persons',
      apiPersonsOrganigram: '/api/persons/organigram'
    }
  }
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 0px;
}
.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
    transition: opacity .3s ease;
    overflow-y: auto;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
