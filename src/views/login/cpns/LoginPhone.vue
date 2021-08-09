<template>
  <div class="login-phone">
    <el-form label-width="70px" :rules="formRules" :model="phone" ref="formRef">
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phone.num" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model="phone.code" />
          <el-button type="primary" class="fetch-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { formRules } from '../config/phoneConfig'

export default defineComponent({
  setup() {
    const phone = reactive({
      num: '',
      code: '',
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
      phone,
      formRules,
      loginAction,
      formRef,
    }
  },
})
</script>

<style lang="less" scoped>
.get-code {
  display: flex;
  .fetch-btn {
    margin-left: 8px;
  }
}
</style>
