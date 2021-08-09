<template>
  <div class="login-account">
    <el-form
      label-width="60px"
      :rules="formRules"
      :model="account"
      ref="formRef"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { formRules } from '../config/accountConfig'
import { ElForm } from 'element-plus'

export default defineComponent({
  setup() {
    const account = reactive({
      name: '',
      password: '',
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = () => {
      formRef.value?.validate((isValid) => {
        if (isValid) {
          console.log('真正执行登录逻辑')
        }
      })
    }

    return {
      account,
      formRules,
      loginAction,
      formRef,
    }
  },
})
</script>

<style scoped></style>
