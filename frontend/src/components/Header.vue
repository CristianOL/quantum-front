<template>
<div>
  <div class="header-container">
    <div class="tittle-container">
      <div>
        <router-link class="tittle-link" :to=' {name:"home"} '>
        <img id="icon-class" src="../assets/logo-white.svg">
        <label id="especial-q">Q</label>uantum
        </router-link>
      </div>
      <div @click="showMenuBoots" style="float:right;" class="menu-hambur">
        <img id="icon-menu" src="../assets/menu.svg">
      </div>
    </div>
    <div class="navMenu-container">
        <ul class="list-menu">
          <li>
            <router-link class="nav-link" active-class="link-active" :to="{ name: 'Proyectos' }"> Proyectos</router-link>
            <!-- <a href="">Proyectos</a> -->
          </li>
          <li>
            <router-link class="nav-link" active-class="link-active" :to="{ name: 'Organigrama' }">Organigrama</router-link>
            <!-- <a href="">Jerarquia</a> -->
          </li>
          <li>
            <router-link class="nav-link" active-class="link-active" :to="{ name: 'Personas' }">Personas</router-link>
            <!-- <a href="">Personas</a> -->
          </li>
        </ul>
    </div>
    <div @click="menuBoots = false" v-if="menuBoots" class="menu-desplegable">
      <ul class="list-menu-boot">
        <li>
          <router-link class="nav-link" active-class="link-active" :to="{ name: 'Proyectos' }"> Proyectos</router-link>
          <!-- <a href="">Proyectos</a> -->
        </li>
        <li>
          <router-link class="nav-link" active-class="link-active" :to="{ name: 'Organigrama' }">Organigrama</router-link>
          <!-- <a href="">Jerarquia</a> -->
        </li>
        <li>
          <router-link class="nav-link" active-class="link-active" :to="{ name: 'Personas' }">Personas</router-link>
          <!-- <a href="">Personas</a> -->
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'Header',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      menuBoots: false
    }
  },
  methods: {
    showMenuBoots () {
      this.menuBoots = !this.menuBoots
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only Quicksand-->
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto');

.header-container{
  background-color: var(--color-backG);
  display: grid;
  grid-template-columns: 30% 70%;
  grid-template-rows: 100%;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  align-items: center;
  justify-content: stretch;
  align-content: stretch;
  min-height: 74px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
}
 img{
    height: 3rem;
}
.tittle-container{
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 100%;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    justify-items: left;
    align-items: center;
    justify-content: stretch;
    align-content: stretch;
    margin: 0px 10px;
}
#icon-class{
  margin-top: 6px;
}
.navMenu-container{
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 100%;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    justify-items: right;
    font-family: 'Roboto', sans-serif;
    align-items: center;
    height: 100%;
    margin: 0px 10px;
    /*  justify-content: stretch;
    align-content: stretch; */
}
li{
  list-style: none;
  margin: 0px;
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  justify-items: center;
  align-items: center;
}
.tittle-link{
  color: var(--color-white);
  font-size: 200%;
  text-decoration: none;
  display: inline-flex;
}
.nav-link{
  text-decoration: none;
  color: var(--color-letter);
  margin: 0rem 1.5rem;
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  justify-items: center;
  align-items: center;
  transition: all .2s ease-in-out;
  border-bottom: 5px solid transparent;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}
.nav-link:hover{
  text-decoration: none;
  color: var(--color-white);
}
.list-menu{
  display: grid;
  grid-template-columns: 33.3% 33.3% 33.3%;
  grid-template-rows: 100%;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  justify-items: center;
  align-items: center;
  margin: 0px;
  padding: 0px;
  height: 100%;
}
.link-active{
  color: var(--color-active);
  border-bottom-color: var(--color-active);
}
#especial-q{
  color: var(--color-active);
}
.menu-hambur{
  display: none;
}
.menu-desplegable{
  display: none;
}

@media (max-width: 675px) {
  .header-container{
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 100%;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    align-items: center;
    justify-items: center;
    justify-content: stretch;
    align-content: stretch;
    padding-top: 0.5rem;
  }
  .tittle-container{
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 100%;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    justify-items: left;
    align-items: left;
    justify-content: stretch;
    align-content: stretch;
    margin-top: 5px;
    width: 100%;
  }
  .navMenu-container{
    display: none;
  }
  .nav-link{
    text-decoration: none;
    color: var(--color-letter);
    height: 100%;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 100%;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    justify-items: center;
    align-items: center;
    transition: all .2s ease-in-out;
    border-left: 10px solid transparent;
    border-bottom: 0px;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    margin: 0rem 1rem;
  }
  .link-active{
    color: var(--color-active);
    border-left-color: var(--color-active);
    border-bottom: 0px;
    background: var(--color-back2);
  }
  .menu-hambur{
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 100%;
    justify-items: right;
    align-items: center;
    justify-content: stretch;
    align-content: stretch;
    width: 100%;
    height: 100%;
    padding-right: 0.6rem;
    padding-bottom: 0.5rem;
    img{
      height: 2rem;
    }
  }
  .menu-desplegable{
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 100%;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    justify-items: center;
    align-items: center;
    justify-content: stretch;
    align-content: stretch;
    width: 100%;
    ul{
      padding-left: 0px;
      width: 100%;
      li{
        width: 100%;
        a{
          width: 100%;
        }
      }
    }
  }
}
</style>
