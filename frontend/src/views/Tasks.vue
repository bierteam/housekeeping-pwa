<template>
  <div class="text-center">
    <Return msg="Bericht vanuit tasks"/>
    <b-button @click="GetTasks" variant="outline-primary">Get tasks</b-button>
    <ul>
      <!-- <Task
        v-for="task in tasks"
        v-bind:key="task._id"
        v-bind:task="task"
        v-bind:showPrivateButton="showPrivateButton(task)"
      /> -->
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import Return from '@/components/Return.vue'
// import Task from '@/components/Task.vue'
import Api from '@/services/Api'

export default {
  name: 'Tasks',
  components: {
    Return
    // Task
  },
  methods: {
    GetTasks () {
      Api().get('task')
        .then()
        .catch(e => {
          console.error(e)
        })
    }
  }
}
</script>
