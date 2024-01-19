// src/SwitchPrefab.tsx
import React from "react";

// node_modules/proxy-compare/dist/index.modern.mjs
var e = Symbol();
var t = Symbol();
var r = "a";
var n = "w";
var o = (e3, t3) => new Proxy(e3, t3);
var s = Object.getPrototypeOf;
var c = new WeakMap();
var l = (e3) => e3 && (c.has(e3) ? c.get(e3) : s(e3) === Object.prototype || s(e3) === Array.prototype);
var f = (e3) => typeof e3 == "object" && e3 !== null;
var i = (e3) => {
  if (Array.isArray(e3))
    return Array.from(e3);
  const t3 = Object.getOwnPropertyDescriptors(e3);
  return Object.values(t3).forEach((e4) => {
    e4.configurable = true;
  }), Object.create(s(e3), t3);
};
var u = (e3) => e3[t] || e3;
var a = (s3, c3, f3, p3) => {
  if (!l(s3))
    return s3;
  let g2 = p3 && p3.get(s3);
  if (!g2) {
    const e3 = u(s3);
    g2 = ((e4) => Object.values(Object.getOwnPropertyDescriptors(e4)).some((e5) => !e5.configurable && !e5.writable))(e3) ? [e3, i(e3)] : [e3], p3 == null || p3.set(s3, g2);
  }
  const [y3, h3] = g2;
  let w2 = f3 && f3.get(y3);
  return w2 && w2[1].f === !!h3 || (w2 = ((o3, s4) => {
    const c4 = { f: s4 };
    let l3 = false;
    const f4 = (e3, t3) => {
      if (!l3) {
        let s5 = c4[r].get(o3);
        if (s5 || (s5 = {}, c4[r].set(o3, s5)), e3 === n)
          s5[n] = true;
        else {
          let r3 = s5[e3];
          r3 || (r3 = new Set(), s5[e3] = r3), r3.add(t3);
        }
      }
    }, i3 = { get: (e3, n3) => n3 === t ? o3 : (f4("k", n3), a(Reflect.get(e3, n3), c4[r], c4.c, c4.t)), has: (t3, n3) => n3 === e ? (l3 = true, c4[r].delete(o3), true) : (f4("h", n3), Reflect.has(t3, n3)), getOwnPropertyDescriptor: (e3, t3) => (f4("o", t3), Reflect.getOwnPropertyDescriptor(e3, t3)), ownKeys: (e3) => (f4(n), Reflect.ownKeys(e3)) };
    return s4 && (i3.set = i3.deleteProperty = () => false), [i3, c4];
  })(y3, !!h3), w2[1].p = o(h3 || y3, w2[0]), f3 && f3.set(y3, w2)), w2[1][r] = c3, w2[1].c = f3, w2[1].t = p3, w2[1].p;
};
var p = (e3, t3, r3, o3) => {
  if (Object.is(e3, t3))
    return false;
  if (!f(e3) || !f(t3))
    return true;
  const s3 = r3.get(u(e3));
  if (!s3)
    return true;
  if (o3) {
    const r4 = o3.get(e3);
    if (r4 && r4.n === t3)
      return r4.g;
    o3.set(e3, { n: t3, g: false });
  }
  let c3 = null;
  try {
    for (const r4 of s3.h || [])
      if (c3 = Reflect.has(e3, r4) !== Reflect.has(t3, r4), c3)
        return c3;
    if (s3[n] === true) {
      if (c3 = ((e4, t4) => {
        const r4 = Reflect.ownKeys(e4), n3 = Reflect.ownKeys(t4);
        return r4.length !== n3.length || r4.some((e5, t5) => e5 !== n3[t5]);
      })(e3, t3), c3)
        return c3;
    } else
      for (const r4 of s3.o || [])
        if (c3 = !!Reflect.getOwnPropertyDescriptor(e3, r4) != !!Reflect.getOwnPropertyDescriptor(t3, r4), c3)
          return c3;
    for (const n3 of s3.k || [])
      if (c3 = p(e3[n3], t3[n3], r3, o3), c3)
        return c3;
    return c3 === null && (c3 = true), c3;
  } finally {
    o3 && o3.set(e3, { n: t3, g: c3 });
  }
};
var y = (e3) => l(e3) && e3[t] || null;
var h = (e3, t3 = true) => {
  c.set(e3, t3);
};

// node_modules/@zag-js/store/dist/index.mjs
var isDev = true;
var isObject = (x2) => typeof x2 === "object" && x2 !== null;
var proxyStateMap = /* @__PURE__ */ new WeakMap();
var refSet = /* @__PURE__ */ new WeakSet();
var buildProxyFunction = (objectIs = Object.is, newProxy = (target, handler) => new Proxy(target, handler), canProxy = (x2) => isObject(x2) && !refSet.has(x2) && (Array.isArray(x2) || !(Symbol.iterator in x2)) && !(x2 instanceof WeakMap) && !(x2 instanceof WeakSet) && !(x2 instanceof Error) && !(x2 instanceof Number) && !(x2 instanceof Date) && !(x2 instanceof String) && !(x2 instanceof RegExp) && !(x2 instanceof ArrayBuffer), defaultHandlePromise = (promise) => {
  switch (promise.status) {
    case "fulfilled":
      return promise.value;
    case "rejected":
      throw promise.reason;
    default:
      throw promise;
  }
}, snapCache = /* @__PURE__ */ new WeakMap(), createSnapshot = (target, version, handlePromise = defaultHandlePromise) => {
  const cache = snapCache.get(target);
  if (cache?.[0] === version) {
    return cache[1];
  }
  const snap = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target));
  h(snap, true);
  snapCache.set(target, [version, snap]);
  Reflect.ownKeys(target).forEach((key) => {
    const value = Reflect.get(target, key);
    if (refSet.has(value)) {
      h(value, false);
      snap[key] = value;
    } else if (value instanceof Promise) {
      Object.defineProperty(snap, key, {
        get() {
          return handlePromise(value);
        }
      });
    } else if (proxyStateMap.has(value)) {
      snap[key] = snapshot(value, handlePromise);
    } else {
      snap[key] = value;
    }
  });
  return Object.freeze(snap);
}, proxyCache = /* @__PURE__ */ new WeakMap(), versionHolder = [1, 1], proxyFunction2 = (initialObject) => {
  if (!isObject(initialObject)) {
    throw new Error("object required");
  }
  const found = proxyCache.get(initialObject);
  if (found) {
    return found;
  }
  let version = versionHolder[0];
  const listeners = /* @__PURE__ */ new Set();
  const notifyUpdate = (op, nextVersion = ++versionHolder[0]) => {
    if (version !== nextVersion) {
      version = nextVersion;
      listeners.forEach((listener) => listener(op, nextVersion));
    }
  };
  let checkVersion = versionHolder[1];
  const ensureVersion = (nextCheckVersion = ++versionHolder[1]) => {
    if (checkVersion !== nextCheckVersion && !listeners.size) {
      checkVersion = nextCheckVersion;
      propProxyStates.forEach(([propProxyState]) => {
        const propVersion = propProxyState[1](nextCheckVersion);
        if (propVersion > version) {
          version = propVersion;
        }
      });
    }
    return version;
  };
  const createPropListener = (prop) => (op, nextVersion) => {
    const newOp = [...op];
    newOp[1] = [prop, ...newOp[1]];
    notifyUpdate(newOp, nextVersion);
  };
  const propProxyStates = /* @__PURE__ */ new Map();
  const addPropListener = (prop, propProxyState) => {
    if (isDev && propProxyStates.has(prop)) {
      throw new Error("prop listener already exists");
    }
    if (listeners.size) {
      const remove = propProxyState[3](createPropListener(prop));
      propProxyStates.set(prop, [propProxyState, remove]);
    } else {
      propProxyStates.set(prop, [propProxyState]);
    }
  };
  const removePropListener = (prop) => {
    const entry = propProxyStates.get(prop);
    if (entry) {
      propProxyStates.delete(prop);
      entry[1]?.();
    }
  };
  const addListener = (listener) => {
    listeners.add(listener);
    if (listeners.size === 1) {
      propProxyStates.forEach(([propProxyState, prevRemove], prop) => {
        if (isDev && prevRemove) {
          throw new Error("remove already exists");
        }
        const remove = propProxyState[3](createPropListener(prop));
        propProxyStates.set(prop, [propProxyState, remove]);
      });
    }
    const removeListener = () => {
      listeners.delete(listener);
      if (listeners.size === 0) {
        propProxyStates.forEach(([propProxyState, remove], prop) => {
          if (remove) {
            remove();
            propProxyStates.set(prop, [propProxyState]);
          }
        });
      }
    };
    return removeListener;
  };
  const baseObject = Array.isArray(initialObject) ? [] : Object.create(Object.getPrototypeOf(initialObject));
  const handler = {
    deleteProperty(target, prop) {
      const prevValue = Reflect.get(target, prop);
      removePropListener(prop);
      const deleted = Reflect.deleteProperty(target, prop);
      if (deleted) {
        notifyUpdate(["delete", [prop], prevValue]);
      }
      return deleted;
    },
    set(target, prop, value, receiver) {
      const hasPrevValue = Reflect.has(target, prop);
      const prevValue = Reflect.get(target, prop, receiver);
      if (hasPrevValue && (objectIs(prevValue, value) || proxyCache.has(value) && objectIs(prevValue, proxyCache.get(value)))) {
        return true;
      }
      removePropListener(prop);
      if (isObject(value)) {
        value = y(value) || value;
      }
      let nextValue = value;
      if (Object.getOwnPropertyDescriptor(target, prop)?.set) {
      } else if (value instanceof Promise) {
        value.then((v2) => {
          value.status = "fulfilled";
          value.value = v2;
          notifyUpdate(["resolve", [prop], v2]);
        }).catch((e3) => {
          value.status = "rejected";
          value.reason = e3;
          notifyUpdate(["reject", [prop], e3]);
        });
      } else {
        if (!proxyStateMap.has(value) && canProxy(value)) {
          nextValue = proxy(value);
        }
        const childProxyState = !refSet.has(nextValue) && proxyStateMap.get(nextValue);
        if (childProxyState) {
          addPropListener(prop, childProxyState);
        }
      }
      Reflect.set(target, prop, nextValue, receiver);
      notifyUpdate(["set", [prop], value, prevValue]);
      return true;
    }
  };
  const proxyObject = newProxy(baseObject, handler);
  proxyCache.set(initialObject, proxyObject);
  const proxyState = [baseObject, ensureVersion, createSnapshot, addListener];
  proxyStateMap.set(proxyObject, proxyState);
  Reflect.ownKeys(initialObject).forEach((key) => {
    const desc = Object.getOwnPropertyDescriptor(initialObject, key);
    if (desc.get || desc.set) {
      Object.defineProperty(baseObject, key, desc);
    } else {
      proxyObject[key] = initialObject[key];
    }
  });
  return proxyObject;
}) => [
  proxyFunction2,
  proxyStateMap,
  refSet,
  objectIs,
  newProxy,
  canProxy,
  defaultHandlePromise,
  snapCache,
  createSnapshot,
  proxyCache,
  versionHolder
];
var [proxyFunction] = buildProxyFunction();
function proxy(initialObject = {}) {
  return proxyFunction(initialObject);
}
function subscribe(proxyObject, callback, notifyInSync) {
  const proxyState = proxyStateMap.get(proxyObject);
  if (isDev && !proxyState) {
    console.warn("Please use proxy object");
  }
  let promise;
  const ops = [];
  const addListener = proxyState[3];
  let isListenerActive = false;
  const listener = (op) => {
    ops.push(op);
    if (notifyInSync) {
      callback(ops.splice(0));
      return;
    }
    if (!promise) {
      promise = Promise.resolve().then(() => {
        promise = void 0;
        if (isListenerActive) {
          callback(ops.splice(0));
        }
      });
    }
  };
  const removeListener = addListener(listener);
  isListenerActive = true;
  return () => {
    isListenerActive = false;
    removeListener();
  };
}
function snapshot(proxyObject, handlePromise) {
  const proxyState = proxyStateMap.get(proxyObject);
  if (isDev && !proxyState) {
    console.warn("Please use proxy object");
  }
  const [target, ensureVersion, createSnapshot] = proxyState;
  return createSnapshot(target, ensureVersion(), handlePromise);
}
function ref(obj) {
  refSet.add(obj);
  return obj;
}
function proxyWithComputed(initialObject, computedFns) {
  const keys = Object.keys(computedFns);
  keys.forEach((key) => {
    if (Object.getOwnPropertyDescriptor(initialObject, key)) {
      throw new Error("object property already defined");
    }
    const computedFn = computedFns[key];
    const { get, set: set3 } = typeof computedFn === "function" ? { get: computedFn } : computedFn;
    const desc = {};
    desc.get = () => get(snapshot(proxyObject));
    if (set3) {
      desc.set = (newValue) => set3(proxyObject, newValue);
    }
    Object.defineProperty(initialObject, key, desc);
  });
  const proxyObject = proxy(initialObject);
  return proxyObject;
}
var defaultCompareFn = (prev, next) => Object.is(prev, next);
function subscribeKey(obj, key, fn, sync, compareFn) {
  let prev = Reflect.get(snapshot(obj), key);
  const isEqual3 = compareFn || defaultCompareFn;
  function onSnapshotChange() {
    const snap = snapshot(obj);
    if (isEqual3(prev, snap[key]))
      return;
    fn(snap[key]);
    prev = Reflect.get(snap, key);
  }
  return subscribe(obj, onSnapshotChange, sync);
}

// node_modules/klona/full/index.mjs
function set(obj, key, val) {
  if (typeof val.value === "object")
    val.value = klona(val.value);
  if (!val.enumerable || val.get || val.set || !val.configurable || !val.writable || key === "__proto__") {
    Object.defineProperty(obj, key, val);
  } else
    obj[key] = val.value;
}
function klona(x2) {
  if (typeof x2 !== "object")
    return x2;
  var i3 = 0, k2, list, tmp, str = Object.prototype.toString.call(x2);
  if (str === "[object Object]") {
    tmp = Object.create(x2.__proto__ || null);
  } else if (str === "[object Array]") {
    tmp = Array(x2.length);
  } else if (str === "[object Set]") {
    tmp = new Set();
    x2.forEach(function(val) {
      tmp.add(klona(val));
    });
  } else if (str === "[object Map]") {
    tmp = new Map();
    x2.forEach(function(val, key) {
      tmp.set(klona(key), klona(val));
    });
  } else if (str === "[object Date]") {
    tmp = new Date(+x2);
  } else if (str === "[object RegExp]") {
    tmp = new RegExp(x2.source, x2.flags);
  } else if (str === "[object DataView]") {
    tmp = new x2.constructor(klona(x2.buffer));
  } else if (str === "[object ArrayBuffer]") {
    tmp = x2.slice(0);
  } else if (str.slice(-6) === "Array]") {
    tmp = new x2.constructor(x2);
  }
  if (tmp) {
    for (list = Object.getOwnPropertySymbols(x2); i3 < list.length; i3++) {
      set(tmp, list[i3], Object.getOwnPropertyDescriptor(x2, list[i3]));
    }
    for (i3 = 0, list = Object.getOwnPropertyNames(x2); i3 < list.length; i3++) {
      if (Object.hasOwnProperty.call(tmp, k2 = list[i3]) && tmp[k2] === x2[k2])
        continue;
      set(tmp, k2, Object.getOwnPropertyDescriptor(x2, k2));
    }
  }
  return tmp || x2;
}

// node_modules/@zag-js/core/dist/index.mjs
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function clear(v2) {
  while (v2.length > 0)
    v2.pop();
  return v2;
}
var runIfFn = (v2, ...a3) => {
  const res = typeof v2 === "function" ? v2(...a3) : v2;
  return res ?? void 0;
};
var cast = (v2) => v2;
var noop = () => {
};
var callAll = (...fns) => (...a3) => {
  fns.forEach(function(fn) {
    fn?.(...a3);
  });
};
var uuid = /* @__PURE__ */ (() => {
  let id = 0;
  return () => {
    id++;
    return id.toString(36);
  };
})();
var isDev2 = () => true;
var isArray = (v2) => Array.isArray(v2);
var isObject2 = (v2) => !(v2 == null || typeof v2 !== "object" || isArray(v2));
var isNumber = (v2) => typeof v2 === "number" && !Number.isNaN(v2);
var isString = (v2) => typeof v2 === "string";
var isFunction = (v2) => typeof v2 === "function";
function compact(obj) {
  if (!isPlainObject(obj) || obj === void 0) {
    return obj;
  }
  const keys = Reflect.ownKeys(obj).filter((key) => typeof key === "string");
  const filtered = {};
  for (const key of keys) {
    const value = obj[key];
    if (value !== void 0) {
      filtered[key] = compact(value);
    }
  }
  return filtered;
}
var isPlainObject = (value) => {
  return value && typeof value === "object" && value.constructor === Object;
};
function warn(...a3) {
  const m2 = a3.length === 1 ? a3[0] : a3[1];
  const c3 = a3.length === 2 ? a3[0] : true;
  if (c3 && true) {
    console.warn(m2);
  }
}
function invariant(...a3) {
  const m2 = a3.length === 1 ? a3[0] : a3[1];
  const c3 = a3.length === 2 ? a3[0] : true;
  if (c3 && true) {
    throw new Error(m2);
  }
}
function deepMerge(source, ...objects) {
  for (const obj of objects) {
    const target = compact(obj);
    for (const key in target) {
      if (isObject2(obj[key])) {
        if (!source[key]) {
          source[key] = {};
        }
        deepMerge(source[key], obj[key]);
      } else {
        source[key] = obj[key];
      }
    }
  }
  return source;
}
function structuredClone(v2) {
  return klona(v2);
}
function toEvent(event) {
  const obj = isString(event) ? { type: event } : event;
  return obj;
}
function toArray(value) {
  if (!value)
    return [];
  return isArray(value) ? value.slice() : [value];
}
function isGuardHelper(value) {
  return isObject2(value) && value.predicate != null;
}
var Truthy = () => true;
function exec(guardMap, ctx, event, meta) {
  return (guard) => {
    if (isString(guard)) {
      return !!guardMap[guard]?.(ctx, event, meta);
    }
    if (isFunction(guard)) {
      return guard(ctx, event, meta);
    }
    return guard.predicate(guardMap)(ctx, event, meta);
  };
}
function or(...conditions) {
  return {
    predicate: (guardMap) => (ctx, event, meta) => conditions.map(exec(guardMap, ctx, event, meta)).some(Boolean)
  };
}
function and(...conditions) {
  return {
    predicate: (guardMap) => (ctx, event, meta) => conditions.map(exec(guardMap, ctx, event, meta)).every(Boolean)
  };
}
function not(condition) {
  return {
    predicate: (guardMap) => (ctx, event, meta) => {
      return !exec(guardMap, ctx, event, meta)(condition);
    }
  };
}
function stateIn(...values) {
  return (_ctx, _evt, meta) => meta.state.matches(...values);
}
var guards = { or, and, not, stateIn };
function determineGuardFn(guard, guardMap) {
  guard = guard ?? Truthy;
  return (context, event, meta) => {
    if (isString(guard)) {
      const value = guardMap[guard];
      return isFunction(value) ? value(context, event, meta) : value;
    }
    if (isGuardHelper(guard)) {
      return guard.predicate(guardMap)(context, event, meta);
    }
    return guard?.(context, event, meta);
  };
}
function determineActionsFn(values, guardMap) {
  return (context, event, meta) => {
    if (isGuardHelper(values)) {
      return values.predicate(guardMap)(context, event, meta);
    }
    return values;
  };
}
function createProxy(config) {
  const computedContext = config.computed ?? cast({});
  const initialContext = config.context ?? cast({});
  const state = proxy({
    value: config.initial ?? "",
    previousValue: "",
    event: cast({}),
    previousEvent: cast({}),
    context: proxyWithComputed(initialContext, computedContext),
    done: false,
    tags: [],
    hasTag(tag) {
      return this.tags.includes(tag);
    },
    matches(...value) {
      return value.includes(this.value);
    },
    can(event) {
      return cast(this).nextEvents.includes(event);
    },
    get nextEvents() {
      const stateEvents = config.states?.[this.value]?.["on"] ?? {};
      const globalEvents = config?.on ?? {};
      return Object.keys({ ...stateEvents, ...globalEvents });
    },
    get changed() {
      if (this.event.value === "machine.init" || !this.previousValue)
        return false;
      return this.value !== this.previousValue;
    }
  });
  return cast(state);
}
function determineDelayFn(delay, delaysMap) {
  return (context, event) => {
    if (isNumber(delay))
      return delay;
    if (isFunction(delay)) {
      return delay(context, event);
    }
    if (isString(delay)) {
      const value = Number.parseFloat(delay);
      if (!Number.isNaN(value)) {
        return value;
      }
      if (delaysMap) {
        const valueOrFn = delaysMap?.[delay];
        invariant(valueOrFn == null, `[@zag-js/core > determine-delay] Cannot determine delay for \`${delay}\`. It doesn't exist in \`options.delays\``);
        return isFunction(valueOrFn) ? valueOrFn(context, event) : valueOrFn;
      }
    }
  };
}
function toTarget(target) {
  return isString(target) ? { target } : target;
}
function determineTransitionFn(transitions, guardMap) {
  return (context, event, meta) => {
    return toArray(transitions).map(toTarget).find((transition) => {
      const determineGuard = determineGuardFn(transition.guard, guardMap);
      const guard = determineGuard(context, event, meta);
      return guard ?? transition.target ?? transition.actions;
    });
  };
}
var Machine = class _Machine {
  constructor(config, options) {
    __publicField(this, "status", "Not Started");
    __publicField(this, "state");
    __publicField(this, "initialState");
    __publicField(this, "initialContext");
    __publicField(this, "id");
    __publicField(this, "type", "machine");
    __publicField(this, "activityEvents", /* @__PURE__ */ new Map());
    __publicField(this, "delayedEvents", /* @__PURE__ */ new Map());
    __publicField(this, "stateListeners", /* @__PURE__ */ new Set());
    __publicField(this, "contextListeners", /* @__PURE__ */ new Set());
    __publicField(this, "eventListeners", /* @__PURE__ */ new Set());
    __publicField(this, "doneListeners", /* @__PURE__ */ new Set());
    __publicField(this, "contextWatchers", /* @__PURE__ */ new Set());
    __publicField(this, "removeStateListener", noop);
    __publicField(this, "removeEventListener", noop);
    __publicField(this, "removeContextListener", noop);
    __publicField(this, "parent");
    __publicField(this, "children", /* @__PURE__ */ new Map());
    __publicField(this, "guardMap");
    __publicField(this, "actionMap");
    __publicField(this, "delayMap");
    __publicField(this, "activityMap");
    __publicField(this, "sync");
    __publicField(this, "options");
    __publicField(this, "config");
    __publicField(this, "start", (init) => {
      this.state.value = "";
      if (this.status === "Running") {
        return this;
      }
      this.status = "Running";
      this.removeStateListener = subscribe(this.state, () => {
        this.stateListeners.forEach((listener) => {
          listener(this.stateSnapshot);
        });
      }, this.sync);
      this.removeEventListener = subscribeKey(this.state, "event", (event22) => {
        this.executeActions(this.config.onEvent, event22);
        this.eventListeners.forEach((listener) => {
          listener(event22);
        });
      }, this.sync);
      this.removeContextListener = subscribe(this.state.context, () => {
        this.log("Context:", this.contextSnapshot);
        this.contextListeners.forEach((listener) => {
          listener(this.contextSnapshot);
        });
      }, this.sync || this.options.debug);
      this.setupContextWatchers();
      this.executeActivities(toEvent("machine.start"), toArray(this.config.activities), "machine.start");
      this.executeActions(this.config.entry, toEvent("machine.start"));
      const event2 = toEvent("machine.init");
      const target = isObject2(init) ? init.value : init;
      const context = isObject2(init) ? init.context : void 0;
      if (context) {
        this.setContext(context);
      }
      const transition = {
        target: target ?? this.config.initial
      };
      const next = this.getNextStateInfo(transition, event2);
      this.initialState = next;
      this.performStateChangeEffects(this.state.value, next, event2);
      return this;
    });
    __publicField(this, "setupContextWatchers", () => {
      for (const [key, fn] of Object.entries(this.config.watch ?? {})) {
        const compareFn = this.options.compareFns?.[key];
        const cleanup = subscribeKey(this.state.context, key, () => {
          this.executeActions(fn, this.state.event);
        }, this.sync, compareFn);
        this.contextWatchers.add(cleanup);
      }
    });
    __publicField(this, "stop", () => {
      if (this.status === "Stopped")
        return;
      this.performExitEffects(this.state.value, toEvent("machine.stop"));
      this.executeActions(this.config.exit, toEvent("machine.stop"));
      this.setState("");
      this.setEvent("machine.stop");
      this.stopStateListeners();
      this.stopChildren();
      this.stopActivities();
      this.stopDelayedEvents();
      this.stopContextWatchers();
      this.stopEventListeners();
      this.stopContextListeners();
      this.status = "Stopped";
      return this;
    });
    __publicField(this, "stopEventListeners", () => {
      this.eventListeners.clear();
      this.removeEventListener();
    });
    __publicField(this, "stopContextListeners", () => {
      this.contextListeners.clear();
      this.removeContextListener();
    });
    __publicField(this, "stopStateListeners", () => {
      this.removeStateListener();
      this.stateListeners.clear();
    });
    __publicField(this, "stopContextWatchers", () => {
      this.contextWatchers.forEach((fn) => fn());
      this.contextWatchers.clear();
    });
    __publicField(this, "stopDelayedEvents", () => {
      this.delayedEvents.forEach((state) => {
        state.forEach((stop) => stop());
      });
      this.delayedEvents.clear();
    });
    __publicField(this, "stopActivities", (state) => {
      if (state) {
        this.activityEvents.get(state)?.forEach((stop) => stop());
        this.activityEvents.get(state)?.clear();
        this.activityEvents.delete(state);
      } else {
        this.activityEvents.forEach((state2) => {
          state2.forEach((stop) => stop());
          state2.clear();
        });
        this.activityEvents.clear();
      }
    });
    __publicField(this, "sendChild", (evt, to) => {
      const event2 = toEvent(evt);
      const id = runIfFn(to, this.contextSnapshot);
      const child = this.children.get(id);
      if (!child) {
        invariant(`[@zag-js/core] Cannot send '${event2.type}' event to unknown child`);
      }
      child.send(event2);
    });
    __publicField(this, "stopChild", (id) => {
      if (!this.children.has(id)) {
        invariant(`[@zag-js/core > stop-child] Cannot stop unknown child ${id}`);
      }
      this.children.get(id).stop();
      this.children.delete(id);
    });
    __publicField(this, "removeChild", (id) => {
      this.children.delete(id);
    });
    __publicField(this, "stopChildren", () => {
      this.children.forEach((child) => child.stop());
      this.children.clear();
    });
    __publicField(this, "setParent", (parent) => {
      this.parent = parent;
    });
    __publicField(this, "spawn", (src, id) => {
      const actor = runIfFn(src);
      if (id)
        actor.id = id;
      actor.type = "machine.actor";
      actor.setParent(this);
      this.children.set(actor.id, cast(actor));
      actor.onDone(() => {
        this.removeChild(actor.id);
      }).start();
      return cast(ref(actor));
    });
    __publicField(this, "stopActivity", (key) => {
      if (!this.state.value)
        return;
      const cleanups = this.activityEvents.get(this.state.value);
      cleanups?.get(key)?.();
      cleanups?.delete(key);
    });
    __publicField(this, "addActivityCleanup", (state, key, cleanup) => {
      if (!state)
        return;
      if (!this.activityEvents.has(state)) {
        this.activityEvents.set(state, /* @__PURE__ */ new Map([[key, cleanup]]));
      } else {
        this.activityEvents.get(state)?.set(key, cleanup);
      }
    });
    __publicField(this, "setState", (target) => {
      this.state.previousValue = this.state.value;
      this.state.value = target;
      const stateNode = this.getStateNode(target);
      if (target == null) {
        clear(this.state.tags);
      } else {
        this.state.tags = toArray(stateNode?.tags);
      }
    });
    __publicField(this, "transformContext", (context) => {
      this.options?.transformContext?.(context);
      return context;
    });
    __publicField(this, "setContext", (context) => {
      if (!context)
        return;
      deepMerge(this.state.context, this.transformContext(context));
    });
    __publicField(this, "withContext", (context) => {
      const transformed = this.transformContext(context);
      const newContext = { ...this.config.context, ...compact(transformed) };
      return new _Machine({ ...this.config, context: newContext }, this.options);
    });
    __publicField(this, "setOptions", (options2) => {
      const opts = compact(options2);
      this.actionMap = { ...this.actionMap, ...opts.actions };
      this.delayMap = { ...this.delayMap, ...opts.delays };
      this.activityMap = { ...this.activityMap, ...opts.activities };
      this.guardMap = { ...this.guardMap, ...opts.guards };
    });
    __publicField(this, "getStateNode", (state) => {
      if (!state)
        return;
      return this.config.states?.[state];
    });
    __publicField(this, "getNextStateInfo", (transitions, event2) => {
      const transition = this.determineTransition(transitions, event2);
      const isTargetless = !transition?.target;
      const target = transition?.target ?? this.state.value;
      const changed = this.state.value !== target;
      const stateNode = this.getStateNode(target);
      const reenter = !isTargetless && !changed && !transition?.internal;
      const info = {
        reenter,
        transition,
        stateNode,
        target,
        changed
      };
      this.log("NextState:", `[${event2.type}]`, this.state.value, "---->", info.target);
      return info;
    });
    __publicField(this, "getActionFromDelayedTransition", (transition) => {
      const event2 = toEvent("machine.after");
      const determineDelay = determineDelayFn(transition.delay, this.delayMap);
      const delay = determineDelay(this.contextSnapshot, event2);
      let id;
      return {
        entry: () => {
          id = globalThis.setTimeout(() => {
            const next = this.getNextStateInfo(transition, event2);
            this.performStateChangeEffects(this.state.value, next, event2);
          }, delay);
        },
        exit: () => {
          globalThis.clearTimeout(id);
        }
      };
    });
    __publicField(this, "getDelayedEventActions", (state) => {
      const stateNode = this.getStateNode(state);
      const event2 = toEvent("machine.after");
      if (!stateNode || !stateNode.after)
        return;
      const entries = [];
      const exits = [];
      if (isArray(stateNode.after)) {
        const transition = this.determineTransition(stateNode.after, event2);
        if (!transition)
          return;
        const actions = this.getActionFromDelayedTransition(transition);
        entries.push(actions.entry);
        exits.push(actions.exit);
      } else if (isObject2(stateNode.after)) {
        for (const delay in stateNode.after) {
          const transition = stateNode.after[delay];
          let resolvedTransition = {};
          if (isArray(transition)) {
            const picked = this.determineTransition(transition, event2);
            if (picked)
              resolvedTransition = picked;
          } else if (isString(transition)) {
            resolvedTransition = { target: transition, delay };
          } else {
            resolvedTransition = { ...transition, delay };
          }
          const actions = this.getActionFromDelayedTransition(resolvedTransition);
          entries.push(actions.entry);
          exits.push(actions.exit);
        }
      }
      return { entries, exits };
    });
    __publicField(this, "executeActions", (actions, event2) => {
      const pickedActions = determineActionsFn(actions, this.guardMap)(this.contextSnapshot, event2, this.guardMeta);
      for (const action of toArray(pickedActions)) {
        const fn = isString(action) ? this.actionMap?.[action] : action;
        warn(isString(action) && !fn, `[@zag-js/core > execute-actions] No implementation found for action: \`${action}\``);
        fn?.(this.state.context, event2, this.meta);
      }
    });
    __publicField(this, "executeActivities", (event2, activities, state) => {
      for (const activity of activities) {
        const fn = isString(activity) ? this.activityMap?.[activity] : activity;
        if (!fn) {
          warn(`[@zag-js/core > execute-activity] No implementation found for activity: \`${activity}\``);
          continue;
        }
        const cleanup = fn(this.state.context, event2, this.meta);
        if (cleanup) {
          const key = isString(activity) ? activity : activity.name || uuid();
          this.addActivityCleanup(state ?? this.state.value, key, cleanup);
        }
      }
    });
    __publicField(this, "createEveryActivities", (every, callbackfn) => {
      if (!every)
        return;
      const event2 = toEvent("machine.every");
      if (isArray(every)) {
        const picked = toArray(every).find((transition) => {
          const delayOrFn = transition.delay;
          const determineDelay2 = determineDelayFn(delayOrFn, this.delayMap);
          const delay2 = determineDelay2(this.contextSnapshot, event2);
          const determineGuard = determineGuardFn(transition.guard, this.guardMap);
          const guard = determineGuard(this.contextSnapshot, event2, this.guardMeta);
          return guard ?? delay2 != null;
        });
        if (!picked)
          return;
        const determineDelay = determineDelayFn(picked.delay, this.delayMap);
        const delay = determineDelay(this.contextSnapshot, event2);
        const activity = () => {
          const id = globalThis.setInterval(() => {
            this.executeActions(picked.actions, event2);
          }, delay);
          return () => {
            globalThis.clearInterval(id);
          };
        };
        callbackfn(activity);
      } else {
        for (const interval in every) {
          const actions = every?.[interval];
          const determineDelay = determineDelayFn(interval, this.delayMap);
          const delay = determineDelay(this.contextSnapshot, event2);
          const activity = () => {
            const id = globalThis.setInterval(() => {
              this.executeActions(actions, event2);
            }, delay);
            return () => {
              globalThis.clearInterval(id);
            };
          };
          callbackfn(activity);
        }
      }
    });
    __publicField(this, "setEvent", (event2) => {
      this.state.previousEvent = this.state.event;
      this.state.event = ref(toEvent(event2));
    });
    __publicField(this, "performExitEffects", (current, event2) => {
      const currentState = this.state.value;
      if (currentState === "")
        return;
      const stateNode = current ? this.getStateNode(current) : void 0;
      this.stopActivities(currentState);
      const _exit = determineActionsFn(stateNode?.exit, this.guardMap)(this.contextSnapshot, event2, this.guardMeta);
      const exitActions = toArray(_exit);
      const afterExitActions = this.delayedEvents.get(currentState);
      if (afterExitActions) {
        exitActions.push(...afterExitActions);
      }
      this.executeActions(exitActions, event2);
      this.eventListeners.clear();
    });
    __publicField(this, "performEntryEffects", (next, event2) => {
      const stateNode = this.getStateNode(next);
      const activities = toArray(stateNode?.activities);
      this.createEveryActivities(stateNode?.every, (activity) => {
        activities.unshift(activity);
      });
      if (activities.length > 0) {
        this.executeActivities(event2, activities);
      }
      const pickedActions = determineActionsFn(stateNode?.entry, this.guardMap)(this.contextSnapshot, event2, this.guardMeta);
      const entryActions = toArray(pickedActions);
      const afterActions = this.getDelayedEventActions(next);
      if (stateNode?.after && afterActions) {
        this.delayedEvents.set(next, afterActions?.exits);
        entryActions.push(...afterActions.entries);
      }
      this.executeActions(entryActions, event2);
      if (stateNode?.type === "final") {
        this.state.done = true;
        this.doneListeners.forEach((listener) => {
          listener(this.stateSnapshot);
        });
        this.stop();
      }
    });
    __publicField(this, "performTransitionEffects", (transitions, event2) => {
      const transition = this.determineTransition(transitions, event2);
      this.executeActions(transition?.actions, event2);
    });
    __publicField(this, "performStateChangeEffects", (current, next, event2) => {
      this.setEvent(event2);
      const changed = next.changed || next.reenter;
      if (changed) {
        this.performExitEffects(current, event2);
      }
      this.performTransitionEffects(next.transition, event2);
      this.setState(next.target);
      if (changed) {
        this.performEntryEffects(next.target, event2);
      }
    });
    __publicField(this, "determineTransition", (transition, event2) => {
      const fn = determineTransitionFn(transition, this.guardMap);
      return fn?.(this.contextSnapshot, event2, this.guardMeta);
    });
    __publicField(this, "sendParent", (evt) => {
      if (!this.parent) {
        invariant("[@zag-js/core > send-parent] Cannot send event to an unknown parent");
      }
      const event2 = toEvent(evt);
      this.parent?.send(event2);
    });
    __publicField(this, "log", (...args) => {
      if (isDev2() && this.options.debug) {
        console.log(...args);
      }
    });
    __publicField(this, "send", (evt) => {
      const event2 = toEvent(evt);
      this.transition(this.state.value, event2);
    });
    __publicField(this, "transition", (state, evt) => {
      const stateNode = isString(state) ? this.getStateNode(state) : state?.stateNode;
      const event2 = toEvent(evt);
      if (!stateNode && !this.config.on) {
        const msg = this.status === "Stopped" ? "[@zag-js/core > transition] Cannot transition a stopped machine" : `[@zag-js/core > transition] State does not have a definition for \`state\`: ${state}, \`event\`: ${event2.type}`;
        warn(msg);
        return;
      }
      const transitions = stateNode?.on?.[event2.type] ?? this.config.on?.[event2.type];
      const next = this.getNextStateInfo(transitions, event2);
      this.performStateChangeEffects(this.state.value, next, event2);
      return next.stateNode;
    });
    __publicField(this, "subscribe", (listener) => {
      this.stateListeners.add(listener);
      if (this.status === "Running") {
        listener(this.stateSnapshot);
      }
      return () => {
        this.stateListeners.delete(listener);
      };
    });
    __publicField(this, "onDone", (listener) => {
      this.doneListeners.add(listener);
      return this;
    });
    __publicField(this, "onTransition", (listener) => {
      this.stateListeners.add(listener);
      if (this.status === "Running") {
        listener(this.stateSnapshot);
      }
      return this;
    });
    __publicField(this, "onChange", (listener) => {
      this.contextListeners.add(listener);
      return this;
    });
    __publicField(this, "onEvent", (listener) => {
      this.eventListeners.add(listener);
      return this;
    });
    this.config = structuredClone(config);
    this.options = structuredClone(options ?? {});
    this.id = this.config.id ?? `machine-${uuid()}`;
    this.guardMap = this.options?.guards ?? {};
    this.actionMap = this.options?.actions ?? {};
    this.delayMap = this.options?.delays ?? {};
    this.activityMap = this.options?.activities ?? {};
    this.sync = this.options?.sync ?? false;
    this.state = createProxy(this.config);
    this.initialContext = snapshot(this.state.context);
    this.transformContext(this.state.context);
    const event = toEvent("machine.created");
    this.executeActions(this.config?.created, event);
  }
  get stateSnapshot() {
    return cast(snapshot(this.state));
  }
  getState() {
    return this.stateSnapshot;
  }
  get contextSnapshot() {
    return this.stateSnapshot.context;
  }
  get self() {
    const self = this;
    return {
      id: this.id,
      send: this.send.bind(this),
      sendParent: this.sendParent.bind(this),
      sendChild: this.sendChild.bind(this),
      stop: this.stop.bind(this),
      stopChild: this.stopChild.bind(this),
      spawn: this.spawn.bind(this),
      stopActivity: this.stopActivity.bind(this),
      get state() {
        return self.stateSnapshot;
      },
      get initialContext() {
        return self.initialContext;
      },
      get initialState() {
        return self.initialState?.target ?? "";
      }
    };
  }
  get meta() {
    return {
      state: this.stateSnapshot,
      guards: this.guardMap,
      send: this.send.bind(this),
      self: this.self,
      initialContext: this.initialContext,
      initialState: this.initialState?.target ?? "",
      getState: () => this.stateSnapshot,
      getAction: (key) => this.actionMap[key],
      getGuard: (key) => this.guardMap[key]
    };
  }
  get guardMeta() {
    return {
      state: this.stateSnapshot
    };
  }
  get [Symbol.toStringTag]() {
    return "Machine";
  }
};
var createMachine = (config, options) => new Machine(config, options);
var clsx = (...args) => args.map((str) => str?.trim?.()).filter(Boolean).join(" ");
var eventRegex = /^on[A-Z]/;
function mergeProps(...args) {
  let result = {};
  for (let props of args) {
    for (let key in result) {
      if (eventRegex.test(key) && typeof result[key] === "function" && typeof props[key] === "function") {
        result[key] = callAll(result[key], props[key]);
        continue;
      }
      if (key === "className" || key === "class") {
        result[key] = clsx(result[key], props[key]);
        continue;
      }
      if (key === "style") {
        result[key] = Object.assign({}, result[key] ?? {}, props[key] ?? {});
        continue;
      }
      result[key] = props[key] !== void 0 ? props[key] : result[key];
    }
    for (let key in props) {
      if (result[key] === void 0) {
        result[key] = props[key];
      }
    }
  }
  return result;
}

// node_modules/@zag-js/types/dist/index.mjs
function createNormalizer(fn) {
  return new Proxy({}, {
    get() {
      return fn;
    }
  });
}

// node_modules/@zag-js/react/dist/index.mjs
import { Children, useReducer } from "react";
import { createPortal } from "react-dom";
import { useEffect, useLayoutEffect } from "react";
import { Fragment, jsx } from "react/jsx-runtime";
import ReactExport, { useCallback, useEffect as useEffect3, useMemo, useRef as useRef2, useSyncExternalStore } from "react";
import { useEffect as useEffect2, useRef } from "react";
import { useRef as useRef3 } from "react";
"use client";
var normalizeProps = createNormalizer((v2) => v2);
var useSafeLayoutEffect = typeof document !== "undefined" ? useLayoutEffect : useEffect;
var isArrayLike = (value) => value?.constructor.name === "Array";
var isEqual = (a3, b2) => {
  if (Object.is(a3, b2))
    return true;
  if (a3 == null && b2 != null || a3 != null && b2 == null)
    return false;
  if (typeof a3?.isEqual === "function" && typeof b2?.isEqual === "function") {
    return a3.isEqual(b2);
  }
  if (typeof a3 === "function" && typeof b2 === "function") {
    return a3.toString() === b2.toString();
  }
  if (isArrayLike(a3) && isArrayLike(b2)) {
    return Array.from(a3).toString() === Array.from(b2).toString();
  }
  if (!(typeof a3 === "object") || !(typeof b2 === "object"))
    return false;
  const keys = Object.keys(b2 ?? /* @__PURE__ */ Object.create(null));
  const length = keys.length;
  for (let i3 = 0; i3 < length; i3++) {
    const hasKey = Reflect.has(a3, keys[i3]);
    if (!hasKey)
      return false;
  }
  for (let i3 = 0; i3 < length; i3++) {
    const key = keys[i3];
    if (!isEqual(a3[key], b2[key]))
      return false;
  }
  return true;
};
function compact2(obj) {
  if (!isPlainObject2(obj) || obj === void 0) {
    return obj;
  }
  const keys = Reflect.ownKeys(obj).filter((key) => typeof key === "string");
  const filtered = {};
  for (const key of keys) {
    const value = obj[key];
    if (value !== void 0) {
      filtered[key] = compact2(value);
    }
  }
  return filtered;
}
var isPlainObject2 = (value) => {
  return value && typeof value === "object" && value.constructor === Object;
};
function useUpdateEffect(callback, deps) {
  const render = useRef(false);
  const effect = useRef(false);
  useEffect2(() => {
    const mounted = render.current;
    const run = mounted && effect.current;
    if (run) {
      return callback();
    }
    effect.current = true;
  }, deps);
  useEffect2(() => {
    render.current = true;
    return () => {
      render.current = false;
    };
  }, []);
}
var { use } = ReactExport;
var targetCache = /* @__PURE__ */ new WeakMap();
function useSnapshot(service, options) {
  const { actions, context, sync: notifyInSync } = options ?? {};
  const lastSnapshot = useRef2();
  const lastAffected = useRef2();
  const currSnapshot = useSyncExternalStore(useCallback((callback) => subscribe(service.state, callback, notifyInSync), [notifyInSync]), () => {
    const nextSnapshot = snapshot(service.state, use);
    try {
      if (lastSnapshot.current && lastAffected.current && !p(lastSnapshot.current, nextSnapshot, lastAffected.current, /* @__PURE__ */ new WeakMap())) {
        return lastSnapshot.current;
      }
    } catch (e3) {
    }
    return nextSnapshot;
  }, () => snapshot(service.state, use));
  service.setOptions({ actions });
  const ctx = useMemo(() => compact2(context ?? {}), [context]);
  useUpdateEffect(() => {
    const entries = Object.entries(ctx);
    const equality = entries.map(([key, value]) => ({
      key,
      curr: value,
      prev: currSnapshot.context[key],
      equal: isEqual(currSnapshot.context[key], value)
    }));
    const allEqual = equality.every(({ equal }) => equal);
    if (!allEqual) {
      service.setContext(ctx);
    }
  }, [ctx]);
  const currAffected = /* @__PURE__ */ new WeakMap();
  useEffect3(() => {
    lastSnapshot.current = currSnapshot;
    lastAffected.current = currAffected;
  });
  const proxyCache = useMemo(() => /* @__PURE__ */ new WeakMap(), []);
  return a(currSnapshot, currAffected, proxyCache, targetCache);
}
function useConstant(fn) {
  const ref2 = useRef3();
  if (!ref2.current)
    ref2.current = { v: fn() };
  return ref2.current.v;
}
function useService(machine2, options) {
  const { state: hydratedState, context } = options ?? {};
  const service = useConstant(() => {
    const instance = typeof machine2 === "function" ? machine2() : machine2;
    return context ? instance.withContext(context) : instance;
  });
  useSafeLayoutEffect(() => {
    service.start(hydratedState);
    return () => {
      service.stop();
    };
  }, []);
  return service;
}
function useMachine(machine2, options) {
  const service = useService(machine2, options);
  const state = useSnapshot(service, options);
  return [state, service.send, service];
}

// node_modules/@ark-ui/react/create-split-props.mjs
"use client";
var createSplitProps = () => (props, keys) => keys.reduce((previousValue, currentValue) => {
  const [target, source] = previousValue;
  const key = currentValue;
  if (source[key] !== void 0) {
    target[key] = source[key];
  }
  delete source[key];
  return [target, source];
}, [{}, { ...props }]);

// node_modules/@ark-ui/react/factory.mjs
import { forwardRef, createElement, Children as Children2, isValidElement, cloneElement } from "react";

// node_modules/@ark-ui/react/compose-refs.mjs
function setRef(ref2, value) {
  if (typeof ref2 === "function") {
    ref2(value);
  } else if (ref2 !== null && ref2 !== void 0) {
    ref2.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => refs.forEach((ref2) => setRef(ref2, node));
}

// node_modules/@ark-ui/react/factory.mjs
var withAsChild = (Component) => {
  const Comp = forwardRef((props, ref2) => {
    const { asChild, children, ...restProps } = props;
    if (!asChild) {
      return createElement(Component, { ...restProps, ref: ref2 }, children);
    }
    const onlyChild = Children2.only(children);
    return isValidElement(onlyChild) ? cloneElement(onlyChild, {
      ...mergeProps(restProps, onlyChild.props),
      ref: ref2 ? composeRefs(ref2, onlyChild.ref) : onlyChild.ref
    }) : null;
  });
  Comp.displayName = Component.displayName || Component.name;
  return Comp;
};
var jsxFactory = () => {
  const cache = /* @__PURE__ */ new Map();
  return new Proxy(withAsChild, {
    apply(target, thisArg, argArray) {
      return withAsChild(argArray[0]);
    },
    get(_, element) {
      const asElement = element;
      if (!cache.has(asElement)) {
        cache.set(asElement, withAsChild(asElement));
      }
      return cache.get(asElement);
    }
  });
};
var ark = jsxFactory();

// node_modules/@ark-ui/react/use-event.mjs
import { useCallback as useCallback2, useRef as useRef4 } from "react";
"use client";
function useEvent(callback, opts = {}) {
  const { sync = false } = opts;
  const callbackRef = useLatestRef(callback);
  return useCallback2((...args) => {
    if (sync)
      return queueMicrotask(() => callbackRef.current?.(...args));
    return callbackRef.current?.(...args);
  }, [sync, callbackRef]);
}
function useLatestRef(value) {
  const ref2 = useRef4(value);
  ref2.current = value;
  return ref2;
}

// node_modules/@ark-ui/react/create-context.mjs
import { createContext as createContext$1, useContext } from "react";
"use client";
function getErrorMessage(hook, provider) {
  return `${hook} returned \`undefined\`. Seems you forgot to wrap component within ${provider}`;
}
function createContext(options = {}) {
  const {
    name,
    strict = true,
    hookName = "useContext",
    providerName = "Provider",
    errorMessage
  } = options;
  const Context = createContext$1(void 0);
  Context.displayName = name;
  function useContext$1() {
    const context = useContext(Context);
    if (!context && strict) {
      const error = new Error(errorMessage ?? getErrorMessage(hookName, providerName));
      error.name = "ContextError";
      Error.captureStackTrace?.(error, useContext$1);
      throw error;
    }
    return context;
  }
  return [Context.Provider, useContext$1, Context];
}

// node_modules/@zag-js/anatomy/dist/index.mjs
var createAnatomy = (name, parts2 = []) => ({
  parts: (...values) => {
    if (isEmpty(parts2)) {
      return createAnatomy(name, values);
    }
    throw new Error("createAnatomy().parts(...) should only be called once. Did you mean to use .extendWith(...) ?");
  },
  extendWith: (...values) => createAnatomy(name, [...parts2, ...values]),
  rename: (newName) => createAnatomy(newName, parts2),
  keys: () => parts2,
  build: () => [...new Set(parts2)].reduce((prev, part) => Object.assign(prev, {
    [part]: {
      selector: [
        `&[data-scope="${toKebabCase(name)}"][data-part="${toKebabCase(part)}"]`,
        `& [data-scope="${toKebabCase(name)}"][data-part="${toKebabCase(part)}"]`
      ].join(", "),
      attrs: { "data-scope": toKebabCase(name), "data-part": toKebabCase(part) }
    }
  }), {})
});
var toKebabCase = (value) => value.replace(/([A-Z])([A-Z])/g, "$1-$2").replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();
var isEmpty = (v2) => v2.length === 0;

// node_modules/@zag-js/dom-query/dist/index.mjs
var dataAttr = (guard) => {
  return guard ? "" : void 0;
};
var getDocument = (node) => {
  if (node.nodeType === Node.DOCUMENT_NODE)
    return node;
  return node.ownerDocument ?? document;
};
function createScope(methods) {
  const screen = {
    getRootNode: (ctx) => ctx.getRootNode?.() ?? document,
    getDoc: (ctx) => getDocument(screen.getRootNode(ctx)),
    getWin: (ctx) => screen.getDoc(ctx).defaultView ?? window,
    getActiveElement: (ctx) => screen.getDoc(ctx).activeElement,
    isActiveElement: (ctx, elem) => elem === screen.getActiveElement(ctx),
    focus(ctx, elem) {
      if (elem == null)
        return;
      if (!screen.isActiveElement(ctx, elem))
        elem.focus({ preventScroll: true });
    },
    getById: (ctx, id) => screen.getRootNode(ctx).getElementById(id),
    setValue: (elem, value) => {
      if (elem == null || value == null)
        return;
      const valueAsString = value.toString();
      if (elem.value === valueAsString)
        return;
      elem.value = value.toString();
    }
  };
  return { ...screen, ...methods };
}

// node_modules/@zag-js/utils/dist/index.mjs
var isArrayLike2 = (value) => value?.constructor.name === "Array";
var isEqual2 = (a3, b2) => {
  if (Object.is(a3, b2))
    return true;
  if (a3 == null && b2 != null || a3 != null && b2 == null)
    return false;
  if (typeof a3?.isEqual === "function" && typeof b2?.isEqual === "function") {
    return a3.isEqual(b2);
  }
  if (typeof a3 === "function" && typeof b2 === "function") {
    return a3.toString() === b2.toString();
  }
  if (isArrayLike2(a3) && isArrayLike2(b2)) {
    return Array.from(a3).toString() === Array.from(b2).toString();
  }
  if (!(typeof a3 === "object") || !(typeof b2 === "object"))
    return false;
  const keys = Object.keys(b2 ?? /* @__PURE__ */ Object.create(null));
  const length = keys.length;
  for (let i3 = 0; i3 < length; i3++) {
    const hasKey = Reflect.has(a3, keys[i3]);
    if (!hasKey)
      return false;
  }
  for (let i3 = 0; i3 < length; i3++) {
    const key = keys[i3];
    if (!isEqual2(a3[key], b2[key]))
      return false;
  }
  return true;
};
function compact3(obj) {
  if (!isPlainObject3(obj) || obj === void 0) {
    return obj;
  }
  const keys = Reflect.ownKeys(obj).filter((key) => typeof key === "string");
  const filtered = {};
  for (const key of keys) {
    const value = obj[key];
    if (value !== void 0) {
      filtered[key] = compact3(value);
    }
  }
  return filtered;
}
var isPlainObject3 = (value) => {
  return value && typeof value === "object" && value.constructor === Object;
};

// node_modules/@ark-ui/react/run-if-fn.mjs
"use client";
var isFunction2 = (value) => typeof value === "function";
var runIfFn2 = (valueOrFn, ...args) => isFunction2(valueOrFn) ? valueOrFn(...args) : valueOrFn;

// node_modules/@ark-ui/react/environment/environment-context.mjs
"use client";
var [EnvironmentProvider, useEnvironmentContext] = createContext({
  name: "EnvironmentContext",
  hookName: "useEnvironmentContext",
  providerName: "<EnvironmentProvider />",
  strict: false
});

// node_modules/@zag-js/mutation-observer/dist/index.mjs
function observeAttributes(node, attributes, fn) {
  if (!node)
    return;
  const win = node.ownerDocument.defaultView || window;
  const obs = new win.MutationObserver((changes) => {
    for (const change of changes) {
      if (change.type === "attributes" && change.attributeName && attributes.includes(change.attributeName)) {
        fn(change);
      }
    }
  });
  obs.observe(node, { attributes: true, attributeFilter: attributes });
  return () => obs.disconnect();
}

// node_modules/@zag-js/visually-hidden/dist/index.mjs
var visuallyHiddenStyle = {
  border: "0",
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: "0",
  position: "absolute",
  width: "1px",
  whiteSpace: "nowrap",
  wordWrap: "normal"
};

// node_modules/@zag-js/form-utils/dist/index.mjs
var getWindow = (el) => el.ownerDocument.defaultView || window;
function getDescriptor(el, options) {
  const { type = "HTMLInputElement", property = "value" } = options;
  const proto = getWindow(el)[type].prototype;
  return Object.getOwnPropertyDescriptor(proto, property) ?? {};
}
function setElementChecked(el, checked) {
  const descriptor = getDescriptor(el, { type: "HTMLInputElement", property: "checked" });
  descriptor.set?.call(el, checked);
}
function dispatchInputCheckedEvent(el, options) {
  const { checked, bubbles = true } = options;
  if (!el)
    return;
  const win = getWindow(el);
  if (!(el instanceof win.HTMLInputElement))
    return;
  setElementChecked(el, checked);
  el.dispatchEvent(new win.Event("click", { bubbles }));
  el.dispatchEvent(new win.Event("change", { bubbles }));
}
function getClosestForm(el) {
  if (isFormElement(el))
    return el.form;
  else
    return el.closest("form");
}
function isFormElement(el) {
  return el.matches("textarea, input, select, button");
}
function trackFormReset(el, callback) {
  if (!el)
    return;
  const form = getClosestForm(el);
  form?.addEventListener("reset", callback, { passive: true });
  return () => {
    form?.removeEventListener("reset", callback);
  };
}
function trackFieldsetDisabled(el, callback) {
  const fieldset = el?.closest("fieldset");
  if (!fieldset)
    return;
  callback(fieldset.disabled);
  return observeAttributes(fieldset, ["disabled"], () => callback(fieldset.disabled));
}
function trackFormControl(el, options) {
  if (!el)
    return;
  const { onFieldsetDisabledChange, onFormReset } = options;
  const cleanups = [trackFormReset(el, onFormReset), trackFieldsetDisabled(el, onFieldsetDisabledChange)];
  return () => {
    cleanups.forEach((cleanup) => cleanup?.());
  };
}

// node_modules/@zag-js/switch/dist/index.mjs
var anatomy = createAnatomy("switch").parts("root", "label", "control", "thumb");
var parts = anatomy.build();
var dom = createScope({
  getRootId: (ctx) => ctx.ids?.root ?? `switch:${ctx.id}`,
  getLabelId: (ctx) => ctx.ids?.label ?? `switch:${ctx.id}:label`,
  getThumbId: (ctx) => ctx.ids?.thumb ?? `switch:${ctx.id}:thumb`,
  getControlId: (ctx) => ctx.ids?.control ?? `switch:${ctx.id}:control`,
  getHiddenInputId: (ctx) => ctx.ids?.input ?? `switch:${ctx.id}:input`,
  getHiddenInputEl: (ctx) => dom.getById(ctx, dom.getHiddenInputId(ctx))
});
function connect(state, send, normalize) {
  const isDisabled = state.context.isDisabled;
  const isFocused = !isDisabled && state.context.focused;
  const isChecked = state.context.checked;
  const dataAttrs = {
    "data-active": dataAttr(state.context.active),
    "data-focus": dataAttr(isFocused),
    "data-hover": dataAttr(state.context.hovered),
    "data-disabled": dataAttr(isDisabled),
    "data-state": state.context.checked ? "checked" : "unchecked",
    "data-invalid": dataAttr(state.context.invalid)
  };
  return {
    isChecked,
    isDisabled,
    isFocused,
    setChecked(checked) {
      send({ type: "CHECKED.SET", checked, isTrusted: false });
    },
    toggleChecked() {
      send({ type: "CHECKED.TOGGLE", checked: isChecked, isTrusted: false });
    },
    rootProps: normalize.label({
      ...parts.root.attrs,
      ...dataAttrs,
      dir: state.context.dir,
      id: dom.getRootId(state.context),
      htmlFor: dom.getHiddenInputId(state.context),
      onPointerMove() {
        if (isDisabled)
          return;
        send({ type: "CONTEXT.SET", context: { hovered: true } });
      },
      onPointerLeave() {
        if (isDisabled)
          return;
        send({ type: "CONTEXT.SET", context: { hovered: false } });
      },
      onPointerDown(event) {
        if (isDisabled)
          return;
        if (isFocused)
          event.preventDefault();
        send({ type: "CONTEXT.SET", context: { active: true } });
      },
      onPointerUp() {
        if (isDisabled)
          return;
        send({ type: "CONTEXT.SET", context: { active: false } });
      },
      onClick(event) {
        if (event.target === dom.getHiddenInputEl(state.context)) {
          event.stopPropagation();
        }
      }
    }),
    labelProps: normalize.element({
      ...parts.label.attrs,
      ...dataAttrs,
      dir: state.context.dir,
      id: dom.getLabelId(state.context)
    }),
    thumbProps: normalize.element({
      ...parts.thumb.attrs,
      ...dataAttrs,
      dir: state.context.dir,
      id: dom.getThumbId(state.context),
      "aria-hidden": true
    }),
    controlProps: normalize.element({
      ...parts.control.attrs,
      ...dataAttrs,
      dir: state.context.dir,
      id: dom.getControlId(state.context),
      "aria-hidden": true
    }),
    hiddenInputProps: normalize.input({
      id: dom.getHiddenInputId(state.context),
      type: "checkbox",
      required: state.context.required,
      defaultChecked: isChecked,
      disabled: isDisabled,
      "aria-labelledby": dom.getLabelId(state.context),
      "aria-invalid": state.context.invalid,
      name: state.context.name,
      form: state.context.form,
      value: state.context.value,
      style: visuallyHiddenStyle,
      onChange(event) {
        const checked = event.currentTarget.checked;
        send({ type: "CHECKED.SET", checked, isTrusted: true });
      },
      onBlur() {
        send({ type: "CONTEXT.SET", context: { focused: false } });
      },
      onFocus() {
        send({ type: "CONTEXT.SET", context: { focused: true } });
      },
      onKeyDown(event) {
        if (event.key === " ") {
          send({ type: "CONTEXT.SET", context: { active: true } });
        }
      },
      onKeyUp(event) {
        if (event.key === " ") {
          send({ type: "CONTEXT.SET", context: { active: false } });
        }
      }
    })
  };
}
var { not: not2 } = guards;
function machine(userContext) {
  const ctx = compact3(userContext);
  return createMachine({
    id: "switch",
    initial: "ready",
    context: {
      checked: false,
      label: "switch",
      value: "on",
      disabled: false,
      ...ctx,
      fieldsetDisabled: false
    },
    computed: {
      isDisabled: (ctx2) => ctx2.disabled || ctx2.fieldsetDisabled
    },
    watch: {
      disabled: "removeFocusIfNeeded",
      checked: "syncInputElement"
    },
    activities: ["trackFormControlState"],
    on: {
      "CHECKED.TOGGLE": [
        {
          guard: not2("isTrusted"),
          actions: ["toggleChecked", "dispatchChangeEvent"]
        },
        {
          actions: ["toggleChecked"]
        }
      ],
      "CHECKED.SET": [
        {
          guard: not2("isTrusted"),
          actions: ["setChecked", "dispatchChangeEvent"]
        },
        {
          actions: ["setChecked"]
        }
      ],
      "CONTEXT.SET": {
        actions: ["setContext"]
      }
    },
    states: {
      ready: {}
    }
  }, {
    guards: {
      isTrusted: (_ctx, evt) => !!evt.isTrusted
    },
    activities: {
      trackFormControlState(ctx2, _evt, { send, initialContext }) {
        return trackFormControl(dom.getHiddenInputEl(ctx2), {
          onFieldsetDisabledChange(disabled) {
            ctx2.fieldsetDisabled = disabled;
          },
          onFormReset() {
            send({ type: "CHECKED.SET", checked: !!initialContext.checked, src: "form-reset" });
          }
        });
      }
    },
    actions: {
      setContext(ctx2, evt) {
        Object.assign(ctx2, evt.context);
      },
      syncInputElement(ctx2) {
        const inputEl = dom.getHiddenInputEl(ctx2);
        if (!inputEl)
          return;
        inputEl.checked = !!ctx2.checked;
      },
      removeFocusIfNeeded(ctx2) {
        if (ctx2.disabled && ctx2.focused) {
          ctx2.focused = false;
        }
      },
      setChecked(ctx2, evt) {
        set2.checked(ctx2, evt.checked);
      },
      toggleChecked(ctx2, _evt) {
        set2.checked(ctx2, !ctx2.checked);
      },
      dispatchChangeEvent(ctx2) {
        const inputEl = dom.getHiddenInputEl(ctx2);
        dispatchInputCheckedEvent(inputEl, { checked: ctx2.checked });
      }
    }
  });
}
var invoke = {
  change: (ctx) => {
    ctx.onCheckedChange?.({ checked: ctx.checked });
  }
};
var set2 = {
  checked: (ctx, checked) => {
    if (isEqual2(ctx.checked, checked))
      return;
    ctx.checked = checked;
    invoke.change(ctx);
  }
};

// node_modules/@ark-ui/react/switch/switch.mjs
import { jsx as jsx2 } from "react/jsx-runtime";
import { forwardRef as forwardRef2 } from "react";

// node_modules/@ark-ui/react/switch/switch-context.mjs
"use client";
var [SwitchProvider, useSwitchContext] = createContext({
  name: "SwitchContext",
  hookName: "useSwitchContext",
  providerName: "<SwitchProvider />"
});

// node_modules/@ark-ui/react/switch/use-switch.mjs
import { useId } from "react";
"use client";
var useSwitch = (props) => {
  const initialContext = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    ...props,
    checked: props.defaultChecked
  };
  const context = {
    ...initialContext,
    checked: props.checked,
    onCheckedChange: useEvent(props.onCheckedChange, { sync: true })
  };
  const [state, send] = useMachine(machine(initialContext), { context });
  return connect(state, send, normalizeProps);
};

// node_modules/@ark-ui/react/switch/switch.mjs
"use client";
var Switch = forwardRef2((props, ref2) => {
  const [switchProps, { children, ...localProps }] = createSplitProps()(props, [
    "checked",
    "defaultChecked",
    "dir",
    "disabled",
    "form",
    "getRootNode",
    "id",
    "ids",
    "invalid",
    "label",
    "name",
    "onCheckedChange",
    "required",
    "value"
  ]);
  const api = useSwitch(switchProps);
  const mergedProps = mergeProps(api.rootProps, localProps);
  const view = runIfFn2(children, api);
  return /* @__PURE__ */ jsx2(SwitchProvider, { value: api, children: /* @__PURE__ */ jsx2(ark.label, { ...mergedProps, ref: ref2, children: view }) });
});
Switch.displayName = "Switch";

// node_modules/@ark-ui/react/switch/switch-control.mjs
import { jsxs, Fragment as Fragment2, jsx as jsx3 } from "react/jsx-runtime";
import { forwardRef as forwardRef3 } from "react";
"use client";
var SwitchControl = forwardRef3((props, ref2) => {
  const api = useSwitchContext();
  const mergedProps = mergeProps(api.controlProps, props);
  return /* @__PURE__ */ jsxs(Fragment2, { children: [
    /* @__PURE__ */ jsx3(ark.span, { ...mergedProps, ref: ref2 }),
    /* @__PURE__ */ jsx3("input", { ...api.hiddenInputProps })
  ] });
});
SwitchControl.displayName = "SwitchControl";

// node_modules/@ark-ui/react/switch/switch-label.mjs
import { jsx as jsx4 } from "react/jsx-runtime";
import { forwardRef as forwardRef4 } from "react";
"use client";
var SwitchLabel = forwardRef4((props, ref2) => {
  const api = useSwitchContext();
  const mergedProps = mergeProps(api.labelProps, props);
  return /* @__PURE__ */ jsx4(ark.span, { ...mergedProps, ref: ref2 });
});
SwitchLabel.displayName = "SwitchLabel";

// node_modules/@ark-ui/react/switch/switch-thumb.mjs
import { jsx as jsx5 } from "react/jsx-runtime";
import { forwardRef as forwardRef5 } from "react";
"use client";
var SwitchThumb = forwardRef5((props, ref2) => {
  const api = useSwitchContext();
  const mergedProps = mergeProps(api.thumbProps, props);
  return /* @__PURE__ */ jsx5(ark.span, { ...mergedProps, ref: ref2 });
});
SwitchThumb.displayName = "SwitchThumb";

// node_modules/@ark-ui/react/switch/index.mjs
"use client";
var Switch2 = Object.assign(Switch, {
  Root: Switch,
  Control: SwitchControl,
  Label: SwitchLabel,
  Thumb: SwitchThumb
});

// esbuild-css-modules-plugin-namespace:/var/folders/v6/zbryl_fj0qbggh_dmkrlt3nw0000gq/T/tmp-40151-0bwDzuThxvfX/framerPrefabs/src/SwitchPrefab.modules.css.js
var digest = "f1af2aa4a68b3beb4ffc81ec03457fb139fa9bdb4b1cbfda62a4bf1140464e8b";
var css = `:root {
    --gray100: #282A2C;
    --gray200: #A7AEB2;
    --gray300: #EBEBEB;
    --gray400: #F0F6F7;
    --gray500: #FFFFFF;
}

._control_utks6_9 {
    background: var(--gray500);
    border-radius: 9999px;
    width: 40px;
    height: 20px;
}

._thumb_utks6_16 {
    height: 1rem;
    width: 1rem;
    background: var(--gray100);
}

._label_utks6_22 {
    color: red
}`;
(function() {
  if (!document.getElementById(digest)) {
    var ele = document.createElement("style");
    ele.id = digest;
    ele.textContent = css;
    document.head.appendChild(ele);
  }
})();
var SwitchPrefab_modules_css_default = { "control": "_control_utks6_9", "thumb": "_thumb_utks6_16", "label": "_label_utks6_22" };

// node_modules/@stitches/react/dist/index.mjs
import Z from "react";
var e2 = "colors";
var t2 = "sizes";
var r2 = "space";
var n2 = { gap: r2, gridGap: r2, columnGap: r2, gridColumnGap: r2, rowGap: r2, gridRowGap: r2, inset: r2, insetBlock: r2, insetBlockEnd: r2, insetBlockStart: r2, insetInline: r2, insetInlineEnd: r2, insetInlineStart: r2, margin: r2, marginTop: r2, marginRight: r2, marginBottom: r2, marginLeft: r2, marginBlock: r2, marginBlockEnd: r2, marginBlockStart: r2, marginInline: r2, marginInlineEnd: r2, marginInlineStart: r2, padding: r2, paddingTop: r2, paddingRight: r2, paddingBottom: r2, paddingLeft: r2, paddingBlock: r2, paddingBlockEnd: r2, paddingBlockStart: r2, paddingInline: r2, paddingInlineEnd: r2, paddingInlineStart: r2, top: r2, right: r2, bottom: r2, left: r2, scrollMargin: r2, scrollMarginTop: r2, scrollMarginRight: r2, scrollMarginBottom: r2, scrollMarginLeft: r2, scrollMarginX: r2, scrollMarginY: r2, scrollMarginBlock: r2, scrollMarginBlockEnd: r2, scrollMarginBlockStart: r2, scrollMarginInline: r2, scrollMarginInlineEnd: r2, scrollMarginInlineStart: r2, scrollPadding: r2, scrollPaddingTop: r2, scrollPaddingRight: r2, scrollPaddingBottom: r2, scrollPaddingLeft: r2, scrollPaddingX: r2, scrollPaddingY: r2, scrollPaddingBlock: r2, scrollPaddingBlockEnd: r2, scrollPaddingBlockStart: r2, scrollPaddingInline: r2, scrollPaddingInlineEnd: r2, scrollPaddingInlineStart: r2, fontSize: "fontSizes", background: e2, backgroundColor: e2, backgroundImage: e2, borderImage: e2, border: e2, borderBlock: e2, borderBlockEnd: e2, borderBlockStart: e2, borderBottom: e2, borderBottomColor: e2, borderColor: e2, borderInline: e2, borderInlineEnd: e2, borderInlineStart: e2, borderLeft: e2, borderLeftColor: e2, borderRight: e2, borderRightColor: e2, borderTop: e2, borderTopColor: e2, caretColor: e2, color: e2, columnRuleColor: e2, fill: e2, outline: e2, outlineColor: e2, stroke: e2, textDecorationColor: e2, fontFamily: "fonts", fontWeight: "fontWeights", lineHeight: "lineHeights", letterSpacing: "letterSpacings", blockSize: t2, minBlockSize: t2, maxBlockSize: t2, inlineSize: t2, minInlineSize: t2, maxInlineSize: t2, width: t2, minWidth: t2, maxWidth: t2, height: t2, minHeight: t2, maxHeight: t2, flexBasis: t2, gridTemplateColumns: t2, gridTemplateRows: t2, borderWidth: "borderWidths", borderTopWidth: "borderWidths", borderRightWidth: "borderWidths", borderBottomWidth: "borderWidths", borderLeftWidth: "borderWidths", borderStyle: "borderStyles", borderTopStyle: "borderStyles", borderRightStyle: "borderStyles", borderBottomStyle: "borderStyles", borderLeftStyle: "borderStyles", borderRadius: "radii", borderTopLeftRadius: "radii", borderTopRightRadius: "radii", borderBottomRightRadius: "radii", borderBottomLeftRadius: "radii", boxShadow: "shadows", textShadow: "shadows", transition: "transitions", zIndex: "zIndices" };
var i2 = (e3, t3) => typeof t3 == "function" ? { "()": Function.prototype.toString.call(t3) } : t3;
var o2 = () => {
  const e3 = Object.create(null);
  return (t3, r3, ...n3) => {
    const o3 = ((e4) => JSON.stringify(e4, i2))(t3);
    return o3 in e3 ? e3[o3] : e3[o3] = r3(t3, ...n3);
  };
};
var l2 = Symbol.for("sxs.internal");
var s2 = (e3, t3) => Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t3));
var a2 = (e3) => {
  for (const t3 in e3)
    return true;
  return false;
};
var { hasOwnProperty: c2 } = Object.prototype;
var d = (e3) => e3.includes("-") ? e3 : e3.replace(/[A-Z]/g, (e4) => "-" + e4.toLowerCase());
var g = /\s+(?![^()]*\))/;
var p2 = (e3) => (t3) => e3(...typeof t3 == "string" ? String(t3).split(g) : [t3]);
var u2 = { appearance: (e3) => ({ WebkitAppearance: e3, appearance: e3 }), backfaceVisibility: (e3) => ({ WebkitBackfaceVisibility: e3, backfaceVisibility: e3 }), backdropFilter: (e3) => ({ WebkitBackdropFilter: e3, backdropFilter: e3 }), backgroundClip: (e3) => ({ WebkitBackgroundClip: e3, backgroundClip: e3 }), boxDecorationBreak: (e3) => ({ WebkitBoxDecorationBreak: e3, boxDecorationBreak: e3 }), clipPath: (e3) => ({ WebkitClipPath: e3, clipPath: e3 }), content: (e3) => ({ content: e3.includes('"') || e3.includes("'") || /^([A-Za-z]+\([^]*|[^]*-quote|inherit|initial|none|normal|revert|unset)$/.test(e3) ? e3 : `"${e3}"` }), hyphens: (e3) => ({ WebkitHyphens: e3, hyphens: e3 }), maskImage: (e3) => ({ WebkitMaskImage: e3, maskImage: e3 }), maskSize: (e3) => ({ WebkitMaskSize: e3, maskSize: e3 }), tabSize: (e3) => ({ MozTabSize: e3, tabSize: e3 }), textSizeAdjust: (e3) => ({ WebkitTextSizeAdjust: e3, textSizeAdjust: e3 }), userSelect: (e3) => ({ WebkitUserSelect: e3, userSelect: e3 }), marginBlock: p2((e3, t3) => ({ marginBlockStart: e3, marginBlockEnd: t3 || e3 })), marginInline: p2((e3, t3) => ({ marginInlineStart: e3, marginInlineEnd: t3 || e3 })), maxSize: p2((e3, t3) => ({ maxBlockSize: e3, maxInlineSize: t3 || e3 })), minSize: p2((e3, t3) => ({ minBlockSize: e3, minInlineSize: t3 || e3 })), paddingBlock: p2((e3, t3) => ({ paddingBlockStart: e3, paddingBlockEnd: t3 || e3 })), paddingInline: p2((e3, t3) => ({ paddingInlineStart: e3, paddingInlineEnd: t3 || e3 })) };
var h2 = /([\d.]+)([^]*)/;
var f2 = (e3, t3) => e3.length ? e3.reduce((e4, r3) => (e4.push(...t3.map((e5) => e5.includes("&") ? e5.replace(/&/g, /[ +>|~]/.test(r3) && /&.*&/.test(e5) ? `:is(${r3})` : r3) : r3 + " " + e5)), e4), []) : t3;
var m = (e3, t3) => e3 in b && typeof t3 == "string" ? t3.replace(/^((?:[^]*[^\w-])?)(fit-content|stretch)((?:[^\w-][^]*)?)$/, (t4, r3, n3, i3) => r3 + (n3 === "stretch" ? `-moz-available${i3};${d(e3)}:${r3}-webkit-fill-available` : `-moz-fit-content${i3};${d(e3)}:${r3}fit-content`) + i3) : String(t3);
var b = { blockSize: 1, height: 1, inlineSize: 1, maxBlockSize: 1, maxHeight: 1, maxInlineSize: 1, maxWidth: 1, minBlockSize: 1, minHeight: 1, minInlineSize: 1, minWidth: 1, width: 1 };
var S = (e3) => e3 ? e3 + "-" : "";
var k = (e3, t3, r3) => e3.replace(/([+-])?((?:\d+(?:\.\d*)?|\.\d+)(?:[Ee][+-]?\d+)?)?(\$|--)([$\w-]+)/g, (e4, n3, i3, o3, l3) => o3 == "$" == !!i3 ? e4 : (n3 || o3 == "--" ? "calc(" : "") + "var(--" + (o3 === "$" ? S(t3) + (l3.includes("$") ? "" : S(r3)) + l3.replace(/\$/g, "-") : l3) + ")" + (n3 || o3 == "--" ? "*" + (n3 || "") + (i3 || "1") + ")" : ""));
var y2 = /\s*,\s*(?![^()]*\))/;
var B = Object.prototype.toString;
var $ = (e3, t3, r3, n3, i3) => {
  let o3, l3, s3;
  const a3 = (e4, t4, r4) => {
    let c3, g2;
    const p3 = (e5) => {
      for (c3 in e5) {
        const R2 = c3.charCodeAt(0) === 64, z2 = R2 && Array.isArray(e5[c3]) ? e5[c3] : [e5[c3]];
        for (g2 of z2) {
          const e6 = /[A-Z]/.test($2 = c3) ? $2 : $2.replace(/-[^]/g, (e7) => e7[1].toUpperCase()), z3 = typeof g2 == "object" && g2 && g2.toString === B && (!n3.utils[e6] || !t4.length);
          if (e6 in n3.utils && !z3) {
            const t5 = n3.utils[e6];
            if (t5 !== l3) {
              l3 = t5, p3(t5(g2)), l3 = null;
              continue;
            }
          } else if (e6 in u2) {
            const t5 = u2[e6];
            if (t5 !== s3) {
              s3 = t5, p3(t5(g2)), s3 = null;
              continue;
            }
          }
          if (R2 && (b2 = c3.slice(1) in n3.media ? "@media " + n3.media[c3.slice(1)] : c3, c3 = b2.replace(/\(\s*([\w-]+)\s*(=|<|<=|>|>=)\s*([\w-]+)\s*(?:(<|<=|>|>=)\s*([\w-]+)\s*)?\)/g, (e7, t5, r5, n4, i4, o4) => {
            const l4 = h2.test(t5), s4 = 0.0625 * (l4 ? -1 : 1), [a4, c4] = l4 ? [n4, t5] : [t5, n4];
            return "(" + (r5[0] === "=" ? "" : r5[0] === ">" === l4 ? "max-" : "min-") + a4 + ":" + (r5[0] !== "=" && r5.length === 1 ? c4.replace(h2, (e8, t6, n5) => Number(t6) + s4 * (r5 === ">" ? 1 : -1) + n5) : c4) + (i4 ? ") and (" + (i4[0] === ">" ? "min-" : "max-") + a4 + ":" + (i4.length === 1 ? o4.replace(h2, (e8, t6, r6) => Number(t6) + s4 * (i4 === ">" ? -1 : 1) + r6) : o4) : "") + ")";
          })), z3) {
            const e7 = R2 ? r4.concat(c3) : [...r4], n4 = R2 ? [...t4] : f2(t4, c3.split(y2));
            o3 !== void 0 && i3(x(...o3)), o3 = void 0, a3(g2, n4, e7);
          } else
            o3 === void 0 && (o3 = [[], t4, r4]), c3 = R2 || c3.charCodeAt(0) !== 36 ? c3 : `--${S(n3.prefix)}${c3.slice(1).replace(/\$/g, "-")}`, g2 = z3 ? g2 : typeof g2 == "number" ? g2 && e6 in I ? String(g2) + "px" : String(g2) : k(m(e6, g2 == null ? "" : g2), n3.prefix, n3.themeMap[e6]), o3[0].push(`${R2 ? `${c3} ` : `${d(c3)}:`}${g2}`);
        }
      }
      var b2, $2;
    };
    p3(e4), o3 !== void 0 && i3(x(...o3)), o3 = void 0;
  };
  a3(e3, t3, r3);
};
var x = (e3, t3, r3) => `${r3.map((e4) => `${e4}{`).join("")}${t3.length ? `${t3.join(",")}{` : ""}${e3.join(";")}${t3.length ? "}" : ""}${Array(r3.length ? r3.length + 1 : 0).join("}")}`;
var I = { animationDelay: 1, animationDuration: 1, backgroundSize: 1, blockSize: 1, border: 1, borderBlock: 1, borderBlockEnd: 1, borderBlockEndWidth: 1, borderBlockStart: 1, borderBlockStartWidth: 1, borderBlockWidth: 1, borderBottom: 1, borderBottomLeftRadius: 1, borderBottomRightRadius: 1, borderBottomWidth: 1, borderEndEndRadius: 1, borderEndStartRadius: 1, borderInlineEnd: 1, borderInlineEndWidth: 1, borderInlineStart: 1, borderInlineStartWidth: 1, borderInlineWidth: 1, borderLeft: 1, borderLeftWidth: 1, borderRadius: 1, borderRight: 1, borderRightWidth: 1, borderSpacing: 1, borderStartEndRadius: 1, borderStartStartRadius: 1, borderTop: 1, borderTopLeftRadius: 1, borderTopRightRadius: 1, borderTopWidth: 1, borderWidth: 1, bottom: 1, columnGap: 1, columnRule: 1, columnRuleWidth: 1, columnWidth: 1, containIntrinsicSize: 1, flexBasis: 1, fontSize: 1, gap: 1, gridAutoColumns: 1, gridAutoRows: 1, gridTemplateColumns: 1, gridTemplateRows: 1, height: 1, inlineSize: 1, inset: 1, insetBlock: 1, insetBlockEnd: 1, insetBlockStart: 1, insetInline: 1, insetInlineEnd: 1, insetInlineStart: 1, left: 1, letterSpacing: 1, margin: 1, marginBlock: 1, marginBlockEnd: 1, marginBlockStart: 1, marginBottom: 1, marginInline: 1, marginInlineEnd: 1, marginInlineStart: 1, marginLeft: 1, marginRight: 1, marginTop: 1, maxBlockSize: 1, maxHeight: 1, maxInlineSize: 1, maxWidth: 1, minBlockSize: 1, minHeight: 1, minInlineSize: 1, minWidth: 1, offsetDistance: 1, offsetRotate: 1, outline: 1, outlineOffset: 1, outlineWidth: 1, overflowClipMargin: 1, padding: 1, paddingBlock: 1, paddingBlockEnd: 1, paddingBlockStart: 1, paddingBottom: 1, paddingInline: 1, paddingInlineEnd: 1, paddingInlineStart: 1, paddingLeft: 1, paddingRight: 1, paddingTop: 1, perspective: 1, right: 1, rowGap: 1, scrollMargin: 1, scrollMarginBlock: 1, scrollMarginBlockEnd: 1, scrollMarginBlockStart: 1, scrollMarginBottom: 1, scrollMarginInline: 1, scrollMarginInlineEnd: 1, scrollMarginInlineStart: 1, scrollMarginLeft: 1, scrollMarginRight: 1, scrollMarginTop: 1, scrollPadding: 1, scrollPaddingBlock: 1, scrollPaddingBlockEnd: 1, scrollPaddingBlockStart: 1, scrollPaddingBottom: 1, scrollPaddingInline: 1, scrollPaddingInlineEnd: 1, scrollPaddingInlineStart: 1, scrollPaddingLeft: 1, scrollPaddingRight: 1, scrollPaddingTop: 1, shapeMargin: 1, textDecoration: 1, textDecorationThickness: 1, textIndent: 1, textUnderlineOffset: 1, top: 1, transitionDelay: 1, transitionDuration: 1, verticalAlign: 1, width: 1, wordSpacing: 1 };
var R = (e3) => String.fromCharCode(e3 + (e3 > 25 ? 39 : 97));
var z = (e3) => ((e4) => {
  let t3, r3 = "";
  for (t3 = Math.abs(e4); t3 > 52; t3 = t3 / 52 | 0)
    r3 = R(t3 % 52) + r3;
  return R(t3 % 52) + r3;
})(((e4, t3) => {
  let r3 = t3.length;
  for (; r3; )
    e4 = 33 * e4 ^ t3.charCodeAt(--r3);
  return e4;
})(5381, JSON.stringify(e3)) >>> 0);
var W = ["themed", "global", "styled", "onevar", "resonevar", "allvar", "inline"];
var j = (e3) => {
  if (e3.href && !e3.href.startsWith(location.origin))
    return false;
  try {
    return !!e3.cssRules;
  } catch (e4) {
    return false;
  }
};
var E = (e3) => {
  let t3;
  const r3 = () => {
    const { cssRules: e4 } = t3.sheet;
    return [].map.call(e4, (r4, n4) => {
      const { cssText: i3 } = r4;
      let o3 = "";
      if (i3.startsWith("--sxs"))
        return "";
      if (e4[n4 - 1] && (o3 = e4[n4 - 1].cssText).startsWith("--sxs")) {
        if (!r4.cssRules.length)
          return "";
        for (const e5 in t3.rules)
          if (t3.rules[e5].group === r4)
            return `--sxs{--sxs:${[...t3.rules[e5].cache].join(" ")}}${i3}`;
        return r4.cssRules.length ? `${o3}${i3}` : "";
      }
      return i3;
    }).join("");
  }, n3 = () => {
    if (t3) {
      const { rules: e4, sheet: r4 } = t3;
      if (!r4.deleteRule) {
        for (; Object(Object(r4.cssRules)[0]).type === 3; )
          r4.cssRules.splice(0, 1);
        r4.cssRules = [];
      }
      for (const t4 in e4)
        delete e4[t4];
    }
    const i3 = Object(e3).styleSheets || [];
    for (const e4 of i3)
      if (j(e4)) {
        for (let i4 = 0, o4 = e4.cssRules; o4[i4]; ++i4) {
          const l4 = Object(o4[i4]);
          if (l4.type !== 1)
            continue;
          const s3 = Object(o4[i4 + 1]);
          if (s3.type !== 4)
            continue;
          ++i4;
          const { cssText: a3 } = l4;
          if (!a3.startsWith("--sxs"))
            continue;
          const c3 = a3.slice(14, -3).trim().split(/\s+/), d2 = W[c3[0]];
          d2 && (t3 || (t3 = { sheet: e4, reset: n3, rules: {}, toString: r3 }), t3.rules[d2] = { group: s3, index: i4, cache: new Set(c3) });
        }
        if (t3)
          break;
      }
    if (!t3) {
      const i4 = (e4, t4) => ({ type: t4, cssRules: [], insertRule(e5, t5) {
        this.cssRules.splice(t5, 0, i4(e5, { import: 3, undefined: 1 }[(e5.toLowerCase().match(/^@([a-z]+)/) || [])[1]] || 4));
      }, get cssText() {
        return e4 === "@media{}" ? `@media{${[].map.call(this.cssRules, (e5) => e5.cssText).join("")}}` : e4;
      } });
      t3 = { sheet: e3 ? (e3.head || e3).appendChild(document.createElement("style")).sheet : i4("", "text/css"), rules: {}, reset: n3, toString: r3 };
    }
    const { sheet: o3, rules: l3 } = t3;
    for (let e4 = W.length - 1; e4 >= 0; --e4) {
      const t4 = W[e4];
      if (!l3[t4]) {
        const r4 = W[e4 + 1], n4 = l3[r4] ? l3[r4].index : o3.cssRules.length;
        o3.insertRule("@media{}", n4), o3.insertRule(`--sxs{--sxs:${e4}}`, n4), l3[t4] = { group: o3.cssRules[n4 + 1], index: n4, cache: new Set([e4]) };
      }
      v(l3[t4]);
    }
  };
  return n3(), t3;
};
var v = (e3) => {
  const t3 = e3.group;
  let r3 = t3.cssRules.length;
  e3.apply = (e4) => {
    try {
      t3.insertRule(e4, r3), ++r3;
    } catch (e5) {
    }
  };
};
var T = Symbol();
var w = o2();
var M = (e3, t3) => w(e3, () => (...r3) => {
  let n3 = { type: null, composers: new Set() };
  for (const t4 of r3)
    if (t4 != null)
      if (t4[l2]) {
        n3.type == null && (n3.type = t4[l2].type);
        for (const e4 of t4[l2].composers)
          n3.composers.add(e4);
      } else
        t4.constructor !== Object || t4.$$typeof ? n3.type == null && (n3.type = t4) : n3.composers.add(C(t4, e3));
  return n3.type == null && (n3.type = "span"), n3.composers.size || n3.composers.add(["PJLV", {}, [], [], {}, []]), P(e3, n3, t3);
});
var C = ({ variants: e3, compoundVariants: t3, defaultVariants: r3, ...n3 }, i3) => {
  const o3 = `${S(i3.prefix)}c-${z(n3)}`, l3 = [], s3 = [], d2 = Object.create(null), g2 = [];
  for (const e4 in r3)
    d2[e4] = String(r3[e4]);
  if (typeof e3 == "object" && e3)
    for (const t4 in e3) {
      p3 = d2, u3 = t4, c2.call(p3, u3) || (d2[t4] = "undefined");
      const r4 = e3[t4];
      for (const e4 in r4) {
        const n4 = { [t4]: String(e4) };
        String(e4) === "undefined" && g2.push(t4);
        const i4 = r4[e4], o4 = [n4, i4, !a2(i4)];
        l3.push(o4);
      }
    }
  var p3, u3;
  if (typeof t3 == "object" && t3)
    for (const e4 of t3) {
      let { css: t4, ...r4 } = e4;
      t4 = typeof t4 == "object" && t4 || {};
      for (const e5 in r4)
        r4[e5] = String(r4[e5]);
      const n4 = [r4, t4, !a2(t4)];
      s3.push(n4);
    }
  return [o3, n3, l3, s3, d2, g2];
};
var P = (e3, t3, r3) => {
  const [n3, i3, o3, a3] = L(t3.composers), c3 = typeof t3.type == "function" || t3.type.$$typeof ? ((e4) => {
    function t4() {
      for (let r4 = 0; r4 < t4[T].length; r4++) {
        const [n4, i4] = t4[T][r4];
        e4.rules[n4].apply(i4);
      }
      return t4[T] = [], null;
    }
    return t4[T] = [], t4.rules = {}, W.forEach((e5) => t4.rules[e5] = { apply: (r4) => t4[T].push([e5, r4]) }), t4;
  })(r3) : null, d2 = (c3 || r3).rules, g2 = `.${n3}${i3.length > 1 ? `:where(.${i3.slice(1).join(".")})` : ""}`, p3 = (l3) => {
    l3 = typeof l3 == "object" && l3 || A;
    const { css: s3, ...p4 } = l3, u3 = {};
    for (const e4 in o3)
      if (delete p4[e4], e4 in l3) {
        let t4 = l3[e4];
        typeof t4 == "object" && t4 ? u3[e4] = { "@initial": o3[e4], ...t4 } : (t4 = String(t4), u3[e4] = t4 !== "undefined" || a3.has(e4) ? t4 : o3[e4]);
      } else
        u3[e4] = o3[e4];
    const h3 = new Set([...i3]);
    for (const [n4, i4, o4, l4] of t3.composers) {
      r3.rules.styled.cache.has(n4) || (r3.rules.styled.cache.add(n4), $(i4, [`.${n4}`], [], e3, (e4) => {
        d2.styled.apply(e4);
      }));
      const t4 = O(o4, u3, e3.media), s4 = O(l4, u3, e3.media, true);
      for (const i5 of t4)
        if (i5 !== void 0)
          for (const [t5, o5, l5] of i5) {
            const i6 = `${n4}-${z(o5)}-${t5}`;
            h3.add(i6);
            const s5 = (l5 ? r3.rules.resonevar : r3.rules.onevar).cache, a4 = l5 ? d2.resonevar : d2.onevar;
            s5.has(i6) || (s5.add(i6), $(o5, [`.${i6}`], [], e3, (e4) => {
              a4.apply(e4);
            }));
          }
      for (const t5 of s4)
        if (t5 !== void 0)
          for (const [i5, o5] of t5) {
            const t6 = `${n4}-${z(o5)}-${i5}`;
            h3.add(t6), r3.rules.allvar.cache.has(t6) || (r3.rules.allvar.cache.add(t6), $(o5, [`.${t6}`], [], e3, (e4) => {
              d2.allvar.apply(e4);
            }));
          }
    }
    if (typeof s3 == "object" && s3) {
      const t4 = `${n3}-i${z(s3)}-css`;
      h3.add(t4), r3.rules.inline.cache.has(t4) || (r3.rules.inline.cache.add(t4), $(s3, [`.${t4}`], [], e3, (e4) => {
        d2.inline.apply(e4);
      }));
    }
    for (const e4 of String(l3.className || "").trim().split(/\s+/))
      e4 && h3.add(e4);
    const f3 = p4.className = [...h3].join(" ");
    return { type: t3.type, className: f3, selector: g2, props: p4, toString: () => f3, deferredInjector: c3 };
  };
  return s2(p3, { className: n3, selector: g2, [l2]: t3, toString: () => (r3.rules.styled.cache.has(n3) || p3(), n3) });
};
var L = (e3) => {
  let t3 = "";
  const r3 = [], n3 = {}, i3 = [];
  for (const [o3, , , , l3, s3] of e3) {
    t3 === "" && (t3 = o3), r3.push(o3), i3.push(...s3);
    for (const e4 in l3) {
      const t4 = l3[e4];
      (n3[e4] === void 0 || t4 !== "undefined" || s3.includes(t4)) && (n3[e4] = t4);
    }
  }
  return [t3, r3, n3, new Set(i3)];
};
var O = (e3, t3, r3, n3) => {
  const i3 = [];
  e:
    for (let [o3, l3, s3] of e3) {
      if (s3)
        continue;
      let e4, a3 = 0, c3 = false;
      for (e4 in o3) {
        const n4 = o3[e4];
        let i4 = t3[e4];
        if (i4 !== n4) {
          if (typeof i4 != "object" || !i4)
            continue e;
          {
            let e5, t4, o4 = 0;
            for (const l4 in i4) {
              if (n4 === String(i4[l4])) {
                if (l4 !== "@initial") {
                  const e6 = l4.slice(1);
                  (t4 = t4 || []).push(e6 in r3 ? r3[e6] : l4.replace(/^@media ?/, "")), c3 = true;
                }
                a3 += o4, e5 = true;
              }
              ++o4;
            }
            if (t4 && t4.length && (l3 = { ["@media " + t4.join(", ")]: l3 }), !e5)
              continue e;
          }
        }
      }
      (i3[a3] = i3[a3] || []).push([n3 ? "cv" : `${e4}-${o3[e4]}`, l3, c3]);
    }
  return i3;
};
var A = {};
var N = o2();
var D = (e3, t3) => N(e3, () => (...r3) => {
  const n3 = () => {
    for (let n4 of r3) {
      n4 = typeof n4 == "object" && n4 || {};
      let r4 = z(n4);
      if (!t3.rules.global.cache.has(r4)) {
        if (t3.rules.global.cache.add(r4), "@import" in n4) {
          let e4 = [].indexOf.call(t3.sheet.cssRules, t3.rules.themed.group) - 1;
          for (let r5 of [].concat(n4["@import"]))
            r5 = r5.includes('"') || r5.includes("'") ? r5 : `"${r5}"`, t3.sheet.insertRule(`@import ${r5};`, e4++);
          delete n4["@import"];
        }
        $(n4, [], [], e3, (e4) => {
          t3.rules.global.apply(e4);
        });
      }
    }
    return "";
  };
  return s2(n3, { toString: n3 });
});
var H = o2();
var V = (e3, t3) => H(e3, () => (r3) => {
  const n3 = `${S(e3.prefix)}k-${z(r3)}`, i3 = () => {
    if (!t3.rules.global.cache.has(n3)) {
      t3.rules.global.cache.add(n3);
      const i4 = [];
      $(r3, [], [], e3, (e4) => i4.push(e4));
      const o3 = `@keyframes ${n3}{${i4.join("")}}`;
      t3.rules.global.apply(o3);
    }
    return n3;
  };
  return s2(i3, { get name() {
    return i3();
  }, toString: i3 });
});
var G = class {
  constructor(e3, t3, r3, n3) {
    this.token = e3 == null ? "" : String(e3), this.value = t3 == null ? "" : String(t3), this.scale = r3 == null ? "" : String(r3), this.prefix = n3 == null ? "" : String(n3);
  }
  get computedValue() {
    return "var(" + this.variable + ")";
  }
  get variable() {
    return "--" + S(this.prefix) + S(this.scale) + this.token;
  }
  toString() {
    return this.computedValue;
  }
};
var F = o2();
var J = (e3, t3) => F(e3, () => (r3, n3) => {
  n3 = typeof r3 == "object" && r3 || Object(n3);
  const i3 = `.${r3 = (r3 = typeof r3 == "string" ? r3 : "") || `${S(e3.prefix)}t-${z(n3)}`}`, o3 = {}, l3 = [];
  for (const t4 in n3) {
    o3[t4] = {};
    for (const r4 in n3[t4]) {
      const i4 = `--${S(e3.prefix)}${t4}-${r4}`, s4 = k(String(n3[t4][r4]), e3.prefix, t4);
      o3[t4][r4] = new G(r4, s4, t4, e3.prefix), l3.push(`${i4}:${s4}`);
    }
  }
  const s3 = () => {
    if (l3.length && !t3.rules.themed.cache.has(r3)) {
      t3.rules.themed.cache.add(r3);
      const i4 = `${n3 === e3.theme ? ":root," : ""}.${r3}{${l3.join(";")}}`;
      t3.rules.themed.apply(i4);
    }
    return r3;
  };
  return { ...o3, get className() {
    return s3();
  }, selector: i3, toString: s3 };
});
var U = o2();
var X;
var Y = o2();
var q = (e3) => {
  const t3 = ((e4) => {
    let t4 = false;
    const r3 = U(e4, (e5) => {
      t4 = true;
      const r4 = "prefix" in (e5 = typeof e5 == "object" && e5 || {}) ? String(e5.prefix) : "", i3 = typeof e5.media == "object" && e5.media || {}, o3 = typeof e5.root == "object" ? e5.root || null : globalThis.document || null, l3 = typeof e5.theme == "object" && e5.theme || {}, s3 = { prefix: r4, media: i3, theme: l3, themeMap: typeof e5.themeMap == "object" && e5.themeMap || { ...n2 }, utils: typeof e5.utils == "object" && e5.utils || {} }, a3 = E(o3), c3 = { css: M(s3, a3), globalCss: D(s3, a3), keyframes: V(s3, a3), createTheme: J(s3, a3), reset() {
        a3.reset(), c3.theme.toString();
      }, theme: {}, sheet: a3, config: s3, prefix: r4, getCssText: a3.toString, toString: a3.toString };
      return String(c3.theme = c3.createTheme(l3)), c3;
    });
    return t4 || r3.reset(), r3;
  })(e3);
  return t3.styled = (({ config: e4, sheet: t4 }) => Y(e4, () => {
    const r3 = M(e4, t4);
    return (...e5) => {
      const t5 = r3(...e5), n3 = t5[l2].type, i3 = Z.forwardRef((e6, r4) => {
        const i4 = e6 && e6.as || n3, { props: o3, deferredInjector: l3 } = t5(e6);
        return delete o3.as, o3.ref = r4, l3 ? Z.createElement(Z.Fragment, null, Z.createElement(i4, o3), Z.createElement(l3, null)) : Z.createElement(i4, o3);
      });
      return i3.className = t5.className, i3.displayName = `Styled.${n3.displayName || n3.name || n3}`, i3.selector = t5.selector, i3.toString = () => t5.selector, i3[l2] = t5[l2], i3;
    };
  }))(t3), t3;
};
var K = () => X || (X = q());
var re = (...e3) => K().styled(...e3);

// src/SwitchPrefab.tsx
var SwitchRoot = re(Switch2.Root, {
  all: "unset",
  width: 42,
  height: 25,
  backgroundColor: "blackA.blackA6",
  borderRadius: "9999px",
  position: "relative",
  boxShadow: `0 2px 10px #EBEBEB`,
  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
  "&:focus": { boxShadow: `0 0 0 2px black` },
  '&[data-state="checked"]': { backgroundColor: "black" }
});
function SwitchPrefab({ controlStyles, thumbStyles, labelStyles }) {
  function handleChange(e3) {
    console.log(e3);
  }
  return /* @__PURE__ */ React.createElement("div", {
    style: { display: "flex", alignItems: "center" }
  }, /* @__PURE__ */ React.createElement("label", {
    className: "Label",
    htmlFor: "airplane-mode",
    style: labelStyles
  }, "Airplane mood"), /* @__PURE__ */ React.createElement(SwitchRoot, {
    onCheckedChange: handleChange,
    className: SwitchPrefab_modules_css_default.control,
    style: controlStyles,
    id: "airplane-mode"
  }, /* @__PURE__ */ React.createElement(Switch2.Thumb, {
    className: SwitchPrefab_modules_css_default.thumb,
    style: thumbStyles
  })));
}
export {
  SwitchPrefab
};
