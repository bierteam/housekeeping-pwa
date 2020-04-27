<template>
  <form class="form-signin">
    <div class="text-center mb-4">
      <img class="mb-4" alt="Household logo" width="100" height="100" src="../assets/household.svg">
      <h1 class="h3 mb-3 font-weight-normal">Register</h1>
    </div>
    <b-alert v-if="error" show variant="danger" dismissible>{{error}}</b-alert>
    <b-alert v-if="isPwned" show variant="danger">This password has been pwned.</b-alert>
    <b-alert v-if="notEqual" show variant="danger">The password is not the same.</b-alert>
    <div class="form-label-group">
      <input type="username" id="inputUsername" class="form-control" placeholder="Username" v-model="username" required autofocus>
      <label for="inputUsername">Username</label>
    </div>

    <div class="form-label-group">
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="password" @focus='focus = true' @blur='focus = false' required>
      <label for="inputPassword">Password</label>
    </div>

    <div class="form-label-group">
      <input type="password" id="inputPasswordConfirm" class="form-control" placeholder="Confirm password" v-model="passwordConfirm" @focus='focus = true' @blur='focus = false' required>
      <label for="inputPasswordConfirm">Confirm password</label>
    </div>

    <div class="form-label-group">
      <input type="email" id="inputEmail" class="form-control" placeholder="Email address" v-model="email" required>
      <label for="inputEmail">Email address</label>
    </div>

    <button type="submit" @click.prevent="Signin" :disabled="isDisabled" class="btn btn-lg btn-primary btn-block">Register</button>
    <div class="text-center">
      <br>
      <router-link :to="{ name: 'Sign in', params: { nextUri: this.$route.params.nextUri }}">Or sign in if you already have an account</router-link>
    </div>
    <p class="mt-5 mb-3 text-muted text-center">&copy; 2020 BierTeam</p>
    <!-- <div>Icons made by <a href="https://www.flaticon.com/authors/photo3idea-studio" title="photo3idea_studio">photo3idea_studio</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> -->
  </form>
</template>

<script>
import Api from '@/services/Api'
import pwned from 'havetheybeenpwned'

export default {
  data () { // local data
    return {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      isPwned: false,
      focus: false,
      error: ''
    }
  },
  beforeUpdate () {
    this.CheckPassword()
  },
  computed: {
    isDisabled: function () {
      return !(this.$data.username && this.$data.password && this.$data.passwordConfirm && this.$data.email && !this.$data.isPwned && !this.$data.notEqual)
    },
    notEqual: function () {
      return Boolean(!this.$data.focus && this.$data.password !== this.$data.passwordConfirm)
    }
  },
  methods: {
    CheckPassword () {
      if (!this.focus) {
        pwned(this.$data.password).then(isPwned => {
          this.$data.isPwned = isPwned
        })
      }
    },
    Signin () {
      const data = {
        username: this.$data.username,
        password: this.$data.password,
        email: this.$data.email,
        invite: this.$route.query.invite
      }
      Api().post('user/create', data)
        .then(response => {
          if (response.status === 201) {
            this.$store.commit('saveJWT', response.data)
            this.$router.push((this.$route.params.nextUri) ? { path: this.$route.params.nextUri } : '/')
          }
        })
        .catch(e => {
          this.$data.error = e.response.data || e
          console.error(e)
        })
    }
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
