<template>
	<div>
		<i class="la la-mail-reply" @click="changeTableShow"></i>
		<div class="m-des-body">
			<label>
				<h4>活动类型</h4>
				<p>新品彩妆试妆体验</p>
			</label>
			<label>
				<h4>剩余优惠券数</h4>
				<p>不足</p>
				<i class="la la-times-circle"></i>
			</label>
			<label>
				<h4>活动描述</h4>
				<p>对XX新品的试妆活动</p>
			</label>
			<label>
				<h4>活动门店</h4>
				<p>门店1</p>
				<i class="la la-check-circle"></i>
			</label>
			<label>
				<h4>活动时间段</h4>
				<p>2018-04-20至2018-05-20</p>
				<i class="la la-check-circle"></i>
			</label>
			<label>
				<h4>活动人数</h4>
				<p>20</p>
				<i class="la la-check-circle"></i>
			</label>
			<label>
				<h4>活动内容</h4>
				<p>活动内容，活动内容，活动内容，活动内容</p>
			</label>
			<label>
				<Button type="primary" @click="changeTableShow">通过</Button>
				<Button type="primary" @click="changeTableShow">驳回</Button>
				<Button type="primary" @click="changeTableShow">不通过</Button>
				<Input v-model="value" placeholder="不通过和驳回理由" style="width: 300px"></Input>
			</label>
		</div>
	</div>
</template>

<script>
	export default {
		components: {
			
		},
		data() {
			return {
				value: '',
			}
		},
		methods: {
			changeTableShow() {
				this.$emit('changeTableShow', true)
			}
		}
	}
</script>

<style scoped lang="scss">
	i {
		cursor: pointer;
	}

	.la {
		font-size: 2.5rem !important;
		font-weight: bold !important;
	}

	.la-times-circle {
		font-size: 1.8rem !important;
		color: #f5516c;
	}

	.la-check-circle {
		font-size: 1.8rem !important;
	}

	.m-des-body {
		width: 80%;
		margin: 0 auto;
	}

	label {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		min-height: 50px;

		button {
			margin-right: 15px;
		}

		&:nth-of-type(odd) {
			background: #f2f3f8;
		}

		h4 {
			font-size: 1.18rem;
			margin-right: 15px;
			width: 20%;
			padding-left: 10px;
		}

		p {
			width: 70%;
		}

		i {

		}
	}
</style>