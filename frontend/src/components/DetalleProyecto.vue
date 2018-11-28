<template>
    <div class="modal-container">
                <div class="header">
                    <div class="title">
                        <h2 class="project-section">{{item.name}} &nbsp;<label class="project-category">{{item.category}}</label></h2>
                    </div>
                    <div class="img-project">
                        <img :src="item.photo" v-bind:alt="item.photo">
                    </div>
                </div>
                <div class="body">
                    <div class="container-col1">
                        <div class="container-row">
                            <h3><img id="icon-title" src="../assets/desc.svg"> Descripcion</h3>
                            <p>{{item.description}}</p>
                        </div>
                    </div>
                    <div class="container-col2">
                        <div class="container-row">
                            <h3><img id="icon-title" src="../assets/code.svg"> Tecnologias</h3>
                            <li style="margin-right:5px;" v-for="tec in item.technologies" :key="tec.technologies">
                                {{tec}}
                            </li>
                        </div>
                        <div class="container-row">
                            <h3><img id="icon-title" src="../assets/users.svg"> Equipo</h3>
                            <a class="personDetail" v-for="person in orderBy(personsJSON, '_id')" :key="person._id"  @click="sendPerson(person)">
                                <li>{{person.name}}&nbsp;
                                    <label v-if="isManager(person)">&nbsp;(Responsable)</label>
                                </li>
                            </a>
                        </div>

                    </div>
                    <div class="container-col2">
                        <div class="container-row">
                            <h3><img id="icon-title" src="../assets/place.svg"> Lugar</h3>
                            <p>{{item.workplace}}</p>
                        </div>
                    </div>
                    <div>
                        <div class="container-row">
                            <div v-if="item.workplace=='Av. Burgos'" class="iframe-map"><iframe width="100%" height="400" src="https://maps.google.com/maps?width=100%&height=600&hl=es&q=Avenida%20de%20burgos%2C%2016D+(Blue%20Indico)&ie=UTF8&t=&z=17&iwloc=B&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"><a href="https://www.mapsdirections.info/crear-un-mapa-de-google/">Crear Google Map</a> by <a href="https://www.mapsdirections.info/">Mapa España</a></iframe></div><br/>
                            <div v-if="item.workplace=='Las Tablas'" class="iframe-map"><iframe width="100%" height="400" src="https://maps.google.com/maps?width=100%&height=300&hl=es&q=ciudad%20bbva+(Blue%20Indico)&ie=UTF8&t=&z=17&iwloc=B&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"><a href="https://www.mapsdirections.info/crear-un-mapa-de-google/">Crear mapa interactivo</a> by <a href="https://www.mapsdirections.info/">Mapa España</a></iframe></div><br/>
                            <div v-if="item.workplace=='La Vaguada'" class="iframe-map"><iframe width="100%" height="400" src="https://maps.google.com/maps?width=100%&height=300&hl=es&q=avenida%20monforte%20de%20lemos+(Blue%20Indico)&ie=UTF8&t=&z=17&iwloc=B&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"><a href="https://www.mapsdirections.info/crear-un-mapa-de-google/">Crear mapa interactivo</a> by <a href="https://www.mapsdirections.info/">Mapa España</a></iframe></div><br/>
                        </div>
                    </div>
                </div>
                <Modal v-if="showModal" :item="itemPerson" @close="showModal = false"></Modal>
    </div>
</template>

<script>

// import MY_JSON_PERSONAS from '../json/personas.json'
import Modal from '@/components/Modal.vue'
import axios from 'axios'

export default {
  name: 'detalleProyecto',
  props: ['item'],
  components: {
    Modal
  },
  data () {
    return {
      // personJson_file: MY_JSON_PERSONAS,
      personsJSON: JSON,
      showModal: false,
      arrayPersons: [],
      itemPerson: {},
      arrayId: null
    }
  },
  methods: {
    sendPerson (person) {
      this.itemPerson = person
      this.showModal = true
    },
    isManager (person) {
      var isManager = false
      for (var i = 0; i < this.item.manager_id.length; i++) {
        if (person._id === this.item.manager_id[i].toString()) {
          isManager = true
        }
      }
      return isManager
    },
    getProject (id) {
      this.arrayId = Array.from(id.toString())
      const path = this.$config.varHttp + this.$config.apiAmazon + this.$config.apiProjectsById
      axios.post(path, {request: this.arrayId})
        .then(response => {
          this.projectsJSON = response.data.result
          console.log(this.projectsJSON[0])
          this.item = this.projectsJSON[0]
          this.getPersons()
        }).catch(error => {
          console.log(error)
        })
    },

    getPersons () {
      this.arrayPersons = this.item.person_id.map(String)
      const path = this.$config.varHttp + this.$config.apiAmazon + this.$config.apiPersonsById
      axios.post(path, {request: this.arrayPersons})
        .then(response => {
          this.personsJSON = response.data.result
        }).catch(error => {
          console.log(error)
        })
    }
  },
  mounted () {
    this.getProject(this.$route.params.id)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only Quicksand-->
<style lang="scss" scoped>

.project-section{
    color: #1973b8 !important;
}

    .modal-container {
        padding-top: 2rem;
        padding-left: 7rem;
        padding-right: 7rem;
        h2{
            font-size: 5rem;
        }
        .project-category{
            font-size: 1.5rem;
            color: #777777;
        }
        .super-header{
            display: grid;
            grid-template-columns: 100%;
            grid-template-rows: 100%;
            grid-column-gap: 0px;
            grid-row-gap: 0px;
            justify-items: right;
            align-items: center;
            height: 100%;
            padding: 1rem;
            .img-close{
                height: 1rem;
            }
            .img-close:hover{
                cursor: pointer;
            }
        }
        .header{
            display: grid;
            grid-template-columns: 60% 40%;
            grid-template-rows: 100%;
            grid-column-gap: 0px;
            grid-row-gap: 0px;
            align-items: flex-start;
            height: 100%;
            padding: 1rem;
            margin-top: 40px;
            .title{
                display: grid;
                grid-template-columns: 100%;
                grid-template-rows: 100%;
                align-items: flex-start;
                justify-items: left;
                margin: auto;
                margin-left: 0px;
                margin-bottom: 0px;
            }
            .img-project{
                display: grid;
                grid-template-columns: 100%;
                grid-template-rows: 100%;
                align-items: flex-start;
                justify-items: right;
                height: 100%;
                margin: auto;
                margin-right: 1rem;
                img{
                    margin: auto;
                    max-height: 130px;
                    max-width: 130px;
                }
            }
        }
        .body{
            .container-col1{
                border-top: 1px solid #e6e6e6;
                display: grid;
                grid-template-columns: 100%;
                grid-template-rows: 100%;
                grid-column-gap: 0px;
                grid-row-gap: 10px;
                justify-items: left;
                align-items: flex-start;
                height: 100%;
                padding: 1rem;
                .container-row{
                    h3{
                        font-size: 0.88rem;
                        font-weight: bold;
                        color: black;
                    }
                    p{
                        margin-left: 0.5rem;
                    }
                    #icon-title{
                        height: 1.5rem;
                    }
                }
            }
            .iframe-map{
                width: 100%;
                border: 1px solid rgba(0,0,0,.225);
                border-radius: .25rem;
            }
            .container-col2{
                border-top: 1px solid #e6e6e6;
                display: grid;
                grid-template-columns: 50% 50%;
                grid-template-rows: 100%;
                grid-column-gap: 0px;
                grid-row-gap: 10px;
                justify-items: left;
                align-items: flex-start;
                height: 100%;
                padding: 1rem;
                .container-row{
                    h3{
                        font-size: 0.88rem;
                        font-weight: bold;
                        color: black;
                    }
                    p{
                        margin-left: 0.5rem;
                    }
                    #icon-title{
                        height: 1.5rem;
                    }
                    .personDetail:hover{
                        text-decoration: underline;
                        cursor: pointer;
                    }
                }
            }
        }
    }

</style>
