<template>
    <Menu v-if="object !== null"/>
    <div class="container-fluid" v-if="object !== null">
        <div class="row">
            <div class="col-md-12">
                <Table/>
            </div>
        </div>
    </div>
    </template>
    <script setup>
    import router from '../router/router'
    import Menu from '../components/MenuComponent.vue'
    import Table from '../components/TableComponent.vue'
    import 'primeicons/primeicons.css'
    var object = JSON.parse(localStorage.getItem('token'));
    console.log(object)
    if(!object) {
        router.push('/')
    }
    </script>