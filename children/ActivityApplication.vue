<template>
	<div>
		<div v-if="listShow">
			<div class="align-between">
				<ul class="nav nav-pills nav-pills--success" role="tablist">
		      <li class="nav-item">
		        <Button size="small" shape="circle" :type="changeColor('tab1')" @click="changeTab('tab1')">申请中</Button>
		      </li>
		      <li class="nav-item">
		        <Button size="small" shape="circle" :type="changeColor('tab2')" @click="changeTab('tab2')">执行中的活动</Button>
		      </li>
		      <li class="nav-item">
		        <Button size="small" shape="circle" :type="changeColor('tab3')" @click="changeTab('tab3')">驳回的活动</Button>
		      </li>
		      <li class="nav-item">
		        <Button size="small" shape="circle" :type="changeColor('tab4')" @click="changeTab('tab4')">未通过的活动</Button>
		      </li>
			  </ul>
			  <Button type="primary" icon="android-add" @click="listShow = false">新申请</Button>
			</div>
		  <div>
		  	<Row :gutter="16">
					<Col class-name="col" :xs="24" :sm="12" :md="8" :lg="8" class="pro" v-for="(item, index) in couponList" :key="index">
						<DiscountCoupon :couponDetil="item"/>
					</Col>
				</Row>
				<Page :total="dataCount" :page-size="pageSize" show-total  @on-change="changepage"></Page>
		  </div>
		</div>
		<div v-if="!listShow">
			<i class="la la-mail-reply" @click="listShow = true"></i>
			<NewApplication /> 
		</div>
	</div>
</template>

<script>
	import DiscountCoupon from "./DiscountCoupon"
	import NewApplication from "./NewApplication"

	const couponList = [
					{"name": "活动1", "srcUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526284048&di=be48e7e58ba20b5faf28d77cc83cc9e4&imgtype=jpg&er=1&src=http%3A%2F%2Fimg01.taopic.com%2F170801%2F267872-1FP1121P169.jpg", "des": "活动描述，活动描述，活动描述，活动描述"},
					{"name": "活动2", "srcUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525689346704&di=33e145f2be240a4b5ee58448619c1443&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dd822dad831c79f3d9becec73d2c8a764%2Ff9dcd100baa1cd116394ed07b312c8fcc3ce2df2.jpg", "des": "活动描述，活动描述，活动描述，活动描述"},
					{"name": "活动3", "srcUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525689346704&di=32d00563fbdeed7e1beab85c848c37c6&imgtype=0&src=http%3A%2F%2Fpic25.nipic.com%2F20121127%2F2531170_130727257000_2.jpg", "des": "活动描述，活动描述，活动描述，活动描述"},
					{"name": "活动1", "srcUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526284048&di=be48e7e58ba20b5faf28d77cc83cc9e4&imgtype=jpg&er=1&src=http%3A%2F%2Fimg01.taopic.com%2F170801%2F267872-1FP1121P169.jpg", "des": "活动描述，活动描述，活动描述，活动描述"},
					{"name": "活动1", "srcUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526284048&di=be48e7e58ba20b5faf28d77cc83cc9e4&imgtype=jpg&er=1&src=http%3A%2F%2Fimg01.taopic.com%2F170801%2F267872-1FP1121P169.jpg", "des": "活动描述，活动描述，活动描述，活动描述"},
					{"name": "活动2", "srcUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525689346704&di=33e145f2be240a4b5ee58448619c1443&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dd822dad831c79f3d9becec73d2c8a764%2Ff9dcd100baa1cd116394ed07b312c8fcc3ce2df2.jpg", "des": "活动描述，活动描述，活动描述，活动描述"},
					{"name": "活动3", "srcUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525689346704&di=32d00563fbdeed7e1beab85c848c37c6&imgtype=0&src=http%3A%2F%2Fpic25.nipic.com%2F20121127%2F2531170_130727257000_2.jpg", "des": "活动描述，活动描述，活动描述，活动描述"},
					{"name": "活动1", "srcUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526284048&di=be48e7e58ba20b5faf28d77cc83cc9e4&imgtype=jpg&er=1&src=http%3A%2F%2Fimg01.taopic.com%2F170801%2F267872-1FP1121P169.jpg", "des": "活动描述，活动描述，活动描述，活动描述"},
					{"name": "活动1", "srcUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526284048&di=be48e7e58ba20b5faf28d77cc83cc9e4&imgtype=jpg&er=1&src=http%3A%2F%2Fimg01.taopic.com%2F170801%2F267872-1FP1121P169.jpg", "des": "活动描述，活动描述，活动描述，活动描述"},
					{"name": "活动2", "srcUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525689346704&di=33e145f2be240a4b5ee58448619c1443&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dd822dad831c79f3d9becec73d2c8a764%2Ff9dcd100baa1cd116394ed07b312c8fcc3ce2df2.jpg", "des": "活动描述，活动描述，活动描述，活动描述"},
					{"name": "活动3", "srcUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525689346704&di=32d00563fbdeed7e1beab85c848c37c6&imgtype=0&src=http%3A%2F%2Fpic25.nipic.com%2F20121127%2F2531170_130727257000_2.jpg", "des": "活动描述，活动描述，活动描述，活动描述"},
					{"name": "活动1", "srcUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526284048&di=be48e7e58ba20b5faf28d77cc83cc9e4&imgtype=jpg&er=1&src=http%3A%2F%2Fimg01.taopic.com%2F170801%2F267872-1FP1121P169.jpg", "des": "活动描述，活动描述，活动描述，活动描述"},
				]
	export default {
		data() {
			return {
				dataCount: 0,
				pageSize: 6,
				ajaxHistoryData: [],
				listShow: true,
				tab: 'tab1',
				couponList: [],
			}
		},
		components: {
			DiscountCoupon,
			NewApplication
		},
		created(){
      this.handleListApproveHistory();
    },
		methods: {
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
        this.ajaxHistoryData = couponList,
        this.dataCount = couponList.length;
        // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
        if(couponList.length < this.pageSize){
          this.couponList = this.ajaxHistoryData;
        }else{
          this.couponList = this.ajaxHistoryData.slice(0,this.pageSize);
        }
      },
      changepage(index) {
        var _start = ( index - 1 ) * this.pageSize;
        var _end = index * this.pageSize;
        this.couponList = this.ajaxHistoryData.slice(_start,_end);
      }
		}
	}
</script>

<style scoped lang="scss">
	.nav {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
	}

	i {
		cursor: pointer;
	}

	.la {
		font-size: 2.5rem !important;
		font-weight: bold !important;
	}

	.col {
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.nav.nav-pills .nav-item, .nav.nav-tabs .nav-item {
	  margin-left: 10px;
	}

	.align-between {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>