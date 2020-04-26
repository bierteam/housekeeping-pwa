<template>
  <div id="app">
    <div class="text-center" v-if="authenticated" id="nav">
      <router-link to="/">Tasks</router-link> |
      <router-link to="/templates">Templates</router-link> |
      <router-link to="/verify">Verify</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased; */
  /* -moz-osx-font-smoothing: grayscale; */
  /* text-align: center; */
  /* color: #2c3e50; */
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import Api from '@/services/Api'

export default {
  name: 'App',
  computed: {
    authenticated () {
      return this.$store.state.jwt
    }
  },
  methods: {
    Signout () {
      Api().delete('user/signout')
        .then(response => {
          if (response.status === 200) {
            this.$router.push('/signin')
          }
        })
        .catch(e => {
          console.error(e)
        })
    },
    Redirect () {
      if (!this.authenticated) {
        const query = this.$route.query
        if (this.$route.path !== '/' && this.$route.path !== '/signin') {
          query.redirect = this.$route.path
        }
        this.$router.push({ path: '/signin', query })
      } else { delete this.$route.query.redirect }
    }
  },
  beforeMount () { // Refresh, fresh page load
    this.Redirect()
  },
  beforeUpdate () { // Uri change, link, etc.
    this.Redirect()
  }
}
</script>
