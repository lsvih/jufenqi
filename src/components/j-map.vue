<template>
    <div :style="{width:width,height:height}"></div>
</template>

<style>
</style>

<script>
import AMap from 'AMap'
console.log(AMap)

export default {
  props: {
    height: {
      type: String,
      default: "100%"
    },
    width: {
      type: String,
      default: "100%"
    }
  },
  ready () {
    const map = new AMap.Map('map-container', {
      zoom: 15,
      center: [116.39, 39.9]
    })
    console.log(map)
  }
}
</script>
