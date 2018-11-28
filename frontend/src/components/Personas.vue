<template>
  <div class="body-container" >
      <div id="listado-proyectos">
        <div class="main-container">
            <div></div>
            <div class="list-persons">
              <div class="cont-filters">
                <label id="show-filters" @click="showFiltersFun()">Filtros
                  <img class="icon-show-filters" v-if="showFilters" src="../assets/less.svg">
                  <img class="icon-show-filters" v-if="!showFilters" src="../assets/more.svg">
                </label>
                <div v-show="showFilters" class="filters-colums">
                  <div class="w-90">
                    <!--<Multi :category="'Nombre'" :busName="'nom'" :options="personsNamesList" :ismultiple="false"></Multi>-->
                    <label class="input-label">Nombre</label>
                    <input v-model="nameInput" placeholder="" v-on:input="onNameInput()" class="input-text">
                  </div>
                  <div class="w-90"></div>
                  <div class="w-90"></div>
                  <div class="w-90">
                    <Multi :category="'Tecnologias'" :busName="'tecno'" :options="personsTechnologiesList" :ismultiple="true"></Multi>
                  </div>
                  <div class="w-90">
                    <Multi :category="'Roles'" :busName="'role'" :options="personsRolesList" :ismultiple="true"></Multi>
                  </div>
                </div>
              </div>
              <div v-if="showInfoResultFilters">
                <label class="info-filters-result"> <img class="icon-show-filters" src="../assets/lupa.svg">Estos son los resultados obtenidos de tu filtro</label>
              </div>
              <ul class="no-padding">
                <li v-for="item in orderBy(personsJSON, 'name')" :key="item._id" @click="showModalFunc(item)">
                  <div class="card" style="width: 100%;">
                    <img class="card-img-top size-img" :src="item.photo" v-bind:alt="item.photo">
                    <div class="card-body">
                      <p class="card-text title-card">{{item.name}}</p>
                      <p class="card-text short-desc-card">{{getFormattedRolesString(item.roles)}}</p>
                      <label class="view-more">Ver más</label>
                  </div>
                  </div>
                </li>
              </ul>
              <div class="no-items" v-if=" Object.keys(personsJSON).length === 0">
                <label class="text-no-items"> <img src="../assets/not-found.svg" class="ico-no-items" alt="not found">No se han encontrado personas para su busqueda</label>
              </div>
              <ul class="paginationBar">
                <li class="prev-page">
                  <label class="boton-page" v-if="hasPrevPage" @click="prevPage()"><img id="icon-pages" src="../assets/return.svg">  Anterior</label>
                </li>
                <li class="number-page">
                  <label class="numbers-pages" v-if="hasPrevPage || hasNextPage">{{pageCounter+1}}/{{numberOfPages}}</label>
                </li>
                <li class="next-page">
                  <label class="boton-page" v-if="hasNextPage" @click="nextPage()">Siguiente  <img id="icon-pages" src="../assets/next.svg"></label>
                </li>
              </ul>
            </div>
          <div></div>
          <Modal v-if="showModal" :item="itemSend" @close="showModal = false"></Modal>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import MY_JSON from '../json/personas.json'
import Vue from 'vue'
import Vue2Filters from 'vue2-filters'
import {VueTabs, VTab} from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'
import Multi from '@/components/Multi.vue'
import Modal from '@/components/Modal.vue'
import { EventBus } from './event-bus.js'

Vue.use(Vue2Filters)
Vue.use(VueTabs)

export default {
  name: 'Personas',
  data () {
    return {
      personsJSON: JSON,
      personsTechnologiesList: [],
      personsRolesList: [],
      personsNamesList: [],
      showModal: false,
      itemSend: {},
      arrayPersons: [],
      errors: [],
      pageCounter: 0,
      hasNextPage: false,
      hasPrevPage: false,
      showDetailComponent: false,
      path: '',
      body: {},
      optionsTech: [],
      optionsRoles: [],
      optionsName: {},
      numberOfPages: 0,
      // Opciones para multiselect:
      multiselectValue: '',
      // multiselectOptions: projectsTechnologiesListJSON
      showFilters: false,
      valueTech: [],
      nameInput: '',
      showInfoResultFilters: false
    }
  },
  methods: {
    onNameInput () {
      this.optionsTech = []
      this.optionsRoles = []
      this.optionsName = {}
      this.pageCounter = 0
      this.getPersons()
    },
    nextPage () {
      this.pageCounter = this.pageCounter + 1
      this.getPersons()
    },

    prevPage () {
      this.pageCounter = this.pageCounter - 1
      this.getPersons()
    },

    getPersons () {
      this.path = this.$config.varHttp + this.$config.apiAmazon + this.$config.apiPersons
      this.body = {page: this.pageCounter}
      if (this.optionsTech.length > 0) {
        this.path = this.$config.varHttp + this.$config.apiAmazon + this.$config.apiPersonsTechnologies
        this.body = {page: this.pageCounter, request: this.optionsTech}
      } else if (this.optionsRoles.length > 0) {
        this.path = this.$config.varHttp + this.$config.apiAmazon + this.$config.apiRoles
        this.body = {page: this.pageCounter, request: this.optionsRoles}
      } else if (this.optionsName.length > 0) {
        this.path = this.$config.varHttp + this.$config.apiAmazon + this.$config.apiPersonsNames
        this.body = {page: this.pageCounter, request: this.optionsName[0].name}
      } else if (this.nameInput.length > 0) {
        this.path = this.$config.varHttp + this.$config.apiAmazon + this.$config.apiPersonsNames
        this.body = {page: this.pageCounter, request: this.nameInput}
      }
      axios.post(this.path, this.body)
        .then(response => {
          this.personsJSON = response.data.result
          this.hasNextPage = response.data.hasNextPage
          this.hasPrevPage = response.data.hasPrevPage
          this.numberOfPages = response.data.numberOfPages
        }).catch(error => {
          console.log(error)
        })
    },

    getPersonsTechnologiesList () {
      const path = this.$config.varHttp + this.$config.apiAmazon + this.$config.apiPersonsTechnologies
      axios.get(path)
        .then(response => {
          this.personsTechnologiesList = response.data.result
        }).catch(error => {
          console.log(error)
        })
    },

    getPersonsRolesList () {
      const path = this.$config.varHttp + this.$config.apiAmazon + this.$config.apiRoles
      axios.get(path)
        .then(response => {
          this.personsRolesList = response.data.result
        }).catch(error => {
          console.log(error)
        })
    },

    getPersonsNamesList () {
      const path = this.$config.varHttp + this.$config.apiAmazon + this.$config.apiPersonsNames
      axios.get(path)
        .then(response => {
          this.personsNamesList = response.data.result
          console.log(this.projectsNamesList)
        }).catch(error => {
          console.log(error)
        })
    },

    showFiltersFun () {
      this.showFilters = !this.showFilters
    },

    getFormattedRolesString (rolesArray) {
      var finalString = ''
      var i
      for (i = 0; i < rolesArray.length; i++) {
        finalString += ', ' + rolesArray[i]
      }
      finalString = finalString.substring(1, finalString.length)
      return finalString
    },
    getImgUrl (pic) {
      // return require('../assets/' + pic)
      return require('' + pic)
    },
    showModalFunc (item) {
      this.itemSend = item
      this.showModal = true
    }
  },
  created: function () {
    this.getPersons()
    EventBus.$on('tecno', (array) => {
      this.optionsTech = []
      this.optionsRoles = []
      this.optionsName = {}
      this.pageCounter = 0
      this.nameInput = ''
      for (var i = 0; i < array.length; i++) {
        this.optionsTech.push(array[i].name.toString())
      }
      this.getPersons()
      if (array.length !== 0) {
        this.showInfoResultFilters = true
      } else {
        this.showInfoResultFilters = false
      }
    })
    EventBus.$on('role', (array) => {
      this.optionsTech = []
      this.optionsRoles = []
      this.optionsName = {}
      this.pageCounter = 0
      this.nameInput = ''
      for (var i = 0; i < array.length; i++) {
        this.optionsRoles.push(array[i].name.toString())
      }
      this.getPersons()
      if (array.length !== 0) {
        this.showInfoResultFilters = true
      } else {
        this.showInfoResultFilters = false
      }
    })
    EventBus.$on('nom', (array) => {
      this.optionsTech = []
      this.optionsRoles = {}
      this.optionsName = {}
      this.pageCounter = 0
      this.nameInput = ''
      for (var i = 0; i < array.length; i++) {
        this.optionsName = array
      }
      this.getPersons()
      if (array.length !== 0) {
        this.showInfoResultFilters = true
      } else {
        this.showInfoResultFilters = false
      }
    })
    this.getPersonsTechnologiesList()
    this.getPersonsRolesList()
    this.getPersonsNamesList()
  },
  components: {
    VueTabs,
    VTab,
    Modal,
    Multi
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only Quicksand-->
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto');
.body-container{
    padding: 2rem;
    font-family: 'Roboto', sans-serif;
    background-color: var(--color-white);
    margin-top: 75px;
}
.main-container{
  display: grid;
  grid-template-columns: 10% 80% 10%;
  grid-template-rows: 100%;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  justify-items: left;
  justify-content: stretch;
  align-content: stretch;
}
.list-persons{
    width: 100%;
}
.cont-filters{
  /* margin-left: 2.5rem; */
}
.view-more{
  color: var(--color-link);
}
.title-card{
  font-weight: bold;
}
.view-more:hover{
  cursor: pointer;
  text-decoration-line: underline;
}
.input-text{
  overflow: visible;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  min-height: 40px;
  display: block;
  padding: 8px 40px 0 8px;
  font-size: 14px;
  width: 100%;
}
.number-page{
  display: table-cell;
  text-align: center;
}
.card-img-top{
  margin: 20px;
  height: 150px;
  width: 150px;
  margin: auto;
  margin-top: 1.5rem;
}
.input-label{
  display: inline-block;
  margin-bottom: .5rem;
}

.icon-show-filters{
  height: 1.2rem;
}
.ico-no-items{
  height: 2.5rem;
  margin-right: 10px;
}
.filters-colums{
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: 100%;
  justify-items: left;
  justify-content: stretch;
  align-content: stretch;
  padding: 0.2rem;
}
.prev-page{
  text-align: center;
}
.next-page{
  text-align: center;
}
#show-filters{
  color: var(--color-link);
  padding: 5px 10px ;
  border: 1px solid var(--color-link);
  border-radius: 5px;
}
#show-filters:hover{
  color: var(--color-link);
  cursor: pointer;
}
.w-90{
  width: 90%;
  margin-bottom: 10px;
}
ul{
  display: grid;
  grid-template-columns: 30% 30% 30%;
  grid-template-rows: 100%;
  grid-column-gap: 2rem;
  grid-row-gap: 4rem;
  justify-items: left;
  justify-content: stretch;
  align-content: stretch;
  margin-top: 25px;
}
li{
    width: 100%;
    list-style: none;
}
.size-img{
  /* max-height: 27vh;
  max-width: 82vh; */
}
.tittle-card{
  font-weight: bold;
}

.short-desc-card{
  width:100%;
  height:20px;
  text-overflow:ellipsis;
  white-space:nowrap;
  overflow:hidden;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  transition: all 0.5s;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
/* .short-desc-card:hover{
  width:100%;
  height:100px;
  text-overflow:inherit;
  white-space:inherit;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  transition: all 0.5s;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  text-align: left;
} */
/* .prevPage{
  display: table-cell;
  text-align: left;
}
.prevPage label{
  color: var(--color-link)
}
.prevPage label:hover{
  text-decoration: underline;
  cursor: pointer;
}
.nextPage{
  display: table-cell;
  text-align: right;
}
.nextPage label{
  color: var(--color-link)
}
.nextPage label:hover{
  text-decoration: underline;
  cursor: pointer;
}
.paginationBar{
  padding: 10px;
  display: table;
  width: 100%
} */
/* .card:hover .short-desc-card{
    width:100%;
    height:100px;
    text-overflow:inherit;
    white-space:inherit;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    transition: all 0.5s;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
} */

.card:hover{
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  transition: all 0.5s;
  -webkit-box-shadow: 0px 0px 10px 3px rgba(0,0,0,0.25);
  -moz-box-shadow: 0px 0px 10px 3px rgba(0,0,0,0.25);
  box-shadow: 0px 0px 10px 3px rgba(0,0,0,0.25);
  cursor: pointer;
}
.card{
  text-align: center;
  border-radius: 10px;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  transition: all 0.5s;
  -webkit-box-shadow: 0px 0px 10px 3px white;
  -moz-box-shadow: 0px 0px 10px 3px white;
  box-shadow: 0px 0px 10px 3px white;
}
h1{
  text-align: center;
}
.view-more{
  color: var(--color-link);
}
.view-more:hover{
  cursor: pointer;
}
#icon-tittle{
  height: 1rem;
}
#icon-pages{
  height: 1.2rem;
}
.boton-page{
  color: var(--color-link);
  padding: 5px 10px ;
  border: 1px solid var(--color-link);
  border-radius: 5px;
}
.boton-page:hover{
  color: var(--color-link);
  cursor: pointer;
}
.numbers-pages{
  color: black;
}
.paginationBar{
  display: grid;
  grid-template-columns: 30% 30% 30%;
  grid-template-rows: 100%;
  grid-column-gap: 2rem;
  grid-row-gap: 4rem;
  justify-items: left;
  -ms-flex-pack: stretch;
  justify-content: stretch;
  -ms-flex-line-pack: stretch;
  align-content: stretch;
  margin-top: 3rem;
}

.no-items{
  margin-left: 2.5rem;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
  justify-items: center;
  align-items: center;
  justify-content: stretch;
  align-content: stretch;
}
.ico-no-items{
  height: 2.5rem;
}
.text-no-items{
  font-size: 1.8rem;
}
.no-padding{
  padding-left: 0px;
}
.info-filters-result{
  color: var(--color-letter);
  font-size: 1.2rem;
}

@media screen and (max-width: 675px) {
  ul{
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 100%;
    grid-column-gap: 2rem;
    grid-row-gap: 4rem;
    justify-items: left;
    justify-content: stretch;
    align-content: stretch;
    margin-top: 3rem;
  }
}
</style>
