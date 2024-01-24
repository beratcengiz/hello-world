<template>
  <div class="container-fluid wallpaper-register">
    <div class="row">
      <div class="col-md-5">
        <div class="row">
          <div class="col-md-12">
            <div class="card mt-3">
              <div class="card-body">Avaşin Cafe</div>
            </div>
          </div>
          <div class="col-md-6" v-for="(item,index) in 6" :key="item">
            <div class="card mt-3">
              <div class="card-body">Cart {{ index + 1 }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue';
const products = ref([]);
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
  height: 1200px;
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
