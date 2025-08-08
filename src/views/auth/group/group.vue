<script setup>
import { Plus } from '@element-plus/icons-vue'
import { reactive, ref, onMounted, nextTick } from 'vue'
import { getRoleList, updateRole, createRole, deleteRole } from '@/api/auth/group'
import { getMenuList } from '@/api'
import { useRoute } from 'vue-router'
import PanelHeader from '@/components/panelHeader.vue'
import { ElMessage } from 'element-plus'
import { updateMenu } from '@/hooks'

const route = useRoute()
const permissionData = ref([])
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
const getList = async () => {
  const res = await getRoleList(paginationData)
  const { list, total } = res.data
  tableData.list = list
  tableData.total = total
}
onMounted(async () => {
  getList()
  await getMenuList().then((res) => {
    permissionData.value = res.data
  })
})

const form = reactive({
  id: '',
  name: '',
})
const formRef = ref()
const rules = reactive({
  authName: [{ required: true, trigger: 'blur', message: '请输入权限名称' }],
})
const handleCurrentChange = (val) => {
  paginationData.pageNum = val
}

const dialogFormVisible = ref(false)
const open = (rowData = {}) => {
  dialogFormVisible.value = true
  nextTick(() => {
    // 如果是编辑
    if (rowData) {
      Object.assign(form, {
        id: rowData.id,
        authName: rowData.name,
      })
      treeRef.value.setCheckedKeys(rowData.permissions)
    }
  })
}
const beforeClose = () => {
  dialogFormVisible.value = false
  formRef.value.resetFields()
  treeRef.value.setCheckedKeys([4])
}

const defaultProps = {
  children: 'children', // 指定子树为节点对象的某个属性值
  label: 'name', // 指定节点标签为节点对象的某个属性值
}

// 选中权限
const treeRef = ref()
const userInfo = window.localStorage.getItem('userInfo')
if (!userInfo) {
  console.error('用户信息不存在')
}
const userInfoObj = JSON.parse(userInfo)
if (!userInfoObj.role) {
  console.error('用户角色信息不存在')
}
// 确认
const confirm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const name = form.authName
      const id = form.id
      const permissions = treeRef.value.getCheckedKeys()
      try {
        if (id) {
          await updateRole({ id, name, permissions })
          ElMessage.success('编辑成功')
          if (name === userInfoObj.role) {
            updateMenu(name)
          }
        } else {
          await createRole({ name, permissions })
          ElMessage.success('新增成功')
        }
        beforeClose()
        getList()
      } catch (error) {
        console.error('操作失败:', error)
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
const onDeleteRole = async (row) => {
  const { id } = row
  await deleteRole(id)
  ElMessage.success('删除成功')
  getList()
}
</script>
<template>
  <div class="group-container">
    <PanelHeader :info="route" />
    <div class="btns">
      <el-button @click="open(null)" type="primary" size="small" :icon="Plus">新增</el-button>
    </div>
    <el-table :data="tableData.list" stripe style="width: 100%">
      <el-table-column label="id" prop="id" />
      <el-table-column label="角色名称" prop="name" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="open(scope.row)">编辑</el-button>
          <el-popconfirm
            confirm-button-text="是"
            cancel-button-text="否"
            title="是否确认删除？"
            @confirm="onDeleteRole(scope.row)"
          >
            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>
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
    <el-dialog v-model="dialogFormVisible" :before-close="beforeClose" title="添加权限" width="500">
      <el-form ref="formRef" label-width="100px" label-position="left" :model="form" :rules="rules">
        <el-form-item v-show="false" prop="id">
          <el-input v-model="form.id" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="名称" prop="authName">
          <el-input v-model="form.authName" placeholder="请填写权限名称" />
        </el-form-item>
        <el-form-item label="权限" prop="authPermissions">
          <el-tree
            ref="treeRef"
            style="max-width: 600px"
            :data="permissionData"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2]"
            :default-checked-keys="[4]"
            :props="defaultProps"
          />
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

<style lang="scss" scoped>
.btns {
  padding: 10px 0 10px 10px;
  background-color: #fff;
}
</style>
