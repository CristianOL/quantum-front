<template>
  <div>
    <div class="fondo">
      <div class="title-text">
            <h1 class="main-title">
              Bienvenido a <strong>Next Technologies</strong>
            </h1>
      </div>
    </div>
    <div class="body-container">
      <div></div>
      <div>
        <div class="container-explain">
          <div class="">
            <h2>Una breve explicacion de lo que somos...</h2>
          </div>
          <div class="description-container">
            <div>
              <strong>BBVA Next Technologies</strong> es el mejor lugar en el que trabajar para los que quieren transformar el mundo a través de la tecnología. Generamos impacto real. Trabajamos en un proyecto muy sólido. En Next pensamos más allá de lo convencional y somos un equipo en el que las personas son lo primero.
            </div>
          </div>
        </div>

        <div class="container-explain">
          <div class="">
            <h2>Nuestros ideales</h2>
          </div>
          <div class="description-container description-container-more">
            <img class="img-desc-small" src="../assets/proyeccion.svg" alt="">
            <div>
              Formarás parte de un proyecto muy sólido y tu trabajo tendrá impacto real en el banco y empresas líderes. Facilitaremos tu asistencia a eventos y congresos para darte visibilidad.
            </div>
          </div>
          <div class="description-container description-container-more">
            <img class="img-desc-small" src="../assets/labs.svg" alt="">
            <div>
              En nuestros Labs explorarás nuevas formas de impactar a través de la tecnología sin que te frene el miedo al error. Somos open, contribuimos en la comunidad y nos ponemos el listón muy alto.
            </div>
          </div>
          <div class="description-container description-container-more">
            <img class="img-desc-small" src="../assets/equipo.svg" alt="">
            <div>
              People First. En Next, valoramos mucho el equipo, la buena relación entre nosotros, aprenderas con tus compañeros.
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      msg: 'Bienvenido a Next Technologies'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-title {
  font-weight: normal;
  color: #fff;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  transition: all 0.5s;
}
.main-title:hover{
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  transition: all 0.5s;
  transform: scale(1.5);
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.fondo{
  background-image: url("../assets/blue-bright-clouds-417122.jpg");
  min-height: 15rem;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  justify-items: center;
  align-items: center;
  justify-content: stretch;
  align-content: stretch;
  margin-top: 74px;
}
.body-container{
  display: grid;
  grid-template-columns: 10% 80% 10%;
  grid-template-rows: 100%;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  justify-items: left;
  align-items: left;
  justify-content: stretch;
  align-content: stretch;
  margin-top: 75px;
}
.container-explain{
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  justify-items: left;
  align-items: left;
  justify-content: stretch;
  align-content: stretch;
  margin-bottom: 2.5rem;
}
h2{
  font-size: 1.4rem;
  font-weight: bold;
}
.description-container{
  padding-left: 1rem;
  padding-right: 10rem;
  margin-top: 1rem;
}
.description-container-more{
  display: grid;
  grid-template-columns: 10% 90%;
  grid-template-rows: 100%;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  justify-items: left;
  align-items: left;
  justify-content: stretch;
  align-content: stretch;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
}
.img-desc-small{
  max-width: 60%;
}

@media screen and (max-width: 675px) {
  .description-container{
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 1rem;
  }
  .main-title{
    padding-left: 2.5rem;
  }
}
</style>
