<script lang="ts">
export default {
  created() {
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query })
  },
  render: function() {
    return h('template') // avoid warning message
  }
}
</script>
