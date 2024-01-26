
<template>
    <div>
        <div class="card p-3 mt-2">
            <Toolbar class="mb-4">
                <template #start>
                    <Button label="Yeni Ekle" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
                    <!-- <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected"
                        :disabled="!selectedProducts || !selectedProducts.length" /> -->
                </template>

                <template #end>
                    <!-- <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" /> -->
                    <!-- <Button label="Excel Çıktısı Al" icon="pi pi-upload" severity="help" @click="exportCSV($event)" /> -->
                </template>
            </Toolbar>

            <DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id" :paginator="true"
                :rows="5" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="{first} ile {last} arası {totalRecords} ürün arasından">
                <template #header>
                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                        <h4 class="m-0">Tüm Ürünler</h4>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </span>
                    </div>
                </template>

                <Column field="name" header="Name" sortable style="min-width:16rem"></Column>
                <Column header="Image">
                    <template #body="slotProps">
                        <img :src="slotProps.data.url" :alt="slotProps.data.url" class="shadow-2 border-round"
                            style="width: 64px" />
                    </template>
                </Column>
                <Column field="price" header="Price" sortable style="min-width:8rem">
                    <template #body="slotProps">
                        {{ formatCurrency(slotProps.data.price) }}
                    </template>
                </Column>
                <!-- <Column field="category" header="Category" sortable style="min-width:10rem"></Column> -->
                <!-- <Column field="rating" header="Reviews" sortable style="min-width:12rem">
                    <template #body="slotProps">
                        <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
                    </template>
                </Column> -->
                <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger"
                            @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Product Details" :modal="true"
            class="p-fluid">
            <div class="field">
                <label for="name">Name</label>
                <InputText id="name" v-model.trim="product.name" required="true" autofocus
                    :class="{ 'p-invalid': submitted && !product.name }" />
                <small class="p-error" v-if="submitted && !product.name">Name is required.</small>
            </div>
            <div class="field">
                <label for="description">Description</label>
                <Textarea id="description" v-model="product.description" required="true" rows="3" cols="20" />
            </div>

            <div class="field">
                <label for="inventoryStatus" class="mb-3">Resim Linki</label>
                <InputText id="name" v-model.trim="product.url" required="true" autofocus />

            </div>

            <div class="formgrid grid">
                <div class="field col">
                    <label for="price">Price</label>
                    <InputNumber id="price" v-model="product.price" mode="currency" currency="USD" locale="en-US" />
                </div>
                <!-- <div class="field col">
                    <label for="quantity">Quantity</label>
                    <InputNumber id="quantity" v-model="product.quantity" integeronly />
                </div> -->
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Ekle" icon="pi pi-check" text @click="saveProduct" v-if="buttonControl == 1" />
                <Button label="Güncelle" icon="pi pi-check" text @click="editProducts" v-if="buttonControl == 2" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="product">Are you sure you want to delete <b>{{ product.name }}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
                <Button label="Yes" icon="pi pi-check" text @click="deleteProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="product">Are you sure you want to delete the selected products?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
            </template>
        </Dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import axios from 'axios';
onMounted(() => {
    // ProductService.getProducts().then((data) => (products.value = data));

    getCardDetails()
});

const dt = ref();
const products = ref();
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref();
const buttonControl = ref(1)
const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const submitted = ref(false);

const getCardDetails = async () => {
    await axios
        .get(
            "https://avasin20240124173421.azurewebsites.net/api/MealOfDay"
        )
        .then((res) => {
            console.log('res', res)
            products.value = res.data;
        })
        .catch((error) => console.log(error));
};
const formatCurrency = (value) => {
    if (value)
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return;
};
const openNew = () => {
    buttonControl.value = 1
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
};
const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};
const saveProduct = async () => {
    console.log(product.value)
    submitted.value = true;
    var json = {
        "id": 0,
        "name": product.value.name,
        "price": product.value.price,
        "category": product.value.category,
        "description": product.value.description,
        "url": product.value.url
    }
    await axios.post("https://avasin20240124173421.azurewebsites.net/api/MealOfDay", json)
        .then(async (res) => {
            console.log('res', res)
            await getCardDetails();
            productDialog.value = false;
            toast("Ürün eklendi !", {
                autoClose: 1000,
            }); // ToastOptions
        })
        .catch(el => {
            console.log('el', el)
            toast("Ürün eklenemedi !", {
                autoClose: 1000,
            }); // ToastOptions
        })
    // setTimeout(async () => {
    //     const getCardDetails = async () => {
    //         await axios
    //             .get(
    //                 "https://avasin20240124173421.azurewebsites.net/api/MealOfDay"
    //             )
    //             .then((res) => {
    //                 console.log('res', res)
    //                 products.value = res.data;
    //             })
    //             .catch((error) => console.log(error));
    //     };
    //     await getCardDetails();
    // }, 1000);
};
const editProducts = async () => {
    
    console.log('prod', product.value);
    console.log('products', products.value)
    await axios.put(`https://avasin20240124173421.azurewebsites.net/api/MealOfDay/${product.value.id}`, product.value).then(async (res) => {
        console.log('res', res)
        await getCardDetails();
        productDialog.value = false;
        toast("Ürün güncellendi !", {
            autoClose: 1000,
        }); // ToastOptions
    }).catch((error) => console.log(error));
}
const editProduct = async (prod) => {
    console.log('prod', prod)
    buttonControl.value = 2
    // var json = {
    //     "name": product.value.name,
    //     "image": image.value,
    //     "price": product.value.price,
    //     "rating": 4.85,
    //     "category": product.value.category,
    //     "votes": 15,
    //     "popular": true,x
    //     "available": true
    // }
    // await axios.put(`https://shy-rose-armadillo-fez.cyclic.app/posts/${prod.id}`,prod).then(res => {
    // }).catch((error) => console.log(error));
    product.value = { ...prod };
    console.log('dasdasd', product.value)
    // product.value.name = prod.name;
    // product.value.image = prod.image;
    // product.value.price = prod.price
    // image.value = prod.image
    productDialog.value = true;
};
const confirmDeleteProduct = (prod) => {
    product.value = prod;
    deleteProductDialog.value = true;
};
const deleteProduct = async () => {
    await axios.delete(`https://avasin20240124173421.azurewebsites.net/api/MealOfDay/${product.value.id}`)
        .then(res => {
            console.log('res', res)
            toast("Ürün silindi !", {
                autoClose: 1000,
            }); // ToastOptions
        }).catch((error) => console.log(error));
    products.value = products.value.filter(val => val.id !== product.value.id);
    deleteProductDialog.value = false;
    product.value = {};

    // toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
};
// const findIndexById = (id) => {
//     let index = -1;
//     for (let i = 0; i < products.value.length; i++) {
//         if (products.value[i].id === id) {
//             index = i;
//             break;
//         }
//     }

//     return index;
// };
// const createId = () => {
//     let id = '';
//     var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     for (var i = 0; i < 5; i++) {
//         id += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     return id;
// }
// const exportCSV = () => {
//     dt.value.exportCSV();
// };
// const confirmDeleteSelected = () => {
//     deleteProductsDialog.value = true;
// };
const deleteSelectedProducts = () => {
    products.value = products.value.filter(val => !selectedProducts.value.includes(val));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
};

// const getStatusLabel = (status) => {
//     switch (status) {
//         case 'INSTOCK':
//             return 'success';

//         case 'LOWSTOCK':
//             return 'warning';

//         case 'OUTOFSTOCK':
//             return 'danger';

//         default:
//             return null;
//     }
// };

</script>
