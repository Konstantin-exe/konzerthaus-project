<template>
  <header v-if="dataFromPagesApi.length > 0 && dataFromMediaApi.length > 0">
    <!-- main nav bar fixed top-->
    <div class="row logo-top">
      <div class="col-11">
        <a class="" href="#"
          ><img src="../assets/img/konzerthaus-logo.png" alt="Konzerthaus Logo"
        /></a>
      </div>
      <div class="col-1">
        <button
          @click="toggleNavbarRight"
          class="btn btn-outline-dark float-right"
          type="button"
          id="navbar-right-toggler"
        >
          Räume
        </button>
        <nav id="main-menu">
          <div class="" style="margin-top: 62px;"></div>
          <div class="row">
            <div class="fixed-menu" id="top-menu">
              <div id="right-menu">
                <ul class="row menu-list">
                  <li
                    class="menu-item text-center col-sm-6"
                    v-for="room in roomsInNavBar"
                    :key="room.id"
                  >
                    <router-link :to="`/${room.slug}`">
                      <img
                        :src="roomThumbnailImg(room.id)"
                        alt=""
                        class="image-circle "
                      />
                      <h2>{{ room.title.rendered }}</h2>
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>

    <nav>
      <div class="row">
        <div class="fixed-menu" id="bottom-menu">
          <div id="portrait-menu">
            <div class="row">
              <div class="col-12 pt-4 pb-4 text-center">
                <button
                  class="btn btn-outline-dark"
                  id="mobile-nav-toggle"
                  @click="toggleNavbarBottom"
                  type="button"
                >
                  Räume
                </button>
              </div>
            </div>
            <ul class="row text-center menu-list">
              <li
                class="menu-item col-sm-4 col-6"
                v-for="room in roomsInNavBar"
                :key="room.id"
              >
                <router-link :to="`/${room.slug}`">
                  <img
                    :src="roomThumbnailImg(room.id)"
                    :key="room.id"
                    alt=""
                    class="image-circle"
                  />
                  <h2>{{ room.title.rendered }}</h2>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import $ from 'jquery';
export default {
  name: 'Header',
  data() {
    return {
      navOpen: false,
    };
  },
  // created() {
  //   window.addEventListener('toggleNavBarRight', this.toggleNavbarRight),
  //     window.addEventListener('toggleNavBarBottom', this.toggleNavbarBottom);
  // },
  methods: {
    openNav() {
      this.navOpen = !this.navOpen;
    },
    roomThumbnailImg(id) {
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
      return desktopImg.media_details.sizes.medium_large.source_url;
    },
    /* animate right menu on button click */
    toggleNavbarRight() {
      const el = $('#top-menu');
      const divHeight = el.height();
      const position = el.position();
      const buttonWidth = $('#navbar-right-toggler').width();
      const width = el.width();
      const documentWidth = $(document).width();
      console.log('Div height: ' + divHeight);
      console.log(
        'Position - left: ' + position.left + ' top: ' + position.top,
      );
      console.log('element Width: ' + width);
      console.log('Button width: ' + buttonWidth);
      console.log('documentWidth: ' + documentWidth);

      if (position.left < documentWidth) {
        el.animate({
          duration: 500,
          right: -width,
        });
      } else {
        el.animate({
          duration: 500,
          right: 0,
        });
      }
    },
    /* show - hide mobile menu */
    toggleNavbarBottom() {
      $('#mobile-nav-toggle').on('click', function() {
        const el = $('#bottom-menu');
        const buttonName = $('#mobile-nav-toggle');
        const divHeight = el.height();
        // const position = el.position();
        // const offset = el.offset();
        const menuHeight = $('#portrait-menu').height();
        if (divHeight <= 80) {
          el.animate({
            duration: 500,
            height: menuHeight,
          });
          buttonName.text(' X Räume X');
        } else {
          el.animate({
            duration: 500,
            height: 80,
          });
          buttonName.text(' - Räume -');
        }
      });
    },
  },
  computed: {
    dataFromPagesApi() {
      return this.$store.state.dataFromPagesApi;
    },
    dataFromMediaApi() {
      return this.$store.state.dataFromMediaApi;
    },
    roomsInNavBar() {
      const rooms = this.dataFromPagesApi.filter((content) => {
        if (content.meta_box.content_type === 'room') {
          return true;
        }
        return false;
      });
      return rooms;
    },
  },
  created() {
    this.$store.dispatch('fetchDataFromPagesApi');
    this.$store.dispatch('fetchDataFromMediaApi');
  },
};
</script>

<style>
/* circle image in menu */
ul {
  list-style: none;
  padding: 3px 12px 3px 6px;
}
.image-circle {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 0.5rem;
}

nav {
  /* width: 1000px; */
}
#bottom-menu {
}
</style>
