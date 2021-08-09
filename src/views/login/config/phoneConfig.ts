export const formRules = {
  num: [
    { required: true, message: '手机号是必填内容', trigger: 'blur' },
    {
      pattern: /^\d{8,12}$/,
      message: '手机号必须是8-12个数字组合',
      trigger: 'blur',
    },
  ],
  code: [
    { required: true, message: '验证码是必填内容', trigger: 'blur' },
    {
      pattern: /^[0-9]{6}$/,
      message: '验证码位数或格式错误',
      trigger: 'blur',
    },
  ],
}
