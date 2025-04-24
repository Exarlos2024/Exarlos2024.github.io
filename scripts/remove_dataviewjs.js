// scripts/remove_dataviewjs.js

// 注册一个过滤器，在 Markdown 渲染之前执行
hexo.extend.filter.register('before_post_render', function(data){
  // 匹配 Markdown 中的 dataviewjs 代码块
  // ```dataviewjs ... ```
  const regex = /```dataviewjs\s*[\s\S]*?```/g;

  const originalContent = data.content;
  data.content = originalContent.replace(regex, '');

  // 简单的日志记录，检查是否有内容被移除
  if (data.content.length < originalContent.length) {
    // 记录被修改的文章路径
    console.log(`[Filter Debug] Removed dataviewjs block(s) from: ${data.source}`);
  }

  return data;
});