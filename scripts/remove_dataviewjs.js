// scripts/remove_dataviewjs.js

// 注册一个过滤器，在 Markdown 渲染之前执行
// 注册一个过滤器，在 Markdown 渲染之前执行，设置较高优先级 (较低数字)
hexo.extend.filter.register('before_post_render', function(data){
  // 匹配包含 dataviewjs 代码块的整个 HTML 注释块
  // <!-- ... ```dataviewjs ... ``` ... -->
  const regex = /<!--[\s\S]*?```dataviewjs\s*[\s\S]*?```[\s\S]*?-->/g;

  const originalContent = data.content;
  data.content = originalContent.replace(regex, '');

  // 简单的日志记录，检查是否有内容被移除
  if (data.content.length < originalContent.length) {
    // 记录被修改的文章路径
    // 记录被修改的文章路径
    console.log(`[Filter Debug - Priority 1] Removed dataviewjs block(s) from: ${data.source}`);
  }

  return data;
}, 1); // <-- Add priority here