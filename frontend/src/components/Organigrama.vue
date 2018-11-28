<template>
    <div class="body-container">
      <tree class = "tree_style" :data = personsNames[0] :node-text = nodeText :type = type :layoutType = layoutType :zoomable = zoomable :radius = radius>
      </tree>
    </div>
</template>

<script>

import axios from 'axios'
import {tree} from 'vued3tree'
import JSON from '../json/organigrama.json'

export default {
  data () {
    return {
      personsNames: JSON,
      type: 'tree',
      layoutType: 'euclidean',
      duration: 750,
      Marginx: 20,
      Marginy: 20,
      radius: 5,
      nodeText: 'name',
      currentNode: null,
      zoomable: true,
      isLoading: false,
      events: [],
      json: JSON,

      tree: {
        name: 'index',
        children: [
          {
            name: 'post1',
            children:
            [
              {name: 'subject1'},
              {name: 'subject2'}
            ]
          },
          {
            name: 'post2',
            children: [
              {name: 'subject3'},
              {name: 'subject4'}
            ]
          }
        ]
      }
    }
  },
  methods: {
    getPersonsNames () {
      const path = this.$config.varHttp + this.$config.apiAmazon + this.$config.apiPersonsOrganigram
      axios.get(path)
        .then(response => {
          this.personsNames = response.data.result
          console.log(this.personsNames)
        }).catch(error => {
          console.log(error)
        })
    }
  },
  created: function () {
    this.getPersonsNames()
  },
  components: {tree}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.tree_style{
    height: 30rem;
    width: 100%;
    border-radius: 5px;
    border: 1px solid #b1afaf;
    background: #e9e9e966;
}

.body-container{
    padding: 2rem;
    font-family: 'Roboto', sans-serif;
    background-color: var(--color-white);
    margin-top: 75px;
}

h1{
    text-align: center;
}

</style>
