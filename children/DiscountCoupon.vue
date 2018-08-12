<template>
	<div class="m-pro">
		<h3 class="m-name">
			{{couponDetil.name}}
		</h3>
		<div class="m-img">
			<img :src="couponDetil.srcUrl">
		</div>
		<div class="m-des">
			<div class="left">
				{{couponDetil.des}}
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		components: {
			name: "DiscountCoupon",
		},
		props: {
			couponDetil: {
				default: {},
			},
			index: {
				dataType: Number,
			}
		},
	}
</script>

<style scoped lang="scss">
	.m-pro {
		&:hover {
			cursor: pointer;
			box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    	transform: translate3d(0, -4px, 0);
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