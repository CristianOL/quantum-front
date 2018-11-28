<template>
  <div>
    <div v-if="ismultiple === true">
      <label class="typo__label">{{category}}</label><label v-if="value.length > 0" class="clear-all" @click="clearFilter">Limpiar</label>
      <multiselect @input="dispatchAction" v-model="value" :options="options" :multiple="true" :close-on-select="!ismultiple" :clear-on-select="false" :hide-selected="true" :preserve-search="false" :showNoResults="false" placeholder="" label="name" track-by="name">
        <template slot="tag" slot-scope="props"><span class="custom__tag"><span @click="props.remove(props.option)">{{ props.option.name }}</span><span class="custom__remove" @click="props.remove(props.option)"> ❌</span></span></template>
      </multiselect>
    </div>
    <div v-if="ismultiple === false && busName != 'nom'">
      <label class="typo__label">{{category}}</label>
      <multiselect @input="dispatchAction" v-model="valueMono" :options="options" :custom-label="nameWithLang" :showNoResults="false" placeholder="" label="name" track-by="name">
        <template slot="tag" slot-scope="props"><span class="custom__tag"><span @click="props.remove(props.option)">{{ props.option.name }}</span><span class="custom__remove" @click="props.remove(props.option)"> ❌</span></span></template>
      </multiselect>
    </div>
    <div v-if="ismultiple === false && busName === 'nom'">
      <label class="typo__label">{{category}}</label>
      <multiselect @input="dispatchAction" v-model="valueMono" placeholder="" label="name" track-by="name" :showNoResults="false" :options="options" :option-height="104" :custom-label="customLabel" :show-labels="false">
        <template slot="singleLabel" slot-scope="props"><span class="option__desc"><span class="option__title">{{ props.option.name }}</span></span></template>
        <template slot="option" slot-scope="props">
          <div class="option__desc"><span class="option__title">{{ props.option.name }}</span></div>
        </template>
      </multiselect>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { EventBus } from './event-bus'

export default {
  name: 'Multi',
  props: ['options', 'category', 'busName', 'ismultiple'],
  components: { Multiselect },
  data () {
    return {
      selected: null,
      value: [],
      valueMono: {}
    }
  },
  methods: {
    dispatchAction () {
      if (this.$props.ismultiple === true) {
        let arraySend = this.$data.value
        EventBus.$emit(this.$props.busName, arraySend)
      } else if (this.$props.ismultiple === false) {
        let arraySend = []
        arraySend.push(this.$data.valueMono)
        EventBus.$emit(this.$props.busName, arraySend)
      }
    },
    clearFilter () {
      this.$data.value = []
      let arraySend = this.$data.value
      EventBus.$emit(this.$props.busName, arraySend)
    },
    customLabel ({ name, workplace }) {
      return `${name} – ${workplace}`
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>

<style lang="scss">
.custom__tag{
 background-color: var(--color-backG);
 padding: 3px;
 border-radius: 4px;
 margin: 2px;
 color: var(--color-active);
}
.icon-title{
  height: 1rem;
}
.clear-all{
  float: right;
  padding-right: 2px;
  color:var(--color-link)
}
.clear-all:hover{
  cursor: pointer;
}
.custom__remove{
  color: white
}
.custom__remove:hover{
  cursor: pointer;
}
.multiselect__tags-wrap{
  font-size: 15px;
}

.multiselect__single{
  background: var(--color-backG);
  width: auto;
  min-height: 0px;
  color:var(--color-active);
  padding: 0px 5px;
  // width: auto;
  // background: var(--color-backG);
  // color:var(--color-active);
}

.multiselect__option--highlight{background:var(--color-backG);outline:none;color:var(--color-active)}
.multiselect__option--highlight:after{content:'Press enter';background:var(--color-backG);color:white; opacity: 0.4;}
</style>
