<!-- <template>
    <div id="app">
      <div class="login-page">
        <div class="wallpaper-register"></div>
  
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
              <div v-if="!registerActive" class="card login" style="width: 500px;" v-bind:class="{ error: emptyFields }">
                <h1>Coffee</h1>
                <form class="form-group" @submit.prevent="doLogin">
                  <input v-model="email" class="form-control" placeholder="Email" required>
                  <input v-model="password" type="password" class="form-control" placeholder="Password" required>
                  <input type="submit" class="btn btn-primary">
                  <p>Şifre Güncelle? <a href="#" @click="registerActive = !registerActive, emptyFields = false">Buradan
                      Geçiş
                      Yap</a>
                  </p>
                </form>
              </div>
  
              <div v-else class="card register" style="width: 500px;" v-bind:class="{ error: emptyFields }">
                <h1>Coffee</h1>
                <form class="form-group" @submit.prevent="editProducts">
                  <input v-model="emailReg" class="form-control" placeholder="Email" required>
                  <input v-model="passwordReg" type="password" class="form-control" placeholder="Password" required>
                  <input type="submit" class="btn btn-primary">
                  <p>Giriş <a href="#" @click="registerActive = !registerActive, emptyFields = false">Buradan
                      Geçiş Yap</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
  
        </div>
      </div>
  
    </div>
  </template> -->
  <!-- <script setup>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import router from '../router/router';
  // import { toast } from "vue3-toastify";
  // import "vue3-toastify/dist/index.css";
  const users = ref([])
  onMounted(() => {
    // ProductService.getProducts().then((data) => (products.value = data));
  
    getUser()
  });
  const email = ref("");
  const emailReg = ref("");
  const password = ref("");
  const passwordReg = ref("");
  const getUser = async () => {
    await axios
      .get(
        "https://mock-data-5ynd.onrender.com/accounts"
      )
      .then((res) => {
        console.log('res', res)
        users.value = res.data
      })
      .catch((error) => console.log(error));
  };
  const doLogin = () => {
    var object = {
      email: email.value,
      password: password.value
    }
    if (email.value == users.value[0].email && password.value == users.value[0].password) {
      localStorage.setItem('token', JSON.stringify(object));
      router.push('/admin');
    } else {
      // toast("Hatalı Giriş!", {
      //   "theme": "auto",
      //   "type": "danger",
      //   "dangerouslyHTMLString": true
      // })
    }
  }
  const editProducts = async () => {
    await axios.put(`https://mock-data-5ynd.onrender.com/accounts/1`, {
      id: 1,
      email: emailReg.value,
      password: passwordReg.value
    }).then(async (res) => {
      console.log('res', res)
    }).catch(async () => await getUser());
    // toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
  }
  </script>
    
  <style >
  p {
    line-height: 1rem;
  }
  
  .card {
    padding: 20px;
  }
  
  .form-group input {
    margin-bottom: 20px;
  }
  
  .login-page {
    align-items: center;
    display: flex;
    height: 100vh;
  }
  
  .login-page .wallpaper-login {
    background: url(https://images.pexels.com/photos/32237/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260) no-repeat center center;
    background-size: cover;
    height: 100%;
    position: absolute;
    width: 100%;
  }
  
  .login-page .fade-enter-active,
  .login-page .fade-leave-active {
    transition: opacity 0.5s;
  }
  
  .login-page .fade-enter,
  .login-page .fade-leave-to {
    opacity: 0;
  }
  
  .login-page .wallpaper-register {
    background: url('../assets/pexels-chevanon-photography-324028.jpg') no-repeat center center;
    background-size: cover;
    height: 100%;
    position: absolute;
    background-color: gray;
    width: 100%;
    z-index: -1;
  }
  
  .login-page h1 {
    margin-bottom: 1.5rem;
  }
  
  .error {
    animation-name: errorShake;
    animation-duration: 0.3s;
  }
  
  @keyframes errorShake {
    0% {
      transform: translateX(-25px);
    }
  
    25% {
      transform: translateX(25px);
    }
  
    50% {
      transform: translateX(-25px);
    }
  
    75% {
      transform: translateX(25px);
    }
  
    100% {
      transform: translateX(0);
    }
  }</style> -->


<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6 " style="margin-top: 18%;">
        <div class="card" v-if="loginControl">
          <div class="card-header d-flex justify-content-center bg-white" style="border:none">
            <img class="logo-img" src="../assets/avasin.png" />
          </div>
          <form @submit.prevent="doLogin">
            <div class="form-group">
              <label for="exampleInputEmail1">Kullancı Adı</label>
              <input v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                placeholder="Enter email">
              <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Şifre</label>
              <input v-model="password" type="password" class="form-control" id="exampleInputPassword1"
                placeholder="Password">
            </div>
            <!-- <div class="form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1">
              <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div> -->
            <button class="btn btn-primary" @click="loginControl = !loginControl">Şifre Değiştir</button>
            <!-- <button class="btn btn-primary" @click="loginControl = false" >Geri Dön</button> -->
            <button class="btn btn-primary ml-2">Kaydet</button>
          </form>
        </div>
        <div class="card" v-else>
          <div class="card-header d-flex justify-content-center bg-white" style="border:none">
            <img class="logo-img" src="../assets/avasin.png" />
          </div>
          <form @submit.prevent="refreshLogin">
            <div class="form-group">
              <label for="exampleInputEmail1">Kullancı Adı</label>
              <input v-model="username1" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                placeholder="Enter email">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Eski Şifre</label>
              <input v-model="passwordold" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                placeholder="Enter email">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Yeni Şifre</label>
              <input v-model="passwordnew"  class="form-control" id="exampleInputPassword1"
                placeholder="Password">
            </div>
            <!-- <div class="form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1">
              <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div> -->
            <button class="btn btn-primary" @click="loginControl = !loginControl">Geri dön</button>
            <button class="btn btn-primary ml-2">Kaydet</button>
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