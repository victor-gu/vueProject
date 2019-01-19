import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import num from "./num";

let store = new Vuex.Store({
    modules: {
        num: num
    }
});

export default store;


