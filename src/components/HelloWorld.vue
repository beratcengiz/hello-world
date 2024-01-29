<template>
    <div class="container-fluid">
        <div class="row" v-if="pageControl == 'category'">
            <div class="col-md-12 d-flex flex-column">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card mt-3" style="background-color: #DDF2FD;">
                            <div class="card-body text-center">
                                <div class="d-flex align-items-center justify-content-center">
                                    <img style="position: absolute;" class="logo-img" src="../assets/avasin.png" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 col-sm-12 col-lg-6" v-for="(item, index) in list" :key="index"
                        style="cursor: pointer;">
                        <div class="card  text-white mt-2" v-if="item.adress" style="height: auto;">
                            <img v-if="item.image" :src="item.image" class="card-img" alt="..."
                                style="width: 100%;height: 300px;">
                            <div class="d-flex justify-content-center align-items-center">
                                <div class="card-title text-dark" style="font-weight: bold;" v-if="item.adress">
                                    <p><i class="pi pi-home" style="color: green"></i> Adres : {{ item.adress }}</p>
                                    <p class="mt-4" @click="goInsta()"><i class="pi pi-instagram" style="color: green"></i>
                                        İnstagram : {{ item.insta }}</p>
                                    <p class="mt-4"><i class="pi pi-mobile" style="color: green"></i> Tel : {{ item.tel }}
                                    </p>
                                </div>
                                <!-- <h5 class="card-title text-dark" style="font-weight: bold;" >{{ item.label }}</h5> -->
                                <!-- <p >{{ item }}</p> -->
                            </div>
                        </div>
                        <div class="card  text-white mt-2" v-else @click="cardControls(item, index)" style="height: auto;">
                            <img v-if="item.image" :src="item.image" class="card-img" alt="..."
                                style="width: 100%;height: 300px;">
                            <div class="d-flex justify-content-center align-items-center">
                                <h5 class="card-title text-dark" style="font-weight: bold;">{{ item.label }}</h5>
                                <!-- <p >{{ item }}</p> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" v-else>
            <!-- <Card class="mt-2 d-flex justify-content-center">
                <template #content>
                    <h5>{{ items.label }}</h5>
                </template>
            </Card> -->
            <div class="col-md-12">
                <div class="card" style="background-color: #DDF2FD;">
                    <div class="row">
                        <div class="col-md-4 col-lg-4">
                            <label @click="pageControl = 'category'"
                                style="border-bottom:1px solid green;cursor: pointer;:hover(color: green;)">Anasayfaya
                                Git</label>
                        </div>
                        <div class="col-md-4 col-lg-4 d-flex justify-content-center">
                            <h5>{{ items.label }}</h5>
                        </div>
                    </div>
                </div>
                <!-- <Card class="mt-2 d-flex justify-content-center" style="background-color:#DDF2FD;">
                    <template #content>
                        <div class="row">
                            <div class="col-lg-4 col-md-12">
                                <button class="btn btn-success"
                                    @click="pageControl = 'category'">Anasayfaya Git</button>
                            </div>
                            <div class="col-lg-4 col-md-12">
                                <h5>{{ items.label }}</h5>
                            </div>
                            <div class="col-lg-4"></div>
                        </div>
                    </template>
                </Card> -->
            </div>
            <div class="col-md-12 col-sm-12 col-lg-4 d-flex flex-column" v-for="item in filterProducts" :key="item">
                <div class="card mt-2 product-card">
                    <div class="card-body">
                        <div class="row bg-white">
                            <div class="col-md-4 col-lg-4 col-sm-12 col-sm-12">
                                <img class="opacity-full" alt="user header"
                                    style="width: 150px;height: 150px;border-radius: 10%;" :src="item.url" />
                            </div>
                            <div class="col-md-2 col-lg-2 col-sm-12">
                            </div>
                            <div class="col-md-6 col-lg-6 col-sm-12">
                                <p style="font-weight: bold;" class="mt-2">Ürün Bilgisi : {{ item.name }}</p>
                                <p style="font-weight: bold;" v-if="item.category">Kategori : {{ item.category }}</p>
                                <p style="font-weight: bold;">Açıklama : {{ item.description }}</p>
                                <p style="font-weight: bold;color:green">Fiyat : {{ item.price }} TL </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
const products = ref([]);
const pageControl = ref('category')
const selectedCardIndex = ref(null)
const filterProducts = ref([])
// import contact from '../assets/pexels-photo-4160128.jpeg'
const items = ref('')
const a = ref([])
onMounted(async () => {
    await getProducts();
    filterProducts.value = products.value.filter(el => el.category == 'Sıcak İçecekler');
    items.value = { label: 'Sıcak İçecekler' }
})
const goInsta = () => {
    window.location.href = "https://www.instagram.com/villaavasinhookah/";
}
const getMealOfDay = async () => {
    await axios
        .get(
            "https://avasin20240124173421.azurewebsites.net/api/MealOfDay"
        )
        .then((res) => {
            console.log('res', res)
            filterProducts.value = res.data;
        })
        .catch((error) => console.log(error));
};
const getProducts = async () => {
    await axios
        .get(
            "https://avasin20240124173421.azurewebsites.net/api/Products"
        )
        .then((res) => {
            console.log('res', res)
            products.value = res.data;
            a.value = res.data
        })
        .catch((error) => console.log(error));
};
// const items = ref([
//     {
//         label: 'Sıcak İçecekler',
//         icon: 'pi pi-home'
//     },
//     {
//         label: 'Soğuk İçecekler',
//         icon: 'pi pi-star'
//     },
//     {
//         label: 'Atıştırmalıklar',
//         icon: 'pi pi-home'
//     },
//     {
//         label: 'Tatlılar',
//         icon: 'pi pi-star'
//     },
//     {
//         label: 'Nargile',
//         icon: 'pi pi-star'
//     },
//     {
//         label: "Yemekler",
//         icon: 'pi pi-star'
//     },
// ]);

const list = ref([
    {
        label: 'Kampanyalar',
        icon: 'pi pi-star',
        image: 'https://firebasestorage.googleapis.com/v0/b/villa-avasin-hookah.appspot.com/o/kahve%2Bpasta.jpg?alt=media&token=17f21a4b-5954-4d51-a508-6d5d4b144fc7'
    },
    {
        label: 'Nargileler',
        icon: 'pi pi-star',
        image: 'https://karekodrestaurantmenu.com/Pictures/a43e7839-1aa3-44d9-ab89-23e81e8ab815.jpg'
    },
    {
        label: 'Salatalar',
        icon: 'pi pi-home',
        image: 'https://karekodrestaurantmenu.com/category-pics/salatalar.jpg'
    },
    
    {
        label: 'Atıştırmalıklar',
        icon: 'pi pi-home',
        image: 'https://karekodrestaurantmenu.com/Pictures/91615fd9-50ff-42e1-8c5d-211194b5c1d9.jpg'
    },
    {
        label: 'Tatlılar',
        icon: 'pi pi-star',
        image: 'https://karekodrestaurantmenu.com/category-pics/tatlilar.jpg'
    },
    {
        label: 'Sıcak İçecekler',
        icon: 'pi pi-home',
        image: 'https://karekodrestaurantmenu.com/category-pics/sicakicecekler.jpg'
    },
    {
        label: 'Soğuk İçecekler',
        icon: 'pi pi-star',
        image: 'https://karekodrestaurantmenu.com/category-pics/sogukicecekler.jpg'
    },
    {
        label: 'Makarnalar',
        icon: 'pi pi-star',
        image: 'https://karekodrestaurantmenu.com/category-pics/makarnalar.jpg'
    },
    {
        label: 'Kırmızı Etler',
        icon: 'pi pi-star',
        image: 'https://karekodrestaurantmenu.com/category-pics/kirmizietler.jpg'
    },
    {
        label: 'Beyaz Etler',
        icon: 'pi pi-star',
        image: 'https://karekodrestaurantmenu.com/category-pics/beyaz-etler.jpg'
    },
    {
        label: 'Kahvaltı',
        icon: 'pi pi-star',
        image: 'https://karekodrestaurantmenu.com/category-pics/kahvaltilar.jpg'
    },
    {
        label: 'İletişim',
        icon: 'pi pi-star',
        adress: ' Peyas, Diclekent Villaları, 252. Sk. No:35, 21100 Kayapınar/Diyarbakır',
        tel: '0552 409 98 91',
        insta: "https://www.instagram.com/villaavasinhookah/"
    },

])
const cardControls = async (item, index) => {
    console.log(item)
    pageControl.value = ''
    items.value = item
    selectedCardIndex.value = index;
    console.log('index', index)
    if (index == 0) {
        await getMealOfDay()
    } else {
        filterProducts.value = products.value.filter(el => el.category == item.label);
        // filterProducts.value = products.value
    }
    if (window.innerWidth < 950) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    // if (item == 'Nargile') {
    //     items.value = { label: 'Nargile' }
    //     selectedCardIndex.value = 6;
    //     filterProducts.value = products.value.filter(el => el.category == item);
    // } else if (item.label == "İletişim") {
    //     items.value = { label: 'Peyas, Diclekent Villaları, 252. Sk. No:35, 21100 Kayapınar/Diyarbakır, Telefon : 0552 409 98 91' }
    //     filterProducts.value = []
    // } else {
    //     console.log('cardElement', index)
    //     items.value = item
    //     selectedCardIndex.value = index;
    //     console.log('index', index)
    //     if (index == 5) {
    //         await getMealOfDay()
    //     } else {
    //         filterProducts.value = products.value.filter(el => el.category == item.label);
    //         // filterProducts.value = products.value
    //     }
    // }
    // if (window.innerWidth < 600) {
    //     window.scrollTo({
    //         top: 350,
    //         behavior: 'smooth'
    //     });
    // }

}
// const getMenuItem = (item) => {
//   selectedCardIndex.value = -1;
//   console.log('products', products.value)
//   console.log('item', item)
//   filterProducts.value = products.value.filter(el => el.category == item.label);
// }
</script>
<style>
.images {
    width: 300px;
    height: 175px;
}

a.p-menuitem-link {
    background-color: white !important;
}

/* .p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link {
    border: none;
} */


/* .row {
    background-color: white;
} */

.p-menuitem-link {
    background-color: yellow !important;
}

.logo-img {
    width: 125px;
    height: 75px;
}

.product-card {
    height: 300px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

@media only screen and (max-width: 600px) {
    .card {
        height: 89px;
        /* veya diğer uygun boyutlama seçenekleri */
    }

    .product-card {
        height: auto;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }

    /* .wallpaper-register {
        background-color: black;
        height: 0px;
    } */

    .custom-scroll-container {
        overflow-y: hidden;
    }

    .custom-scroll-container::-webkit-scrollbar {
        display: none;
    }

    .images {
        width: 100px;
        height: 75px;
    }

    /* .row {
        background-color: black;
    } */

}

.card-color {
    background-color: #DDF2FD;
    ;
}

.selected-card {
    background-color: white
        /* Red background color */
        /* Change the border color as needed */
        /* Add any other styles for the selected card */
}

.opactiy-full {
    opacity: 1 !important;
}

.custom-scroll-container {
    max-height: 750px;
    overflow: auto;
}


.custom-scroll-container::-webkit-scrollbar {
    width: 10px;
    background-color: black;
    /* Gri arka plan rengi */
    border-radius: 50px;
    /* Yuvarlak köşeler */
}

.custom-scroll-container::-webkit-scrollbar-thumb {
    background-color: #DDF2FD;
    /* Gri kaydırma kolunun rengi */
    border-radius: 50px;
    /* Yuvarlak köşeler */
}</style>