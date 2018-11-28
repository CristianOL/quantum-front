import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Proyectos from '@/components/Proyectos'
import Organigrama from '@/components/Organigrama'
import Personas from '@/components/Personas'
import DetalleProyecto from '@/components/DetalleProyecto'
import ProyectosDispatcher from '@/components/ProyectosDispatcher'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index
    },
    {
      path: '/proyectos',
      component: ProyectosDispatcher,
      children: [
        {
          name: 'Proyectos',
          path: '/',
          component: Proyectos
        },
        {
          name: 'DetalleProyecto',
          path: 'detalle/:id',
          props: { item: {} },
          component: DetalleProyecto
        }
      ]
    },
    {
      path: '/organigrama',
      name: 'Organigrama',
      component: Organigrama
    },
    {
      path: '/personas',
      name: 'Personas',
      component: Personas
    }
  ]
})
