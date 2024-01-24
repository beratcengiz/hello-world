<template>
  <div class="container-fluid wallpaper-register">
    <div class="row">
      <div class="col-md-12">denemeler</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
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
