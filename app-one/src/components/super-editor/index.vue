<template>
  <div class="super-editor">
    <div :id="id"></div>
  </div>
</template>

<script>
import { tinymce } from './loadScript'
import { toolbar, plugins } from './config'

export default {
  name: 'index',
  data () {
    return {
      id: 'tinymce-' + Date.now() + Math.floor(Math.random() * 1000),
      editor: null,
      hasChange: false,
      hasInit: false
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: { type: String, default: '' },
    setting: { type: Object, default: () => ({}) },
    setup: { type: Function, default: null }
  },
  watch: {
    value (val) {
      if (!this.hasChange && this.hasInit) {
        if (!this.editor || !this.editor.initialized) return
        if (val === null) return this.resetContent('')
        this.setContent(val)
      }
      val && this.editor && this.initSetup(this.editor)
    }
  },
  methods: {
    async initEditor () {
      const result = await tinymce.init({
        target: this.$el,
        selector: '#' + this.id,
        plugins: plugins,
        toolbar: toolbar,
        menubar: false,
        branding: false,
        height: 400,
        language: 'zh_CN',
        default_link_target: '_blank',
        // 此项设置为空，则从word复制过来的样式，全部不保留 建议保留的设置：color background backgroud-color text-align font-size
        paste_retain_style_properties: '',
        content_css: 'https://lib.baomitu.com/tinymce/4.9.6/skins/lightgray/content.min.css',
        content_style: 'img,video {max-width:100%} *,*:after{box-sizing:border-box;}',
        fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
        formats: { blockquote: { block: 'blockquote', styles: { paddingLeft: '15px', borderLeft: '3px solid #ddd' } } },
        // images_upload_handler: '' // 上传图片
        // 上传文件
        file_picker_callback: this.file_picker_callback,
        setup: this.initSetup,
        plugin_preview_width: '1200',
        ...this.setting
      })
      this.editor = result[0] || null
    },
    initSetup (editor) {
      this.setup && this.setup(editor)
      editor.on('init', () => {
        this.hasInit = true
        this.setContent(this.value, editor)
      })
      editor.on('NodeChange Change KeyUp SetContent', (e) => {
        // this.onChanged(e, editor)
        this.hasChange = true
        this.onChanged(e, editor)
      })
    },
    // 设置内容
    setContent (val, editor) {
      if (!editor) editor = this.editor
      return editor.setContent(val)
    },
    // 重置内容
    resetContent (val, editor) {
      if (!editor) editor = this.editor
      if (editor.resetContent) return editor.resetContent(val) || editor.setContent('')
      editor.setContent(val)
      editor.setDirty(false)
      editor.undoManager.clear()
    },
    // 编辑器的内容变更追踪
    onChanged (e, editor) {
      if (!editor) editor = this.editor
      const content = editor.getContent()
      this.$emit('change', content)
    },
    file_picker_callback (callback, value, meta) {
      const filetypeMaps = {
        image: '.jpg, .jpeg, .png, .gif, .webp',
        media: '.mp3, .mp4',
        file: ''
      }

      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', filetypeMaps[meta.filetype])
      input.click()
      let xhr, formData
      input.onchange = () => {
        const file = input.files[0]
        const fileName = file.name.lastIndexOf('.')
        const fileNameLength = file.name.length
        // 截取后缀名
        const fileFormat = file.name.substring(fileName + 1, fileNameLength)
        formData = new FormData()
        formData.append('file_up', file, file.name)
        formData.append('bucket', 'live')
        formData.append('content_type', fileFormat)

        xhr = new XMLHttpRequest()
        xhr.open('post', '/xlive/internal/live-admin/v1/upload/file_internal')
        xhr.onload = () => {
          if (xhr.status !== 200) {
            this.$message({ type: 'error', message: 'HTTP Error: ' + xhr.status + ' : ' + xhr.statusText, center: true })
            return false
          }
          const result = JSON.parse(xhr.responseText)

          if (result && result.code !== 0) {
            this.$message({ type: 'error', message: '上传失败，请重试！', center: true })
            return false
          }

          callback(result.data.url, { text: file.name, title: file.name })
        }
        xhr.send(formData)
      }
    }
  },
  mounted () {
    !this.editor && this.initEditor()
  },
  updated () {
    this.editor && this.editor.render()
  },
  beforeDestroy () {
    this.editor && this.editor.remove()
  }
}
</script>

<style scoped lang="scss">
.super-editor {
  ::v-deep .mce-tinymce {
    box-sizing: border-box;
    border-radius: 4px;
  }
}
</style>
