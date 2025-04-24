// scripts/remove_dataviewjs.js

// 注册一个过滤器，在 Markdown 渲染之前执行
hexo.extend.filter.register('before_post_render', function(data) {
  // 使用正则表达式匹配并移除 dataviewjs 代码块
  // 正则表达式解释:
  // ```dataviewjs  匹配代码块开始
  // (\s|\S)*?    匹配任何字符（包括换行符），非贪婪模式
  // ```           匹配代码块结束
  // /gm           全局匹配 (g) 和多行匹配 (m)
  data.content = data.content.replace(/```dataviewjs(\s|\S)*?```/gm, '');
  return data;
});