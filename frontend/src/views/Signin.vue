<template>
  <form class="form-signin">
    <div class="text-center mb-4">
      <img class="mb-4" alt="Household logo" width="100" height="100" src="../assets/household.svg">
      <h1 class="h3 mb-3 font-weight-normal">Sign in</h1>
    </div>

    <div class="form-label-group">
      <input type="username" id="inputUsername" class="form-control" placeholder="Username" v-model="username" required autofocus>
      <label for="inputUsername">Username</label>
    </div>

    <div class="form-label-group">
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="password" required>
      <label for="inputPassword">Password</label>
    </div>

    <div class="checkbox mb-3">
      <label>
        <input type="checkbox" v-model="remember"> Remember me on this device
      </label>
    </div>
    <button @click.prevent="Signin" class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    <p class="mt-5 mb-3 text-muted text-center">&copy; 2020 BierTeam</p>
    <!-- <div>Icons made by <a href="https://www.flaticon.com/authors/photo3idea-studio" title="photo3idea_studio">photo3idea_studio</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> -->
  </form>
</template>

<script>
import Api from '@/services/Api'

export default {
  data () { // local data
    return {
      username: '',
      password: '',
      remember: true,
      error: '',
      message: ''
    }
  },
  methods: {
    Signin () {
      const data = {
        username: this.$data.username,
        password: this.$data.password,
        remember: this.$data.remember
      }
      Api().post('user/signin', data)
        .then(response => {
          if (response.status === 200) {
            this.$store.commit('saveJWT', response.data)
            this.Redirect()
          }
        })
        .catch(e => {
          console.error(e)
        })
    },
    Redirect () {
      if (this.$store.state.jwt) {
        const query = this.$route.query
        this.$router.push((query.redirect) ? { path: query.redirect, query } : '/')
      }
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

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 420px;
  padding: 15px;
  margin: auto;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group > input,
.form-label-group > label {
  height: 3.125rem;
  padding: .75rem;
}

.form-label-group > label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;
  line-height: 1.5;
  color: #495057;
  pointer-events: none;
  cursor: text;
  border: 1px solid transparent;
  border-radius: .25rem;
  transition: all .1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: 1.25rem;
  padding-bottom: .25rem;
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: .25rem;
  padding-bottom: .25rem;
  font-size: 12px;
  color: #777;
}
</style>
