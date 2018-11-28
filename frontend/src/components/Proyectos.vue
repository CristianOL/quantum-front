<template>
  <div class="body-container" >
    <transition name="modal">
      <div id="listado-proyectos">
        <div class="main-container">
            <div></div>
            <div class="list-projects">
              <div class="cont-filters">
                <label id="show-filters" @click="showFiltersFun()">Filtros
                  <img class="icon-show-filters" v-if="showFilters" src="../assets/less.svg">
                  <img class="icon-show-filters" v-if="!showFilters" src="../assets/more.svg">
                </label>
                <div v-show="showFilters" class="filters-colums">
                  <div class="w-90">
                    <!--<Multi :category="'Nombre'" :busName="'nom'" :options="projectsNamesList" :ismultiple="false"></Multi>-->
                    <label class="input-label">Nombre</label>
                    <input v-model="nameInput" placeholder="" v-on:input="onNameInput()" class="input-text">
                  </div>
                  <div class="w-90"></div>
                  <div class="w-90"></div>
                  <div class="w-90">
                    <Multi :category="'Tecnologias'" :busName="'tecno'" :options="projectsTechnologiesList" :ismultiple="true"></Multi>
                  </div>
                  <div class="w-90">
                    <Multi :category="'Categoria'" :busName="'categ'" :options="projectsCategoriesList" :ismultiple="false"></Multi>
                  </div>
                  <div class="w-90">
                    <Multi :category="'Lugar'" :busName="'lugar'" :options="projectsWorkplacesList" :ismultiple="false"></Multi>
                  </div>
                </div>
              </div>
              <div v-if="showInfoResultFilters">
                <label class="info-filters-result"> <img class="icon-show-filters" src="../assets/lupa.svg">Estos son los resultados obtenidos de tu filtro</label>
              </div>
              <ul class="no-padding">
                <li v-for="item in orderBy(projectsJSON, 'name')" :key="item._id">
                  <router-link class="disable-link" :to="{ name: 'DetalleProyecto', params: { id: item._id } , props: {item:item}}">
                    <div class="card" style="width: 100%;">
                      <img class="card-img-top size-img" :src="item.photo" v-bind:alt="item.photo">
                      <div class="card-body">
                        <p class="card-text title-card">{{item.name}}</p>
                        <p class="card-text short-desc-card">{{item.description}}</p>
                        <p><img class="icon-title" src="../assets/place.svg">{{item.workplace}}</p>
                        <router-link class="view-more" active-class="link-active" :to="{ name: 'DetalleProyecto', params: { id: item._id } , props: {item:item}}"> Ver más</router-link>
                      </div>
                    </div>
                  </router-link>
                </li>
              </ul>
              <div class="no-items" v-if=" Object.keys(projectsJSON).length === 0">
                <label class="text-no-items"> <img src="../assets/not-found.svg" class="ico-no-items" alt="not found">No se han encontrado proyectos para su busqueda</label>
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
      </div>
    </div>
    </transition>
  </div>
</template>

<script>

// import Multiselect from 'vue-multiselect'

import axios from 'axios'
import MY_JSON from '../json/proyectos.json'
import MY_JSON_PERSONAS from '../json/personas.json'
// import MY_JSON_TECH from '../json/projectsTechnologiesListJSON.json'
import Multi from '@/components/Multi.vue'
import { EventBus } from './event-bus.js'

export default {
  name: 'Proyectos',
  data () {
    return {
      user: {name: 'Fran', age: 24},
      projectsJSON: JSON,
      personsJSON: JSON,
      projectsTechnologiesList: [],
      projectsCategoriesList: [],
      projectsWorkplacesList: [],
      projectsNamesList: [],
      msg: 'Welcome to Your Vue.js App',
      projectsJson_file: MY_JSON,
      personJson_file: MY_JSON_PERSONAS,
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
      optionsCat: {},
      optionsPlace: {},
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
      this.optionsCat = {}
      this.optionsPlace = {}
      this.optionsName = {}
      this.pageCounter = 0
      this.getProjects()
    },
    nextPage () {
      this.pageCounter = this.pageCounter + 1
      this.getProjects()
    },

    prevPage () {
      this.pageCounter = this.pageCounter - 1
      this.getProjects()
    },

    getProjects () {
      console.log(this.pageCounter)
      this.path = this.$config.varHttp + this.$config.apiAmazon + this.$config.apiProjects
      this.body = {page: this.pageCounter}
      if (this.optionsTech.length > 0) {
        this.path = this.$config.varHttp + this.$config.apiAmazon + this.$config.apiProjectsTechnologies
        this.body = {page: this.pageCounter, request: this.optionsTech}
      } else if (this.optionsCat.length > 0) {
        this.path = this.$config.varHttp + this.$config.apiAmazon + this.$config.apiCategories
        this.body = {page: this.pageCounter, request: this.optionsCat[0].name}
      } else if (this.optionsPlace.length > 0) {
        this.path = this.$config.varHttp + this.$config.apiAmazon + this.$config.apiWorkplaces
        this.body = {page: this.pageCounter, request: this.optionsPlace[0].name}
      } else if (this.optionsName.length > 0) {
        this.path = this.$config.varHttp + this.$config.apiAmazon + this.$config.apiProjectsNames
        this.body = {page: this.pageCounter, request: this.optionsName[0].name}
      } else if (this.nameInput.length > 0) {
        this.path = this.$config.varHttp + this.$config.apiAmazon + this.$config.apiProjectsNames
        this.body = {page: this.pageCounter, request: this.nameInput}
      }
      axios.post(this.path, this.body)
        .then(response => {
          this.projectsJSON = response.data.result
          this.hasNextPage = response.data.hasNextPage
          this.hasPrevPage = response.data.hasPrevPage
          this.numberOfPages = response.data.numberOfPages
        }).catch(error => {
          console.log(error)
        })
    },

    getProjectsTechnologiesList () {
      const path = this.$config.varHttp + this.$config.apiAmazon + this.$config.apiProjectsTechnologies
      axios.get(path)
        .then(response => {
          this.projectsTechnologiesList = response.data.result
        }).catch(error => {
          console.log(error)
        })
    },
    getProjectsCategoriesList () {
      const path = this.$config.varHttp + this.$config.apiAmazon + this.$config.apiCategories
      axios.get(path)
        .then(response => {
          this.projectsCategoriesList = response.data.result
        }).catch(error => {
          console.log(error)
        })
    },
    getProjectsWorkplacesList () {
      const path = this.$config.varHttp + this.$config.apiAmazon + this.$config.apiWorkplaces
      axios.get(path)
        .then(response => {
          this.projectsWorkplacesList = response.data.result
        }).catch(error => {
          console.log(error)
        })
    },
    getProjectsNamesList () {
      const path = this.$config.varHttp + this.$config.apiAmazon + this.$config.apiProjectsNames
      axios.get(path)
        .then(response => {
          this.projectsNamesList = response.data.result
          console.log(this.projectsNamesList)
        }).catch(error => {
          console.log(error)
        })
    },

    getImgUrl (pic) {
      return require('' + pic)
    },
    showModalFunc (item) {
      this.arrayPersons = this.postPersons(item.person_id)
      this.itemSend = item
    },
    sendItem (item) {
      this.itemSend = item
      this.showDetail(true)
    },
    showDetail (show) {
      this.showDetailComponent = show
    },
    showFiltersFun () {
      this.showFilters = !this.showFilters
    }
  },

  created: function () {
    this.getProjects()
    EventBus.$on('eventListProject', act => {
      this.showDetailComponent = false
    })
    EventBus.$on('tecno', (array) => {
      this.optionsTech = []
      this.optionsCat = {}
      this.optionsPlace = {}
      this.optionsName = {}
      this.pageCounter = 0
      this.nameInput = ''
      for (var i = 0; i < array.length; i++) {
        this.optionsTech.push(array[i].name.toString())
      }
      this.getProjects()
      if (array.length !== 0) {
        this.showInfoResultFilters = true
      } else {
        this.showInfoResultFilters = false
      }
    })
    EventBus.$on('categ', (array) => {
      this.optionsTech = []
      this.optionsCat = {}
      this.optionsPlace = {}
      this.optionsName = {}
      this.pageCounter = 0
      this.nameInput = ''
      for (var i = 0; i < array.length; i++) {
        this.optionsCat = array
      }
      this.getProjects()
      if (array.length !== 0) {
        this.showInfoResultFilters = true
      } else {
        this.showInfoResultFilters = false
      }
    })
    EventBus.$on('lugar', (array) => {
      this.optionsTech = []
      this.optionsCat = {}
      this.optionsPlace = {}
      this.optionsName = {}
      this.pageCounter = 0
      this.nameInput = ''
      for (var i = 0; i < array.length; i++) {
        this.optionsPlace = array
      }
      this.getProjects()
      if (array.length !== 0) {
        this.showInfoResultFilters = true
      } else {
        this.showInfoResultFilters = false
      }
    })
    EventBus.$on('nom', (array) => {
      this.optionsTech = []
      this.optionsCat = {}
      this.optionsPlace = {}
      this.optionsName = {}
      this.pageCounter = 0
      this.nameInput = ''
      for (var i = 0; i < array.length; i++) {
        this.optionsName = array
      }
      this.getProjects()
      if (array.length !== 0) {
        this.showInfoResultFilters = true
      } else {
        this.showInfoResultFilters = false
      }
    })
    this.getProjectsTechnologiesList()
    this.getProjectsCategoriesList()
    this.getProjectsWorkplacesList()
    this.getProjectsNamesList()
  },
  components: {
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
.list-projects{
    width: 100%;
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

.input-label{
  display: inline-block;
  margin-bottom: .5rem;
}

.card-img-top{
  margin: 20px;
  height: 150px;
  width: 150px;
  margin: auto;
  margin-top: 1.5rem;
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
.title-card{
  font-weight: bold;
}

.disable-link{
  text-decoration: none;
  color: black;
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
#icon-pages{
  height: 1.2rem;
}
.prev-page{
  text-align: center;
}
.next-page{
  text-align: center;
}
/* .prev-page{
  display: table-cell;
  text-align: left;
}
.prev-page label{
  color: var(--color-link)
}
.prev-page label:hover{
  text-decoration: underline;
  cursor: pointer;
}
.next-page{
  display: table-cell;
  text-align: right;
}
.next-page label{
  color: var(--color-link)
}
.next-page label:hover{
  text-decoration: underline;
  cursor: pointer;
} */
.number-page{
  display: table-cell;
  text-align: center;
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
.card:hover .short-desc-card{
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
}

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
.icon-title{
  height: 1rem;
}
.returnProyects{
  padding-left:9rem;
  color: var(--color-link);
  font-size: 1.2rem;
  padding-bottom: 0px;
  margin-bottom: 0px;
  width: 18%;
}
.returnProyects:hover{
  text-decoration: underline;
  cursor: pointer;
}
#icon-return{
  height: 1.2rem;
}
.icon-show-filters{
   height: 1.2rem;
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
.cont-filters{
  /* margin-left: 2.5rem; */
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
  margin-right: 10px;
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
    padding-left: 0rem !important;
    grid-template-columns: 100%;
    grid-template-rows: 100%;
    grid-column-gap: 2rem;
    grid-row-gap: 4rem;
    justify-items: left;
    justify-content: stretch;
    align-content: stretch;
    margin-top: 3rem;
  }
  .filters-colums{
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 100%;
    justify-items: left;
    justify-content: stretch;
    align-content: stretch;
    padding: 0.2rem;
  }
}
</style>
