<template>
  <div id="wrap" class="bg-yello-100">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<style>
#wrap {
  margin: 0 50%;
}
</style>
