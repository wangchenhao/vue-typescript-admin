<template>
  <div>打击好</div>
</template>
<script lang="ts">
import { Basis, Component } from '../Basis';
@Component
export default class Ucenter extends Basis {
  mounted() {
    this.$message({
      message: '成功',
      type: 'success',
    });
  }
}
</script>
