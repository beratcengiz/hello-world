<template>
  <div class="wallpaper-register">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>

.wallpaper-register {
  background: url('./assets/pexels-chevanon-photography-324028.jpg') no-repeat center center;
  background-size: cover;
  position: absolute;
  background-color: gray;
  width: 100%;
  height: 100vh;
  z-index: -1;
}
@media only screen and (max-width: 900px) {
    .wallpaper-register{
        height: 1400px;
        /* veya diğer uygun boyutlama seçenekleri */
    }

}

</style>
