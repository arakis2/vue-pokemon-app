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
  <div className="col s12 m4 l4">
    <div className="card hoverable">
      <div className="card">
        <div className="card-image">
          <img className="responsive-img" :src="url" :alt="title">
        </div>
      </div>
    </div>
  </div>
</template>