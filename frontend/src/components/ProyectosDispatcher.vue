<template>
    <div class="test-class">
        <transition name="modal"><router-view/></transition>
    </div>
</template>

<script>
export default {
  name: 'ProyectosDispatcher'
}
</script>

<style>
.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
    transition: opacity .3s ease;
    overflow-y: auto;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
