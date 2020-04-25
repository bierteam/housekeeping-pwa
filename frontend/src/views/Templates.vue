<template>
  <div class="templates">
    <h1>Here you can create templates</h1>
    <b-button v-on:click="toggle" variant="outline-primary">Toggle authenticated</b-button>
  </div>
</template>

<script>
export default {
  methods: {
    toggle () {
      this.$store.commit('toggle')
    }
  }
}
</script>

<style>

</style>
