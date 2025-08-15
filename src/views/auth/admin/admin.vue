<script setup>
import PanelHeader from '@/components/panelHeader.vue'
import { onMounted, reactive, ref } from 'vue'
import { authAdmin, updateAuth } from '@/api/auth/admin'
import { getRoleList } from '@/api/auth/group'
import dayjs from 'dayjs'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { updateMenu } from '@/hooks'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
const route = useRoute()
// 请求参数
const paginationData = reactive({
  pageNum: 1,
  pageSize: 10,
})

// 列表数据
const tableData = reactive({
  list: [],
  total: 0,
})
let options = ref([])

// 请求列表数据
const getData = async () => {
  const [dataRes, roleListRes] = await Promise.all([authAdmin(paginationData), getRoleList()])
  const { list, total } = dataRes.data
  list.forEach((item) => {
    item.createDate = dayjs(item.createDate).format('YYYY-MM-DD')
  })
  tableData.list = list
  tableData.total = total
  options.value = roleListRes.data.list
}

const handleCurrentChange = (val) => {
  paginationData.pageNum = val
  getData()
}

// 编辑
const dialogFormVisible = ref(false)

const rules = ref({
  name: [{ required: true, trigger: 'blur', message: '请填写昵称' }],
  permissions_id: [{ required: true, trigger: 'blur', message: '请选择菜单权限' }],
})

const form = ref({})
const handleEdit = (rowData) => {
  dialogFormVisible.value = true
  form.value = JSON.parse(JSON.stringify(rowData))
}
const formRef = ref()
const confirm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      const { id, role, phoneNumber, name } = form.value
      const params = {
        role: role,
        name: name,
      }
      updateAuth(id, params).then(() => {
        if (userStore.userInfo.phoneNumber === phoneNumber) {
          userStore.userInfo.role = role
          updateMenu(role)
        }
        dialogFormVisible.value = false
        ElMessage.success('修改成功')
        getData()
      })
    } else {
      ElMessage.error('请填写完整信息')
    }
  })
}

onMounted(() => {
  getData()
})
</script>

<template>
  <div class="admin-container">
    <PanelHeader :info="route" />
    <el-table :data="tableData.list" stripe style="width: 100%">
      <el-table-column label="id" prop="id" />
      <el-table-column label="昵称" prop="name" />
      <el-table-column label="所属组别" prop="role" />
      <el-table-column label="手机号" prop="phoneNumber" />
      <el-table-column label="状态" prop="status">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-tag :type="scope.row.status ? 'success' : 'danger'">{{
              scope.row.status ? '正常' : '失效'
            }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon><Clock /></el-icon>
            <span style="margin-left: 10px">{{ scope.row.createDate }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-info">
      <el-pagination
        v-model:current-page="paginationData.pageNum"
        size="small"
        :background="false"
        layout="total, prev, pager, next"
        :total="tableData.total"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog v-model="dialogFormVisible" title="编辑用户" width="500">
      <el-form label-width="100px" label-position="left" :model="form" :rules="rules" ref="formRef">
        <el-form-item label="手机号" prop="phoneNumber">
          <el-input v-model="form.phoneNumber" disabled />
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="角色权限" prop="role">
          <el-select v-model="form.role" placeholder="请选择角色权限" style="width: 240px">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="confirm(formRef)"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
