// “本次会话是通过登录页登录的”标记。
//
// 为什么用会话级 cookie 而不是 sessionStorage：
// sessionStorage 是「按标签页」的，手机浏览器回收/恢复标签页时会连标记一起清掉，
// 于是 SessionValidator 会把合法登录误判成异常会话并登出（图标消失、点管理被弹回登录页）。
// 会话级 cookie 在刷新、切后台、标签页被回收后都还在，只有浏览器整体退出才失效——
// 即「关掉浏览器才需要重新登录」。
const NAME = "admin_session";

export function hasAdminSession(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie
    .split("; ")
    .some((c) => c.startsWith(`${NAME}=`) && c.length > NAME.length + 1);
}

export function markAdminSession() {
  // 不写 max-age / expires → 会话级 cookie
  document.cookie = `${NAME}=1; path=/; samesite=lax`;
}

export function clearAdminSession() {
  document.cookie = `${NAME}=; path=/; max-age=0`;
}
