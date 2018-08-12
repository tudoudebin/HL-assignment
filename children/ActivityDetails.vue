<template>
	<div>
		<i class="la la-mail-reply" @click="returnPre"></i>
		<Row class="m-active">
		<Col :xs="24" :sm="12" :md="8" :lg="8" class="pro">
			<div class="m-pro">
				<h3 class="m-name">
					{{formItem.name}}
				</h3>
				<div class="m-img">
					<img :src="formItem.imgsrc" alt="活动封面">
				</div>
				<div class="m-des">
					<div class="left">
						{{formItem.des}}
					</div>
				</div>
			</div>
		</Col>
		<Col :xs="{ span: 24, offset: 0 }" :sm="{ span: 24, offset: 0 }" :md="{ span: 16, offset: 1 }" :lg="{ span: 15, offset: 1 }" class="pro-details">
			<div class="m-con">
				<Form :model="formItem" :label-width="150">
					<FormItem label="券名">
            <Input v-model="formItem.name" placeholder="券名"></Input>
        	</FormItem>
        	<FormItem label="活动描述">
            <Input v-model="formItem.des" placeholder="活动描述"></Input>
        	</FormItem>
        	<FormItem label="封面图片">
            <Upload 
            	action="//jsonplaceholder.typicode.com/posts/"
            	:format="['jpg','jpeg','png']">
				        <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
				    </Upload>
        	</FormItem>
        	<FormItem label="优惠券有效时间段">
            <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
        	</FormItem>
        	<FormItem label="使用范围">
            <RadioGroup v-model="formItem.area">
              <Radio label="all">全国</Radio>
              <Radio label="shop">门店</Radio>
            </RadioGroup>
        	</FormItem>
        	<FormItem label="发送渠道">
            <Select v-model="formItem.channel">
                <Option value="duanxin">短信</Option>
                <Option value="weixin">微信</Option>
                <Option value="edm">EDM</Option>
            </Select>
        	</FormItem>
        	<FormItem label="优惠券描述">
            <Input v-model="formItem.coupoDes" placeholder="优惠券描述"></Input>
        	</FormItem>
        	<FormItem label="券号">
            <RadioGroup v-model="formItem.ticket">
              <Radio label="random">随机生成</Radio>
              <Radio label="shop">
              	<Input v-model="value" placeholder="上传券号" style="width: 200px"></Input>
              </Radio>
            </RadioGroup>
        	</FormItem>
        	<FormItem label="数量">
            <RadioGroup v-model="formItem.num">
              <Radio label="nosupper">没有上限</Radio>
              <Radio label="number">
              	<Input v-model="supperNumber" placeholder="数量上限" style="width: 200px"></Input>
              </Radio>
            </RadioGroup>
        	</FormItem>
        	<FormItem>
            <Button type="primary">保存</Button>
            <Button type="ghost" style="margin-left: 8px">重置</Button>
        	</FormItem>
				</Form>
			</div>
		</Col>
	</Row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				formItem: {}
			}
		},
		methods: {
			returnPre() {
				this.$emit('changeTableShow', true)
			}
		}
	}
</script>

<style scoped lang="scss">

	i {
		cursor: pointer;
	}

	.m-active {
		margin-top: 15px;
	}

	.la {
		font-size: 2.5rem !important;
		font-weight: bold !important;
	}

	.ivu-icon {
		font-family: Ionicons !important;
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
		text-align: center;
		vertical-align: middle;
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

	.pro-details {
		// padding-left: 40px;
	}

	.m-con {
		background: #fff;
		padding: 20px;
		border: 1px solid #dddee1;
    border-color: #e9eaec;
    border-radius: 4px;
    font-size: 14px;
	}
</style>