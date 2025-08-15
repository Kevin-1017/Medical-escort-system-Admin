<script setup>
import { ref } from 'vue'
import { UserFilled, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { login, register } from '@/api/login'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
const imgUrl = new URL('../../../public/img/login-head.png', import.meta.url).href

// 表单数据
const loginForm = ref({
  phoneNumber: '',
  password: '',
  validCode: '',
})

// 账号校验规则
const validateUser = (rule, value, callback) => {
  // 不能为空
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    const reg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
    reg.test(value) ? callback() : callback(new Error('手机号格式不对,请输入正确手机号'))
  }
}

// 密码校验规则
const validatePass = (rule, value, callback) => {
  // 不能为空
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    const reg = /^[a-zA-Z0-9_-]{4,16}$/
    reg.test(value)
      ? callback()
      : callback(new Error('密码格式不对,需要4到16位字母/数字/下划线/减号'))
  }
}
const rules = ref({
  phoneNumber: [{ validator: validateUser, trigger: 'blur' }],
  password: [{ validator: validatePass, trigger: 'blur' }],
})
// 提交表单
const loginFormRef = ref()
const router = useRouter()

const submitForm = async () => {
  await loginFormRef.value.validate()
  // 当前是登录页面
  if (formType.value === 'login') {
    const res = await login({
      phoneNumber: loginForm.value.phoneNumber,
      password: loginForm.value.password,
    })
    if (res.code === 666) {
      // 将token放入缓存
      localStorage.setItem('a_token', res.data.a_token)
      userStore.userInfo = res.data.userInfo
      router.push('/')
    }
  } else {
    // 如果是注册页面
    register(loginForm.value).then(() => {
      ElMessage.success('注册成功！请登录')
      formType.value = 'login'
    })
  }
}

// 切换表单类型
const formType = ref('login')
const handleChange = () => {
  formType.value = formType.value === 'login' ? 'register' : 'login'
}

// 发送短信
let flag = false
const countdown = ref({
  validText: '获取验证码',
  time: 60,
})
const countdownChange = () => {
  // 已经发送的不处理
  if (flag) return
  // 手机号正则
  const phoneReg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
  // 判断手机号是否正确
  if (!loginForm.value.phoneNumber || !phoneReg.test(loginForm.value.phoneNumber)) {
    return ElMessage({
      message: '请检查手机号是否正确',
      type: 'error',
    })
  }
  // 倒计时
  const time = setInterval(() => {
    if (countdown.value.time <= 0) {
      countdown.value.validText = '获取验证码'
      countdown.value.time = 60
      flag = false
      clearInterval(time)
    } else {
      countdown.value.time -= 1
      countdown.value.validText = `剩余${countdown.value.time}s`
    }
  }, 1000)
  flag = true
  console.log('发送短信')
  // getCode({ tel: loginForm.value.phoneNumber }).then(() => {})
}
</script>

<template>
  <el-row class="login-container" justify="center" :align="'middle'">
    <el-card style="max-width: 480px">
      <template #header>
        <div class="card-header">
          <!-- public目录下的资源可以通过"/"访问 -->
          <!-- <img src="/login-head.png" alt=""> -->
          <!-- 或者通过vite静态资源处理方法 -->
          <img :src="imgUrl" alt="" />
        </div>
      </template>
      <div class="jump-link">
        <el-link @click="handleChange" type="primary" underline>{{
          formType === 'login' ? '忘记密码？注册一个新的' : '返回登录'
        }}</el-link>
      </div>
      <el-form
        ref="loginFormRef"
        style="max-width: 600px"
        :model="loginForm"
        status-icon
        :rules="rules"
        class="demo-ruleForm"
      >
        <el-form-item prop="phoneNumber">
          <el-input
            v-model="loginForm.phoneNumber"
            :prefix-icon="UserFilled"
            placeholder="手机号"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="密码"
            autocomplete="off"
          />
        </el-form-item>
        <template v-if="formType === 'register'">
          <el-form-item prop="validCode">
            <el-input
              v-model="loginForm.validCode"
              :prefix-icon="Lock"
              placeholder="验证码为1234"
              autocomplete="off"
            >
              <template #append>
                <span @click="countdownChange" style="cursor: pointer">{{
                  countdown.validText
                }}</span>
              </template>
            </el-input>
          </el-form-item>
        </template>
        <el-form-item>
          <el-button :style="{ width: '100%' }" type="primary" @click="submitForm(loginFormRef)">
            {{ formType === 'login' ? '登录' : '注册' }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-row>
</template>

<style lang="scss" scoped>
:deep(.el-card__header) {
  padding: 0;
}
.login-container {
  height: 100%;
  .card-header {
    background-color: #899fe1;
    img {
      width: 430px;
    }
  }
  .jump-link {
    text-align: right;
    margin-bottom: 10px;
  }
}
</style>
