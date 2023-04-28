<script lang="ts">
export default {
  props: {
    Url: String,
    Title: String
  },
  data() {
    return {
      url: this.Url,
      title: this.Title
    }
  }
}
</script>
<script setup lang="ts">

</script>
<template>
  <div className="col s10 m6 l4">
    <div className="card hoverable">
      <div className="card">
        <div className="card-image">
          <img :src="url" :alt="title" style="width:225px; margin: 0 auto">
        </div>
      </div>
    </div>
  </div>
</template>