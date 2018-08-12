<template>
	<div>
		<Row :gutter="16" v-if="showList">
			<Col class-name="col" :xs="24" :sm="12" :md="8" :lg="8" class="pro" v-for="(item, index) in applactionList" :key="index">
				<div class="m-pro">
					<h3 class="m-name">
						{{item.name}}
					</h3>
					<div class="m-img">
						<img :src="item.srcUrl">
					</div>
					<div class="m-des">
						<div class="left">
							{{item.des}}
						</div>
					</div>
					<div class="add-app">
						<i class="la la-plus i-add" @click="showList = false"></i>
					</div>
				</div>
			</Col>
		</Row>
		<Page :total="dataCount" :page-size="pageSize" show-total  @on-change="changepage" v-if="showList"></Page>
		<ActivityApplicationDetails v-if="!showList"/>
	</div>
</template>

<script>
	import ActivityApplicationDetails from './ActivityApplicationDetails'
	const applactionList = [
					{"name": "体验券1", "srcUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526284048&di=be48e7e58ba20b5faf28d77cc83cc9e4&imgtype=jpg&er=1&src=http%3A%2F%2Fimg01.taopic.com%2F170801%2F267872-1FP1121P169.jpg", "des": "活动描述，活动描述，活动描述，活动描述"},
					{"name": "体验券2", "srcUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525689346704&di=33e145f2be240a4b5ee58448619c1443&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dd822dad831c79f3d9becec73d2c8a764%2Ff9dcd100baa1cd116394ed07b312c8fcc3ce2df2.jpg", "des": "活动描述，活动描述，活动描述，活动描述"},
					{"name": "体验券1", "srcUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526284048&di=be48e7e58ba20b5faf28d77cc83cc9e4&imgtype=jpg&er=1&src=http%3A%2F%2Fimg01.taopic.com%2F170801%2F267872-1FP1121P169.jpg", "des": "活动描述，活动描述，活动描述，活动描述"},
					{"name": "体验券2", "srcUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525689346704&di=33e145f2be240a4b5ee58448619c1443&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dd822dad831c79f3d9becec73d2c8a764%2Ff9dcd100baa1cd116394ed07b312c8fcc3ce2df2.jpg", "des": "活动描述，活动描述，活动描述，活动描述"},
					{"name": "体验券1", "srcUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526284048&di=be48e7e58ba20b5faf28d77cc83cc9e4&imgtype=jpg&er=1&src=http%3A%2F%2Fimg01.taopic.com%2F170801%2F267872-1FP1121P169.jpg", "des": "活动描述，活动描述，活动描述，活动描述"},
					{"name": "体验券2", "srcUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525689346704&di=33e145f2be240a4b5ee58448619c1443&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dd822dad831c79f3d9becec73d2c8a764%2Ff9dcd100baa1cd116394ed07b312c8fcc3ce2df2.jpg", "des": "活动描述，活动描述，活动描述，活动描述"},
					{"name": "体验券1", "srcUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526284048&di=be48e7e58ba20b5faf28d77cc83cc9e4&imgtype=jpg&er=1&src=http%3A%2F%2Fimg01.taopic.com%2F170801%2F267872-1FP1121P169.jpg", "des": "活动描述，活动描述，活动描述，活动描述"},
					{"name": "体验券2", "srcUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525689346704&di=33e145f2be240a4b5ee58448619c1443&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dd822dad831c79f3d9becec73d2c8a764%2Ff9dcd100baa1cd116394ed07b312c8fcc3ce2df2.jpg", "des": "活动描述，活动描述，活动描述，活动描述"},
				]
	export default {
		components: {
			ActivityApplicationDetails,
		},
		created(){
      this.handleListApproveHistory();
    },
		methods: {
			// 获取历史记录信息
      handleListApproveHistory(){
          
        // 保存取到的所有数据
        this.ajaxHistoryData = applactionList,
        this.dataCount = applactionList.length;
        // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
        if(applactionList.length < this.pageSize){
          this.applactionList = this.ajaxHistoryData;
        }else{
          this.applactionList = this.ajaxHistoryData.slice(0,this.pageSize);
        }
      },
      changepage(index) {
        var _start = ( index - 1 ) * this.pageSize;
        var _end = index * this.pageSize;
        this.applactionList = this.ajaxHistoryData.slice(_start,_end);
      }
		},
		data() {
			return {
				dataCount: 0,
				pageSize: 6,
				ajaxHistoryData: [],
				showList: true,
				applactionList: [],
			}
		}
	}
</script>

<style scoped lang="scss">
	.col {
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.m-pro {
		position: relative;
		
		.add-app {
			position: absolute;
			height: 100%;
			width: 100%;
			background: rgba(0, 0, 0, .7);
			text-align: center;
			z-index: 100;
			top: 0;
			left: 0;
			color: #fff;
			display: none;
		}

		.i-add {
			font-size: 4rem !important;
		}

		&:hover {
			cursor: pointer;

			.add-app {
				display: block;
				line-height: 280px;
			}
		}
	}

	.ivu-icon {
		margin: 0 8px;
	}


	.m-des {
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
	}

	.left {
		width: 100%;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.right {
		width: 85px;
		margin-left: 10px;
		i {
			font-size: 1.5rem !important;
		}
		text-align: center;
	}

	.m-name {
		height: 40px;
		line-height: 40px;
		background: #191a1c;
		color: #ffb822;
		text-align: center;
	}

	.m-img {
		width: 100%;
		height: 150px;
		overflow: hidden;
		background: #e5e5e5;
		display: flex;
		justify-content: center;
		align-items: center;
		
		img {
			max-width: 100%;
			max-height: 100%;
		}
	}

	.m-des {
		height: 80px;
		width: 100%;
		background: #191a1c;
		color: #fff;
	}
</style>