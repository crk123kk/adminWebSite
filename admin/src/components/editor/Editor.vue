<template>
    <div id="myEditor">

    </div>
</template>

<script setup>
import { onMounted, defineEmits, defineProps } from 'vue';
import E from 'wangeditor'

const props = defineProps({
    content: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['onChange'])

onMounted(() => {
    const editor = new E('#myEditor')
    editor.create()

    // 设置初始值
    props.content && editor.txt.html(props.content)


    editor.config.onchange = (newHtml) => {
        // 将变动传递出去
        emit('onChange', newHtml)
    }
})

</script>
<style lang='scss' scoped></style>