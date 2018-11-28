<template>
    <!-- template for the modal component -->
  <transition name="modal">
      <div class="modal-outter">
        <div class="modal-mask" @click="$emit('close')">
        </div>
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="super-header">
                    <div>
                        <img class="img-close" @click="$emit('close')" src="../assets/cerrar.svg" alt="close">
                    </div>
                </div>
                <div class="header">
                    <div class="img-project">
                        <img class="avatar" :src="item.photo" v-bind:alt="item.photo">
                    </div>
                    <div class="tittle">
                        <h2>{{item.name}}</h2>
                    </div>
                    <div class="role">
                        <p>{{this.rolesString}}</p>
                    </div>
                </div>
                <div class="body">
                    <div class="container">
                        <div class="container-row">
                            <h3><img id="icon-tittle" src="../assets/desc.svg"> Descripcion</h3>
                            <p>{{item.description}}</p>
                        </div>
                    </div>
                    <div class="container-col2">
                        <div class="container-row">
                            <h3><img id="icon-tittle" src="../assets/phone.svg"> Telefono</h3>
                            <p>{{item.phone}}</p>
                        </div>
                        <div class="container-row">
                            <h3><img id="icon-tittle" src="../assets/email.svg"> Email</h3>
                            <p><a href="mailto:email">{{item.email}}</a></p>

                        </div>
                        <!-- <div class="container-row">
                            <h3><img id="icon-tittle" src="../assets/user-men.svg"> Responsable</h3>
                            <p>Antonio Perez Martin -<a href="mailto:email"> antonio@gmail.com </a></p>
                        </div> -->
                    </div>
                    <div class="container">
                        <div class="container-row">
                            <h3><img id="icon-tittle" src="../assets/code.svg"> Tecnologias</h3>
                            <!-- <label style="margin-right:5px;" v-for="tec in item.technologies" :key="tec.technologies">{{tec}}</label> -->
                            <p>{{this.technologiesString}}</p>
                        </div>
                    </div>
                    <!-- <div class="container">
                        <div class="container-row">
                            <h3><img id="icon-tittle" src="../assets/users.svg"> Equipo</h3>
                            <p>Juan Lopez Perez</p>
                            <p v-for="person in arrayP" :key="person._id">
                                {{person.name}}
                            </p>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
      </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: ['item', 'arrayP'],
  mounted () {
    console.log(this.arrayP)
    this.concatenateRoles(this.item.roles)
    this.concatenateTecnologies(this.item.technologies)
  },

  data () {
    return {
      rolesString: '',
      technologiesString: ''
    }
  },
  methods: {
    concatenateRoles (roles) {
      var x
      for (x = 0; x < roles.length; x++) {
        this.rolesString += roles[x]
        if (x < roles.length - 1) {
          this.rolesString += ', '
        }
      }
    },
    concatenateTecnologies (tec) {
      var x
      for (x = 0; x < tec.length; x++) {
        this.technologiesString += tec[x]
        if (x < tec.length - 1) {
          this.technologiesString += ', '
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only Quicksand-->
<style lang="scss" scoped>
.modal-outter {
    display: inline-block;
    vertical-align: top;
    position: fixed;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
}
.modal-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
}
.modal-wrapper {
    display: inline-block;
    vertical-align: top;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .modal-container {
        width: 40rem;
        max-height: 37rem;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        overflow-y: auto;
        p{
            font-size: 0.9rem;
        }
        label{
            font-size: 0.9rem;
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
            .img-close{
                height: 1rem;
            }
            .img-close:hover{
                cursor: pointer;
            }
        }
        .header{
            display: grid;
            grid-template-columns: 100%;
            grid-template-rows: 50% 50%;
            grid-column-gap: 0px;
            grid-row-gap: 0px;
            justify-items: center;
            align-items: center;
            height: 100%;
            .tittle{
                display: grid;
                grid-template-columns: 100%;
                grid-template-rows: 100%;
                align-items: flex-start;
                justify-items: left;
                h2{
                    font-size: 1.5rem;
                }
            }
            .img-project{
                display: grid;
                grid-template-columns: 100%;
                grid-template-rows: 100%;
                align-items: flex-start;
                justify-items: right;
                img{
                    width: 100px;
                    height: 100px;
                    max-width: 100px;
                    max-height: 100px;
                    -webkit-border-radius: 50%;
                    -moz-border-radius: 50%;
                    border-radius: 50%;
                    border: 5px solid rgba(255,255,255,0.5);
                }
            }
        }
        .body{
            .container{
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
                    #icon-tittle{
                        height: 1.5rem;
                    }
                    a{
                        color: var(--color-link);
                    }
                }
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
                    #icon-tittle{
                        height: 1.5rem;
                    }
                }
            }
        }
    }
}

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
    transition: opacity .3s ease;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 100%;
    justify-items: left;
    align-items: flex-start;
    height: 100%;
}
</style>
