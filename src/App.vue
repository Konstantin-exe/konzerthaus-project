<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<style>
@import '../src/assets/css/style.css';
</style>

<script>
// @ is an alias to /src
import Header from './components/Header';
import Footer from './components/Footer';
// import Main from './components/Main';

export default {
  name: 'App',
  components: {
    Header,
    // Main,
    Footer,
  },
};
</script>
