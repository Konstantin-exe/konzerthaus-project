import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  data: {},
  state: {
    dataFromPagesApi: [],
    dataFromMediaApi: [],
    dataFromPagesApiLoaded: false,
    dataFromMediaApiLoaded: false,
  },
  mutations: {
    SET_PAGES(state, data) {
      state.dataFromPagesApi = data;
    },
    SET_MEDIA(state, data) {
      state.dataFromMediaApi = data;
    },
    SET_PAGES_LOADED(state, data) {
      state.dataFromPagesApiLoaded = data;
    },
    SET_MEDIA_LOADED(state, data) {
      state.dataFromMediaApiLoaded = data;
    },
  },
  actions: {
    fetchDataFromPagesApi({ commit }) {
      axios
        .get(
          'https://entdecken.konzerthaus.at/c-control/wp-json/wp/v2/pages?per_page=100',
        )
        .then((res) => {
          if (res.status == 200) {
            commit('SET_PAGES_LOADED', true);
            commit('SET_PAGES', res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchDataFromMediaApi({ commit }) {
      axios
        .get(
          'https://entdecken.konzerthaus.at/c-control/wp-json/wp/v2/media?per_page=100',
        )
        .then((res) => {
          if (res.status == 200) {
            commit('SET_MEDIA_LOADED', true);
            commit('SET_MEDIA', res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {},
  methods: {},
});
