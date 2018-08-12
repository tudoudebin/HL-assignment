<template>
	<div class="m-con">
		<div v-if="tableShow">
			<div class="align-between">
				<span></span>
				<Button type="primary" class="creat-btn" @click="create">新建</Button>
			</div>
			<Table :columns="columns" :data="storeData" class="m-table"></Table>
			<Page :total="dataCount" :page-size="pageSize" show-total  @on-change="changepage"></Page>
		</div>
		<div v-if="!tableShow">
			<ActivityDetails @changeTableShow="changeTableShow"/>
		</div>
	</div>
</template>

<script>
	import ActivityDetails from './ActivityDetails';
	const storeData = [
					{
						"coupon": "新品彩妆试妆体验1",
						"des": "对XX新品的试妆活动",
						"area": "全国门店",
						"channel": "短信",
						"state": "可申请"
					},
					{
						"coupon": "使用装领取2",
						"des": "领取试用装小样",
						"area": "部分门店",
						"channel": "短信",
						"state": "可申请"
					},
					{
						"coupon": "新品彩妆试妆体验3",
						"des": "对XX新品的试妆活动",
						"area": "全国门店",
						"channel": "短信",
						"state": "可申请"
					},
					{
						"coupon": "使用装领取4",
						"des": "领取试用装小样",
						"area": "部分门店",
						"channel": "短信",
						"state": "可申请"
					},{
						"coupon": "新品彩妆试妆体验5",
						"des": "对XX新品的试妆活动",
						"area": "全国门店",
						"channel": "短信",
						"state": "可申请"
					},
					{
						"coupon": "使用装领取6",
						"des": "领取试用装小样",
						"area": "部分门店",
						"channel": "短信",
						"state": "可申请"
					},{
						"coupon": "新品彩妆试妆体验7",
						"des": "对XX新品的试妆活动",
						"area": "全国门店",
						"channel": "短信",
						"state": "可申请"
					},
					{
						"coupon": "使用装领取8",
						"des": "领取试用装小样",
						"area": "部分门店",
						"channel": "短信",
						"state": "可申请"
					},{
						"coupon": "新品彩妆试妆体验9",
						"des": "对XX新品的试妆活动",
						"area": "全国门店",
						"channel": "短信",
						"state": "可申请"
					},
					{
						"coupon": "使用装领取10",
						"des": "领取试用装小样",
						"area": "部分门店",
						"channel": "短信",
						"state": "可申请"
					},
				];
	export default {
		components: {
			ActivityDetails
		},
		created(){
      this.handleListApproveHistory();
    },
		methods: {
			create() {
				this.tableShow = false
			},
			show() {
				this.tableShow = false
			},
			changeTableShow(value) {
				this.tableShow = value
			},
			// 获取历史记录信息
      handleListApproveHistory(){
          
        // 保存取到的所有数据
        this.ajaxHistoryData = storeData,
        this.dataCount = storeData.length;
        // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
        if(storeData.length < this.pageSize){
          this.storeData = this.ajaxHistoryData;
        }else{
          this.storeData = this.ajaxHistoryData.slice(0,this.pageSize);
        }
      },
      changepage(index) {
        var _start = ( index - 1 ) * this.pageSize;
        var _end = index * this.pageSize;
        this.storeData = this.ajaxHistoryData.slice(_start,_end);
      }
		},
		data() {
			return {
				dataCount: 0,
				pageSize: 6,
				ajaxHistoryData: [],
				tableShow: true,
				storeData: [],
				columns: [
					{
            title: '优惠券',
            key: 'coupon'
          },
          {
            title: '优惠券描述',
            key: 'des'
          },
          {
            title: '适用范围',
            key: 'area'
          },
          {
            title: '发送渠道',
            key: 'channel'
          },
          {
            title: '状态',
            key: 'state'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                  h('Button', {
                      props: {
                          type: 'primary',
                          size: 'small'
                      },
                      style: {
                          marginRight: '5px'
                      },
                      on: {
                          click: () => {
                              this.show(params.index)
                          }
                      }
                  }, '查看'),
                  h('Button', {
                      props: {
                          type: 'error',
                          size: 'small'
                      },
                      on: {
                          click: () => {
                              this.disable(params.index)
                          }
                      }
                  }, '禁用')
              ]);
            }
        	}
				]
			}
		}
	}
</script>

<style scoped lang="scss">
	.m-con {
		background: #fff;
		padding: 15px;
	}

	.m-table {
		margin-top: 15px;
	}

	.align-between {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>