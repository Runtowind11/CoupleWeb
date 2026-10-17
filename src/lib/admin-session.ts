// “本次会话是通过登录页登录的”标记。
//
// 存放位置：sessionStorage（按标签页存活），以此兑现设计规则——
// 关闭标签页 / 关闭浏览器后再进入网站，必须重新登录。
//
// 不要改回会话级 cookie：手机浏览器关闭标签页并不会结束“浏览器会话”，
// 杀掉浏览器后台后往往还会恢复 cookie，导致标记仍在、不再要求登录，
// 与设计规则不符（2026-10-18 曾短暂如此，已改回）。
const NAME = "admin_session";

export function hasAdminSession(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return Boolean(sessionStorage.getItem(NAME));
  } catch {
    return false;
  }
}

export function markAdminSession() {
  try {
    sessionStorage.setItem(NAME, "1");
  } catch {
    /* ignore */
  }
  // 顺带清掉曾短暂用过的同名会话级 cookie，避免旧标记滞留
  clearLegacyCookie();
}

export function clearAdminSession() {
  try {
    sessionStorage.removeItem(NAME);
  } catch {
    /* ignore */
  }
  clearLegacyCookie();
}

function clearLegacyCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `${NAME}=; path=/; max-age=0`;
}
