<template>
  <div class="page-modal">
    <el-dialog title="新建用户" v-model="dialogVisible" width="30%" center>
      <hy-form v-bind="modalConfig" v-model="formData"></hy-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HyForm from '@/base-ui/form'

export default defineComponent({
  props: {
    modalConfig: {
      type: Object,
      required: true,
    },
  },
  components: { HyForm },
  setup() {
    const dialogVisible = ref(false)
    const formData = ref({})
    return {
      dialogVisible,
      formData,
    }
  },
})
</script>

<style scoped></style>
