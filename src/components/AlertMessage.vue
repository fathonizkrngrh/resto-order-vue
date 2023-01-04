<template>
  <div class="container">
    <div class="alert alert-danger" role="alert">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: "AlertMessage",
  props: ["message"],
};
</script>

<style></style>
