<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-5">
        <div class="row">
          <div class="col-md-12">
            <div class="card mt-3">
              <div class="card-body">Avaşin Cafe</div>
            </div>
          </div>
          <div class="col-md-6" v-for="(item, index) in 6" :key="item">
            <div class="card mt-3">
              <div class="card-body">Cart {{ index + 1 }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 mt-3">
        <div class="card">
          <nav  class="d-flex justify-content-center">
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <button style="cursor: pointer;" v-for="(item, index) in items" :key="index" :class="{ 'nav-link': true, 'active': index === 0 }"
                :id="'nav-' + index + '-tab'" data-toggle="tab" :data-target="'#nav-' + index" type="button" role="tab"
                :aria-controls="'nav-' + index" :aria-selected="index === 0">
                {{ item.label }}
              </button>
            </div>
          </nav>
          <!-- <div class="tab-content" id="nav-tabContent">
            <div v-for="(item, index) in items" :key="index" 
              :class="{ 'tab-pane': true, 'fade': true, 'show': index === 0, 'active': index === 0 }" :id="'nav-' + index"
              role="tabpanel" :aria-labelledby="'nav-' + index + '-tab'">
              {{ item.label }} content goes here...
            </div>
          </div> -->
        </div>
        <div class="card mt-3" style="opacity: 0.7;height: 125px;" v-for="(item,index) in 4" :key="index">
          Cart {{ index }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue';
const products = ref([]);
const items = ref([
  {
    label: 'Sıcak İçecekler',
    icon: 'pi pi-home'
  },
  {
    label: 'Soğuk İçecekler',
    icon: 'pi pi-star'
  },
  {
    label: 'Atıştırmalıklar',
    icon: 'pi pi-home'
  },
  {
    label: 'Tatlılar',
    icon: 'pi pi-star'
  },
  {
    label: 'Nargile',
    icon: 'pi pi-star'
  },
  {
    label: "Yemekler",
    icon: 'pi pi-star'
  },
]);
const getProducts = async () => {
  await axios
    .get(
      "https://berat.tostbang.com/api/MealOfDay"
    )
    .then((res) => {
      console.log('res', res)
      products.value = res.data;
    })
    .catch((error) => console.log(error));
};
onMounted(async () => {
  await getProducts();
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wallpaper-register {
  background: url('../assets/pexels-chevanon-photography-324028.jpg') no-repeat center center;
  background-size: cover;
  height: 100px;
  position: absolute;
  background-color: gray;
  width: 100%;
  z-index: -1;
}

h3 {
  margin: 40px 0 0;
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
</style>
