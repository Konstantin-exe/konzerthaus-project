<template>
  <!-- main container -->
  <div
    class="content overhaul"
    v-if="
      $store.state.dataFromPagesApiLoaded && $store.state.dataFromMediaApiLoaded
    "
  >
    <div class="row mx-0 ">
      <div class="col-md-12 px-0 ">
        <div class="image">
          <a hidden href="https://github.com/Konstantin-exe"
            >greetings from the Dev who build this site (2021) - have a nice
            day!</a
          >
          <!-- modal -->
          <modal
            :modalOpen="modalOpen"
            :closeModal="closeModal"
            :video="video"
            :videoId="videoId"
          ></modal>

          <div class="landscape roomImage">
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
    </div>
    <!-- Videos -->
    <div class="container">
      <div ref="videos">
        <h1 class="video-h1">Videos</h1>

        <div class="row video-container">
          <template class="" v-for="video in videosInMain(showRoomId)">
            <button
              class="videoWrapper d-flex flex-wrap"
              :key="video.id"
              @click="openModal(video.id)"
            >
              <div :key="video.name" class="single-video-container li-modal">
                <img :src="videoThumbnail(video.id)" alt="" />
                {{ video.title.rendered }}
              </div>
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from './Modal.vue';
export default {
  components: { Modal },
  name: 'Main',
  data() {
    return {
      modalOpen: false,
      roomId: null,
      video: null,
      videoId: null,
      desktopImg: '',
    };
  },
  methods: {
    roomDesktopImg(id) {
      if (
        this.$store.state.dataFromPagesApiLoaded &&
        this.$store.state.dataFromMediaApiLoaded
      ) {
        const room = this.$store.state.dataFromPagesApi.find((content) => {
          if (content.meta_box.content_type === 'room' && content.id === id) {
            return true;
          }
          return false;
        });
        const desktopImgId = room.meta_box.room_details.room_background_desktop;
        const desktopImg = this.$store.state.dataFromMediaApi.find(
          (content) => {
            if (content.id == desktopImgId) {
              return true;
            }
            return false;
          },
        );

        return desktopImg.media_details.sizes.full.source_url;
      }
    },

    roomMobileImg(id) {
      if (
        this.$store.state.dataFromPagesApiLoaded &&
        this.$store.state.dataFromMediaApiLoaded
      ) {
        const room = this.$store.state.dataFromPagesApi.find((content) => {
          if (content.meta_box.content_type === 'room' && content.id === id) {
            return true;
          }
          return false;
        });
        const mobileImgId = room.meta_box.room_details.room_background_mobile;
        const mobileImg = this.$store.state.dataFromMediaApi.find((content) => {
          if (content.id == mobileImgId) {
            return true;
          }
          return false;
        });
        return mobileImg.media_details.sizes.full.source_url;
      }
    },

    videosInMain(id) {
      if (
        this.$store.state.dataFromPagesApiLoaded &&
        this.$store.state.dataFromMediaApiLoaded
      ) {
        const room = this.$store.state.dataFromPagesApi.find((content) => {
          if (content.meta_box.content_type === 'room' && content.id === id) {
            return true;
          }
          return false;
        });
        const roomId = room.id;
        const videosInMain = this.$store.state.dataFromPagesApi.filter(
          (content) => {
            if (content.parent == roomId) {
              return true;
            }
            return false;
          },
        );

        return videosInMain;
      }
    },
    videoThumbnail(id) {
      if (
        this.$store.state.dataFromPagesApiLoaded &&
        this.$store.state.dataFromMediaApiLoaded
      ) {
        const video = this.$store.state.dataFromPagesApi.find((content) => {
          if (content.meta_box.content_type === 'video' && content.id === id) {
            return true;
          }
          return false;
        });
        const videoImgId = video.meta_box.video_details.video_thumbnail;
        const videoImg = this.$store.state.dataFromMediaApi.find((content) => {
          if (content.id == videoImgId) {
            return true;
          }
          return false;
        });
        if (videoImg === undefined) {
          return 'https://entdecken.konzerthaus.at/c-control/wp-content/uploads/2021/04/pngegg.png';
        }
        return videoImg.media_details.sizes.medium.source_url;
      }
    },

    openModal(id) {
      this.$store.state.dataFromPagesApi.find((content) => {
        if (content.meta_box.content_type === 'video' && content.id === id) {
          return true;
        }
        return false;
      });
      const modalVideo = this.$store.state.dataFromPagesApi.find((content) => {
        if (content.id === id) {
          return true;
        }
      });
      this.modalOpen = !this.modalOpen;
      this.video = modalVideo;
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
      const selectedRoom = this.$store.state.dataFromPagesApi.find(
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

img.mobile-room-image {
  display: block;
}

/* Mobile menu visible only on mobile  */
@media (max-width: 360px) {
  .video-h1 {
    position: absolute;
    top: 660px;
  }
  .logo-top {
    position: fixed;
    width: 0;
    margin: 0;
  }
  .video-container {
    margin-top: 200px;
  }
  .overhaul {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
@media (max-width: 576px) {
  #portrait-menu {
    display: block;
    height: 70vh;
    overflow: auto;
  }
  #bottom-menu {
    position: fixed;
    height: 80vh;
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
  .roomImage {
    margin-bottom: -90px;
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
  .overhaul {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

/* Destkop version in widescreen */
@media (min-width: 577px) {
  img.desktop-room-image {
    display: block;
    object-fit: cover;
  }
  img.mobile-room-image {
    display: none;
  }
  #bottom-menu {
    display: none;
  }
  #top-menu {
    overflow: scroll;
    position: fixed;
    top: 62px;
    right: -100%;
    z-index: 12;
    max-height: 100vh;
    max-width: 385px;
    border-radius: 5px;
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
.roomImage {
  height: 100vh;
  object-fit: cover;
}
.video-h1 {
  margin-top: 30px;
  margin-bottom: 30px;
}
.video-container {
  /* width: 100%; */
  justify-content: center;
  justify-content: space-evenly;
}
.li-modal {
  display: flex;
  flex-direction: column;
  width: 320px;
}
.single-video-container img {
  width: 310px;
  height: 180px;
}

/* video container 16:9 responsive */
.videoWrapper {
  display: flex;
  background: none;
  border: none;
  flex-wrap: wrap;
  width: auto;
  padding-bottom: 5%;

  overflow: hidden;
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
  position: absolute;
  bottom: 2%;

  left: 45%;
}

@media (max-width: 576px) {
  .scroll-image {
    transition: all 0.1s ease-in-out;
    opacity: 0.8;
    position: absolute;
    bottom: 16vh;
    left: 40%;
  }
}
</style>
