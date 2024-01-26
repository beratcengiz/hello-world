
<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6 " style="margin-top: 18%;">
        <div class="card" v-if="loginControl">
          <div class="card-header d-flex justify-content-center bg-white" style="border:none">
            <img class="logo-img" src="../assets/avasin.png" />
          </div>
          <div class="d-flex justify-content-center">
            <p style="color:green">Giriş Ekranı</p>
          </div>
          <form @submit.prevent="doLogin">
            <div class="form-group">
              <label for="exampleInputEmail1">Kullanıcı Adı</label>
              <input v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                placeholder="kullanıcı adı">
              <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Şifre</label>
              <input v-model="password" type="password" class="form-control" id="exampleInputPassword1"
                placeholder="şifre">
            </div>
            <!-- <div class="form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1">
              <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div> -->
            <button class="btn btn-primary" @click="loginControl = !loginControl">Şifre Değiştir</button>
            <!-- <button class="btn btn-primary" @click="loginControl = false" >Geri Dön</button> -->
            <button class="btn btn-primary ml-2">Giriş Yap</button>
          </form>
        </div>
        <div class="card" v-else>
          <div class="card-header d-flex justify-content-center bg-white" style="border:none">
            <img class="logo-img" src="../assets/avasin.png" />
          </div>
          <div class="d-flex justify-content-center">
            <p style="color:green">Şifre Yenileme Ekranı</p>
          </div>
          <form @submit.prevent="refreshLogin">
            <div class="form-group">
              <label for="exampleInputEmail1">Kullancı Adı</label>
              <input v-model="username1" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                placeholder="kullanıcı adı">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Eski Şifre</label>
              <input v-model="passwordold" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                placeholder="eski şifre">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Yeni Şifre</label>
              <input v-model="passwordnew"  class="form-control" id="exampleInputPassword1"
                placeholder="yeni şifre">
            </div>
            <!-- <div class="form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1">
              <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div> -->
            <button class="btn btn-primary" @click="loginControl = !loginControl">Geri dön</button>
            <button class="btn btn-primary ml-2">Şifre Güncelleme</button>
          </form>
        </div>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import router from '@/router/router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const email = ref('');
const password = ref(null)
const loginControl = ref(true)
const username1 = ref('');
const passwordold = ref(null);
const passwordnew = ref(null)
const doLogin = () => {
  var object = {
    id: 0,
    username: email.value,
    password: password.value
  }
  axios.post('https://avasin20240124173421.azurewebsites.net/api/Login', object)
    .then(res => {
      console.log('res', res);
      console.log('router',router)
      if (res.status == 200) {
        localStorage.setItem('token', JSON.stringify(object));
        router.push('/admin')
      }
    })
    .catch((err) => {
      console.log('error', err);
      toast("Hatalı Giriş !", {
        autoClose: 1000,
      }); // ToastOptions
    })
  console.log('object', object)
  // if (email.value == users.value[0].email && password.value == users.value[0].password) {
  //   localStorage.setItem('token', JSON.stringify(object));
  //   router.push('/admin');
  // } else {
  //   // toast("Hatalı Giriş!", {
  //   //   "theme": "auto",
  //   //   "type": "danger",
  //   //   "dangerouslyHTMLString": true
  //   // })
  // }
}
const refreshLogin = () => {
  const object = {
    "username": username1.value,
    "currentPassword": passwordold.value,
    "newPassword": passwordnew.value
  }
  axios.post('https://avasin20240124173421.azurewebsites.net/api/Login/change-password', object)
    .then(res => {
      console.log('res', res);
      if (res.status == 200) {
        toast("Şifre Başarıyla değiştirildi !", {
          autoClose: 1000,
        }); // ToastOptions
      }
    })
    .catch((err) => {
      console.log('error', err);
      toast("Hatalı Giriş !", {
        autoClose: 1000,
      }); // ToastOptions
    })
}
</script>
<style scoped>
.card {
  height: auto;
}
</style>