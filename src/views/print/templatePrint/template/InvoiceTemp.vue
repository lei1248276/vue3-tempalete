<template>
  <div
    class="w-[720px] h-[440px] bg-[#f9f9f9] text-[12px] break-after-page"
    style="--border: #B16363; --text-primary: #b15B16; --text: #181818"
  >
    <div class="h-[88px]">
      <span class="inline-block w-3/4 h-full leading-[88px] align-middle text-[26px] text-[--border] text-center">XX市增值税XX票XX发票</span>
      <div class="inline-block w-1/4 h-full p-2 align-middle text-[--text-primary]">
        <div
          v-for="item in ['发票代码', '发票号码', '开票日期', '校验码']"
          :key="item"
        >
          <span class="inline-block w-[52px] text-justify [text-align-last:justify]">{{ item }}</span>
          <span class="text-[--text]">：xxxxxxxxxxxxxxxx</span>
        </div>
      </div>
    </div>

    <div class="h-[84px] border border-[--border] border-b-0 text-[--text-primary]">
      <span class="box-border inline-block h-full p-2 align-middle w-[4.16%]">购买方</span>
      <span class="box-border inline-block h-full p-2 align-middle border-l border-[--border] w-[62.5%]">
        <div
          v-for="item in ['名称', '纳税人识别号', '地址及电话', '开户行及账号']"
          :key="item"
        >
          <span class="inline-block w-[78px] text-justify [text-align-last:justify]">{{ item }}</span>
          <span class="text-[--text]">：xxxxxxxxxxxxxxxx</span>
        </div>
      </span>
      <span class="box-border inline-block h-full p-2 align-middle border-l border-[--border] w-[4.16%]">密码区</span>
      <span class="box-border inline-block h-full p-2 align-middle border-l border-[--border] w-1/4">...</span>
    </div>

    <div class="h-[113px] border border-[--border] border-b-0 text-[--text-primary] text-center">
      <div class="inline-block w-[29.16%] h-full p-2 align-middle text-[--text]">
        <p class="text-[--text-primary]">订单名称/订单号</p>
        <p
          v-for="(item, index) in data"
          :key="index"
          class="py-1"
        >
          {{ item.no }}
        </p>
      </div>

      <div class="inline-block w-[20.83%] h-full p-2 align-middle border-l border-[--border] text-[--text]">
        <p class="text-[--text-primary]">规格型号</p>
        <p
          v-for="(item, index) in data"
          :key="index"
          class="py-1"
        >
          {{ item.standard }}
        </p>
      </div>

      <div class="box-border inline-block h-full p-2 align-middle border-l border-[--border] text-[--text]">
        <p class="text-[--text-primary]">单位</p>
        <p
          v-for="(item, index) in data"
          :key="index"
          class="py-1"
        >
          {{ item.unit }}
        </p>
      </div>

      <div class="box-border inline-block h-full p-2 align-middle border-l border-[--border] text-[--text]">
        <p class="text-[--text-primary]">数量</p>
        <p
          v-for="(item, index) in data"
          :key="index"
          class="py-1"
        >
          {{ item.count }}
        </p>
      </div>

      <div class="inline-block w-[8.33%] h-full p-2 align-middle border-l border-[--border] text-[--text]">
        <p class="text-[--text-primary]">单价</p>
        <p
          v-for="(item, index) in data"
          :key="index"
          class="py-1"
        >
          {{ item.price }}
        </p>
      </div>

      <div class="inline-block w-[12.5%] h-full p-2 align-middle border-l border-[--border] text-[--text]">
        <p class="text-[--text-primary]">金额</p>
        <p
          v-for="(item, index) in data"
          :key="index"
          class="py-1"
        >
          {{ item.total }}
        </p>
      </div>

      <div class="inline-block h-full p-2 align-middle border-l border-[--border] text-[--text]">
        <p class="text-[--text-primary]">税率</p>
        <p
          v-for="(item, index) in data"
          :key="index"
          class="py-1"
        >
          {{ item.taxRate }}
        </p>
      </div>

      <div class="inline-block w-[8.33%] h-full p-2 align-middle border-l border-[--border] text-[--text]">
        <p class="text-[--text-primary]">税额</p>
        <p
          v-for="(item, index) in data"
          :key="index"
          class="py-1"
        >
          {{ item.tax }}
        </p>
      </div>
    </div>

    <div class="h-[35px] border border-[--border] border-b-0 text-[--text-primary]">
      <span class="inline-block w-[62.5%] h-full p-2 align-middle">价税合计（大写）玖佰元整</span>
      <span class="inline-block h-full p-2 align-middle">（小写）￥900.00</span>
    </div>

    <div class="h-[84px] border border-[--border] border-b-0 text-[--text-primary]">
      <span class="inline-block w-[4.16%] h-full p-2 align-middle">销售方</span>
      <div class="inline-block w-[58.33%] h-full p-2 align-middle border-l border-[--border]">
        <div
          v-for="item in ['名称', '纳税人识别号', '地址及电话', '开户行及账号']"
          :key="item"
        >
          <span class="inline-block w-[78px] text-justify [text-align-last:justify]">{{ item }}</span>
          <span class="text-[--text]">：xxxxxxxxxxxxxxxx</span>
        </div>
      </div>
      <span class="inline-block w-[4.16%] h-full p-2 align-middle border-l border-[--border]">备注</span>
      <span class="inline-block w-[29.16%] h-full p-2 align-middle border-l border-[--border]">...</span>
    </div>

    <div class="h-[34px] border-t border-t-[--border] text-[--text-primary]">
      <span class="inline-block w-1/4 h-full p-2 align-middle">收款人：
        <span class="text-[--text]">XXX公司</span>
      </span>
      <span class="inline-block w-1/4 h-full p-2 align-middle">复核：</span>
      <span class="inline-block w-1/4 h-full p-2 align-middle">开票人：</span>
      <span class="inline-block w-1/4 h-full p-2 align-middle">销售方：（章）</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'InvoiceTemp'
})

const data = [
  { no: '第一笔订单', standard: 'xxxxxxxxxxxxxxxx', unit: '台', count: 3, price: '￥100', total: '￥300.00', taxRate: 0, tax: '￥0.00' },
  { no: '第二笔订单', standard: 'xxxxxxxxxxxxxxxx', unit: '台', count: 3, price: '￥100', total: '￥300.00', taxRate: 0, tax: '￥0.00' },
  { no: '第三笔订单', standard: 'xxxxxxxxxxxxxxxx', unit: '台', count: 3, price: '￥100', total: '￥300.00', taxRate: 0, tax: '￥0.00' }
]
</script>
