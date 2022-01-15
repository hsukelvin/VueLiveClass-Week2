import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";

const url = 'https://vue3-course-api.hexschool.io/v2'; // 請加入站點
const path = 'skps0102'; // 請加入個人 API Path

const app = createApp({
    data() {
        return {
            products: [],
            itemTemp: {},
        }
    },
    methods: {
        checkLogin() {
            // 取得 Token
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            console.log('get Cookie token', token);
            axios.defaults.headers.common['Authorization'] = token;

            // 確認是否登入
            axios.post(`${url}/api/user/check`)
                .then((resp) => {
                    console.log('resp ', resp);
                    this.getProductsData();
                })
                .catch((error) => {
                    //coolkie不存在會導回登入頁面
                    window.location = 'login.html';
                })
        },
        getProductsData() {
            axios.get(`${url}/api/${path}/admin/products`)
                .then((resp) => {
                    const { products } = resp.data;
                    this.products = products;
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    },
    created() {
        this.checkLogin();
    }
});

app.mount('#app');