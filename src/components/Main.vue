<template>
  <!-- main container -->
  <div
    class="content"
    v-if="dataFromMediaApi.length > 0 && dataFromPagesApi.length > 0"
  >
    <div class="row mx-0">
      <div class="col-md-12 px-0">
        <div class="image">
          <figure id="imagemap">
            <!-- modal -->
            <modal
              :modalOpen="modalOpen"
              :closeModal="closeModal"
              :video="video"
              :roomId="roomId"
            ></modal>

            <div class="landscape">
              <img
                class="desktop-room-image"
                width="100%"
                height="100%"
                alt=""
                :src="roomDesktopImg(showRoomId)"
              />
              <img
                class="mobile-room-image"
                width="371"
                height="590"
                :src="roomMobileImg(showRoomId)"
              />
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 1842 1212"
                style=" position: absolute"
              >
                <a
                  @click="openModal(showRoomId)"
                  class="li-modal"
                  name="circle-1"
                >
                  <circle
                    cx="300"
                    cy="200"
                    r="75"
                    opacity="0"
                    fill="none"
                    stroke="red"
                    stroke-width="20"
                  />
                  <circle cx="300" cy="200" r="50" opacity="0" fill="red" />
                </a>
                <a
                  @click="openModal(showRoomId)"
                  class="li-modal"
                  click="findModalExternal"
                  name="circle-2"
                >
                  <circle
                    cx="800"
                    cy="600"
                    r="75"
                    opacity="0"
                    fill="none"
                    stroke="red"
                    stroke-width="20"
                  />
                  <circle cx="800" cy="600" r="50" opacity="0" fill="red" />
                </a>

                <a
                  @click="openModal(showRoomId)"
                  class="li-modal"
                  click="findModalExternal"
                  name="circle-3"
                >
                  <circle
                    cx="1100"
                    cy="1200"
                    r="75"
                    opacity="0"
                    fill="none"
                    stroke="red"
                    stroke-width="20"
                  />
                  <circle cx="1100" cy="1200" r="50" opacity="0" fill="red" />
                </a>
              </svg>
            </div>
          </figure>
          <div class="scroll-image">
            <img
              class="center-block"
              src="/img/btn-desktop-scroll-down.png"
              @click="goto('videos')"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- Videos -->
    <div class="container">
      <div ref="videos">
        <h1>Videos</h1>
        <!-- <h1>{{ showRoom.title.render }}</h1> -->

        <div class="row">
          <template class="col" v-for="v in videosInMain(showRoomId)">
            <div class="videoWrapper" :key="v.id">
              <iframe
                width="auto"
                height="auto"
                :src="v.meta_box.video_details.video_iframe_url"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
              <div :key="v.name">
                {{ v.title.rendered }}
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
import Modal from './Modal.vue';
export default {
  components: { Modal },
  name: 'Main',
  data() {
    return {
      modalOpen: false,
      roomId: null,
      video: null,
      desktopImg: '',
    };
  },
  methods: {
    roomDesktopImg(id) {
      const room = this.dataFromPagesApi.find((content) => {
        if (content.meta_box.content_type === 'room' && content.id === id) {
          return true;
        }
        return false;
      });
      const desktopImgId = room.meta_box.room_details.room_background_desktop;
      const desktopImg = this.dataFromMediaApi.find((content) => {
        if (content.id == desktopImgId) {
          return true;
        }
        return false;
      });

      return desktopImg.media_details.sizes.full.source_url;
    },

    roomMobileImg(id) {
      const room = this.dataFromPagesApi.find((content) => {
        if (content.meta_box.content_type === 'room' && content.id === id) {
          return true;
        }
        return false;
      });
      const mobileImgId = room.meta_box.room_details.room_background_mobile;
      const mobileImg = this.dataFromMediaApi.find((content) => {
        if (content.id == mobileImgId) {
          return true;
        }
        return false;
      });

      return mobileImg.media_details.sizes.full.source_url;
    },

    videosInMain(id) {
      const room = this.dataFromPagesApi.find((content) => {
        if (content.meta_box.content_type === 'room' && content.id === id) {
          return true;
        }
        return false;
      });
      const roomId = room.id;
      const videosInMain = this.dataFromPagesApi.filter((content) => {
        if (content.parent == roomId) {
          return true;
        }
        return false;
      });

      return videosInMain;
    },

    openModal(id) {
      const room = this.dataFromPagesApi.find((content) => {
        if (content.meta_box.content_type === 'room' && content.id === id) {
          return true;
        }
        return false;
      });
      const roomId = room.id;
      const video = this.dataFromPagesApi.find((content) => {
        if (content.parent === roomId) {
          return true;
        }
      });
      this.modalOpen = !this.modalOpen;
      this.roomId = id;
      this.video = video;
    },

    goto(ref) {
      const element = this.$refs[ref];
      const top = element.offsetTop;
      window.scrollTo(0, top);
    },
    closeModal() {
      this.modalOpen = false;
    },
  },

  computed: {
    dataFromPagesApi() {
      return this.$store.state.dataFromPagesApi;
    },
    dataFromMediaApi() {
      return this.$store.state.dataFromMediaApi;
    },
    showRoomId() {
      const selectedRoom = this.dataFromPagesApi.find(
        (content) => content.slug === this.$route.params.slug,
      );
      return selectedRoom.id;
    },
  },
  created() {
    this.$store.dispatch('fetchDataFromPagesApi');
    this.$store.dispatch('fetchDataFromMediaApi');
  },
};
</script>

<style>
/* Main menu styling */
#main-menu {
  text-transform: uppercase;
}
.fixed-menu {
  background-color: white;
}
/* Mobile menu visible only on mobile, use bootsrap medium break-point  */
@media (max-width: 768px) {
  #portrait-menu {
    display: block;
  }
  #bottom-menu {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 11;
  }
  /* hide top menu */
  #top-menu {
    display: none;
  }
  /* hide menu button */
  #navbar-right-toggler {
    display: none;
  }

  .content {
    margin-top: 10px;
    padding-top: 62px;
  }

  /* change background image to portrait */

  img.desktop-room-image {
    display: none;
  }
  img.mobile-room-image {
    display: block;
  }

  /* Mobile version of circle full opacity */
  circle {
    opacity: 0.5;
  }
}

/* Destkop version in widescreen, use bootstrap medium breakpoint */
@media (min-width: 769px) {
  img.desktop-room-image {
    display: block;
  }
  img.mobile-room-image {
    display: none;
  }
  #bottom-menu {
    display: none;
  }
  #top-menu {
    position: fixed;
    top: 62px;
    right: -100%;
    z-index: 12;
    max-width: 385px;
  }

  /* show menu button */
  #navbar-right-toggler {
    display: block;
  }
}

/* svc element circle styling */
circle {
  opacity: 0.2;
}

circle:hover {
  opacity: 0.8;
}

#right-menu {
  margin-top: 30px;
}

#bottom-menu {
  height: 80px;
}
#mobile-nav-toggle {
  border: none;
  background-color: rgba(#f9cac7 0.4);
  font-size: 2rem;
}

#main-menu a a:link a:visited a:hover {
  color: black;
}
#main-menu a:hover {
  text-decoration: underline;
}
#main-menu h2 {
  font-size: 1rem;
  color: black;
}

.row {
}
/* video container 16:9 responsive */
.videoWrapper {
  padding-top: 3%;
  padding-bottom: 5%;
}

.videoWrapper iframe {
  /* position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; */
}

.logo-top {
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  width: 100%;
  margin: 0;
  padding: 10px 0;
}

#navbar-right-toggler {
  margin: 10px;
}

.menu-item {
  margin-bottom: 1.5rem;
}

/* Scroll Item */
.scroll-image:hover {
  transform: translateY(-8px) rotate(0deg);
  transition: all 0.1s ease-in-out;
  opacity: 1;
}

.scroll-image {
  transition: all 0.1s ease-in-out;
  opacity: 0.8;
}
</style>
