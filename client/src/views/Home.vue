<template>
  <v-container>
    <student-data></student-data>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  components: {
    'student-data': require('@/components/data/StudentData.vue').default,
  },
};
</script>
