import {
  k as D,
  q as Q,
  x as S,
  s as E,
  r as U,
  z as P,
  e as T,
  w as l,
  u as o,
  aU as R,
  a as s,
  b as t,
  A as h,
  i as c,
  N as q,
  Q as y,
  au as _,
  aV as k,
  c as H,
  g as W,
  F as j,
  a7 as G,
  a6 as J,
  aW as K,
  H as O,
  h as f,
  t as I,
} from "./index-BUwMeHKm.js";
import { P as X, U as Y } from "./index-CwMhWr3d.js";
import { C as Z } from "./CloudUpload-CqW5D9SP.js";
import { L as ee, a as oe } from "./index-Dne5XMpP.js";
import { _ as ne } from "./_plugin-vue_export-helper-DlAUqK2U.js";
import "./index-CBMhjSrw.js";
import "./index-C0rjgzG7.js";
import "./grid-col-CkMxf-H1.js";
import "./index-Dnomu2Fp.js";
import "./render-function-CNHdKMZn.js";
const ae = { class: "form-actions" },
  te = { style: { "word-break": "break-all" } },
  le = { class: "optional-fields" },
  re = D({
    __name: "singlebin",
    emits: ["cancel", "ok"],
    setup(se, { emit: C }) {
      const w = C,
        { storeArrayBuffer: $ } = Q(),
        z = () => {
          ((i.value = []), w("cancel"));
        },
        m = S(),
        u = E(),
        L = U(!1),
        r = P({ name: "", server: "", wsUrl: "", importMethod: "" }),
        i = U([]),
        V = new X({ concurrency: 1, interval: 1e3 }),
        A = (n) => {
          if (!n) return;
          n = n.trim();
          let e = n.match(/^bin-(.*?)服-([0-2])-([0-9]{6,12})-(.*)\.bin$/);
          return (
            console.log(e),
            e
              ? ((r.name = `${e[1]}_${e[2]}_${e[4]}`),
                { server: e[1], roleIndex: e[2], roleId: e[3], roleName: e[4] })
              : {
                  server: "",
                  roleIndex: "",
                  roleId: "",
                  roleName: r.name || "",
                }
          );
        },
        F = (n) => (
          V.add(async () => {
            console.log("上传文件数据:", n);
            const e = A(n.name),
              d = new FileReader();
            ((d.onload = async (v) => {
              var x, B;
              const p = (x = v.target) == null ? void 0 : x.result,
                a = K(p),
                g = await O(p),
                N =
                  e.roleName ||
                  ((B = n.name.split(".")) == null ? void 0 : B[0]) ||
                  "";
              if (!(await $(a, p))) {
                u.error("保存BIN数据到IndexedDB失败");
                return;
              }
              if (i.value.some((b) => b.id === a)) {
                u.error("上传列表中已存在同名角色! ");
                return;
              }
              (m.gameTokens.find((b) => b.id === a) &&
                u.warning(`角色"${N}"已存在，将更新该角色的Token`),
                u.success("Token读取成功，请检查角色名称等信息后提交"),
                i.value.push({
                  id: a,
                  token: g,
                  name: N,
                  server: e.server + "" + e.roleIndex || "",
                  wsUrl: r.wsUrl || "",
                  importMethod: "bin",
                }));
            }),
              (d.onerror = () => {
                u.error("读取文件失败，请重试");
              }),
              d.readAsArrayBuffer(n));
          }),
          !1
        ),
        M = async () => {
          if (i.value.length === 0) {
            u.error("请先上传bin文件！");
            return;
          }
          (i.value.forEach((n) => {
            const e = m.gameTokens.find((d) => d.id === n.id);
            e
              ? (console.log("移除同名token:", e),
                m.updateToken(e.id, { ...n }))
              : m.addToken({ ...n });
          }),
            console.log("当前Token列表:", m.gameTokens),
            u.success("Token添加成功"),
            (i.value = []),
            w("ok"));
        };
      return (n, e) => {
        const d = Y,
          v = oe,
          p = ee;
        return (
          f(),
          T(
            o(R),
            {
              model: r,
              "label-placement": "top",
              size: "large",
              "show-label": !0,
            },
            {
              default: l(() => [
                s("div", ae, [
                  t(
                    o(y),
                    {
                      type: "primary",
                      size: "large",
                      block: "",
                      loading: L.value,
                      onClick: M,
                    },
                    {
                      icon: l(() => [
                        t(o(q), null, { default: l(() => [t(o(Z))]), _: 1 }),
                      ]),
                      default: l(() => [e[3] || (e[3] = c(" 添加Token ", -1))]),
                      _: 1,
                    },
                    8,
                    ["loading"],
                  ),
                  o(m).hasTokens
                    ? (f(),
                      T(
                        o(y),
                        { key: 0, size: "large", block: "", onClick: z },
                        {
                          default: l(() => [
                            ...(e[4] || (e[4] = [c(" 取消 ", -1)])),
                          ]),
                          _: 1,
                        },
                      ))
                    : h("", !0),
                ]),
                t(
                  o(k),
                  { label: "游戏角色名称", "show-label": !0 },
                  {
                    default: l(() => [
                      t(
                        o(_),
                        {
                          value: r.name,
                          "onUpdate:value":
                            e[0] || (e[0] = (a) => (r.name = a)),
                          placeholder: "例如：主号战士",
                          clearable: "",
                        },
                        null,
                        8,
                        ["value"],
                      ),
                    ]),
                    _: 1,
                  },
                ),
                t(
                  o(k),
                  { label: "bin文件", "show-label": !0 },
                  {
                    default: l(() => [
                      t(d, {
                        multiple: "",
                        accept: "*.bin,*.dmp",
                        onBeforeUpload: F,
                        draggable: "",
                        dropzone: "",
                        placeholder: "粘贴Token字符串...",
                        clearable: "",
                      }),
                    ]),
                    _: 1,
                  },
                ),
                t(p, null, {
                  default: l(() => [
                    (f(!0),
                    H(
                      j,
                      null,
                      W(
                        i.value,
                        (a, g) => (
                          f(),
                          T(
                            v,
                            { key: g },
                            {
                              default: l(() => [
                                s("div", null, [
                                  e[5] ||
                                    (e[5] = s("strong", null, "角色名称:", -1)),
                                  c(" " + I(a.name || "未命名角色"), 1),
                                  e[6] || (e[6] = s("br", null, null, -1)),
                                  e[7] ||
                                    (e[7] = s("strong", null, "Token:", -1)),
                                  s("span", te, I(a.token), 1),
                                  e[8] || (e[8] = s("br", null, null, -1)),
                                  e[9] ||
                                    (e[9] = s("strong", null, "服务器:", -1)),
                                  c(" " + I(a.server || "未指定"), 1),
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
                t(o(J), null, {
                  default: l(() => [
                    t(
                      o(G),
                      { title: "角色详情 (可选)", name: "optional" },
                      {
                        default: l(() => [
                          s("div", le, [
                            t(
                              o(k),
                              { label: "服务器" },
                              {
                                default: l(() => [
                                  t(
                                    o(_),
                                    {
                                      value: r.server,
                                      "onUpdate:value":
                                        e[1] || (e[1] = (a) => (r.server = a)),
                                      placeholder: "服务器名称",
                                    },
                                    null,
                                    8,
                                    ["value"],
                                  ),
                                ]),
                                _: 1,
                              },
                            ),
                            t(
                              o(k),
                              { label: "自定义连接地址" },
                              {
                                default: l(() => [
                                  t(
                                    o(_),
                                    {
                                      value: r.wsUrl,
                                      "onUpdate:value":
                                        e[2] || (e[2] = (a) => (r.wsUrl = a)),
                                      placeholder: "留空使用默认连接",
                                    },
                                    null,
                                    8,
                                    ["value"],
                                  ),
                                ]),
                                _: 1,
                              },
                            ),
                          ]),
                        ]),
                        _: 1,
                      },
                    ),
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
  _e = ne(re, [["__scopeId", "data-v-16185db8"]]);
export { _e as default };
