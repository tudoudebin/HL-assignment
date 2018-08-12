<template>
	<div class="m-con">
		<h3>活动名称</h3>
		<Form :model="formItem" :label-width="150">
			<FormItem label="参与门店">
          <Select multiple v-model="formItem.selectedShops">
             <Option v-for="item in shopList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
      </FormItem>
      <FormItem label="目标会员">
          <Select v-model="formItem.members">
            <Option value="1">门店全部会员</Option>
            <Option value="2">3个月未到店会员</Option>
          </Select>
      </FormItem>
      <FormItem label="活动时间段">
        <DatePicker type="daterange" placement="bottom-end" placeholder="请选择时间段" style="width: 400px"></DatePicker>
    	</FormItem>
    	<FormItem label="活动内容">
        <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 3,maxRows: 6}" placeholder="活动内容"></Input>
    	</FormItem>
    	<FormItem>
        <Button type="primary">提交申请</Button>
    	</FormItem>
		</Form>
	</div>
</template>

<script>
	export default {
		components: {
			
		},
		data() {
			return {
				formItem: {
					selectedShops: [],
				},
				shopList: [
					{
            value: '1',
            label: '门店1'
	        },
	        {
            value: '2',
            label: '门店2'
	        },
	        {
            value: '3',
            label: '门店3'
	        },
				]
			}
		}
	}
</script>

<style scoped lang="scss">
	.m-con {
		background: #fff;
		margin-top: 10px;
		padding: 15px;
	}

	h3 {
		text-align: center;
		margin-bottom: 15px;
		font-weight: 600;
		font-size: 1.5rem;
	}
</style>