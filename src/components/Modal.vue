<template>
  <transition name="modal">
    <div v-show="modalOpen" class="modal-mask" v-if="video">
      <div class="modal-wrapper" @click.self="closeModal">
        <div class="modal-container">
          <div class="modal-header">
            <h4 class="modal-title">
              {{ video.title.rendered }}
            </h4>
            <button
              type="button"
              class="btn btn-outline-dark"
              @click="closeModal"
            >
              Schließen
            </button>
          </div>

          <div class="modal-body ">
            <div class="row container">
              <div class=" col-md embed-responsive embed-responsive-16by9">
                <!-- youtube embeded-->
                <iframe
                  v-if="modalOpen"
                  id="modal-video"
                  class="embed-responsive-item"
                  v-bind:src="video.meta_box.video_details.video_iframe_url"
                  allowfullscreen=""
                ></iframe>
              </div>
              <div class="col-sm">
                <!-- Text aligned rigt -->

                <p>
                  {{ clean() }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import DOMPurify from 'dompurify';
export default {
  name: 'Modal',

  props: {
    modalOpen: {
      required: true,
    },
    roomId: {
      required: true,
    },
    closeModal: {
      required: true,
    },
    video: {
      required: true,
    },
  },

  computed: {
    dataFromPagesApi() {
      return this.$store.state.dataFromPagesApi;
    },
    dataFromMediaApi() {
      return this.$store.state.dataFromMediaApi;
    },
  },
  created() {
    this.$store.dispatch('fetchDataFromPagesApi');
    this.$store.dispatch('fetchDataFromMediaApi');
  },
  methods: {
    clean() {
      return DOMPurify.sanitize(this.video.content.rendered, {
        FORBID_TAGS: ['p'],
      });
    },
  },
};
</script>

<style>
/* vieo container 16:9 responsive */
.videoWrapper {
  overflow: scroll;
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  width: 100%;
}

/* .videoWrapper iframe {
  position: absolute;
  top: 100;
  left: 0;
  width: 100%;
  height: 100%;
} */
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 85%;

  margin: 40px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-body {
  margin: 20px 0;
  height: 50vh;
  overflow-y: scroll;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
