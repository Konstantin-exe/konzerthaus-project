import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  data: {
    // pagesLoaded: false,
    // mediaLoaded: false,
  },
  state: {
    dataFromPagesApi: [],
    dataFromMediaApi: [],
    // pagesLoaded: false,
  },
  mutations: {
    SET_PAGES(state, data) {
      state.dataFromPagesApi = data;
    },
    SET_MEDIA(state, data) {
      state.dataFromMediaApi = data;
    },
    // PAGES_LOADED(state, data) {
    //   state.pagesLoaded = data;
    // },
  },
  actions: {
    fetchDataFromPagesApi({ commit }) {
      axios
        .get('https://entdecken.konzerthaus.at/c-control/wp-json/wp/v2/pages')
        .then((res) => {
          // commit('PAGES_LOADED', true);
          console.log(res);
          if (res.status === 200) {
            commit('SET_PAGES', res.data);
            console.log('happend');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchDataFromMediaApi({ commit }) {
      axios
        .get('https://entdecken.konzerthaus.at/c-control/wp-json/wp/v2/media')
        .then((res) => {
          if (res.data.status === 'success') {
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
