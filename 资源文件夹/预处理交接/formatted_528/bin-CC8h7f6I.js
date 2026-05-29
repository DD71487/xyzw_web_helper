import { _ as J } from "./ServerRoleList-K5eSJYby.js";
import {
  k as P,
  q,
  x as H,
  s as W,
  r as f,
  z as X,
  e as I,
  u as c,
  aU as G,
  w as i,
  h as _,
  a as d,
  b as m,
  A as K,
  Q as N,
  i as g,
  N as Y,
  aV as C,
  au as Z,
  c as ee,
  F as te,
  g as ne,
  t as T,
  aL as x,
  aW as oe,
  H as re,
  aX as se,
} from "./index-BUwMeHKm.js";
import { P as ae, U as le } from "./index-CwMhWr3d.js";
import { C as ie } from "./CloudUpload-CqW5D9SP.js";
import { L as de, a as ue } from "./index-Dne5XMpP.js";
import { _ as ce } from "./_plugin-vue_export-helper-DlAUqK2U.js";
import "./legionWar-5YonzZw2.js";
import "./Search-Bova80rr.js";
import "./index-CBMhjSrw.js";
import "./index-C0rjgzG7.js";
import "./grid-col-CkMxf-H1.js";
import "./index-Dnomu2Fp.js";
import "./render-function-CNHdKMZn.js";
const me = { class: "form-actions" },
  pe = {
    style: {
      display: "flex",
      "justify-content": "space-between",
      "align-items": "center",
      width: "100%",
    },
  },
  ve = { style: { "word-break": "break-all" } },
  ge = P({
    __name: "bin",
    emits: ["cancel", "ok"],
    setup(fe, { emit: $ }) {
      const D = $,
        { storeArrayBuffer: R } = q(),
        F = () => {
          ((p.value = []), D("cancel"));
        },
        h = (t) => {
          p.value.splice(t, 1);
        },
        k = H(),
        l = W(),
        z = f(!1),
        b = X({
          name: "",
          server: "",
          wsUrl: "",
          importMethod: "",
          nameTemplate: "{name}-{index}-{id}",
        }),
        p = f([]),
        y = f([]),
        A = f(null),
        L = f(""),
        w = f(null),
        j = new ae({ concurrency: 1, interval: 1e3 }),
        O = (t) => {
          if (!w.value) {
            l.error("Bin数据丢失，请重新上传");
            return;
          }
          try {
            const e = { ...w.value };
            e.serverId = t.serverId;
            const a = x.encode(e);
            let o = Number(t.serverId),
              r = 0;
            o >= 2e6
              ? ((r = 2), (o -= 2e6))
              : o >= 1e6 && ((r = 1), (o -= 1e6));
            const n = `bin-${o - 27}服-${r}-${t.roleId}-${t.name}.bin`;
            (Q(n, a), l.success(`已开始下载: ${n}`));
          } catch (e) {
            (console.error("下载失败", e), l.error("下载失败: " + e.message));
          }
        },
        V = async (t) => {
          if (!w.value) {
            l.error("Bin数据丢失，请重新上传");
            return;
          }
          try {
            const e = { ...w.value };
            e.serverId = t.serverId;
            const a = x.encode(e),
              o = oe(a),
              r = await re(a),
              s = t.name || `角色_${t.roleId}`;
            if (!(await R(o, a)))
              throw new Error(
                "保存BIN数据到IndexedDB失败，请检查浏览器存储空间或权限",
              );
            let u = Number(t.serverId),
              v = 0;
            u >= 2e6
              ? ((v = 2), (u -= 2e6))
              : u >= 1e6 && ((v = 1), (u -= 1e6));
            const S = u - 27,
              B = (b.nameTemplate || "{name}-{index}-{id}")
                .replace(/{name}/g, () => s)
                .replace(/{index}/g, () => String(v))
                .replace(/{id}/g, () => String(t.roleId))
                .replace(/{server}/g, () => String(S) + "服");
            if (p.value.some((U) => U.roleId === t.roleId && U.name === B)) {
              l.warning(`角色 ${B} 已在待添加列表中`);
              return;
            }
            (p.value.push({
              id: o,
              roleId: t.roleId,
              token: r,
              name: B,
              server: String(S) + "服",
              roleIndex: v,
              wsUrl: b.wsUrl || "",
              importMethod: "bin",
            }),
              l.success(`已添加角色: ${B}`));
          } catch (e) {
            (console.error("添加角色失败", e),
              l.error("添加角色失败: " + e.message));
          }
        },
        E = (t) => (
          j.add(async () => {
            console.log("上传文件数据:", t);
            const e = new FileReader();
            ((e.onload = async (a) => {
              var r;
              const o = (r = a.target) == null ? void 0 : r.result;
              A.value = o;
              try {
                const s = await se(o),
                  n = JSON.parse(s);
                (n && typeof n == "object"
                  ? (y.value = Object.values(n).sort(
                      (u, v) => v.power - u.power,
                    ))
                  : (y.value = []),
                  console.log("Server List:", n),
                  l.success("获取服务器角色列表成功，请选择角色添加"));
              } catch (s) {
                (console.error("Failed to get server list", s),
                  l.warning("获取服务器角色列表失败，请检查文件是否正确"),
                  (y.value = []));
              }
              try {
                const s = x.parse(o);
                let n = s.getData();
                (!n &&
                  s._raw &&
                  (console.log("Bin文件 getData() 为空，尝试使用 _raw"),
                  (n = { ...s._raw })),
                  console.log("Bin文件解析:", n),
                  (L.value = JSON.stringify(n, null, 2)),
                  (w.value = n));
              } catch (s) {
                (console.error("Bin文件解析失败", s),
                  (L.value = "Bin文件解析失败: " + (s.message || s)));
              }
            }),
              (e.onerror = () => {
                l.error("读取文件失败，请重试");
              }),
              e.readAsArrayBuffer(t));
          }),
          !1
        ),
        M = async () => {
          if (p.value.length === 0) {
            l.error("请先上传bin文件！");
            return;
          }
          (p.value.forEach((t) => {
            const e = k.gameTokens.find((a) => a.id === t.id);
            e
              ? (console.log("移除同名token:", e),
                k.updateToken(e.id, { ...t }))
              : k.addToken({ ...t });
          }),
            console.log("当前Token列表:", k.gameTokens),
            l.success("Token添加成功"),
            (p.value = []),
            D("ok"));
        },
        Q = (t, e) => {
          const a = new Blob([new Uint8Array(e)], {
              type: "application/octet-stream",
            }),
            o = URL.createObjectURL(a),
            r = document.createElement("a");
          ((r.href = o),
            (r.download = t),
            document.body.appendChild(r),
            r.click(),
            document.body.removeChild(r),
            URL.revokeObjectURL(o));
        };
      return (t, e) => {
        const a = le,
          o = J,
          r = ue,
          s = de;
        return (
          _(),
          I(
            c(G),
            {
              model: b,
              "label-placement": "top",
              size: "large",
              "show-label": !0,
            },
            {
              default: i(() => [
                d("div", me, [
                  m(
                    c(N),
                    {
                      type: "primary",
                      size: "large",
                      block: "",
                      loading: z.value,
                      onClick: M,
                    },
                    {
                      icon: i(() => [
                        m(c(Y), null, { default: i(() => [m(c(ie))]), _: 1 }),
                      ]),
                      default: i(() => [e[1] || (e[1] = g(" 添加Token ", -1))]),
                      _: 1,
                    },
                    8,
                    ["loading"],
                  ),
                  c(k).hasTokens
                    ? (_(),
                      I(
                        c(N),
                        { key: 0, size: "large", block: "", onClick: F },
                        {
                          default: i(() => [
                            ...(e[2] || (e[2] = [g(" 取消 ", -1)])),
                          ]),
                          _: 1,
                        },
                      ))
                    : K("", !0),
                ]),
                m(
                  c(C),
                  { label: "bin文件", "show-label": !0 },
                  {
                    default: i(() => [
                      m(a, {
                        multiple: "",
                        accept: "*.bin,*.dmp",
                        onBeforeUpload: E,
                        draggable: "",
                        dropzone: "",
                        placeholder: "粘贴Token字符串...",
                        clearable: "",
                      }),
                    ]),
                    _: 1,
                  },
                ),
                m(
                  c(C),
                  { label: "角色命名格式", "show-label": !0 },
                  {
                    feedback: i(() => [
                      ...(e[3] ||
                        (e[3] = [
                          g(
                            " 支持变量: {name}角色名, {id}角色ID, {index}角色序号, {server}区服 ",
                            -1,
                          ),
                        ])),
                    ]),
                    default: i(() => [
                      m(
                        c(Z),
                        {
                          value: b.nameTemplate,
                          "onUpdate:value":
                            e[0] || (e[0] = (n) => (b.nameTemplate = n)),
                          placeholder: "{name}-{index}-{id}",
                        },
                        null,
                        8,
                        ["value"],
                      ),
                    ]),
                    _: 1,
                  },
                ),
                m(
                  o,
                  {
                    data: y.value,
                    "max-height": "50vh",
                    onAdd: V,
                    onDownload: O,
                  },
                  null,
                  8,
                  ["data"],
                ),
                m(s, null, {
                  default: i(() => [
                    (_(!0),
                    ee(
                      te,
                      null,
                      ne(
                        p.value,
                        (n, u) => (
                          _(),
                          I(
                            r,
                            { key: u },
                            {
                              default: i(() => [
                                d("div", pe, [
                                  d("div", null, [
                                    e[4] ||
                                      (e[4] = d(
                                        "strong",
                                        null,
                                        "角色名称:",
                                        -1,
                                      )),
                                    g(" " + T(n.name || "未命名角色"), 1),
                                    e[5] || (e[5] = d("br", null, null, -1)),
                                    e[6] ||
                                      (e[6] = d("strong", null, "Token:", -1)),
                                    d("span", ve, T(n.token), 1),
                                    e[7] || (e[7] = d("br", null, null, -1)),
                                    e[8] ||
                                      (e[8] = d("strong", null, "服务器:", -1)),
                                    g(" " + T(n.server || "未指定"), 1),
                                    e[9] || (e[9] = d("br", null, null, -1)),
                                    e[10] ||
                                      (e[10] = d(
                                        "strong",
                                        null,
                                        "角色序号:",
                                        -1,
                                      )),
                                    g(" " + T(n.roleIndex), 1),
                                  ]),
                                  m(
                                    c(N),
                                    {
                                      type: "error",
                                      size: "small",
                                      onClick: (v) => h(u),
                                    },
                                    {
                                      default: i(() => [
                                        ...(e[11] ||
                                          (e[11] = [g(" 删除 ", -1)])),
                                      ]),
                                      _: 1,
                                    },
                                    8,
                                    ["onClick"],
                                  ),
                                ]),
                              ]),
                              _: 2,
                            },
                            1024,
                          )
                        ),
                      ),
                      128,
                    )),
                  ]),
                  _: 1,
                }),
              ]),
              _: 1,
            },
            8,
            ["model"],
          )
        );
      };
    },
  }),
  $e = ce(ge, [["__scopeId", "data-v-bac29de9"]]);
export { $e as default };
