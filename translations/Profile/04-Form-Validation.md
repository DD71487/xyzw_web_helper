# 表单验证模块

## 文件位置
`/workspace/target_formatted/Profile-BT6VKzf5.js` (第 380-1117 行)

---

## 1. 验证状态聚合

### 原始代码
```javascript
const Je = ["success", "warning", "error", "validating"],
  ho = (e) => {
    let t = "";
    for (const n of Object.keys(e)) {
      const o = e[n];
      o && (!t || Je.indexOf(o) > Je.indexOf(t)) && (t = e[n]);
    }
    return t;
  },
  go = (e) => {
    const t = [];
    for (const n of Object.keys(e)) {
      const o = e[n];
      o && t.push(o);
    }
    return t;
  };
```

### 翻译后代码
```javascript
// 验证状态优先级(从高到低)
const VALIDATE_STATUSES = ["success", "warning", "error", "validating"];

/**
 * 获取最高优先级的验证状态
 * 用于表单Item显示最终状态
 */
const getHighestPriorityStatus = (statusMap) => {
  let highestStatus = "";
  for (const key of Object.keys(statusMap)) {
    const status = statusMap[key];
    if (status) {
      // 比较优先级，保留优先级更高的状态
      if (!highestStatus || VALIDATE_STATUSES.indexOf(status) > VALIDATE_STATUSES.indexOf(highestStatus)) {
        highestStatus = statusMap[key];
      }
    }
  }
  return highestStatus;
};

/**
 * 收集所有验证消息
 */
const collectValidateMessages = (messageMap) => {
  const messages = [];
  for (const key of Object.keys(messageMap)) {
    const message = messageMap[key];
    if (message) messages.push(message);
  }
  return messages;
};
```

---

## 2. Form 组件

### 原始代码
```javascript
const mo = ie({
  name: "Form",
  props: {
    model: { type: Object, required: !0 },
    layout: { type: String, default: "horizontal" },
    size: { type: String },
    labelColProps: { type: Object, default: () => ({ span: 5, offset: 0 }) },
    wrapperColProps: { type: Object, default: () => ({ span: 19, offset: 0 }) },
    labelColStyle: Object,
    wrapperColStyle: Object,
    labelAlign: { type: String, default: "right" },
    disabled: { type: Boolean, default: void 0 },
    rules: { type: Object },
    autoLabelWidth: { type: Boolean, default: !1 },
    id: { type: String },
    scrollToFirstError: { type: Boolean, default: !1 },
  },
  emits: { submit: (e, t) => !0, submitSuccess: (e, t) => !0, submitFailed: (e, t) => !0 },
```

### 翻译后代码
```javascript
const Form = defineComponent({
  name: "Form",
  props: {
    model: { type: Object, required: true },           // 表单数据模型
    layout: { type: String, default: "horizontal" },    // 布局: horizontal/vertical/inline
    size: { type: String },                             // 尺寸: mini/small/medium/large
    labelColProps: { type: Object, default: () => ({ span: 5, offset: 0 }) },  // 标签列配置
    wrapperColProps: { type: Object, default: () => ({ span: 19, offset: 0 }) }, // 输入框列配置
    labelColStyle: Object,      // 标签列样式
    wrapperColStyle: Object,    // 输入框列样式
    labelAlign: { type: String, default: "right" },     // 标签对齐: left/right
    disabled: { type: Boolean, default: undefined },    // 是否禁用
    rules: { type: Object },    // 验证规则
    autoLabelWidth: { type: Boolean, default: false },  // 自动标签宽度
    id: { type: String },       // 表单ID
    scrollToFirstError: { type: Boolean, default: false }, // 提交时滚动到第一个错误
  },
  emits: {
    submit: (values, event) => true,
    submitSuccess: (values, event) => true,
    submitFailed: (errors, event) => true,
  },
```

---

## 3. 表单验证核心方法

### 原始代码
```javascript
    b = (v) => {    // validate - 验证所有字段
      const k = [];
      return (
        m.forEach((i) => { k.push(i.validate()); }),
        Promise.all(k).then((i) => {
          const g = {};
          let y = !1;
          return (
            i.forEach((L) => {
              L && ((y = !0), (g[L.field] = L));
            }),
            y && e.scrollToFirstError && r(Object.keys(g)[0]),
            Ge(v) && v(y ? g : void 0),
            y ? g : void 0
          );
        })
      );
    },
    w = (v, k) => {   // validateField - 验证指定字段
      const i = [];
      for (const g of m) ((xt(v) && v.includes(g.field)) || v === g.field) && i.push(g.validate());
      return Promise.all(i).then((g) => {
        const y = {};
        let L = !1;
        return (
          g.forEach((D) => {
            D && ((L = !0), (y[D.field] = D));
          }),
          L && e.scrollToFirstError && r(Object.keys(y)[0]),
          Ge(k) && k(L ? y : void 0),
          L ? y : void 0
        );
      });
    },
```

### 翻译后代码
```javascript
/**
 * 验证所有表单字段
 * @param {Function} callback - 验证完成后的回调
 * @returns {Promise<Object|undefined>} 错误对象或undefined
 */
const validateAll = (callback) => {
  const validatePromises = [];
  
  // 收集所有字段的验证Promise
  fields.forEach((field) => {
    validatePromises.push(field.validate());
  });
  
  return Promise.all(validatePromises).then((results) => {
    const errors = {};
    let hasError = false;
    
    // 收集验证错误
    results.forEach((result) => {
      if (result) {
        hasError = true;
        errors[result.field] = result;
      }
    });
    
    // 滚动到第一个错误字段
    if (hasError && props.scrollToFirstError) {
      scrollToField(Object.keys(errors)[0]);
    }
    
    // 执行回调
    if (isFunction(callback)) {
      callback(hasError ? errors : undefined);
    }
    
    return hasError ? errors : undefined;
  });
};

/**
 * 验证指定字段
 * @param {string|string[]} fieldNames - 字段名或字段名数组
 * @param {Function} callback - 验证完成后的回调
 * @returns {Promise<Object|undefined>} 错误对象或undefined
 */
const validateField = (fieldNames, callback) => {
  const targetFields = [];
  const names = Array.isArray(fieldNames) ? fieldNames : [fieldNames];
  
  // 筛选需要验证的字段
  for (const field of fields) {
    if (names.includes(field.field) || fieldNames === field.field) {
      targetFields.push(field.validate());
    }
  }
  
  return Promise.all(targetFields).then((results) => {
    const errors = {};
    let hasError = false;
    
    results.forEach((result) => {
      if (result) {
        hasError = true;
        errors[result.field] = result;
      }
    });
    
    // 滚动到第一个错误字段
    if (hasError && props.scrollToFirstError) {
      scrollToField(Object.keys(errors)[0]);
    }
    
    // 执行回调
    if (isFunction(callback)) {
      callback(hasError ? errors : undefined);
    }
    
    return hasError ? errors : undefined;
  });
};
```

---

## 4. 表单提交处理

### 原始代码
```javascript
    C = (v) => {    // handleSubmit
      const k = [];
      (m.forEach((i) => { k.push(i.validate()); }),
        Promise.all(k).then((i) => {
          const g = {};
          let y = !1;
          (i.forEach((L) => {
            L && ((y = !0), (g[L.field] = L));
          }),
            y
              ? (e.scrollToFirstError && r(Object.keys(g)[0]), t("submitFailed", { values: a.value, errors: g }, v))
              : t("submitSuccess", a.value, v),
            t("submit", { values: a.value, errors: y ? g : void 0 }, v));
        }));
    };
```

### 翻译后代码
```javascript
/**
 * 表单提交处理
 * 1. 验证所有字段
 * 2. 验证通过触发 submitSuccess
 * 3. 验证失败触发 submitFailed
 * 4. 无论成败都触发 submit
 * @param {Event} event - 提交事件
 */
const handleSubmit = (event) => {
  const validatePromises = [];
  
  // 验证所有字段
  fields.forEach((field) => {
    validatePromises.push(field.validate());
  });
  
  Promise.all(validatePromises).then((results) => {
    const errors = {};
    let hasError = false;
    
    // 收集错误
    results.forEach((result) => {
      if (result) {
        hasError = true;
        errors[result.field] = result;
      }
    });
    
    if (hasError) {
      // 验证失败
      if (props.scrollToFirstError) {
        scrollToField(Object.keys(errors)[0]);
      }
      emit("submitFailed", { values: model.value, errors }, event);
    } else {
      // 验证成功
      emit("submitSuccess", model.value, event);
    }
    
    // 始终触发submit事件
    emit("submit", { values: model.value, errors: hasError ? errors : undefined }, event);
  });
};
```

---

## 5. 验证器基类 (te)

### 原始代码
```javascript
var te = function (t, n) {
  var o = this;
  ((this.getValidateMsg = function (s, a) {
    a === void 0 && (a = {});
    var f = Object.assign(Object.assign({}, a), { value: o.obj, field: o.field, type: o.type }),
      h = jo(o.validateMessages, s);
    return Le(h)
      ? h(f)
      : Me(h)
        ? h.replace(/\#\{.+?\}/g, function (j) {
            var x = j.slice(2, -1);
            if (x in f) {
              if (le(f[x]) || je(f[x]))
                try { return JSON.stringify(f[x]); } catch { return f[x]; }
              return String(f[x]);
            }
            return j;
          })
        : h;
  }),
    ...
    (this.obj = t),      // 验证的值
    (this.message = n.message),    // 自定义错误消息
    (this.type = n.type),          // 字段类型
    (this.error = null),           // 错误信息
    (this.field = n.field || n.type),  // 字段名
    (this.validateMessages = We(_o, n.validateMessages)));  // 验证消息模板
};
```

### 翻译后代码
```javascript
/**
 * 验证器基类
 * 提供验证消息模板替换和错误收集功能
 */
class Validator {
  constructor(value, options) {
    // 获取验证消息(支持模板替换)
    this.getValidateMsg = (ruleKey, extraData = {}) => {
      const templateData = { ...extraData, value: this.obj, field: this.field, type: this.type };
      const messageTemplate = getByPath(this.validateMessages, ruleKey);
      
      if (isFunction(messageTemplate)) {
        // 消息是函数，传入数据执行
        return messageTemplate(templateData);
      } else if (isString(messageTemplate)) {
        // 消息是字符串，进行模板替换
        return messageTemplate.replace(/\#\{.+?\}/g, (match) => {
          const key = match.slice(2, -1);  // 去掉 #{ 和 }
          if (key in templateData) {
            const val = templateData[key];
            if (isObject(val) || isArray(val)) {
              try { return JSON.stringify(val); } catch { return val; }
            }
            return String(val);
          }
          return match;  // 保留原样
        });
      }
      return messageTemplate;
    };
    
    // 初始化属性
    this.obj = options.trim ? value.trim() : value;   // 验证的值
    this.message = options.message;                    // 自定义错误消息
    this.type = options.type;                          // 字段类型
    this.error = null;                                 // 当前错误
    this.field = options.field || options.type;        // 字段名
    this.validateMessages = mergeDeep(DEFAULT_MESSAGES, options.validateMessages);  // 消息模板
  }
}
```

---

## 6. 字符串验证器 (Co)

### 原始代码
```javascript
var Co = (function (e) {
  function t(o, s) {
    (e.call(this, o, Object.assign(Object.assign({}, s), { type: "string" })),
      this.validate(s && s.strict ? Me(this.obj) : !0, this.getValidateMsg("type.string")));
  }
  var n = { uppercase: { configurable: !0 }, lowercase: { configurable: !0 } };
  return (
    (t.prototype.maxLength = function (s) {
      return this.obj ? this.validate(this.obj.length <= s, this.getValidateMsg("string.maxLength", { maxLength: s })) : this;
    }),
    (t.prototype.minLength = function (s) {
      return this.obj ? this.validate(this.obj.length >= s, this.getValidateMsg("string.minLength", { minLength: s })) : this;
    }),
    (t.prototype.length = function (s) {
      return this.obj ? this.validate(this.obj.length === s, this.getValidateMsg("string.length", { length: s })) : this;
    }),
    (t.prototype.match = function (s) {
      var a = s instanceof RegExp;
      return (a && (s.lastIndex = 0), this.validate(this.obj === void 0 || (a && s.test(this.obj)), this.getValidateMsg("string.match", { pattern: s })));
    }),
    (n.uppercase.get = function () {
      return this.obj ? this.validate(this.obj.toUpperCase() === this.obj, this.getValidateMsg("string.uppercase")) : this;
    }),
    (n.lowercase.get = function () {
      return this.obj ? this.validate(this.obj.toLowerCase() === this.obj, this.getValidateMsg("string.lowercase")) : this;
    }),
    Object.defineProperties(t.prototype, n),
    t
  );
})(te);
```

### 翻译后代码
```javascript
/**
 * 字符串验证器
 * 继承自 Validator 基类
 */
class StringValidator extends Validator {
  constructor(value, options) {
    super(value, { ...options, type: "string" });
    // 严格模式下验证必须为字符串类型
    this.validate(options?.strict ? isString(this.obj) : true, this.getValidateMsg("type.string"));
  }
  
  // 最大长度验证
  maxLength(max) {
    if (!this.obj) return this;
    return this.validate(
      this.obj.length <= max,
      this.getValidateMsg("string.maxLength", { maxLength: max })
    );
  }
  
  // 最小长度验证
  minLength(min) {
    if (!this.obj) return this;
    return this.validate(
      this.obj.length >= min,
      this.getValidateMsg("string.minLength", { minLength: min })
    );
  }
  
  // 固定长度验证
  length(expected) {
    if (!this.obj) return this;
    return this.validate(
      this.obj.length === expected,
      this.getValidateMsg("string.length", { length: expected })
    );
  }
  
  // 正则匹配验证
  match(pattern) {
    const isRegExp = pattern instanceof RegExp;
    if (isRegExp) pattern.lastIndex = 0;  // 重置正则状态
    return this.validate(
      this.obj === undefined || (isRegExp && pattern.test(this.obj)),
      this.getValidateMsg("string.match", { pattern })
    );
  }
  
  // 全大写验证 (getter)
  get uppercase() {
    if (!this.obj) return this;
    return this.validate(
      this.obj.toUpperCase() === this.obj,
      this.getValidateMsg("string.uppercase")
    );
  }
  
  // 全小写验证 (getter)
  get lowercase() {
    if (!this.obj) return this;
    return this.validate(
      this.obj.toLowerCase() === this.obj,
      this.getValidateMsg("string.lowercase")
    );
  }
}
```

---

## 7. 数字验证器 (To)

### 原始代码
```javascript
var To = (function (e) {
  function t(o, s) {
    (e.call(this, o, Object.assign(Object.assign({}, s), { type: "number" })),
      this.validate(s && s.strict ? yo(this.obj) : !0, this.getValidateMsg("type.number")));
  }
  var n = { positive: { configurable: !0 }, negative: { configurable: !0 } };
  return (
    (t.prototype.min = function (s) { return fe(this.obj) ? this : this.validate(this.obj >= s, this.getValidateMsg("number.min", { min: s })); }),
    (t.prototype.max = function (s) { return fe(this.obj) ? this : this.validate(this.obj <= s, this.getValidateMsg("number.max", { max: s })); }),
    (t.prototype.equal = function (s) { return fe(this.obj) ? this : this.validate(this.obj === s, this.getValidateMsg("number.equal", { equal: s })); }),
    (t.prototype.range = function (s, a) { return fe(this.obj) ? this : this.validate(this.obj >= s && this.obj <= a, this.getValidateMsg("number.range", { min: s, max: a })); }),
    (n.positive.get = function () { return fe(this.obj) ? this : this.validate(this.obj > 0, this.getValidateMsg("number.positive")); }),
    (n.negative.get = function () { return fe(this.obj) ? this : this.validate(this.obj < 0, this.getValidateMsg("number.negative")); }),
    Object.defineProperties(t.prototype, n),
    t
  );
})(te);
```

### 翻译后代码
```javascript
/**
 * 数字验证器
 */
class NumberValidator extends Validator {
  constructor(value, options) {
    super(value, { ...options, type: "number" });
    // 严格模式下验证必须为数字类型
    this.validate(options?.strict ? isNumber(this.obj) : true, this.getValidateMsg("type.number"));
  }
  
  // 最小值验证
  min(minimum) {
    if (isEmpty(this.obj)) return this;
    return this.validate(this.obj >= minimum, this.getValidateMsg("number.min", { min: minimum }));
  }
  
  // 最大值验证
  max(maximum) {
    if (isEmpty(this.obj)) return this;
    return this.validate(this.obj <= maximum, this.getValidateMsg("number.max", { max: maximum }));
  }
  
  // 等于验证
  equal(expected) {
    if (isEmpty(this.obj)) return this;
    return this.validate(this.obj === expected, this.getValidateMsg("number.equal", { equal: expected }));
  }
  
  // 范围验证
  range(min, max) {
    if (isEmpty(this.obj)) return this;
    return this.validate(
      this.obj >= min && this.obj <= max,
      this.getValidateMsg("number.range", { min, max })
    );
  }
  
  // 正数验证 (getter)
  get positive() {
    if (isEmpty(this.obj)) return this;
    return this.validate(this.obj > 0, this.getValidateMsg("number.positive"));
  }
  
  // 负数验证 (getter)
  get negative() {
    if (isEmpty(this.obj)) return this;
    return this.validate(this.obj < 0, this.getValidateMsg("number.negative"));
  }
}
```

---

## 8. 类型验证器 (Lo) - URL/Email/IP

### 原始代码
```javascript
var Lo = (function (e) {
  function t(o, s) { e.call(this, o, Object.assign(Object.assign({}, s), { type: "type" })); }
  var n = { email: { configurable: !0 }, url: { configurable: !0 }, ip: { configurable: !0 } };
  return (
    (n.email.get = function () {
      return (this.type = "email", this.validate(this.obj === void 0 || Eo.test(this.obj), this.getValidateMsg("type.email")));
    }),
    (n.url.get = function () {
      return (this.type = "url", this.validate(this.obj === void 0 || xo.test(this.obj), this.getValidateMsg("type.url")));
    }),
    (n.ip.get = function () {
      return (this.type = "ip", this.validate(this.obj === void 0 || Mo.test(this.obj), this.getValidateMsg("type.ip")));
    }),
    Object.defineProperties(t.prototype, n),
    t
  );
})(te);
```

### 翻译后代码
```javascript
// 正则表达式定义
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const URL_REGEX = /^(?!mailto:)(?:(?:http|https|ftp):\/\/)(?:\S+(?::\S*)?@)?.../i;
const IP_REGEX = /^(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})(\.(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})){3}$/;

/**
 * 类型验证器 (Email/URL/IP)
 */
class TypeValidator extends Validator {
  constructor(value, options) {
    super(value, { ...options, type: "type" });
  }
  
  // 邮箱验证 (getter)
  get email() {
    this.type = "email";
    return this.validate(
      this.obj === undefined || EMAIL_REGEX.test(this.obj),
      this.getValidateMsg("type.email")
    );
  }
  
  // URL验证 (getter)
  get url() {
    this.type = "url";
    return this.validate(
      this.obj === undefined || URL_REGEX.test(this.obj),
      this.getValidateMsg("type.url")
    );
  }
  
  // IP验证 (getter)
  get ip() {
    this.type = "ip";
    return this.validate(
      this.obj === undefined || IP_REGEX.test(this.obj),
      this.getValidateMsg("type.ip")
    );
  }
}
```

---

## 9. 验证规则配置示例

### 原始代码 (manual导入表单)
```javascript
const C = {
  name: [
    { required: !0, message: "请输入角色名称", trigger: "blur" },
    { min: 1, max: 50, message: "名称长度应在1到50个字符之间", trigger: "blur" },
  ],
  base64Token: [
    { required: !0, message: "请输入Token字符串", trigger: "blur" },
    { min: 20, message: "Token字符串长度应至少20个字符", trigger: "blur" },
  ],
};
```

### 翻译后代码
```javascript
// 手动导入表单验证规则
const manualFormRules = {
  name: [
    // 必填验证
    { required: true, message: "请输入角色名称", trigger: "blur" },
    // 长度范围验证
    { min: 1, max: 50, message: "名称长度应在1到50个字符之间", trigger: "blur" },
  ],
  base64Token: [
    // 必填验证
    { required: true, message: "请输入Token字符串", trigger: "blur" },
    // 最小长度验证
    { min: 20, message: "Token字符串长度应至少20个字符", trigger: "blur" },
  ],
};

// URL导入表单验证规则
const urlFormRules = {
  name: [
    { required: true, message: "请输入角色名称", trigger: "blur" },
    { min: 1, max: 50, message: "名称长度应在1到50个字符之间", trigger: "blur" },
  ],
  url: [
    { required: true, message: "请输入Token获取地址", trigger: "blur" },
    { type: "url", message: "请输入有效的URL地址", trigger: "blur" },
  ],
};
```

---

## 10. 验证消息模板

### 原始代码
```javascript
var _o = {
  required: "#{field} is required",
  type: { ip: ae, email: ae, url: ae, string: ae, number: ae, array: ae, object: ae, boolean: ae },
  number: {
    min: "`#{value}` is not greater than `#{min}`",
    max: "`#{value}` is not less than `#{max}`",
    equal: "`#{value}` is not equal to `#{equal}`",
    range: "`#{value}` is not in range `#{min} ~ #{max}`",
    positive: "`#{value}` is not a positive number",
    negative: "`#{value}` is not a negative number",
  },
  string: {
    maxLength: "#{field} cannot be longer than #{maxLength} characters",
    minLength: "#{field} must be at least #{minLength} characters",
    length: "#{field} must be exactly #{length} characters",
    match: "`#{value}` does not match pattern #{pattern}",
    uppercase: "`#{value}` must be all uppercase",
    lowercase: "`#{value}` must be all lowercased",
  },
  ...
};
```

### 翻译后代码
```javascript
// 默认验证消息模板(英文)
const DEFAULT_VALIDATE_MESSAGES = {
  required: "#{field} is required",
  type: {
    ip: "#{field} is not a #{type} type",
    email: "#{field} is not a #{type} type",
    url: "#{field} is not a #{type} type",
    string: "#{field} is not a #{type} type",
    number: "#{field} is not a #{type} type",
    array: "#{field} is not a #{type} type",
    object: "#{field} is not a #{type} type",
    boolean: "#{field} is not a #{type} type",
  },
  number: {
    min: "`#{value}` is not greater than `#{min}`",
    max: "`#{value}` is not less than `#{max}`",
    equal: "`#{value}` is not equal to `#{equal}`",
    range: "`#{value}` is not in range `#{min} ~ #{max}`",
    positive: "`#{value}` is not a positive number",
    negative: "`#{value}` is not a negative number",
  },
  string: {
    maxLength: "#{field} cannot be longer than #{maxLength} characters",
    minLength: "#{field} must be at least #{minLength} characters",
    length: "#{field} must be exactly #{length} characters",
    match: "`#{value}` does not match pattern #{pattern}",
    uppercase: "`#{value}` must be all uppercase",
    lowercase: "`#{value}` must be all lowercased",
  },
  array: {
    length: "#{field} must be exactly #{length} in length",
    minLength: "#{field} cannot be less than #{minLength} in length",
    maxLength: "#{field} cannot be greater than #{maxLength} in length",
  },
  object: {
    deepEqual: "#{field} is not deep equal to expected value",
    hasKeys: "#{field} does not contain required fields",
    empty: "#{field} is not an empty object",
  },
  boolean: {
    true: "Expect true but got `#{value}`",
    false: "Expect false but got `#{value}`",
  },
};

// 中文验证消息模板(实际使用)
const CN_VALIDATE_MESSAGES = {
  required: "#{field} 不能为空",
  type: {
    url: "请输入有效的URL地址",
    email: "请输入有效的邮箱地址",
    string: "#{field} 必须是字符串",
    number: "#{field} 必须是数字",
  },
  string: {
    minLength: "#{field} 长度至少为 #{minLength} 个字符",
    maxLength: "#{field} 长度不能超过 #{maxLength} 个字符",
    length: "#{field} 长度必须为 #{length} 个字符",
  },
  number: {
    min: "#{field} 不能小于 #{min}",
    max: "#{field} 不能大于 #{max}",
    range: "#{field} 必须在 #{min} ~ #{max} 之间",
  },
};
```

---

## 11. FormItem 验证触发

### 原始代码
```javascript
    K = V(() => [].concat(e.validateTrigger)),
    u = V(() =>
      K.value.reduce((i, g) => {
        switch (g) {
          case "change":
            return ((i.onChange = () => { M(); }), i);
          case "input":
            return ((i.onInput = () => { Ce(() => { M(); }); }), i);
          case "focus":
            return ((i.onFocus = () => { M(); }), i);
          case "blur":
            return ((i.onBlur = () => { M(); }), i);
          default: return i;
        }
      }, {}),
    );
```

### 翻译后代码
```javascript
// 验证触发方式
const validateTriggers = computed(() => [].concat(props.validateTrigger));

// 根据触发方式生成事件处理器
const eventHandlers = computed(() => {
  return validateTriggers.value.reduce((handlers, trigger) => {
    switch (trigger) {
      case "change":
        // 值变化时验证
        handlers.onChange = () => validateField();
        return handlers;
      case "input":
        // 输入时验证(使用nextTick防抖)
        handlers.onInput = () => nextTick(() => validateField());
        return handlers;
      case "focus":
        // 获得焦点时验证
        handlers.onFocus = () => validateField();
        return handlers;
      case "blur":
        // 失去焦点时验证
        handlers.onBlur = () => validateField();
        return handlers;
      default:
        return handlers;
    }
  }, {});
});
```

### 功能说明
| 触发方式 | 说明 |
|----------|------|
| `change` | 值发生变化时触发验证 |
| `input` | 输入时触发验证(带防抖) |
| `focus` | 获得焦点时触发验证 |
| `blur` | 失去焦点时触发验证 |
