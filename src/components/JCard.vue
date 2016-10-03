<template>
  <div class="card-view">
    <slot></slot>
  </div>
</template>
<style scoped lang="css">
.card-view{
  padding:14px 10px;
  width: calc( 100% - 30px - 20px );
  margin:10px 15px 0;
  height: 126px;
  background-color: #fff;
   box-shadow:1px 1px 5px 0 rgba(0,0,0,.3)
}
</style>
