使用

```javascript
<SuperEditor v-model="content" ref="superEditor"></SuperEditor>

import SuperEditor from '@/components/super-editor/index.vue'
components: {  SuperEditor }
```

通常填充操作需要手动处理，设置content无效
需如下操作
```javascript
this.$refs.superEditor.setContent(xxxxx)
```

