<template>
  <div class="container">
    <Backheader/>
    <div class="content">
      <h3>休闲零食</h3>
    </div>
  </div>
</template>
<script>
import Backheader from "@/components/common/Backheader";

export default {
  name: "navdetail",
  components: {
    Backheader
  },
  data() {
    return {
      lists: []
    };
  }
};
</script>
