<script setup>
import { reactive, onMounted } from 'vue'
import { InfoFilled } from '@element-plus/icons-vue'
import { getOrderList, updateOrder } from '@/api/system/order'
import dayjs from 'dayjs'
import { useRoute } from 'vue-router'
import PanelHeader from '@/components/panelHeader.vue'

const route = useRoute()
const statusMap = {
  pending: {
    color: 'danger',
    text: '待支付',
  },
  unserved: {
    color: 'warning',
    text: '待服务',
  },
  done: {
    color: 'success',
    text: '已完成',
  },
  canceled: {
    color: 'info',
    text: '已取消',
  },
}
// 表单数据
const searchForm = reactive({
  id: null,
})

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

const getList = (params) => {
  getOrderList({ ...paginationData, ...params }).then(({ data }) => {
    const { list, total } = data
    tableData.list = list
    tableData.total = total
  })
}

const serverEnd = async (id) => {
  await updateOrder({ id: id, order_status: 'done' })
  getList()
}

const handleCurrentChange = (val) => {
  paginationData.pageNum = val
  getList()
}

onMounted(() => {
  getList()
})
</script>

<template>
  <div class="order-container">
    <PanelHeader :info="route" />
    <div class="form">
      <el-form :model="searchForm" :inline="true">
        <el-form-item prop="id">
          <el-input v-model="searchForm.id" placeholder="订单号" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList(searchForm)">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData.list" stripe style="width: 100%">
      <el-table-column fixed label="订单号" prop="id" width="150" />
      <el-table-column label="就诊医院" prop="hospital_name" />
      <el-table-column label="陪护师" prop="companion_name">
        <!-- <template #default="scope">
          <el-avatar :src="scope.row.companion.avatar" />
        </template> -->
      </el-table-column>
      <!-- <el-table-column label="陪护师手机号" width="120">
        <template #default="scope">
          {{ scope.row.companion.mobile }}
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="总价" prop="price" />
      <el-table-column label="已付" prop="paidPrice" /> -->
      <el-table-column label="下单时间" prop="createDate" width="120">
        <template #default="scope">
          {{ dayjs(scope.row.createDate).format('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column label="订单状态">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-tag :type="statusMap[scope.row.order_status].color">{{
              statusMap[scope.row.order_status].text
            }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="接单状态" prop="service_state" /> -->
      <el-table-column label="联系人手机号" prop="tel" width="120" />
      <el-table-column fixed="right" label="操作" width="100">
        <template #default="scope">
          <el-popconfirm
            confirm-button-text="是"
            cancel-button-text="否"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="是否确认完成？"
            @confirm="serverEnd(scope.row.id)"
          >
            <template #reference>
              <el-button type="primary" :disabled="scope.row.order_status === 'done'" link
                >服务完成</el-button
              >
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
  </div>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: flex-end;
  padding: 10px 0 10px 10px;
  background-color: #fff;
}
</style>
