<template>
	<div class="m-con">
		<div v-if="tableShow">
			 <Form :model="formInline" :label-width="70" inline>
	        <FormItem label="申请门店">
	            <Input type="text" v-model="formInline.name" placeholder="门店账号/店名" style="width:150px">
	            </Input>
	        </FormItem>
	        <FormItem label="申请时间">
	            <DatePicker type="date" placeholder="申请时间" v-model="formInline.date"></DatePicker>
	        </FormItem>
	        <FormItem label="申请活动类型">
	           <Select v-model="formInline.select" style="width:150px">
                <Option value="1">类型1</Option>
                <Option value="2">类型2</Option>
                <Option value="3">类型3</Option>
            </Select>
	        </FormItem>
	       <Button type="primary">搜索</Button>
	    </Form>
	    <ul class="nav nav-pills nav-pills--success" role="tablist">
		      <li class="nav-item">
		        <Button size="small" shape="circle" :type="changeColor('tab1')" @click="changeTab('tab1')">审核中活动</Button>
		      </li>
		      <li class="nav-item">
		        <Button size="small" shape="circle" :type="changeColor('tab2')" @click="changeTab('tab2')">已审核活动</Button>
		      </li>
		      </li>
			  </ul>
			<Table :columns="columns" :data="activityData" class="m-table"></Table>
      <Page :total="dataCount" :page-size="pageSize" show-total  @on-change="changepage"></Page>
		</div>
		<div v-if="!tableShow">
			<Audit @changeTableShow="changeTableShow"/>
		</div>
	</div>
</template>

<script>
	import Audit from "./Audit"
  const activityData = [
          {
            "type": "新品彩妆试妆体验1",
            "des": "对xx新品的试妆活动",
            "shop": "门店1",
            "time": "2018-04-20 至 2018-05-20",
            "num": "20人",
          },
          {
            "type": "新品彩妆试妆体验2",
            "des": "对xx新品的试妆活动",
            "shop": "门店1",
            "time": "2018-04-20 至 2018-05-20",
            "num": "20人",
          },
          {
            "type": "新品彩妆试妆体验3",
            "des": "对xx新品的试妆活动",
            "shop": "门店1",
            "time": "2018-04-20 至 2018-05-20",
            "num": "20人",
          },
          {
            "type": "新品彩妆试妆体验4",
            "des": "对xx新品的试妆活动",
            "shop": "门店1",
            "time": "2018-04-20 至 2018-05-20",
            "num": "20人",
          },
          {
            "type": "新品彩妆试妆体验5",
            "des": "对xx新品的试妆活动",
            "shop": "门店1",
            "time": "2018-04-20 至 2018-05-20",
            "num": "20人",
          },
          {
            "type": "新品彩妆试妆体验6",
            "des": "对xx新品的试妆活动",
            "shop": "门店1",
            "time": "2018-04-20 至 2018-05-20",
            "num": "20人",
          },
          {
            "type": "新品彩妆试妆体验7",
            "des": "对xx新品的试妆活动",
            "shop": "门店1",
            "time": "2018-04-20 至 2018-05-20",
            "num": "20人",
          },
          {
            "type": "新品彩妆试妆体验8",
            "des": "对xx新品的试妆活动",
            "shop": "门店1",
            "time": "2018-04-20 至 2018-05-20",
            "num": "20人",
          },
          {
            "type": "新品彩妆试妆体验",
            "des": "对xx新品的试妆活动",
            "shop": "门店1",
            "time": "2018-04-20 至 2018-05-20",
            "num": "20人",
          }
        ]
	export default {
		components: {
			Audit
		},
    created(){
      this.handleListApproveHistory();
    },
		data() {
			return {
				tab: "tab1",
				tableShow: true,
        dataCount: 0,
        pageSize: 6,
        ajaxHistoryData: [],
				formInline: {
            user: '',
            password: ''
        },
        ruleInline: {
            user: [
                { required: true, message: 'Please fill in the user name', trigger: 'blur' }
            ],
            password: [
                { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
            ]
        },
        activityData: [],
        columns: [
					{
            title: '活动类型',
            key: 'type'
          },
          {
            title: '活动描述',
            key: 'des'
          },
          {
            title: '活动门店',
            key: 'shop'
          },
          {
            title: '活动时间段',
            key: 'time'
          },
          {
            title: '活动人数',
            key: 'num'
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
                              this.changeTableShow(false)
                          }
                      }
                  }, '查看')
              ]);
            }
        	}
				]
			}
		},
		methods: {
			changeTableShow(value) {
				this.tableShow = value
			},
			changeColor(value) {
				if (this.tab === value) {
					return 'primary'
				} else {
					return 'ghost'
				}
			},
			changeTab(value) {
				this.tab = value;
			},
      // 获取历史记录信息
      handleListApproveHistory(){
          
        // 保存取到的所有数据
        this.ajaxHistoryData = activityData,
        this.dataCount = activityData.length;
        // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
        if(activityData.length < this.pageSize){
          this.activityData = this.ajaxHistoryData;
        }else{
          this.activityData = this.ajaxHistoryData.slice(0,this.pageSize);
        }
      },
      changepage(index) {
        var _start = ( index - 1 ) * this.pageSize;
        var _end = index * this.pageSize;
        this.activityData = this.ajaxHistoryData.slice(_start,_end);
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

	.nav {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
	}

	.nav.nav-pills .nav-item, .nav.nav-tabs .nav-item {
	  margin-left: 10px;
	}
</style>