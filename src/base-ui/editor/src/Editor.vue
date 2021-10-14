<template>
  <div
    ref="editorRef"
    class="hy-editor"
    :style="{ width: width ? `${width}px` : '100%' }"
  ></div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import type Editor from 'wangeditor'
import WangEditor from 'wangeditor'
export interface EditorInfo {
  html: string
  text: string
}

export default defineComponent({
  props: {
    // 双向绑定的数据
    value: {
      type: String,
      default: '',
    },
    width: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 500,
    },
    zIndex: {
      type: Number,
      default: 1,
    },
    focus: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const editorRef = ref<HTMLDivElement | null>(null)
    const isInitContent = ref<boolean>(false)
    const content = reactive<EditorInfo>({
      html: '',
      text: '',
    })
    // WangEditor的一个示例
    const instance = ref<Editor | null>(null)

    onMounted(() => {
      createWangEditor()
    })

    const createWangEditor = () => {
      // WangEditor的构造方法需要传入DOM Selector，此处即可使用ref
      instance.value = new WangEditor(editorRef.value)
      setEditorConfig()
      instance.value.create()
      // create 之后才能初始化
      initEditorContent(props.value)
    }

    onBeforeUnmount(() => {
      if (!instance.value) return
      instance.value.destroy()
      instance.value = null
    })

    const initEditorContent = (htmlStr: string, isFocus = false) => {
      if (!instance.value) return
      const editor: Editor = instance.value as Editor
      editor.config.focus = isFocus
      if (!htmlStr) return
      isInitContent.value = true
      editor.txt.html(htmlStr)
    }

    const setEditorConfig = () => {
      if (!instance.value) return
      const editor: Editor = instance.value as Editor
      // 设置编辑区域高度为 500px
      editor.config.height = props.height
      // 设置 z-index
      editor.config.zIndex = props.zIndex
      // 取消自动 foucs
      editor.config.focus = props.focus
      // 配置 onchange 的回调
      editor.config.onchange = (newHtml: string) => {
        content.html = newHtml
        content.text = editor.txt.text()
        console.log(newHtml)
        // 初始值填入也会触发此回调，故排除初次重复赋值
        if (!isInitContent.value) {
          // 发射最新html值，给到父组件 Chat.vue 中的 htmlString
          emit('update:value', content.html)
        }
        // 最后将是否初始值标记为 false
        isInitContent.value = false
      }
      // 配置触发 onChange 的时间频率，默认为 200ms
      editor.config.onchangeTimeout = 500 // 修改为 500 ms
      // 配置菜单栏，删减菜单，调整顺序
      editor.config.menus = [
        'head',
        'bold',
        'fontSize',
        'fontName',
        'italic',
        'underline',
        'strikeThrough',
        'indent',
        'lineHeight',
        'foreColor',
        'backColor',
        'link',
        'list',
        // 'todo',
        'justify',
        'quote',
        // 'emoticon',
        // 'image',
        // 'video',
        // 'table',
        'code',
        'splitLine',
        'undo',
        'redo',
      ]
    }

    return {
      editorRef,
    }
  },
})
</script>

<style scoped lang="less">
.hy-editor {
  margin-top: 20px;
  text-align: left;
}
</style>
