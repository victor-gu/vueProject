<template>
  <div class="app-container">
    <div class="personBox">
      <el-row>
        <el-col :span="12" class="colMargin">
          <div class="grid-content bg-purple">
            <div class="userCenter">
              <el-card class="box-card">
                <div class="infoStatus">
                  <p class="infoTitle">账户状态</p>
                  <p class="infoUsers">
                    欢迎您！系统操作员 <span class="fontColor">{{ this.$store.getters.name }}</span>
                  </p>
                </div>
                <p class="infoTitle">账户信息</p>
                <ul class="info">
                  <li><span>用户名：</span>{{ this.$store.getters.name }}</li>
                  <li><span>邮箱：</span>{{ content.email }}</li>
                  <li><span>手机号码：</span>{{ content.mobile }}</li>
                  <li><span>注册时间：</span>{{ new Date(content.createdDate) | formatDate('YYYY-MM-DD hh:mm') }}</li>
                  <li><span>修改时间：</span>{{ new Date(content.modifiedDate) | formatDate('YYYY-MM-DD hh:mm') }}</li>
                </ul>
                <!-- <p class="updateInfo" @click="$router.push({ name: 'EditInfo' })">修改信息</p> -->
              </el-card>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-card class="box-card">
              <p class="infoTitle">修改密码</p>
              <el-form ref="contentForm" :model="contentForm" :rules="rules" label-width="80px" class="formBox">
                <el-form-item label="用户名" prop="name">
                  <el-input v-model="contentForm.name" clearable />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="contentForm.email" clearable />
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                  <el-input v-model="contentForm.mobile" clearable />
                </el-form-item>
                <el-form-item label="旧密码" prop="oldPassword">
                  <el-input v-model="contentForm.oldPassword" type="password" clearable />
                </el-form-item>
                <el-form-item label="新密码" prop="password">
                  <el-input v-model="contentForm.password" type="password" clearable />
                </el-form-item>
                <el-form-item label="确认密码" prop="surePwd">
                  <el-input v-model="contentForm.surePwd" type="password" clearable />
                </el-form-item>
                <el-form-item>
                  <el-button :loading="loading" type="primary" @click="updateInfo">确定</el-button>
                  <el-button @click="cancelInfo">重置</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import { getUserById, updateUser } from '@/api/person';
import { isvalidPhone, isvalidEmail } from '@/utils/validate';

export default {
  name: 'PersonCenter',
  data() {
    // 邮箱或手机号验证
    const validateUsername = (rule, value, callback) => {
      if (!isvalidEmail(value)) {
        callback(new Error('请输入正确的邮箱'));
      } else {
        callback()
      }
    }
    // 手机号验证
    const validateMobile = (rule, value, callback) => {
      if (!isvalidPhone(value)) {
        callback(new Error('请输入正确的手机号码'));
      } else {
        callback()
      }
    }
    // 密码验证
    const validatePass = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    // 确认密码验证
    const validateSurePad = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('请输入密码'))
      } else if (value !== this.contentForm.password) {
        callback(new Error('密码不一致'))
      } else {
        callback()
      }
    }
    return {
      content: {},
      contentForm: {
        name: '',
        email: '',
        mobile: '',
        password: '',
        oldPassword: '',
        surePwd: ''
      },
      loading: false,
      rules: {
        name: [{ required: true, message: '请选择活动区域', trigger: 'blur' }],
        email: [{ required: true, trigger: 'blur', validator: validateUsername }],
        mobile: [{ required: true, trigger: 'blur', validator: validateMobile }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
        surePwd: [{ required: true, trigger: 'blur', validator: validateSurePad }],
        oldPassword: [{ required: true, trigger: 'blur', message: '请选择原始密码' }]
      }
    }
  },
  created() {
    getUserById(this.$store.getters.userId).then((response) => {
      this.$nextTick(() => {
        this.$refs.contentForm.clearValidate();
      });
      this.content = response;
      this.contentForm.name = response.name;
      this.contentForm.email = response.email;
      this.contentForm.mobile = response.mobile;
      this.contentForm.oldPassword = response.oldPassword;
    }).catch((error) => {
      console.log(error);
    });
  },
  methods: {
    updateInfo() {
      this.$refs.contentForm.validate(valid => {
        if (valid) {
          if (this.contentForm.oldPassword === this.contentForm.password) {
            this.$notify({
              title: '失败',
              message: '新密码和旧密码不能相同',
              type: 'error'
            });
          } else {
            this.loading = true;
            updateUser(this.$store.getters.userId, this.contentForm).then((response) => {
              this.loading = false;
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success'
              });
              // 设置用户名
              this.$store.dispatch('SetUserName', response.name);
            }).catch((error) => {
              console.log(error);
            });
          }
        } else {
          this.loading = false;
          return false
        }
      })
    },
    cancelInfo() {
      this.$nextTick(() => {
        this.$refs.contentForm.clearValidate();
      });
      this.contentForm.oldPassword = '';
      this.contentForm.password = '';
      this.contentForm.surePwd = '';
    }
  }
}
</script>

<style lang='scss' scoped>
.formBox{
  width: 400px;
  height: 600px;
}
.personBox{
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    width: 49%;
    border-radius: 4px;
    border-top: 4px solid #2db7f5;
  }
  .colMargin{
    margin-right: 10px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .infoStatus{
    height: 150px;
  }
  .fontColor{
    color: rgb(255, 139, 0);
  }
  .infoUsers{
    padding-left: 20px;
  }
  .infoTitle{
    font-weight: 800;
    padding-left: 15px;
    font-size: 20px;
    height: 50px;
    border-bottom: 1px solid #ccc;
  }
  .userCenter{
    .info{
      list-style: none;
      padding-left: 5px;
      height: 414px;
      li{
        line-height: 45px;
        span{
          width: 100px;
          display: inline-block;
          text-align: right;
        }
      }
    }
    .updateInfo{
      padding-left: 25px;
      color: #409eff;
      cursor: pointer;
    }
  }
}
</style>
