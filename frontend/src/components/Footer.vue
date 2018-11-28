<template>
    <div class="footer-content">
        <div class="col-footer">
            <div class="tittle-col">
                <h3>{{address}}</h3>
            </div>
            <div class="content-col" >
                <p>MADRID</p>
                <p>Avda. de Burgos 16D</p>
                <p>28036 Madrid [España]</p>
            </div>

        </div>
        <div class="col-footer">
            <div class="tittle-col">
                <h3>{{contactUs}}</h3>
            </div>
            <div class="content-col">
                <a class="link-email" href=”#”>hablemos@beeva.com</a>
            </div>
        </div>
        <div class="col-footer">
            <div class="tittle-col">
                <h3>{{rrss}}</h3>
            </div>
            <div class="conent-col">
                <a target="_blank" href="https://es-es.facebook.com/somosBEEVA"><img src="../assets/facebook-ico.svg" alt="Facebook"></a>
                <a target="_blank" href="https://twitter.com/@BBVANext"><img src="../assets/twitter-ico.svg" alt="Twitter"></a>
                <a target="_blank" href="https://www.linkedin.com/company/bbva-next-technologies"><img src="../assets/linkedin-ico.svg" alt="Linkedin"></a>
                <a target="_blank" href="https://www.youtube.com/user/BEEVAes"><img src="../assets/youtube-ico.svg" alt="Youtube"></a>
                <a target="_blank" href="https://plus.google.com/+Beeva"><img src="../assets/google-plus-ico.svg" alt="GooglePlus"></a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      address: 'Dirección',
      contactUs: 'Hablemos',
      rrss: 'RRSS'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only Quicksand-->
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto');

.footer-content{
  background-color: var(--color-backG);
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33%;
  grid-template-rows: 100%;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  justify-items: left;
  justify-content: stretch;
  align-content: stretch;
  padding: 2rem;
  font-family: 'Roboto', sans-serif;
}

.col-footer{
  color: var(--color-letter);
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 30% 70%;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  justify-items: left;
  justify-content: stretch;
  align-content: stretch;
  width: 100%;
}

.tittle-col{
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  justify-items: left;
  align-items: center;
  justify-content: stretch;
  align-content: stretch;
  padding: 0.2rem;
}
.content-col{
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  justify-items: left;
  align-items: flex-start;
  justify-content: stretch;
  align-content: stretch;
  padding: 0.5rem;
}
p{
    margin: 5px 0px;
}

h3{
  font-size: 1rem;
  color: var(--color-white);
}
img{
    height: 2rem;
}

.link-email{
    color: var(--color-letter);
}
.link-email:hover{
    color: var(--color-white);
}

@media screen and (max-width: 675px) {
    .footer-content{
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: auto;
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        justify-items: left;
        justify-content: stretch;
        align-content: stretch;
        padding: 2rem;
        font-family: 'Roboto', sans-serif;
        }
}
</style>
