export const formRules = {
  name: [
    { required: true, message: '用户名是必填内容！', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{5,10}$/,
      message: '用户名必须是5-10个字母或数字组合',
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, message: '密码是必填内容！', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{3,}$/,
      message: '密码必须是3位以上的字母或数字组合',
      trigger: 'blur',
    },
  ],
}
