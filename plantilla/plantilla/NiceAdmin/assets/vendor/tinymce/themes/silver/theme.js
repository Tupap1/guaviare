/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.9.2 (2021-09-08)
 */
(function () {
    'use strict';

    var typeOf = function (x) {
      var t = typeof x;
      if (x === null) {
        return 'null';
      } else if (t === 'object' && (Array.prototype.isPrototypeOf(x) || x.constructor && x.constructor.name === 'Array')) {
        return 'array';
      } else if (t === 'object' && (String.prototype.isPrototypeOf(x) || x.constructor && x.constructor.name === 'String')) {
        return 'string';
      } else {
        return t;
      }
    };
    var isType$1 = function (type) {
      return function (value) {
        return typeOf(value) === type;
      };
    };
    var isSimpleType = function (type) {
      return function (value) {
        return typeof value === type;
      };
    };
    var eq$1 = function (t) {
      return function (a) {
        return t === a;
      };
    };
    var isString = isType$1('string');
    var isObject = isType$1('object');
    var isArray = isType$1('array');
    var isNull = eq$1(null);
    var isBoolean = isSimpleType('boolean');
    var isUndefined = eq$1(undefined);
    var isNullable = function (a) {
      return a === null || a === undefined;
    };
    var isNonNullable = function (a) {
      return !isNullable(a);
    };
    var isFunction = isSimpleType('function');
    var isNumber = isSimpleType('number');
    var isArrayOf = function (value, pred) {
      if (isArray(value)) {
        for (var i = 0, len = value.length; i < len; ++i) {
          if (!pred(value[i])) {
            return false;
          }
        }
        return true;
      }
      return false;
    };

    var noop = function () {
    };
    var noarg = function (f) {
      return function () {
        return f();
      };
    };
    var compose = function (fa, fb) {
      return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return fa(fb.apply(null, args));
      };
    };
    var compose1 = function (fbc, fab) {
      return function (a) {
        return fbc(fab(a));
      };
    };
    var constant$1 = function (value) {
      return function () {
        return value;
      };
    };
    var identity$1 = function (x) {
      return x;
    };
    var tripleEquals = function (a, b) {
      return a === b;
    };
    function curry(fn) {
      var initialArgs = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        initialArgs[_i - 1] = arguments[_i];
      }
      return function () {
        var restArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          restArgs[_i] = arguments[_i];
        }
        var all = initialArgs.concat(restArgs);
        return fn.apply(null, all);
      };
    }
    var not = function (f) {
      return function (t) {
        return !f(t);
      };
    };
    var die = function (msg) {
      return function () {
        throw new Error(msg);
      };
    };
    var never = constant$1(false);
    var always = constant$1(true);

    var global$h = tinymce.util.Tools.resolve('tinymce.ThemeManager');

    var __assign = function () {
      __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
      var t = {};
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === 'function')
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
            t[p[i]] = s[p[i]];
        }
      return t;
    }
    function __spreadArray(to, from, pack) {
      if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
            if (!ar)
              ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
          }
        }
      return to.concat(ar || Array.prototype.slice.call(from));
    }

    var none = function () {
      return NONE;
    };
    var NONE = function () {
      var call = function (thunk) {
        return thunk();
      };
      var id = identity$1;
      var me = {
        fold: function (n, _s) {
          return n();
        },
        isSome: never,
        isNone: always,
        getOr: id,
        getOrThunk: call,
        getOrDie: function (msg) {
          throw new Error(msg || 'error: getOrDie called on none.');
        },
        getOrNull: constant$1(null),
        getOrUndefined: constant$1(undefined),
        or: id,
        orThunk: call,
        map: none,
        each: noop,
        bind: none,
        exists: never,
        forall: always,
        filter: function () {
          return none();
        },
        toArray: function () {
          return [];
        },
        toString: constant$1('none()')
      };
      return me;
    }();
    var some = function (a) {
      var constant_a = constant$1(a);
      var self = function () {
        return me;
      };
      var bind = function (f) {
        return f(a);
      };
      var me = {
        fold: function (n, s) {
          return s(a);
        },
        isSome: always,
        isNone: never,
        getOr: constant_a,
        getOrThunk: constant_a,
        getOrDie: constant_a,
        getOrNull: constant_a,
        getOrUndefined: constant_a,
        or: self,
        orThunk: self,
        map: function (f) {
          return some(f(a));
        },
        each: function (f) {
          f(a);
        },
        bind: bind,
        exists: bind,
        forall: bind,
        filter: function (f) {
          return f(a) ? me : NONE;
        },
        toArray: function () {
          return [a];
        },
        toString: function () {
          return 'some(' + a + ')';
        }
      };
      return me;
    };
    var from$1 = function (value) {
      return value === null || value === undefined ? NONE : some(value);
    };
    var Optional = {
      some: some,
      none: none,
      from: from$1
    };

    var nativeSlice = Array.prototype.slice;
    var nativeIndexOf = Array.prototype.indexOf;
    var nativePush = Array.prototype.push;
    var rawIndexOf = function (ts, t) {
      return nativeIndexOf.call(ts, t);
    };
    var indexOf = function (xs, x) {
      var r = rawIndexOf(xs, x);
      return r === -1 ? Optional.none() : Optional.some(r);
    };
    var contains$2 = function (xs, x) {
      return rawIndexOf(xs, x) > -1;
    };
    var exists = function (xs, pred) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i)) {
          return true;
        }
      }
      return false;
    };
    var range$2 = function (num, f) {
      var r = [];
      for (var i = 0; i < num; i++) {
        r.push(f(i));
      }
      return r;
    };
    var chunk$1 = function (array, size) {
      var r = [];
      for (var i = 0; i < array.length; i += size) {
        var s = nativeSlice.call(array, i, i + size);
        r.push(s);
      }
      return r;
    };
    var map$2 = function (xs, f) {
      var len = xs.length;
      var r = new Array(len);
      for (var i = 0; i < len; i++) {
        var x = xs[i];
        r[i] = f(x, i);
      }
      return r;
    };
    var each$1 = function (xs, f) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        f(x, i);
      }
    };
    var eachr = function (xs, f) {
      for (var i = xs.length - 1; i >= 0; i--) {
        var x = xs[i];
        f(x, i);
      }
    };
    var partition$3 = function (xs, pred) {
      var pass = [];
      var fail = [];
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        var arr = pred(x, i) ? pass : fail;
        arr.push(x);
      }
      return {
        pass: pass,
        fail: fail
      };
    };
    var filter$2 = function (xs, pred) {
      var r = [];
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i)) {
          r.push(x);
        }
      }
      return r;
    };
    var foldr = function (xs, f, acc) {
      eachr(xs, function (x, i) {
        acc = f(acc, x, i);
      });
      return acc;
    };
    var foldl = function (xs, f, acc) {
      each$1(xs, function (x, i) {
        acc = f(acc, x, i);
      });
      return acc;
    };
    var findUntil = function (xs, pred, until) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i)) {
          return Optional.some(x);
        } else if (until(x, i)) {
          break;
        }
      }
      return Optional.none();
    };
    var find$5 = function (xs, pred) {
      return findUntil(xs, pred, never);
    };
    var findIndex$1 = function (xs, pred) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i)) {
          return Optional.some(i);
        }
      }
      return Optional.none();
    };
    var flatten = function (xs) {
      var r = [];
      for (var i = 0, len = xs.length; i < len; ++i) {
        if (!isArray(xs[i])) {
          throw new Error('Arr.flatten item ' + i + ' was not an array, input: ' + xs);
        }
        nativePush.apply(r, xs[i]);
      }
      return r;
    };
    var bind$3 = function (xs, f) {
      return flatten(map$2(xs, f));
    };
    var forall = function (xs, pred) {
      for (var i = 0, len = xs.length; i < len; ++i) {
        var x = xs[i];
        if (pred(x, i) !== true) {
          return false;
        }
      }
      return true;
    };
    var reverse = function (xs) {
      var r = nativeSlice.call(xs, 0);
      r.reverse();
      return r;
    };
    var difference = function (a1, a2) {
      return filter$2(a1, function (x) {
        return !contains$2(a2, x);
      });
    };
    var mapToObject = function (xs, f) {
      var r = {};
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        r[String(x)] = f(x, i);
      }
      return r;
    };
    var pure$2 = function (x) {
      return [x];
    };
    var sort = function (xs, comparator) {
      var copy = nativeSlice.call(xs, 0);
      copy.sort(comparator);
      return copy;
    };
    var get$f = function (xs, i) {
      return i >= 0 && i < xs.length ? Optional.some(xs[i]) : Optional.none();
    };
    var head = function (xs) {
      return get$f(xs, 0);
    };
    var last$2 = function (xs) {
      return get$f(xs, xs.length - 1);
    };
    var from = isFunction(Array.from) ? Array.from : function (x) {
      return nativeSlice.call(x);
    };
    var findMap = function (arr, f) {
      for (var i = 0; i < arr.length; i++) {
        var r = f(arr[i], i);
        if (r.isSome()) {
          return r;
        }
      }
      return Optional.none();
    };

    var value$3 = function (o) {
      var or = function (_opt) {
        return value$3(o);
      };
      var orThunk = function (_f) {
        return value$3(o);
      };
      var map = function (f) {
        return value$3(f(o));
      };
      var mapError = function (_f) {
        return value$3(o);
      };
      var each = function (f) {
        f(o);
      };
      var bind = function (f) {
        return f(o);
      };
      var fold = function (_, onValue) {
        return onValue(o);
      };
      var exists = function (f) {
        return f(o);
      };
      var forall = function (f) {
        return f(o);
      };
      var toOptional = function () {
        return Optional.some(o);
      };
      return {
        isValue: always,
        isError: never,
        getOr: constant$1(o),
        getOrThunk: constant$1(o),
        getOrDie: constant$1(o),
        or: or,
        orThunk: orThunk,
        fold: fold,
        map: map,
        mapError: mapError,
        each: each,
        bind: bind,
        exists: exists,
        forall: forall,
        toOptional: toOptional
      };
    };
    var error$1 = function (message) {
      var getOrThunk = function (f) {
        return f();
      };
      var getOrDie = function () {
        return die(String(message))();
      };
      var or = identity$1;
      var orThunk = function (f) {
        return f();
      };
      var map = function (_f) {
        return error$1(message);
      };
      var mapError = function (f) {
        return error$1(f(message));
      };
      var bind = function (_f) {
        return error$1(message);
      };
      var fold = function (onError, _) {
        return onError(message);
      };
      return {
        isValue: never,
        isError: always,
        getOr: identity$1,
        getOrThunk: getOrThunk,
        getOrDie: getOrDie,
        or: or,
        orThunk: orThunk,
        fold: fold,
        map: map,
        mapError: mapError,
        each: noop,
        bind: bind,
        exists: never,
        forall: always,
        toOptional: Optional.none
      };
    };
    var fromOption = function (opt, err) {
      return opt.fold(function () {
        return error$1(err);
      }, value$3);
    };
    var Result = {
      value: value$3,
      error: error$1,
      fromOption: fromOption
    };

    var SimpleResultType;
    (function (SimpleResultType) {
      SimpleResultType[SimpleResultType['Error'] = 0] = 'Error';
      SimpleResultType[SimpleResultType['Value'] = 1] = 'Value';
    }(SimpleResultType || (SimpleResultType = {})));
    var fold$1 = function (res, onError, onValue) {
      return res.stype === SimpleResultType.Error ? onError(res.serror) : onValue(res.svalue);
    };
    var partition$2 = function (results) {
      var values = [];
      var errors = [];
      each$1(results, function (obj) {
        fold$1(obj, function (err) {
          return errors.push(err);
        }, function (val) {
          return values.push(val);
        });
      });
      return {
        values: values,
        errors: errors
      };
    };
    var mapError = function (res, f) {
      if (res.stype === SimpleResultType.Error) {
        return {
          stype: SimpleResultType.Error,
          serror: f(res.serror)
        };
      } else {
        return res;
      }
    };
    var map$1 = function (res, f) {
      if (res.stype === SimpleResultType.Value) {
        return {
          stype: SimpleResultType.Value,
          svalue: f(res.svalue)
        };
      } else {
        return res;
      }
    };
    var bind$2 = function (res, f) {
      if (res.stype === SimpleResultType.Value) {
        return f(res.svalue);
      } else {
        return res;
      }
    };
    var bindError = function (res, f) {
      if (res.stype === SimpleResultType.Error) {
        return f(res.serror);
      } else {
        return res;
      }
    };
    var svalue = function (v) {
      return {
        stype: SimpleResultType.Value,
        svalue: v
      };
    };
    var serror = function (e) {
      return {
        stype: SimpleResultType.Error,
        serror: e
      };
    };
    var toResult$1 = function (res) {
      return fold$1(res, Result.error, Result.value);
    };
    var fromResult$1 = function (res) {
      return res.fold(serror, svalue);
    };
    var SimpleResult = {
      fromResult: fromResult$1,
      toResult: toResult$1,
      svalue: svalue,
      partition: partition$2,
      serror: serror,
      bind: bind$2,
      bindError: bindError,
      map: map$1,
      mapError: mapError,
      fold: fold$1
    };

    var field$2 = function (key, newKey, presence, prop) {
      return {
        tag: 'field',
        key: key,
        newKey: newKey,
        presence: presence,
        prop: prop
      };
    };
    var customField$1 = function (newKey, instantiator) {
      return {
        tag: 'custom',
        newKey: newKey,
        instantiator: instantiator
      };
    };
    var fold = function (value, ifField, ifCustom) {
      switch (value.tag) {
      case 'field':
        return ifField(value.key, value.newKey, value.presence, value.prop);
      case 'custom':
        return ifCustom(value.newKey, value.instantiator);
      }
    };

    var keys = Object.keys;
    var hasOwnProperty = Object.hasOwnProperty;
    var each = function (obj, f) {
      var props = keys(obj);
      for (var k = 0, len = props.length; k < len; k++) {
        var i = props[k];
        var x = obj[i];
        f(x, i);
      }
    };
    var map = function (obj, f) {
      return tupleMap(obj, function (x, i) {
        return {
          k: i,
          v: f(x, i)
        };
      });
    };
    var tupleMap = function (obj, f) {
      var r = {};
      each(obj, function (x, i) {
        var tuple = f(x, i);
        r[tuple.k] = tuple.v;
      });
      return r;
    };
    var objAcc = function (r) {
      return function (x, i) {
        r[i] = x;
      };
    };
    var internalFilter = function (obj, pred, onTrue, onFalse) {
      var r = {};
      each(obj, function (x, i) {
        (pred(x, i) ? onTrue : onFalse)(x, i);
      });
      return r;
    };
    var filter$1 = function (obj, pred) {
      var t = {};
      internalFilter(obj, pred, objAcc(t), noop);
      return t;
    };
    var mapToArray = function (obj, f) {
      var r = [];
      each(obj, function (value, name) {
        r.push(f(value, name));
      });
      return r;
    };
    var find$4 = function (obj, pred) {
      var props = keys(obj);
      for (var k = 0, len = props.length; k < len; k++) {
        var i = props[k];
        var x = obj[i];
        if (pred(x, i, obj)) {
          return Optional.some(x);
        }
      }
      return Optional.none();
    };
    var values = function (obj) {
      return mapToArray(obj, identity$1);
    };
    var get$e = function (obj, key) {
      return has$2(obj, key) ? Optional.from(obj[key]) : Optional.none();
    };
    var has$2 = function (obj, key) {
      return hasOwnProperty.call(obj, key);
    };
    var hasNonNullableKey = function (obj, key) {
      return has$2(obj, key) && obj[key] !== undefined && obj[key] !== null;
    };

    var shallow$1 = function (old, nu) {
      return nu;
    };
    var deep = function (old, nu) {
      var bothObjects = isObject(old) && isObject(nu);
      return bothObjects ? deepMerge(old, nu) : nu;
    };
    var baseMerge = function (merger) {
      return function () {
        var objects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          objects[_i] = arguments[_i];
        }
        if (objects.length === 0) {
          throw new Error('Can\'t merge zero objects');
        }
        var ret = {};
        for (var j = 0; j < objects.length; j++) {
          var curObject = objects[j];
          for (var key in curObject) {
            if (has$2(curObject, key)) {
              ret[key] = merger(ret[key], curObject[key]);
            }
          }
        }
        return ret;
      };
    };
    var deepMerge = baseMerge(deep);
    var merge$1 = baseMerge(shallow$1);

    var cached = function (f) {
      var called = false;
      var r;
      return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        if (!called) {
          called = true;
          r = f.apply(null, args);
        }
        return r;
      };
    };

    var required$2 = function () {
      return {
        tag: 'required',
        process: {}
      };
    };
    var defaultedThunk = function (fallbackThunk) {
      return {
        tag: 'defaultedThunk',
        process: fallbackThunk
      };
    };
    var defaulted$1 = function (fallback) {
      return defaultedThunk(constant$1(fallback));
    };
    var asOption = function () {
      return {
        tag: 'option',
        process: {}
      };
    };
    var mergeWithThunk = function (baseThunk) {
      return {
        tag: 'mergeWithThunk',
        process: baseThunk
      };
    };
    var mergeWith = function (base) {
      return mergeWithThunk(constant$1(base));
    };

    var mergeValues$1 = function (values, base) {
      return values.length > 0 ? SimpleResult.svalue(deepMerge(base, merge$1.apply(undefined, values))) : SimpleResult.svalue(base);
    };
    var mergeErrors$1 = function (errors) {
      return compose(SimpleResult.serror, flatten)(errors);
    };
    var consolidateObj = function (objects, base) {
      var partition = SimpleResult.partition(objects);
      return partition.errors.length > 0 ? mergeErrors$1(partition.errors) : mergeValues$1(partition.values, base);
    };
    var consolidateArr = function (objects) {
      var partitions = SimpleResult.partition(objects);
      return partitions.errors.length > 0 ? mergeErrors$1(partitions.errors) : SimpleResult.svalue(partitions.values);
    };
    var ResultCombine = {
      consolidateObj: consolidateObj,
      consolidateArr: consolidateArr
    };

    var formatObj = function (input) {
      return isObject(input) && keys(input).length > 100 ? ' removed due to size' : JSON.stringify(input, null, 2);
    };
    var formatErrors = function (errors) {
      var es = errors.length > 10 ? errors.slice(0, 10).concat([{
          path: [],
          getErrorInfo: constant$1('... (only showing first ten failures)')
        }]) : errors;
      return map$2(es, function (e) {
        return 'Failed path: (' + e.path.join(' > ') + ')\n' + e.getErrorInfo();
      });
    };

    var nu$d = function (path, getErrorInfo) {
      return SimpleResult.serror([{
          path: path,
          getErrorInfo: getErrorInfo
        }]);
    };
    var missingRequired = function (path, key, obj) {
      return nu$d(path, function () {
        return 'Could not find valid *required* value for "' + key + '" in ' + formatObj(obj);
      });
    };
    var missingKey = function (path, key) {
      return nu$d(path, function () {
        return 'Choice schema did not contain choice key: "' + key + '"';
      });
    };
    var missingBranch = function (path, branches, branch) {
      return nu$d(path, function () {
        return 'The chosen schema: "' + branch + '" did not exist in branches: ' + formatObj(branches);
      });
    };
    var unsupportedFields = function (path, unsupported) {
      return nu$d(path, function () {
        return 'There are unsupported fields: [' + unsupported.join(', ') + '] specified';
      });
    };
    var custom = function (path, err) {
      return nu$d(path, constant$1(err));
    };

    var value$2 = function (validator) {
      var extract = function (path, val) {
        return SimpleResult.bindError(validator(val), function (err) {
          return custom(path, err);
        });
      };
      var toString = constant$1('val');
      return {
        extract: extract,
        toString: toString
      };
    };
    var anyValue$1 = value$2(SimpleResult.svalue);

    var requiredAccess = function (path, obj, key, bundle) {
      return get$e(obj, key).fold(function () {
        return missingRequired(path, key, obj);
      }, bundle);
    };
    var fallbackAccess = function (obj, key, fallback, bundle) {
      var v = get$e(obj, key).getOrThunk(function () {
        return fallback(obj);
      });
      return bundle(v);
    };
    var optionAccess = function (obj, key, bundle) {
      return bundle(get$e(obj, key));
    };
    var optionDefaultedAccess = function (obj, key, fallback, bundle) {
      var opt = get$e(obj, key).map(function (val) {
        return val === true ? fallback(obj) : val;
      });
      return bundle(opt);
    };
    var extractField = function (field, path, obj, key, prop) {
      var bundle = function (av) {
        return prop.extract(path.concat([key]), av);
      };
      var bundleAsOption = function (optValue) {
        return optValue.fold(function () {
          return SimpleResult.svalue(Optional.none());
        }, function (ov) {
          var result = prop.extract(path.concat([key]), ov);
          return SimpleResult.map(result, Optional.some);
        });
      };
      switch (field.tag) {
      case 'required':
        return requiredAccess(path, obj, key, bundle);
      case 'defaultedThunk':
        return fallbackAccess(obj, key, field.process, bundle);
      case 'option':
        return optionAccess(obj, key, bundleAsOption);
      case 'defaultedOptionThunk':
        return optionDefaultedAccess(obj, key, field.process, bundleAsOption);
      case 'mergeWithThunk': {
          return fallbackAccess(obj, key, constant$1({}), function (v) {
            var result = deepMerge(field.process(obj), v);
            return bundle(result);
          });
        }
      }
    };
    var extractFields = function (path, obj, fields) {
      var success = {};
      var errors = [];
      for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
        var field = fields_1[_i];
        fold(field, function (key, newKey, presence, prop) {
          var result = extractField(presence, path, obj, key, prop);
          SimpleResult.fold(result, function (err) {
            errors.push.apply(errors, err);
          }, function (res) {
            success[newKey] = res;
          });
        }, function (newKey, instantiator) {
          success[newKey] = instantiator(obj);
        });
      }
      return errors.length > 0 ? SimpleResult.serror(errors) : SimpleResult.svalue(success);
    };
    var valueThunk = function (getDelegate) {
      var extract = function (path, val) {
        return getDelegate().extract(path, val);
      };
      var toString = function () {
        return getDelegate().toString();
      };
      return {
        extract: extract,
        toString: toString
      };
    };
    var getSetKeys = function (obj) {
      return keys(filter$1(obj, isNonNullable));
    };
    var objOfOnly = function (fields) {
      var delegate = objOf(fields);
      var fieldNames = foldr(fields, function (acc, value) {
        return fold(value, function (key) {
          var _a;
          return deepMerge(acc, (_a = {}, _a[key] = true, _a));
        }, constant$1(acc));
      }, {});
      var extract = function (path, o) {
        var keys = isBoolean(o) ? [] : getSetKeys(o);
        var extra = filter$2(keys, function (k) {
          return !hasNonNullableKey(fieldNames, k);
        });
        return extra.length === 0 ? delegate.extract(path, o) : unsupportedFields(path, extra);
      };
      return {
        extract: extract,
        toString: delegate.toString
      };
    };
    var objOf = function (values) {
      var extract = function (path, o) {
        return extractFields(path, o, values);
      };
      var toString = function () {
        var fieldStrings = map$2(values, function (value) {
          return fold(value, function (key, _okey, _presence, prop) {
            return key + ' -> ' + prop.toString();
          }, function (newKey, _instantiator) {
            return 'state(' + newKey + ')';
          });
        });
        return 'obj{\n' + fieldStrings.join('\n') + '}';
      };
      return {
        extract: extract,
        toString: toString
      };
    };
    var arrOf = function (prop) {
      var extract = function (path, array) {
        var results = map$2(array, function (a, i) {
          return prop.extract(path.concat(['[' + i + ']']), a);
        });
        return ResultCombine.consolidateArr(results);
      };
      var toString = function () {
        return 'array(' + prop.toString() + ')';
      };
      return {
        extract: extract,
        toString: toString
      };
    };
    var oneOf = function (props) {
      var extract = function (path, val) {
        var errors = [];
        for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
          var prop = props_1[_i];
          var res = prop.extract(path, val);
          if (res.stype === SimpleResultType.Value) {
            return res;
          }
          errors.push(res);
        }
        return ResultCombine.consolidateArr(errors);
      };
      var toString = function () {
        return 'oneOf(' + map$2(props, function (prop) {
          return prop.toString();
        }).join(', ') + ')';
      };
      return {
        extract: extract,
        toString: toString
      };
    };
    var setOf$1 = function (validator, prop) {
      var validateKeys = function (path, keys) {
        return arrOf(value$2(validator)).extract(path, keys);
      };
      var extract = function (path, o) {
        var keys$1 = keys(o);
        var validatedKeys = validateKeys(path, keys$1);
        return SimpleResult.bind(validatedKeys, function (validKeys) {
          var schema = map$2(validKeys, function (vk) {
            return field$2(vk, vk, required$2(), prop);
          });
          return objOf(schema).extract(path, o);
        });
      };
      var toString = function () {
        return 'setOf(' + prop.toString() + ')';
      };
      return {
        extract: extract,
        toString: toString
      };
    };
    var thunk = function (_desc, processor) {
      var getP = cached(processor);
      var extract = function (path, val) {
        return getP().extract(path, val);
      };
      var toString = function () {
        return getP().toString();
      };
      return {
        extract: extract,
        toString: toString
      };
    };
    var arrOfObj = compose(arrOf, objOf);

    var anyValue = constant$1(anyValue$1);
    var typedValue = function (validator, expectedType) {
      return value$2(function (a) {
        var actualType = typeof a;
        return validator(a) ? SimpleResult.svalue(a) : SimpleResult.serror('Expected type: ' + expectedType + ' but got: ' + actualType);
      });
    };
    var number = typedValue(isNumber, 'number');
    var string = typedValue(isString, 'string');
    var boolean = typedValue(isBoolean, 'boolean');
    var functionProcessor = typedValue(isFunction, 'function');
    var isPostMessageable = function (val) {
      if (Object(val) !== val) {
        return true;
      }
      switch ({}.toString.call(val).slice(8, -1)) {
      case 'Boolean':
      case 'Number':
      case 'String':
      case 'Date':
      case 'RegExp':
      case 'Blob':
      case 'FileList':
      case 'ImageData':
      case 'ImageBitmap':
      case 'ArrayBuffer':
        return true;
      case 'Array':
      case 'Object':
        return Object.keys(val).every(function (prop) {
          return isPostMessageable(val[prop]);
        });
      default:
        return false;
      }
    };
    var postMessageable = value$2(function (a) {
      if (isPostMessageable(a)) {
        return SimpleResult.svalue(a);
      } else {
        return SimpleResult.serror('Expected value to be acceptable for sending via postMessage');
      }
    });

    var chooseFrom = function (path, input, branches, ch) {
      var fields = get$e(branches, ch);
      return fields.fold(function () {
        return missingBranch(path, branches, ch);
      }, function (vp) {
        return vp.extract(path.concat(['branch: ' + ch]), input);
      });
    };
    var choose$2 = function (key, branches) {
      var extract = function (path, input) {
        var choice = get$e(input, key);
        return choice.fold(function () {
          return missingKey(path, key);
        }, function (chosen) {
          return chooseFrom(path, input, branches, chosen);
        });
      };
      var toString = function () {
        return 'chooseOn(' + key + '). Possible values: ' + keys(branches);
      };
      return {
        extract: extract,
        toString: toString
      };
    };

    var arrOfVal = function () {
      return arrOf(anyValue$1);
    };
    var valueOf = function (validator) {
      return value$2(function (v) {
        return validator(v).fold(SimpleResult.serror, SimpleResult.svalue);
      });
    };
    var setOf = function (validator, prop) {
      return setOf$1(function (v) {
        return SimpleResult.fromResult(validator(v));
      }, prop);
    };
    var extractValue = function (label, prop, obj) {
      var res = prop.extract([label], obj);
      return SimpleResult.mapError(res, function (errs) {
        return {
          input: obj,
          errors: errs
        };
      });
    };
    var asRaw = function (label, prop, obj) {
      return SimpleResult.toResult(extractValue(label, prop, obj));
    };
    var getOrDie = function (extraction) {
      return extraction.fold(function (errInfo) {
        throw new Error(formatError(errInfo));
      }, identity$1);
    };
    var asRawOrDie$1 = function (label, prop, obj) {
      return getOrDie(asRaw(label, prop, obj));
    };
    var formatError = function (errInfo) {
      return 'Errors: \n' + formatErrors(errInfo.errors).join('\n') + '\n\nInput object: ' + formatObj(errInfo.input);
    };
    var choose$1 = function (key, branches) {
      return choose$2(key, map(branches, objOf));
    };
    var thunkOf = function (desc, schema) {
      return thunk(desc, schema);
    };

    var field$1 = field$2;
    var customField = customField$1;
    var validateEnum = function (values) {
      return valueOf(function (value) {
        return contains$2(values, value) ? Result.value(value) : Result.error('Unsupported value: "' + value + '", choose one of "' + values.join(', ') + '".');
      });
    };
    var required$1 = function (key) {
      return field$1(key, key, required$2(), anyValue());
    };
    var requiredOf = function (key, schema) {
      return field$1(key, key, required$2(), schema);
    };
    var requiredNumber = function (key) {
      return requiredOf(key, number);
    };
    var requiredString = function (key) {
      return requiredOf(key, string);
    };
    var requiredStringEnum = function (key, values) {
      return field$1(key, key, required$2(), validateEnum(values));
    };
    var requiredBoolean = function (key) {
      return requiredOf(key, boolean);
    };
    var requiredFunction = function (key) {
      return requiredOf(key, functionProcessor);
    };
    var forbid = function (key, message) {
      return field$1(key, key, asOption(), value$2(function (_v) {
        return SimpleResult.serror('The field: ' + key + ' is forbidden. ' + message);
      }));
    };
    var requiredObjOf = function (key, objSchema) {
      return field$1(key, key, required$2(), objOf(objSchema));
    };
    var requiredArrayOfObj = function (key, objFields) {
      return field$1(key, key, required$2(), arrOfObj(objFields));
    };
    var requiredArrayOf = function (key, schema) {
      return field$1(key, key, required$2(), arrOf(schema));
    };
    var option = function (key) {
      return field$1(key, key, asOption(), anyValue());
    };
    var optionOf = function (key, schema) {
      return field$1(key, key, asOption(), schema);
    };
    var optionNumber = function (key) {
      return optionOf(key, number);
    };
    var optionString = function (key) {
      return optionOf(key, string);
    };
    var optionFunction = function (key) {
      return optionOf(key, functionProcessor);
    };
    var optionArrayOf = function (key, schema) {
      return optionOf(key, arrOf(schema));
    };
    var optionObjOf = function (key, objSchema) {
      return optionOf(key, objOf(objSchema));
    };
    var optionObjOfOnly = function (key, objSchema) {
      return optionOf(key, objOfOnly(objSchema));
    };
    var defaulted = function (key, fallback) {
      return field$1(key, key, defaulted$1(fallback), anyValue());
    };
    var defaultedOf = function (key, fallback, schema) {
      return field$1(key, key, defaulted$1(fallback), schema);
    };
    var defaultedNumber = function (key, fallback) {
      return defaultedOf(key, fallback, number);
    };
    var defaultedString = function (key, fallback) {
      return defaultedOf(key, fallback, string);
    };
    var defaultedStringEnum = function (key, fallback, values) {
      return defaultedOf(key, fallback, validateEnum(values));
    };
    var defaultedBoolean = function (key, fallback) {
      return defaultedOf(key, fallback, boolean);
    };
    var defaultedFunction = function (key, fallback) {
      return defaultedOf(key, fallback, functionProcessor);
    };
    var defaultedPostMsg = function (key, fallback) {
      return defaultedOf(key, fallback, postMessageable);
    };
    var defaultedArrayOf = function (key, fallback, schema) {
      return defaultedOf(key, fallback, arrOf(schema));
    };
    var defaultedObjOf = function (key, fallback, objSchema) {
      return defaultedOf(key, fallback, objOf(objSchema));
    };

    var Cell = function (initial) {
      var value = initial;
      var get = function () {
        return value;
      };
      var set = function (v) {
        value = v;
      };
      return {
        get: get,
        set: set
      };
    };

    var fromHtml$2 = function (html, scope) {
      var doc = scope || document;
      var div = doc.createElement('div');
      div.innerHTML = html;
      if (!div.hasChildNodes() || div.childNodes.length > 1) {
        console.error('HTML does not have a single root node', html);
        throw new Error('HTML must have a single root node');
      }
      return fromDom(div.childNodes[0]);
    };
    var fromTag = function (tag, scope) {
      var doc = scope || document;
      var node = doc.createElement(tag);
      return fromDom(node);
    };
    var fromText = function (text, scope) {
      var doc = scope || document;
      var node = doc.createTextNode(text);
      return fromDom(node);
    };
    var fromDom = function (node) {
      if (node === null || node === undefined) {
        throw new Error('Node cannot be null or undefined');
      }
      return { dom: node };
    };
    var fromPoint = function (docElm, x, y) {
      return Optional.from(docElm.dom.elementFromPoint(x, y)).map(fromDom);
    };
    var SugarElement = {
      fromHtml: fromHtml$2,
      fromTag: fromTag,
      fromText: fromText,
      fromDom: fromDom,
      fromPoint: fromPoint
    };

    var DeviceType = function (os, browser, userAgent, mediaMatch) {
      var isiPad = os.isiOS() && /ipad/i.test(userAgent) === true;
      var isiPhone = os.isiOS() && !isiPad;
      var isMobile = os.isiOS() || os.isAndroid();
      var isTouch = isMobile || mediaMatch('(pointer:coarse)');
      var isTablet = isiPad || !isiPhone && isMobile && mediaMatch('(min-device-width:768px)');
      var isPhone = isiPhone || isMobile && !isTablet;
      var iOSwebview = browser.isSafari() && os.isiOS() && /safari/i.test(userAgent) === false;
      var isDesktop = !isPhone && !isTablet && !iOSwebview;
      return {
        isiPad: constant$1(isiPad),
        isiPhone: constant$1(isiPhone),
        isTablet: constant$1(isTablet),
        isPhone: constant$1(isPhone),
        isTouch: constant$1(isTouch),
        isAndroid: os.isAndroid,
        isiOS: os.isiOS,
        isWebView: constant$1(iOSwebview),
        isDesktop: constant$1(isDesktop)
      };
    };

    var firstMatch = function (regexes, s) {
      for (var i = 0; i < regexes.length; i++) {
        var x = regexes[i];
        if (x.test(s)) {
          return x;
        }
      }
      return undefined;
    };
    var find$3 = function (regexes, agent) {
      var r = firstMatch(regexes, agent);
      if (!r) {
        return {
          major: 0,
          minor: 0
        };
      }
      var group = function (i) {
        return Number(agent.replace(r, '$' + i));
      };
      return nu$c(group(1), group(2));
    };
    var detect$4 = function (versionRegexes, agent) {
      var cleanedAgent = String(agent).toLowerCase();
      if (versionRegexes.length === 0) {
        return unknown$3();
      }
      return find$3(versionRegexes, cleanedAgent);
    };
    var unknown$3 = function () {
      return nu$c(0, 0);
    };
    var nu$c = function (major, minor) {
      return {
        major: major,
        minor: minor
      };
    };
    var Version = {
      nu: nu$c,
      detect: detect$4,
      unknown: unknown$3
    };

    var detectBrowser$1 = function (browsers, userAgentData) {
      return findMap(userAgentData.brands, function (uaBrand) {
        var lcBrand = uaBrand.brand.toLowerCase();
        return find$5(browsers, function (browser) {
          var _a;
          return lcBrand === ((_a = browser.brand) === null || _a === void 0 ? void 0 : _a.toLowerCase());
        }).map(function (info) {
          return {
            current: info.name,
            version: Version.nu(parseInt(uaBrand.version, 10), 0)
          };
        });
      });
    };

    var detect$3 = function (candidates, userAgent) {
      var agent = String(userAgent).toLowerCase();
      return find$5(candidates, function (candidate) {
        return candidate.search(agent);
      });
    };
    var detectBrowser = function (browsers, userAgent) {
      return detect$3(browsers, userAgent).map(function (browser) {
        var version = Version.detect(browser.versionRegexes, userAgent);
        return {
          current: browser.name,
          version: version
        };
      });
    };
    var detectOs = function (oses, userAgent) {
      return detect$3(oses, userAgent).map(function (os) {
        var version = Version.detect(os.versionRegexes, userAgent);
        return {
          current: os.name,
          version: version
        };
      });
    };

    var addToEnd = function (str, suffix) {
      return str + suffix;
    };
    var removeFromStart = function (str, numChars) {
      return str.substring(numChars);
    };

    var checkRange = function (str, substr, start) {
      return substr === '' || str.length >= substr.length && str.substr(start, start + substr.length) === substr;
    };
    var removeLeading = function (str, prefix) {
      return startsWith(str, prefix) ? removeFromStart(str, prefix.length) : str;
    };
    var ensureTrailing = function (str, suffix) {
      return endsWith(str, suffix) ? str : addToEnd(str, suffix);
    };
    var contains$1 = function (str, substr) {
      return str.indexOf(substr) !== -1;
    };
    var startsWith = function (str, prefix) {
      return checkRange(str, prefix, 0);
    };
    var endsWith = function (str, suffix) {
      return checkRange(str, suffix, str.length - suffix.length);
    };
    var blank = function (r) {
      return function (s) {
        return s.replace(r, '');
      };
    };
    var trim$1 = blank(/^\s+|\s+$/g);
    var isNotEmpty = function (s) {
      return s.length > 0;
    };
    var isEmpty = function (s) {
      return !isNotEmpty(s);
    };

    var normalVersionRegex = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/;
    var checkContains = function (target) {
      return function (uastring) {
        return contains$1(uastring, target);
      };
    };
    var browsers = [
      {
        name: 'Edge',
        versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
        search: function (uastring) {
          return contains$1(uastring, 'edge/') && contains$1(uastring, 'chrome') && contains$1(uastring, 'safari') && contains$1(uastring, 'applewebkit');
        }
      },
      {
        name: 'Chrome',
        brand: 'Chromium',
        versionRegexes: [
          /.*?chrome\/([0-9]+)\.([0-9]+).*/,
          normalVersionRegex
        ],
        search: function (uastring) {
          return contains$1(uastring, 'chrome') && !contains$1(uastring, 'chromeframe');
        }
      },
      {
        name: 'IE',
        versionRegexes: [
          /.*?msie\ ?([0-9]+)\.([0-9]+).*/,
          /.*?rv:([0-9]+)\.([0-9]+).*/
        ],
        search: function (uastring) {
          return contains$1(uastring, 'msie') || contains$1(uastring, 'trident');
        }
      },
      {
        name: 'Opera',
        versionRegexes: [
          normalVersionRegex,
          /.*?opera\/([0-9]+)\.([0-9]+).*/
        ],
        search: checkContains('opera')
      },
      {
        name: 'Firefox',
        versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
        search: checkContains('firefox')
      },
      {
        name: 'Safari',
        versionRegexes: [
          normalVersionRegex,
          /.*?cpu os ([0-9]+)_([0-9]+).*/
        ],
        search: function (uastring) {
          return (contains$1(uastring, 'safari') || contains$1(uastring, 'mobile/')) && contains$1(uastring, 'applewebkit');
        }
      }
    ];
    var oses = [
      {
        name: 'Windows',
        search: checkContains('win'),
        versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]
      },
      {
        name: 'iOS',
        search: function (uastring) {
          return contains$1(uastring, 'iphone') || contains$1(uastring, 'ipad');
        },
        versionRegexes: [
          /.*?version\/\ ?([0-9]+)\.([0-9]+).*/,
          /.*cpu os ([0-9]+)_([0-9]+).*/,
          /.*cpu iphone os ([0-9]+)_([0-9]+).*/
        ]
      },
      {
        name: 'Android',
        search: checkContains('android'),
        versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/]
      },
      {
        name: 'OSX',
        search: checkContains('mac os x'),
        versionRegexes: [/.*?mac\ os\ x\ ?([0-9]+)_([0-9]+).*/]
      },
      {
        name: 'Linux',
        search: checkContains('linux'),
        versionRegexes: []
      },
      {
        name: 'Solaris',
        search: checkContains('sunos'),
        versionRegexes: []
      },
      {
        name: 'FreeBSD',
        search: checkContains('freebsd'),
        versionRegexes: []
      },
      {
        name: 'ChromeOS',
        search: checkContains('cros'),
        versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/]
      }
    ];
    var PlatformInfo = {
      browsers: constant$1(browsers),
      oses: constant$1(oses)
    };

    var edge = 'Edge';
    var chrome = 'Chrome';
    var ie = 'IE';
    var opera = 'Opera';
    var firefox = 'Firefox';
    var safari = 'Safari';
    var unknown$2 = function () {
      return nu$b({
        current: undefined,
        version: Version.unknown()
      });
    };
    var nu$b = function (info) {
      var current = info.current;
      var version = info.version;
      var isBrowser = function (name) {
        return function () {
          return current === name;
        };
      };
      return {
        current: current,
        version: version,
        isEdge: isBrowser(edge),
        isChrome: isBrowser(chrome),
        isIE: isBrowser(ie),
        isOpera: isBrowser(opera),
        isFirefox: isBrowser(firefox),
        isSafari: isBrowser(safari)
      };
    };
    var Browser = {
      unknown: unknown$2,
      nu: nu$b,
      edge: constant$1(edge),
      chrome: constant$1(chrome),
      ie: constant$1(ie),
      opera: constant$1(opera),
      firefox: constant$1(firefox),
      safari: constant$1(safari)
    };

    var windows = 'Windows';
    var ios = 'iOS';
    var android = 'Android';
    var linux = 'Linux';
    var osx = 'OSX';
    var solaris = 'Solaris';
    var freebsd = 'FreeBSD';
    var chromeos = 'ChromeOS';
    var unknown$1 = function () {
      return nu$a({
        current: undefined,
        version: Version.unknown()
      });
    };
    var nu$a = function (info) {
      var current = info.current;
      var version = info.version;
      var isOS = function (name) {
        return function () {
          return current === name;
        };
      };
      return {
        current: current,
        version: version,
        isWindows: isOS(windows),
        isiOS: isOS(ios),
        isAndroid: isOS(android),
        isOSX: isOS(osx),
        isLinux: isOS(linux),
        isSolaris: isOS(solaris),
        isFreeBSD: isOS(freebsd),
        isChromeOS: isOS(chromeos)
      };
    };
    var OperatingSystem = {
      unknown: unknown$1,
      nu: nu$a,
      windows: constant$1(windows),
      ios: constant$1(ios),
      android: constant$1(android),
      linux: constant$1(linux),
      osx: constant$1(osx),
      solaris: constant$1(solaris),
      freebsd: constant$1(freebsd),
      chromeos: constant$1(chromeos)
    };

    var detect$2 = function (userAgent, userAgentDataOpt, mediaMatch) {
      var browsers = PlatformInfo.browsers();
      var oses = PlatformInfo.oses();
      var browser = userAgentDataOpt.bind(function (userAgentData) {
        return detectBrowser$1(browsers, userAgentData);
      }).orThunk(function () {
        return detectBrowser(browsers, userAgent);
      }).fold(Browser.unknown, Browser.nu);
      var os = detectOs(oses, userAgent).fold(OperatingSystem.unknown, OperatingSystem.nu);
      var deviceType = DeviceType(os, browser, userAgent, mediaMatch);
      return {
        browser: browser,
        os: os,
        deviceType: deviceType
      };
    };
    var PlatformDetection = { detect: detect$2 };

    var mediaMatch = function (query) {
      return window.matchMedia(query).matches;
    };
    var platform = cached(function () {
      return PlatformDetection.detect(navigator.userAgent, Optional.from(navigator.userAgentData), mediaMatch);
    });
    var detect$1 = function () {
      return platform();
    };

    var compareDocumentPosition = function (a, b, match) {
      return (a.compareDocumentPosition(b) & match) !== 0;
    };
    var documentPositionContainedBy = function (a, b) {
      return compareDocumentPosition(a, b, Node.DOCUMENT_POSITION_CONTAINED_BY);
    };

    var DOCUMENT = 9;
    var DOCUMENT_FRAGMENT = 11;
    var ELEMENT = 1;
    var TEXT = 3;

    var is$1 = function (element, selector) {
      var dom = element.dom;
      if (dom.nodeType !== ELEMENT) {
        return false;
      } else {
        var elem = dom;
        if (elem.matches !== undefined) {
          return elem.matches(selector);
        } else if (elem.msMatchesSelector !== undefined) {
          return elem.msMatchesSelector(selector);
        } else if (elem.webkitMatchesSelector !== undefined) {
          return elem.webkitMatchesSelector(selector);
        } else if (elem.mozMatchesSelector !== undefined) {
          return elem.mozMatchesSelector(selector);
        } else {
          throw new Error('Browser lacks native selectors');
        }
      }
    };
    var bypassSelector = function (dom) {
      return dom.nodeType !== ELEMENT && dom.nodeType !== DOCUMENT && dom.nodeType !== DOCUMENT_FRAGMENT || dom.childElementCount === 0;
    };
    var all$3 = function (selector, scope) {
      var base = scope === undefined ? document : scope.dom;
      return bypassSelector(base) ? [] : map$2(base.querySelectorAll(selector), SugarElement.fromDom);
    };
    var one = function (selector, scope) {
      var base = scope === undefined ? document : scope.dom;
      return bypassSelector(base) ? Optional.none() : Optional.from(base.querySelector(selector)).map(SugarElement.fromDom);
    };

    var eq = function (e1, e2) {
      return e1.dom === e2.dom;
    };
    var regularContains = function (e1, e2) {
      var d1 = e1.dom;
      var d2 = e2.dom;
      return d1 === d2 ? false : d1.contains(d2);
    };
    var ieContains = function (e1, e2) {
      return documentPositionContainedBy(e1.dom, e2.dom);
    };
    var contains = function (e1, e2) {
      return detect$1().browser.isIE() ? ieContains(e1, e2) : regularContains(e1, e2);
    };

    var generate$7 = function (cases) {
      if (!isArray(cases)) {
        throw new Error('cases must be an array');
      }
      if (cases.length === 0) {
        throw new Error('there must be at least one case');
      }
      var constructors = [];
      var adt = {};
      each$1(cases, function (acase, count) {
        var keys$1 = keys(acase);
        if (keys$1.length !== 1) {
          throw new Error('one and only one name per case');
        }
        var key = keys$1[0];
        var value = acase[key];
        if (adt[key] !== undefined) {
          throw new Error('duplicate key detected:' + key);
        } else if (key === 'cata') {
          throw new Error('cannot have a case named cata (sorry)');
        } else if (!isArray(value)) {
          throw new Error('case arguments must be an array');
        }
        constructors.push(key);
        adt[key] = function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          var argLength = args.length;
          if (argLength !== value.length) {
            throw new Error('Wrong number of arguments to case ' + key + '. Expected ' + value.length + ' (' + value + '), got ' + argLength);
          }
          var match = function (branches) {
            var branchKeys = keys(branches);
            if (constructors.length !== branchKeys.length) {
              throw new Error('Wrong number of arguments to match. Expected: ' + constructors.join(',') + '\nActual: ' + branchKeys.join(','));
            }
            var allReqd = forall(constructors, function (reqKey) {
              return contains$2(branchKeys, reqKey);
            });
            if (!allReqd) {
              throw new Error('Not all branches were specified when using match. Specified: ' + branchKeys.join(', ') + '\nRequired: ' + constructors.join(', '));
            }
            return branches[key].apply(null, args);
          };
          return {
            fold: function () {
              var foldArgs = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                foldArgs[_i] = arguments[_i];
              }
              if (foldArgs.length !== cases.length) {
                throw new Error('Wrong number of arguments to fold. Expected ' + cases.length + ', got ' + foldArgs.length);
              }
              var target = foldArgs[count];
              return target.apply(null, args);
            },
            match: match,
            log: function (label) {
              console.log(label, {
                constructors: constructors,
                constructor: key,
                params: args
              });
            }
          };
        };
      });
      return adt;
    };
    var Adt = { generate: generate$7 };

    Adt.generate([
      {
        bothErrors: [
          'error1',
          'error2'
        ]
      },
      {
        firstError: [
          'error1',
          'value2'
        ]
      },
      {
        secondError: [
          'value1',
          'error2'
        ]
      },
      {
        bothValues: [
          'value1',
          'value2'
        ]
      }
    ]);
    var partition$1 = function (results) {
      var errors = [];
      var values = [];
      each$1(results, function (result) {
        result.fold(function (err) {
          errors.push(err);
        }, function (value) {
          values.push(value);
        });
      });
      return {
        errors: errors,
        values: values
      };
    };

    var exclude$1 = function (obj, fields) {
      var r = {};
      each(obj, function (v, k) {
        if (!contains$2(fields, k)) {
          r[k] = v;
        }
      });
      return r;
    };

    var wrap$2 = function (key, value) {
      var _a;
      return _a = {}, _a[key] = value, _a;
    };
    var wrapAll$1 = function (keyvalues) {
      var r = {};
      each$1(keyvalues, function (kv) {
        r[kv.key] = kv.value;
      });
      return r;
    };

    var exclude = function (obj, fields) {
      return exclude$1(obj, fields);
    };
    var wrap$1 = function (key, value) {
      return wrap$2(key, value);
    };
    var wrapAll = function (keyvalues) {
      return wrapAll$1(keyvalues);
    };
    var mergeValues = function (values, base) {
      return values.length === 0 ? Result.value(base) : Result.value(deepMerge(base, merge$1.apply(undefined, values)));
    };
    var mergeErrors = function (errors) {
      return Result.error(flatten(errors));
    };
    var consolidate = function (objs, base) {
      var partitions = partition$1(objs);
      return partitions.errors.length > 0 ? mergeErrors(partitions.errors) : mergeValues(partitions.values, base);
    };

    var ensureIsRoot = function (isRoot) {
      return isFunction(isRoot) ? isRoot : never;
    };
    var ancestor$2 = function (scope, transform, isRoot) {
      var element = scope.dom;
      var stop = ensureIsRoot(isRoot);
      while (element.parentNode) {
        element = element.parentNode;
        var el = SugarElement.fromDom(element);
        var transformed = transform(el);
        if (transformed.isSome()) {
          return transformed;
        } else if (stop(el)) {
          break;
        }
      }
      return Optional.none();
    };
    var closest$4 = function (scope, transform, isRoot) {
      var current = transform(scope);
      var stop = ensureIsRoot(isRoot);
      return current.orThunk(function () {
        return stop(scope) ? Optional.none() : ancestor$2(scope, transform, stop);
      });
    };

    var isSource = function (component, simulatedEvent) {
      return eq(component.element, simulatedEvent.event.target);
    };

    var defaultEventHandler = {
      can: always,
      abort: never,
      run: noop
    };
    var nu$9 = function (parts) {
      if (!hasNonNullableKey(parts, 'can') && !hasNonNullableKey(parts, 'abort') && !hasNonNullableKey(parts, 'run')) {
        throw new Error('EventHandler defined by: ' + JSON.stringify(parts, null, 2) + ' does not have can, abort, or run!');
      }
      return __assign(__assign({}, defaultEventHandler), parts);
    };
    var all$2 = function (handlers, f) {
      return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return foldl(handlers, function (acc, handler) {
          return acc && f(handler).apply(undefined, args);
        }, true);
      };
    };
    var any = function (handlers, f) {
      return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return foldl(handlers, function (acc, handler) {
          return acc || f(handler).apply(undefined, args);
        }, false);
      };
    };
    var read$2 = function (handler) {
      return isFunction(handler) ? {
        can: always,
        abort: never,
        run: handler
      } : handler;
    };
    var fuse$1 = function (handlers) {
      var can = all$2(handlers, function (handler) {
        return handler.can;
      });
      var abort = any(handlers, function (handler) {
        return handler.abort;
      });
      var run = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        each$1(handlers, function (handler) {
          handler.run.apply(undefined, args);
        });
      };
      return {
        can: can,
        abort: abort,
        run: run
      };
    };

    var constant = constant$1;
    var touchstart = constant('touchstart');
    var touchmove = constant('touchmove');
    var touchend = constant('touchend');
    var touchcancel = constant('touchcancel');
    var mousedown = constant('mousedown');
    var mousemove = constant('mousemove');
    var mouseout = constant('mouseout');
    var mouseup = constant('mouseup');
    var mouseover = constant('mouseover');
    var focusin = constant('focusin');
    var focusout = constant('focusout');
    var keydown = constant('keydown');
    var keyup = constant('keyup');
    var input = constant('input');
    var change = constant('change');
    var click = constant('click');
    var transitioncancel = constant('transitioncancel');
    var transitionend = constant('transitionend');
    var transitionstart = constant('transitionstart');
    var selectstart = constant('selectstart');

    var prefixName = function (name) {
      return constant$1('alloy.' + name);
    };
    var alloy = { tap: prefixName('tap') };
    var focus$4 = prefixName('focus');
    var postBlur = prefixName('blur.post');
    var postPaste = prefixName('paste.post');
    var receive = prefixName('receive');
    var execute$5 = prefixName('execute');
    var focusItem = prefixName('focus.item');
    var tap = alloy.tap;
    var longpress = prefixName('longpress');
    var sandboxClose = prefixName('sandbox.close');
    var typeaheadCancel = prefixName('typeahead.cancel');
    var systemInit = prefixName('system.init');
    var documentTouchmove = prefixName('system.touchmove');
    var documentTouchend = prefixName('system.touchend');
    var windowScroll = prefixName('system.scroll');
    var windowResize = prefixName('system.resize');
    var attachedToDom = prefixName('system.attached');
    var detachedFromDom = prefixName('system.detached');
    var dismissRequested = prefixName('system.dismissRequested');
    var repositionRequested = prefixName('system.repositionRequested');
    var focusShifted = prefixName('focusmanager.shifted');
    var slotVisibility = prefixName('slotcontainer.visibility');
    var changeTab = prefixName('change.tab');
    var dismissTab = prefixName('dismiss.tab');
    var highlight$1 = prefixName('highlight');
    var dehighlight$1 = prefixName('dehighlight');

    var emit = function (component, event) {
      dispatchWith(component, component.element, event, {});
    };
    var emitWith = function (component, event, properties) {
      dispatchWith(component, component.element, event, properties);
    };
    var emitExecute = function (component) {
      emit(component, execute$5());
    };
    var dispatch = function (component, target, event) {
      dispatchWith(component, target, event, {});
    };
    var dispatchWith = function (component, target, event, properties) {
      var data = __assign({ target: target }, properties);
      component.getSystem().triggerEvent(event, target, data);
    };
    var dispatchEvent = function (component, target, event, simulatedEvent) {
      component.getSystem().triggerEvent(event, target, simulatedEvent.event);
    };

    var derive$2 = function (configs) {
      return wrapAll(configs);
    };
    var abort = function (name, predicate) {
      return {
        key: name,
        value: nu$9({ abort: predicate })
      };
    };
    var can = function (name, predicate) {
      return {
        key: name,
        value: nu$9({ can: predicate })
      };
    };
    var preventDefault = function (name) {
      return {
        key: name,
        value: nu$9({
          run: function (component, simulatedEvent) {
            simulatedEvent.event.prevent();
          }
        })
      };
    };
    var run$1 = function (name, handler) {
      return {
        key: name,
        value: nu$9({ run: handler })
      };
    };
    var runActionExtra = function (name, action, extra) {
      return {
        key: name,
        value: nu$9({
          run: function (component, simulatedEvent) {
            action.apply(undefined, [
              component,
              simulatedEvent
            ].concat(extra));
          }
        })
      };
    };
    var runOnName = function (name) {
      return function (handler) {
        return run$1(name, handler);
      };
    };
    var runOnSourceName = function (name) {
      return function (handler) {
        return {
          key: name,
          value: nu$9({
            run: function (component, simulatedEvent) {
              if (isSource(component, simulatedEvent)) {
                handler(component, simulatedEvent);
              }
            }
          })
        };
      };
    };
    var redirectToUid = function (name, uid) {
      return run$1(name, function (component, simulatedEvent) {
        component.getSystem().getByUid(uid).each(function (redirectee) {
          dispatchEvent(redirectee, redirectee.element, name, simulatedEvent);
        });
      });
    };
    var redirectToPart = function (name, detail, partName) {
      var uid = detail.partUids[partName];
      return redirectToUid(name, uid);
    };
    var runWithTarget = function (name, f) {
      return run$1(name, function (component, simulatedEvent) {
        var ev = simulatedEvent.event;
        var target = component.getSystem().getByDom(ev.target).getOrThunk(function () {
          var closest = closest$4(ev.target, function (el) {
            return component.getSystem().getByDom(el).toOptional();
          }, never);
          return closest.getOr(component);
        });
        f(component, target, simulatedEvent);
      });
    };
    var cutter = function (name) {
      return run$1(name, function (component, simulatedEvent) {
        simulatedEvent.cut();
      });
    };
    var stopper = function (name) {
      return run$1(name, function (component, simulatedEvent) {
        simulatedEvent.stop();
      });
    };
    var runOnSource = function (name, f) {
      return runOnSourceName(name)(f);
    };
    var runOnAttached = runOnSourceName(attachedToDom());
    var runOnDetached = runOnSourceName(detachedFromDom());
    var runOnInit = runOnSourceName(systemInit());
    var runOnExecute$1 = runOnName(execute$5());

    typeof window !== 'undefined' ? window : Function('return this;')();

    var name$2 = function (element) {
      var r = element.dom.nodeName;
      return r.toLowerCase();
    };
    var type = function (element) {
      return element.dom.nodeType;
    };
    var isType = function (t) {
      return function (element) {
        return type(element) === t;
      };
    };
    var isElement$2 = isType(ELEMENT);
    var isText$1 = isType(TEXT);
    var isDocument = isType(DOCUMENT);
    var isDocumentFragment = isType(DOCUMENT_FRAGMENT);

    var owner$4 = function (element) {
      return SugarElement.fromDom(element.dom.ownerDocument);
    };
    var documentOrOwner = function (dos) {
      return isDocument(dos) ? dos : owner$4(dos);
    };
    var documentElement = function (element) {
      return SugarElement.fromDom(documentOrOwner(element).dom.documentElement);
    };
    var defaultView = function (element) {
      return SugarElement.fromDom(documentOrOwner(element).dom.defaultView);
    };
    var parent = function (element) {
      return Optional.from(element.dom.parentNode).map(SugarElement.fromDom);
    };
    var parentNode = function (element) {
      return parent(element);
    };
    var offsetParent = function (element) {
      return Optional.from(element.dom.offsetParent).map(SugarElement.fromDom);
    };
    var nextSibling = function (element) {
      return Optional.from(element.dom.nextSibling).map(SugarElement.fromDom);
    };
    var children = function (element) {
      return map$2(element.dom.childNodes, SugarElement.fromDom);
    };
    var child$2 = function (element, index) {
      var cs = element.dom.childNodes;
      return Optional.from(cs[index]).map(SugarElement.fromDom);
    };
    var firstChild = function (element) {
      return child$2(element, 0);
    };
    var spot = function (element, offset) {
      return {
        element: element,
        offset: offset
      };
    };
    var leaf = function (element, offset) {
      var cs = children(element);
      return cs.length > 0 && offset < cs.length ? spot(cs[offset], 0) : spot(element, offset);
    };

    var isShadowRoot = function (dos) {
      return isDocumentFragment(dos) && isNonNullable(dos.dom.host);
    };
    var supported = isFunction(Element.prototype.attachShadow) && isFunction(Node.prototype.getRootNode);
    var isSupported$1 = constant$1(supported);
    var getRootNode = supported ? function (e) {
      return SugarElement.fromDom(e.dom.getRootNode());
    } : documentOrOwner;
    var getContentContainer = function (dos) {
      return isShadowRoot(dos) ? dos : SugarElement.fromDom(documentOrOwner(dos).dom.body);
    };
    var isInShadowRoot = function (e) {
      return getShadowRoot(e).isSome();
    };
    var getShadowRoot = function (e) {
      var r = getRootNode(e);
      return isShadowRoot(r) ? Optional.some(r) : Optional.none();
    };
    var getShadowHost = function (e) {
      return SugarElement.fromDom(e.dom.host);
    };
    var getOriginalEventTarget = function (event) {
      if (isSupported$1() && isNonNullable(event.target)) {
        var el = SugarElement.fromDom(event.target);
        if (isElement$2(el) && isOpenShadowHost(el)) {
          if (event.composed && event.composedPath) {
            var composedPath = event.composedPath();
            if (composedPath) {
              return head(composedPath);
            }
          }
        }
      }
      return Optional.from(event.target);
    };
    var isOpenShadowHost = function (element) {
      return isNonNullable(element.dom.shadowRoot);
    };

    var before$2 = function (marker, element) {
      var parent$1 = parent(marker);
      parent$1.each(function (v) {
        v.dom.insertBefore(element.dom, marker.dom);
      });
    };
    var after$2 = function (marker, element) {
      var sibling = nextSibling(marker);
      sibling.fold(function () {
        var parent$1 = parent(marker);
        parent$1.each(function (v) {
          append$2(v, element);
        });
      }, function (v) {
        before$2(v, element);
      });
    };
    var prepend$1 = function (parent, element) {
      var firstChild$1 = firstChild(parent);
      firstChild$1.fold(function () {
        append$2(parent, element);
      }, function (v) {
        parent.dom.insertBefore(element.dom, v.dom);
      });
    };
    var append$2 = function (parent, element) {
      parent.dom.appendChild(element.dom);
    };
    var appendAt = function (parent, element, index) {
      child$2(parent, index).fold(function () {
        append$2(parent, element);
      }, function (v) {
        before$2(v, element);
      });
    };

    var before$1 = function (marker, elements) {
      each$1(elements, function (x) {
        before$2(marker, x);
      });
    };
    var append$1 = function (parent, elements) {
      each$1(elements, function (x) {
        append$2(parent, x);
      });
    };

    var empty = function (element) {
      element.dom.textContent = '';
      each$1(children(element), function (rogue) {
        remove$7(rogue);
      });
    };
    var remove$7 = function (element) {
      var dom = element.dom;
      if (dom.parentNode !== null) {
        dom.parentNode.removeChild(dom);
      }
    };
    var unwrap = function (wrapper) {
      var children$1 = children(wrapper);
      if (children$1.length > 0) {
        before$1(wrapper, children$1);
      }
      remove$7(wrapper);
    };

    var fromHtml$1 = function (html, scope) {
      var doc = scope || document;
      var div = doc.createElement('div');
      div.innerHTML = html;
      return children(SugarElement.fromDom(div));
    };

    var get$d = function (element) {
      return element.dom.innerHTML;
    };
    var set$8 = function (element, content) {
      var owner = owner$4(element);
      var docDom = owner.dom;
      var fragment = SugarElement.fromDom(docDom.createDocumentFragment());
      var contentElements = fromHtml$1(content, docDom);
      append$1(fragment, contentElements);
      empty(element);
      append$2(element, fragment);
    };
    var getOuter$2 = function (element) {
      var container = SugarElement.fromTag('div');
      var clone = SugarElement.fromDom(element.dom.cloneNode(true));
      append$2(container, clone);
      return get$d(container);
    };

    var rawSet = function (dom, key, value) {
      if (isString(value) || isBoolean(value) || isNumber(value)) {
        dom.setAttribute(key, value + '');
      } else {
        console.error('Invalid call to Attribute.set. Key ', key, ':: Value ', value, ':: Element ', dom);
        throw new Error('Attribute value was not simple');
      }
    };
    var set$7 = function (element, key, value) {
      rawSet(element.dom, key, value);
    };
    var setAll$1 = function (element, attrs) {
      var dom = element.dom;
      each(attrs, function (v, k) {
        rawSet(dom, k, v);
      });
    };
    var get$c = function (element, key) {
      var v = element.dom.getAttribute(key);
      return v === null ? undefined : v;
    };
    var getOpt = function (element, key) {
      return Optional.from(get$c(element, key));
    };
    var has$1 = function (element, key) {
      var dom = element.dom;
      return dom && dom.hasAttribute ? dom.hasAttribute(key) : false;
    };
    var remove$6 = function (element, key) {
      element.dom.removeAttribute(key);
    };

    var clone$1 = function (original, isDeep) {
      return SugarElement.fromDom(original.dom.cloneNode(isDeep));
    };
    var shallow = function (original) {
      return clone$1(original, false);
    };

    var getHtml = function (element) {
      if (isShadowRoot(element)) {
        return '#shadow-root';
      } else {
        var clone = shallow(element);
        return getOuter$2(clone);
      }
    };

    var element = function (elem) {
      return getHtml(elem);
    };

    var isRecursive = function (component, originator, target) {
      return eq(originator, component.element) && !eq(originator, target);
    };
    var events$i = derive$2([can(focus$4(), function (component, simulatedEvent) {
        var event = simulatedEvent.event;
        var originator = event.originator;
        var target = event.target;
        if (isRecursive(component, originator, target)) {
          console.warn(focus$4() + ' did not get interpreted by the desired target. ' + '\nOriginator: ' + element(originator) + '\nTarget: ' + element(target) + '\nCheck the ' + focus$4() + ' event handlers');
          return false;
        } else {
          return true;
        }
      })]);

    var DefaultEvents = /*#__PURE__*/Object.freeze({
        __proto__: null,
        events: events$i
    });

    var unique = 0;
    var generate$6 = function (prefix) {
      var date = new Date();
      var time = date.getTime();
      var random = Math.floor(Math.random() * 1000000000);
      unique++;
      return prefix + '_' + random + unique + String(time);
    };

    var prefix$1 = constant$1('alloy-id-');
    var idAttr$1 = constant$1('data-alloy-id');

    var prefix = prefix$1();
    var idAttr = idAttr$1();
    var write = function (label, elem) {
      var id = generate$6(prefix + label);
      writeOnly(elem, id);
      return id;
    };
    var writeOnly = function (elem, uid) {
      Object.defineProperty(elem.dom, idAttr, {
        value: uid,
        writable: true
      });
    };
    var read$1 = function (elem) {
      var id = isElement$2(elem) ? elem.dom[idAttr] : null;
      return Optional.from(id);
    };
    var generate$5 = function (prefix) {
      return generate$6(prefix);
    };

    var make$8 = identity$1;

    var NoContextApi = function (getComp) {
      var getMessage = function (event) {
        return 'The component must be in a context to execute: ' + event + (getComp ? '\n' + element(getComp().element) + ' is not in context.' : '');
      };
      var fail = function (event) {
        return function () {
          throw new Error(getMessage(event));
        };
      };
      var warn = function (event) {
        return function () {
          console.warn(getMessage(event));
        };
      };
      return {
        debugInfo: constant$1('fake'),
        triggerEvent: warn('triggerEvent'),
        triggerFocus: warn('triggerFocus'),
        triggerEscape: warn('triggerEscape'),
        broadcast: warn('broadcast'),
        broadcastOn: warn('broadcastOn'),
        broadcastEvent: warn('broadcastEvent'),
        build: fail('build'),
        addToWorld: fail('addToWorld'),
        removeFromWorld: fail('removeFromWorld'),
        addToGui: fail('addToGui'),
        removeFromGui: fail('removeFromGui'),
        getByUid: fail('getByUid'),
        getByDom: fail('getByDom'),
        isConnected: never
      };
    };
    var singleton$1 = NoContextApi();

    var markAsBehaviourApi = function (f, apiName, apiFunction) {
      var delegate = apiFunction.toString();
      var endIndex = delegate.indexOf(')') + 1;
      var openBracketIndex = delegate.indexOf('(');
      var parameters = delegate.substring(openBracketIndex + 1, endIndex - 1).split(/,\s*/);
      f.toFunctionAnnotation = function () {
        return {
          name: apiName,
          parameters: cleanParameters(parameters.slice(0, 1).concat(parameters.slice(3)))
        };
      };
      return f;
    };
    var cleanParameters = function (parameters) {
      return map$2(parameters, function (p) {
        return endsWith(p, '/*') ? p.substring(0, p.length - '/*'.length) : p;
      });
    };
    var markAsExtraApi = function (f, extraName) {
      var delegate = f.toString();
      var endIndex = delegate.indexOf(')') + 1;
      var openBracketIndex = delegate.indexOf('(');
      var parameters = delegate.substring(openBracketIndex + 1, endIndex - 1).split(/,\s*/);
      f.toFunctionAnnotation = function () {
        return {
          name: extraName,
          parameters: cleanParameters(parameters)
        };
      };
      return f;
    };
    var markAsSketchApi = function (f, apiFunction) {
      var delegate = apiFunction.toString();
      var endIndex = delegate.indexOf(')') + 1;
      var openBracketIndex = delegate.indexOf('(');
      var parameters = delegate.substring(openBracketIndex + 1, endIndex - 1).split(/,\s*/);
      f.toFunctionAnnotation = function () {
        return {
          name: 'OVERRIDE',
          parameters: cleanParameters(parameters.slice(1))
        };
      };
      return f;
    };

    var premadeTag = generate$6('alloy-premade');
    var premade$1 = function (comp) {
      return wrap$1(premadeTag, comp);
    };
    var getPremade = function (spec) {
      return get$e(spec, premadeTag);
    };
    var makeApi = function (f) {
      return markAsSketchApi(function (component) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          rest[_i - 1] = arguments[_i];
        }
        return f.apply(void 0, __spreadArray([
          component.getApis(),
          component
        ], rest));
      }, f);
    };

    var NoState = {
      init: function () {
        return nu$8({ readState: constant$1('No State required') });
      }
    };
    var nu$8 = function (spec) {
      return spec;
    };

    var generateFrom$1 = function (spec, all) {
      var schema = map$2(all, function (a) {
        return optionObjOf(a.name(), [
          required$1('config'),
          defaulted('state', NoState)
        ]);
      });
      var validated = asRaw('component.behaviours', objOf(schema), spec.behaviours).fold(function (errInfo) {
        throw new Error(formatError(errInfo) + '\nComplete spec:\n' + JSON.stringify(spec, null, 2));
      }, identity$1);
      return {
        list: all,
        data: map(validated, function (optBlobThunk) {
          var output = optBlobThunk.map(function (blob) {
            return {
              config: blob.config,
              state: blob.state.init(blob.config)
            };
          });
          return constant$1(output);
        })
      };
    };
    var getBehaviours$3 = function (bData) {
      return bData.list;
    };
    var getData$2 = function (bData) {
      return bData.data;
    };

    var byInnerKey = function (data, tuple) {
      var r = {};
      each(data, function (detail, key) {
        each(detail, function (value, indexKey) {
          var chain = get$e(r, indexKey).getOr([]);
          r[indexKey] = chain.concat([tuple(key, value)]);
        });
      });
      return r;
    };

    var nu$7 = function (s) {
      return {
        classes: isUndefined(s.classes) ? [] : s.classes,
        attributes: isUndefined(s.attributes) ? {} : s.attributes,
        styles: isUndefined(s.styles) ? {} : s.styles
      };
    };
    var merge = function (defnA, mod) {
      return __assign(__assign({}, defnA), {
        attributes: __assign(__assign({}, defnA.attributes), mod.attributes),
        styles: __assign(__assign({}, defnA.styles), mod.styles),
        classes: defnA.classes.concat(mod.classes)
      });
    };

    var combine$2 = function (info, baseMod, behaviours, base) {
      var modsByBehaviour = __assign({}, baseMod);
      each$1(behaviours, function (behaviour) {
        modsByBehaviour[behaviour.name()] = behaviour.exhibit(info, base);
      });
      var byAspect = byInnerKey(modsByBehaviour, function (name, modification) {
        return {
          name: name,
          modification: modification
        };
      });
      var combineObjects = function (objects) {
        return foldr(objects, function (b, a) {
          return __assign(__assign({}, a.modification), b);
        }, {});
      };
      var combinedClasses = foldr(byAspect.classes, function (b, a) {
        return a.modification.concat(b);
      }, []);
      var combinedAttributes = combineObjects(byAspect.attributes);
      var combinedStyles = combineObjects(byAspect.styles);
      return nu$7({
        classes: combinedClasses,
        attributes: combinedAttributes,
        styles: combinedStyles
      });
    };

    var sortKeys = function (label, keyName, array, order) {
      try {
        var sorted = sort(array, function (a, b) {
          var aKey = a[keyName];
          var bKey = b[keyName];
          var aIndex = order.indexOf(aKey);
          var bIndex = order.indexOf(bKey);
          if (aIndex === -1) {
            throw new Error('The ordering for ' + label + ' does not have an entry for ' + aKey + '.\nOrder specified: ' + JSON.stringify(order, null, 2));
          }
          if (bIndex === -1) {
            throw new Error('The ordering for ' + label + ' does not have an entry for ' + bKey + '.\nOrder specified: ' + JSON.stringify(order, null, 2));
          }
          if (aIndex < bIndex) {
            return -1;
          } else if (bIndex < aIndex) {
            return 1;
          } else {
            return 0;
          }
        });
        return Result.value(sorted);
      } catch (err) {
        return Result.error([err]);
      }
    };

    var uncurried = function (handler, purpose) {
      return {
        handler: handler,
        purpose: purpose
      };
    };
    var curried = function (handler, purpose) {
      return {
        cHandler: handler,
        purpose: purpose
      };
    };
    var curryArgs = function (descHandler, extraArgs) {
      return curried(curry.apply(undefined, [descHandler.handler].concat(extraArgs)), descHandler.purpose);
    };
    var getCurried = function (descHandler) {
      return descHandler.cHandler;
    };

    var behaviourTuple = function (name, handler) {
      return {
        name: name,
        handler: handler
      };
    };
    var nameToHandlers = function (behaviours, info) {
      var r = {};
      each$1(behaviours, function (behaviour) {
        r[behaviour.name()] = behaviour.handlers(info);
      });
      return r;
    };
    var groupByEvents = function (info, behaviours, base) {
      var behaviourEvents = __assign(__assign({}, base), nameToHandlers(behaviours, info));
      return byInnerKey(behaviourEvents, behaviourTuple);
    };
    var combine$1 = function (info, eventOrder, behaviours, base) {
      var byEventName = groupByEvents(info, behaviours, base);
      return combineGroups(byEventName, eventOrder);
    };
    var assemble = function (rawHandler) {
      var handler = read$2(rawHandler);
      return function (component, simulatedEvent) {
        var rest = [];
        for (var _i = 2; _i < arguments.length; _i++) {
          rest[_i - 2] = arguments[_i];
        }
        var args = [
          component,
          simulatedEvent
        ].concat(rest);
        if (handler.abort.apply(undefined, args)) {
          simulatedEvent.stop();
        } else if (handler.can.apply(undefined, args)) {
          handler.run.apply(undefined, args);
        }
      };
    };
    var missingOrderError = function (eventName, tuples) {
      return Result.error(['The event (' + eventName + ') has more than one behaviour that listens to it.\nWhen this occurs, you must ' + 'specify an event ordering for the behaviours in your spec (e.g. [ "listing", "toggling" ]).\nThe behaviours that ' + 'can trigger it are: ' + JSON.stringify(map$2(tuples, function (c) {
          return c.name;
        }), null, 2)]);
    };
    var fuse = function (tuples, eventOrder, eventName) {
      var order = eventOrder[eventName];
      if (!order) {
        return missingOrderError(eventName, tuples);
      } else {
        return sortKeys('Event: ' + eventName, 'name', tuples, order).map(function (sortedTuples) {
          var handlers = map$2(sortedTuples, function (tuple) {
            return tuple.handler;
          });
          return fuse$1(handlers);
        });
      }
    };
    var combineGroups = function (byEventName, eventOrder) {
      var r = mapToArray(byEventName, function (tuples, eventName) {
        var combined = tuples.length === 1 ? Result.value(tuples[0].handler) : fuse(tuples, eventOrder, eventName);
        return combined.map(function (handler) {
          var assembled = assemble(handler);
          var purpose = tuples.length > 1 ? filter$2(eventOrder[eventName], function (o) {
            return exists(tuples, function (t) {
              return t.name === o;
            });
          }).join(' > ') : tuples[0].name;
          return wrap$1(eventName, uncurried(assembled, purpose));
        });
      });
      return consolidate(r, {});
    };

    var _a$2;
    var baseBehaviour = 'alloy.base.behaviour';
    var schema$z = objOf([
      field$1('dom', 'dom', required$2(), objOf([
        required$1('tag'),
        defaulted('styles', {}),
        defaulted('classes', []),
        defaulted('attributes', {}),
        option('value'),
        option('innerHtml')
      ])),
      required$1('components'),
      required$1('uid'),
      defaulted('events', {}),
      defaulted('apis', {}),
      field$1('eventOrder', 'eventOrder', mergeWith((_a$2 = {}, _a$2[execute$5()] = [
        'disabling',
        baseBehaviour,
        'toggling',
        'typeaheadevents'
      ], _a$2[focus$4()] = [
        baseBehaviour,
        'focusing',
        'keying'
      ], _a$2[systemInit()] = [
        baseBehaviour,
        'disabling',
        'toggling',
        'representing'
      ], _a$2[input()] = [
        baseBehaviour,
        'representing',
        'streaming',
        'invalidating'
      ], _a$2[detachedFromDom()] = [
        baseBehaviour,
        'representing',
        'item-events',
        'tooltipping'
      ], _a$2[mousedown()] = [
        'focusing',
        baseBehaviour,
        'item-type-events'
      ], _a$2[touchstart()] = [
        'focusing',
        baseBehaviour,
        'item-type-events'
      ], _a$2[mouseover()] = [
        'item-type-events',
        'tooltipping'
      ], _a$2[receive()] = [
        'receiving',
        'reflecting',
        'tooltipping'
      ], _a$2)), anyValue()),
      option('domModification')
    ]);
    var toInfo = function (spec) {
      return asRaw('custom.definition', schema$z, spec);
    };
    var toDefinition = function (detail) {
      return __assign(__assign({}, detail.dom), {
        uid: detail.uid,
        domChildren: map$2(detail.components, function (comp) {
          return comp.element;
        })
      });
    };
    var toModification = function (detail) {
      return detail.domModification.fold(function () {
        return nu$7({});
      }, nu$7);
    };
    var toEvents = function (info) {
      return info.events;
    };

    var read = function (element, attr) {
      var value = get$c(element, attr);
      return value === undefined || value === '' ? [] : value.split(' ');
    };
    var add$4 = function (element, attr, id) {
      var old = read(element, attr);
      var nu = old.concat([id]);
      set$7(element, attr, nu.join(' '));
      return true;
    };
    var remove$5 = function (element, attr, id) {
      var nu = filter$2(read(element, attr), function (v) {
        return v !== id;
      });
      if (nu.length > 0) {
        set$7(element, attr, nu.join(' '));
      } else {
        remove$6(element, attr);
      }
      return false;
    };

    var supports = function (element) {
      return element.dom.classList !== undefined;
    };
    var get$b = function (element) {
      return read(element, 'class');
    };
    var add$3 = function (element, clazz) {
      return add$4(element, 'class', clazz);
    };
    var remove$4 = function (element, clazz) {
      return remove$5(element, 'class', clazz);
    };

    var add$2 = function (element, clazz) {
      if (supports(element)) {
        element.dom.classList.add(clazz);
      } else {
        add$3(element, clazz);
      }
    };
    var cleanClass = function (element) {
      var classList = supports(element) ? element.dom.classList : get$b(element);
      if (classList.length === 0) {
        remove$6(element, 'class');
      }
    };
    var remove$3 = function (element, clazz) {
      if (supports(element)) {
        var classList = element.dom.classList;
        classList.remove(clazz);
      } else {
        remove$4(element, clazz);
      }
      cleanClass(element);
    };
    var has = function (element, clazz) {
      return supports(element) && element.dom.classList.contains(clazz);
    };

    var add$1 = function (element, classes) {
      each$1(classes, function (x) {
        add$2(element, x);
      });
    };
    var remove$2 = function (element, classes) {
      each$1(classes, function (x) {
        remove$3(element, x);
      });
    };
    var hasAll = function (element, classes) {
      return forall(classes, function (clazz) {
        return has(element, clazz);
      });
    };

    var is = function (lhs, rhs, comparator) {
      if (comparator === void 0) {
        comparator = tripleEquals;
      }
      return lhs.exists(function (left) {
        return comparator(left, rhs);
      });
    };
    var equals = function (lhs, rhs, comparator) {
      if (comparator === void 0) {
        comparator = tripleEquals;
      }
      return lift2(lhs, rhs, comparator).getOr(lhs.isNone() && rhs.isNone());
    };
    var cat = function (arr) {
      var r = [];
      var push = function (x) {
        r.push(x);
      };
      for (var i = 0; i < arr.length; i++) {
        arr[i].each(push);
      }
      return r;
    };
    var sequence = function (arr) {
      var r = [];
      for (var i = 0; i < arr.length; i++) {
        var x = arr[i];
        if (x.isSome()) {
          r.push(x.getOrDie());
        } else {
          return Optional.none();
        }
      }
      return Optional.some(r);
    };
    var lift2 = function (oa, ob, f) {
      return oa.isSome() && ob.isSome() ? Optional.some(f(oa.getOrDie(), ob.getOrDie())) : Optional.none();
    };
    var lift3 = function (oa, ob, oc, f) {
      return oa.isSome() && ob.isSome() && oc.isSome() ? Optional.some(f(oa.getOrDie(), ob.getOrDie(), oc.getOrDie())) : Optional.none();
    };
    var mapFrom = function (a, f) {
      return a !== undefined && a !== null ? Optional.some(f(a)) : Optional.none();
    };
    var someIf = function (b, a) {
      return b ? Optional.some(a) : Optional.none();
    };

    var isSupported = function (dom) {
      return dom.style !== undefined && isFunction(dom.style.getPropertyValue);
    };

    var inBody = function (element) {
      var dom = isText$1(element) ? element.dom.parentNode : element.dom;
      if (dom === undefined || dom === null || dom.ownerDocument === null) {
        return false;
      }
      var doc = dom.ownerDocument;
      return getShadowRoot(SugarElement.fromDom(dom)).fold(function () {
        return doc.body.contains(dom);
      }, compose1(inBody, getShadowHost));
    };
    var body = function () {
      return getBody(SugarElement.fromDom(document));
    };
    var getBody = function (doc) {
      var b = doc.dom.body;
      if (b === null || b === undefined) {
        throw new Error('Body is not available yet');
      }
      return SugarElement.fromDom(b);
    };

    var internalSet = function (dom, property, value) {
      if (!isString(value)) {
        console.error('Invalid call to CSS.set. Property ', property, ':: Value ', value, ':: Element ', dom);
        throw new Error('CSS value must be a string: ' + value);
      }
      if (isSupported(dom)) {
        dom.style.setProperty(property, value);
      }
    };
    var internalRemove = function (dom, property) {
      if (isSupported(dom)) {
        dom.style.removeProperty(property);
      }
    };
    var set$6 = function (element, property, value) {
      var dom = element.dom;
      internalSet(dom, property, value);
    };
    var setAll = function (element, css) {
      var dom = element.dom;
      each(css, function (v, k) {
        internalSet(dom, k, v);
      });
    };
    var setOptions = function (element, css) {
      var dom = element.dom;
      each(css, function (v, k) {
        v.fold(function () {
          internalRemove(dom, k);
        }, function (value) {
          internalSet(dom, k, value);
        });
      });
    };
    var get$a = function (element, property) {
      var dom = element.dom;
      var styles = window.getComputedStyle(dom);
      var r = styles.getPropertyValue(property);
      return r === '' && !inBody(element) ? getUnsafeProperty(dom, property) : r;
    };
    var getUnsafeProperty = function (dom, property) {
      return isSupported(dom) ? dom.style.getPropertyValue(property) : '';
    };
    var getRaw = function (element, property) {
      var dom = element.dom;
      var raw = getUnsafeProperty(dom, property);
      return Optional.from(raw).filter(function (r) {
        return r.length > 0;
      });
    };
    var getAllRaw = function (element) {
      var css = {};
      var dom = element.dom;
      if (isSupported(dom)) {
        for (var i = 0; i < dom.style.length; i++) {
          var ruleName = dom.style.item(i);
          css[ruleName] = dom.style[ruleName];
        }
      }
      return css;
    };
    var isValidValue = function (tag, property, value) {
      var element = SugarElement.fromTag(tag);
      set$6(element, property, value);
      var style = getRaw(element, property);
      return style.isSome();
    };
    var remove$1 = function (element, property) {
      var dom = element.dom;
      internalRemove(dom, property);
      if (is(getOpt(element, 'style').map(trim$1), '')) {
        remove$6(element, 'style');
      }
    };
    var reflow = function (e) {
      return e.dom.offsetWidth;
    };

    var get$9 = function (element) {
      return element.dom.value;
    };
    var set$5 = function (element, value) {
      if (value === undefined) {
        throw new Error('Value.set was undefined');
      }
      element.dom.value = value;
    };

    var renderToDom = function (definition) {
      var subject = SugarElement.fromTag(definition.tag);
      setAll$1(subject, definition.attributes);
      add$1(subject, definition.classes);
      setAll(subject, definition.styles);
      definition.innerHtml.each(function (html) {
        return set$8(subject, html);
      });
      var children = definition.domChildren;
      append$1(subject, children);
      definition.value.each(function (value) {
        set$5(subject, value);
      });
      if (!definition.uid) {
        debugger;
      }
      writeOnly(subject, definition.uid);
      return subject;
    };

    var getBehaviours$2 = function (spec) {
      var behaviours = get$e(spec, 'behaviours').getOr({});
      var keys$1 = filter$2(keys(behaviours), function (k) {
        return behaviours[k] !== undefined;
      });
      return map$2(keys$1, function (k) {
        return behaviours[k].me;
      });
    };
    var generateFrom = function (spec, all) {
      return generateFrom$1(spec, all);
    };
    var generate$4 = function (spec) {
      var all = getBehaviours$2(spec);
      return generateFrom(spec, all);
    };

    var getDomDefinition = function (info, bList, bData) {
      var definition = toDefinition(info);
      var infoModification = toModification(info);
      var baseModification = { 'alloy.base.modification': infoModification };
      var modification = bList.length > 0 ? combine$2(bData, baseModification, bList, definition) : infoModification;
      return merge(definition, modification);
    };
    var getEvents = function (info, bList, bData) {
      var baseEvents = { 'alloy.base.behaviour': toEvents(info) };
      return combine$1(bData, info.eventOrder, bList, baseEvents).getOrDie();
    };
    var build$2 = function (spec) {
      var getMe = function () {
        return me;
      };
      var systemApi = Cell(singleton$1);
      var info = getOrDie(toInfo(spec));
      var bBlob = generate$4(spec);
      var bList = getBehaviours$3(bBlob);
      var bData = getData$2(bBlob);
      var modDefinition = getDomDefinition(info, bList, bData);
      var item = renderToDom(modDefinition);
      var events = getEvents(info, bList, bData);
      var subcomponents = Cell(info.components);
      var connect = function (newApi) {
        systemApi.set(newApi);
      };
      var disconnect = function () {
        systemApi.set(NoContextApi(getMe));
      };
      var syncComponents = function () {
        var children$1 = children(item);
        var subs = bind$3(children$1, function (child) {
          return systemApi.get().getByDom(child).fold(function () {
            return [];
          }, pure$2);
        });
        subcomponents.set(subs);
      };
      var config = function (behaviour) {
        var b = bData;
        var f = isFunction(b[behaviour.name()]) ? b[behaviour.name()] : function () {
          throw new Error('Could not find ' + behaviour.name() + ' in ' + JSON.stringify(spec, null, 2));
        };
        return f();
      };
      var hasConfigured = function (behaviour) {
        return isFunction(bData[behaviour.name()]);
      };
      var getApis = function () {
        return info.apis;
      };
      var readState = function (behaviourName) {
        return bData[behaviourName]().map(function (b) {
          return b.state.readState();
        }).getOr('not enabled');
      };
      var me = {
        uid: spec.uid,
        getSystem: systemApi.get,
        config: config,
        hasConfigured: hasConfigured,
        spec: spec,
        readState: readState,
        getApis: getApis,
        connect: connect,
        disconnect: disconnect,
        element: item,
        syncComponents: syncComponents,
        components: subcomponents.get,
        events: events
      };
      return me;
    };

    var buildSubcomponents = function (spec) {
      var components = get$e(spec, 'components').getOr([]);
      return map$2(components, build$1);
    };
    var buildFromSpec = function (userSpec) {
      var _a = make$8(userSpec), specEvents = _a.events, spec = __rest(_a, ['events']);
      var components = buildSubcomponents(spec);
      var completeSpec = __assign(__assign({}, spec), {
        events: __assign(__assign({}, DefaultEvents), specEvents),
        components: components
      });
      return Result.value(build$2(completeSpec));
    };
    var text = function (textContent) {
      var element = SugarElement.fromText(textContent);
      return external$2({ element: element });
    };
    var external$2 = function (spec) {
      var extSpec = asRawOrDie$1('external.component', objOfOnly([
        required$1('element'),
        option('uid')
      ]), spec);
      var systemApi = Cell(NoContextApi());
      var connect = function (newApi) {
        systemApi.set(newApi);
      };
      var disconnect = function () {
        systemApi.set(NoContextApi(function () {
          return me;
        }));
      };
      var uid = extSpec.uid.getOrThunk(function () {
        return generate$5('external');
      });
      writeOnly(extSpec.element, uid);
      var me = {
        uid: uid,
        getSystem: systemApi.get,
        config: Optional.none,
        hasConfigured: never,
        connect: connect,
        disconnect: disconnect,
        getApis: function () {
          return {};
        },
        element: extSpec.element,
        spec: spec,
        readState: constant$1('No state'),
        syncComponents: noop,
        components: constant$1([]),
        events: {}
      };
      return premade$1(me);
    };
    var uids = generate$5;
    var isSketchSpec$1 = function (spec) {
      return has$2(spec, 'uid');
    };
    var build$1 = function (spec) {
      return getPremade(spec).getOrThunk(function () {
        var userSpecWithUid = isSketchSpec$1(spec) ? spec : __assign({ uid: uids('') }, spec);
        return buildFromSpec(userSpecWithUid).getOrDie();
      });
    };
    var premade = premade$1;

    var Dimension = function (name, getOffset) {
      var set = function (element, h) {
        if (!isNumber(h) && !h.match(/^[0-9]+$/)) {
          throw new Error(name + '.set accepts only positive integer values. Value was ' + h);
        }
        var dom = element.dom;
        if (isSupported(dom)) {
          dom.style[name] = h + 'px';
        }
      };
      var get = function (element) {
        var r = getOffset(element);
        if (r <= 0 || r === null) {
          var css = get$a(element, name);
          return parseFloat(css) || 0;
        }
        return r;
      };
      var getOuter = get;
      var aggregate = function (element, properties) {
        return foldl(properties, function (acc, property) {
          var val = get$a(element, property);
          var value = val === undefined ? 0 : parseInt(val, 10);
          return isNaN(value) ? acc : acc + value;
        }, 0);
      };
      var max = function (element, value, properties) {
        var cumulativeInclusions = aggregate(element, properties);
        var absoluteMax = value > cumulativeInclusions ? value - cumulativeInclusions : 0;
        return absoluteMax;
      };
      return {
        set: set,
        get: get,
        getOuter: getOuter,
        aggregate: aggregate,
        max: max
      };
    };

    var api$2 = Dimension('height', function (element) {
      var dom = element.dom;
      return inBody(element) ? dom.getBoundingClientRect().height : dom.offsetHeight;
    });
    var get$8 = function (element) {
      return api$2.get(element);
    };
    var getOuter$1 = function (element) {
      return api$2.getOuter(element);
    };
    var setMax$1 = function (element, value) {
      var inclusions = [
        'margin-top',
        'border-top-width',
        'padding-top',
        'padding-bottom',
        'border-bottom-width',
        'margin-bottom'
      ];
      var absMax = api$2.max(element, value, inclusions);
      set$6(element, 'max-height', absMax + 'px');
    };

    var r$1 = function (left, top) {
      var translate = function (x, y) {
        return r$1(left + x, top + y);
      };
      return {
        left: left,
        top: top,
        translate: translate
      };
    };
    var SugarPosition = r$1;

    var boxPosition = function (dom) {
      var box = dom.getBoundingClientRect();
      return SugarPosition(box.left, box.top);
    };
    var firstDefinedOrZero = function (a, b) {
      if (a !== undefined) {
        return a;
      } else {
        return b !== undefined ? b : 0;
      }
    };
    var absolute$3 = function (element) {
      var doc = element.dom.ownerDocument;
      var body = doc.body;
      var win = doc.defaultView;
      var html = doc.documentElement;
      if (body === element.dom) {
        return SugarPosition(body.offsetLeft, body.offsetTop);
      }
      var scrollTop = firstDefinedOrZero(win === null || win === void 0 ? void 0 : win.pageYOffset, html.scrollTop);
      var scrollLeft = firstDefinedOrZero(win === null || win === void 0 ? void 0 : win.pageXOffset, html.scrollLeft);
      var clientTop = firstDefinedOrZero(html.clientTop, body.clientTop);
      var clientLeft = firstDefinedOrZero(html.clientLeft, body.clientLeft);
      return viewport$1(element).translate(scrollLeft - clientLeft, scrollTop - clientTop);
    };
    var viewport$1 = function (element) {
      var dom = element.dom;
      var doc = dom.ownerDocument;
      var body = doc.body;
      if (body === dom) {
        return SugarPosition(body.offsetLeft, body.offsetTop);
      }
      if (!inBody(element)) {
        return SugarPosition(0, 0);
      }
      return boxPosition(dom);
    };

    var api$1 = Dimension('width', function (element) {
      return element.dom.offsetWidth;
    });
    var set$4 = function (element, h) {
      return api$1.set(element, h);
    };
    var get$7 = function (element) {
      return api$1.get(element);
    };
    var getOuter = function (element) {
      return api$1.getOuter(element);
    };
    var setMax = function (element, value) {
      var inclusions = [
        'margin-left',
        'border-left-width',
        'padding-left',
        'padding-right',
        'border-right-width',
        'margin-right'
      ];
      var absMax = api$1.max(element, value, inclusions);
      set$6(element, 'max-width', absMax + 'px');
    };

    var mkEvent = function (target, x, y, stop, prevent, kill, raw) {
      return {
        target: target,
        x: x,
        y: y,
        stop: stop,
        prevent: prevent,
        kill: kill,
        raw: raw
      };
    };
    var fromRawEvent$1 = function (rawEvent) {
      var target = SugarElement.fromDom(getOriginalEventTarget(rawEvent).getOr(rawEvent.target));
      var stop = function () {
        return rawEvent.stopPropagation();
      };
      var prevent = function () {
        return rawEvent.preventDefault();
      };
      var kill = compose(prevent, stop);
      return mkEvent(target, rawEvent.clientX, rawEvent.clientY, stop, prevent, kill, rawEvent);
    };
    var handle = function (filter, handler) {
      return function (rawEvent) {
        if (filter(rawEvent)) {
          handler(fromRawEvent$1(rawEvent));
        }
      };
    };
    var binder = function (element, event, filter, handler, useCapture) {
      var wrapped = handle(filter, handler);
      element.dom.addEventListener(event, wrapped, useCapture);
      return { unbind: curry(unbind, element, event, wrapped, useCapture) };
    };
    var bind$1 = function (element, event, filter, handler) {
      return binder(element, event, filter, handler, false);
    };
    var capture$1 = function (element, event, filter, handler) {
      return binder(element, event, filter, handler, true);
    };
    var unbind = function (element, event, handler, useCapture) {
      element.dom.removeEventListener(event, handler, useCapture);
    };

    var get$6 = function (_DOC) {
      var doc = _DOC !== undefined ? _DOC.dom : document;
      var x = doc.body.scrollLeft || doc.documentElement.scrollLeft;
      var y = doc.body.scrollTop || doc.documentElement.scrollTop;
      return SugarPosition(x, y);
    };
    var to = function (x, y, _DOC) {
      var doc = _DOC !== undefined ? _DOC.dom : document;
      var win = doc.defaultView;
      if (win) {
        win.scrollTo(x, y);
      }
    };

    var get$5 = function (_win) {
      var win = _win === undefined ? window : _win;
      return Optional.from(win['visualViewport']);
    };
    var bounds$1 = function (x, y, width, height) {
      return {
        x: x,
        y: y,
        width: width,
        height: height,
        right: x + width,
        bottom: y + height
      };
    };
    var getBounds$3 = function (_win) {
      var win = _win === undefined ? window : _win;
      var doc = win.document;
      var scroll = get$6(SugarElement.fromDom(doc));
      return get$5(win).fold(function () {
        var html = win.document.documentElement;
        var width = html.clientWidth;
        var height = html.clientHeight;
        return bounds$1(scroll.left, scroll.top, width, height);
      }, function (visualViewport) {
        return bounds$1(Math.max(visualViewport.pageLeft, scroll.left), Math.max(visualViewport.pageTop, scroll.top), visualViewport.width, visualViewport.height);
      });
    };

    var walkUp = function (navigation, doc) {
      var frame = navigation.view(doc);
      return frame.fold(constant$1([]), function (f) {
        var parent = navigation.owner(f);
        var rest = walkUp(navigation, parent);
        return [f].concat(rest);
      });
    };
    var pathTo = function (element, navigation) {
      var d = navigation.owner(element);
      var paths = walkUp(navigation, d);
      return Optional.some(paths);
    };

    var view = function (doc) {
      var _a;
      var element = doc.dom === document ? Optional.none() : Optional.from((_a = doc.dom.defaultView) === null || _a === void 0 ? void 0 : _a.frameElement);
      return element.map(SugarElement.fromDom);
    };
    var owner$3 = function (element) {
      return owner$4(element);
    };

    var Navigation = /*#__PURE__*/Object.freeze({
        __proto__: null,
        view: view,
        owner: owner$3
    });

    var find$2 = function (element) {
      var doc = SugarElement.fromDom(document);
      var scroll = get$6(doc);
      var path = pathTo(element, Navigation);
      return path.fold(curry(absolute$3, element), function (frames) {
        var offset = viewport$1(element);
        var r = foldr(frames, function (b, a) {
          var loc = viewport$1(a);
          return {
            left: b.left + loc.left,
            top: b.top + loc.top
          };
        }, {
          left: 0,
          top: 0
        });
        return SugarPosition(r.left + offset.left + scroll.left, r.top + offset.top + scroll.top);
      });
    };

    var pointed = function (point, width, height) {
      return {
        point: point,
        width: width,
        height: height
      };
    };
    var rect = function (x, y, width, height) {
      return {
        x: x,
        y: y,
        width: width,
        height: height
      };
    };
    var bounds = function (x, y, width, height) {
      return {
        x: x,
        y: y,
        width: width,
        height: height,
        right: x + width,
        bottom: y + height
      };
    };
    var box$1 = function (element) {
      var xy = absolute$3(element);
      var w = getOuter(element);
      var h = getOuter$1(element);
      return bounds(xy.left, xy.top, w, h);
    };
    var absolute$2 = function (element) {
      var position = find$2(element);
      var width = getOuter(element);
      var height = getOuter$1(element);
      return bounds(position.left, position.top, width, height);
    };
    var win = function () {
      return getBounds$3(window);
    };

    function ClosestOrAncestor (is, ancestor, scope, a, isRoot) {
      if (is(scope, a)) {
        return Optional.some(scope);
      } else if (isFunction(isRoot) && isRoot(scope)) {
        return Optional.none();
      } else {
        return ancestor(scope, a, isRoot);
      }
    }

    var ancestor$1 = function (scope, predicate, isRoot) {
      var element = scope.dom;
      var stop = isFunction(isRoot) ? isRoot : never;
      while (element.parentNode) {
        element = element.parentNode;
        var el = SugarElement.fromDom(element);
        if (predicate(el)) {
          return Optional.some(el);
        } else if (stop(el)) {
          break;
        }
      }
      return Optional.none();
    };
    var closest$3 = function (scope, predicate, isRoot) {
      var is = function (s, test) {
        return test(s);
      };
      return ClosestOrAncestor(is, ancestor$1, scope, predicate, isRoot);
    };
    var child$1 = function (scope, predicate) {
      var pred = function (node) {
        return predicate(SugarElement.fromDom(node));
      };
      var result = find$5(scope.dom.childNodes, pred);
      return result.map(SugarElement.fromDom);
    };
    var descendant$1 = function (scope, predicate) {
      var descend = function (node) {
        for (var i = 0; i < node.childNodes.length; i++) {
          var child_1 = SugarElement.fromDom(node.childNodes[i]);
          if (predicate(child_1)) {
            return Optional.some(child_1);
          }
          var res = descend(node.childNodes[i]);
          if (res.isSome()) {
            return res;
          }
        }
        return Optional.none();
      };
      return descend(scope.dom);
    };

    var closest$2 = function (scope, predicate, isRoot) {
      return closest$3(scope, predicate, isRoot).isSome();
    };

    var ancestor = function (scope, selector, isRoot) {
      return ancestor$1(scope, function (e) {
        return is$1(e, selector);
      }, isRoot);
    };
    var child = function (scope, selector) {
      return child$1(scope, function (e) {
        return is$1(e, selector);
      });
    };
    var descendant = function (scope, selector) {
      return one(selector, scope);
    };
    var closest$1 = function (scope, selector, isRoot) {
      var is = function (element, selector) {
        return is$1(element, selector);
      };
      return ClosestOrAncestor(is, ancestor, scope, selector, isRoot);
    };

    var find$1 = function (queryElem) {
      var dependent = closest$3(queryElem, function (elem) {
        if (!isElement$2(elem)) {
          return false;
        }
        var id = get$c(elem, 'id');
        return id !== undefined && id.indexOf('aria-owns') > -1;
      });
      return dependent.bind(function (dep) {
        var id = get$c(dep, 'id');
        var dos = getRootNode(dep);
        return descendant(dos, '[aria-owns="' + id + '"]');
      });
    };
    var manager = function () {
      var ariaId = generate$6('aria-owns');
      var link = function (elem) {
        set$7(elem, 'aria-owns', ariaId);
      };
      var unlink = function (elem) {
        remove$6(elem, 'aria-owns');
      };
      return {
        id: ariaId,
        link: link,
        unlink: unlink
      };
    };

    var isAriaPartOf = function (component, queryElem) {
      return find$1(queryElem).exists(function (owner) {
        return isPartOf$1(component, owner);
      });
    };
    var isPartOf$1 = function (component, queryElem) {
      return closest$2(queryElem, function (el) {
        return eq(el, component.element);
      }, never) || isAriaPartOf(component, queryElem);
    };

    var unknown = 'unknown';
    var EventConfiguration;
    (function (EventConfiguration) {
      EventConfiguration[EventConfiguration['STOP'] = 0] = 'STOP';
      EventConfiguration[EventConfiguration['NORMAL'] = 1] = 'NORMAL';
      EventConfiguration[EventConfiguration['LOGGING'] = 2] = 'LOGGING';
    }(EventConfiguration || (EventConfiguration = {})));
    var eventConfig = Cell({});
    var makeEventLogger = function (eventName, initialTarget) {
      var sequence = [];
      var startTime = new Date().getTime();
      return {
        logEventCut: function (_name, target, purpose) {
          sequence.push({
            outcome: 'cut',
            target: target,
            purpose: purpose
          });
        },
        logEventStopped: function (_name, target, purpose) {
          sequence.push({
            outcome: 'stopped',
            target: target,
            purpose: purpose
          });
        },
        logNoParent: function (_name, target, purpose) {
          sequence.push({
            outcome: 'no-parent',
            target: target,
            purpose: purpose
          });
        },
        logEventNoHandlers: function (_name, target) {
          sequence.push({
            outcome: 'no-handlers-left',
            target: target
          });
        },
        logEventResponse: function (_name, target, purpose) {
          sequence.push({
            outcome: 'response',
            purpose: purpose,
            target: target
          });
        },
        write: function () {
          var finishTime = new Date().getTime();
          if (contains$2([
              'mousemove',
              'mouseover',
              'mouseout',
              systemInit()
            ], eventName)) {
            return;
          }
          console.log(eventName, {
            event: eventName,
            time: finishTime - startTime,
            target: initialTarget.dom,
            sequence: map$2(sequence, function (s) {
              if (!contains$2([
                  'cut',
                  'stopped',
                  'response'
                ], s.outcome)) {
                return s.outcome;
              } else {
                return '{' + s.purpose + '} ' + s.outcome + ' at (' + element(s.target) + ')';
              }
            })
          });
        }
      };
    };
    var processEvent = function (eventName, initialTarget, f) {
      var status = get$e(eventConfig.get(), eventName).orThunk(function () {
        var patterns = keys(eventConfig.get());
        return findMap(patterns, function (p) {
          return eventName.indexOf(p) > -1 ? Optional.some(eventConfig.get()[p]) : Optional.none();
        });
      }).getOr(EventConfiguration.NORMAL);
      switch (status) {
      case EventConfiguration.NORMAL:
        return f(noLogger());
      case EventConfiguration.LOGGING: {
          var logger = makeEventLogger(eventName, initialTarget);
          var output = f(logger);
          logger.write();
          return output;
        }
      case EventConfiguration.STOP:
        return true;
      }
    };
    var path = [
      'alloy/data/Fields',
      'alloy/debugging/Debugging'
    ];
    var getTrace = function () {
      var err = new Error();
      if (err.stack !== undefined) {
        var lines = err.stack.split('\n');
        return find$5(lines, function (line) {
          return line.indexOf('alloy') > 0 && !exists(path, function (p) {
            return line.indexOf(p) > -1;
          });
        }).getOr(unknown);
      } else {
        return unknown;
      }
    };
    var ignoreEvent = {
      logEventCut: noop,
      logEventStopped: noop,
      logNoParent: noop,
      logEventNoHandlers: noop,
      logEventResponse: noop,
      write: noop
    };
    var monitorEvent = function (eventName, initialTarget, f) {
      return processEvent(eventName, initialTarget, f);
    };
    var noLogger = constant$1(ignoreEvent);

    var menuFields = constant$1([
      required$1('menu'),
      required$1('selectedMenu')
    ]);
    var itemFields = constant$1([
      required$1('item'),
      required$1('selectedItem')
    ]);
    constant$1(objOf(itemFields().concat(menuFields())));
    var itemSchema$3 = constant$1(objOf(itemFields()));

    var _initSize = requiredObjOf('initSize', [
      required$1('numColumns'),
      required$1('numRows')
    ]);
    var itemMarkers = function () {
      return requiredOf('markers', itemSchema$3());
    };
    var tieredMenuMarkers = function () {
      return requiredObjOf('markers', [required$1('backgroundMenu')].concat(menuFields()).concat(itemFields()));
    };
    var markers$1 = function (required) {
      return requiredObjOf('markers', map$2(required, required$1));
    };
    var onPresenceHandler = function (label, fieldName, presence) {
      getTrace();
      return field$1(fieldName, fieldName, presence, valueOf(function (f) {
        return Result.value(function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          return f.apply(undefined, args);
        });
      }));
    };
    var onHandler = function (fieldName) {
      return onPresenceHandler('onHandler', fieldName, defaulted$1(noop));
    };
    var onKeyboardHandler = function (fieldName) {
      return onPresenceHandler('onKeyboardHandler', fieldName, defaulted$1(Optional.none));
    };
    var onStrictHandler = function (fieldName) {
      return onPresenceHandler('onHandler', fieldName, required$2());
    };
    var onStrictKeyboardHandler = function (fieldName) {
      return onPresenceHandler('onKeyboardHandler', fieldName, required$2());
    };
    var output$1 = function (name, value) {
      return customField(name, constant$1(value));
    };
    var snapshot = function (name) {
      return customField(name, identity$1);
    };
    var initSize = constant$1(_initSize);

    var nu$6 = function (x, y, bubble, direction, placement, boundsRestriction, labelPrefix, alwaysFit) {
      if (alwaysFit === void 0) {
        alwaysFit = false;
      }
      return {
        x: x,
        y: y,
        bubble: bubble,
        direction: direction,
        placement: placement,
        restriction: boundsRestriction,
        label: labelPrefix + '-' + placement,
        alwaysFit: alwaysFit
      };
    };

    var adt$a = Adt.generate([
      { southeast: [] },
      { southwest: [] },
      { northeast: [] },
      { northwest: [] },
      { south: [] },
      { north: [] },
      { east: [] },
      { west: [] }
    ]);
    var cata$2 = function (subject, southeast, southwest, northeast, northwest, south, north, east, west) {
      return subject.fold(southeast, southwest, northeast, northwest, south, north, east, west);
    };
    var cataVertical = function (subject, south, middle, north) {
      return subject.fold(south, south, north, north, south, north, middle, middle);
    };
    var cataHorizontal = function (subject, east, middle, west) {
      return subject.fold(east, west, east, west, middle, middle, east, west);
    };
    var southeast$3 = adt$a.southeast;
    var southwest$3 = adt$a.southwest;
    var northeast$3 = adt$a.northeast;
    var northwest$3 = adt$a.northwest;
    var south$3 = adt$a.south;
    var north$3 = adt$a.north;
    var east$3 = adt$a.east;
    var west$3 = adt$a.west;

    var cycleBy = function (value, delta, min, max) {
      var r = value + delta;
      if (r > max) {
        return min;
      } else if (r < min) {
        return max;
      } else {
        return r;
      }
    };
    var clamp$1 = function (value, min, max) {
      return Math.min(Math.max(value, min), max);
    };

    var getRestriction = function (anchor, restriction) {
      switch (restriction) {
      case 1:
        return anchor.x;
      case 0:
        return anchor.x + anchor.width;
      case 2:
        return anchor.y;
      case 3:
        return anchor.y + anchor.height;
      }
    };
    var boundsRestriction = function (anchor, restrictions) {
      return mapToObject([
        'left',
        'right',
        'top',
        'bottom'
      ], function (dir) {
        return get$e(restrictions, dir).map(function (restriction) {
          return getRestriction(anchor, restriction);
        });
      });
    };
    var adjustBounds = function (bounds$1, restriction, bubbleOffset) {
      var applyRestriction = function (dir, current) {
        return restriction[dir].map(function (pos) {
          var isVerticalAxis = dir === 'top' || dir === 'bottom';
          var offset = isVerticalAxis ? bubbleOffset.top : bubbleOffset.left;
          var comparator = dir === 'left' || dir === 'top' ? Math.max : Math.min;
          var newPos = comparator(pos, current) + offset;
          return isVerticalAxis ? clamp$1(newPos, bounds$1.y, bounds$1.bottom) : clamp$1(newPos, bounds$1.x, bounds$1.right);
        }).getOr(current);
      };
      var adjustedLeft = applyRestriction('left', bounds$1.x);
      var adjustedTop = applyRestriction('top', bounds$1.y);
      var adjustedRight = applyRestriction('right', bounds$1.right);
      var adjustedBottom = applyRestriction('bottom', bounds$1.bottom);
      return bounds(adjustedLeft, adjustedTop, adjustedRight - adjustedLeft, adjustedBottom - adjustedTop);
    };

    var labelPrefix$2 = 'layout';
    var eastX$1 = function (anchor) {
      return anchor.x;
    };
    var middleX$1 = function (anchor, element) {
      return anchor.x + anchor.width / 2 - element.width / 2;
    };
    var westX$1 = function (anchor, element) {
      return anchor.x + anchor.width - element.width;
    };
    var northY$2 = function (anchor, element) {
      return anchor.y - element.height;
    };
    var southY$2 = function (anchor) {
      return anchor.y + anchor.height;
    };
    var centreY$1 = function (anchor, element) {
      return anchor.y + anchor.height / 2 - element.height / 2;
    };
    var eastEdgeX$1 = function (anchor) {
      return anchor.x + anchor.width;
    };
    var westEdgeX$1 = function (anchor, element) {
      return anchor.x - element.width;
    };
    var southeast$2 = function (anchor, element, bubbles) {
      return nu$6(eastX$1(anchor), southY$2(anchor), bubbles.southeast(), southeast$3(), 'southeast', boundsRestriction(anchor, {
        left: 1,
        top: 3
      }), labelPrefix$2);
    };
    var southwest$2 = function (anchor, element, bubbles) {
      return nu$6(westX$1(anchor, element), southY$2(anchor), bubbles.southwest(), southwest$3(), 'southwest', boundsRestriction(anchor, {
        right: 0,
        top: 3
      }), labelPrefix$2);
    };
    var northeast$2 = function (anchor, element, bubbles) {
      return nu$6(eastX$1(anchor), northY$2(anchor, element), bubbles.northeast(), northeast$3(), 'northeast', boundsRestriction(anchor, {
        left: 1,
        bottom: 2
      }), labelPrefix$2);
    };
    var northwest$2 = function (anchor, element, bubbles) {
      return nu$6(westX$1(anchor, element), northY$2(anchor, element), bubbles.northwest(), northwest$3(), 'northwest', boundsRestriction(anchor, {
        right: 0,
        bottom: 2
      }), labelPrefix$2);
    };
    var north$2 = function (anchor, element, bubbles) {
      return nu$6(middleX$1(anchor, element), northY$2(anchor, element), bubbles.north(), north$3(), 'north', boundsRestriction(anchor, { bottom: 2 }), labelPrefix$2);
    };
    var south$2 = function (anchor, element, bubbles) {
      return nu$6(middleX$1(anchor, element), southY$2(anchor), bubbles.south(), south$3(), 'south', boundsRestriction(anchor, { top: 3 }), labelPrefix$2);
    };
    var east$2 = function (anchor, element, bubbles) {
      return nu$6(eastEdgeX$1(anchor), centreY$1(anchor, element), bubbles.east(), east$3(), 'east', boundsRestriction(anchor, { left: 0 }), labelPrefix$2);
    };
    var west$2 = function (anchor, element, bubbles) {
      return nu$6(westEdgeX$1(anchor, element), centreY$1(anchor, element), bubbles.west(), west$3(), 'west', boundsRestriction(anchor, { right: 1 }), labelPrefix$2);
    };
    var all$1 = function () {
      return [
        southeast$2,
        southwest$2,
        northeast$2,
        northwest$2,
        south$2,
        north$2,
        east$2,
        west$2
      ];
    };
    var allRtl$1 = function () {
      return [
        southwest$2,
        southeast$2,
        northwest$2,
        northeast$2,
        south$2,
        north$2,
        east$2,
        west$2
      ];
    };
    var aboveOrBelow = function () {
      return [
        northeast$2,
        northwest$2,
        southeast$2,
        southwest$2,
        north$2,
        south$2
      ];
    };
    var aboveOrBelowRtl = function () {
      return [
        northwest$2,
        northeast$2,
        southwest$2,
        southeast$2,
        north$2,
        south$2
      ];
    };
    var belowOrAbove = function () {
      return [
        southeast$2,
        southwest$2,
        northeast$2,
        northwest$2,
        south$2,
        north$2
      ];
    };
    var belowOrAboveRtl = function () {
      return [
        southwest$2,
        southeast$2,
        northwest$2,
        northeast$2,
        south$2,
        north$2
      ];
    };

    var chooseChannels = function (channels, message) {
      return message.universal ? channels : filter$2(channels, function (ch) {
        return contains$2(message.channels, ch);
      });
    };
    var events$h = function (receiveConfig) {
      return derive$2([run$1(receive(), function (component, message) {
          var channelMap = receiveConfig.channels;
          var channels = keys(channelMap);
          var receivingData = message;
          var targetChannels = chooseChannels(channels, receivingData);
          each$1(targetChannels, function (ch) {
            var channelInfo = channelMap[ch];
            var channelSchema = channelInfo.schema;
            var data = asRawOrDie$1('channel[' + ch + '] data\nReceiver: ' + element(component.element), channelSchema, receivingData.data);
            channelInfo.onReceive(component, data);
          });
        })]);
    };

    var ActiveReceiving = /*#__PURE__*/Object.freeze({
        __proto__: null,
        events: events$h
    });

    var ReceivingSchema = [requiredOf('channels', setOf(Result.value, objOfOnly([
        onStrictHandler('onReceive'),
        defaulted('schema', anyValue())
      ])))];

    var executeEvent = function (bConfig, bState, executor) {
      return runOnExecute$1(function (component) {
        executor(component, bConfig, bState);
      });
    };
    var loadEvent = function (bConfig, bState, f) {
      return runOnInit(function (component, _simulatedEvent) {
        f(component, bConfig, bState);
      });
    };
    var create$8 = function (schema, name, active, apis, extra, state) {
      var configSchema = objOfOnly(schema);
      var schemaSchema = optionObjOf(name, [optionObjOfOnly('config', schema)]);
      return doCreate(configSchema, schemaSchema, name, active, apis, extra, state);
    };
    var createModes$1 = function (modes, name, active, apis, extra, state) {
      var configSchema = modes;
      var schemaSchema = optionObjOf(name, [optionOf('config', modes)]);
      return doCreate(configSchema, schemaSchema, name, active, apis, extra, state);
    };
    var wrapApi = function (bName, apiFunction, apiName) {
      var f = function (component) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          rest[_i - 1] = arguments[_i];
        }
        var args = [component].concat(rest);
        return component.config({ name: constant$1(bName) }).fold(function () {
          throw new Error('We could not find any behaviour configuration for: ' + bName + '. Using API: ' + apiName);
        }, function (info) {
          var rest = Array.prototype.slice.call(args, 1);
          return apiFunction.apply(undefined, [
            component,
            info.config,
            info.state
          ].concat(rest));
        });
      };
      return markAsBehaviourApi(f, apiName, apiFunction);
    };
    var revokeBehaviour = function (name) {
      return {
        key: name,
        value: undefined
      };
    };
    var doCreate = function (configSchema, schemaSchema, name, active, apis, extra, state) {
      var getConfig = function (info) {
        return hasNonNullableKey(info, name) ? info[name]() : Optional.none();
      };
      var wrappedApis = map(apis, function (apiF, apiName) {
        return wrapApi(name, apiF, apiName);
      });
      var wrappedExtra = map(extra, function (extraF, extraName) {
        return markAsExtraApi(extraF, extraName);
      });
      var me = __assign(__assign(__assign({}, wrappedExtra), wrappedApis), {
        revoke: curry(revokeBehaviour, name),
        config: function (spec) {
          var prepared = asRawOrDie$1(name + '-config', configSchema, spec);
          return {
            key: name,
            value: {
              config: prepared,
              me: me,
              configAsRaw: cached(function () {
                return asRawOrDie$1(name + '-config', configSchema, spec);
              }),
              initialConfig: spec,
              state: state
            }
          };
        },
        schema: constant$1(schemaSchema),
        exhibit: function (info, base) {
          return lift2(getConfig(info), get$e(active, 'exhibit'), function (behaviourInfo, exhibitor) {
            return exhibitor(base, behaviourInfo.config, behaviourInfo.state);
          }).getOrThunk(function () {
            return nu$7({});
          });
        },
        name: constant$1(name),
        handlers: function (info) {
          return getConfig(info).map(function (behaviourInfo) {
            var getEvents = get$e(active, 'events').getOr(function () {
              return {};
            });
            return getEvents(behaviourInfo.config, behaviourInfo.state);
          }).getOr({});
        }
      });
      return me;
    };

    var derive$1 = function (capabilities) {
      return wrapAll(capabilities);
    };
    var simpleSchema = objOfOnly([
      required$1('fields'),
      required$1('name'),
      defaulted('active', {}),
      defaulted('apis', {}),
      defaulted('state', NoState),
      defaulted('extra', {})
    ]);
    var create$7 = function (data) {
      var value = asRawOrDie$1('Creating behaviour: ' + data.name, simpleSchema, data);
      return create$8(value.fields, value.name, value.active, value.apis, value.extra, value.state);
    };
    var modeSchema = objOfOnly([
      required$1('branchKey'),
      required$1('branches'),
      required$1('name'),
      defaulted('active', {}),
      defaulted('apis', {}),
      defaulted('state', NoState),
      defaulted('extra', {})
    ]);
    var createModes = function (data) {
      var value = asRawOrDie$1('Creating behaviour: ' + data.name, modeSchema, data);
      return createModes$1(choose$1(value.branchKey, value.branches), value.name, value.active, value.apis, value.extra, value.state);
    };
    var revoke = constant$1(undefined);

    var Receiving = create$7({
      fields: ReceivingSchema,
      name: 'receiving',
      active: ActiveReceiving
    });

    var exhibit$6 = function (base, posConfig) {
      return nu$7({
        classes: [],
        styles: posConfig.useFixed() ? {} : { position: 'relative' }
      });
    };

    var ActivePosition = /*#__PURE__*/Object.freeze({
        __proto__: null,
        exhibit: exhibit$6
    });

    var getDocument = function () {
      return SugarElement.fromDom(document);
    };

    var focus$3 = function (element) {
      return element.dom.focus();
    };
    var blur$1 = function (element) {
      return element.dom.blur();
    };
    var hasFocus = function (element) {
      var root = getRootNode(element).dom;
      return element.dom === root.activeElement;
    };
    var active = function (root) {
      if (root === void 0) {
        root = getDocument();
      }
      return Optional.from(root.dom.activeElement).map(SugarElement.fromDom);
    };
    var search = function (element) {
      return active(getRootNode(element)).filter(function (e) {
        return element.dom.contains(e.dom);
      });
    };

    var preserve$1 = function (f, container) {
      var dos = getRootNode(container);
      var refocus = active(dos).bind(function (focused) {
        var hasFocus = function (elem) {
          return eq(focused, elem);
        };
        return hasFocus(container) ? Optional.some(container) : descendant$1(container, hasFocus);
      });
      var result = f(container);
      refocus.each(function (oldFocus) {
        active(dos).filter(function (newFocus) {
          return eq(newFocus, oldFocus);
        }).fold(function () {
          focus$3(oldFocus);
        }, noop);
      });
      return result;
    };

    var NuPositionCss = function (position, left, top, right, bottom) {
      var toPx = function (num) {
        return num + 'px';
      };
      return {
        position: position,
        left: left.map(toPx),
        top: top.map(toPx),
        right: right.map(toPx),
        bottom: bottom.map(toPx)
      };
    };
    var toOptions = function (position) {
      return __assign(__assign({}, position), { position: Optional.some(position.position) });
    };
    var applyPositionCss = function (element, position) {
      setOptions(element, toOptions(position));
    };

    var adt$9 = Adt.generate([
      { none: [] },
      {
        relative: [
          'x',
          'y',
          'width',
          'height'
        ]
      },
      {
        fixed: [
          'x',
          'y',
          'width',
          'height'
        ]
      }
    ]);
    var positionWithDirection = function (posName, decision, x, y, width, height) {
      var decisionRect = decision.rect;
      var decisionX = decisionRect.x - x;
      var decisionY = decisionRect.y - y;
      var decisionWidth = decisionRect.width;
      var decisionHeight = decisionRect.height;
      var decisionRight = width - (decisionX + decisionWidth);
      var decisionBottom = height - (decisionY + decisionHeight);
      var left = Optional.some(decisionX);
      var top = Optional.some(decisionY);
      var right = Optional.some(decisionRight);
      var bottom = Optional.some(decisionBottom);
      var none = Optional.none();
      return cata$2(decision.direction, function () {
        return NuPositionCss(posName, left, top, none, none);
      }, function () {
        return NuPositionCss(posName, none, top, right, none);
      }, function () {
        return NuPositionCss(posName, left, none, none, bottom);
      }, function () {
        return NuPositionCss(posName, none, none, right, bottom);
      }, function () {
        return NuPositionCss(posName, left, top, none, none);
      }, function () {
        return NuPositionCss(posName, left, none, none, bottom);
      }, function () {
        return NuPositionCss(posName, left, top, none, none);
      }, function () {
        return NuPositionCss(posName, none, top, right, none);
      });
    };
    var reposition = function (origin, decision) {
      return origin.fold(function () {
        var decisionRect = decision.rect;
        return NuPositionCss('absolute', Optional.some(decisionRect.x), Optional.some(decisionRect.y), Optional.none(), Optional.none());
      }, function (x, y, width, height) {
        return positionWithDirection('absolute', decision, x, y, width, height);
      }, function (x, y, width, height) {
        return positionWithDirection('fixed', decision, x, y, width, height);
      });
    };
    var toBox = function (origin, element) {
      var rel = curry(find$2, element);
      var position = origin.fold(rel, rel, function () {
        var scroll = get$6();
        return find$2(element).translate(-scroll.left, -scroll.top);
      });
      var width = getOuter(element);
      var height = getOuter$1(element);
      return bounds(position.left, position.top, width, height);
    };
    var viewport = function (origin, getBounds) {
      return getBounds.fold(function () {
        return origin.fold(win, win, bounds);
      }, function (b) {
        return origin.fold(b, b, function () {
          var bounds$1 = b();
          var pos = translate$2(origin, bounds$1.x, bounds$1.y);
          return bounds(pos.left, pos.top, bounds$1.width, bounds$1.height);
        });
      });
    };
    var translate$2 = function (origin, x, y) {
      var pos = SugarPosition(x, y);
      var removeScroll = function () {
        var outerScroll = get$6();
        return pos.translate(-outerScroll.left, -outerScroll.top);
      };
      return origin.fold(constant$1(pos), constant$1(pos), removeScroll);
    };
    var cata$1 = function (subject, onNone, onRelative, onFixed) {
      return subject.fold(onNone, onRelative, onFixed);
    };
    adt$9.none;
    var relative$1 = adt$9.relative;
    var fixed$1 = adt$9.fixed;

    var anchor = function (anchorBox, origin) {
      return {
        anchorBox: anchorBox,
        origin: origin
      };
    };
    var box = function (anchorBox, origin) {
      return anchor(anchorBox, origin);
    };

    var placementAttribute = 'data-alloy-placement';
    var setPlacement$1 = function (element, placement) {
      set$7(element, placementAttribute, placement);
    };
    var getPlacement = function (element) {
      return getOpt(element, placementAttribute);
    };
    var reset$2 = function (element) {
      return remove$6(element, placementAttribute);
    };

    var adt$8 = Adt.generate([
      { fit: ['reposition'] },
      {
        nofit: [
          'reposition',
          'visibleW',
          'visibleH',
          'isVisible'
        ]
      }
    ]);
    var determinePosition = function (box, bounds) {
      var boundsX = bounds.x, boundsY = bounds.y, boundsRight = bounds.right, boundsBottom = bounds.bottom;
      var x = box.x, y = box.y, right = box.right, bottom = box.bottom, width = box.width, height = box.height;
      var xInBounds = x >= boundsX && x <= boundsRight;
      var yInBounds = y >= boundsY && y <= boundsBottom;
      var originInBounds = xInBounds && yInBounds;
      var rightInBounds = right <= boundsRight && right >= boundsX;
      var bottomInBounds = bottom <= boundsBottom && bottom >= boundsY;
      var sizeInBounds = rightInBounds && bottomInBounds;
      var visibleW = Math.min(width, x >= boundsX ? boundsRight - x : right - boundsX);
      var visibleH = Math.min(height, y >= boundsY ? boundsBottom - y : bottom - boundsY);
      return {
        originInBounds: originInBounds,
        sizeInBounds: sizeInBounds,
        visibleW: visibleW,
        visibleH: visibleH
      };
    };
    var calcReposition = function (box, bounds$1) {
      var boundsX = bounds$1.x, boundsY = bounds$1.y, boundsRight = bounds$1.right, boundsBottom = bounds$1.bottom;
      var x = box.x, y = box.y, width = box.width, height = box.height;
      var maxX = Math.max(boundsX, boundsRight - width);
      var maxY = Math.max(boundsY, boundsBottom - height);
      var restrictedX = clamp$1(x, boundsX, maxX);
      var restrictedY = clamp$1(y, boundsY, maxY);
      var restrictedWidth = Math.min(restrictedX + width, boundsRight) - restrictedX;
      var restrictedHeight = Math.min(restrictedY + height, boundsBottom) - restrictedY;
      return bounds(restrictedX, restrictedY, restrictedWidth, restrictedHeight);
    };
    var calcMaxSizes = function (direction, box, bounds) {
      var upAvailable = constant$1(box.bottom - bounds.y);
      var downAvailable = constant$1(bounds.bottom - box.y);
      var maxHeight = cataVertical(direction, downAvailable, downAvailable, upAvailable);
      var westAvailable = constant$1(box.right - bounds.x);
      var eastAvailable = constant$1(bounds.right - box.x);
      var maxWidth = cataHorizontal(direction, eastAvailable, eastAvailable, westAvailable);
      return {
        maxWidth: maxWidth,
        maxHeight: maxHeight
      };
    };
    var attempt = function (candidate, width, height, bounds$1) {
      var bubble = candidate.bubble;
      var bubbleOffset = bubble.offset;
      var adjustedBounds = adjustBounds(bounds$1, candidate.restriction, bubbleOffset);
      var newX = candidate.x + bubbleOffset.left;
      var newY = candidate.y + bubbleOffset.top;
      var box = bounds(newX, newY, width, height);
      var _a = determinePosition(box, adjustedBounds), originInBounds = _a.originInBounds, sizeInBounds = _a.sizeInBounds, visibleW = _a.visibleW, visibleH = _a.visibleH;
      var fits = originInBounds && sizeInBounds;
      var fittedBox = fits ? box : calcReposition(box, adjustedBounds);
      var isPartlyVisible = fittedBox.width > 0 && fittedBox.height > 0;
      var _b = calcMaxSizes(candidate.direction, fittedBox, bounds$1), maxWidth = _b.maxWidth, maxHeight = _b.maxHeight;
      var reposition = {
        rect: fittedBox,
        maxHeight: maxHeight,
        maxWidth: maxWidth,
        direction: candidate.direction,
        placement: candidate.placement,
        classes: {
          on: bubble.classesOn,
          off: bubble.classesOff
        },
        layout: candidate.label,
        testY: newY
      };
      return fits || candidate.alwaysFit ? adt$8.fit(reposition) : adt$8.nofit(reposition, visibleW, visibleH, isPartlyVisible);
    };
    var attempts = function (element, candidates, anchorBox, elementBox, bubbles, bounds) {
      var panelWidth = elementBox.width;
      var panelHeight = elementBox.height;
      var attemptBestFit = function (layout, reposition, visibleW, visibleH, isVisible) {
        var next = layout(anchorBox, elementBox, bubbles, element, bounds);
        var attemptLayout = attempt(next, panelWidth, panelHeight, bounds);
        return attemptLayout.fold(constant$1(attemptLayout), function (newReposition, newVisibleW, newVisibleH, newIsVisible) {
          var improved = isVisible === newIsVisible ? newVisibleH > visibleH || newVisibleW > visibleW : !isVisible && newIsVisible;
          return improved ? attemptLayout : adt$8.nofit(reposition, visibleW, visibleH, isVisible);
        });
      };
      var abc = foldl(candidates, function (b, a) {
        var bestNext = curry(attemptBestFit, a);
        return b.fold(constant$1(b), bestNext);
      }, adt$8.nofit({
        rect: anchorBox,
        maxHeight: elementBox.height,
        maxWidth: elementBox.width,
        direction: southeast$3(),
        placement: 'southeast',
        classes: {
          on: [],
          off: []
        },
        layout: 'none',
        testY: anchorBox.y
      }, -1, -1, false));
      return abc.fold(identity$1, identity$1);
    };

    var singleton = function (doRevoke) {
      var subject = Cell(Optional.none());
      var revoke = function () {
        return subject.get().each(doRevoke);
      };
      var clear = function () {
        revoke();
        subject.set(Optional.none());
      };
      var isSet = function () {
        return subject.get().isSome();
      };
      var get = function () {
        return subject.get();
      };
      var set = function (s) {
        revoke();
        subject.set(Optional.some(s));
      };
      return {
        clear: clear,
        isSet: isSet,
        get: get,
        set: set
      };
    };
    var destroyable = function () {
      return singleton(function (s) {
        return s.destroy();
      });
    };
    var unbindable = function () {
      return singleton(function (s) {
        return s.unbind();
      });
    };
    var value$1 = function () {
      var subject = singleton(noop);
      var on = function (f) {
        return subject.get().each(f);
      };
      return __assign(__assign({}, subject), { on: on });
    };

    var filter = always;
    var bind = function (element, event, handler) {
      return bind$1(element, event, filter, handler);
    };
    var capture = function (element, event, handler) {
      return capture$1(element, event, filter, handler);
    };
    var fromRawEvent = fromRawEvent$1;

    var properties = [
      'top',
      'bottom',
      'right',
      'left'
    ];
    var timerAttr = 'data-alloy-transition-timer';
    var isTransitioning$1 = function (element, transition) {
      return hasAll(element, transition.classes);
    };
    var shouldApplyTransitionCss = function (transition, decision, lastPlacement) {
      return lastPlacement.exists(function (placer) {
        var mode = transition.mode;
        return mode === 'all' ? true : placer[mode] !== decision[mode];
      });
    };
    var hasChanges = function (position, intermediate) {
      var round = function (value) {
        return parseFloat(value).toPrecision(3);
      };
      return find$4(intermediate, function (value, key) {
        var newValue = position[key].map(round);
        var val = value.map(round);
        return !equals(newValue, val);
      }).isSome();
    };
    var getTransitionDuration = function (element) {
      var get = function (name) {
        var style = get$a(element, name);
        var times = isString(style) ? style.split(/\s*,\s*/) : [];
        return filter$2(times, isNotEmpty);
      };
      var parse = function (value) {
        if (isString(value) && /^[\d.]+/.test(value)) {
          var num = parseFloat(value);
          return endsWith(value, 'ms') ? num : num * 1000;
        } else {
          return 0;
        }
      };
      var delay = get('transition-delay');
      var duration = get('transition-duration');
      return foldl(duration, function (acc, dur, i) {
        var time = parse(delay[i]) + parse(dur);
        return Math.max(acc, time);
      }, 0);
    };
    var setupTransitionListeners = function (element, transition) {
      var transitionEnd = unbindable();
      var transitionCancel = unbindable();
      var timer;
      var isSourceTransition = function (e) {
        var _a;
        var pseudoElement = (_a = e.raw.pseudoElement) !== null && _a !== void 0 ? _a : '';
        return eq(e.target, element) && isEmpty(pseudoElement) && contains$2(properties, e.raw.propertyName);
      };
      var transitionDone = function (e) {
        if (isNullable(e) || isSourceTransition(e)) {
          transitionEnd.clear();
          transitionCancel.clear();
          var type = e === null || e === void 0 ? void 0 : e.raw.type;
          if (isNullable(type) || type === transitionend()) {
            clearTimeout(timer);
            remove$6(element, timerAttr);
            remove$2(element, transition.classes);
          }
        }
      };
      var transitionStarted = function () {
        transitionEnd.set(bind(element, transitionend(), transitionDone));
        transitionCancel.set(bind(element, transitioncancel(), transitionDone));
      };
      if ('ontransitionstart' in element.dom) {
        var transitionStart_1 = bind(element, transitionstart(), function (e) {
          if (isSourceTransition(e)) {
            transitionStart_1.unbind();
            transitionStarted();
          }
        });
      } else {
        transitionStarted();
      }
      var duration = getTransitionDuration(element);
      requestAnimationFrame(function () {
        timer = setTimeout(transitionDone, duration + 17);
        set$7(element, timerAttr, timer);
      });
    };
    var startTransitioning = function (element, transition) {
      add$1(element, transition.classes);
      getOpt(element, timerAttr).each(function (timerId) {
        clearTimeout(parseInt(timerId, 10));
        remove$6(element, timerAttr);
      });
      setupTransitionListeners(element, transition);
    };
    var applyTransitionCss = function (element, origin, position, transition, decision, lastPlacement) {
      var shouldTransition = shouldApplyTransitionCss(transition, decision, lastPlacement);
      if (shouldTransition || isTransitioning$1(element, transition)) {
        set$6(element, 'position', position.position);
        var rect = toBox(origin, element);
        var intermediatePosition_1 = reposition(origin, __assign(__assign({}, decision), { rect: rect }));
        var intermediateCssOptions = mapToObject(properties, function (prop) {
          return intermediatePosition_1[prop];
        });
        if (hasChanges(position, intermediateCssOptions)) {
          setOptions(element, intermediateCssOptions);
          if (shouldTransition) {
            startTransitioning(element, transition);
          }
          reflow(element);
        }
      } else {
        remove$2(element, transition.classes);
      }
    };

    var elementSize = function (p) {
      return {
        width: getOuter(p),
        height: getOuter$1(p)
      };
    };
    var layout = function (anchorBox, element, bubbles, options) {
      remove$1(element, 'max-height');
      remove$1(element, 'max-width');
      var elementBox = elementSize(element);
      return attempts(element, options.preference, anchorBox, elementBox, bubbles, options.bounds);
    };
    var setClasses = function (element, decision) {
      var classInfo = decision.classes;
      remove$2(element, classInfo.off);
      add$1(element, classInfo.on);
    };
    var setHeight = function (element, decision, options) {
      var maxHeightFunction = options.maxHeightFunction;
      maxHeightFunction(element, decision.maxHeight);
    };
    var setWidth = function (element, decision, options) {
      var maxWidthFunction = options.maxWidthFunction;
      maxWidthFunction(element, decision.maxWidth);
    };
    var position$2 = function (element, decision, options) {
      var positionCss = reposition(options.origin, decision);
      options.transition.each(function (transition) {
        applyTransitionCss(element, options.origin, positionCss, transition, decision, options.lastPlacement);
      });
      applyPositionCss(element, positionCss);
    };
    var setPlacement = function (element, decision) {
      setPlacement$1(element, decision.placement);
    };

    var setMaxHeight = function (element, maxHeight) {
      setMax$1(element, Math.floor(maxHeight));
    };
    var anchored = constant$1(function (element, available) {
      setMaxHeight(element, available);
      setAll(element, {
        'overflow-x': 'hidden',
        'overflow-y': 'auto'
      });
    });
    var expandable$1 = constant$1(function (element, available) {
      setMaxHeight(element, available);
    });

    var defaultOr = function (options, key, dephault) {
      return options[key] === undefined ? dephault : options[key];
    };
    var simple = function (anchor, element, bubble, layouts, lastPlacement, getBounds, overrideOptions, transition) {
      var maxHeightFunction = defaultOr(overrideOptions, 'maxHeightFunction', anchored());
      var maxWidthFunction = defaultOr(overrideOptions, 'maxWidthFunction', noop);
      var anchorBox = anchor.anchorBox;
      var origin = anchor.origin;
      var options = {
        bounds: viewport(origin, getBounds),
        origin: origin,
        preference: layouts,
        maxHeightFunction: maxHeightFunction,
        maxWidthFunction: maxWidthFunction,
        lastPlacement: lastPlacement,
        transition: transition
      };
      return go(anchorBox, element, bubble, options);
    };
    var go = function (anchorBox, element, bubble, options) {
      var decision = layout(anchorBox, element, bubble, options);
      position$2(element, decision, options);
      setPlacement(element, decision);
      setClasses(element, decision);
      setHeight(element, decision, options);
      setWidth(element, decision, options);
      return {
        layout: decision.layout,
        placement: decision.placement
      };
    };

    var allAlignments = [
      'valignCentre',
      'alignLeft',
      'alignRight',
      'alignCentre',
      'top',
      'bottom',
      'left',
      'right',
      'inset'
    ];
    var nu$5 = function (xOffset, yOffset, classes, insetModifier) {
      if (insetModifier === void 0) {
        insetModifier = 1;
      }
      var insetXOffset = xOffset * insetModifier;
      var insetYOffset = yOffset * insetModifier;
      var getClasses = function (prop) {
        return get$e(classes, prop).getOr([]);
      };
      var make = function (xDelta, yDelta, alignmentsOn) {
        var alignmentsOff = difference(allAlignments, alignmentsOn);
        return {
          offset: SugarPosition(xDelta, yDelta),
          classesOn: bind$3(alignmentsOn, getClasses),
          classesOff: bind$3(alignmentsOff, getClasses)
        };
      };
      return {
        southeast: function () {
          return make(-xOffset, yOffset, [
            'top',
            'alignLeft'
          ]);
        },
        southwest: function () {
          return make(xOffset, yOffset, [
            'top',
            'alignRight'
          ]);
        },
        south: function () {
          return make(-xOffset / 2, yOffset, [
            'top',
            'alignCentre'
          ]);
        },
        northeast: function () {
          return make(-xOffset, -yOffset, [
            'bottom',
            'alignLeft'
          ]);
        },
        northwest: function () {
          return make(xOffset, -yOffset, [
            'bottom',
            'alignRight'
          ]);
        },
        north: function () {
          return make(-xOffset / 2, -yOffset, [
            'bottom',
            'alignCentre'
          ]);
        },
        east: function () {
          return make(xOffset, -yOffset / 2, [
            'valignCentre',
            'left'
          ]);
        },
        west: function () {
          return make(-xOffset, -yOffset / 2, [
            'valignCentre',
            'right'
          ]);
        },
        insetNortheast: function () {
          return make(insetXOffset, insetYOffset, [
            'top',
            'alignLeft',
            'inset'
          ]);
        },
        insetNorthwest: function () {
          return make(-insetXOffset, insetYOffset, [
            'top',
            'alignRight',
            'inset'
          ]);
        },
        insetNorth: function () {
          return make(-insetXOffset / 2, insetYOffset, [
            'top',
            'alignCentre',
            'inset'
          ]);
        },
        insetSoutheast: function () {
          return make(insetXOffset, -insetYOffset, [
            'bottom',
            'alignLeft',
            'inset'
          ]);
        },
        insetSouthwest: function () {
          return make(-insetXOffset, -insetYOffset, [
            'bottom',
            'alignRight',
            'inset'
          ]);
        },
        insetSouth: function () {
          return make(-insetXOffset / 2, -insetYOffset, [
            'bottom',
            'alignCentre',
            'inset'
          ]);
        },
        insetEast: function () {
          return make(-insetXOffset, -insetYOffset / 2, [
            'valignCentre',
            'right',
            'inset'
          ]);
        },
        insetWest: function () {
          return make(insetXOffset, -insetYOffset / 2, [
            'valignCentre',
            'left',
            'inset'
          ]);
        }
      };
    };
    var fallback = function () {
      return nu$5(0, 0, {});
    };

    var nu$4 = identity$1;

    var onDirection = function (isLtr, isRtl) {
      return function (element) {
        return getDirection(element) === 'rtl' ? isRtl : isLtr;
      };
    };
    var getDirection = function (element) {
      return get$a(element, 'direction') === 'rtl' ? 'rtl' : 'ltr';
    };

    var AttributeValue;
    (function (AttributeValue) {
      AttributeValue['TopToBottom'] = 'toptobottom';
      AttributeValue['BottomToTop'] = 'bottomtotop';
    }(AttributeValue || (AttributeValue = {})));
    var Attribute = 'data-alloy-vertical-dir';
    var isBottomToTopDir = function (el) {
      return closest$2(el, function (current) {
        return isElement$2(current) && get$c(current, 'data-alloy-vertical-dir') === AttributeValue.BottomToTop;
      });
    };

    var schema$y = function () {
      return optionObjOf('layouts', [
        required$1('onLtr'),
        required$1('onRtl'),
        option('onBottomLtr'),
        option('onBottomRtl')
      ]);
    };
    var get$4 = function (elem, info, defaultLtr, defaultRtl, defaultBottomLtr, defaultBottomRtl, dirElement) {
      var isBottomToTop = dirElement.map(isBottomToTopDir).getOr(false);
      var customLtr = info.layouts.map(function (ls) {
        return ls.onLtr(elem);
      });
      var customRtl = info.layouts.map(function (ls) {
        return ls.onRtl(elem);
      });
      var ltr = isBottomToTop ? info.layouts.bind(function (ls) {
        return ls.onBottomLtr.map(function (f) {
          return f(elem);
        });
      }).or(customLtr).getOr(defaultBottomLtr) : customLtr.getOr(defaultLtr);
      var rtl = isBottomToTop ? info.layouts.bind(function (ls) {
        return ls.onBottomRtl.map(function (f) {
          return f(elem);
        });
      }).or(customRtl).getOr(defaultBottomRtl) : customRtl.getOr(defaultRtl);
      var f = onDirection(ltr, rtl);
      return f(elem);
    };

    var placement$4 = function (component, anchorInfo, origin) {
      var hotspot = anchorInfo.hotspot;
      var anchorBox = toBox(origin, hotspot.element);
      var layouts = get$4(component.element, anchorInfo, belowOrAbove(), belowOrAboveRtl(), aboveOrBelow(), aboveOrBelowRtl(), Optional.some(anchorInfo.hotspot.element));
      return Optional.some(nu$4({
        anchorBox: anchorBox,
        bubble: anchorInfo.bubble.getOr(fallback()),
        overrides: anchorInfo.overrides,
        layouts: layouts,
        placer: Optional.none()
      }));
    };
    var HotspotAnchor = [
      required$1('hotspot'),
      option('bubble'),
      defaulted('overrides', {}),
      schema$y(),
      output$1('placement', placement$4)
    ];

    var placement$3 = function (component, anchorInfo, origin) {
      var pos = translate$2(origin, anchorInfo.x, anchorInfo.y);
      var anchorBox = bounds(pos.left, pos.top, anchorInfo.width, anchorInfo.height);
      var layouts = get$4(component.element, anchorInfo, all$1(), allRtl$1(), all$1(), allRtl$1(), Optional.none());
      return Optional.some(nu$4({
        anchorBox: anchorBox,
        bubble: anchorInfo.bubble,
        overrides: anchorInfo.overrides,
        layouts: layouts,
        placer: Optional.none()
      }));
    };
    var MakeshiftAnchor = [
      required$1('x'),
      required$1('y'),
      defaulted('height', 0),
      defaulted('width', 0),
      defaulted('bubble', fallback()),
      defaulted('overrides', {}),
      schema$y(),
      output$1('placement', placement$3)
    ];

    var adt$7 = Adt.generate([
      { screen: ['point'] },
      {
        absolute: [
          'point',
          'scrollLeft',
          'scrollTop'
        ]
      }
    ]);
    var toFixed = function (pos) {
      return pos.fold(identity$1, function (point, scrollLeft, scrollTop) {
        return point.translate(-scrollLeft, -scrollTop);
      });
    };
    var toAbsolute = function (pos) {
      return pos.fold(identity$1, identity$1);
    };
    var sum = function (points) {
      return foldl(points, function (b, a) {
        return b.translate(a.left, a.top);
      }, SugarPosition(0, 0));
    };
    var sumAsFixed = function (positions) {
      var points = map$2(positions, toFixed);
      return sum(points);
    };
    var sumAsAbsolute = function (positions) {
      var points = map$2(positions, toAbsolute);
      return sum(points);
    };
    var screen = adt$7.screen;
    var absolute$1 = adt$7.absolute;

    var getOffset = function (component, origin, anchorInfo) {
      var win = defaultView(anchorInfo.root).dom;
      var hasSameOwner = function (frame) {
        var frameOwner = owner$4(frame);
        var compOwner = owner$4(component.element);
        return eq(frameOwner, compOwner);
      };
      return Optional.from(win.frameElement).map(SugarElement.fromDom).filter(hasSameOwner).map(absolute$3);
    };
    var getRootPoint = function (component, origin, anchorInfo) {
      var doc = owner$4(component.element);
      var outerScroll = get$6(doc);
      var offset = getOffset(component, origin, anchorInfo).getOr(outerScroll);
      return absolute$1(offset, outerScroll.left, outerScroll.top);
    };

    var getBox = function (left, top, width, height) {
      var point = screen(SugarPosition(left, top));
      return Optional.some(pointed(point, width, height));
    };
    var calcNewAnchor = function (optBox, rootPoint, anchorInfo, origin, elem) {
      return optBox.map(function (box) {
        var points = [
          rootPoint,
          box.point
        ];
        var topLeft = cata$1(origin, function () {
          return sumAsAbsolute(points);
        }, function () {
          return sumAsAbsolute(points);
        }, function () {
          return sumAsFixed(points);
        });
        var anchorBox = rect(topLeft.left, topLeft.top, box.width, box.height);
        var layoutsLtr = anchorInfo.showAbove ? aboveOrBelow() : belowOrAbove();
        var layoutsRtl = anchorInfo.showAbove ? aboveOrBelowRtl() : belowOrAboveRtl();
        var layouts = get$4(elem, anchorInfo, layoutsLtr, layoutsRtl, layoutsLtr, layoutsRtl, Optional.none());
        return nu$4({
          anchorBox: anchorBox,
          bubble: anchorInfo.bubble.getOr(fallback()),
          overrides: anchorInfo.overrides,
          layouts: layouts,
          placer: Optional.none()
        });
      });
    };

    var placement$2 = function (component, anchorInfo, origin) {
      var rootPoint = getRootPoint(component, origin, anchorInfo);
      return anchorInfo.node.filter(inBody).bind(function (target) {
        var rect = target.dom.getBoundingClientRect();
        var nodeBox = getBox(rect.left, rect.top, rect.width, rect.height);
        var elem = anchorInfo.node.getOr(component.element);
        return calcNewAnchor(nodeBox, rootPoint, anchorInfo, origin, elem);
      });
    };
    var NodeAnchor = [
      required$1('node'),
      required$1('root'),
      option('bubble'),
      schema$y(),
      defaulted('overrides', {}),
      defaulted('showAbove', false),
      output$1('placement', placement$2)
    ];

    var zeroWidth = '\uFEFF';
    var nbsp = '\xA0';

    var create$6 = function (start, soffset, finish, foffset) {
      return {
        start: start,
        soffset: soffset,
        finish: finish,
        foffset: foffset
      };
    };
    var SimRange = { create: create$6 };

    var adt$6 = Adt.generate([
      { before: ['element'] },
      {
        on: [
          'element',
          'offset'
        ]
      },
      { after: ['element'] }
    ]);
    var cata = function (subject, onBefore, onOn, onAfter) {
      return subject.fold(onBefore, onOn, onAfter);
    };
    var getStart$1 = function (situ) {
      return situ.fold(identity$1, identity$1, identity$1);
    };
    var before = adt$6.before;
    var on$1 = adt$6.on;
    var after$1 = adt$6.after;
    var Situ = {
      before: before,
      on: on$1,
      after: after$1,
      cata: cata,
      getStart: getStart$1
    };

    var adt$5 = Adt.generate([
      { domRange: ['rng'] },
      {
        relative: [
          'startSitu',
          'finishSitu'
        ]
      },
      {
        exact: [
          'start',
          'soffset',
          'finish',
          'foffset'
        ]
      }
    ]);
    var exactFromRange = function (simRange) {
      return adt$5.exact(simRange.start, simRange.soffset, simRange.finish, simRange.foffset);
    };
    var getStart = function (selection) {
      return selection.match({
        domRange: function (rng) {
          return SugarElement.fromDom(rng.startContainer);
        },
        relative: function (startSitu, _finishSitu) {
          return Situ.getStart(startSitu);
        },
        exact: function (start, _soffset, _finish, _foffset) {
          return start;
        }
      });
    };
    var domRange = adt$5.domRange;
    var relative = adt$5.relative;
    var exact = adt$5.exact;
    var getWin = function (selection) {
      var start = getStart(selection);
      return defaultView(start);
    };
    var range$1 = SimRange.create;
    var SimSelection = {
      domRange: domRange,
      relative: relative,
      exact: exact,
      exactFromRange: exactFromRange,
      getWin: getWin,
      range: range$1
    };

    var setStart = function (rng, situ) {
      situ.fold(function (e) {
        rng.setStartBefore(e.dom);
      }, function (e, o) {
        rng.setStart(e.dom, o);
      }, function (e) {
        rng.setStartAfter(e.dom);
      });
    };
    var setFinish = function (rng, situ) {
      situ.fold(function (e) {
        rng.setEndBefore(e.dom);
      }, function (e, o) {
        rng.setEnd(e.dom, o);
      }, function (e) {
        rng.setEndAfter(e.dom);
      });
    };
    var relativeToNative = function (win, startSitu, finishSitu) {
      var range = win.document.createRange();
      setStart(range, startSitu);
      setFinish(range, finishSitu);
      return range;
    };
    var exactToNative = function (win, start, soffset, finish, foffset) {
      var rng = win.document.createRange();
      rng.setStart(start.dom, soffset);
      rng.setEnd(finish.dom, foffset);
      return rng;
    };
    var toRect = function (rect) {
      return {
        left: rect.left,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height
      };
    };
    var getFirstRect$1 = function (rng) {
      var rects = rng.getClientRects();
      var rect = rects.length > 0 ? rects[0] : rng.getBoundingClientRect();
      return rect.width > 0 || rect.height > 0 ? Optional.some(rect).map(toRect) : Optional.none();
    };
    var getBounds$2 = function (rng) {
      var rect = rng.getBoundingClientRect();
      return rect.width > 0 || rect.height > 0 ? Optional.some(rect).map(toRect) : Optional.none();
    };

    var adt$4 = Adt.generate([
      {
        ltr: [
          'start',
          'soffset',
          'finish',
          'foffset'
        ]
      },
      {
        rtl: [
          'start',
          'soffset',
          'finish',
          'foffset'
        ]
      }
    ]);
    var fromRange = function (win, type, range) {
      return type(SugarElement.fromDom(range.startContainer), range.startOffset, SugarElement.fromDom(range.endContainer), range.endOffset);
    };
    var getRanges = function (win, selection) {
      return selection.match({
        domRange: function (rng) {
          return {
            ltr: constant$1(rng),
            rtl: Optional.none
          };
        },
        relative: function (startSitu, finishSitu) {
          return {
            ltr: cached(function () {
              return relativeToNative(win, startSitu, finishSitu);
            }),
            rtl: cached(function () {
              return Optional.some(relativeToNative(win, finishSitu, startSitu));
            })
          };
        },
        exact: function (start, soffset, finish, foffset) {
          return {
            ltr: cached(function () {
              return exactToNative(win, start, soffset, finish, foffset);
            }),
            rtl: cached(function () {
              return Optional.some(exactToNative(win, finish, foffset, start, soffset));
            })
          };
        }
      });
    };
    var doDiagnose = function (win, ranges) {
      var rng = ranges.ltr();
      if (rng.collapsed) {
        var reversed = ranges.rtl().filter(function (rev) {
          return rev.collapsed === false;
        });
        return reversed.map(function (rev) {
          return adt$4.rtl(SugarElement.fromDom(rev.endContainer), rev.endOffset, SugarElement.fromDom(rev.startContainer), rev.startOffset);
        }).getOrThunk(function () {
          return fromRange(win, adt$4.ltr, rng);
        });
      } else {
        return fromRange(win, adt$4.ltr, rng);
      }
    };
    var diagnose = function (win, selection) {
      var ranges = getRanges(win, selection);
      return doDiagnose(win, ranges);
    };
    var asLtrRange = function (win, selection) {
      var diagnosis = diagnose(win, selection);
      return diagnosis.match({
        ltr: function (start, soffset, finish, foffset) {
          var rng = win.document.createRange();
          rng.setStart(start.dom, soffset);
          rng.setEnd(finish.dom, foffset);
          return rng;
        },
        rtl: function (start, soffset, finish, foffset) {
          var rng = win.document.createRange();
          rng.setStart(finish.dom, foffset);
          rng.setEnd(start.dom, soffset);
          return rng;
        }
      });
    };
    adt$4.ltr;
    adt$4.rtl;

    var NodeValue = function (is, name) {
      var get = function (element) {
        if (!is(element)) {
          throw new Error('Can only get ' + name + ' value of a ' + name + ' node');
        }
        return getOption(element).getOr('');
      };
      var getOption = function (element) {
        return is(element) ? Optional.from(element.dom.nodeValue) : Optional.none();
      };
      var set = function (element, value) {
        if (!is(element)) {
          throw new Error('Can only set raw ' + name + ' value of a ' + name + ' node');
        }
        element.dom.nodeValue = value;
      };
      return {
        get: get,
        getOption: getOption,
        set: set
      };
    };

    var api = NodeValue(isText$1, 'text');
    var get$3 = function (element) {
      return api.get(element);
    };
    var getOption = function (element) {
      return api.getOption(element);
    };

    var getEnd = function (element) {
      return name$2(element) === 'img' ? 1 : getOption(element).fold(function () {
        return children(element).length;
      }, function (v) {
        return v.length;
      });
    };
    var isTextNodeWithCursorPosition = function (el) {
      return getOption(el).filter(function (text) {
        return text.trim().length !== 0 || text.indexOf(nbsp) > -1;
      }).isSome();
    };
    var elementsWithCursorPosition = [
      'img',
      'br'
    ];
    var isCursorPosition = function (elem) {
      var hasCursorPosition = isTextNodeWithCursorPosition(elem);
      return hasCursorPosition || contains$2(elementsWithCursorPosition, name$2(elem));
    };

    var last$1 = function (element) {
      return descendantRtl(element, isCursorPosition);
    };
    var descendantRtl = function (scope, predicate) {
      var descend = function (element) {
        var children$1 = children(element);
        for (var i = children$1.length - 1; i >= 0; i--) {
          var child = children$1[i];
          if (predicate(child)) {
            return Optional.some(child);
          }
          var res = descend(child);
          if (res.isSome()) {
            return res;
          }
        }
        return Optional.none();
      };
      return descend(scope);
    };

    var descendants = function (scope, selector) {
      return all$3(selector, scope);
    };

    var makeRange = function (start, soffset, finish, foffset) {
      var doc = owner$4(start);
      var rng = doc.dom.createRange();
      rng.setStart(start.dom, soffset);
      rng.setEnd(finish.dom, foffset);
      return rng;
    };
    var after = function (start, soffset, finish, foffset) {
      var r = makeRange(start, soffset, finish, foffset);
      var same = eq(start, finish) && soffset === foffset;
      return r.collapsed && !same;
    };

    var getNativeSelection = function (win) {
      return Optional.from(win.getSelection());
    };
    var readRange = function (selection) {
      if (selection.rangeCount > 0) {
        var firstRng = selection.getRangeAt(0);
        var lastRng = selection.getRangeAt(selection.rangeCount - 1);
        return Optional.some(SimRange.create(SugarElement.fromDom(firstRng.startContainer), firstRng.startOffset, SugarElement.fromDom(lastRng.endContainer), lastRng.endOffset));
      } else {
        return Optional.none();
      }
    };
    var doGetExact = function (selection) {
      if (selection.anchorNode === null || selection.focusNode === null) {
        return readRange(selection);
      } else {
        var anchor = SugarElement.fromDom(selection.anchorNode);
        var focus_1 = SugarElement.fromDom(selection.focusNode);
        return after(anchor, selection.anchorOffset, focus_1, selection.focusOffset) ? Optional.some(SimRange.create(anchor, selection.anchorOffset, focus_1, selection.focusOffset)) : readRange(selection);
      }
    };
    var getExact = function (win) {
      return getNativeSelection(win).filter(function (sel) {
        return sel.rangeCount > 0;
      }).bind(doGetExact);
    };
    var getFirstRect = function (win, selection) {
      var rng = asLtrRange(win, selection);
      return getFirstRect$1(rng);
    };
    var getBounds$1 = function (win, selection) {
      var rng = asLtrRange(win, selection);
      return getBounds$2(rng);
    };

    var point$1 = function (element, offset) {
      return {
        element: element,
        offset: offset
      };
    };
    var descendOnce$1 = function (element, offset) {
      var children$1 = children(element);
      if (children$1.length === 0) {
        return point$1(element, offset);
      } else if (offset < children$1.length) {
        return point$1(children$1[offset], 0);
      } else {
        var last = children$1[children$1.length - 1];
        var len = isText$1(last) ? get$3(last).length : children(last).length;
        return point$1(last, len);
      }
    };

    var descendOnce = function (element, offset) {
      return isText$1(element) ? point$1(element, offset) : descendOnce$1(element, offset);
    };
    var getAnchorSelection = function (win, anchorInfo) {
      var getSelection = anchorInfo.getSelection.getOrThunk(function () {
        return function () {
          return getExact(win);
        };
      });
      return getSelection().map(function (sel) {
        var modStart = descendOnce(sel.start, sel.soffset);
        var modFinish = descendOnce(sel.finish, sel.foffset);
        return SimSelection.range(modStart.element, modStart.offset, modFinish.element, modFinish.offset);
      });
    };
    var placement$1 = function (component, anchorInfo, origin) {
      var win = defaultView(anchorInfo.root).dom;
      var rootPoint = getRootPoint(component, origin, anchorInfo);
      var selectionBox = getAnchorSelection(win, anchorInfo).bind(function (sel) {
        var optRect = getBounds$1(win, SimSelection.exactFromRange(sel)).orThunk(function () {
          var x = SugarElement.fromText(zeroWidth);
          before$2(sel.start, x);
          var rect = getFirstRect(win, SimSelection.exact(x, 0, x, 1));
          remove$7(x);
          return rect;
        });
        return optRect.bind(function (rawRect) {
          return getBox(rawRect.left, rawRect.top, rawRect.width, rawRect.height);
        });
      });
      var targetElement = getAnchorSelection(win, anchorInfo).bind(function (sel) {
        return isElement$2(sel.start) ? Optional.some(sel.start) : parentNode(sel.start);
      });
      var elem = targetElement.getOr(component.element);
      return calcNewAnchor(selectionBox, rootPoint, anchorInfo, origin, elem);
    };
    var SelectionAnchor = [
      option('getSelection'),
      required$1('root'),
      option('bubble'),
      schema$y(),
      defaulted('overrides', {}),
      defaulted('showAbove', false),
      output$1('placement', placement$1)
    ];

    var labelPrefix$1 = 'link-layout';
    var eastX = function (anchor) {
      return anchor.x + anchor.width;
    };
    var westX = function (anchor, element) {
      return anchor.x - element.width;
    };
    var northY$1 = function (anchor, element) {
      return anchor.y - element.height + anchor.height;
    };
    var southY$1 = function (anchor) {
      return anchor.y;
    };
    var southeast$1 = function (anchor, element, bubbles) {
      return nu$6(eastX(anchor), southY$1(anchor), bubbles.southeast(), southeast$3(), 'southeast', boundsRestriction(anchor, {
        left: 0,
        top: 2
      }), labelPrefix$1);
    };
    var southwest$1 = function (anchor, element, bubbles) {
      return nu$6(westX(anchor, element), southY$1(anchor), bubbles.southwest(), southwest$3(), 'southwest', boundsRestriction(anchor, {
        right: 1,
        top: 2
      }), labelPrefix$1);
    };
    var northeast$1 = function (anchor, element, bubbles) {
      return nu$6(eastX(anchor), northY$1(anchor, element), bubbles.northeast(), northeast$3(), 'northeast', boundsRestriction(anchor, {
        left: 0,
        bottom: 3
      }), labelPrefix$1);
    };
    var northwest$1 = function (anchor, element, bubbles) {
      return nu$6(westX(anchor, element), northY$1(anchor, element), bubbles.northwest(), northwest$3(), 'northwest', boundsRestriction(anchor, {
        right: 1,
        bottom: 3
      }), labelPrefix$1);
    };
    var all = function () {
      return [
        southeast$1,
        southwest$1,
        northeast$1,
        northwest$1
      ];
    };
    var allRtl = function () {
      return [
        southwest$1,
        southeast$1,
        northwest$1,
        northeast$1
      ];
    };

    var placement = function (component, submenuInfo, origin) {
      var anchorBox = toBox(origin, submenuInfo.item.element);
      var layouts = get$4(component.element, submenuInfo, all(), allRtl(), all(), allRtl(), Optional.none());
      return Optional.some(nu$4({
        anchorBox: anchorBox,
        bubble: fallback(),
        overrides: submenuInfo.overrides,
        layouts: layouts,
        placer: Optional.none()
      }));
    };
    var SubmenuAnchor = [
      required$1('item'),
      schema$y(),
      defaulted('overrides', {}),
      output$1('placement', placement)
    ];

    var AnchorSchema = choose$1('type', {
      selection: SelectionAnchor,
      node: NodeAnchor,
      hotspot: HotspotAnchor,
      submenu: SubmenuAnchor,
      makeshift: MakeshiftAnchor
    });

    var TransitionSchema = [
      requiredArrayOf('classes', string),
      defaultedStringEnum('mode', 'all', [
        'all',
        'layout',
        'placement'
      ])
    ];
    var PositionSchema = [
      defaulted('useFixed', never),
      option('getBounds')
    ];
    var PlacementSchema = [
      requiredOf('anchor', AnchorSchema),
      optionObjOf('transition', TransitionSchema)
    ];

    var getFixedOrigin = function () {
      var html = document.documentElement;
      return fixed$1(0, 0, html.clientWidth, html.clientHeight);
    };
    var getRelativeOrigin = function (component) {
      var position = absolute$3(component.element);
      var bounds = component.element.dom.getBoundingClientRect();
      return relative$1(position.left, position.top, bounds.width, bounds.height);
    };
    var place = function (component, origin, anchoring, getBounds, placee, lastPlace, transition) {
      var anchor = box(anchoring.anchorBox, origin);
      return simple(anchor, placee.element, anchoring.bubble, anchoring.layouts, lastPlace, getBounds, anchoring.overrides, transition);
    };
    var position$1 = function (component, posConfig, posState, placee, placementSpec) {
      positionWithin(component, posConfig, posState, placee, placementSpec, Optional.none());
    };
    var positionWithin = function (component, posConfig, posState, placee, placementSpec, boxElement) {
      var boundsBox = boxElement.map(box$1);
      return positionWithinBounds(component, posConfig, posState, placee, placementSpec, boundsBox);
    };
    var positionWithinBounds = function (component, posConfig, posState, placee, placementSpec, bounds) {
      var placeeDetail = asRawOrDie$1('placement.info', objOf(PlacementSchema), placementSpec);
      var anchorage = placeeDetail.anchor;
      var element = placee.element;
      var placeeState = posState.get(placee.uid);
      preserve$1(function () {
        set$6(element, 'position', 'fixed');
        var oldVisibility = getRaw(element, 'visibility');
        set$6(element, 'visibility', 'hidden');
        var origin = posConfig.useFixed() ? getFixedOrigin() : getRelativeOrigin(component);
        var placer = anchorage.placement;
        var getBounds = bounds.map(constant$1).or(posConfig.getBounds);
        placer(component, anchorage, origin).each(function (anchoring) {
          var doPlace = anchoring.placer.getOr(place);
          var newState = doPlace(component, origin, anchoring, getBounds, placee, placeeState, placeeDetail.transition);
          posState.set(placee.uid, newState);
        });
        oldVisibility.fold(function () {
          remove$1(element, 'visibility');
        }, function (vis) {
          set$6(element, 'visibility', vis);
        });
        if (getRaw(element, 'left').isNone() && getRaw(element, 'top').isNone() && getRaw(element, 'right').isNone() && getRaw(element, 'bottom').isNone() && is(getRaw(element, 'position'), 'fixed')) {
          remove$1(element, 'position');
        }
      }, element);
    };
    var getMode = function (component, pConfig, _pState) {
      return pConfig.useFixed() ? 'fixed' : 'absolute';
    };
    var reset$1 = function (component, pConfig, posState, placee) {
      var element = placee.element;
      each$1([
        'position',
        'left',
        'right',
        'top',
        'bottom'
      ], function (prop) {
        return remove$1(element, prop);
      });
      reset$2(element);
      posState.clear(placee.uid);
    };

    var PositionApis = /*#__PURE__*/Object.freeze({
        __proto__: null,
        position: position$1,
        positionWithin: positionWithin,
        positionWithinBounds: positionWithinBounds,
        getMode: getMode,
        reset: reset$1
    });

    var init$g = function () {
      var state = {};
      var set = function (id, data) {
        state[id] = data;
      };
      var get = function (id) {
        return get$e(state, id);
      };
      var clear = function (id) {
        if (isNonNullable(id)) {
          delete state[id];
        } else {
          state = {};
        }
      };
      return nu$8({
        readState: function () {
          return state;
        },
        clear: clear,
        set: set,
        get: get
      });
    };

    var PositioningState = /*#__PURE__*/Object.freeze({
        __proto__: null,
        init: init$g
    });

    var Positioning = create$7({
      fields: PositionSchema,
      name: 'positioning',
      active: ActivePosition,
      apis: PositionApis,
      state: PositioningState
    });

    var fireDetaching = function (component) {
      emit(component, detachedFromDom());
      var children = component.components();
      each$1(children, fireDetaching);
    };
    var fireAttaching = function (component) {
      var children = component.components();
      each$1(children, fireAttaching);
      emit(component, attachedToDom());
    };
    var attach$1 = function (parent, child) {
      append$2(parent.element, child.element);
    };
    var detachChildren$1 = function (component) {
      each$1(component.components(), function (childComp) {
        return remove$7(childComp.element);
      });
      empty(component.element);
      component.syncComponents();
    };
    var replaceChildren = function (component, newChildren) {
      var subs = component.components();
      detachChildren$1(component);
      var deleted = difference(subs, newChildren);
      each$1(deleted, function (comp) {
        fireDetaching(comp);
        component.getSystem().removeFromWorld(comp);
      });
      each$1(newChildren, function (childComp) {
        if (!childComp.getSystem().isConnected()) {
          component.getSystem().addToWorld(childComp);
          attach$1(component, childComp);
          if (inBody(component.element)) {
            fireAttaching(childComp);
          }
        } else {
          attach$1(component, childComp);
        }
        component.syncComponents();
      });
    };

    var attach = function (parent, child) {
      attachWith(parent, child, append$2);
    };
    var attachWith = function (parent, child, insertion) {
      parent.getSystem().addToWorld(child);
      insertion(parent.element, child.element);
      if (inBody(parent.element)) {
        fireAttaching(child);
      }
      parent.syncComponents();
    };
    var doDetach = function (component) {
      fireDetaching(component);
      remove$7(component.element);
      component.getSystem().removeFromWorld(component);
    };
    var detach = function (component) {
      var parent$1 = parent(component.element).bind(function (p) {
        return component.getSystem().getByDom(p).toOptional();
      });
      doDetach(component);
      parent$1.each(function (p) {
        p.syncComponents();
      });
    };
    var detachChildren = function (component) {
      var subs = component.components();
      each$1(subs, doDetach);
      empty(component.element);
      component.syncComponents();
    };
    var attachSystem = function (element, guiSystem) {
      attachSystemWith(element, guiSystem, append$2);
    };
    var attachSystemAfter = function (element, guiSystem) {
      attachSystemWith(element, guiSystem, after$2);
    };
    var attachSystemWith = function (element, guiSystem, inserter) {
      inserter(element, guiSystem.element);
      var children$1 = children(guiSystem.element);
      each$1(children$1, function (child) {
        guiSystem.getByDom(child).each(fireAttaching);
      });
    };
    var detachSystem = function (guiSystem) {
      var children$1 = children(guiSystem.element);
      each$1(children$1, function (child) {
        guiSystem.getByDom(child).each(fireDetaching);
      });
      remove$7(guiSystem.element);
    };

    var rebuild = function (sandbox, sConfig, sState, data) {
      sState.get().each(function (_data) {
        detachChildren(sandbox);
      });
      var point = sConfig.getAttachPoint(sandbox);
      attach(point, sandbox);
      var built = sandbox.getSystem().build(data);
      attach(sandbox, built);
      sState.set(built);
      return built;
    };
    var open$1 = function (sandbox, sConfig, sState, data) {
      var newState = rebuild(sandbox, sConfig, sState, data);
      sConfig.onOpen(sandbox, newState);
      return newState;
    };
    var setContent = function (sandbox, sConfig, sState, data) {
      return sState.get().map(function () {
        return rebuild(sandbox, sConfig, sState, data);
      });
    };
    var openWhileCloaked = function (sandbox, sConfig, sState, data, transaction) {
      cloak(sandbox, sConfig);
      open$1(sandbox, sConfig, sState, data);
      transaction();
      decloak(sandbox, sConfig);
    };
    var close$1 = function (sandbox, sConfig, sState) {
      sState.get().each(function (data) {
        detachChildren(sandbox);
        detach(sandbox);
        sConfig.onClose(sandbox, data);
        sState.clear();
      });
    };
    var isOpen$1 = function (_sandbox, _sConfig, sState) {
      return sState.isOpen();
    };
    var isPartOf = function (sandbox, sConfig, sState, queryElem) {
      return isOpen$1(sandbox, sConfig, sState) && sState.get().exists(function (data) {
        return sConfig.isPartOf(sandbox, data, queryElem);
      });
    };
    var getState$2 = function (_sandbox, _sConfig, sState) {
      return sState.get();
    };
    var store = function (sandbox, cssKey, attr, newValue) {
      getRaw(sandbox.element, cssKey).fold(function () {
        remove$6(sandbox.element, attr);
      }, function (v) {
        set$7(sandbox.element, attr, v);
      });
      set$6(sandbox.element, cssKey, newValue);
    };
    var restore = function (sandbox, cssKey, attr) {
      getOpt(sandbox.element, attr).fold(function () {
        return remove$1(sandbox.element, cssKey);
      }, function (oldValue) {
        return set$6(sandbox.element, cssKey, oldValue);
      });
    };
    var cloak = function (sandbox, sConfig, _sState) {
      var sink = sConfig.getAttachPoint(sandbox);
      set$6(sandbox.element, 'position', Positioning.getMode(sink));
      store(sandbox, 'visibility', sConfig.cloakVisibilityAttr, 'hidden');
    };
    var hasPosition = function (element) {
      return exists([
        'top',
        'left',
        'right',
        'bottom'
      ], function (pos) {
        return getRaw(element, pos).isSome();
      });
    };
    var decloak = function (sandbox, sConfig, _sState) {
      if (!hasPosition(sandbox.element)) {
        remove$1(sandbox.element, 'position');
      }
      restore(sandbox, 'visibility', sConfig.cloakVisibilityAttr);
    };

    var SandboxApis = /*#__PURE__*/Object.freeze({
        __proto__: null,
        cloak: cloak,
        decloak: decloak,
        open: open$1,
        openWhileCloaked: openWhileCloaked,
        close: close$1,
        isOpen: isOpen$1,
        isPartOf: isPartOf,
        getState: getState$2,
        setContent: setContent
    });

    var events$g = function (sandboxConfig, sandboxState) {
      return derive$2([run$1(sandboxClose(), function (sandbox, _simulatedEvent) {
          close$1(sandbox, sandboxConfig, sandboxState);
        })]);
    };

    var ActiveSandbox = /*#__PURE__*/Object.freeze({
        __proto__: null,
        events: events$g
    });

    var SandboxSchema = [
      onHandler('onOpen'),
      onHandler('onClose'),
      required$1('isPartOf'),
      required$1('getAttachPoint'),
      defaulted('cloakVisibilityAttr', 'data-precloak-visibility')
    ];

    var init$f = function () {
      var contents = value$1();
      var readState = constant$1('not-implemented');
      return nu$8({
        readState: readState,
        isOpen: contents.isSet,
        clear: contents.clear,
        set: contents.set,
        get: contents.get
      });
    };

    var SandboxState = /*#__PURE__*/Object.freeze({
        __proto__: null,
        init: init$f
    });

    var Sandboxing = create$7({
      fields: SandboxSchema,
      name: 'sandboxing',
      active: ActiveSandbox,
      apis: SandboxApis,
      state: SandboxState
    });

    var dismissPopups = constant$1('dismiss.popups');
    var repositionPopups = constant$1('reposition.popups');
    var mouseReleased = constant$1('mouse.released');

    var schema$x = objOfOnly([
      defaulted('isExtraPart', never),
      optionObjOf('fireEventInstead', [defaulted('event', dismissRequested())])
    ]);
    var receivingChannel$1 = function (rawSpec) {
      var _a;
      var detail = asRawOrDie$1('Dismissal', schema$x, rawSpec);
      return _a = {}, _a[dismissPopups()] = {
        schema: objOfOnly([required$1('target')]),
        onReceive: function (sandbox, data) {
          if (Sandboxing.isOpen(sandbox)) {
            var isPart = Sandboxing.isPartOf(sandbox, data.target) || detail.isExtraPart(sandbox, data.target);
            if (!isPart) {
              detail.fireEventInstead.fold(function () {
                return Sandboxing.close(sandbox);
              }, function (fe) {
                return emit(sandbox, fe.event);
              });
            }
          }
        }
      }, _a;
    };

    var schema$w = objOfOnly([
      optionObjOf('fireEventInstead', [defaulted('event', repositionRequested())]),
      requiredFunction('doReposition')
    ]);
    var receivingChannel = function (rawSpec) {
      var _a;
      var detail = asRawOrDie$1('Reposition', schema$w, rawSpec);
      return _a = {}, _a[repositionPopups()] = {
        onReceive: function (sandbox) {
          if (Sandboxing.isOpen(sandbox)) {
            detail.fireEventInstead.fold(function () {
              return detail.doReposition(sandbox);
            }, function (fe) {
              return emit(sandbox, fe.event);
            });
          }
        }
      }, _a;
    };

    var onLoad$5 = function (component, repConfig, repState) {
      repConfig.store.manager.onLoad(component, repConfig, repState);
    };
    var onUnload$2 = function (component, repConfig, repState) {
      repConfig.store.manager.onUnload(component, repConfig, repState);
    };
    var setValue$3 = function (component, repConfig, repState, data) {
      repConfig.store.manager.setValue(component, repConfig, repState, data);
    };
    var getValue$3 = function (component, repConfig, repState) {
      return repConfig.store.manager.getValue(component, repConfig, repState);
    };
    var getState$1 = function (component, repConfig, repState) {
      return repState;
    };

    var RepresentApis = /*#__PURE__*/Object.freeze({
        __proto__: null,
        onLoad: onLoad$5,
        onUnload: onUnload$2,
        setValue: setValue$3,
        getValue: getValue$3,
        getState: getState$1
    });

    var events$f = function (repConfig, repState) {
      var es = repConfig.resetOnDom ? [
        runOnAttached(function (comp, _se) {
          onLoad$5(comp, repConfig, repState);
        }),
        runOnDetached(function (comp, _se) {
          onUnload$2(comp, repConfig, repState);
        })
      ] : [loadEvent(repConfig, repState, onLoad$5)];
      return derive$2(es);
    };

    var ActiveRepresenting = /*#__PURE__*/Object.freeze({
        __proto__: null,
        events: events$f
    });

    var memory$1 = function () {
      var data = Cell(null);
      var readState = function () {
        return {
          mode: 'memory',
          value: data.get()
        };
      };
      var isNotSet = function () {
        return data.get() === null;
      };
      var clear = function () {
        data.set(null);
      };
      return nu$8({
        set: data.set,
        get: data.get,
        isNotSet: isNotSet,
        clear: clear,
        readState: readState
      });
    };
    var manual = function () {
      var readState = noop;
      return nu$8({ readState: readState });
    };
    var dataset = function () {
      var dataByValue = Cell({});
      var dataByText = Cell({});
      var readState = function () {
        return {
          mode: 'dataset',
          dataByValue: dataByValue.get(),
          dataByText: dataByText.get()
        };
      };
      var clear = function () {
        dataByValue.set({});
        dataByText.set({});
      };
      var lookup = function (itemString) {
        return get$e(dataByValue.get(), itemString).orThunk(function () {
          return get$e(dataByText.get(), itemString);
        });
      };
      var update = function (items) {
        var currentDataByValue = dataByValue.get();
        var currentDataByText = dataByText.get();
        var newDataByValue = {};
        var newDataByText = {};
        each$1(items, function (item) {
          newDataByValue[item.value] = item;
          get$e(item, 'meta').each(function (meta) {
            get$e(meta, 'text').each(function (text) {
              newDataByText[text] = item;
            });
          });
        });
        dataByValue.set(__assign(__assign({}, currentDataByValue), newDataByValue));
        dataByText.set(__assign(__assign({}, currentDataByText), newDataByText));
      };
      return nu$8({
        readState: readState,
        lookup: lookup,
        update: update,
        clear: clear
      });
    };
    var init$e = function (spec) {
      return spec.store.manager.state(spec);
    };

    var RepresentState = /*#__PURE__*/Object.freeze({
        __proto__: null,
        memory: memory$1,
        dataset: dataset,
        manual: manual,
        init: init$e
    });

    var setValue$2 = function (component, repConfig, repState, data) {
      var store = repConfig.store;
      repState.update([data]);
      store.setValue(component, data);
      repConfig.onSetValue(component, data);
    };
    var getValue$2 = function (component, repConfig, repState) {
      var store = repConfig.store;
      var key = store.getDataKey(component);
      return repState.lookup(key).getOrThunk(function () {
        return store.getFallbackEntry(key);
      });
    };
    var onLoad$4 = function (component, repConfig, repState) {
      var store = repConfig.store;
      store.initialValue.each(function (data) {
        setValue$2(component, repConfig, repState, data);
      });
    };
    var onUnload$1 = function (component, repConfig, repState) {
      repState.clear();
    };
    var DatasetStore = [
      option('initialValue'),
      required$1('getFallbackEntry'),
      required$1('getDataKey'),
      required$1('setValue'),
      output$1('manager', {
        setValue: setValue$2,
        getValue: getValue$2,
        onLoad: onLoad$4,
        onUnload: onUnload$1,
        state: dataset
      })
    ];

    var getValue$1 = function (component, repConfig, _repState) {
      return repConfig.store.getValue(component);
    };
    var setValue$1 = function (component, repConfig, _repState, data) {
      repConfig.store.setValue(component, data);
      repConfig.onSetValue(component, data);
    };
    var onLoad$3 = function (component, repConfig, _repState) {
      repConfig.store.initialValue.each(function (data) {
        repConfig.store.setValue(component, data);
      });
    };
    var ManualStore = [
      required$1('getValue'),
      defaulted('setValue', noop),
      option('initialValue'),
      output$1('manager', {
        setValue: setValue$1,
        getValue: getValue$1,
        onLoad: onLoad$3,
        onUnload: noop,
        state: NoState.init
      })
    ];

    var setValue = function (component, repConfig, repState, data) {
      repState.set(data);
      repConfig.onSetValue(component, data);
    };
    var getValue = function (component, repConfig, repState) {
      return repState.get();
    };
    var onLoad$2 = function (component, repConfig, repState) {
      repConfig.store.initialValue.each(function (initVal) {
        if (repState.isNotSet()) {
          repState.set(initVal);
        }
      });
    };
    var onUnload = function (component, repConfig, repState) {
      repState.clear();
    };
    var MemoryStore = [
      option('initialValue'),
      output$1('manager', {
        setValue: setValue,
        getValue: getValue,
        onLoad: onLoad$2,
        onUnload: onUnload,
        state: memory$1
      })
    ];

    var RepresentSchema = [
      defaultedOf('store', { mode: 'memory' }, choose$1('mode', {
        memory: MemoryStore,
        manual: ManualStore,
        dataset: DatasetStore
      })),
      onHandler('onSetValue'),
      defaulted('resetOnDom', false)
    ];

    var Representing = create$7({
      fields: RepresentSchema,
      name: 'representing',
      active: ActiveRepresenting,
      apis: RepresentApis,
      extra: {
        setValueFrom: function (component, source) {
          var value = Representing.getValue(source);
          Representing.setValue(component, value);
        }
      },
      state: RepresentState
    });

    var field = function (name, forbidden) {
      return defaultedObjOf(name, {}, map$2(forbidden, function (f) {
        return forbid(f.name(), 'Cannot configure ' + f.name() + ' for ' + name);
      }).concat([customField('dump', identity$1)]));
    };
    var get$2 = function (data) {
      return data.dump;
    };
    var augment = function (data, original) {
      return __assign(__assign({}, data.dump), derive$1(original));
    };
    var SketchBehaviours = {
      field: field,
      augment: augment,
      get: get$2
    };

    var _placeholder = 'placeholder';
    var adt$3 = Adt.generate([
      {
        single: [
          'required',
          'valueThunk'
        ]
      },
      {
        multiple: [
          'required',
          'valueThunks'
        ]
      }
    ]);
    var isSubstituted = function (spec) {
      return has$2(spec, 'uiType');
    };
    var subPlaceholder = function (owner, detail, compSpec, placeholders) {
      if (owner.exists(function (o) {
          return o !== compSpec.owner;
        })) {
        return adt$3.single(true, constant$1(compSpec));
      }
      return get$e(placeholders, compSpec.name).fold(function () {
        throw new Error('Unknown placeholder component: ' + compSpec.name + '\nKnown: [' + keys(placeholders) + ']\nNamespace: ' + owner.getOr('none') + '\nSpec: ' + JSON.stringify(compSpec, null, 2));
      }, function (newSpec) {
        return newSpec.replace();
      });
    };
    var scan = function (owner, detail, compSpec, placeholders) {
      if (isSubstituted(compSpec) && compSpec.uiType === _placeholder) {
        return subPlaceholder(owner, detail, compSpec, placeholders);
      } else {
        return adt$3.single(false, constant$1(compSpec));
      }
    };
    var substitute = function (owner, detail, compSpec, placeholders) {
      var base = scan(owner, detail, compSpec, placeholders);
      return base.fold(function (req, valueThunk) {
        var value = isSubstituted(compSpec) ? valueThunk(detail, compSpec.config, compSpec.validated) : valueThunk(detail);
        var childSpecs = get$e(value, 'components').getOr([]);
        var substituted = bind$3(childSpecs, function (c) {
          return substitute(owner, detail, c, placeholders);
        });
        return [__assign(__assign({}, value), { components: substituted })];
      }, function (req, valuesThunk) {
        if (isSubstituted(compSpec)) {
          var values = valuesThunk(detail, compSpec.config, compSpec.validated);
          var preprocessor = compSpec.validated.preprocess.getOr(identity$1);
          return preprocessor(values);
        } else {
          return valuesThunk(detail);
        }
      });
    };
    var substituteAll = function (owner, detail, components, placeholders) {
      return bind$3(components, function (c) {
        return substitute(owner, detail, c, placeholders);
      });
    };
    var oneReplace = function (label, replacements) {
      var called = false;
      var used = function () {
        return called;
      };
      var replace = function () {
        if (called) {
          throw new Error('Trying to use the same placeholder more than once: ' + label);
        }
        called = true;
        return replacements;
      };
      var required = function () {
        return replacements.fold(function (req, _) {
          return req;
        }, function (req, _) {
          return req;
        });
      };
      return {
        name: constant$1(label),
        required: required,
        used: used,
        replace: replace
      };
    };
    var substitutePlaces = function (owner, detail, components, placeholders) {
      var ps = map(placeholders, function (ph, name) {
        return oneReplace(name, ph);
      });
      var outcome = substituteAll(owner, detail, components, ps);
      each(ps, function (p) {
        if (p.used() === false && p.required()) {
          throw new Error('Placeholder: ' + p.name() + ' was not found in components list\nNamespace: ' + owner.getOr('none') + '\nComponents: ' + JSON.stringify(detail.components, null, 2));
        }
      });
      return outcome;
    };
    var single$2 = adt$3.single;
    var multiple = adt$3.multiple;
    var placeholder = constant$1(_placeholder);

    var adt$2 = Adt.generate([
      { required: ['data'] },
      { external: ['data'] },
      { optional: ['data'] },
      { group: ['data'] }
    ]);
    var fFactory = defaulted('factory', { sketch: identity$1 });
    var fSchema = defaulted('schema', []);
    var fName = required$1('name');
    var fPname = field$1('pname', 'pname', defaultedThunk(function (typeSpec) {
      return '<alloy.' + generate$6(typeSpec.name) + '>';
    }), anyValue());
    var fGroupSchema = customField('schema', function () {
      return [option('preprocess')];
    });
    var fDefaults = defaulted('defaults', constant$1({}));
    var fOverrides = defaulted('overrides', constant$1({}));
    var requiredSpec = objOf([
      fFactory,
      fSchema,
      fName,
      fPname,
      fDefaults,
      fOverrides
    ]);
    var externalSpec = objOf([
      fFactory,
      fSchema,
      fName,
      fDefaults,
      fOverrides
    ]);
    var optionalSpec = objOf([
      fFactory,
      fSchema,
      fName,
      fPname,
      fDefaults,
      fOverrides
    ]);
    var groupSpec = objOf([
      fFactory,
      fGroupSchema,
      fName,
      required$1('unit'),
      fPname,
      fDefaults,
      fOverrides
    ]);
    var asNamedPart = function (part) {
      return part.fold(Optional.some, Optional.none, Optional.some, Optional.some);
    };
    var name$1 = function (part) {
      var get = function (data) {
        return data.name;
      };
      return part.fold(get, get, get, get);
    };
    var asCommon = function (part) {
      return part.fold(identity$1, identity$1, identity$1, identity$1);
    };
    var convert = function (adtConstructor, partSchema) {
      return function (spec) {
        var data = asRawOrDie$1('Converting part type', partSchema, spec);
        return adtConstructor(data);
      };
    };
    var required = convert(adt$2.required, requiredSpec);
    var external$1 = convert(adt$2.external, externalSpec);
    var optional = convert(adt$2.optional, optionalSpec);
    var group = convert(adt$2.group, groupSpec);
    var original = constant$1('entirety');

    var PartType = /*#__PURE__*/Object.freeze({
        __proto__: null,
        required: required,
        external: external$1,
        optional: optional,
        group: group,
        asNamedPart: asNamedPart,
        name: name$1,
        asCommon: asCommon,
        original: original
    });

    var combine = function (detail, data, partSpec, partValidated) {
      return deepMerge(data.defaults(detail, partSpec, partValidated), partSpec, { uid: detail.partUids[data.name] }, data.overrides(detail, partSpec, partValidated));
    };
    var subs = function (owner, detail, parts) {
      var internals = {};
      var externals = {};
      each$1(parts, function (part) {
        part.fold(function (data) {
          internals[data.pname] = single$2(true, function (detail, partSpec, partValidated) {
            return data.factory.sketch(combine(detail, data, partSpec, partValidated));
          });
        }, function (data) {
          var partSpec = detail.parts[data.name];
          externals[data.name] = constant$1(data.factory.sketch(combine(detail, data, partSpec[original()]), partSpec));
        }, function (data) {
          internals[data.pname] = single$2(false, function (detail, partSpec, partValidated) {
            return data.factory.sketch(combine(detail, data, partSpec, partValidated));
          });
        }, function (data) {
          internals[data.pname] = multiple(true, function (detail, _partSpec, _partValidated) {
            var units = detail[data.name];
            return map$2(units, function (u) {
              return data.factory.sketch(deepMerge(data.defaults(detail, u, _partValidated), u, data.overrides(detail, u)));
            });
          });
        });
      });
      return {
        internals: constant$1(internals),
        externals: constant$1(externals)
      };
    };

    var generate$3 = function (owner, parts) {
      var r = {};
      each$1(parts, function (part) {
        asNamedPart(part).each(function (np) {
          var g = doGenerateOne(owner, np.pname);
          r[np.name] = function (config) {
            var validated = asRawOrDie$1('Part: ' + np.name + ' in ' + owner, objOf(np.schema), config);
            return __assign(__assign({}, g), {
              config: config,
              validated: validated
            });
          };
        });
      });
      return r;
    };
    var doGenerateOne = function (owner, pname) {
      return {
        uiType: placeholder(),
        owner: owner,
        name: pname
      };
    };
    var generateOne$1 = function (owner, pname, config) {
      return {
        uiType: placeholder(),
        owner: owner,
        name: pname,
        config: config,
        validated: {}
      };
    };
    var schemas = function (parts) {
      return bind$3(parts, function (part) {
        return part.fold(Optional.none, Optional.some, Optional.none, Optional.none).map(function (data) {
          return requiredObjOf(data.name, data.schema.concat([snapshot(original())]));
        }).toArray();
      });
    };
    var names = function (parts) {
      return map$2(parts, name$1);
    };
    var substitutes = function (owner, detail, parts) {
      return subs(owner, detail, parts);
    };
    var components$1 = function (owner, detail, internals) {
      return substitutePlaces(Optional.some(owner), detail, detail.components, internals);
    };
    var getPart = function (component, detail, partKey) {
      var uid = detail.partUids[partKey];
      return component.getSystem().getByUid(uid).toOptional();
    };
    var getPartOrDie = function (component, detail, partKey) {
      return getPart(component, detail, partKey).getOrDie('Could not find part: ' + partKey);
    };
    var getParts = function (component, detail, partKeys) {
      var r = {};
      var uids = detail.partUids;
      var system = component.getSystem();
      each$1(partKeys, function (pk) {
        r[pk] = constant$1(system.getByUid(uids[pk]));
      });
      return r;
    };
    var getAllParts = function (component, detail) {
      var system = component.getSystem();
      return map(detail.partUids, function (pUid, _k) {
        return constant$1(system.getByUid(pUid));
      });
    };
    var getAllPartNames = function (detail) {
      return keys(detail.partUids);
    };
    var getPartsOrDie = function (component, detail, partKeys) {
      var r = {};
      var uids = detail.partUids;
      var system = component.getSystem();
      each$1(partKeys, function (pk) {
        r[pk] = constant$1(system.getByUid(uids[pk]).getOrDie());
      });
      return r;
    };
    var defaultUids = function (baseUid, partTypes) {
      var partNames = names(partTypes);
      return wrapAll(map$2(partNames, function (pn) {
        return {
          key: pn,
          value: baseUid + '-' + pn
        };
      }));
    };
    var defaultUidsSchema = function (partTypes) {
      return field$1('partUids', 'partUids', mergeWithThunk(function (spec) {
        return defaultUids(spec.uid, partTypes);
      }), anyValue());
    };

    var AlloyParts = /*#__PURE__*/Object.freeze({
        __proto__: null,
        generate: generate$3,
        generateOne: generateOne$1,
        schemas: schemas,
        names: names,
        substitutes: substitutes,
        components: components$1,
        defaultUids: defaultUids,
        defaultUidsSchema: defaultUidsSchema,
        getAllParts: getAllParts,
        getAllPartNames: getAllPartNames,
        getPart: getPart,
        getPartOrDie: getPartOrDie,
        getParts: getParts,
        getPartsOrDie: getPartsOrDie
    });

    var base = function (partSchemas, partUidsSchemas) {
      var ps = partSchemas.length > 0 ? [requiredObjOf('parts', partSchemas)] : [];
      return ps.concat([
        required$1('uid'),
        defaulted('dom', {}),
        defaulted('components', []),
        snapshot('originalSpec'),
        defaulted('debug.sketcher', {})
      ]).concat(partUidsSchemas);
    };
    var asRawOrDie = function (label, schema, spec, partSchemas, partUidsSchemas) {
      var baseS = base(partSchemas, partUidsSchemas);
      return asRawOrDie$1(label + ' [SpecSchema]', objOfOnly(baseS.concat(schema)), spec);
    };

    var single$1 = function (owner, schema, factory, spec) {
      var specWithUid = supplyUid(spec);
      var detail = asRawOrDie(owner, schema, specWithUid, [], []);
      return factory(detail, specWithUid);
    };
    var composite$1 = function (owner, schema, partTypes, factory, spec) {
      var specWithUid = supplyUid(spec);
      var partSchemas = schemas(partTypes);
      var partUidsSchema = defaultUidsSchema(partTypes);
      var detail = asRawOrDie(owner, schema, specWithUid, partSchemas, [partUidsSchema]);
      var subs = substitutes(owner, detail, partTypes);
      var components = components$1(owner, detail, subs.internals());
      return factory(detail, components, specWithUid, subs.externals());
    };
    var hasUid = function (spec) {
      return has$2(spec, 'uid');
    };
    var supplyUid = function (spec) {
      return hasUid(spec) ? spec : __assign(__assign({}, spec), { uid: generate$5('uid') });
    };

    var isSketchSpec = function (spec) {
      return spec.uid !== undefined;
    };
    var singleSchema = objOfOnly([
      required$1('name'),
      required$1('factory'),
      required$1('configFields'),
      defaulted('apis', {}),
      defaulted('extraApis', {})
    ]);
    var compositeSchema = objOfOnly([
      required$1('name'),
      required$1('factory'),
      required$1('configFields'),
      required$1('partFields'),
      defaulted('apis', {}),
      defaulted('extraApis', {})
    ]);
    var single = function (rawConfig) {
      var config = asRawOrDie$1('Sketcher for ' + rawConfig.name, singleSchema, rawConfig);
      var sketch = function (spec) {
        return single$1(config.name, config.configFields, config.factory, spec);
      };
      var apis = map(config.apis, makeApi);
      var extraApis = map(config.extraApis, function (f, k) {
        return markAsExtraApi(f, k);
      });
      return __assign(__assign({
        name: config.name,
        configFields: config.configFields,
        sketch: sketch
      }, apis), extraApis);
    };
    var composite = function (rawConfig) {
      var config = asRawOrDie$1('Sketcher for ' + rawConfig.name, compositeSchema, rawConfig);
      var sketch = function (spec) {
        return composite$1(config.name, config.configFields, config.partFields, config.factory, spec);
      };
      var parts = generate$3(config.name, config.partFields);
      var apis = map(config.apis, makeApi);
      var extraApis = map(config.extraApis, function (f, k) {
        return markAsExtraApi(f, k);
      });
      return __assign(__assign({
        name: config.name,
        partFields: config.partFields,
        configFields: config.configFields,
        sketch: sketch,
        parts: parts
      }, apis), extraApis);
    };

    var inside = function (target) {
      return name$2(target) === 'input' && get$c(target, 'type') !== 'radio' || name$2(target) === 'textarea';
    };

    var getCurrent = function (component, composeConfig, _composeState) {
      return composeConfig.find(component);
    };

    var ComposeApis = /*#__PURE__*/Object.freeze({
        __proto__: null,
        getCurrent: getCurrent
    });

    var ComposeSchema = [required$1('find')];

    var Composing = create$7({
      fields: ComposeSchema,
      name: 'composing',
      apis: ComposeApis
    });

    var nativeDisabled = [
      'input',
      'button',
      'textarea',
      'select'
    ];
    var onLoad$1 = function (component, disableConfig, disableState) {
      var f = disableConfig.disabled() ? disable$1 : enable$1;
      f(component, disableConfig);
    };
    var hasNative = function (component, config) {
      return config.useNative === true && contains$2(nativeDisabled, name$2(component.element));
    };
    var nativeIsDisabled = function (component) {
      return has$1(component.element, 'disabled');
    };
    var nativeDisable = function (component) {
      set$7(component.element, 'disabled', 'disabled');
    };
    var nativeEnable = function (component) {
      remove$6(component.element, 'disabled');
    };
    var ariaIsDisabled = function (component) {
      return get$c(component.element, 'aria-disabled') === 'true';
    };
    var ariaDisable = function (component) {
      set$7(component.element, 'aria-disabled', 'true');
    };
    var ariaEnable = function (component) {
      set$7(component.element, 'aria-disabled', 'false');
    };
    var disable$1 = function (component, disableConfig, _disableState) {
      disableConfig.disableClass.each(function (disableClass) {
        add$2(component.element, disableClass);
      });
      var f = hasNative(component, disableConfig) ? nativeDisable : ariaDisable;
      f(component);
      disableConfig.onDisabled(component);
    };
    var enable$1 = function (component, disableConfig, _disableState) {
      disableConfig.disableClass.each(function (disableClass) {
        remove$3(component.element, disableClass);
      });
      var f = hasNative(component, disableConfig) ? nativeEnable : ariaEnable;
      f(component);
      disableConfig.onEnabled(component);
    };
    var isDisabled = function (component, disableConfig) {
      return hasNative(component, disableConfig) ? nativeIsDisabled(component) : ariaIsDisabled(component);
    };
    var set$3 = function (component, disableConfig, disableState, disabled) {
      var f = disabled ? disable$1 : enable$1;
      f(component, disableConfig);
    };

    var DisableApis = /*#__PURE__*/Object.freeze({
        __proto__: null,
        enable: enable$1,
        disable: disable$1,
        isDisabled: isDisabled,
        onLoad: onLoad$1,
        set: set$3
    });

    var exhibit$5 = function (base, disableConfig) {
      return nu$7({ classes: disableConfig.disabled() ? disableConfig.disableClass.toArray() : [] });
    };
    var events$e = function (disableConfig, disableState) {
      return derive$2([
        abort(execute$5(), function (component, _simulatedEvent) {
          return isDisabled(component, disableConfig);
        }),
        loadEvent(disableConfig, disableState, onLoad$1)
      ]);
    };

    var ActiveDisable = /*#__PURE__*/Object.freeze({
        __proto__: null,
        exhibit: exhibit$5,
        events: events$e
    });

    var DisableSchema = [
      defaultedFunction('disabled', never),
      defaulted('useNative', true),
      option('disableClass'),
      onHandler('onDisabled'),
      onHandler('onEnabled')
    ];

    var Disabling = create$7({
      fields: DisableSchema,
      name: 'disabling',
      active: ActiveDisable,
      apis: DisableApis
    });

    var dehighlightAllExcept = function (component, hConfig, hState, skip) {
      var highlighted = descendants(component.element, '.' + hConfig.highlightClass);
      each$1(highlighted, function (h) {
        if (!exists(skip, function (skipComp) {
            return skipComp.element === h;
          })) {
          remove$3(h, hConfig.highlightClass);
          component.getSystem().getByDom(h).each(function (target) {
            hConfig.onDehighlight(component, target);
            emit(target, dehighlight$1());
          });
        }
      });
    };
    var dehighlightAll = function (component, hConfig, hState) {
      return dehighlightAllExcept(component, hConfig, hState, []);
    };
    var dehighlight = function (component, hConfig, hState, target) {
      if (isHighlighted(component, hConfig, hState, target)) {
        remove$3(target.element, hConfig.highlightClass);
        hConfig.onDehighlight(component, target);
        emit(target, dehighlight$1());
      }
    };
    var highlight = function (component, hConfig, hState, target) {
      dehighlightAllExcept(component, hConfig, hState, [target]);
      if (!isHighlighted(component, hConfig, hState, target)) {
        add$2(target.element, hConfig.highlightClass);
        hConfig.onHighlight(component, target);
        emit(target, highlight$1());
      }
    };
    var highlightFirst = function (component, hConfig, hState) {
      getFirst(component, hConfig).each(function (firstComp) {
        highlight(component, hConfig, hState, firstComp);
      });
    };
    var highlightLast = function (component, hConfig, hState) {
      getLast(component, hConfig).each(function (lastComp) {
        highlight(component, hConfig, hState, lastComp);
      });
    };
    var highlightAt = function (component, hConfig, hState, index) {
      getByIndex(component, hConfig, hState, index).fold(function (err) {
        throw err;
      }, function (firstComp) {
        highlight(component, hConfig, hState, firstComp);
      });
    };
    var highlightBy = function (component, hConfig, hState, predicate) {
      var candidates = getCandidates(component, hConfig);
      var targetComp = find$5(candidates, predicate);
      targetComp.each(function (c) {
        highlight(component, hConfig, hState, c);
      });
    };
    var isHighlighted = function (component, hConfig, hState, queryTarget) {
      return has(queryTarget.element, hConfig.highlightClass);
    };
    var getHighlighted = function (component, hConfig, _hState) {
      return descendant(component.element, '.' + hConfig.highlightClass).bind(function (e) {
        return component.getSystem().getByDom(e).toOptional();
      });
    };
    var getByIndex = function (component, hConfig, hState, index) {
      var items = descendants(component.element, '.' + hConfig.itemClass);
      return Optional.from(items[index]).fold(function () {
        return Result.error(new Error('No element found with index ' + index));
      }, component.getSystem().getByDom);
    };
    var getFirst = function (component, hConfig, _hState) {
      return descendant(component.element, '.' + hConfig.itemClass).bind(function (e) {
        return component.getSystem().getByDom(e).toOptional();
      });
    };
    var getLast = function (component, hConfig, _hState) {
      var items = descendants(component.element, '.' + hConfig.itemClass);
      var last = items.length > 0 ? Optional.some(items[items.length - 1]) : Optional.none();
      return last.bind(function (c) {
        return component.getSystem().getByDom(c).toOptional();
      });
    };
    var getDelta$2 = function (component, hConfig, hState, delta) {
      var items = descendants(component.element, '.' + hConfig.itemClass);
      var current = findIndex$1(items, function (item) {
        return has(item, hConfig.highlightClass);
      });
      return current.bind(function (selected) {
        var dest = cycleBy(selected, delta, 0, items.length - 1);
        return component.getSystem().getByDom(items[dest]).toOptional();
      });
    };
    var getPrevious = function (component, hConfig, hState) {
      return getDelta$2(component, hConfig, hState, -1);
    };
    var getNext = function (component, hConfig, hState) {
      return getDelta$2(component, hConfig, hState, +1);
    };
    var getCandidates = function (component, hConfig, _hState) {
      var items = descendants(component.element, '.' + hConfig.itemClass);
      return cat(map$2(items, function (i) {
        return component.getSystem().getByDom(i).toOptional();
      }));
    };

    var HighlightApis = /*#__PURE__*/Object.freeze({
        __proto__: null,
        dehighlightAll: dehighlightAll,
        dehighlight: dehighlight,
        highlight: highlight,
        highlightFirst: highlightFirst,
        highlightLast: highlightLast,
        highlightAt: highlightAt,
        highlightBy: highlightBy,
        isHighlighted: isHighlighted,
        getHighlighted: getHighlighted,
        getFirst: getFirst,
        getLast: getLast,
        getPrevious: getPrevious,
        getNext: getNext,
        getCandidates: getCandidates
    });

    var HighlightSchema = [
      required$1('highlightClass'),
      required$1('itemClass'),
      onHandler('onHighlight'),
      onHandler('onDehighlight')
    ];

    var Highlighting = create$7({
      fields: HighlightSchema,
      name: 'highlighting',
      apis: HighlightApis
    });

    var BACKSPACE = [8];
    var TAB = [9];
    var ENTER = [13];
    var ESCAPE = [27];
    var SPACE = [32];
    var LEFT = [37];
    var UP = [38];
    var RIGHT = [39];
    var DOWN = [40];

    var cyclePrev = function (values, index, predicate) {
      var before = reverse(values.slice(0, index));
      var after = reverse(values.slice(index + 1));
      return find$5(before.concat(after), predicate);
    };
    var tryPrev = function (values, index, predicate) {
      var before = reverse(values.slice(0, index));
      return find$5(before, predicate);
    };
    var cycleNext = function (values, index, predicate) {
      var before = values.slice(0, index);
      var after = values.slice(index + 1);
      return find$5(after.concat(before), predicate);
    };
    var tryNext = function (values, index, predicate) {
      var after = values.slice(index + 1);
      return find$5(after, predicate);
    };

    var inSet = function (keys) {
      return function (event) {
        var raw = event.raw;
        return contains$2(keys, raw.which);
      };
    };
    var and = function (preds) {
      return function (event) {
        return forall(preds, function (pred) {
          return pred(event);
        });
      };
    };
    var isShift = function (event) {
      var raw = event.raw;
      return raw.shiftKey === true;
    };
    var isControl = function (event) {
      var raw = event.raw;
      return raw.ctrlKey === true;
    };
    var isNotShift = not(isShift);

    var rule = function (matches, action) {
      return {
        matches: matches,
        classification: action
      };
    };
    var choose = function (transitions, event) {
      var transition = find$5(transitions, function (t) {
        return t.matches(event);
      });
      return transition.map(function (t) {
        return t.classification;
      });
    };

    var reportFocusShifting = function (component, prevFocus, newFocus) {
      var noChange = prevFocus.exists(function (p) {
        return newFocus.exists(function (n) {
          return eq(n, p);
        });
      });
      if (!noChange) {
        emitWith(component, focusShifted(), {
          prevFocus: prevFocus,
          newFocus: newFocus
        });
      }
    };
    var dom$2 = function () {
      var get = function (component) {
        return search(component.element);
      };
      var set = function (component, focusee) {
        var prevFocus = get(component);
        component.getSystem().triggerFocus(focusee, component.element);
        var newFocus = get(component);
        reportFocusShifting(component, prevFocus, newFocus);
      };
      return {
        get: get,
        set: set
      };
    };
    var highlights = function () {
      var get = function (component) {
        return Highlighting.getHighlighted(component).map(function (item) {
          return item.element;
        });
      };
      var set = function (component, element) {
        var prevFocus = get(component);
        component.getSystem().getByDom(element).fold(noop, function (item) {
          Highlighting.highlight(component, item);
        });
        var newFocus = get(component);
        reportFocusShifting(component, prevFocus, newFocus);
      };
      return {
        get: get,
        set: set
      };
    };

    var FocusInsideModes;
    (function (FocusInsideModes) {
      FocusInsideModes['OnFocusMode'] = 'onFocus';
      FocusInsideModes['OnEnterOrSpaceMode'] = 'onEnterOrSpace';
      FocusInsideModes['OnApiMode'] = 'onApi';
    }(FocusInsideModes || (FocusInsideModes = {})));

    var typical = function (infoSchema, stateInit, getKeydownRules, getKeyupRules, optFocusIn) {
      var schema = function () {
        return infoSchema.concat([
          defaulted('focusManager', dom$2()),
          defaultedOf('focusInside', 'onFocus', valueOf(function (val) {
            return contains$2([
              'onFocus',
              'onEnterOrSpace',
              'onApi'
            ], val) ? Result.value(val) : Result.error('Invalid value for focusInside');
          })),
          output$1('handler', me),
          output$1('state', stateInit),
          output$1('sendFocusIn', optFocusIn)
        ]);
      };
      var processKey = function (component, simulatedEvent, getRules, keyingConfig, keyingState) {
        var rules = getRules(component, simulatedEvent, keyingConfig, keyingState);
        return choose(rules, simulatedEvent.event).bind(function (rule) {
          return rule(component, simulatedEvent, keyingConfig, keyingState);
        });
      };
      var toEvents = function (keyingConfig, keyingState) {
        var onFocusHandler = keyingConfig.focusInside !== FocusInsideModes.OnFocusMode ? Optional.none() : optFocusIn(keyingConfig).map(function (focusIn) {
          return run$1(focus$4(), function (component, simulatedEvent) {
            focusIn(component, keyingConfig, keyingState);
            simulatedEvent.stop();
          });
        });
        var tryGoInsideComponent = function (component, simulatedEvent) {
          var isEnterOrSpace = inSet(SPACE.concat(ENTER))(simulatedEvent.event);
          if (keyingConfig.focusInside === FocusInsideModes.OnEnterOrSpaceMode && isEnterOrSpace && isSource(component, simulatedEvent)) {
            optFocusIn(keyingConfig).each(function (focusIn) {
              focusIn(component, keyingConfig, keyingState);
              simulatedEvent.stop();
            });
          }
        };
        var keyboardEvents = [
          run$1(keydown(), function (component, simulatedEvent) {
            processKey(component, simulatedEvent, getKeydownRules, keyingConfig, keyingState).fold(function () {
              tryGoInsideComponent(component, simulatedEvent);
            }, function (_) {
              simulatedEvent.stop();
            });
          }),
          run$1(keyup(), function (component, simulatedEvent) {
            processKey(component, simulatedEvent, getKeyupRules, keyingConfig, keyingState).each(function (_) {
              simulatedEvent.stop();
            });
          })
        ];
        return derive$2(onFocusHandler.toArray().concat(keyboardEvents));
      };
      var me = {
        schema: schema,
        processKey: processKey,
        toEvents: toEvents
      };
      return me;
    };

    var create$5 = function (cyclicField) {
      var schema = [
        option('onEscape'),
        option('onEnter'),
        defaulted('selector', '[data-alloy-tabstop="true"]:not(:disabled)'),
        defaulted('firstTabstop', 0),
        defaulted('useTabstopAt', always),
        option('visibilitySelector')
      ].concat([cyclicField]);
      var isVisible = function (tabbingConfig, element) {
        var target = tabbingConfig.visibilitySelector.bind(function (sel) {
          return closest$1(element, sel);
        }).getOr(element);
        return get$8(target) > 0;
      };
      var findInitial = function (component, tabbingConfig) {
        var tabstops = descendants(component.element, tabbingConfig.selector);
        var visibles = filter$2(tabstops, function (elem) {
          return isVisible(tabbingConfig, elem);
        });
        return Optional.from(visibles[tabbingConfig.firstTabstop]);
      };
      var findCurrent = function (component, tabbingConfig) {
        return tabbingConfig.focusManager.get(component).bind(function (elem) {
          return closest$1(elem, tabbingConfig.selector);
        });
      };
      var isTabstop = function (tabbingConfig, element) {
        return isVisible(tabbingConfig, element) && tabbingConfig.useTabstopAt(element);
      };
      var focusIn = function (component, tabbingConfig, _tabbingState) {
        findInitial(component, tabbingConfig).each(function (target) {
          tabbingConfig.focusManager.set(component, target);
        });
      };
      var goFromTabstop = function (component, tabstops, stopIndex, tabbingConfig, cycle) {
        return cycle(tabstops, stopIndex, function (elem) {
          return isTabstop(tabbingConfig, elem);
        }).fold(function () {
          return tabbingConfig.cyclic ? Optional.some(true) : Optional.none();
        }, function (target) {
          tabbingConfig.focusManager.set(component, target);
          return Optional.some(true);
        });
      };
      var go = function (component, _simulatedEvent, tabbingConfig, cycle) {
        var tabstops = descendants(component.element, tabbingConfig.selector);
        return findCurrent(component, tabbingConfig).bind(function (tabstop) {
          var optStopIndex = findIndex$1(tabstops, curry(eq, tabstop));
          return optStopIndex.bind(function (stopIndex) {
            return goFromTabstop(component, tabstops, stopIndex, tabbingConfig, cycle);
          });
        });
      };
      var goBackwards = function (component, simulatedEvent, tabbingConfig) {
        var navigate = tabbingConfig.cyclic ? cyclePrev : tryPrev;
        return go(component, simulatedEvent, tabbingConfig, navigate);
      };
      var goForwards = function (component, simulatedEvent, tabbingConfig) {
        var navigate = tabbingConfig.cyclic ? cycleNext : tryNext;
        return go(component, simulatedEvent, tabbingConfig, navigate);
      };
      var execute = function (component, simulatedEvent, tabbingConfig) {
        return tabbingConfig.onEnter.bind(function (f) {
          return f(component, simulatedEvent);
        });
      };
      var exit = function (component, simulatedEvent, tabbingConfig) {
        return tabbingConfig.onEscape.bind(function (f) {
          return f(component, simulatedEvent);
        });
      };
      var getKeydownRules = constant$1([
        rule(and([
          isShift,
          inSet(TAB)
        ]), goBackwards),
        rule(inSet(TAB), goForwards),
        rule(inSet(ESCAPE), exit),
        rule(and([
          isNotShift,
          inSet(ENTER)
        ]), execute)
      ]);
      var getKeyupRules = constant$1([]);
      return typical(schema, NoState.init, getKeydownRules, getKeyupRules, function () {
        return Optional.some(focusIn);
      });
    };

    var AcyclicType = create$5(customField('cyclic', never));

    var CyclicType = create$5(customField('cyclic', always));

    var doDefaultExecute = function (component, _simulatedEvent, focused) {
      dispatch(component, focused, execute$5());
      return Optional.some(true);
    };
    var defaultExecute = function (component, simulatedEvent, focused) {
      var isComplex = inside(focused) && inSet(SPACE)(simulatedEvent.event);
      return isComplex ? Optional.none() : doDefaultExecute(component, simulatedEvent, focused);
    };
    var stopEventForFirefox = function (_component, _simulatedEvent) {
      return Optional.some(true);
    };

    var schema$v = [
      defaulted('execute', defaultExecute),
      defaulted('useSpace', false),
      defaulted('useEnter', true),
      defaulted('useControlEnter', false),
      defaulted('useDown', false)
    ];
    var execute$4 = function (component, simulatedEvent, executeConfig) {
      return executeConfig.execute(component, simulatedEvent, component.element);
    };
    var getKeydownRules$5 = function (component, _simulatedEvent, executeConfig, _executeState) {
      var spaceExec = executeConfig.useSpace && !inside(component.element) ? SPACE : [];
      var enterExec = executeConfig.useEnter ? ENTER : [];
      var downExec = executeConfig.useDown ? DOWN : [];
      var execKeys = spaceExec.concat(enterExec).concat(downExec);
      return [rule(inSet(execKeys), execute$4)].concat(executeConfig.useControlEnter ? [rule(and([
          isControl,
          inSet(ENTER)
        ]), execute$4)] : []);
    };
    var getKeyupRules$5 = function (component, _simulatedEvent, executeConfig, _executeState) {
      return executeConfig.useSpace && !inside(component.element) ? [rule(inSet(SPACE), stopEventForFirefox)] : [];
    };
    var ExecutionType = typical(schema$v, NoState.init, getKeydownRules$5, getKeyupRules$5, function () {
      return Optional.none();
    });

    var flatgrid$1 = function () {
      var dimensions = value$1();
      var setGridSize = function (numRows, numColumns) {
        dimensions.set({
          numRows: numRows,
          numColumns: numColumns
        });
      };
      var getNumRows = function () {
        return dimensions.get().map(function (d) {
          return d.numRows;
        });
      };
      var getNumColumns = function () {
        return dimensions.get().map(function (d) {
          return d.numColumns;
        });
      };
      return nu$8({
        readState: function () {
          return dimensions.get().map(function (d) {
            return {
              numRows: String(d.numRows),
              numColumns: String(d.numColumns)
            };
          }).getOr({
            numRows: '?',
            numColumns: '?'
          });
        },
        setGridSize: setGridSize,
        getNumRows: getNumRows,
        getNumColumns: getNumColumns
      });
    };
    var init$d = function (spec) {
      return spec.state(spec);
    };

    var KeyingState = /*#__PURE__*/Object.freeze({
        __proto__: null,
        flatgrid: flatgrid$1,
        init: init$d
    });

    var useH = function (movement) {
      return function (component, simulatedEvent, config, state) {
        var move = movement(component.element);
        return use(move, component, simulatedEvent, config, state);
      };
    };
    var west$1 = function (moveLeft, moveRight) {
      var movement = onDirection(moveLeft, moveRight);
      return useH(movement);
    };
    var east$1 = function (moveLeft, moveRight) {
      var movement = onDirection(moveRight, moveLeft);
      return useH(movement);
    };
    var useV = function (move) {
      return function (component, simulatedEvent, config, state) {
        return use(move, component, simulatedEvent, config, state);
      };
    };
    var use = function (move, component, simulatedEvent, config, state) {
      var outcome = config.focusManager.get(component).bind(function (focused) {
        return move(component.element, focused, config, state);
      });
      return outcome.map(function (newFocus) {
        config.focusManager.set(component, newFocus);
        return true;
      });
    };
    var north$1 = useV;
    var south$1 = useV;
    var move$1 = useV;

    var isHidden$1 = function (dom) {
      return dom.offsetWidth <= 0 && dom.offsetHeight <= 0;
    };
    var isVisible = function (element) {
      return !isHidden$1(element.dom);
    };

    var locate = function (candidates, predicate) {
      return findIndex$1(candidates, predicate).map(function (index) {
        return {
          index: index,
          candidates: candidates
        };
      });
    };

    var locateVisible = function (container, current, selector) {
      var predicate = function (x) {
        return eq(x, current);
      };
      var candidates = descendants(container, selector);
      var visible = filter$2(candidates, isVisible);
      return locate(visible, predicate);
    };
    var findIndex = function (elements, target) {
      return findIndex$1(elements, function (elem) {
        return eq(target, elem);
      });
    };

    var withGrid = function (values, index, numCols, f) {
      var oldRow = Math.floor(index / numCols);
      var oldColumn = index % numCols;
      return f(oldRow, oldColumn).bind(function (address) {
        var newIndex = address.row * numCols + address.column;
        return newIndex >= 0 && newIndex < values.length ? Optional.some(values[newIndex]) : Optional.none();
      });
    };
    var cycleHorizontal$1 = function (values, index, numRows, numCols, delta) {
      return withGrid(values, index, numCols, function (oldRow, oldColumn) {
        var onLastRow = oldRow === numRows - 1;
        var colsInRow = onLastRow ? values.length - oldRow * numCols : numCols;
        var newColumn = cycleBy(oldColumn, delta, 0, colsInRow - 1);
        return Optional.some({
          row: oldRow,
          column: newColumn
        });
      });
    };
    var cycleVertical$1 = function (values, index, numRows, numCols, delta) {
      return withGrid(values, index, numCols, function (oldRow, oldColumn) {
        var newRow = cycleBy(oldRow, delta, 0, numRows - 1);
        var onLastRow = newRow === numRows - 1;
        var colsInRow = onLastRow ? values.length - newRow * numCols : numCols;
        var newCol = clamp$1(oldColumn, 0, colsInRow - 1);
        return Optional.some({
          row: newRow,
          column: newCol
        });
      });
    };
    var cycleRight$1 = function (values, index, numRows, numCols) {
      return cycleHorizontal$1(values, index, numRows, numCols, +1);
    };
    var cycleLeft$1 = function (values, index, numRows, numCols) {
      return cycleHorizontal$1(values, index, numRows, numCols, -1);
    };
    var cycleUp$1 = function (values, index, numRows, numCols) {
      return cycleVertical$1(values, index, numRows, numCols, -1);
    };
    var cycleDown$1 = function (values, index, numRows, numCols) {
      return cycleVertical$1(values, index, numRows, numCols, +1);
    };

    var schema$u = [
      required$1('selector'),
      defaulted('execute', defaultExecute),
      onKeyboardHandler('onEscape'),
      defaulted('captureTab', false),
      initSize()
    ];
    var focusIn$3 = function (component, gridConfig, _gridState) {
      descendant(component.element, gridConfig.selector).each(function (first) {
        gridConfig.focusManager.set(component, first);
      });
    };
    var findCurrent$1 = function (component, gridConfig) {
      return gridConfig.focusManager.get(component).bind(function (elem) {
        return closest$1(elem, gridConfig.selector);
      });
    };
    var execute$3 = function (component, simulatedEvent, gridConfig, _gridState) {
      return findCurrent$1(component, gridConfig).bind(function (focused) {
        return gridConfig.execute(component, simulatedEvent, focused);
      });
    };
    var doMove$2 = function (cycle) {
      return function (element, focused, gridConfig, gridState) {
        return locateVisible(element, focused, gridConfig.selector).bind(function (identified) {
          return cycle(identified.candidates, identified.index, gridState.getNumRows().getOr(gridConfig.initSize.numRows), gridState.getNumColumns().getOr(gridConfig.initSize.numColumns));
        });
      };
    };
    var handleTab = function (_component, _simulatedEvent, gridConfig) {
      return gridConfig.captureTab ? Optional.some(true) : Optional.none();
    };
    var doEscape$1 = function (component, simulatedEvent, gridConfig) {
      return gridConfig.onEscape(component, simulatedEvent);
    };
    var moveLeft$3 = doMove$2(cycleLeft$1);
    var moveRight$3 = doMove$2(cycleRight$1);
    var moveNorth$1 = doMove$2(cycleUp$1);
    var moveSouth$1 = doMove$2(cycleDown$1);
    var getKeydownRules$4 = constant$1([
      rule(inSet(LEFT), west$1(moveLeft$3, moveRight$3)),
      rule(inSet(RIGHT), east$1(moveLeft$3, moveRight$3)),
      rule(inSet(UP), north$1(moveNorth$1)),
      rule(inSet(DOWN), south$1(moveSouth$1)),
      rule(and([
        isShift,
        inSet(TAB)
      ]), handleTab),
      rule(and([
        isNotShift,
        inSet(TAB)
      ]), handleTab),
      rule(inSet(ESCAPE), doEscape$1),
      rule(inSet(SPACE.concat(ENTER)), execute$3)
    ]);
    var getKeyupRules$4 = constant$1([rule(inSet(SPACE), stopEventForFirefox)]);
    var FlatgridType = typical(schema$u, flatgrid$1, getKeydownRules$4, getKeyupRules$4, function () {
      return Optional.some(focusIn$3);
    });

    var horizontal = function (container, selector, current, delta) {
      var isDisabledButton = function (candidate) {
        return name$2(candidate) === 'button' && get$c(candidate, 'disabled') === 'disabled';
      };
      var tryCycle = function (initial, index, candidates) {
        var newIndex = cycleBy(index, delta, 0, candidates.length - 1);
        if (newIndex === initial) {
          return Optional.none();
        } else {
          return isDisabledButton(candidates[newIndex]) ? tryCycle(initial, newIndex, candidates) : Optional.from(candidates[newIndex]);
        }
      };
      return locateVisible(container, current, selector).bind(function (identified) {
        var index = identified.index;
        var candidates = identified.candidates;
        return tryCycle(index, index, candidates);
      });
    };

    var schema$t = [
      required$1('selector'),
      defaulted('getInitial', Optional.none),
      defaulted('execute', defaultExecute),
      onKeyboardHandler('onEscape'),
      defaulted('executeOnMove', false),
      defaulted('allowVertical', true)
    ];
    var findCurrent = function (component, flowConfig) {
      return flowConfig.focusManager.get(component).bind(function (elem) {
        return closest$1(elem, flowConfig.selector);
      });
    };
    var execute$2 = function (component, simulatedEvent, flowConfig) {
      return findCurrent(component, flowConfig).bind(function (focused) {
        return flowConfig.execute(component, simulatedEvent, focused);
      });
    };
    var focusIn$2 = function (component, flowConfig, _state) {
      flowConfig.getInitial(component).orThunk(function () {
        return descendant(component.element, flowConfig.selector);
      }).each(function (first) {
        flowConfig.focusManager.set(component, first);
      });
    };
    var moveLeft$2 = function (element, focused, info) {
      return horizontal(element, info.selector, focused, -1);
    };
    var moveRight$2 = function (element, focused, info) {
      return horizontal(element, info.selector, focused, +1);
    };
    var doMove$1 = function (movement) {
      return function (component, simulatedEvent, flowConfig, flowState) {
        return movement(component, simulatedEvent, flowConfig, flowState).bind(function () {
          return flowConfig.executeOnMove ? execute$2(component, simulatedEvent, flowConfig) : Optional.some(true);
        });
      };
    };
    var doEscape = function (component, simulatedEvent, flowConfig) {
      return flowConfig.onEscape(component, simulatedEvent);
    };
    var getKeydownRules$3 = function (_component, _se, flowConfig, _flowState) {
      var westMovers = LEFT.concat(flowConfig.allowVertical ? UP : []);
      var eastMovers = RIGHT.concat(flowConfig.allowVertical ? DOWN : []);
      return [
        rule(inSet(westMovers), doMove$1(west$1(moveLeft$2, moveRight$2))),
        rule(inSet(eastMovers), doMove$1(east$1(moveLeft$2, moveRight$2))),
        rule(inSet(ENTER), execute$2),
        rule(inSet(SPACE), execute$2),
        rule(inSet(ESCAPE), doEscape)
      ];
    };
    var getKeyupRules$3 = constant$1([rule(inSet(SPACE), stopEventForFirefox)]);
    var FlowType = typical(schema$t, NoState.init, getKeydownRules$3, getKeyupRules$3, function () {
      return Optional.some(focusIn$2);
    });

    var toCell = function (matrix, rowIndex, columnIndex) {
      return Optional.from(matrix[rowIndex]).bind(function (row) {
        return Optional.from(row[columnIndex]).map(function (cell) {
          return {
            rowIndex: rowIndex,
            columnIndex: columnIndex,
            cell: cell
          };
        });
      });
    };
    var cycleHorizontal = function (matrix, rowIndex, startCol, deltaCol) {
      var row = matrix[rowIndex];
      var colsInRow = row.length;
      var newColIndex = cycleBy(startCol, deltaCol, 0, colsInRow - 1);
      return toCell(matrix, rowIndex, newColIndex);
    };
    var cycleVertical = function (matrix, colIndex, startRow, deltaRow) {
      var nextRowIndex = cycleBy(startRow, deltaRow, 0, matrix.length - 1);
      var colsInNextRow = matrix[nextRowIndex].length;
      var nextColIndex = clamp$1(colIndex, 0, colsInNextRow - 1);
      return toCell(matrix, nextRowIndex, nextColIndex);
    };
    var moveHorizontal = function (matrix, rowIndex, startCol, deltaCol) {
      var row = matrix[rowIndex];
      var colsInRow = row.length;
      var newColIndex = clamp$1(startCol + deltaCol, 0, colsInRow - 1);
      return toCell(matrix, rowIndex, newColIndex);
    };
    var moveVertical = function (matrix, colIndex, startRow, deltaRow) {
      var nextRowIndex = clamp$1(startRow + deltaRow, 0, matrix.length - 1);
      var colsInNextRow = matrix[nextRowIndex].length;
      var nextColIndex = clamp$1(colIndex, 0, colsInNextRow - 1);
      return toCell(matrix, nextRowIndex, nextColIndex);
    };
    var cycleRight = function (matrix, startRow, startCol) {
      return cycleHorizontal(matrix, startRow, startCol, +1);
    };
    var cycleLeft = function (matrix, startRow, startCol) {
      return cycleHorizontal(matrix, startRow, startCol, -1);
    };
    var cycleUp = function (matrix, startRow, startCol) {
      return cycleVertical(matrix, startCol, startRow, -1);
    };
    var cycleDown = function (matrix, startRow, startCol) {
      return cycleVertical(matrix, startCol, startRow, +1);
    };
    var moveLeft$1 = function (matrix, startRow, startCol) {
      return moveHorizontal(matrix, startRow, startCol, -1);
    };
    var moveRight$1 = function (matrix, startRow, startCol) {
      return moveHorizontal(matrix, startRow, startCol, +1);
    };
    var moveUp$1 = function (matrix, startRow, startCol) {
      return moveVertical(matrix, startCol, startRow, -1);
    };
    var moveDown$1 = function (matrix, startRow, startCol) {
      return moveVertical(matrix, startCol, startRow, +1);
    };

    var schema$s = [
      requiredObjOf('selectors', [
        required$1('row'),
        required$1('cell')
      ]),
      defaulted('cycles', true),
      defaulted('previousSelector', Optional.none),
      defaulted('execute', defaultExecute)
    ];
    var focusIn$1 = function (component, matrixConfig, _state) {
      var focused = matrixConfig.previousSelector(component).orThunk(function () {
        var selectors = matrixConfig.selectors;
        return descendant(component.element, selectors.cell);
      });
      focused.each(function (cell) {
        matrixConfig.focusManager.set(component, cell);
      });
    };
    var execute$1 = function (component, simulatedEvent, matrixConfig) {
      return search(component.element).bind(function (focused) {
        return matrixConfig.execute(component, simulatedEvent, focused);
      });
    };
    var toMatrix = function (rows, matrixConfig) {
      return map$2(rows, function (row) {
        return descendants(row, matrixConfig.selectors.cell);
      });
    };
    var doMove = function (ifCycle, ifMove) {
      return function (element, focused, matrixConfig) {
        var move = matrixConfig.cycles ? ifCycle : ifMove;
        return closest$1(focused, matrixConfig.selectors.row).bind(function (inRow) {
          var cellsInRow = descendants(inRow, matrixConfig.selectors.cell);
          return findIndex(cellsInRow, focused).bind(function (colIndex) {
            var allRows = descendants(element, matrixConfig.selectors.row);
            return findIndex(allRows, inRow).bind(function (rowIndex) {
              var matrix = toMatrix(allRows, matrixConfig);
              return move(matrix, rowIndex, colIndex).map(function (next) {
                return next.cell;
              });
            });
          });
        });
      };
    };
    var moveLeft = doMove(cycleLeft, moveLeft$1);
    var moveRight = doMove(cycleRight, moveRight$1);
    var moveNorth = doMove(cycleUp, moveUp$1);
    var moveSouth = doMove(cycleDown, moveDown$1);
    var getKeydownRules$2 = constant$1([
      rule(inSet(LEFT), west$1(moveLeft, moveRight)),
      rule(inSet(RIGHT), east$1(moveLeft, moveRight)),
      rule(inSet(UP), north$1(moveNorth)),
      rule(inSet(DOWN), south$1(moveSouth)),
      rule(inSet(SPACE.concat(ENTER)), execute$1)
    ]);
    var getKeyupRules$2 = constant$1([rule(inSet(SPACE), stopEventForFirefox)]);
    var MatrixType = typical(schema$s, NoState.init, getKeydownRules$2, getKeyupRules$2, function () {
      return Optional.some(focusIn$1);
    });

    var schema$r = [
      required$1('selector'),
      defaulted('execute', defaultExecute),
      defaulted('moveOnTab', false)
    ];
    var execute = function (component, simulatedEvent, menuConfig) {
      return menuConfig.focusManager.get(component).bind(function (focused) {
        return menuConfig.execute(component, simulatedEvent, focused);
      });
    };
    var focusIn = function (component, menuConfig, _state) {
      descendant(component.element, menuConfig.selector).each(function (first) {
        menuConfig.focusManager.set(component, first);
      });
    };
    var moveUp = function (element, focused, info) {
      return horizontal(element, info.selector, focused, -1);
    };
    var moveDown = function (element, focused, info) {
      return horizontal(element, info.selector, focused, +1);
    };
    var fireShiftTab = function (component, simulatedEvent, menuConfig, menuState) {
      return menuConfig.moveOnTab ? move$1(moveUp)(component, simulatedEvent, menuConfig, menuState) : Optional.none();
    };
    var fireTab = function (component, simulatedEvent, menuConfig, menuState) {
      return menuConfig.moveOnTab ? move$1(moveDown)(component, simulatedEvent, menuConfig, menuState) : Optional.none();
    };
    var getKeydownRules$1 = constant$1([
      rule(inSet(UP), move$1(moveUp)),
      rule(inSet(DOWN), move$1(moveDown)),
      rule(and([
        isShift,
        inSet(TAB)
      ]), fireShiftTab),
      rule(and([
        isNotShift,
        inSet(TAB)
      ]), fireTab),
      rule(inSet(ENTER), execute),
      rule(inSet(SPACE), execute)
    ]);
    var getKeyupRules$1 = constant$1([rule(inSet(SPACE), stopEventForFirefox)]);
    var MenuType = typical(schema$r, NoState.init, getKeydownRules$1, getKeyupRules$1, function () {
      return Optional.some(focusIn);
    });

    var schema$q = [
      onKeyboardHandler('onSpace'),
      onKeyboardHandler('onEnter'),
      onKeyboardHandler('onShiftEnter'),
      onKeyboardHandler('onLeft'),
      onKeyboardHandler('onRight'),
      onKeyboardHandler('onTab'),
      onKeyboardHandler('onShiftTab'),
      onKeyboardHandler('onUp'),
      onKeyboardHandler('onDown'),
      onKeyboardHandler('onEscape'),
      defaulted('stopSpaceKeyup', false),
      option('focusIn')
    ];
    var getKeydownRules = function (component, simulatedEvent, specialInfo) {
      return [
        rule(inSet(SPACE), specialInfo.onSpace),
        rule(and([
          isNotShift,
          inSet(ENTER)
        ]), specialInfo.onEnter),
        rule(and([
          isShift,
          inSet(ENTER)
        ]), specialInfo.onShiftEnter),
        rule(and([
          isShift,
          inSet(TAB)
        ]), specialInfo.onShiftTab),
        rule(and([
          isNotShift,
          inSet(TAB)
        ]), specialInfo.onTab),
        rule(inSet(UP), specialInfo.onUp),
        rule(inSet(DOWN), specialInfo.onDown),
        rule(inSet(LEFT), specialInfo.onLeft),
        rule(inSet(RIGHT), specialInfo.onRight),
        rule(inSet(SPACE), specialInfo.onSpace),
        rule(inSet(ESCAPE), specialInfo.onEscape)
      ];
    };
    var getKeyupRules = function (component, simulatedEvent, specialInfo) {
      return specialInfo.stopSpaceKeyup ? [rule(inSet(SPACE), stopEventForFirefox)] : [];
    };
    var SpecialType = typical(schema$q, NoState.init, getKeydownRules, getKeyupRules, function (specialInfo) {
      return specialInfo.focusIn;
    });

    var acyclic = AcyclicType.schema();
    var cyclic = CyclicType.schema();
    var flow = FlowType.schema();
    var flatgrid = FlatgridType.schema();
    var matrix = MatrixType.schema();
    var execution = ExecutionType.schema();
    var menu = MenuType.schema();
    var special = SpecialType.schema();

    var KeyboardBranches = /*#__PURE__*/Object.freeze({
        __proto__: null,
        acyclic: acyclic,
        cyclic: cyclic,
        flow: flow,
        flatgrid: flatgrid,
        matrix: matrix,
        execution: execution,
        menu: menu,
        special: special
    });

    var isFlatgridState = function (keyState) {
      return hasNonNullableKey(keyState, 'setGridSize');
    };
    var Keying = createModes({
      branchKey: 'mode',
      branches: KeyboardBranches,
      name: 'keying',
      active: {
        events: function (keyingConfig, keyingState) {
          var handler = keyingConfig.handler;
          return handler.toEvents(keyingConfig, keyingState);
        }
      },
      apis: {
        focusIn: function (component, keyConfig, keyState) {
          keyConfig.sendFocusIn(keyConfig).fold(function () {
            component.getSystem().triggerFocus(component.element, component.element);
          }, function (sendFocusIn) {
            sendFocusIn(component, keyConfig, keyState);
          });
        },
        setGridSize: function (component, keyConfig, keyState, numRows, numColumns) {
          if (!isFlatgridState(keyState)) {
            console.error('Layout does not support setGridSize');
          } else {
            keyState.setGridSize(numRows, numColumns);
          }
        }
      },
      state: KeyingState
    });

    var set$2 = function (component, replaceConfig, replaceState, data) {
      preserve$1(function () {
        var newChildren = map$2(data, component.getSystem().build);
        replaceChildren(component, newChildren);
      }, component.element);
    };
    var insert = function (component, replaceConfig, insertion, childSpec) {
      var child = component.getSystem().build(childSpec);
      attachWith(component, child, insertion);
    };
    var append = function (component, replaceConfig, replaceState, appendee) {
      insert(component, replaceConfig, append$2, appendee);
    };
    var prepend = function (component, replaceConfig, replaceState, prependee) {
      insert(component, replaceConfig, prepend$1, prependee);
    };
    var remove = function (component, replaceConfig, replaceState, removee) {
      var children = contents(component);
      var foundChild = find$5(children, function (child) {
        return eq(removee.element, child.element);
      });
      foundChild.each(detach);
    };
    var contents = function (component, _replaceConfig) {
      return component.components();
    };
    var replaceAt = function (component, replaceConfig, replaceState, replaceeIndex, replacer) {
      var children = contents(component);
      return Optional.from(children[replaceeIndex]).map(function (replacee) {
        remove(component, replaceConfig, replaceState, replacee);
        replacer.each(function (r) {
          insert(component, replaceConfig, function (p, c) {
            appendAt(p, c, replaceeIndex);
          }, r);
        });
        return replacee;
      });
    };
    var replaceBy = function (component, replaceConfig, replaceState, replaceePred, replacer) {
      var children = contents(component);
      return findIndex$1(children, replaceePred).bind(function (replaceeIndex) {
        return replaceAt(component, replaceConfig, replaceState, replaceeIndex, replacer);
      });
    };

    var ReplaceApis = /*#__PURE__*/Object.freeze({
        __proto__: null,
        append: append,
        prepend: prepend,
        remove: remove,
        replaceAt: replaceAt,
        replaceBy: replaceBy,
        set: set$2,
        contents: contents
    });

    var Replacing = create$7({
      fields: [],
      name: 'replacing',
      apis: ReplaceApis
    });

    var events$d = function (name, eventHandlers) {
      var events = derive$2(eventHandlers);
      return create$7({
        fields: [required$1('enabled')],
        name: name,
        active: { events: constant$1(events) }
      });
    };
    var config = function (name, eventHandlers) {
      var me = events$d(name, eventHandlers);
      return {
        key: name,
        value: {
          config: {},
          me: me,
          configAsRaw: constant$1({}),
          initialConfig: {},
          state: NoState
        }
      };
    };

    var focus$2 = function (component, focusConfig) {
      if (!focusConfig.ignore) {
        focus$3(component.element);
        focusConfig.onFocus(component);
      }
    };
    var blur = function (component, focusConfig) {
      if (!focusConfig.ignore) {
        blur$1(component.element);
      }
    };
    var isFocused = function (component) {
      return hasFocus(component.element);
    };

    var FocusApis = /*#__PURE__*/Object.freeze({
        __proto__: null,
        focus: focus$2,
        blur: blur,
        isFocused: isFocused
    });

    var exhibit$4 = function (base, focusConfig) {
      var mod = focusConfig.ignore ? {} : { attributes: { tabindex: '-1' } };
      return nu$7(mod);
    };
    var events$c = function (focusConfig) {
      return derive$2([run$1(focus$4(), function (component, simulatedEvent) {
          focus$2(component, focusConfig);
          simulatedEvent.stop();
        })].concat(focusConfig.stopMousedown ? [run$1(mousedown(), function (_, simulatedEvent) {
          simulatedEvent.event.prevent();
        })] : []));
    };

    var ActiveFocus = /*#__PURE__*/Object.freeze({
        __proto__: null,
        exhibit: exhibit$4,
        events: events$c
    });

    var FocusSchema = [
      onHandler('onFocus'),
      defaulted('stopMousedown', false),
      defaulted('ignore', false)
    ];

    var Focusing = create$7({
      fields: FocusSchema,
      name: 'focusing',
      active: ActiveFocus,
      apis: FocusApis
    });

    var SetupBehaviourCellState = function (initialState) {
      var init = function () {
        var cell = Cell(initialState);
        var get = function () {
          return cell.get();
        };
        var set = function (newState) {
          return cell.set(newState);
        };
        var clear = function () {
          return cell.set(initialState);
        };
        var readState = function () {
          return cell.get();
        };
        return {
          get: get,
          set: set,
          clear: clear,
          readState: readState
        };
      };
      return { init: init };
    };

    var updateAriaState = function (component, toggleConfig, toggleState) {
      var ariaInfo = toggleConfig.aria;
      ariaInfo.update(component, ariaInfo, toggleState.get());
    };
    var updateClass = function (component, toggleConfig, toggleState) {
      toggleConfig.toggleClass.each(function (toggleClass) {
        if (toggleState.get()) {
          add$2(component.element, toggleClass);
        } else {
          remove$3(component.element, toggleClass);
        }
      });
    };
    var toggle$2 = function (component, toggleConfig, toggleState) {
      set$1(component, toggleConfig, toggleState, !toggleState.get());
    };
    var on = function (component, toggleConfig, toggleState) {
      toggleState.set(true);
      updateClass(component, toggleConfig, toggleState);
      updateAriaState(component, toggleConfig, toggleState);
    };
    var off = function (component, toggleConfig, toggleState) {
      toggleState.set(false);
      updateClass(component, toggleConfig, toggleState);
      updateAriaState(component, toggleConfig, toggleState);
    };
    var set$1 = function (component, toggleConfig, toggleState, state) {
      var action = state ? on : off;
      action(component, toggleConfig, toggleState);
    };
    var isOn = function (component, toggleConfig, toggleState) {
      return toggleState.get();
    };
    var onLoad = function (component, toggleConfig, toggleState) {
      set$1(component, toggleConfig, toggleState, toggleConfig.selected);
    };

    var ToggleApis = /*#__PURE__*/Object.freeze({
        __proto__: null,
        onLoad: onLoad,
        toggle: toggle$2,
        isOn: isOn,
        on: on,
        off: off,
        set: set$1
    });

    var exhibit$3 = function () {
      return nu$7({});
    };
    var events$b = function (toggleConfig, toggleState) {
      var execute = executeEvent(toggleConfig, toggleState, toggle$2);
      var load = loadEvent(toggleConfig, toggleState, onLoad);
      return derive$2(flatten([
        toggleConfig.toggleOnExecute ? [execute] : [],
        [load]
      ]));
    };

    var ActiveToggle = /*#__PURE__*/Object.freeze({
        __proto__: null,
        exhibit: exhibit$3,
        events: events$b
    });

    var updatePressed = function (component, ariaInfo, status) {
      set$7(component.element, 'aria-pressed', status);
      if (ariaInfo.syncWithExpanded) {
        updateExpanded(component, ariaInfo, status);
      }
    };
    var updateSelected = function (component, ariaInfo, status) {
      set$7(component.element, 'aria-selected', status);
    };
    var updateChecked = function (component, ariaInfo, status) {
      set$7(component.element, 'aria-checked', status);
    };
    var updateExpanded = function (component, ariaInfo, status) {
      set$7(component.element, 'aria-expanded', status);
    };

    var ToggleSchema = [
      defaulted('selected', false),
      option('toggleClass'),
      defaulted('toggleOnExecute', true),
      defaultedOf('aria', { mode: 'none' }, choose$1('mode', {
        pressed: [
          defaulted('syncWithExpanded', false),
          output$1('update', updatePressed)
        ],
        checked: [output$1('update', updateChecked)],
        expanded: [output$1('update', updateExpanded)],
        selected: [output$1('update', updateSelected)],
        none: [output$1('update', noop)]
      }))
    ];

    var Toggling = create$7({
      fields: ToggleSchema,
      name: 'toggling',
      active: ActiveToggle,
      apis: ToggleApis,
      state: SetupBehaviourCellState(false)
    });

    var pointerEvents = function () {
      var onClick = function (component, simulatedEvent) {
        simulatedEvent.stop();
        emitExecute(component);
      };
      return [
        run$1(click(), onClick),
        run$1(tap(), onClick),
        cutter(touchstart()),
        cutter(mousedown())
      ];
    };
    var events$a = function (optAction) {
      var executeHandler = function (action) {
        return runOnExecute$1(function (component, simulatedEvent) {
          action(component);
          simulatedEvent.stop();
        });
      };
      return derive$2(flatten([
        optAction.map(executeHandler).toArray(),
        pointerEvents()
      ]));
    };

    var hoverEvent = 'alloy.item-hover';
    var focusEvent = 'alloy.item-focus';
    var onHover = function (item) {
      if (search(item.element).isNone() || Focusing.isFocused(item)) {
        if (!Focusing.isFocused(item)) {
          Focusing.focus(item);
        }
        emitWith(item, hoverEvent, { item: item });
      }
    };
    var onFocus$1 = function (item) {
      emitWith(item, focusEvent, { item: item });
    };
    var hover = constant$1(hoverEvent);
    var focus$1 = constant$1(focusEvent);

    var builder$2 = function (detail) {
      return {
        dom: detail.dom,
        domModification: __assign(__assign({}, detail.domModification), { attributes: __assign(__assign(__assign({ 'role': detail.toggling.isSome() ? 'menuitemcheckbox' : 'menuitem' }, detail.domModification.attributes), { 'aria-haspopup': detail.hasSubmenu }), detail.hasSubmenu ? { 'aria-expanded': false } : {}) }),
        behaviours: SketchBehaviours.augment(detail.itemBehaviours, [
          detail.toggling.fold(Toggling.revoke, function (tConfig) {
            return Toggling.config(__assign({ aria: { mode: 'checked' } }, tConfig));
          }),
          Focusing.config({
            ignore: detail.ignoreFocus,
            stopMousedown: detail.ignoreFocus,
            onFocus: function (component) {
              onFocus$1(component);
            }
          }),
          Keying.config({ mode: 'execution' }),
          Representing.config({
            store: {
              mode: 'memory',
              initialValue: detail.data
            }
          }),
          config('item-type-events', __spreadArray(__spreadArray([], pointerEvents()), [
            run$1(mouseover(), onHover),
            run$1(focusItem(), Focusing.focus)
          ]))
        ]),
        components: detail.components,
        eventOrder: detail.eventOrder
      };
    };
    var schema$p = [
      required$1('data'),
      required$1('components'),
      required$1('dom'),
      defaulted('hasSubmenu', false),
      option('toggling'),
      SketchBehaviours.field('itemBehaviours', [
        Toggling,
        Focusing,
        Keying,
        Representing
      ]),
      defaulted('ignoreFocus', false),
      defaulted('domModification', {}),
      output$1('builder', builder$2),
      defaulted('eventOrder', {})
    ];

    var builder$1 = function (detail) {
      return {
        dom: detail.dom,
        components: detail.components,
        events: derive$2([stopper(focusItem())])
      };
    };
    var schema$o = [
      required$1('dom'),
      required$1('components'),
      output$1('builder', builder$1)
    ];

    var owner$2 = constant$1('item-widget');
    var parts$h = constant$1([required({
        name: 'widget',
        overrides: function (detail) {
          return {
            behaviours: derive$1([Representing.config({
                store: {
                  mode: 'manual',
                  getValue: function (_component) {
                    return detail.data;
                  },
                  setValue: noop
                }
              })])
          };
        }
      })]);

    var builder = function (detail) {
      var subs = substitutes(owner$2(), detail, parts$h());
      var components = components$1(owner$2(), detail, subs.internals());
      var focusWidget = function (component) {
        return getPart(component, detail, 'widget').map(function (widget) {
          Keying.focusIn(widget);
          return widget;
        });
      };
      var onHorizontalArrow = function (component, simulatedEvent) {
        return inside(simulatedEvent.event.target) ? Optional.none() : function () {
          if (detail.autofocus) {
            simulatedEvent.setSource(component.element);
            return Optional.none();
          } else {
            return Optional.none();
          }
        }();
      };
      return {
        dom: detail.dom,
        components: components,
        domModification: detail.domModification,
        events: derive$2([
          runOnExecute$1(function (component, simulatedEvent) {
            focusWidget(component).each(function (_widget) {
              simulatedEvent.stop();
            });
          }),
          run$1(mouseover(), onHover),
          run$1(focusItem(), function (component, _simulatedEvent) {
            if (detail.autofocus) {
              focusWidget(component);
            } else {
              Focusing.focus(component);
            }
          })
        ]),
        behaviours: SketchBehaviours.augment(detail.widgetBehaviours, [
          Representing.config({
            store: {
              mode: 'memory',
              initialValue: detail.data
            }
          }),
          Focusing.config({
            ignore: detail.ignoreFocus,
            onFocus: function (component) {
              onFocus$1(component);
            }
          }),
          Keying.config({
            mode: 'special',
            focusIn: detail.autofocus ? function (component) {
              focusWidget(component);
            } : revoke(),
            onLeft: onHorizontalArrow,
            onRight: onHorizontalArrow,
            onEscape: function (component, simulatedEvent) {
              if (!Focusing.isFocused(component) && !detail.autofocus) {
                Focusing.focus(component);
                return Optional.some(true);
              } else if (detail.autofocus) {
                simulatedEvent.setSource(component.element);
                return Optional.none();
              } else {
                return Optional.none();
              }
            }
          })
        ])
      };
    };
    var schema$n = [
      required$1('uid'),
      required$1('data'),
      required$1('components'),
      required$1('dom'),
      defaulted('autofocus', false),
      defaulted('ignoreFocus', false),
      SketchBehaviours.field('widgetBehaviours', [
        Representing,
        Focusing,
        Keying
      ]),
      defaulted('domModification', {}),
      defaultUidsSchema(parts$h()),
      output$1('builder', builder)
    ];

    var itemSchema$2 = choose$1('type', {
      widget: schema$n,
      item: schema$p,
      separator: schema$o
    });
    var configureGrid = function (detail, movementInfo) {
      return {
        mode: 'flatgrid',
        selector: '.' + detail.markers.item,
        initSize: {
          numColumns: movementInfo.initSize.numColumns,
          numRows: movementInfo.initSize.numRows
        },
        focusManager: detail.focusManager
      };
    };
    var configureMatrix = function (detail, movementInfo) {
      return {
        mode: 'matrix',
        selectors: {
          row: movementInfo.rowSelector,
          cell: '.' + detail.markers.item
        },
        focusManager: detail.focusManager
      };
    };
    var configureMenu = function (detail, movementInfo) {
      return {
        mode: 'menu',
        selector: '.' + detail.markers.item,
        moveOnTab: movementInfo.moveOnTab,
        focusManager: detail.focusManager
      };
    };
    var parts$g = constant$1([group({
        factory: {
          sketch: function (spec) {
            var itemInfo = asRawOrDie$1('menu.spec item', itemSchema$2, spec);
            return itemInfo.builder(itemInfo);
          }
        },
        name: 'items',
        unit: 'item',
        defaults: function (detail, u) {
          return has$2(u, 'uid') ? u : __assign(__assign({}, u), { uid: generate$5('item') });
        },
        overrides: function (detail, u) {
          return {
            type: u.type,
            ignoreFocus: detail.fakeFocus,
            domModification: { classes: [detail.markers.item] }
          };
        }
      })]);
    var schema$m = constant$1([
      required$1('value'),
      required$1('items'),
      required$1('dom'),
      required$1('components'),
      defaulted('eventOrder', {}),
      field('menuBehaviours', [
        Highlighting,
        Representing,
        Composing,
        Keying
      ]),
      defaultedOf('movement', {
        mode: 'menu',
        moveOnTab: true
      }, choose$1('mode', {
        grid: [
          initSize(),
          output$1('config', configureGrid)
        ],
        matrix: [
          output$1('config', configureMatrix),
          required$1('rowSelector')
        ],
        menu: [
          defaulted('moveOnTab', true),
          output$1('config', configureMenu)
        ]
      })),
      itemMarkers(),
      defaulted('fakeFocus', false),
      defaulted('focusManager', dom$2()),
      onHandler('onHighlight')
    ]);

    var focus = constant$1('alloy.menu-focus');

    var make$7 = function (detail, components, _spec, _externals) {
      return {
        uid: detail.uid,
        dom: detail.dom,
        markers: detail.markers,
        behaviours: augment(detail.menuBehaviours, [
          Highlighting.config({
            highlightClass: detail.markers.selectedItem,
            itemClass: detail.markers.item,
            onHighlight: detail.onHighlight
          }),
          Representing.config({
            store: {
              mode: 'memory',
              initialValue: detail.value
            }
          }),
          Composing.config({ find: Optional.some }),
          Keying.config(detail.movement.config(detail, detail.movement))
        ]),
        events: derive$2([
          run$1(focus$1(), function (menu, simulatedEvent) {
            var event = simulatedEvent.event;
            menu.getSystem().getByDom(event.target).each(function (item) {
              Highlighting.highlight(menu, item);
              simulatedEvent.stop();
              emitWith(menu, focus(), {
                menu: menu,
                item: item
              });
            });
          }),
          run$1(hover(), function (menu, simulatedEvent) {
            var item = simulatedEvent.event.item;
            Highlighting.highlight(menu, item);
          })
        ]),
        components: components,
        eventOrder: detail.eventOrder,
        domModification: { attributes: { role: 'menu' } }
      };
    };

    var Menu = composite({
      name: 'Menu',
      configFields: schema$m(),
      partFields: parts$g(),
      factory: make$7
    });

    var transpose$1 = function (obj) {
      return tupleMap(obj, function (v, k) {
        return {
          k: v,
          v: k
        };
      });
    };
    var trace = function (items, byItem, byMenu, finish) {
      return get$e(byMenu, finish).bind(function (triggerItem) {
        return get$e(items, triggerItem).bind(function (triggerMenu) {
          var rest = trace(items, byItem, byMenu, triggerMenu);
          return Optional.some([triggerMenu].concat(rest));
        });
      }).getOr([]);
    };
    var generate$2 = function (menus, expansions) {
      var items = {};
      each(menus, function (menuItems, menu) {
        each$1(menuItems, function (item) {
          items[item] = menu;
        });
      });
      var byItem = expansions;
      var byMenu = transpose$1(expansions);
      var menuPaths = map(byMenu, function (_triggerItem, submenu) {
        return [submenu].concat(trace(items, byItem, byMenu, submenu));
      });
      return map(items, function (menu) {
        return get$e(menuPaths, menu).getOr([menu]);
      });
    };

    var init$c = function () {
      var expansions = Cell({});
      var menus = Cell({});
      var paths = Cell({});
      var primary = value$1();
      var directory = Cell({});
      var clear = function () {
        expansions.set({});
        menus.set({});
        paths.set({});
        primary.clear();
      };
      var isClear = function () {
        return primary.get().isNone();
      };
      var setMenuBuilt = function (menuName, built) {
        var _a;
        menus.set(__assign(__assign({}, menus.get()), (_a = {}, _a[menuName] = {
          type: 'prepared',
          menu: built
        }, _a)));
      };
      var setContents = function (sPrimary, sMenus, sExpansions, dir) {
        primary.set(sPrimary);
        expansions.set(sExpansions);
        menus.set(sMenus);
        directory.set(dir);
        var sPaths = generate$2(dir, sExpansions);
        paths.set(sPaths);
      };
      var getTriggeringItem = function (menuValue) {
        return find$4(expansions.get(), function (v, _k) {
          return v === menuValue;
        });
      };
      var getTriggerData = function (menuValue, getItemByValue, path) {
        return getPreparedMenu(menuValue).bind(function (menu) {
          return getTriggeringItem(menuValue).bind(function (triggeringItemValue) {
            return getItemByValue(triggeringItemValue).map(function (triggeredItem) {
              return {
                triggeredMenu: menu,
                triggeringItem: triggeredItem,
                triggeringPath: path
              };
            });
          });
        });
      };
      var getTriggeringPath = function (itemValue, getItemByValue) {
        var extraPath = filter$2(lookupItem(itemValue).toArray(), function (menuValue) {
          return getPreparedMenu(menuValue).isSome();
        });
        return get$e(paths.get(), itemValue).bind(function (path) {
          var revPath = reverse(extraPath.concat(path));
          var triggers = bind$3(revPath, function (menuValue, menuIndex) {
            return getTriggerData(menuValue, getItemByValue, revPath.slice(0, menuIndex + 1)).fold(function () {
              return is(primary.get(), menuValue) ? [] : [Optional.none()];
            }, function (data) {
              return [Optional.some(data)];
            });
          });
          return sequence(triggers);
        });
      };
      var expand = function (itemValue) {
        return get$e(expansions.get(), itemValue).map(function (menu) {
          var current = get$e(paths.get(), itemValue).getOr([]);
          return [menu].concat(current);
        });
      };
      var collapse = function (itemValue) {
        return get$e(paths.get(), itemValue).bind(function (path) {
          return path.length > 1 ? Optional.some(path.slice(1)) : Optional.none();
        });
      };
      var refresh = function (itemValue) {
        return get$e(paths.get(), itemValue);
      };
      var getPreparedMenu = function (menuValue) {
        return lookupMenu(menuValue).bind(extractPreparedMenu);
      };
      var lookupMenu = function (menuValue) {
        return get$e(menus.get(), menuValue);
      };
      var lookupItem = function (itemValue) {
        return get$e(expansions.get(), itemValue);
      };
      var otherMenus = function (path) {
        var menuValues = directory.get();
        return difference(keys(menuValues), path);
      };
      var getPrimary = function () {
        return primary.get().bind(getPreparedMenu);
      };
      var getMenus = function () {
        return menus.get();
      };
      return {
        setMenuBuilt: setMenuBuilt,
        setContents: setContents,
        expand: expand,
        refresh: refresh,
        collapse: collapse,
        lookupMenu: lookupMenu,
        lookupItem: lookupItem,
        otherMenus: otherMenus,
        getPrimary: getPrimary,
        getMenus: getMenus,
        clear: clear,
        isClear: isClear,
        getTriggeringPath: getTriggeringPath
      };
    };
    var extractPreparedMenu = function (prep) {
      return prep.type === 'prepared' ? Optional.some(prep.menu) : Optional.none();
    };
    var LayeredState = {
      init: init$c,
      extractPreparedMenu: extractPreparedMenu
    };

    var make$6 = function (detail, _rawUiSpec) {
      var submenuParentItems = value$1();
      var buildMenus = function (container, primaryName, menus) {
        return map(menus, function (spec, name) {
          var makeSketch = function () {
            return Menu.sketch(__assign(__assign({}, spec), {
              value: name,
              markers: detail.markers,
              fakeFocus: detail.fakeFocus,
              onHighlight: detail.onHighlight,
              focusManager: detail.fakeFocus ? highlights() : dom$2()
            }));
          };
          return name === primaryName ? {
            type: 'prepared',
            menu: container.getSystem().build(makeSketch())
          } : {
            type: 'notbuilt',
            nbMenu: makeSketch
          };
        });
      };
      var layeredState = LayeredState.init();
      var setup = function (container) {
        var componentMap = buildMenus(container, detail.data.primary, detail.data.menus);
        var directory = toDirectory();
        layeredState.setContents(detail.data.primary, componentMap, detail.data.expansions, directory);
        return layeredState.getPrimary();
      };
      var getItemValue = function (item) {
        return Representing.getValue(item).value;
      };
      var getItemByValue = function (_container, menus, itemValue) {
        return findMap(menus, function (menu) {
          if (!menu.getSystem().isConnected()) {
            return Optional.none();
          }
          var candidates = Highlighting.getCandidates(menu);
          return find$5(candidates, function (c) {
            return getItemValue(c) === itemValue;
          });
        });
      };
      var toDirectory = function (_container) {
        return map(detail.data.menus, function (data, _menuName) {
          return bind$3(data.items, function (item) {
            return item.type === 'separator' ? [] : [item.data.value];
          });
        });
      };
      var setActiveMenu = function (container, menu) {
        Highlighting.highlight(container, menu);
        Highlighting.getHighlighted(menu).orThunk(function () {
          return Highlighting.getFirst(menu);
        }).each(function (item) {
          dispatch(container, item.element, focusItem());
        });
      };
      var getMenus = function (state, menuValues) {
        return cat(map$2(menuValues, function (mv) {
          return state.lookupMenu(mv).bind(function (prep) {
            return prep.type === 'prepared' ? Optional.some(prep.menu) : Optional.none();
          });
        }));
      };
      var closeOthers = function (container, state, path) {
        var others = getMenus(state, state.otherMenus(path));
        each$1(others, function (o) {
          remove$2(o.element, [detail.markers.backgroundMenu]);
          if (!detail.stayInDom) {
            Replacing.remove(container, o);
          }
        });
      };
      var getSubmenuParents = function (container) {
        return submenuParentItems.get().getOrThunk(function () {
          var r = {};
          var items = descendants(container.element, '.' + detail.markers.item);
          var parentItems = filter$2(items, function (i) {
            return get$c(i, 'aria-haspopup') === 'true';
          });
          each$1(parentItems, function (i) {
            container.getSystem().getByDom(i).each(function (itemComp) {
              var key = getItemValue(itemComp);
              r[key] = itemComp;
            });
          });
          submenuParentItems.set(r);
          return r;
        });
      };
      var updateAriaExpansions = function (container, path) {
        var parentItems = getSubmenuParents(container);
        each(parentItems, function (v, k) {
          var expanded = contains$2(path, k);
          set$7(v.element, 'aria-expanded', expanded);
        });
      };
      var updateMenuPath = function (container, state, path) {
        return Optional.from(path[0]).bind(function (latestMenuName) {
          return state.lookupMenu(latestMenuName).bind(function (menuPrep) {
            if (menuPrep.type === 'notbuilt') {
              return Optional.none();
            } else {
              var activeMenu = menuPrep.menu;
              var rest = getMenus(state, path.slice(1));
              each$1(rest, function (r) {
                add$2(r.element, detail.markers.backgroundMenu);
              });
              if (!inBody(activeMenu.element)) {
                Replacing.append(container, premade(activeMenu));
              }
              remove$2(activeMenu.element, [detail.markers.backgroundMenu]);
              setActiveMenu(container, activeMenu);
              closeOthers(container, state, path);
              return Optional.some(activeMenu);
            }
          });
        });
      };
      var ExpandHighlightDecision;
      (function (ExpandHighlightDecision) {
        ExpandHighlightDecision[ExpandHighlightDecision['HighlightSubmenu'] = 0] = 'HighlightSubmenu';
        ExpandHighlightDecision[ExpandHighlightDecision['HighlightParent'] = 1] = 'HighlightParent';
      }(ExpandHighlightDecision || (ExpandHighlightDecision = {})));
      var buildIfRequired = function (container, menuName, menuPrep) {
        if (menuPrep.type === 'notbuilt') {
          var menu = container.getSystem().build(menuPrep.nbMenu());
          layeredState.setMenuBuilt(menuName, menu);
          return menu;
        } else {
          return menuPrep.menu;
        }
      };
      var expandRight = function (container, item, decision) {
        if (decision === void 0) {
          decision = ExpandHighlightDecision.HighlightSubmenu;
        }
        if (item.hasConfigured(Disabling) && Disabling.isDisabled(item)) {
          return Optional.some(item);
        } else {
          var value = getItemValue(item);
          return layeredState.expand(value).bind(function (path) {
            updateAriaExpansions(container, path);
            return Optional.from(path[0]).bind(function (menuName) {
              return layeredState.lookupMenu(menuName).bind(function (activeMenuPrep) {
                var activeMenu = buildIfRequired(container, menuName, activeMenuPrep);
                if (!inBody(activeMenu.element)) {
                  Replacing.append(container, premade(activeMenu));
                }
                detail.onOpenSubmenu(container, item, activeMenu, reverse(path));
                if (decision === ExpandHighlightDecision.HighlightSubmenu) {
                  Highlighting.highlightFirst(activeMenu);
                  return updateMenuPath(container, layeredState, path);
                } else {
                  Highlighting.dehighlightAll(activeMenu);
                  return Optional.some(item);
                }
              });
            });
          });
        }
      };
      var collapseLeft = function (container, item) {
        var value = getItemValue(item);
        return layeredState.collapse(value).bind(function (path) {
          updateAriaExpansions(container, path);
          return updateMenuPath(container, layeredState, path).map(function (activeMenu) {
            detail.onCollapseMenu(container, item, activeMenu);
            return activeMenu;
          });
        });
      };
      var updateView = function (container, item) {
        var value = getItemValue(item);
        return layeredState.refresh(value).bind(function (path) {
          updateAriaExpansions(container, path);
          return updateMenuPath(container, layeredState, path);
        });
      };
      var onRight = function (container, item) {
        return inside(item.element) ? Optional.none() : expandRight(container, item, ExpandHighlightDecision.HighlightSubmenu);
      };
      var onLeft = function (container, item) {
        return inside(item.element) ? Optional.none() : collapseLeft(container, item);
      };
      var onEscape = function (container, item) {
        return collapseLeft(container, item).orThunk(function () {
          return detail.onEscape(container, item).map(function () {
            return container;
          });
        });
      };
      var keyOnItem = function (f) {
        return function (container, simulatedEvent) {
          return closest$1(simulatedEvent.getSource(), '.' + detail.markers.item).bind(function (target) {
            return container.getSystem().getByDom(target).toOptional().bind(function (item) {
              return f(container, item).map(always);
            });
          });
        };
      };
      var events = derive$2([
        run$1(focus(), function (sandbox, simulatedEvent) {
          var item = simulatedEvent.event.item;
          layeredState.lookupItem(getItemValue(item)).each(function () {
            var menu = simulatedEvent.event.menu;
            Highlighting.highlight(sandbox, menu);
            var value = getItemValue(simulatedEvent.event.item);
            layeredState.refresh(value).each(function (path) {
              return closeOthers(sandbox, layeredState, path);
            });
          });
        }),
        runOnExecute$1(function (component, simulatedEvent) {
          var target = simulatedEvent.event.target;
          component.getSystem().getByDom(target).each(function (item) {
            var itemValue = getItemValue(item);
            if (itemValue.indexOf('collapse-item') === 0) {
              collapseLeft(component, item);
            }
            expandRight(component, item, ExpandHighlightDecision.HighlightSubmenu).fold(function () {
              detail.onExecute(component, item);
            }, noop);
          });
        }),
        runOnAttached(function (container, _simulatedEvent) {
          setup(container).each(function (primary) {
            Replacing.append(container, premade(primary));
            detail.onOpenMenu(container, primary);
            if (detail.highlightImmediately) {
              setActiveMenu(container, primary);
            }
          });
        })
      ].concat(detail.navigateOnHover ? [run$1(hover(), function (sandbox, simulatedEvent) {
          var item = simulatedEvent.event.item;
          updateView(sandbox, item);
          expandRight(sandbox, item, ExpandHighlightDecision.HighlightParent);
          detail.onHover(sandbox, item);
        })] : []));
      var getActiveItem = function (container) {
        return Highlighting.getHighlighted(container).bind(Highlighting.getHighlighted);
      };
      var collapseMenuApi = function (container) {
        getActiveItem(container).each(function (currentItem) {
          collapseLeft(container, currentItem);
        });
      };
      var highlightPrimary = function (container) {
        layeredState.getPrimary().each(function (primary) {
          setActiveMenu(container, primary);
        });
      };
      var extractMenuFromContainer = function (container) {
        return Optional.from(container.components()[0]).filter(function (comp) {
          return get$c(comp.element, 'role') === 'menu';
        });
      };
      var repositionMenus = function (container) {
        var maybeActivePrimary = layeredState.getPrimary().bind(function (primary) {
          return getActiveItem(container).bind(function (currentItem) {
            var itemValue = getItemValue(currentItem);
            var allMenus = values(layeredState.getMenus());
            var preparedMenus = cat(map$2(allMenus, LayeredState.extractPreparedMenu));
            return layeredState.getTriggeringPath(itemValue, function (v) {
              return getItemByValue(container, preparedMenus, v);
            });
          }).map(function (triggeringPath) {
            return {
              primary: primary,
              triggeringPath: triggeringPath
            };
          });
        });
        maybeActivePrimary.fold(function () {
          extractMenuFromContainer(container).each(function (primaryMenu) {
            detail.onRepositionMenu(container, primaryMenu, []);
          });
        }, function (_a) {
          var primary = _a.primary, triggeringPath = _a.triggeringPath;
          detail.onRepositionMenu(container, primary, triggeringPath);
        });
      };
      var apis = {
        collapseMenu: collapseMenuApi,
        highlightPrimary: highlightPrimary,
        repositionMenus: repositionMenus
      };
      return {
        uid: detail.uid,
        dom: detail.dom,
        markers: detail.markers,
        behaviours: augment(detail.tmenuBehaviours, [
          Keying.config({
            mode: 'special',
            onRight: keyOnItem(onRight),
            onLeft: keyOnItem(onLeft),
            onEscape: keyOnItem(onEscape),
            focusIn: function (container, _keyInfo) {
              layeredState.getPrimary().each(function (primary) {
                dispatch(container, primary.element, focusItem());
              });
            }
          }),
          Highlighting.config({
            highlightClass: detail.markers.selectedMenu,
            itemClass: detail.markers.menu
          }),
          Composing.config({
            find: function (container) {
              return Highlighting.getHighlighted(container);
            }
          }),
          Replacing.config({})
        ]),
        eventOrder: detail.eventOrder,
        apis: apis,
        events: events
      };
    };
    var collapseItem$1 = constant$1('collapse-item');

    var tieredData = function (primary, menus, expansions) {
      return {
        primary: primary,
        menus: menus,
        expansions: expansions
      };
    };
    var singleData = function (name, menu) {
      return {
        primary: name,
        menus: wrap$1(name, menu),
        expansions: {}
      };
    };
    var collapseItem = function (text) {
      return {
        value: generate$6(collapseItem$1()),
        meta: { text: text }
      };
    };
    var tieredMenu = single({
      name: 'TieredMenu',
      configFields: [
        onStrictKeyboardHandler('onExecute'),
        onStrictKeyboardHandler('onEscape'),
        onStrictHandler('onOpenMenu'),
        onStrictHandler('onOpenSubmenu'),
        onHandler('onRepositionMenu'),
        onHandler('onCollapseMenu'),
        defaulted('highlightImmediately', true),
        requiredObjOf('data', [
          required$1('primary'),
          required$1('menus'),
          required$1('expansions')
        ]),
        defaulted('fakeFocus', false),
        onHandler('onHighlight'),
        onHandler('onHover'),
        tieredMenuMarkers(),
        required$1('dom'),
        defaulted('navigateOnHover', true),
        defaulted('stayInDom', false),
        field('tmenuBehaviours', [
          Keying,
          Highlighting,
          Composing,
          Replacing
        ]),
        defaulted('eventOrder', {})
      ],
      apis: {
        collapseMenu: function (apis, tmenu) {
          apis.collapseMenu(tmenu);
        },
        highlightPrimary: function (apis, tmenu) {
          apis.highlightPrimary(tmenu);
        },
        repositionMenus: function (apis, tmenu) {
          apis.repositionMenus(tmenu);
        }
      },
      factory: make$6,
      extraApis: {
        tieredData: tieredData,
        singleData: singleData,
        collapseItem: collapseItem
      }
    });

    var makeMenu = function (detail, menuSandbox, placementSpec, menuSpec, getBounds) {
      var lazySink = function () {
        return detail.lazySink(menuSandbox);
      };
      var layouts = menuSpec.type === 'horizontal' ? {
        layouts: {
          onLtr: function () {
            return belowOrAbove();
          },
          onRtl: function () {
            return belowOrAboveRtl();
          }
        }
      } : {};
      var isFirstTierSubmenu = function (triggeringPaths) {
        return triggeringPaths.length === 2;
      };
      var getSubmenuLayouts = function (triggeringPaths) {
        return isFirstTierSubmenu(triggeringPaths) ? layouts : {};
      };
      return tieredMenu.sketch({
        dom: { tag: 'div' },
        data: menuSpec.data,
        markers: menuSpec.menu.markers,
        highlightImmediately: menuSpec.menu.highlightImmediately,
        onEscape: function () {
          Sandboxing.close(menuSandbox);
          detail.onEscape.map(function (handler) {
            return handler(menuSandbox);
          });
          return Optional.some(true);
        },
        onExecute: function () {
          return Optional.some(true);
        },
        onOpenMenu: function (tmenu, menu) {
          Positioning.positionWithinBounds(lazySink().getOrDie(), menu, placementSpec, getBounds());
        },
        onOpenSubmenu: function (tmenu, item, submenu, triggeringPaths) {
          var sink = lazySink().getOrDie();
          Positioning.position(sink, submenu, {
            anchor: __assign({
              type: 'submenu',
              item: item
            }, getSubmenuLayouts(triggeringPaths))
          });
        },
        onRepositionMenu: function (tmenu, primaryMenu, submenuTriggers) {
          var sink = lazySink().getOrDie();
          Positioning.positionWithinBounds(sink, primaryMenu, placementSpec, getBounds());
          each$1(submenuTriggers, function (st) {
            var submenuLayouts = getSubmenuLayouts(st.triggeringPath);
            Positioning.position(sink, st.triggeredMenu, {
              anchor: __assign({
                type: 'submenu',
                item: st.triggeringItem
              }, submenuLayouts)
            });
          });
        }
      });
    };
    var factory$m = function (detail, spec) {
      var isPartOfRelated = function (sandbox, queryElem) {
        var related = detail.getRelated(sandbox);
        return related.exists(function (rel) {
          return isPartOf$1(rel, queryElem);
        });
      };
      var setContent = function (sandbox, thing) {
        Sandboxing.setContent(sandbox, thing);
      };
      var showAt = function (sandbox, thing, placementSpec) {
        showWithin(sandbox, thing, placementSpec, Optional.none());
      };
      var showWithin = function (sandbox, thing, placementSpec, boxElement) {
        showWithinBounds(sandbox, thing, placementSpec, function () {
          return boxElement.map(function (elem) {
            return box$1(elem);
          });
        });
      };
      var showWithinBounds = function (sandbox, thing, placementSpec, getBounds) {
        var sink = detail.lazySink(sandbox).getOrDie();
        Sandboxing.openWhileCloaked(sandbox, thing, function () {
          return Positioning.positionWithinBounds(sink, sandbox, placementSpec, getBounds());
        });
        Representing.setValue(sandbox, Optional.some({
          mode: 'position',
          config: placementSpec,
          getBounds: getBounds
        }));
      };
      var showMenuAt = function (sandbox, placementSpec, menuSpec) {
        showMenuWithinBounds(sandbox, placementSpec, menuSpec, Optional.none);
      };
      var showMenuWithinBounds = function (sandbox, placementSpec, menuSpec, getBounds) {
        var menu = makeMenu(detail, sandbox, placementSpec, menuSpec, getBounds);
        Sandboxing.open(sandbox, menu);
        Representing.setValue(sandbox, Optional.some({
          mode: 'menu',
          menu: menu
        }));
      };
      var hide = function (sandbox) {
        if (Sandboxing.isOpen(sandbox)) {
          Representing.setValue(sandbox, Optional.none());
          Sandboxing.close(sandbox);
        }
      };
      var getContent = function (sandbox) {
        return Sandboxing.getState(sandbox);
      };
      var reposition = function (sandbox) {
        if (Sandboxing.isOpen(sandbox)) {
          Representing.getValue(sandbox).each(function (state) {
            switch (state.mode) {
            case 'menu':
              Sandboxing.getState(sandbox).each(tieredMenu.repositionMenus);
              break;
            case 'position':
              var sink = detail.lazySink(sandbox).getOrDie();
              Positioning.positionWithinBounds(sink, sandbox, state.config, state.getBounds());
              break;
            }
          });
        }
      };
      var apis = {
        setContent: setContent,
        showAt: showAt,
        showWithin: showWithin,
        showWithinBounds: showWithinBounds,
        showMenuAt: showMenuAt,
        showMenuWithinBounds: showMenuWithinBounds,
        hide: hide,
        getContent: getContent,
        reposition: reposition,
        isOpen: Sandboxing.isOpen
      };
      return {
        uid: detail.uid,
        dom: detail.dom,
        behaviours: augment(detail.inlineBehaviours, [
          Sandboxing.config({
            isPartOf: function (sandbox, data, queryElem) {
              return isPartOf$1(data, queryElem) || isPartOfRelated(sandbox, queryElem);
            },
            getAttachPoint: function (sandbox) {
              return detail.lazySink(sandbox).getOrDie();
            },
            onOpen: function (sandbox) {
              detail.onShow(sandbox);
            },
            onClose: function (sandbox) {
              detail.onHide(sandbox);
            }
          }),
          Representing.config({
            store: {
              mode: 'memory',
              initialValue: Optional.none()
            }
          }),
          Receiving.config({
            channels: __assign(__assign({}, receivingChannel$1(__assign({ isExtraPart: spec.isExtraPart }, detail.fireDismissalEventInstead.map(function (fe) {
              return { fireEventInstead: { event: fe.event } };
            }).getOr({})))), receivingChannel(__assign(__assign({}, detail.fireRepositionEventInstead.map(function (fe) {
              return { fireEventInstead: { event: fe.event } };
            }).getOr({})), { doReposition: reposition })))
          })
        ]),
        eventOrder: detail.eventOrder,
        apis: apis
      };
    };
    var InlineView = single({
      name: 'InlineView',
      configFields: [
        required$1('lazySink'),
        onHandler('onShow'),
        onHandler('onHide'),
        optionFunction('onEscape'),
        field('inlineBehaviours', [
          Sandboxing,
          Representing,
          Receiving
        ]),
        optionObjOf('fireDismissalEventInstead', [defaulted('event', dismissRequested())]),
        optionObjOf('fireRepositionEventInstead', [defaulted('event', repositionRequested())]),
        defaulted('getRelated', Optional.none),
        defaulted('isExtraPart', never),
        defaulted('eventOrder', Optional.none)
      ],
      factory: factory$m,
      apis: {
        showAt: function (apis, component, anchor, thing) {
          apis.showAt(component, anchor, thing);
        },
        showWithin: function (apis, component, anchor, thing, boxElement) {
          apis.showWithin(component, anchor, thing, boxElement);
        },
        showWithinBounds: function (apis, component, anchor, thing, bounds) {
          apis.showWithinBounds(component, anchor, thing, bounds);
        },
        showMenuAt: function (apis, component, anchor, menuSpec) {
          apis.showMenuAt(component, anchor, menuSpec);
        },
        showMenuWithinBounds: function (apis, component, anchor, menuSpec, bounds) {
          apis.showMenuWithinBounds(component, anchor, menuSpec, bounds);
        },
        hide: function (apis, component) {
          apis.hide(component);
        },
        isOpen: function (apis, component) {
          return apis.isOpen(component);
        },
        getContent: function (apis, component) {
          return apis.getContent(component);
        },
        setContent: function (apis, component, thing) {
          apis.setContent(component, thing);
        },
        reposition: function (apis, component) {
          apis.reposition(component);
        }
      }
    });

    var labelPrefix = 'layout-inset';
    var westEdgeX = function (anchor) {
      return anchor.x;
    };
    var middleX = function (anchor, element) {
      return anchor.x + anchor.width / 2 - element.width / 2;
    };
    var eastEdgeX = function (anchor, element) {
      return anchor.x + anchor.width - element.width;
    };
    var northY = function (anchor) {
      return anchor.y;
    };
    var southY = function (anchor, element) {
      return anchor.y + anchor.height - element.height;
    };
    var centreY = function (anchor, element) {
      return anchor.y + anchor.height / 2 - element.height / 2;
    };
    var southwest = function (anchor, element, bubbles) {
      return nu$6(eastEdgeX(anchor, element), southY(anchor, element), bubbles.insetSouthwest(), northwest$3(), 'southwest', boundsRestriction(anchor, {
        right: 0,
        bottom: 3
      }), labelPrefix);
    };
    var southeast = function (anchor, element, bubbles) {
      return nu$6(westEdgeX(anchor), southY(anchor, element), bubbles.insetSoutheast(), northeast$3(), 'southeast', boundsRestriction(anchor, {
        left: 1,
        bottom: 3
      }), labelPrefix);
    };
    var northwest = function (anchor, element, bubbles) {
      return nu$6(eastEdgeX(anchor, element), northY(anchor), bubbles.insetNorthwest(), southwest$3(), 'northwest', boundsRestriction(anchor, {
        right: 0,
        top: 2
      }), labelPrefix);
    };
    var northeast = function (anchor, element, bubbles) {
      return nu$6(westEdgeX(anchor), northY(anchor), bubbles.insetNortheast(), southeast$3(), 'northeast', boundsRestriction(anchor, {
        left: 1,
        top: 2
      }), labelPrefix);
    };
    var north = function (anchor, element, bubbles) {
      return nu$6(middleX(anchor, element), northY(anchor), bubbles.insetNorth(), south$3(), 'north', boundsRestriction(anchor, { top: 2 }), labelPrefix);
    };
    var south = function (anchor, element, bubbles) {
      return nu$6(middleX(anchor, element), southY(anchor, element), bubbles.insetSouth(), north$3(), 'south', boundsRestriction(anchor, { bottom: 3 }), labelPrefix);
    };
    var east = function (anchor, element, bubbles) {
      return nu$6(eastEdgeX(anchor, element), centreY(anchor, element), bubbles.insetEast(), west$3(), 'east', boundsRestriction(anchor, { right: 0 }), labelPrefix);
    };
    var west = function (anchor, element, bubbles) {
      return nu$6(westEdgeX(anchor), centreY(anchor, element), bubbles.insetWest(), east$3(), 'west', boundsRestriction(anchor, { left: 1 }), labelPrefix);
    };
    var lookupPreserveLayout = function (lastPlacement) {
      switch (lastPlacement) {
      case 'north':
        return north;
      case 'northeast':
        return northeast;
      case 'northwest':
        return northwest;
      case 'south':
        return south;
      case 'southeast':
        return southeast;
      case 'southwest':
        return southwest;
      case 'east':
        return east;
      case 'west':
        return west;
      }
    };
    var preserve = function (anchor, element, bubbles, placee, bounds) {
      var layout = getPlacement(placee).map(lookupPreserveLayout).getOr(north);
      return layout(anchor, element, bubbles, placee, bounds);
    };
    var lookupFlippedLayout = function (lastPlacement) {
      switch (lastPlacement) {
      case 'north':
        return south;
      case 'northeast':
        return southeast;
      case 'northwest':
        return southwest;
      case 'south':
        return north;
      case 'southeast':
        return northeast;
      case 'southwest':
        return northwest;
      case 'east':
        return west;
      case 'west':
        return east;
      }
    };
    var flip$2 = function (anchor, element, bubbles, placee, bounds) {
      var layout = getPlacement(placee).map(lookupFlippedLayout).getOr(north);
      return layout(anchor, element, bubbles, placee, bounds);
    };

    var global$g = tinymce.util.Tools.resolve('tinymce.util.Delay');

    var factory$l = function (detail) {
      var events = events$a(detail.action);
      var tag = detail.dom.tag;
      var lookupAttr = function (attr) {
        return get$e(detail.dom, 'attributes').bind(function (attrs) {
          return get$e(attrs, attr);
        });
      };
      var getModAttributes = function () {
        if (tag === 'button') {
          var type = lookupAttr('type').getOr('button');
          var roleAttrs = lookupAttr('role').map(function (role) {
            return { role: role };
          }).getOr({});
          return __assign({ type: type }, roleAttrs);
        } else {
          var role = lookupAttr('role').getOr('button');
          return { role: role };
        }
      };
      return {
        uid: detail.uid,
        dom: detail.dom,
        components: detail.components,
        events: events,
        behaviours: SketchBehaviours.augment(detail.buttonBehaviours, [
          Focusing.config({}),
          Keying.config({
            mode: 'execution',
            useSpace: true,
            useEnter: true
          })
        ]),
        domModification: { attributes: getModAttributes() },
        eventOrder: detail.eventOrder
      };
    };
    var Button = single({
      name: 'Button',
      factory: factory$l,
      configFields: [
        defaulted('uid', undefined),
        required$1('dom'),
        defaulted('components', []),
        SketchBehaviours.field('buttonBehaviours', [
          Focusing,
          Keying
        ]),
        option('action'),
        option('role'),
        defaulted('eventOrder', {})
      ]
    });

    var record = function (spec) {
      var uid = isSketchSpec(spec) && hasNonNullableKey(spec, 'uid') ? spec.uid : generate$5('memento');
      var get = function (anyInSystem) {
        return anyInSystem.getSystem().getByUid(uid).getOrDie();
      };
      var getOpt = function (anyInSystem) {
        return anyInSystem.getSystem().getByUid(uid).toOptional();
      };
      var asSpec = function () {
        return __assign(__assign({}, spec), { uid: uid });
      };
      return {
        get: get,
        getOpt: getOpt,
        asSpec: asSpec
      };
    };

    var global$f = tinymce.util.Tools.resolve('tinymce.util.I18n');

    var rtlTransform = {
      'indent': true,
      'outdent': true,
      'table-insert-column-after': true,
      'table-insert-column-before': true,
      'paste-column-after': true,
      'paste-column-before': true,
      'unordered-list': true,
      'list-bull-circle': true,
      'list-bull-default': true,
      'list-bull-square': true
    };
    var defaultIconName = 'temporary-placeholder';
    var defaultIcon = function (icons) {
      return function () {
        return get$e(icons, defaultIconName).getOr('!not found!');
      };
    };
    var getIconName = function (name, icons) {
      var lcName = name.toLowerCase();
      if (global$f.isRtl()) {
        var rtlName = ensureTrailing(lcName, '-rtl');
        return has$2(icons, rtlName) ? rtlName : lcName;
      } else {
        return lcName;
      }
    };
    var lookupIcon = function (name, icons) {
      return get$e(icons, getIconName(name, icons));
    };
    var get$1 = function (name, iconProvider) {
      var icons = iconProvider();
      return lookupIcon(name, icons).getOrThunk(defaultIcon(icons));
    };
    var getOr = function (name, iconProvider, fallbackIcon) {
      var icons = iconProvider();
      return lookupIcon(name, icons).or(fallbackIcon).getOrThunk(defaultIcon(icons));
    };
    var needsRtlTransform = function (iconName) {
      return global$f.isRtl() ? has$2(rtlTransform, iconName) : false;
    };
    var addFocusableBehaviour = function () {
      return config('add-focusable', [runOnAttached(function (comp) {
          child(comp.element, 'svg').each(function (svg) {
            return set$7(svg, 'focusable', 'false');
          });
        })]);
    };
    var renderIcon$2 = function (spec, iconName, icons, fallbackIcon) {
      var _a, _b;
      var rtlIconClasses = needsRtlTransform(iconName) ? ['tox-icon--flip'] : [];
      var iconHtml = get$e(icons, getIconName(iconName, icons)).or(fallbackIcon).getOrThunk(defaultIcon(icons));
      return {
        dom: {
          tag: spec.tag,
          attributes: (_a = spec.attributes) !== null && _a !== void 0 ? _a : {},
          classes: spec.classes.concat(rtlIconClasses),
          innerHtml: iconHtml
        },
        behaviours: derive$1(__spreadArray(__spreadArray([], (_b = spec.behaviours) !== null && _b !== void 0 ? _b : []), [addFocusableBehaviour()]))
      };
    };
    var render$3 = function (iconName, spec, iconProvider, fallbackIcon) {
      if (fallbackIcon === void 0) {
        fallbackIcon = Optional.none();
      }
      return renderIcon$2(spec, iconName, iconProvider(), fallbackIcon);
    };
    var renderFirst = function (iconNames, spec, iconProvider) {
      var icons = iconProvider();
      var iconName = find$5(iconNames, function (name) {
        return has$2(icons, getIconName(name, icons));
      });
      return renderIcon$2(spec, iconName.getOr(defaultIconName), icons, Optional.none());
    };

    var notificationIconMap = {
      success: 'checkmark',
      error: 'warning',
      err: 'error',
      warning: 'warning',
      warn: 'warning',
      info: 'info'
    };
    var factory$k = function (detail) {
      var memBannerText = record({
        dom: {
          tag: 'p',
          innerHtml: detail.translationProvider(detail.text)
        },
        behaviours: derive$1([Replacing.config({})])
      });
      var renderPercentBar = function (percent) {
        return {
          dom: {
            tag: 'div',
            classes: ['tox-bar'],
            attributes: { style: 'width: ' + percent + '%' }
          }
        };
      };
      var renderPercentText = function (percent) {
        return {
          dom: {
            tag: 'div',
            classes: ['tox-text'],
            innerHtml: percent + '%'
          }
        };
      };
      var memBannerProgress = record({
        dom: {
          tag: 'div',
          classes: detail.progress ? [
            'tox-progress-bar',
            'tox-progress-indicator'
          ] : ['tox-progress-bar']
        },
        components: [
          {
            dom: {
              tag: 'div',
              classes: ['tox-bar-container']
            },
            components: [renderPercentBar(0)]
          },
          renderPercentText(0)
        ],
        behaviours: derive$1([Replacing.config({})])
      });
      var updateProgress = function (comp, percent) {
        if (comp.getSystem().isConnected()) {
          memBannerProgress.getOpt(comp).each(function (progress) {
            Replacing.set(progress, [
              {
                dom: {
                  tag: 'div',
                  classes: ['tox-bar-container']
                },
                components: [renderPercentBar(percent)]
              },
              renderPercentText(percent)
            ]);
          });
        }
      };
      var updateText = function (comp, text$1) {
        if (comp.getSystem().isConnected()) {
          var banner = memBannerText.get(comp);
          Replacing.set(banner, [text(text$1)]);
        }
      };
      var apis = {
        updateProgress: updateProgress,
        updateText: updateText
      };
      var iconChoices = flatten([
        detail.icon.toArray(),
        detail.level.toArray(),
        detail.level.bind(function (level) {
          return Optional.from(notificationIconMap[level]);
        }).toArray()
      ]);
      var memButton = record(Button.sketch({
        dom: {
          tag: 'button',
          classes: [
            'tox-notification__dismiss',
            'tox-button',
            'tox-button--naked',
            'tox-button--icon'
          ]
        },
        components: [render$3('close', {
            tag: 'div',
            classes: ['tox-icon'],
            attributes: { 'aria-label': detail.translationProvider('Close') }
          }, detail.iconProvider)],
        action: function (comp) {
          detail.onAction(comp);
        }
      }));
      var notificationIconSpec = renderFirst(iconChoices, {
        tag: 'div',
        classes: ['tox-notification__icon']
      }, detail.iconProvider);
      var notificationBodySpec = {
        dom: {
          tag: 'div',
          classes: ['tox-notification__body']
        },
        components: [memBannerText.asSpec()],
        behaviours: derive$1([Replacing.config({})])
      };
      var components = [
        notificationIconSpec,
        notificationBodySpec
      ];
      return {
        uid: detail.uid,
        dom: {
          tag: 'div',
          attributes: { role: 'alert' },
          classes: detail.level.map(function (level) {
            return [
              'tox-notification',
              'tox-notification--in',
              'tox-notification--' + level
            ];
          }).getOr([
            'tox-notification',
            'tox-notification--in'
          ])
        },
        behaviours: derive$1([
          Focusing.config({}),
          config('notification-events', [run$1(focusin(), function (comp) {
              memButton.getOpt(comp).each(Focusing.focus);
            })])
        ]),
        components: components.concat(detail.progress ? [memBannerProgress.asSpec()] : []).concat(!detail.closeButton ? [] : [memButton.asSpec()]),
        apis: apis
      };
    };
    var Notification = single({
      name: 'Notification',
      factory: factory$k,
      configFields: [
        option('level'),
        required$1('progress'),
        required$1('icon'),
        required$1('onAction'),
        required$1('text'),
        required$1('iconProvider'),
        required$1('translationProvider'),
        defaultedBoolean('closeButton', true)
      ],
      apis: {
        updateProgress: function (apis, comp, percent) {
          apis.updateProgress(comp, percent);
        },
        updateText: function (apis, comp, text) {
          apis.updateText(comp, text);
        }
      }
    });

    function NotificationManagerImpl (editor, extras, uiMothership) {
      var sharedBackstage = extras.backstage.shared;
      var getLayoutDirection = function (rel) {
        switch (rel) {
        case 'bc-bc':
          return south;
        case 'tc-tc':
          return north;
        case 'tc-bc':
          return north$2;
        case 'bc-tc':
        default:
          return south$2;
        }
      };
      var prePositionNotifications = function (notifications) {
        each$1(notifications, function (notification) {
          return notification.moveTo(0, 0);
        });
      };
      var positionNotifications = function (notifications) {
        if (notifications.length > 0) {
          head(notifications).each(function (firstItem) {
            return firstItem.moveRel(null, 'banner');
          });
          each$1(notifications, function (notification, index) {
            if (index > 0) {
              notification.moveRel(notifications[index - 1].getEl(), 'bc-tc');
            }
          });
        }
      };
      var reposition = function (notifications) {
        prePositionNotifications(notifications);
        positionNotifications(notifications);
      };
      var open = function (settings, closeCallback) {
        var hideCloseButton = !settings.closeButton && settings.timeout && (settings.timeout > 0 || settings.timeout < 0);
        var close = function () {
          closeCallback();
          InlineView.hide(notificationWrapper);
        };
        var notification = build$1(Notification.sketch({
          text: settings.text,
          level: contains$2([
            'success',
            'error',
            'warning',
            'warn',
            'info'
          ], settings.type) ? settings.type : undefined,
          progress: settings.progressBar === true,
          icon: Optional.from(settings.icon),
          closeButton: !hideCloseButton,
          onAction: close,
          iconProvider: sharedBackstage.providers.icons,
          translationProvider: sharedBackstage.providers.translate
        }));
        var notificationWrapper = build$1(InlineView.sketch(__assign({
          dom: {
            tag: 'div',
            classes: ['tox-notifications-container']
          },
          lazySink: sharedBackstage.getSink,
          fireDismissalEventInstead: {}
        }, sharedBackstage.header.isPositionedAtTop() ? {} : { fireRepositionEventInstead: {} })));
        uiMothership.add(notificationWrapper);
        if (settings.timeout > 0) {
          global$g.setTimeout(function () {
            close();
          }, settings.timeout);
        }
        return {
          close: close,
          moveTo: function (x, y) {
            InlineView.showAt(notificationWrapper, premade(notification), {
              anchor: {
                type: 'makeshift',
                x: x,
                y: y
              }
            });
          },
          moveRel: function (element, rel) {
            if (rel !== 'banner') {
              var layoutDirection_1 = getLayoutDirection(rel);
              var nodeAnchor = {
                type: 'node',
                root: body(),
                node: Optional.some(SugarElement.fromDom(element)),
                layouts: {
                  onRtl: function () {
                    return [layoutDirection_1];
                  },
                  onLtr: function () {
                    return [layoutDirection_1];
                  }
                }
              };
              InlineView.showAt(notificationWrapper, premade(notification), { anchor: nodeAnchor });
            } else {
              InlineView.showAt(notificationWrapper, premade(notification), { anchor: sharedBackstage.anchors.banner() });
            }
          },
          text: function (nuText) {
            Notification.updateText(notification, nuText);
          },
          settings: settings,
          getEl: function () {
            return notification.element.dom;
          },
          progressBar: {
            value: function (percent) {
              Notification.updateProgress(notification, percent);
            }
          }
        };
      };
      var close = function (notification) {
        notification.close();
      };
      var getArgs = function (notification) {
        return notification.settings;
      };
      return {
        open: open,
        close: close,
        reposition: reposition,
        getArgs: getArgs
      };
    }

    var first = function (fn, rate) {
      var timer = null;
      var cancel = function () {
        if (!isNull(timer)) {
          clearTimeout(timer);
          timer = null;
        }
      };
      var throttle = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        if (isNull(timer)) {
          timer = setTimeout(function () {
            timer = null;
            fn.apply(null, args);
          }, rate);
        }
      };
      return {
        cancel: cancel,
        throttle: throttle
      };
    };
    var last = function (fn, rate) {
      var timer = null;
      var cancel = function () {
        if (!isNull(timer)) {
          clearTimeout(timer);
          timer = null;
        }
      };
      var throttle = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        cancel();
        timer = setTimeout(function () {
          timer = null;
          fn.apply(null, args);
        }, rate);
      };
      return {
        cancel: cancel,
        throttle: throttle
      };
    };

    var global$e = tinymce.util.Tools.resolve('tinymce.dom.TextSeeker');

    var isBoundary = function (dom, node) {
      return dom.isBlock(node) || contains$2([
        'BR',
        'IMG',
        'HR',
        'INPUT'
      ], node.nodeName) || dom.getContentEditable(node) === 'false';
    };
    var repeatLeft = function (dom, node, offset, process, rootNode) {
      var search = global$e(dom, function (node) {
        return isBoundary(dom, node);
      });
      return Optional.from(search.backwards(node, offset, process, rootNode));
    };

    var autocompleteSelector = '[data-mce-autocompleter]';
    var create$4 = function (editor, range) {
      return detect(SugarElement.fromDom(editor.selection.getNode())).getOrThunk(function () {
        var wrapper = SugarElement.fromHtml('<span data-mce-autocompleter="1" data-mce-bogus="1"></span>', editor.getDoc());
        append$2(wrapper, SugarElement.fromDom(range.extractContents()));
        range.insertNode(wrapper.dom);
        parent(wrapper).each(function (elm) {
          return elm.dom.normalize();
        });
        last$1(wrapper).map(function (last) {
          editor.selection.setCursorLocation(last.dom, getEnd(last));
        });
        return wrapper;
      });
    };
    var detect = function (elm) {
      return closest$1(elm, autocompleteSelector);
    };

    var isValidTextRange = function (rng) {
      return rng.collapsed && rng.startContainer.nodeType === 3;
    };
    var getText = function (rng) {
      return rng.toString().replace(/\u00A0/g, ' ').replace(/\uFEFF/g, '');
    };
    var isWhitespace = function (chr) {
      return chr !== '' && ' \xA0\f\n\r\t\x0B'.indexOf(chr) !== -1;
    };

    var stripTriggerChar = function (text, triggerCh) {
      return text.substring(triggerCh.length);
    };
    var findChar = function (text, index, ch) {
      var i;
      for (i = index - 1; i >= 0; i--) {
        var char = text.charAt(i);
        if (isWhitespace(char)) {
          return Optional.none();
        }
        if (char === ch) {
          break;
        }
      }
      return Optional.some(i);
    };
    var findStart = function (dom, initRange, ch, minChars) {
      if (minChars === void 0) {
        minChars = 0;
      }
      if (!isValidTextRange(initRange)) {
        return Optional.none();
      }
      var findTriggerChIndex = function (element, offset, text) {
        return findChar(text, offset, ch).getOr(offset);
      };
      var root = dom.getParent(initRange.startContainer, dom.isBlock) || dom.getRoot();
      return repeatLeft(dom, initRange.startContainer, initRange.startOffset, findTriggerChIndex, root).bind(function (spot) {
        var range = initRange.cloneRange();
        range.setStart(spot.container, spot.offset);
        range.setEnd(initRange.endContainer, initRange.endOffset);
        if (range.collapsed) {
          return Optional.none();
        }
        var text = getText(range);
        var triggerCharIndex = text.lastIndexOf(ch);
        if (triggerCharIndex !== 0 || stripTriggerChar(text, ch).length < minChars) {
          return Optional.none();
        } else {
          return Optional.some({
            text: stripTriggerChar(text, ch),
            range: range,
            triggerChar: ch
          });
        }
      });
    };
    var getContext = function (dom, initRange, ch, minChars) {
      if (minChars === void 0) {
        minChars = 0;
      }
      return detect(SugarElement.fromDom(initRange.startContainer)).fold(function () {
        return findStart(dom, initRange, ch, minChars);
      }, function (elm) {
        var range = dom.createRng();
        range.selectNode(elm.dom);
        var text = getText(range);
        return Optional.some({
          range: range,
          text: stripTriggerChar(text, ch),
          triggerChar: ch
        });
      });
    };

    var setup$e = function (api, editor) {
      editor.on('keypress compositionend', api.onKeypress.throttle);
      editor.on('remove', api.onKeypress.cancel);
      var redirectKeyToItem = function (item, e) {
        emitWith(item, keydown(), { raw: e });
      };
      editor.on('keydown', function (e) {
        var getItem = function () {
          return api.getView().bind(Highlighting.getHighlighted);
        };
        if (e.which === 8) {
          api.onKeypress.throttle(e);
        }
        if (api.isActive()) {
          if (e.which === 27) {
            api.cancelIfNecessary();
          }
          if (api.isMenuOpen()) {
            if (e.which === 13) {
              getItem().each(emitExecute);
              e.preventDefault();
            } else if (e.which === 40) {
              getItem().fold(function () {
                api.getView().each(Highlighting.highlightFirst);
              }, function (item) {
                redirectKeyToItem(item, e);
              });
              e.preventDefault();
              e.stopImmediatePropagation();
            } else if (e.which === 37 || e.which === 38 || e.which === 39) {
              getItem().each(function (item) {
                redirectKeyToItem(item, e);
                e.preventDefault();
                e.stopImmediatePropagation();
              });
            }
          } else {
            if (e.which === 13 || e.which === 38 || e.which === 40) {
              api.cancelIfNecessary();
            }
          }
        }
      });
      editor.on('NodeChange', function (e) {
        if (api.isActive() && !api.isProcessingAction() && detect(SugarElement.fromDom(e.element)).isNone()) {
          api.cancelIfNecessary();
        }
      });
    };
    var AutocompleterEditorEvents = { setup: setup$e };

    var global$d = tinymce.util.Tools.resolve('tinymce.util.Promise');

    var point = function (container, offset) {
      return {
        container: container,
        offset: offset
      };
    };

    var isText = function (node) {
      return node.nodeType === TEXT;
    };
    var isElement$1 = function (node) {
      return node.nodeType === ELEMENT;
    };
    var toLast = function (node) {
      if (isText(node)) {
        return point(node, node.data.length);
      } else {
        var children = node.childNodes;
        return children.length > 0 ? toLast(children[children.length - 1]) : point(node, children.length);
      }
    };
    var toLeaf = function (node, offset) {
      var children = node.childNodes;
      if (children.length > 0 && offset < children.length) {
        return toLeaf(children[offset], 0);
      } else if (children.length > 0 && isElement$1(node) && children.length === offset) {
        return toLast(children[children.length - 1]);
      } else {
        return point(node, offset);
      }
    };

    var isPreviousCharContent = function (dom, leaf) {
      return repeatLeft(dom, leaf.container, leaf.offset, function (element, offset) {
        return offset === 0 ? -1 : offset;
      }, dom.getRoot()).filter(function (spot) {
        var char = spot.container.data.charAt(spot.offset - 1);
        return !isWhitespace(char);
      }).isSome();
    };
    var isStartOfWord = function (dom) {
      return function (rng) {
        var leaf = toLeaf(rng.startContainer, rng.startOffset);
        return !isPreviousCharContent(dom, leaf);
      };
    };
    var getTriggerContext = function (dom, initRange, database) {
      return findMap(database.triggerChars, function (ch) {
        return getContext(dom, initRange, ch);
      });
    };
    var lookup$2 = function (editor, getDatabase) {
      var database = getDatabase();
      var rng = editor.selection.getRng();
      return getTriggerContext(editor.dom, rng, database).bind(function (context) {
        return lookupWithContext(editor, getDatabase, context);
      });
    };
    var lookupWithContext = function (editor, getDatabase, context, fetchOptions) {
      if (fetchOptions === void 0) {
        fetchOptions = {};
      }
      var database = getDatabase();
      var rng = editor.selection.getRng();
      var startText = rng.startContainer.nodeValue;
      var autocompleters = filter$2(database.lookupByChar(context.triggerChar), function (autocompleter) {
        return context.text.length >= autocompleter.minChars && autocompleter.matches.getOrThunk(function () {
          return isStartOfWord(editor.dom);
        })(context.range, startText, context.text);
      });
      if (autocompleters.length === 0) {
        return Optional.none();
      }
      var lookupData = global$d.all(map$2(autocompleters, function (ac) {
        var fetchResult = ac.fetch(context.text, ac.maxResults, fetchOptions);
        return fetchResult.then(function (results) {
          return {
            matchText: context.text,
            items: results,
            columns: ac.columns,
            onAction: ac.onAction,
            highlightOn: ac.highlightOn
          };
        });
      }));
      return Optional.some({
        lookupData: lookupData,
        context: context
      });
    };

    var separatorMenuItemSchema = objOf([
      requiredString('type'),
      optionString('text')
    ]);
    var createSeparatorMenuItem = function (spec) {
      return asRaw('separatormenuitem', separatorMenuItemSchema, spec);
    };

    var autocompleterItemSchema = objOf([
      defaulted('type', 'autocompleteitem'),
      defaulted('active', false),
      defaulted('disabled', false),
      defaulted('meta', {}),
      requiredString('value'),
      optionString('text'),
      optionString('icon')
    ]);
    var autocompleterSchema = objOf([
      requiredString('type'),
      requiredString('ch'),
      defaultedNumber('minChars', 1),
      defaulted('columns', 1),
      defaultedNumber('maxResults', 10),
      optionFunction('matches'),
      requiredFunction('fetch'),
      requiredFunction('onAction'),
      defaultedArrayOf('highlightOn', [], string)
    ]);
    var createSeparatorItem = function (spec) {
      return asRaw('Autocompleter.Separator', separatorMenuItemSchema, spec);
    };
    var createAutocompleterItem = function (spec) {
      return asRaw('Autocompleter.Item', autocompleterItemSchema, spec);
    };
    var createAutocompleter = function (spec) {
      return asRaw('Autocompleter', autocompleterSchema, spec);
    };

    var baseToolbarButtonFields = [
      defaultedBoolean('disabled', false),
      optionString('tooltip'),
      optionString('icon'),
      optionString('text'),
      defaultedFunction('onSetup', function () {
        return noop;
      })
    ];
    var toolbarButtonSchema = objOf([
      requiredString('type'),
      requiredFunction('onAction')
    ].concat(baseToolbarButtonFields));
    var createToolbarButton = function (spec) {
      return asRaw('toolbarbutton', toolbarButtonSchema, spec);
    };

    var baseToolbarToggleButtonFields = [defaultedBoolean('active', false)].concat(baseToolbarButtonFields);
    var toggleButtonSchema = objOf(baseToolbarToggleButtonFields.concat([
      requiredString('type'),
      requiredFunction('onAction')
    ]));
    var createToggleButton = function (spec) {
      return asRaw('ToggleButton', toggleButtonSchema, spec);
    };

    var contextBarFields = [
      defaultedFunction('predicate', never),
      defaultedStringEnum('scope', 'node', [
        'node',
        'editor'
      ]),
      defaultedStringEnum('position', 'selection', [
        'node',
        'selection',
        'line'
      ])
    ];

    var contextButtonFields = baseToolbarButtonFields.concat([
      defaulted('type', 'contextformbutton'),
      defaulted('primary', false),
      requiredFunction('onAction'),
      customField('original', identity$1)
    ]);
    var contextToggleButtonFields = baseToolbarToggleButtonFields.concat([
      defaulted('type', 'contextformbutton'),
      defaulted('primary', false),
      requiredFunction('onAction'),
      customField('original', identity$1)
    ]);
    var launchButtonFields = baseToolbarButtonFields.concat([defaulted('type', 'contextformbutton')]);
    var launchToggleButtonFields = baseToolbarToggleButtonFields.concat([defaulted('type', 'contextformtogglebutton')]);
    var toggleOrNormal = choose$1('type', {
      contextformbutton: contextButtonFields,
      contextformtogglebutton: contextToggleButtonFields
    });
    var contextFormSchema = objOf([
      defaulted('type', 'contextform'),
      defaultedFunction('initValue', constant$1('')),
      optionString('label'),
      requiredArrayOf('commands', toggleOrNormal),
      optionOf('launch', choose$1('type', {
        contextformbutton: launchButtonFields,
        contextformtogglebutton: launchToggleButtonFields
      }))
    ].concat(contextBarFields));
    var createContextForm = function (spec) {
      return asRaw('ContextForm', contextFormSchema, spec);
    };

    var contextToolbarSchema = objOf([
      defaulted('type', 'contexttoolbar'),
      requiredString('items')
    ].concat(contextBarFields));
    var createContextToolbar = function (spec) {
      return asRaw('ContextToolbar', contextToolbarSchema, spec);
    };

    var stringArray = function (a) {
      var all = {};
      each$1(a, function (key) {
        all[key] = {};
      });
      return keys(all);
    };

    var register$b = function (editor) {
      var popups = editor.ui.registry.getAll().popups;
      var dataset = map(popups, function (popup) {
        return createAutocompleter(popup).fold(function (err) {
          throw new Error(formatError(err));
        }, identity$1);
      });
      var triggerChars = stringArray(mapToArray(dataset, function (v) {
        return v.ch;
      }));
      var datasetValues = values(dataset);
      var lookupByChar = function (ch) {
        return filter$2(datasetValues, function (dv) {
          return dv.ch === ch;
        });
      };
      return {
        dataset: dataset,
        triggerChars: triggerChars,
        lookupByChar: lookupByChar
      };
    };

    var ItemResponse;
    (function (ItemResponse) {
      ItemResponse[ItemResponse['CLOSE_ON_EXECUTE'] = 0] = 'CLOSE_ON_EXECUTE';
      ItemResponse[ItemResponse['BUBBLE_TO_SANDBOX'] = 1] = 'BUBBLE_TO_SANDBOX';
    }(ItemResponse || (ItemResponse = {})));
    var ItemResponse$1 = ItemResponse;

    var navClass = 'tox-menu-nav__js';
    var selectableClass = 'tox-collection__item';
    var colorClass = 'tox-swatch';
    var presetClasses = {
      normal: navClass,
      color: colorClass
    };
    var tickedClass = 'tox-collection__item--enabled';
    var groupHeadingClass = 'tox-collection__group-heading';
    var iconClass = 'tox-collection__item-icon';
    var textClass = 'tox-collection__item-label';
    var accessoryClass = 'tox-collection__item-accessory';
    var caretClass = 'tox-collection__item-caret';
    var checkmarkClass = 'tox-collection__item-checkmark';
    var activeClass = 'tox-collection__item--active';
    var containerClass = 'tox-collection__item-container';
    var containerColumnClass = 'tox-collection__item-container--column';
    var containerRowClass = 'tox-collection__item-container--row';
    var containerAlignRightClass = 'tox-collection__item-container--align-right';
    var containerAlignLeftClass = 'tox-collection__item-container--align-left';
    var containerValignTopClass = 'tox-collection__item-container--valign-top';
    var containerValignMiddleClass = 'tox-collection__item-container--valign-middle';
    var containerValignBottomClass = 'tox-collection__item-container--valign-bottom';
    var classForPreset = function (presets) {
      return get$e(presetClasses, presets).getOr(navClass);
    };

    var forMenu = function (presets) {
      if (presets === 'color') {
        return 'tox-swatches';
      } else {
        return 'tox-menu';
      }
    };
    var classes = function (presets) {
      return {
        backgroundMenu: 'tox-background-menu',
        selectedMenu: 'tox-selected-menu',
        selectedItem: 'tox-collection__item--active',
        hasIcons: 'tox-menu--has-icons',
        menu: forMenu(presets),
        tieredMenu: 'tox-tiered-menu'
      };
    };

    var markers = function (presets) {
      var menuClasses = classes(presets);
      return {
        backgroundMenu: menuClasses.backgroundMenu,
        selectedMenu: menuClasses.selectedMenu,
        menu: menuClasses.menu,
        selectedItem: menuClasses.selectedItem,
        item: classForPreset(presets)
      };
    };
    var dom$1 = function (hasIcons, columns, presets) {
      var menuClasses = classes(presets);
      return {
        tag: 'div',
        classes: flatten([
          [
            menuClasses.menu,
            'tox-menu-' + columns + '-column'
          ],
          hasIcons ? [menuClasses.hasIcons] : []
        ])
      };
    };
    var components = [Menu.parts.items({})];
    var part = function (hasIcons, columns, presets) {
      var menuClasses = classes(presets);
      var d = {
        tag: 'div',
        classes: flatten([[menuClasses.tieredMenu]])
      };
      return {
        dom: d,
        markers: markers(presets)
      };
    };

    var chunk = function (rowDom, numColumns) {
      return function (items) {
        var chunks = chunk$1(items, numColumns);
        return map$2(chunks, function (c) {
          return {
            dom: rowDom,
            components: c
          };
        });
      };
    };
    var forSwatch = function (columns) {
      return {
        dom: {
          tag: 'div',
          classes: [
            'tox-menu',
            'tox-swatches-menu'
          ]
        },
        components: [{
            dom: {
              tag: 'div',
              classes: ['tox-swatches']
            },
            components: [Menu.parts.items({
                preprocess: columns !== 'auto' ? chunk({
                  tag: 'div',
                  classes: ['tox-swatches__row']
                }, columns) : identity$1
              })]
          }]
      };
    };
    var forToolbar = function (columns) {
      return {
        dom: {
          tag: 'div',
          classes: [
            'tox-menu',
            'tox-collection',
            'tox-collection--toolbar',
            'tox-collection--toolbar-lg'
          ]
        },
        components: [Menu.parts.items({
            preprocess: chunk({
              tag: 'div',
              classes: ['tox-collection__group']
            }, columns)
          })]
      };
    };
    var preprocessCollection = function (items, isSeparator) {
      var allSplits = [];
      var currentSplit = [];
      each$1(items, function (item, i) {
        if (isSeparator(item, i)) {
          if (currentSplit.length > 0) {
            allSplits.push(currentSplit);
          }
          currentSplit = [];
          if (has$2(item.dom, 'innerHtml')) {
            currentSplit.push(item);
          }
        } else {
          currentSplit.push(item);
        }
      });
      if (currentSplit.length > 0) {
        allSplits.push(currentSplit);
      }
      return map$2(allSplits, function (s) {
        return {
          dom: {
            tag: 'div',
            classes: ['tox-collection__group']
          },
          components: s
        };
      });
    };
    var forCollection = function (columns, initItems, _hasIcons) {
      return {
        dom: {
          tag: 'div',
          classes: [
            'tox-menu',
            'tox-collection'
          ].concat(columns === 1 ? ['tox-collection--list'] : ['tox-collection--grid'])
        },
        components: [Menu.parts.items({
            preprocess: function (items) {
              if (columns !== 'auto' && columns > 1) {
                return chunk({
                  tag: 'div',
                  classes: ['tox-collection__group']
                }, columns)(items);
              } else {
                return preprocessCollection(items, function (_item, i) {
                  return initItems[i].type === 'separator';
                });
              }
            }
          })]
      };
    };
    var forHorizontalCollection = function (initItems, _hasIcons) {
      return {
        dom: {
          tag: 'div',
          classes: [
            'tox-collection',
            'tox-collection--horizontal'
          ]
        },
        components: [Menu.parts.items({
            preprocess: function (items) {
              return preprocessCollection(items, function (_item, i) {
                return initItems[i].type === 'separator';
              });
            }
          })]
      };
    };

    var menuHasIcons = function (xs) {
      return exists(xs, function (item) {
        return 'icon' in item && item.icon !== undefined;
      });
    };
    var handleError = function (error) {
      console.error(formatError(error));
      console.log(error);
      return Optional.none();
    };
    var createHorizontalPartialMenuWithAlloyItems = function (value, _hasIcons, items, _columns, _presets) {
      var structure = forHorizontalCollection(items);
      return {
        value: value,
        dom: structure.dom,
        components: structure.components,
        items: items
      };
    };
    var createPartialMenuWithAlloyItems = function (value, hasIcons, items, columns, presets) {
      if (presets === 'color') {
        var structure = forSwatch(columns);
        return {
          value: value,
          dom: structure.dom,
          components: structure.components,
          items: items
        };
      }
      if (presets === 'normal' && columns === 'auto') {
        var structure = forCollection(columns, items);
        return {
          value: value,
          dom: structure.dom,
          components: structure.components,
          items: items
        };
      }
      if (presets === 'normal' && columns === 1) {
        var structure = forCollection(1, items);
        return {
          value: value,
          dom: structure.dom,
          components: structure.components,
          items: items
        };
      }
      if (presets === 'normal') {
        var structure = forCollection(columns, items);
        return {
          value: value,
          dom: structure.dom,
          components: structure.components,
          items: items
        };
      }
      if (presets === 'listpreview' && columns !== 'auto') {
        var structure = forToolbar(columns);
        return {
          value: value,
          dom: structure.dom,
          components: structure.components,
          items: items
        };
      }
      return {
        value: value,
        dom: dom$1(hasIcons, columns, presets),
        components: components,
        items: items
      };
    };

    var cardImageFields = [
      requiredString('type'),
      requiredString('src'),
      optionString('alt'),
      defaultedArrayOf('classes', [], string)
    ];
    var cardImageSchema = objOf(cardImageFields);

    var cardTextFields = [
      requiredString('type'),
      requiredString('text'),
      optionString('name'),
      defaultedArrayOf('classes', ['tox-collection__item-label'], string)
    ];
    var cardTextSchema = objOf(cardTextFields);

    var itemSchema$1 = valueThunk(function () {
      return choose$2('type', {
        cardimage: cardImageSchema,
        cardtext: cardTextSchema,
        cardcontainer: cardContainerSchema
      });
    });
    var cardContainerSchema = objOf([
      requiredString('type'),
      defaultedString('direction', 'horizontal'),
      defaultedString('align', 'left'),
      defaultedString('valign', 'middle'),
      requiredArrayOf('items', itemSchema$1)
    ]);

    var commonMenuItemFields = [
      defaultedBoolean('disabled', false),
      optionString('text'),
      optionString('shortcut'),
      field$1('value', 'value', defaultedThunk(function () {
        return generate$6('menuitem-value');
      }), anyValue()),
      defaulted('meta', {})
    ];

    var cardMenuItemSchema = objOf([
      requiredString('type'),
      optionString('label'),
      requiredArrayOf('items', itemSchema$1),
      defaultedFunction('onSetup', function () {
        return noop;
      }),
      defaultedFunction('onAction', noop)
    ].concat(commonMenuItemFields));
    var createCardMenuItem = function (spec) {
      return asRaw('cardmenuitem', cardMenuItemSchema, spec);
    };

    var choiceMenuItemSchema = objOf([
      requiredString('type'),
      defaultedBoolean('active', false),
      optionString('icon')
    ].concat(commonMenuItemFields));
    var createChoiceMenuItem = function (spec) {
      return asRaw('choicemenuitem', choiceMenuItemSchema, spec);
    };

    var baseFields = [
      requiredString('type'),
      requiredString('fancytype'),
      defaultedFunction('onAction', noop)
    ];
    var insertTableFields = [defaulted('initData', {})].concat(baseFields);
    var colorSwatchFields = [defaultedObjOf('initData', {}, [
        defaultedBoolean('allowCustomColors', true),
        optionArrayOf('colors', anyValue())
      ])].concat(baseFields);
    var fancyMenuItemSchema = choose$1('fancytype', {
      inserttable: insertTableFields,
      colorswatch: colorSwatchFields
    });
    var createFancyMenuItem = function (spec) {
      return asRaw('fancymenuitem', fancyMenuItemSchema, spec);
    };

    var menuItemSchema = objOf([
      requiredString('type'),
      defaultedFunction('onSetup', function () {
        return noop;
      }),
      defaultedFunction('onAction', noop),
      optionString('icon')
    ].concat(commonMenuItemFields));
    var createMenuItem = function (spec) {
      return asRaw('menuitem', menuItemSchema, spec);
    };

    var nestedMenuItemSchema = objOf([
      requiredString('type'),
      requiredFunction('getSubmenuItems'),
      defaultedFunction('onSetup', function () {
        return noop;
      }),
      optionString('icon')
    ].concat(commonMenuItemFields));
    var createNestedMenuItem = function (spec) {
      return asRaw('nestedmenuitem', nestedMenuItemSchema, spec);
    };

    var toggleMenuItemSchema = objOf([
      requiredString('type'),
      optionString('icon'),
      defaultedBoolean('active', false),
      defaultedFunction('onSetup', function () {
        return noop;
      }),
      requiredFunction('onAction')
    ].concat(commonMenuItemFields));
    var createToggleMenuItem = function (spec) {
      return asRaw('togglemenuitem', toggleMenuItemSchema, spec);
    };

    var detectSize = function (comp, margin, selectorClass) {
      var descendants$1 = descendants(comp.element, '.' + selectorClass);
      if (descendants$1.length > 0) {
        var columnLength = findIndex$1(descendants$1, function (c) {
          var thisTop = c.dom.getBoundingClientRect().top;
          var cTop = descendants$1[0].dom.getBoundingClientRect().top;
          return Math.abs(thisTop - cTop) > margin;
        }).getOr(descendants$1.length);
        return Optional.some({
          numColumns: columnLength,
          numRows: Math.ceil(descendants$1.length / columnLength)
        });
      } else {
        return Optional.none();
      }
    };

    var namedEvents = function (name, handlers) {
      return derive$1([config(name, handlers)]);
    };
    var unnamedEvents = function (handlers) {
      return namedEvents(generate$6('unnamed-events'), handlers);
    };
    var SimpleBehaviours = {
      namedEvents: namedEvents,
      unnamedEvents: unnamedEvents
    };

    var ExclusivityChannel = generate$6('tooltip.exclusive');
    var ShowTooltipEvent = generate$6('tooltip.show');
    var HideTooltipEvent = generate$6('tooltip.hide');

    var hideAllExclusive = function (component, _tConfig, _tState) {
      component.getSystem().broadcastOn([ExclusivityChannel], {});
    };
    var setComponents = function (component, tConfig, tState, specs) {
      tState.getTooltip().each(function (tooltip) {
        if (tooltip.getSystem().isConnected()) {
          Replacing.set(tooltip, specs);
        }
      });
    };

    var TooltippingApis = /*#__PURE__*/Object.freeze({
        __proto__: null,
        hideAllExclusive: hideAllExclusive,
        setComponents: setComponents
    });

    var events$9 = function (tooltipConfig, state) {
      var hide = function (comp) {
        state.getTooltip().each(function (p) {
          detach(p);
          tooltipConfig.onHide(comp, p);
          state.clearTooltip();
        });
        state.clearTimer();
      };
      var show = function (comp) {
        if (!state.isShowing()) {
          hideAllExclusive(comp);
          var sink = tooltipConfig.lazySink(comp).getOrDie();
          var popup = comp.getSystem().build({
            dom: tooltipConfig.tooltipDom,
            components: tooltipConfig.tooltipComponents,
            events: derive$2(tooltipConfig.mode === 'normal' ? [
              run$1(mouseover(), function (_) {
                emit(comp, ShowTooltipEvent);
              }),
              run$1(mouseout(), function (_) {
                emit(comp, HideTooltipEvent);
              })
            ] : []),
            behaviours: derive$1([Replacing.config({})])
          });
          state.setTooltip(popup);
          attach(sink, popup);
          tooltipConfig.onShow(comp, popup);
          Positioning.position(sink, popup, { anchor: tooltipConfig.anchor(comp) });
        }
      };
      return derive$2(flatten([
        [
          run$1(ShowTooltipEvent, function (comp) {
            state.resetTimer(function () {
              show(comp);
            }, tooltipConfig.delay);
          }),
          run$1(HideTooltipEvent, function (comp) {
            state.resetTimer(function () {
              hide(comp);
            }, tooltipConfig.delay);
          }),
          run$1(receive(), function (comp, message) {
            var receivingData = message;
            if (!receivingData.universal) {
              if (contains$2(receivingData.channels, ExclusivityChannel)) {
                hide(comp);
              }
            }
          }),
          runOnDetached(function (comp) {
            hide(comp);
          })
        ],
        tooltipConfig.mode === 'normal' ? [
          run$1(focusin(), function (comp) {
            emit(comp, ShowTooltipEvent);
          }),
          run$1(postBlur(), function (comp) {
            emit(comp, HideTooltipEvent);
          }),
          run$1(mouseover(), function (comp) {
            emit(comp, ShowTooltipEvent);
          }),
          run$1(mouseout(), function (comp) {
            emit(comp, HideTooltipEvent);
          })
        ] : [
          run$1(highlight$1(), function (comp, _se) {
            emit(comp, ShowTooltipEvent);
          }),
          run$1(dehighlight$1(), function (comp) {
            emit(comp, HideTooltipEvent);
          })
        ]
      ]));
    };

    var ActiveTooltipping = /*#__PURE__*/Object.freeze({
        __proto__: null,
        events: events$9
    });

    var TooltippingSchema = [
      required$1('lazySink'),
      required$1('tooltipDom'),
      defaulted('exclusive', true),
      defaulted('tooltipComponents', []),
      defaulted('delay', 300),
      defaultedStringEnum('mode', 'normal', [
        'normal',
        'follow-highlight'
      ]),
      defaulted('anchor', function (comp) {
        return {
          type: 'hotspot',
          hotspot: comp,
          layouts: {
            onLtr: constant$1([
              south$2,
              north$2,
              southeast$2,
              northeast$2,
              southwest$2,
              northwest$2
            ]),
            onRtl: constant$1([
              south$2,
              north$2,
              southeast$2,
              northeast$2,
              southwest$2,
              northwest$2
            ])
          }
        };
      }),
      onHandler('onHide'),
      onHandler('onShow')
    ];

    var init$b = function () {
      var timer = value$1();
      var popup = value$1();
      var clearTimer = function () {
        timer.on(clearTimeout);
      };
      var resetTimer = function (f, delay) {
        clearTimer();
        timer.set(setTimeout(f, delay));
      };
      var readState = constant$1('not-implemented');
      return nu$8({
        getTooltip: popup.get,
        isShowing: popup.isSet,
        setTooltip: popup.set,
        clearTooltip: popup.clear,
        clearTimer: clearTimer,
        resetTimer: resetTimer,
        readState: readState
      });
    };

    var TooltippingState = /*#__PURE__*/Object.freeze({
        __proto__: null,
        init: init$b
    });

    var Tooltipping = create$7({
      fields: TooltippingSchema,
      name: 'tooltipping',
      active: ActiveTooltipping,
      state: TooltippingState,
      apis: TooltippingApis
    });

    var escape = function (text) {
      return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    var global$c = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

    var global$b = tinymce.util.Tools.resolve('tinymce.EditorManager');

    var getSkinUrl = function (editor) {
      var skin = editor.getParam('skin');
      var skinUrl = editor.getParam('skin_url');
      if (skin !== false) {
        var skinName = skin ? skin : 'oxide';
        if (skinUrl) {
          skinUrl = editor.documentBaseURI.toAbsolute(skinUrl);
        } else {
          skinUrl = global$b.baseURL + '/skins/ui/' + skinName;
        }
      }
      return skinUrl;
    };
    var isReadOnly = function (editor) {
      return editor.getParam('readonly', false, 'boolean');
    };
    var isSkinDisabled = function (editor) {
      return editor.getParam('skin') === false;
    };
    var getHeightSetting = function (editor) {
      return editor.getParam('height', Math.max(editor.getElement().offsetHeight, 200));
    };
    var getWidthSetting = function (editor) {
      return editor.getParam('width', global$c.DOM.getStyle(editor.getElement(), 'width'));
    };
    var getMinWidthSetting = function (editor) {
      return Optional.from(editor.getParam('min_width')).filter(isNumber);
    };
    var getMinHeightSetting = function (editor) {
      return Optional.from(editor.getParam('min_height')).filter(isNumber);
    };
    var getMaxWidthSetting = function (editor) {
      return Optional.from(editor.getParam('max_width')).filter(isNumber);
    };
    var getMaxHeightSetting = function (editor) {
      return Optional.from(editor.getParam('max_height')).filter(isNumber);
    };
    var getUserStyleFormats = function (editor) {
      return Optional.from(editor.getParam('style_formats')).filter(isArray);
    };
    var isMergeStyleFormats = function (editor) {
      return editor.getParam('style_formats_merge', false, 'boolean');
    };
    var getLineHeightFormats = function (editor) {
      return editor.getParam('lineheight_formats', '1 1.1 1.2 1.3 1.4 1.5 2', 'string').split(' ');
    };
    var getContentLanguages = function (editor) {
      return editor.getParam('content_langs', undefined, 'array');
    };
    var getRemovedMenuItems = function (editor) {
      return editor.getParam('removed_menuitems', '');
    };
    var isMenubarEnabled = function (editor) {
      return editor.getParam('menubar', true, 'boolean') !== false;
    };
    var isToolbarEnabled = function (editor) {
      var toolbar = editor.getParam('toolbar', true);
      var isToolbarTrue = toolbar === true;
      var isToolbarString = isString(toolbar);
      var isToolbarObjectArray = isArray(toolbar) && toolbar.length > 0;
      return !isMultipleToolbars(editor) && (isToolbarObjectArray || isToolbarString || isToolbarTrue);
    };
    var getMultipleToolbarsSetting = function (editor) {
      var toolbars = range$2(9, function (num) {
        return editor.getParam('toolbar' + (num + 1), false, 'string');
      });
      var toolbarArray = filter$2(toolbars, function (toolbar) {
        return typeof toolbar === 'string';
      });
      return toolbarArray.length > 0 ? Optional.some(toolbarArray) : Optional.none();
    };
    var isMultipleToolbars = function (editor) {
      return getMultipleToolbarsSetting(editor).fold(function () {
        var toolbar = editor.getParam('toolbar', [], 'string[]');
        return toolbar.length > 0;
      }, always);
    };
    var ToolbarMode;
    (function (ToolbarMode) {
      ToolbarMode['default'] = 'wrap';
      ToolbarMode['floating'] = 'floating';
      ToolbarMode['sliding'] = 'sliding';
      ToolbarMode['scrolling'] = 'scrolling';
    }(ToolbarMode || (ToolbarMode = {})));
    var getToolbarMode = function (editor) {
      return editor.getParam('toolbar_mode', '', 'string');
    };
    var ToolbarLocation;
    (function (ToolbarLocation) {
      ToolbarLocation['auto'] = 'auto';
      ToolbarLocation['top'] = 'top';
      ToolbarLocation['bottom'] = 'bottom';
    }(ToolbarLocation || (ToolbarLocation = {})));
    var getToolbarGroups = function (editor) {
      return editor.getParam('toolbar_groups', {}, 'object');
    };
    var getToolbarLocation = function (editor) {
      return editor.getParam('toolbar_location', ToolbarLocation.auto, 'string');
    };
    var isToolbarLocationBottom = function (editor) {
      return getToolbarLocation(editor) === ToolbarLocation.bottom;
    };
    var fixedContainerSelector = function (editor) {
      return editor.getParam('fixed_toolbar_container', '', 'string');
    };
    var fixedToolbarContainerTarget = function (editor) {
      return editor.getParam('fixed_toolbar_container_target');
    };
    var isToolbarPersist = function (editor) {
      return editor.getParam('toolbar_persist', false, 'boolean');
    };
    var fixedContainerTarget = function (editor) {
      if (!editor.inline) {
        return Optional.none();
      }
      var selector = fixedContainerSelector(editor);
      if (selector.length > 0) {
        return descendant(body(), selector);
      }
      var element = fixedToolbarContainerTarget(editor);
      if (isNonNullable(element)) {
        return Optional.some(SugarElement.fromDom(element));
      }
      return Optional.none();
    };
    var useFixedContainer = function (editor) {
      return editor.inline && fixedContainerTarget(editor).isSome();
    };
    var getUiContainer = function (editor) {
      var fixedContainer = fixedContainerTarget(editor);
      return fixedContainer.getOrThunk(function () {
        return getContentContainer(getRootNode(SugarElement.fromDom(editor.getElement())));
      });
    };
    var isDistractionFree = function (editor) {
      return editor.inline && !isMenubarEnabled(editor) && !isToolbarEnabled(editor) && !isMultipleToolbars(editor);
    };
    var isStickyToolbar = function (editor) {
      var isStickyToolbar = editor.getParam('toolbar_sticky', false, 'boolean');
      return (isStickyToolbar || editor.inline) && !useFixedContainer(editor) && !isDistractionFree(editor);
    };
    var getStickyToolbarOffset = function (editor) {
      return editor.getParam('toolbar_sticky_offset', 0, 'number');
    };
    var isDraggableModal$1 = function (editor) {
      return editor.getParam('draggable_modal', false, 'boolean');
    };
    var getMenus = function (editor) {
      var menu = editor.getParam('menu');
      if (menu) {
        return map(menu, function (menu) {
          return __assign(__assign({}, menu), { items: menu.items });
        });
      } else {
        return {};
      }
    };
    var getMenubar = function (editor) {
      return editor.getParam('menubar');
    };
    var getToolbar = function (editor) {
      return editor.getParam('toolbar', true);
    };
    var getFilePickerCallback = function (editor) {
      return editor.getParam('file_picker_callback');
    };
    var getFilePickerTypes = function (editor) {
      return editor.getParam('file_picker_types');
    };
    var getFileBrowserCallbackTypes = function (editor) {
      return editor.getParam('file_browser_callback_types');
    };
    var noTypeaheadUrls = function (editor) {
      return editor.getParam('typeahead_urls') === false;
    };
    var getAnchorTop = function (editor) {
      return editor.getParam('anchor_top', '#top');
    };
    var getAnchorBottom = function (editor) {
      return editor.getParam('anchor_bottom', '#bottom');
    };
    var getFilePickerValidatorHandler = function (editor) {
      var handler = editor.getParam('file_picker_validator_handler', undefined, 'function');
      if (handler === undefined) {
        return editor.getParam('filepicker_validator_handler', undefined, 'function');
      } else {
        return handler;
      }
    };

    var ReadOnlyChannel = 'silver.readonly';
    var ReadOnlyDataSchema = objOf([requiredBoolean('readonly')]);
    var broadcastReadonly = function (uiComponents, readonly) {
      var outerContainer = uiComponents.outerContainer;
      var target = outerContainer.element;
      if (readonly) {
        uiComponents.mothership.broadcastOn([dismissPopups()], { target: target });
        uiComponents.uiMothership.broadcastOn([dismissPopups()], { target: target });
      }
      uiComponents.mothership.broadcastOn([ReadOnlyChannel], { readonly: readonly });
      uiComponents.uiMothership.broadcastOn([ReadOnlyChannel], { readonly: readonly });
    };
    var setupReadonlyModeSwitch = function (editor, uiComponents) {
      editor.on('init', function () {
        if (editor.mode.isReadOnly()) {
          broadcastReadonly(uiComponents, true);
        }
      });
      editor.on('SwitchMode', function () {
        return broadcastReadonly(uiComponents, editor.mode.isReadOnly());
      });
      if (isReadOnly(editor)) {
        editor.setMode('readonly');
      }
    };
    var receivingConfig = function () {
      var _a;
      return Receiving.config({
        channels: (_a = {}, _a[ReadOnlyChannel] = {
          schema: ReadOnlyDataSchema,
          onReceive: function (comp, data) {
            Disabling.set(comp, data.readonly);
          }
        }, _a)
      });
    };

    var item = function (disabled) {
      return Disabling.config({
        disabled: disabled,
        disableClass: 'tox-collection__item--state-disabled'
      });
    };
    var button = function (disabled) {
      return Disabling.config({ disabled: disabled });
    };
    var splitButton = function (disabled) {
      return Disabling.config({
        disabled: disabled,
        disableClass: 'tox-tbtn--disabled'
      });
    };
    var toolbarButton = function (disabled) {
      return Disabling.config({
        disabled: disabled,
        disableClass: 'tox-tbtn--disabled',
        useNative: false
      });
    };
    var DisablingConfigs = {
      item: item,
      button: button,
      splitButton: splitButton,
      toolbarButton: toolbarButton
    };

    var runWithApi = function (info, comp) {
      var api = info.getApi(comp);
      return function (f) {
        f(api);
      };
    };
    var onControlAttached = function (info, editorOffCell) {
      return runOnAttached(function (comp) {
        var run = runWithApi(info, comp);
        run(function (api) {
          var onDestroy = info.onSetup(api);
          if (isFunction(onDestroy)) {
            editorOffCell.set(onDestroy);
          }
        });
      });
    };
    var onControlDetached = function (getApi, editorOffCell) {
      return runOnDetached(function (comp) {
        return runWithApi(getApi, comp)(editorOffCell.get());
      });
    };

    var _a$1;
    var onMenuItemExecute = function (info, itemResponse) {
      return runOnExecute$1(function (comp, simulatedEvent) {
        runWithApi(info, comp)(info.onAction);
        if (!info.triggersSubmenu && itemResponse === ItemResponse$1.CLOSE_ON_EXECUTE) {
          emit(comp, sandboxClose());
          simulatedEvent.stop();
        }
      });
    };
    var menuItemEventOrder = (_a$1 = {}, _a$1[execute$5()] = [
      'disabling',
      'alloy.base.behaviour',
      'toggling',
      'item-events'
    ], _a$1);

    var componentRenderPipeline = cat;
    var renderCommonItem = function (spec, structure, itemResponse, providersbackstage) {
      var editorOffCell = Cell(noop);
      return {
        type: 'item',
        dom: structure.dom,
        components: componentRenderPipeline(structure.optComponents),
        data: spec.data,
        eventOrder: menuItemEventOrder,
        hasSubmenu: spec.triggersSubmenu,
        itemBehaviours: derive$1([
          config('item-events', [
            onMenuItemExecute(spec, itemResponse),
            onControlAttached(spec, editorOffCell),
            onControlDetached(spec, editorOffCell)
          ]),
          DisablingConfigs.item(function () {
            return spec.disabled || providersbackstage.isDisabled();
          }),
          receivingConfig(),
          Replacing.config({})
        ].concat(spec.itemBehaviours))
      };
    };
    var buildData = function (source) {
      return {
        value: source.value,
        meta: __assign({ text: source.text.getOr('') }, source.meta)
      };
    };

    var global$a = tinymce.util.Tools.resolve('tinymce.Env');

    var convertText = function (source) {
      var mac = {
        alt: '&#x2325;',
        ctrl: '&#x2303;',
        shift: '&#x21E7;',
        meta: '&#x2318;',
        access: '&#x2303;&#x2325;'
      };
      var other = {
        meta: 'Ctrl',
        access: 'Shift+Alt'
      };
      var replace = global$a.mac ? mac : other;
      var shortcut = source.split('+');
      var updated = map$2(shortcut, function (segment) {
        var search = segment.toLowerCase().trim();
        return has$2(replace, search) ? replace[search] : segment;
      });
      return global$a.mac ? updated.join('') : updated.join('+');
    };

    var renderIcon$1 = function (name, icons, classes) {
      if (classes === void 0) {
        classes = [iconClass];
      }
      return render$3(name, {
        tag: 'div',
        classes: classes
      }, icons);
    };
    var renderText = function (text$1) {
      return {
        dom: {
          tag: 'div',
          classes: [textClass]
        },
        components: [text(global$f.translate(text$1))]
      };
    };
    var renderHtml = function (html, classes) {
      return {
        dom: {
          tag: 'div',
          classes: classes,
          innerHtml: html
        }
      };
    };
    var renderStyledText = function (style, text$1) {
      return {
        dom: {
          tag: 'div',
          classes: [textClass]
        },
        components: [{
            dom: {
              tag: style.tag,
              styles: style.styles
            },
            components: [text(global$f.translate(text$1))]
          }]
      };
    };
    var renderShortcut = function (shortcut) {
      return {
        dom: {
          tag: 'div',
          classes: [accessoryClass],
          innerHtml: convertText(shortcut)
        }
      };
    };
    var renderCheckmark = function (icons) {
      return renderIcon$1('checkmark', icons, [checkmarkClass]);
    };
    var renderSubmenuCaret = function (icons) {
      return renderIcon$1('chevron-right', icons, [caretClass]);
    };
    var renderDownwardsCaret = function (icons) {
      return renderIcon$1('chevron-down', icons, [caretClass]);
    };
    var renderContainer = function (container, components) {
      var directionClass = container.direction === 'vertical' ? containerColumnClass : containerRowClass;
      var alignClass = container.align === 'left' ? containerAlignLeftClass : containerAlignRightClass;
      var getValignClass = function () {
        switch (container.valign) {
        case 'top':
          return containerValignTopClass;
        case 'middle':
          return containerValignMiddleClass;
        case 'bottom':
          return containerValignBottomClass;
        }
      };
      return {
        dom: {
          tag: 'div',
          classes: [
            containerClass,
            directionClass,
            alignClass,
            getValignClass()
          ]
        },
        components: components
      };
    };
    var renderImage = function (src, classes, alt) {
      return {
        dom: {
          tag: 'img',
          classes: classes,
          attributes: {
            src: src,
            alt: alt.getOr('')
          }
        }
      };
    };

    var renderColorStructure = function (item, providerBackstage, fallbackIcon) {
      var colorPickerCommand = 'custom';
      var removeColorCommand = 'remove';
      var itemText = item.ariaLabel;
      var itemValue = item.value;
      var iconSvg = item.iconContent.map(function (name) {
        return getOr(name, providerBackstage.icons, fallbackIcon);
      });
      var getDom = function () {
        var common = colorClass;
        var icon = iconSvg.getOr('');
        var attributes = itemText.map(function (text) {
          return { title: providerBackstage.translate(text) };
        }).getOr({});
        var baseDom = {
          tag: 'div',
          attributes: attributes,
          classes: [common]
        };
        if (itemValue === colorPickerCommand) {
          return __assign(__assign({}, baseDom), {
            tag: 'button',
            classes: __spreadArray(__spreadArray([], baseDom.classes), ['tox-swatches__picker-btn']),
            innerHtml: icon
          });
        } else if (itemValue === removeColorCommand) {
          return __assign(__assign({}, baseDom), {
            classes: __spreadArray(__spreadArray([], baseDom.classes), ['tox-swatch--remove']),
            innerHtml: icon
          });
        } else {
          return __assign(__assign({}, baseDom), {
            attributes: __assign(__assign({}, baseDom.attributes), { 'data-mce-color': itemValue }),
            styles: { 'background-color': itemValue }
          });
        }
      };
      return {
        dom: getDom(),
        optComponents: []
      };
    };
    var renderItemDomStructure = function (ariaLabel) {
      var domTitle = ariaLabel.map(function (label) {
        return { attributes: { title: global$f.translate(label) } };
      }).getOr({});
      return __assign({
        tag: 'div',
        classes: [
          navClass,
          selectableClass
        ]
      }, domTitle);
    };
    var renderNormalItemStructure = function (info, providersBackstage, renderIcons, fallbackIcon) {
      var iconSpec = {
        tag: 'div',
        classes: [iconClass]
      };
      var renderIcon = function (iconName) {
        return render$3(iconName, iconSpec, providersBackstage.icons, fallbackIcon);
      };
      var renderEmptyIcon = function () {
        return Optional.some({ dom: iconSpec });
      };
      var leftIcon = renderIcons ? info.iconContent.map(renderIcon).orThunk(renderEmptyIcon) : Optional.none();
      var checkmark = info.checkMark;
      var textRender = Optional.from(info.meta).fold(function () {
        return renderText;
      }, function (meta) {
        return has$2(meta, 'style') ? curry(renderStyledText, meta.style) : renderText;
      });
      var content = info.htmlContent.fold(function () {
        return info.textContent.map(textRender);
      }, function (html) {
        return Optional.some(renderHtml(html, [textClass]));
      });
      var menuItem = {
        dom: renderItemDomStructure(info.ariaLabel),
        optComponents: [
          leftIcon,
          content,
          info.shortcutContent.map(renderShortcut),
          checkmark,
          info.caret
        ]
      };
      return menuItem;
    };
    var renderItemStructure = function (info, providersBackstage, renderIcons, fallbackIcon) {
      if (fallbackIcon === void 0) {
        fallbackIcon = Optional.none();
      }
      if (info.presets === 'color') {
        return renderColorStructure(info, providersBackstage, fallbackIcon);
      } else {
        return renderNormalItemStructure(info, providersBackstage, renderIcons, fallbackIcon);
      }
    };

    var tooltipBehaviour = function (meta, sharedBackstage) {
      return get$e(meta, 'tooltipWorker').map(function (tooltipWorker) {
        return [Tooltipping.config({
            lazySink: sharedBackstage.getSink,
            tooltipDom: {
              tag: 'div',
              classes: ['tox-tooltip-worker-container']
            },
            tooltipComponents: [],
            anchor: function (comp) {
              return {
                type: 'submenu',
                item: comp,
                overrides: { maxHeightFunction: expandable$1 }
              };
            },
            mode: 'follow-highlight',
            onShow: function (component, _tooltip) {
              tooltipWorker(function (elm) {
                Tooltipping.setComponents(component, [external$2({ element: SugarElement.fromDom(elm) })]);
              });
            }
          })];
      }).getOr([]);
    };
    var encodeText = function (text) {
      return global$c.DOM.encode(text);
    };
    var replaceText = function (text, matchText) {
      var translated = global$f.translate(text);
      var encoded = encodeText(translated);
      if (matchText.length > 0) {
        var escapedMatchRegex = new RegExp(escape(matchText), 'gi');
        return encoded.replace(escapedMatchRegex, function (match) {
          return '<span class="tox-autocompleter-highlight">' + match + '</span>';
        });
      } else {
        return encoded;
      }
    };
    var renderAutocompleteItem = function (spec, matchText, useText, presets, onItemValueHandler, itemResponse, sharedBackstage, renderIcons) {
      if (renderIcons === void 0) {
        renderIcons = true;
      }
      var structure = renderItemStructure({
        presets: presets,
        textContent: Optional.none(),
        htmlContent: useText ? spec.text.map(function (text) {
          return replaceText(text, matchText);
        }) : Optional.none(),
        ariaLabel: spec.text,
        iconContent: spec.icon,
        shortcutContent: Optional.none(),
        checkMark: Optional.none(),
        caret: Optional.none(),
        value: spec.value
      }, sharedBackstage.providers, renderIcons, spec.icon);
      return renderCommonItem({
        data: buildData(spec),
        disabled: spec.disabled,
        getApi: constant$1({}),
        onAction: function (_api) {
          return onItemValueHandler(spec.value, spec.meta);
        },
        onSetup: constant$1(noop),
        triggersSubmenu: false,
        itemBehaviours: tooltipBehaviour(spec.meta, sharedBackstage)
      }, structure, itemResponse, sharedBackstage.providers);
    };

    var render$2 = function (items, extras) {
      return map$2(items, function (item) {
        switch (item.type) {
        case 'cardcontainer':
          return renderContainer(item, render$2(item.items, extras));
        case 'cardimage':
          return renderImage(item.src, item.classes, item.alt);
        case 'cardtext':
          var shouldHighlight = item.name.exists(function (name) {
            return contains$2(extras.cardText.highlightOn, name);
          });
          var matchText = shouldHighlight ? Optional.from(extras.cardText.matchText).getOr('') : '';
          return renderHtml(replaceText(item.text, matchText), item.classes);
        }
      });
    };
    var renderCardMenuItem = function (spec, itemResponse, sharedBackstage, extras) {
      var getApi = function (component) {
        return {
          isDisabled: function () {
            return Disabling.isDisabled(component);
          },
          setDisabled: function (state) {
            Disabling.set(component, state);
            each$1(descendants(component.element, '*'), function (elm) {
              component.getSystem().getByDom(elm).each(function (comp) {
                if (comp.hasConfigured(Disabling)) {
                  Disabling.set(comp, state);
                }
              });
            });
          }
        };
      };
      var structure = {
        dom: renderItemDomStructure(spec.label),
        optComponents: [Optional.some({
            dom: {
              tag: 'div',
              classes: [
                containerClass,
                containerRowClass
              ]
            },
            components: render$2(spec.items, extras)
          })]
      };
      return renderCommonItem({
        data: buildData(__assign({ text: Optional.none() }, spec)),
        disabled: spec.disabled,
        getApi: getApi,
        onAction: spec.onAction,
        onSetup: spec.onSetup,
        triggersSubmenu: false,
        itemBehaviours: Optional.from(extras.itemBehaviours).getOr([])
      }, structure, itemResponse, sharedBackstage.providers);
    };

    var renderChoiceItem = function (spec, useText, presets, onItemValueHandler, isSelected, itemResponse, providersBackstage, renderIcons) {
      if (renderIcons === void 0) {
        renderIcons = true;
      }
      var getApi = function (component) {
        return {
          setActive: function (state) {
            Toggling.set(component, state);
          },
          isActive: function () {
            return Toggling.isOn(component);
          },
          isDisabled: function () {
            return Disabling.isDisabled(component);
          },
          setDisabled: function (state) {
            return Disabling.set(component, state);
          }
        };
      };
      var structure = renderItemStructure({
        presets: presets,
        textContent: useText ? spec.text : Optional.none(),
        htmlContent: Optional.none(),
        ariaLabel: spec.text,
        iconContent: spec.icon,
        shortcutContent: useText ? spec.shortcut : Optional.none(),
        checkMark: useText ? Optional.some(renderCheckmark(providersBackstage.icons)) : Optional.none(),
        caret: Optional.none(),
        value: spec.value
      }, providersBackstage, renderIcons);
      return deepMerge(renderCommonItem({
        data: buildData(spec),
        disabled: spec.disabled,
        getApi: getApi,
        onAction: function (_api) {
          return onItemValueHandler(spec.value);
        },
        onSetup: function (api) {
          api.setActive(isSelected);
          return noop;
        },
        triggersSubmenu: false,
        itemBehaviours: []
      }, structure, itemResponse, providersBackstage), {
        toggling: {
          toggleClass: tickedClass,
          toggleOnExecute: false,
          selected: spec.active
        }
      });
    };

    var parts$f = generate$3(owner$2(), parts$h());

    var hexColour = function (value) {
      return { value: value };
    };
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    var longformRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    var isHexString = function (hex) {
      return shorthandRegex.test(hex) || longformRegex.test(hex);
    };
    var normalizeHex = function (hex) {
      return removeLeading(hex, '#').toUpperCase();
    };
    var fromString$1 = function (hex) {
      return isHexString(hex) ? Optional.some({ value: normalizeHex(hex) }) : Optional.none();
    };
    var getLongForm = function (hex) {
      var hexString = hex.value.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
      });
      return { value: hexString };
    };
    var extractValues = function (hex) {
      var longForm = getLongForm(hex);
      var splitForm = longformRegex.exec(longForm.value);
      return splitForm === null ? [
        'FFFFFF',
        'FF',
        'FF',
        'FF'
      ] : splitForm;
    };
    var toHex = function (component) {
      var hex = component.toString(16);
      return (hex.length === 1 ? '0' + hex : hex).toUpperCase();
    };
    var fromRgba = function (rgbaColour) {
      var value = toHex(rgbaColour.red) + toHex(rgbaColour.green) + toHex(rgbaColour.blue);
      return hexColour(value);
    };

    var min = Math.min;
    var max = Math.max;
    var round$1 = Math.round;
    var rgbRegex = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
    var rgbaRegex = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d?(?:\.\d+)?)\)/;
    var rgbaColour = function (red, green, blue, alpha) {
      return {
        red: red,
        green: green,
        blue: blue,
        alpha: alpha
      };
    };
    var isRgbaComponent = function (value) {
      var num = parseInt(value, 10);
      return num.toString() === value && num >= 0 && num <= 255;
    };
    var fromHsv = function (hsv) {
      var r;
      var g;
      var b;
      var hue = (hsv.hue || 0) % 360;
      var saturation = hsv.saturation / 100;
      var brightness = hsv.value / 100;
      saturation = max(0, min(saturation, 1));
      brightness = max(0, min(brightness, 1));
      if (saturation === 0) {
        r = g = b = round$1(255 * brightness);
        return rgbaColour(r, g, b, 1);
      }
      var side = hue / 60;
      var chroma = brightness * saturation;
      var x = chroma * (1 - Math.abs(side % 2 - 1));
      var match = brightness - chroma;
      switch (Math.floor(side)) {
      case 0:
        r = chroma;
        g = x;
        b = 0;
        break;
      case 1:
        r = x;
        g = chroma;
        b = 0;
        break;
      case 2:
        r = 0;
        g = chroma;
        b = x;
        break;
      case 3:
        r = 0;
        g = x;
        b = chroma;
        break;
      case 4:
        r = x;
        g = 0;
        b = chroma;
        break;
      case 5:
        r = chroma;
        g = 0;
        b = x;
        break;
      default:
        r = g = b = 0;
      }
      r = round$1(255 * (r + match));
      g = round$1(255 * (g + match));
      b = round$1(255 * (b + match));
      return rgbaColour(r, g, b, 1);
    };
    var fromHex = function (hexColour) {
      var result = extractValues(hexColour);
      var red = parseInt(result[1], 16);
      var green = parseInt(result[2], 16);
      var blue = parseInt(result[3], 16);
      return rgbaColour(red, green, blue, 1);
    };
    var fromStringValues = function (red, green, blue, alpha) {
      var r = parseInt(red, 10);
      var g = parseInt(green, 10);
      var b = parseInt(blue, 10);
      var a = parseFloat(alpha);
      return rgbaColour(r, g, b, a);
    };
    var fromString = function (rgbaString) {
      if (rgbaString === 'transparent') {
        return Optional.some(rgbaColour(0, 0, 0, 0));
      }
      var rgbMatch = rgbRegex.exec(rgbaString);
      if (rgbMatch !== null) {
        return Optional.some(fromStringValues(rgbMatch[1], rgbMatch[2], rgbMatch[3], '1'));
      }
      var rgbaMatch = rgbaRegex.exec(rgbaString);
      if (rgbaMatch !== null) {
        return Optional.some(fromStringValues(rgbaMatch[1], rgbaMatch[2], rgbaMatch[3], rgbaMatch[4]));
      }
      return Optional.none();
    };
    var toString = function (rgba) {
      return 'rgba(' + rgba.red + ',' + rgba.green + ',' + rgba.blue + ',' + rgba.alpha + ')';
    };
    var red = rgbaColour(255, 0, 0, 1);

    var fireSkinLoaded$1 = function (editor) {
      return editor.fire('SkinLoaded');
    };
    var fireSkinLoadError$1 = function (editor, error) {
      return editor.fire('SkinLoadError', error);
    };
    var fireResizeEditor = function (editor) {
      return editor.fire('ResizeEditor');
    };
    var fireResizeContent = function (editor, e) {
      return editor.fire('ResizeContent', e);
    };
    var fireScrollContent = function (editor, e) {
      return editor.fire('ScrollContent', e);
    };
    var fireTextColorChange = function (editor, data) {
      return editor.fire('TextColorChange', data);
    };

    var hsvColour = function (hue, saturation, value) {
      return {
        hue: hue,
        saturation: saturation,
        value: value
      };
    };
    var fromRgb = function (rgbaColour) {
      var h = 0;
      var s = 0;
      var v = 0;
      var r = rgbaColour.red / 255;
      var g = rgbaColour.green / 255;
      var b = rgbaColour.blue / 255;
      var minRGB = Math.min(r, Math.min(g, b));
      var maxRGB = Math.max(r, Math.max(g, b));
      if (minRGB === maxRGB) {
        v = minRGB;
        return hsvColour(0, 0, v * 100);
      }
      var d = r === minRGB ? g - b : b === minRGB ? r - g : b - r;
      h = r === minRGB ? 3 : b === minRGB ? 1 : 5;
      h = 60 * (h - d / (maxRGB - minRGB));
      s = (maxRGB - minRGB) / maxRGB;
      v = maxRGB;
      return hsvColour(Math.round(h), Math.round(s * 100), Math.round(v * 100));
    };

    var hexToHsv = function (hex) {
      return fromRgb(fromHex(hex));
    };
    var hsvToHex = function (hsv) {
      return fromRgba(fromHsv(hsv));
    };
    var anyToHex = function (color) {
      return fromString$1(color).orThunk(function () {
        return fromString(color).map(fromRgba);
      }).getOrThunk(function () {
        var canvas = document.createElement('canvas');
        canvas.height = 1;
        canvas.width = 1;
        var canvasContext = canvas.getContext('2d');
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        canvasContext.fillStyle = '#FFFFFF';
        canvasContext.fillStyle = color;
        canvasContext.fillRect(0, 0, 1, 1);
        var rgba = canvasContext.getImageData(0, 0, 1, 1).data;
        var r = rgba[0];
        var g = rgba[1];
        var b = rgba[2];
        var a = rgba[3];
        return fromRgba(rgbaColour(r, g, b, a));
      });
    };

    var global$9 = tinymce.util.Tools.resolve('tinymce.util.LocalStorage');

    var storageName = 'tinymce-custom-colors';
    function ColorCache (max) {
      if (max === void 0) {
        max = 10;
      }
      var storageString = global$9.getItem(storageName);
      var localstorage = isString(storageString) ? JSON.parse(storageString) : [];
      var prune = function (list) {
        var diff = max - list.length;
        return diff < 0 ? list.slice(0, max) : list;
      };
      var cache = prune(localstorage);
      var add = function (key) {
        indexOf(cache, key).each(remove);
        cache.unshift(key);
        if (cache.length > max) {
          cache.pop();
        }
        global$9.setItem(storageName, JSON.stringify(cache));
      };
      var remove = function (idx) {
        cache.splice(idx, 1);
      };
      var state = function () {
        return cache.slice(0);
      };
      return {
        add: add,
        state: state
      };
    }

    var choiceItem = 'choiceitem';
    var defaultColors = [
      {
        type: choiceItem,
        text: 'Light Green',
        value: '#BFEDD2'
      },
      {
        type: choiceItem,
        text: 'Light Yellow',
        value: '#FBEEB8'
      },
      {
        type: choiceItem,
        text: 'Light Red',
        value: '#F8CAC6'
      },
      {
        type: choiceItem,
        text: 'Light Purple',
        value: '#ECCAFA'
      },
      {
        type: choiceItem,
        text: 'Light Blue',
        value: '#C2E0F4'
      },
      {
        type: choiceItem,
        text: 'Green',
        value: '#2DC26B'
      },
      {
        type: choiceItem,
        text: 'Yellow',
        value: '#F1C40F'
      },
      {
        type: choiceItem,
        text: 'Red',
        value: '#E03E2D'
      },
      {
        type: choiceItem,
        text: 'Purple',
        value: '#B96AD9'
      },
      {
        type: choiceItem,
        text: 'Blue',
        value: '#3598DB'
      },
      {
        type: choiceItem,
        text: 'Dark Turquoise',
        value: '#169179'
      },
      {
        type: choiceItem,
        text: 'Orange',
        value: '#E67E23'
      },
      {
        type: choiceItem,
        text: 'Dark Red',
        value: '#BA372A'
      },
      {
        type: choiceItem,
        text: 'Dark Purple',
        value: '#843FA1'
      },
      {
        type: choiceItem,
        text: 'Dark Blue',
        value: '#236FA1'
      },
      {
        type: choiceItem,
        text: 'Light Gray',
        value: '#ECF0F1'
      },
      {
        type: choiceItem,
        text: 'Medium Gray',
        value: '#CED4D9'
      },
      {
        type: choiceItem,
        text: 'Gray',
        value: '#95A5A6'
      },
      {
        type: choiceItem,
        text: 'Dark Gray',
        value: '#7E8C8D'
      },
      {
        type: choiceItem,
        text: 'Navy Blue',
        value: '#34495E'
      },
      {
        type: choiceItem,
        text: 'Black',
        value: '#000000'
      },
      {
        type: choiceItem,
        text: 'White',
        value: '#ffffff'
      }
    ];
    var colorCache = ColorCache(10);
    var mapColors = function (colorMap) {
      var colors = [];
      for (var i = 0; i < colorMap.length; i += 2) {
        colors.push({
          text: colorMap[i + 1],
          value: '#' + anyToHex(colorMap[i]).value,
          type: 'choiceitem'
        });
      }
      return colors;
    };
    var getColorCols$2 = function (editor, defaultCols) {
      return editor.getParam('color_cols', defaultCols, 'number');
    };
    var hasCustomColors$1 = function (editor) {
      return editor.getParam('custom_colors') !== false;
    };
    var getColorMap = function (editor) {
      return editor.getParam('color_map');
    };
    var getColors$2 = function (editor) {
      var unmapped = getColorMap(editor);
      return unmapped !== undefined ? mapColors(unmapped) : defaultColors;
    };
    var getCurrentColors = function () {
      return map$2(colorCache.state(), function (color) {
        return {
          type: choiceItem,
          text: color,
          value: color
        };
      });
    };
    var addColor = function (color) {
      colorCache.add(color);
    };

    var getCurrentColor = function (editor, format) {
      var color;
      editor.dom.getParents(editor.selection.getStart(), function (elm) {
        var value;
        if (value = elm.style[format === 'forecolor' ? 'color' : 'background-color']) {
          color = color ? color : value;
        }
      });
      return color;
    };
    var applyFormat = function (editor, format, value) {
      editor.undoManager.transact(function () {
        editor.focus();
        editor.formatter.apply(format, { value: value });
        editor.nodeChanged();
      });
    };
    var removeFormat = function (editor, format) {
      editor.undoManager.transact(function () {
        editor.focus();
        editor.formatter.remove(format, { value: null }, null, true);
        editor.nodeChanged();
      });
    };
    var registerCommands = function (editor) {
      editor.addCommand('mceApplyTextcolor', function (format, value) {
        applyFormat(editor, format, value);
      });
      editor.addCommand('mceRemoveTextcolor', function (format) {
        removeFormat(editor, format);
      });
    };
    var calcCols = function (colors) {
      return Math.max(5, Math.ceil(Math.sqrt(colors)));
    };
    var getColorCols$1 = function (editor) {
      var colors = getColors$2(editor);
      var defaultCols = calcCols(colors.length);
      return getColorCols$2(editor, defaultCols);
    };
    var getAdditionalColors = function (hasCustom) {
      var type = 'choiceitem';
      var remove = {
        type: type,
        text: 'Remove color',
        icon: 'color-swatch-remove-color',
        value: 'remove'
      };
      var custom = {
        type: type,
        text: 'Custom color',
        icon: 'color-picker',
        value: 'custom'
      };
      return hasCustom ? [
        remove,
        custom
      ] : [remove];
    };
    var applyColor = function (editor, format, value, onChoice) {
      if (value === 'custom') {
        var dialog = colorPickerDialog(editor);
        dialog(function (colorOpt) {
          colorOpt.each(function (color) {
            addColor(color);
            editor.execCommand('mceApplyTextcolor', format, color);
            onChoice(color);
          });
        }, '#000000');
      } else if (value === 'remove') {
        onChoice('');
        editor.execCommand('mceRemoveTextcolor', format);
      } else {
        onChoice(value);
        editor.execCommand('mceApplyTextcolor', format, value);
      }
    };
    var getColors$1 = function (colors, hasCustom) {
      return colors.concat(getCurrentColors().concat(getAdditionalColors(hasCustom)));
    };
    var getFetch$1 = function (colors, hasCustom) {
      return function (callback) {
        callback(getColors$1(colors, hasCustom));
      };
    };
    var setIconColor = function (splitButtonApi, name, newColor) {
      var id = name === 'forecolor' ? 'tox-icon-text-color__color' : 'tox-icon-highlight-bg-color__color';
      splitButtonApi.setIconFill(id, newColor);
    };
    var registerTextColorButton = function (editor, name, format, tooltip, lastColor) {
      editor.ui.registry.addSplitButton(name, {
        tooltip: tooltip,
        presets: 'color',
        icon: name === 'forecolor' ? 'text-color' : 'highlight-bg-color',
        select: function (value) {
          var optCurrentRgb = Optional.from(getCurrentColor(editor, format));
          return optCurrentRgb.bind(function (currentRgb) {
            return fromString(currentRgb).map(function (rgba) {
              var currentHex = fromRgba(rgba).value;
              return contains$1(value.toLowerCase(), currentHex);
            });
          }).getOr(false);
        },
        columns: getColorCols$1(editor),
        fetch: getFetch$1(getColors$2(editor), hasCustomColors$1(editor)),
        onAction: function (_splitButtonApi) {
          if (lastColor.get() !== null) {
            applyColor(editor, format, lastColor.get(), noop);
          }
        },
        onItemAction: function (_splitButtonApi, value) {
          applyColor(editor, format, value, function (newColor) {
            lastColor.set(newColor);
            fireTextColorChange(editor, {
              name: name,
              color: newColor
            });
          });
        },
        onSetup: function (splitButtonApi) {
          if (lastColor.get() !== null) {
            setIconColor(splitButtonApi, name, lastColor.get());
          }
          var handler = function (e) {
            if (e.name === name) {
              setIconColor(splitButtonApi, e.name, e.color);
            }
          };
          editor.on('TextColorChange', handler);
          return function () {
            editor.off('TextColorChange', handler);
          };
        }
      });
    };
    var registerTextColorMenuItem = function (editor, name, format, text) {
      editor.ui.registry.addNestedMenuItem(name, {
        text: text,
        icon: name === 'forecolor' ? 'text-color' : 'highlight-bg-color',
        getSubmenuItems: function () {
          return [{
              type: 'fancymenuitem',
              fancytype: 'colorswatch',
              onAction: function (data) {
                applyColor(editor, format, data.value, noop);
              }
            }];
        }
      });
    };
    var colorPickerDialog = function (editor) {
      return function (callback, value) {
        var isValid = false;
        var onSubmit = function (api) {
          var data = api.getData();
          var hex = data.colorpicker;
          if (isValid) {
            callback(Optional.from(hex));
            api.close();
          } else {
            editor.windowManager.alert(editor.translate([
              'Invalid hex color code: {0}',
              hex
            ]));
          }
        };
        var onAction = function (_api, details) {
          if (details.name === 'hex-valid') {
            isValid = details.value;
          }
        };
        var initialData = { colorpicker: value };
        editor.windowManager.open({
          title: 'Color Picker',
          size: 'normal',
          body: {
            type: 'panel',
            items: [{
                type: 'colorpicker',
                name: 'colorpicker',
                label: 'Color'
              }]
          },
          buttons: [
            {
              type: 'cancel',
              name: 'cancel',
              text: 'Cancel'
            },
            {
              type: 'submit',
              name: 'save',
              text: 'Save',
              primary: true
            }
          ],
          initialData: initialData,
          onAction: onAction,
          onSubmit: onSubmit,
          onClose: noop,
          onCancel: function () {
            callback(Optional.none());
          }
        });
      };
    };
    var register$a = function (editor) {
      registerCommands(editor);
      var lastForeColor = Cell(null);
      var lastBackColor = Cell(null);
      registerTextColorButton(editor, 'forecolor', 'forecolor', 'Text color', lastForeColor);
      registerTextColorButton(editor, 'backcolor', 'hilitecolor', 'Background color', lastBackColor);
      registerTextColorMenuItem(editor, 'forecolor', 'forecolor', 'Text color');
      registerTextColorMenuItem(editor, 'backcolor', 'hilitecolor', 'Background color');
    };

    var createPartialChoiceMenu = function (value, items, onItemValueHandler, columns, presets, itemResponse, select, providersBackstage) {
      var hasIcons = menuHasIcons(items);
      var presetItemTypes = presets !== 'color' ? 'normal' : 'color';
      var alloyItems = createChoiceItems(items, onItemValueHandler, columns, presetItemTypes, itemResponse, select, providersBackstage);
      return createPartialMenuWithAlloyItems(value, hasIcons, alloyItems, columns, presets);
    };
    var createChoiceItems = function (items, onItemValueHandler, columns, itemPresets, itemResponse, select, providersBackstage) {
      return cat(map$2(items, function (item) {
        if (item.type === 'choiceitem') {
          return createChoiceMenuItem(item).fold(handleError, function (d) {
            return Optional.some(renderChoiceItem(d, columns === 1, itemPresets, onItemValueHandler, select(item.value), itemResponse, providersBackstage, menuHasIcons(items)));
          });
        } else {
          return Optional.none();
        }
      }));
    };

    var deriveMenuMovement = function (columns, presets) {
      var menuMarkers = markers(presets);
      if (columns === 1) {
        return {
          mode: 'menu',
          moveOnTab: true
        };
      } else if (columns === 'auto') {
        return {
          mode: 'grid',
          selector: '.' + menuMarkers.item,
          initSize: {
            numColumns: 1,
            numRows: 1
          }
        };
      } else {
        var rowClass = presets === 'color' ? 'tox-swatches__row' : 'tox-collection__group';
        return {
          mode: 'matrix',
          rowSelector: '.' + rowClass
        };
      }
    };
    var deriveCollectionMovement = function (columns, presets) {
      if (columns === 1) {
        return {
          mode: 'menu',
          moveOnTab: false,
          selector: '.tox-collection__item'
        };
      } else if (columns === 'auto') {
        return {
          mode: 'flatgrid',
          selector: '.' + 'tox-collection__item',
          initSize: {
            numColumns: 1,
            numRows: 1
          }
        };
      } else {
        return {
          mode: 'matrix',
          selectors: {
            row: presets === 'color' ? '.tox-swatches__row' : '.tox-collection__group',
            cell: presets === 'color' ? '.' + colorClass : '.' + selectableClass
          }
        };
      }
    };

    var renderColorSwatchItem = function (spec, backstage) {
      var items = getColorItems(spec, backstage);
      var columns = backstage.colorinput.getColorCols();
      var presets = 'color';
      var menuSpec = createPartialChoiceMenu(generate$6('menu-value'), items, function (value) {
        spec.onAction({ value: value });
      }, columns, presets, ItemResponse$1.CLOSE_ON_EXECUTE, never, backstage.shared.providers);
      var widgetSpec = __assign(__assign({}, menuSpec), {
        markers: markers(presets),
        movement: deriveMenuMovement(columns, presets)
      });
      return {
        type: 'widget',
        data: { value: generate$6('widget-id') },
        dom: {
          tag: 'div',
          classes: ['tox-fancymenuitem']
        },
        autofocus: true,
        components: [parts$f.widget(Menu.sketch(widgetSpec))]
      };
    };
    var getColorItems = function (spec, backstage) {
      var useCustomColors = spec.initData.allowCustomColors && backstage.colorinput.hasCustomColors();
      return spec.initData.colors.fold(function () {
        return getColors$1(backstage.colorinput.getColors(), useCustomColors);
      }, function (colors) {
        return colors.concat(getAdditionalColors(useCustomColors));
      });
    };

    var cellOverEvent = generate$6('cell-over');
    var cellExecuteEvent = generate$6('cell-execute');
    var makeCell = function (row, col, labelId) {
      var _a;
      var emitCellOver = function (c) {
        return emitWith(c, cellOverEvent, {
          row: row,
          col: col
        });
      };
      var emitExecute = function (c) {
        return emitWith(c, cellExecuteEvent, {
          row: row,
          col: col
        });
      };
      var onClick = function (c, se) {
        se.stop();
        emitExecute(c);
      };
      return build$1({
        dom: {
          tag: 'div',
          attributes: (_a = { role: 'button' }, _a['aria-labelledby'] = labelId, _a)
        },
        behaviours: derive$1([
          config('insert-table-picker-cell', [
            run$1(mouseover(), Focusing.focus),
            run$1(execute$5(), emitExecute),
            run$1(click(), onClick),
            run$1(tap(), onClick)
          ]),
          Toggling.config({
            toggleClass: 'tox-insert-table-picker__selected',
            toggleOnExecute: false
          }),
          Focusing.config({ onFocus: emitCellOver })
        ])
      });
    };
    var makeCells = function (labelId, numRows, numCols) {
      var cells = [];
      for (var i = 0; i < numRows; i++) {
        var row = [];
        for (var j = 0; j < numCols; j++) {
          row.push(makeCell(i, j, labelId));
        }
        cells.push(row);
      }
      return cells;
    };
    var selectCells = function (cells, selectedRow, selectedColumn, numRows, numColumns) {
      for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < numColumns; j++) {
          Toggling.set(cells[i][j], i <= selectedRow && j <= selectedColumn);
        }
      }
    };
    var makeComponents = function (cells) {
      return bind$3(cells, function (cellRow) {
        return map$2(cellRow, premade);
      });
    };
    var makeLabelText = function (row, col) {
      return text(col + 1 + 'x' + (row + 1));
    };
    var renderInsertTableMenuItem = function (spec) {
      var numRows = 10;
      var numColumns = 10;
      var sizeLabelId = generate$6('size-label');
      var cells = makeCells(sizeLabelId, numRows, numColumns);
      var memLabel = record({
        dom: {
          tag: 'span',
          classes: ['tox-insert-table-picker__label'],
          attributes: { id: sizeLabelId }
        },
        components: [text('0x0')],
        behaviours: derive$1([Replacing.config({})])
      });
      return {
        type: 'widget',
        data: { value: generate$6('widget-id') },
        dom: {
          tag: 'div',
          classes: ['tox-fancymenuitem']
        },
        autofocus: true,
        components: [parts$f.widget({
            dom: {
              tag: 'div',
              classes: ['tox-insert-table-picker']
            },
            components: makeComponents(cells).concat(memLabel.asSpec()),
            behaviours: derive$1([
              config('insert-table-picker', [
                runWithTarget(cellOverEvent, function (c, t, e) {
                  var row = e.event.row;
                  var col = e.event.col;
                  selectCells(cells, row, col, numRows, numColumns);
                  Replacing.set(memLabel.get(c), [makeLabelText(row, col)]);
                }),
                runWithTarget(cellExecuteEvent, function (c, _, e) {
                  spec.onAction({
                    numRows: e.event.row + 1,
                    numColumns: e.event.col + 1
                  });
                  emit(c, sandboxClose());
                })
              ]),
              Keying.config({
                initSize: {
                  numRows: numRows,
                  numColumns: numColumns
                },
                mode: 'flatgrid',
                selector: '[role="button"]'
              })
            ])
          })]
      };
    };

    var fancyMenuItems = {
      inserttable: renderInsertTableMenuItem,
      colorswatch: renderColorSwatchItem
    };
    var renderFancyMenuItem = function (spec, backstage) {
      return get$e(fancyMenuItems, spec.fancytype).map(function (render) {
        return render(spec, backstage);
      });
    };

    var renderNestedItem = function (spec, itemResponse, providersBackstage, renderIcons, downwardsCaret) {
      if (renderIcons === void 0) {
        renderIcons = true;
      }
      if (downwardsCaret === void 0) {
        downwardsCaret = false;
      }
      var caret = downwardsCaret ? renderDownwardsCaret(providersBackstage.icons) : renderSubmenuCaret(providersBackstage.icons);
      var getApi = function (component) {
        return {
          isDisabled: function () {
            return Disabling.isDisabled(component);
          },
          setDisabled: function (state) {
            return Disabling.set(component, state);
          }
        };
      };
      var structure = renderItemStructure({
        presets: 'normal',
        iconContent: spec.icon,
        textContent: spec.text,
        htmlContent: Optional.none(),
        ariaLabel: spec.text,
        caret: Optional.some(caret),
        checkMark: Optional.none(),
        shortcutContent: spec.shortcut
      }, providersBackstage, renderIcons);
      return renderCommonItem({
        data: buildData(spec),
        getApi: getApi,
        disabled: spec.disabled,
        onAction: noop,
        onSetup: spec.onSetup,
        triggersSubmenu: true,
        itemBehaviours: []
      }, structure, itemResponse, providersBackstage);
    };

    var renderNormalItem = function (spec, itemResponse, providersBackstage, renderIcons) {
      if (renderIcons === void 0) {
        renderIcons = true;
      }
      var getApi = function (component) {
        return {
          isDisabled: function () {
            return Disabling.isDisabled(component);
          },
          setDisabled: function (state) {
            return Disabling.set(component, state);
          }
        };
      };
      var structure = renderItemStructure({
        presets: 'normal',
        iconContent: spec.icon,
        textContent: spec.text,
        htmlContent: Optional.none(),
        ariaLabel: spec.text,
        caret: Optional.none(),
        checkMark: Optional.none(),
        shortcutContent: spec.shortcut
      }, providersBackstage, renderIcons);
      return renderCommonItem({
        data: buildData(spec),
        getApi: getApi,
        disabled: spec.disabled,
        onAction: spec.onAction,
        onSetup: spec.onSetup,
        triggersSubmenu: false,
        itemBehaviours: []
      }, structure, itemResponse, providersBackstage);
    };

    var renderSeparatorItem = function (spec) {
      var innerHtml = spec.text.fold(function () {
        return {};
      }, function (text) {
        return { innerHtml: text };
      });
      return {
        type: 'separator',
        dom: __assign({
          tag: 'div',
          classes: [
            selectableClass,
            groupHeadingClass
          ]
        }, innerHtml),
        components: []
      };
    };

    var renderToggleMenuItem = function (spec, itemResponse, providersBackstage, renderIcons) {
      if (renderIcons === void 0) {
        renderIcons = true;
      }
      var getApi = function (component) {
        return {
          setActive: function (state) {
            Toggling.set(component, state);
          },
          isActive: function () {
            return Toggling.isOn(component);
          },
          isDisabled: function () {
            return Disabling.isDisabled(component);
          },
          setDisabled: function (state) {
            return Disabling.set(component, state);
          }
        };
      };
      var structure = renderItemStructure({
        iconContent: spec.icon,
        textContent: spec.text,
        htmlContent: Optional.none(),
        ariaLabel: spec.text,
        checkMark: Optional.some(renderCheckmark(providersBackstage.icons)),
        caret: Optional.none(),
        shortcutContent: spec.shortcut,
        presets: 'normal',
        meta: spec.meta
      }, providersBackstage, renderIcons);
      return deepMerge(renderCommonItem({
        data: buildData(spec),
        disabled: spec.disabled,
        getApi: getApi,
        onAction: spec.onAction,
        onSetup: spec.onSetup,
        triggersSubmenu: false,
        itemBehaviours: []
      }, structure, itemResponse, providersBackstage), {
        toggling: {
          toggleClass: tickedClass,
          toggleOnExecute: false,
          selected: spec.active
        }
      });
    };

    var autocomplete = renderAutocompleteItem;
    var separator$3 = renderSeparatorItem;
    var normal = renderNormalItem;
    var nested = renderNestedItem;
    var toggle$1 = renderToggleMenuItem;
    var fancy = renderFancyMenuItem;
    var card = renderCardMenuItem;

    var FocusMode;
    (function (FocusMode) {
      FocusMode[FocusMode['ContentFocus'] = 0] = 'ContentFocus';
      FocusMode[FocusMode['UiFocus'] = 1] = 'UiFocus';
    }(FocusMode || (FocusMode = {})));
    var createMenuItemFromBridge = function (item, itemResponse, backstage, menuHasIcons, isHorizontalMenu) {
      var providersBackstage = backstage.shared.providers;
      var parseForHorizontalMenu = function (menuitem) {
        return !isHorizontalMenu ? menuitem : __assign(__assign({}, menuitem), {
          shortcut: Optional.none(),
          icon: menuitem.text.isSome() ? Optional.none() : menuitem.icon
        });
      };
      switch (item.type) {
      case 'menuitem':
        return createMenuItem(item).fold(handleError, function (d) {
          return Optional.some(normal(parseForHorizontalMenu(d), itemResponse, providersBackstage, menuHasIcons));
        });
      case 'nestedmenuitem':
        return createNestedMenuItem(item).fold(handleError, function (d) {
          return Optional.some(nested(parseForHorizontalMenu(d), itemResponse, providersBackstage, menuHasIcons, isHorizontalMenu));
        });
      case 'togglemenuitem':
        return createToggleMenuItem(item).fold(handleError, function (d) {
          return Optional.some(toggle$1(parseForHorizontalMenu(d), itemResponse, providersBackstage, menuHasIcons));
        });
      case 'separator':
        return createSeparatorMenuItem(item).fold(handleError, function (d) {
          return Optional.some(separator$3(d));
        });
      case 'fancymenuitem':
        return createFancyMenuItem(item).fold(handleError, function (d) {
          return fancy(parseForHorizontalMenu(d), backstage);
        });
      default: {
          console.error('Unknown item in general menu', item);
          return Optional.none();
        }
      }
    };
    var createAutocompleteItems = function (items, matchText, onItemValueHandler, columns, itemResponse, sharedBackstage, highlightOn) {
      var renderText = columns === 1;
      var renderIcons = !renderText || menuHasIcons(items);
      return cat(map$2(items, function (item) {
        switch (item.type) {
        case 'separator':
          return createSeparatorItem(item).fold(handleError, function (d) {
            return Optional.some(separator$3(d));
          });
        case 'cardmenuitem':
          return createCardMenuItem(item).fold(handleError, function (d) {
            return Optional.some(card(__assign(__assign({}, d), {
              onAction: function (api) {
                d.onAction(api);
                onItemValueHandler(d.value, d.meta);
              }
            }), itemResponse, sharedBackstage, {
              itemBehaviours: tooltipBehaviour(d.meta, sharedBackstage),
              cardText: {
                matchText: matchText,
                highlightOn: highlightOn
              }
            }));
          });
        case 'autocompleteitem':
        default:
          return createAutocompleterItem(item).fold(handleError, function (d) {
            return Optional.some(autocomplete(d, matchText, renderText, 'normal', onItemValueHandler, itemResponse, sharedBackstage, renderIcons));
          });
        }
      }));
    };
    var createPartialMenu = function (value, items, itemResponse, backstage, isHorizontalMenu) {
      var hasIcons = menuHasIcons(items);
      var alloyItems = cat(map$2(items, function (item) {
        var itemHasIcon = function (i) {
          return isHorizontalMenu ? !has$2(i, 'text') : hasIcons;
        };
        var createItem = function (i) {
          return createMenuItemFromBridge(i, itemResponse, backstage, itemHasIcon(i), isHorizontalMenu);
        };
        if (item.type === 'nestedmenuitem' && item.getSubmenuItems().length <= 0) {
          return createItem(__assign(__assign({}, item), { disabled: true }));
        } else {
          return createItem(item);
        }
      }));
      var createPartial = isHorizontalMenu ? createHorizontalPartialMenuWithAlloyItems : createPartialMenuWithAlloyItems;
      return createPartial(value, hasIcons, alloyItems, 1, 'normal');
    };
    var createTieredDataFrom = function (partialMenu) {
      return tieredMenu.singleData(partialMenu.value, partialMenu);
    };
    var createMenuFrom = function (partialMenu, columns, focusMode, presets) {
      var focusManager = focusMode === FocusMode.ContentFocus ? highlights() : dom$2();
      var movement = deriveMenuMovement(columns, presets);
      var menuMarkers = markers(presets);
      return {
        dom: partialMenu.dom,
        components: partialMenu.components,
        items: partialMenu.items,
        value: partialMenu.value,
        markers: {
          selectedItem: menuMarkers.selectedItem,
          item: menuMarkers.item
        },
        movement: movement,
        fakeFocus: focusMode === FocusMode.ContentFocus,
        focusManager: focusManager,
        menuBehaviours: SimpleBehaviours.unnamedEvents(columns !== 'auto' ? [] : [runOnAttached(function (comp, _se) {
            detectSize(comp, 4, menuMarkers.item).each(function (_a) {
              var numColumns = _a.numColumns, numRows = _a.numRows;
              Keying.setGridSize(comp, numRows, numColumns);
            });
          })])
      };
    };

    var register$9 = function (editor, sharedBackstage) {
      var activeAutocompleter = value$1();
      var processingAction = Cell(false);
      var autocompleter = build$1(InlineView.sketch({
        dom: {
          tag: 'div',
          classes: ['tox-autocompleter']
        },
        components: [],
        fireDismissalEventInstead: {},
        inlineBehaviours: derive$1([config('dismissAutocompleter', [run$1(dismissRequested(), function () {
              return cancelIfNecessary();
            })])]),
        lazySink: sharedBackstage.getSink
      }));
      var isMenuOpen = function () {
        return InlineView.isOpen(autocompleter);
      };
      var isActive = function () {
        return activeAutocompleter.get().isSome();
      };
      var hideIfNecessary = function () {
        if (isActive()) {
          InlineView.hide(autocompleter);
        }
      };
      var cancelIfNecessary = function () {
        if (isActive()) {
          var lastElement = activeAutocompleter.get().map(function (ac) {
            return ac.element;
          });
          detect(lastElement.getOr(SugarElement.fromDom(editor.selection.getNode()))).each(unwrap);
          hideIfNecessary();
          activeAutocompleter.clear();
          processingAction.set(false);
        }
      };
      var getAutocompleters = cached(function () {
        return register$b(editor);
      });
      var getCombinedItems = function (triggerChar, matches) {
        var columns = findMap(matches, function (m) {
          return Optional.from(m.columns);
        }).getOr(1);
        return bind$3(matches, function (match) {
          var choices = match.items;
          return createAutocompleteItems(choices, match.matchText, function (itemValue, itemMeta) {
            var nr = editor.selection.getRng();
            getContext(editor.dom, nr, triggerChar).fold(function () {
              return console.error('Lost context. Cursor probably moved');
            }, function (_a) {
              var range = _a.range;
              var autocompleterApi = {
                hide: function () {
                  cancelIfNecessary();
                },
                reload: function (fetchOptions) {
                  hideIfNecessary();
                  load(fetchOptions);
                }
              };
              processingAction.set(true);
              match.onAction(autocompleterApi, range, itemValue, itemMeta);
              processingAction.set(false);
            });
          }, columns, ItemResponse$1.BUBBLE_TO_SANDBOX, sharedBackstage, match.highlightOn);
        });
      };
      var commenceIfNecessary = function (context) {
        if (!isActive()) {
          var wrapper = create$4(editor, context.range);
          activeAutocompleter.set({
            triggerChar: context.triggerChar,
            element: wrapper,
            matchLength: context.text.length
          });
          processingAction.set(false);
        }
      };
      var display = function (ac, context, lookupData, items) {
        ac.matchLength = context.text.length;
        var columns = findMap(lookupData, function (ld) {
          return Optional.from(ld.columns);
        }).getOr(1);
        InlineView.showAt(autocompleter, Menu.sketch(createMenuFrom(createPartialMenuWithAlloyItems('autocompleter-value', true, items, columns, 'normal'), columns, FocusMode.ContentFocus, 'normal')), {
          anchor: {
            type: 'node',
            root: SugarElement.fromDom(editor.getBody()),
            node: Optional.from(ac.element)
          }
        });
        InlineView.getContent(autocompleter).each(Highlighting.highlightFirst);
      };
      var doLookup = function (fetchOptions) {
        return activeAutocompleter.get().map(function (ac) {
          return getContext(editor.dom, editor.selection.getRng(), ac.triggerChar).bind(function (newContext) {
            return lookupWithContext(editor, getAutocompleters, newContext, fetchOptions);
          });
        }).getOrThunk(function () {
          return lookup$2(editor, getAutocompleters);
        });
      };
      var load = function (fetchOptions) {
        doLookup(fetchOptions).fold(cancelIfNecessary, function (lookupInfo) {
          commenceIfNecessary(lookupInfo.context);
          lookupInfo.lookupData.then(function (lookupData) {
            activeAutocompleter.get().map(function (ac) {
              var context = lookupInfo.context;
              if (ac.triggerChar === context.triggerChar) {
                var combinedItems = getCombinedItems(context.triggerChar, lookupData);
                if (combinedItems.length > 0) {
                  display(ac, context, lookupData, combinedItems);
                } else if (context.text.length - ac.matchLength >= 10) {
                  cancelIfNecessary();
                } else {
                  hideIfNecessary();
                }
              }
            });
          });
        });
      };
      var onKeypress = last(function (e) {
        if (e.which === 27) {
          return;
        }
        load();
      }, 50);
      var autocompleterUiApi = {
        onKeypress: onKeypress,
        cancelIfNecessary: cancelIfNecessary,
        isMenuOpen: isMenuOpen,
        isActive: isActive,
        isProcessingAction: processingAction.get,
        getView: function () {
          return InlineView.getContent(autocompleter);
        }
      };
      if (editor.hasPlugin('rtc') === false) {
        AutocompleterEditorEvents.setup(autocompleterUiApi, editor);
      }
    };
    var Autocompleter = { register: register$9 };

    var closest = function (scope, selector, isRoot) {
      return closest$1(scope, selector, isRoot).isSome();
    };

    var DelayedFunction = function (fun, delay) {
      var ref = null;
      var schedule = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        ref = setTimeout(function () {
          fun.apply(null, args);
          ref = null;
        }, delay);
      };
      var cancel = function () {
        if (ref !== null) {
          clearTimeout(ref);
          ref = null;
        }
      };
      return {
        cancel: cancel,
        schedule: schedule
      };
    };

    var SIGNIFICANT_MOVE = 5;
    var LONGPRESS_DELAY = 400;
    var getTouch = function (event) {
      var raw = event.raw;
      if (raw.touches === undefined || raw.touches.length !== 1) {
        return Optional.none();
      }
      return Optional.some(raw.touches[0]);
    };
    var isFarEnough = function (touch, data) {
      var distX = Math.abs(touch.clientX - data.x);
      var distY = Math.abs(touch.clientY - data.y);
      return distX > SIGNIFICANT_MOVE || distY > SIGNIFICANT_MOVE;
    };
    var monitor = function (settings) {
      var startData = value$1();
      var longpressFired = Cell(false);
      var longpress$1 = DelayedFunction(function (event) {
        settings.triggerEvent(longpress(), event);
        longpressFired.set(true);
      }, LONGPRESS_DELAY);
      var handleTouchstart = function (event) {
        getTouch(event).each(function (touch) {
          longpress$1.cancel();
          var data = {
            x: touch.clientX,
            y: touch.clientY,
            target: event.target
          };
          longpress$1.schedule(event);
          longpressFired.set(false);
          startData.set(data);
        });
        return Optional.none();
      };
      var handleTouchmove = function (event) {
        longpress$1.cancel();
        getTouch(event).each(function (touch) {
          startData.on(function (data) {
            if (isFarEnough(touch, data)) {
              startData.clear();
            }
          });
        });
        return Optional.none();
      };
      var handleTouchend = function (event) {
        longpress$1.cancel();
        var isSame = function (data) {
          return eq(data.target, event.target);
        };
        return startData.get().filter(isSame).map(function (_data) {
          if (longpressFired.get()) {
            event.prevent();
            return false;
          } else {
            return settings.triggerEvent(tap(), event);
          }
        });
      };
      var handlers = wrapAll([
        {
          key: touchstart(),
          value: handleTouchstart
        },
        {
          key: touchmove(),
          value: handleTouchmove
        },
        {
          key: touchend(),
          value: handleTouchend
        }
      ]);
      var fireIfReady = function (event, type) {
        return get$e(handlers, type).bind(function (handler) {
          return handler(event);
        });
      };
      return { fireIfReady: fireIfReady };
    };

    var isDangerous = function (event) {
      var keyEv = event.raw;
      return keyEv.which === BACKSPACE[0] && !contains$2([
        'input',
        'textarea'
      ], name$2(event.target)) && !closest(event.target, '[contenteditable="true"]');
    };
    var isFirefox = function () {
      return detect$1().browser.isFirefox();
    };
    var settingsSchema = objOfOnly([
      requiredFunction('triggerEvent'),
      defaulted('stopBackspace', true)
    ]);
    var bindFocus = function (container, handler) {
      if (isFirefox()) {
        return capture(container, 'focus', handler);
      } else {
        return bind(container, 'focusin', handler);
      }
    };
    var bindBlur = function (container, handler) {
      if (isFirefox()) {
        return capture(container, 'blur', handler);
      } else {
        return bind(container, 'focusout', handler);
      }
    };
    var setup$d = function (container, rawSettings) {
      var settings = asRawOrDie$1('Getting GUI events settings', settingsSchema, rawSettings);
      var pointerEvents = [
        'touchstart',
        'touchmove',
        'touchend',
        'touchcancel',
        'gesturestart',
        'mousedown',
        'mouseup',
        'mouseover',
        'mousemove',
        'mouseout',
        'click'
      ];
      var tapEvent = monitor(settings);
      var simpleEvents = map$2(pointerEvents.concat([
        'selectstart',
        'input',
        'contextmenu',
        'change',
        'transitionend',
        'transitioncancel',
        'drag',
        'dragstart',
        'dragend',
        'dragenter',
        'dragleave',
        'dragover',
        'drop',
        'keyup'
      ]), function (type) {
        return bind(container, type, function (event) {
          tapEvent.fireIfReady(event, type).each(function (tapStopped) {
            if (tapStopped) {
              event.kill();
            }
          });
          var stopped = settings.triggerEvent(type, event);
          if (stopped) {
            event.kill();
          }
        });
      });
      var pasteTimeout = value$1();
      var onPaste = bind(container, 'paste', function (event) {
        tapEvent.fireIfReady(event, 'paste').each(function (tapStopped) {
          if (tapStopped) {
            event.kill();
          }
        });
        var stopped = settings.triggerEvent('paste', event);
        if (stopped) {
          event.kill();
        }
        pasteTimeout.set(setTimeout(function () {
          settings.triggerEvent(postPaste(), event);
        }, 0));
      });
      var onKeydown = bind(container, 'keydown', function (event) {
        var stopped = settings.triggerEvent('keydown', event);
        if (stopped) {
          event.kill();
        } else if (settings.stopBackspace === true && isDangerous(event)) {
          event.prevent();
        }
      });
      var onFocusIn = bindFocus(container, function (event) {
        var stopped = settings.triggerEvent('focusin', event);
        if (stopped) {
          event.kill();
        }
      });
      var focusoutTimeout = value$1();
      var onFocusOut = bindBlur(container, function (event) {
        var stopped = settings.triggerEvent('focusout', event);
        if (stopped) {
          event.kill();
        }
        focusoutTimeout.set(setTimeout(function () {
          settings.triggerEvent(postBlur(), event);
        }, 0));
      });
      var unbind = function () {
        each$1(simpleEvents, function (e) {
          e.unbind();
        });
        onKeydown.unbind();
        onFocusIn.unbind();
        onFocusOut.unbind();
        onPaste.unbind();
        pasteTimeout.on(clearTimeout);
        focusoutTimeout.on(clearTimeout);
      };
      return { unbind: unbind };
    };

    var derive = function (rawEvent, rawTarget) {
      var source = get$e(rawEvent, 'target').getOr(rawTarget);
      return Cell(source);
    };

    var fromSource = function (event, source) {
      var stopper = Cell(false);
      var cutter = Cell(false);
      var stop = function () {
        stopper.set(true);
      };
      var cut = function () {
        cutter.set(true);
      };
      return {
        stop: stop,
        cut: cut,
        isStopped: stopper.get,
        isCut: cutter.get,
        event: event,
        setSource: source.set,
        getSource: source.get
      };
    };
    var fromExternal = function (event) {
      var stopper = Cell(false);
      var stop = function () {
        stopper.set(true);
      };
      return {
        stop: stop,
        cut: noop,
        isStopped: stopper.get,
        isCut: never,
        event: event,
        setSource: die('Cannot set source of a broadcasted event'),
        getSource: die('Cannot get source of a broadcasted event')
      };
    };

    var adt$1 = Adt.generate([
      { stopped: [] },
      { resume: ['element'] },
      { complete: [] }
    ]);
    var doTriggerHandler = function (lookup, eventType, rawEvent, target, source, logger) {
      var handler = lookup(eventType, target);
      var simulatedEvent = fromSource(rawEvent, source);
      return handler.fold(function () {
        logger.logEventNoHandlers(eventType, target);
        return adt$1.complete();
      }, function (handlerInfo) {
        var descHandler = handlerInfo.descHandler;
        var eventHandler = getCurried(descHandler);
        eventHandler(simulatedEvent);
        if (simulatedEvent.isStopped()) {
          logger.logEventStopped(eventType, handlerInfo.element, descHandler.purpose);
          return adt$1.stopped();
        } else if (simulatedEvent.isCut()) {
          logger.logEventCut(eventType, handlerInfo.element, descHandler.purpose);
          return adt$1.complete();
        } else {
          return parent(handlerInfo.element).fold(function () {
            logger.logNoParent(eventType, handlerInfo.element, descHandler.purpose);
            return adt$1.complete();
          }, function (parent) {
            logger.logEventResponse(eventType, handlerInfo.element, descHandler.purpose);
            return adt$1.resume(parent);
          });
        }
      });
    };
    var doTriggerOnUntilStopped = function (lookup, eventType, rawEvent, rawTarget, source, logger) {
      return doTriggerHandler(lookup, eventType, rawEvent, rawTarget, source, logger).fold(always, function (parent) {
        return doTriggerOnUntilStopped(lookup, eventType, rawEvent, parent, source, logger);
      }, never);
    };
    var triggerHandler = function (lookup, eventType, rawEvent, target, logger) {
      var source = derive(rawEvent, target);
      return doTriggerHandler(lookup, eventType, rawEvent, target, source, logger);
    };
    var broadcast = function (listeners, rawEvent, _logger) {
      var simulatedEvent = fromExternal(rawEvent);
      each$1(listeners, function (listener) {
        var descHandler = listener.descHandler;
        var handler = getCurried(descHandler);
        handler(simulatedEvent);
      });
      return simulatedEvent.isStopped();
    };
    var triggerUntilStopped = function (lookup, eventType, rawEvent, logger) {
      return triggerOnUntilStopped(lookup, eventType, rawEvent, rawEvent.target, logger);
    };
    var triggerOnUntilStopped = function (lookup, eventType, rawEvent, rawTarget, logger) {
      var source = derive(rawEvent, rawTarget);
      return doTriggerOnUntilStopped(lookup, eventType, rawEvent, rawTarget, source, logger);
    };

    var eventHandler = function (element, descHandler) {
      return {
        element: element,
        descHandler: descHandler
      };
    };
    var broadcastHandler = function (id, handler) {
      return {
        id: id,
        descHandler: handler
      };
    };
    var EventRegistry = function () {
      var registry = {};
      var registerId = function (extraArgs, id, events) {
        each(events, function (v, k) {
          var handlers = registry[k] !== undefined ? registry[k] : {};
          handlers[id] = curryArgs(v, extraArgs);
          registry[k] = handlers;
        });
      };
      var findHandler = function (handlers, elem) {
        return read$1(elem).fold(function () {
          return Optional.none();
        }, function (id) {
          return handlers.bind(function (h) {
            return get$e(h, id);
          }).map(function (descHandler) {
            return eventHandler(elem, descHandler);
          });
        });
      };
      var filterByType = function (type) {
        return get$e(registry, type).map(function (handlers) {
          return mapToArray(handlers, function (f, id) {
            return broadcastHandler(id, f);
          });
        }).getOr([]);
      };
      var find = function (isAboveRoot, type, target) {
        var handlers = get$e(registry, type);
        return closest$4(target, function (elem) {
          return findHandler(handlers, elem);
        }, isAboveRoot);
      };
      var unregisterId = function (id) {
        each(registry, function (handlersById, _eventName) {
          if (has$2(handlersById, id)) {
            delete handlersById[id];
          }
        });
      };
      return {
        registerId: registerId,
        unregisterId: unregisterId,
        filterByType: filterByType,
        find: find
      };
    };

    var Registry = function () {
      var events = EventRegistry();
      var components = {};
      var readOrTag = function (component) {
        var elem = component.element;
        return read$1(elem).getOrThunk(function () {
          return write('uid-', component.element);
        });
      };
      var failOnDuplicate = function (component, tagId) {
        var conflict = components[tagId];
        if (conflict === component) {
          unregister(component);
        } else {
          throw new Error('The tagId "' + tagId + '" is already used by: ' + element(conflict.element) + '\nCannot use it for: ' + element(component.element) + '\n' + 'The conflicting element is' + (inBody(conflict.element) ? ' ' : ' not ') + 'already in the DOM');
        }
      };
      var register = function (component) {
        var tagId = readOrTag(component);
        if (hasNonNullableKey(components, tagId)) {
          failOnDuplicate(component, tagId);
        }
        var extraArgs = [component];
        events.registerId(extraArgs, tagId, component.events);
        components[tagId] = component;
      };
      var unregister = function (component) {
        read$1(component.element).each(function (tagId) {
          delete components[tagId];
          events.unregisterId(tagId);
        });
      };
      var filter = function (type) {
        return events.filterByType(type);
      };
      var find = function (isAboveRoot, type, target) {
        return events.find(isAboveRoot, type, target);
      };
      var getById = function (id) {
        return get$e(components, id);
      };
      return {
        find: find,
        filter: filter,
        register: register,
        unregister: unregister,
        getById: getById
      };
    };

    var factory$j = function (detail) {
      var _a = detail.dom, attributes = _a.attributes, domWithoutAttributes = __rest(_a, ['attributes']);
      return {
        uid: detail.uid,
        dom: __assign({
          tag: 'div',
          attributes: __assign({ role: 'presentation' }, attributes)
        }, domWithoutAttributes),
        components: detail.components,
        behaviours: get$2(detail.containerBehaviours),
        events: detail.events,
        domModification: detail.domModification,
        eventOrder: detail.eventOrder
      };
    };
    var Container = single({
      name: 'Container',
      factory: factory$j,
      configFields: [
        defaulted('components', []),
        field('containerBehaviours', []),
        defaulted('events', {}),
        defaulted('domModification', {}),
        defaulted('eventOrder', {})
      ]
    });

    var takeover = function (root) {
      var isAboveRoot = function (el) {
        return parent(root.element).fold(always, function (parent) {
          return eq(el, parent);
        });
      };
      var registry = Registry();
      var lookup = function (eventName, target) {
        return registry.find(isAboveRoot, eventName, target);
      };
      var domEvents = setup$d(root.element, {
        triggerEvent: function (eventName, event) {
          return monitorEvent(eventName, event.target, function (logger) {
            return triggerUntilStopped(lookup, eventName, event, logger);
          });
        }
      });
      var systemApi = {
        debugInfo: constant$1('real'),
        triggerEvent: function (eventName, target, data) {
          monitorEvent(eventName, target, function (logger) {
            return triggerOnUntilStopped(lookup, eventName, data, target, logger);
          });
        },
        triggerFocus: function (target, originator) {
          read$1(target).fold(function () {
            focus$3(target);
          }, function (_alloyId) {
            monitorEvent(focus$4(), target, function (logger) {
              triggerHandler(lookup, focus$4(), {
                originator: originator,
                kill: noop,
                prevent: noop,
                target: target
              }, target, logger);
              return false;
            });
          });
        },
        triggerEscape: function (comp, simulatedEvent) {
          systemApi.triggerEvent('keydown', comp.element, simulatedEvent.event);
        },
        getByUid: function (uid) {
          return getByUid(uid);
        },
        getByDom: function (elem) {
          return getByDom(elem);
        },
        build: build$1,
        addToGui: function (c) {
          add(c);
        },
        removeFromGui: function (c) {
          remove(c);
        },
        addToWorld: function (c) {
          addToWorld(c);
        },
        removeFromWorld: function (c) {
          removeFromWorld(c);
        },
        broadcast: function (message) {
          broadcast$1(message);
        },
        broadcastOn: function (channels, message) {
          broadcastOn(channels, message);
        },
        broadcastEvent: function (eventName, event) {
          broadcastEvent(eventName, event);
        },
        isConnected: always
      };
      var addToWorld = function (component) {
        component.connect(systemApi);
        if (!isText$1(component.element)) {
          registry.register(component);
          each$1(component.components(), addToWorld);
          systemApi.triggerEvent(systemInit(), component.element, { target: component.element });
        }
      };
      var removeFromWorld = function (component) {
        if (!isText$1(component.element)) {
          each$1(component.components(), removeFromWorld);
          registry.unregister(component);
        }
        component.disconnect();
      };
      var add = function (component) {
        attach(root, component);
      };
      var remove = function (component) {
        detach(component);
      };
      var destroy = function () {
        domEvents.unbind();
        remove$7(root.element);
      };
      var broadcastData = function (data) {
        var receivers = registry.filter(receive());
        each$1(receivers, function (receiver) {
          var descHandler = receiver.descHandler;
          var handler = getCurried(descHandler);
          handler(data);
        });
      };
      var broadcast$1 = function (message) {
        broadcastData({
          universal: true,
          data: message
        });
      };
      var broadcastOn = function (channels, message) {
        broadcastData({
          universal: false,
          channels: channels,
          data: message
        });
      };
      var broadcastEvent = function (eventName, event) {
        var listeners = registry.filter(eventName);
        return broadcast(listeners, event);
      };
      var getByUid = function (uid) {
        return registry.getById(uid).fold(function () {
          return Result.error(new Error('Could not find component with uid: "' + uid + '" in system.'));
        }, Result.value);
      };
      var getByDom = function (elem) {
        var uid = read$1(elem).getOr('not found');
        return getByUid(uid);
      };
      addToWorld(root);
      return {
        root: root,
        element: root.element,
        destroy: destroy,
        add: add,
        remove: remove,
        getByUid: getByUid,
        getByDom: getByDom,
        addToWorld: addToWorld,
        removeFromWorld: removeFromWorld,
        broadcast: broadcast$1,
        broadcastOn: broadcastOn,
        broadcastEvent: broadcastEvent
      };
    };

    var renderBar = function (spec, backstage) {
      return {
        dom: {
          tag: 'div',
          classes: [
            'tox-bar',
            'tox-form__controls-h-stack'
          ]
        },
        components: map$2(spec.items, backstage.interpreter)
      };
    };

    var schema$l = constant$1([
      defaulted('prefix', 'form-field'),
      field('fieldBehaviours', [
        Composing,
        Representing
      ])
    ]);
    var parts$e = constant$1([
      optional({
        schema: [required$1('dom')],
        name: 'label'
      }),
      optional({
        factory: {
          sketch: function (spec) {
            return {
              uid: spec.uid,
              dom: {
                tag: 'span',
                styles: { display: 'none' },
                attributes: { 'aria-hidden': 'true' },
                innerHtml: spec.text
              }
            };
          }
        },
        schema: [required$1('text')],
        name: 'aria-descriptor'
      }),
      required({
        factory: {
          sketch: function (spec) {
            var excludeFactory = exclude(spec, ['factory']);
            return spec.factory.sketch(excludeFactory);
          }
        },
        schema: [required$1('factory')],
        name: 'field'
      })
    ]);

    var factory$i = function (detail, components, _spec, _externals) {
      var behaviours = augment(detail.fieldBehaviours, [
        Composing.config({
          find: function (container) {
            return getPart(container, detail, 'field');
          }
        }),
        Representing.config({
          store: {
            mode: 'manual',
            getValue: function (field) {
              return Composing.getCurrent(field).bind(Representing.getValue);
            },
            setValue: function (field, value) {
              Composing.getCurrent(field).each(function (current) {
                Representing.setValue(current, value);
              });
            }
          }
        })
      ]);
      var events = derive$2([runOnAttached(function (component, _simulatedEvent) {
          var ps = getParts(component, detail, [
            'label',
            'field',
            'aria-descriptor'
          ]);
          ps.field().each(function (field) {
            var id = generate$6(detail.prefix);
            ps.label().each(function (label) {
              set$7(label.element, 'for', id);
              set$7(field.element, 'id', id);
            });
            ps['aria-descriptor']().each(function (descriptor) {
              var descriptorId = generate$6(detail.prefix);
              set$7(descriptor.element, 'id', descriptorId);
              set$7(field.element, 'aria-describedby', descriptorId);
            });
          });
        })]);
      var apis = {
        getField: function (container) {
          return getPart(container, detail, 'field');
        },
        getLabel: function (container) {
          return getPart(container, detail, 'label');
        }
      };
      return {
        uid: detail.uid,
        dom: detail.dom,
        components: components,
        behaviours: behaviours,
        events: events,
        apis: apis
      };
    };
    var FormField = composite({
      name: 'FormField',
      configFields: schema$l(),
      partFields: parts$e(),
      factory: factory$i,
      apis: {
        getField: function (apis, comp) {
          return apis.getField(comp);
        },
        getLabel: function (apis, comp) {
          return apis.getLabel(comp);
        }
      }
    });

    var exhibit$2 = function (base, tabConfig) {
      return nu$7({
        attributes: wrapAll([{
            key: tabConfig.tabAttr,
            value: 'true'
          }])
      });
    };

    var ActiveTabstopping = /*#__PURE__*/Object.freeze({
        __proto__: null,
        exhibit: exhibit$2
    });

    var TabstopSchema = [defaulted('tabAttr', 'data-alloy-tabstop')];

    var Tabstopping = create$7({
      fields: TabstopSchema,
      name: 'tabstopping',
      active: ActiveTabstopping
    });

    var global$8 = tinymce.util.Tools.resolve('tinymce.html.Entities');

    var renderFormFieldWith = function (pLabel, pField, extraClasses, extraBehaviours) {
      var spec = renderFormFieldSpecWith(pLabel, pField, extraClasses, extraBehaviours);
      return FormField.sketch(spec);
    };
    var renderFormField = function (pLabel, pField) {
      return renderFormFieldWith(pLabel, pField, [], []);
    };
    var renderFormFieldSpecWith = function (pLabel, pField, extraClasses, extraBehaviours) {
      return {
        dom: renderFormFieldDomWith(extraClasses),
        components: pLabel.toArray().concat([pField]),
        fieldBehaviours: derive$1(extraBehaviours)
      };
    };
    var renderFormFieldDom = function () {
      return renderFormFieldDomWith([]);
    };
    var renderFormFieldDomWith = function (extraClasses) {
      return {
        tag: 'div',
        classes: ['tox-form__group'].concat(extraClasses)
      };
    };
    var renderLabel$2 = function (label, providersBackstage) {
      return FormField.parts.label({
        dom: {
          tag: 'label',
          classes: ['tox-label'],
          innerHtml: providersBackstage.translate(label)
        }
      });
    };

    var formChangeEvent = generate$6('form-component-change');
    var formCloseEvent = generate$6('form-close');
    var formCancelEvent = generate$6('form-cancel');
    var formActionEvent = generate$6('form-action');
    var formSubmitEvent = generate$6('form-submit');
    var formBlockEvent = generate$6('form-block');
    var formUnblockEvent = generate$6('form-unblock');
    var formTabChangeEvent = generate$6('form-tabchange');
    var formResizeEvent = generate$6('form-resize');

    var renderCollection = function (spec, providersBackstage) {
      var _a;
      var pLabel = spec.label.map(function (label) {
        return renderLabel$2(label, providersBackstage);
      });
      var runOnItem = function (f) {
        return function (comp, se) {
          closest$1(se.event.target, '[data-collection-item-value]').each(function (target) {
            f(comp, se, target, get$c(target, 'data-collection-item-value'));
          });
        };
      };
      var setContents = function (comp, items) {
        var htmlLines = map$2(items, function (item) {
          var itemText = global$f.translate(item.text);
          var textContent = spec.columns === 1 ? '<div class="tox-collection__item-label">' + itemText + '</div>' : '';
          var iconContent = '<div class="tox-collection__item-icon">' + item.icon + '</div>';
          var mapItemName = {
            '_': ' ',
            ' - ': ' ',
            '-': ' '
          };
          var ariaLabel = itemText.replace(/\_| \- |\-/g, function (match) {
            return mapItemName[match];
          });
          var disabledClass = providersBackstage.isDisabled() ? ' tox-collection__item--state-disabled' : '';
          return '<div class="tox-collection__item' + disabledClass + '" tabindex="-1" data-collection-item-value="' + global$8.encodeAllRaw(item.value) + '" title="' + ariaLabel + '" aria-label="' + ariaLabel + '">' + iconContent + textContent + '</div>';
        });
        var chunks = spec.columns !== 'auto' && spec.columns > 1 ? chunk$1(htmlLines, spec.columns) : [htmlLines];
        var html = map$2(chunks, function (ch) {
          return '<div class="tox-collection__group">' + ch.join('') + '</div>';
        });
        set$8(comp.element, html.join(''));
      };
      var onClick = runOnItem(function (comp, se, tgt, itemValue) {
        se.stop();
        if (!providersBackstage.isDisabled()) {
          emitWith(comp, formActionEvent, {
            name: spec.name,
            value: itemValue
          });
        }
      });
      var collectionEvents = [
        run$1(mouseover(), runOnItem(function (comp, se, tgt) {
          focus$3(tgt);
        })),
        run$1(click(), onClick),
        run$1(tap(), onClick),
        run$1(focusin(), runOnItem(function (comp, se, tgt) {
          descendant(comp.element, '.' + activeClass).each(function (currentActive) {
            remove$3(currentActive, activeClass);
          });
          add$2(tgt, activeClass);
        })),
        run$1(focusout(), runOnItem(function (comp) {
          descendant(comp.element, '.' + activeClass).each(function (currentActive) {
            remove$3(currentActive, activeClass);
          });
        })),
        runOnExecute$1(runOnItem(function (comp, se, tgt, itemValue) {
          emitWith(comp, formActionEvent, {
            name: spec.name,
            value: itemValue
          });
        }))
      ];
      var iterCollectionItems = function (comp, applyAttributes) {
        return map$2(descendants(comp.element, '.tox-collection__item'), applyAttributes);
      };
      var pField = FormField.parts.field({
        dom: {
          tag: 'div',
          classes: ['tox-collection'].concat(spec.columns !== 1 ? ['tox-collection--grid'] : ['tox-collection--list'])
        },
        components: [],
        factory: { sketch: identity$1 },
        behaviours: derive$1([
          Disabling.config({
            disabled: providersBackstage.isDisabled,
            onDisabled: function (comp) {
              iterCollectionItems(comp, function (childElm) {
                add$2(childElm, 'tox-collection__item--state-disabled');
                set$7(childElm, 'aria-disabled', true);
              });
            },
            onEnabled: function (comp) {
              iterCollectionItems(comp, function (childElm) {
                remove$3(childElm, 'tox-collection__item--state-disabled');
                remove$6(childElm, 'aria-disabled');
              });
            }
          }),
          receivingConfig(),
          Replacing.config({}),
          Representing.config({
            store: {
              mode: 'memory',
              initialValue: []
            },
            onSetValue: function (comp, items) {
              setContents(comp, items);
              if (spec.columns === 'auto') {
                detectSize(comp, 5, 'tox-collection__item').each(function (_a) {
                  var numRows = _a.numRows, numColumns = _a.numColumns;
                  Keying.setGridSize(comp, numRows, numColumns);
                });
              }
              emit(comp, formResizeEvent);
            }
          }),
          Tabstopping.config({}),
          Keying.config(deriveCollectionMovement(spec.columns, 'normal')),
          config('collection-events', collectionEvents)
        ]),
        eventOrder: (_a = {}, _a[execute$5()] = [
          'disabling',
          'alloy.base.behaviour',
          'collection-events'
        ], _a)
      });
      var extraClasses = ['tox-form__group--collection'];
      return renderFormFieldWith(pLabel, pField, extraClasses, []);
    };

    var schema$k = constant$1([
      option('data'),
      defaulted('inputAttributes', {}),
      defaulted('inputStyles', {}),
      defaulted('tag', 'input'),
      defaulted('inputClasses', []),
      onHandler('onSetValue'),
      defaulted('styles', {}),
      defaulted('eventOrder', {}),
      field('inputBehaviours', [
        Representing,
        Focusing
      ]),
      defaulted('selectOnFocus', true)
    ]);
    var focusBehaviours = function (detail) {
      return derive$1([Focusing.config({
          onFocus: !detail.selectOnFocus ? noop : function (component) {
            var input = component.element;
            var value = get$9(input);
            input.dom.setSelectionRange(0, value.length);
          }
        })]);
    };
    var behaviours = function (detail) {
      return __assign(__assign({}, focusBehaviours(detail)), augment(detail.inputBehaviours, [Representing.config({
          store: __assign(__assign({ mode: 'manual' }, detail.data.map(function (data) {
            return { initialValue: data };
          }).getOr({})), {
            getValue: function (input) {
              return get$9(input.element);
            },
            setValue: function (input, data) {
              var current = get$9(input.element);
              if (current !== data) {
                set$5(input.element, data);
              }
            }
          }),
          onSetValue: detail.onSetValue
        })]));
    };
    var dom = function (detail) {
      return {
        tag: detail.tag,
        attributes: __assign({ type: 'text' }, detail.inputAttributes),
        styles: detail.inputStyles,
        classes: detail.inputClasses
      };
    };

    var factory$h = function (detail, _spec) {
      return {
        uid: detail.uid,
        dom: dom(detail),
        components: [],
        behaviours: behaviours(detail),
        eventOrder: detail.eventOrder
      };
    };
    var Input = single({
      name: 'Input',
      configFields: schema$k(),
      factory: factory$h
    });

    var exports$1 = {}, module = { exports: exports$1 };
    (function (define, exports, module, require) {
      (function (f) {
        if (typeof exports === 'object' && typeof module !== 'undefined') {
          module.exports = f();
        } else if (typeof define === 'function' && define.amd) {
          define([], f);
        } else {
          var g;
          if (typeof window !== 'undefined') {
            g = window;
          } else if (typeof global !== 'undefined') {
            g = global;
          } else if (typeof self !== 'undefined') {
            g = self;
          } else {
            g = this;
          }
          g.EphoxContactWrapper = f();
        }
      }(function () {
        return function () {
          function r(e, n, t) {
            function o(i, f) {
              if (!n[i]) {
                if (!e[i]) {
                  var c = 'function' == typeof require && require;
                  if (!f && c)
                    return c(i, !0);
                  if (u)
                    return u(i, !0);
                  var a = new Error('Cannot find module \'' + i + '\'');
                  throw a.code = 'MODULE_NOT_FOUND', a;
                }
                var p = n[i] = { exports: {} };
                e[i][0].call(p.exports, function (r) {
                  var n = e[i][1][r];
                  return o(n || r);
                }, p, p.exports, r, e, n, t);
              }
              return n[i].exports;
            }
            for (var u = 'function' == typeof require && require, i = 0; i < t.length; i++)
              o(t[i]);
            return o;
          }
          return r;
        }()({
          1: [
            function (require, module, exports) {
              var process = module.exports = {};
              var cachedSetTimeout;
              var cachedClearTimeout;
              function defaultSetTimout() {
                throw new Error('setTimeout has not been defined');
              }
              function defaultClearTimeout() {
                throw new Error('clearTimeout has not been defined');
              }
              (function () {
                try {
                  if (typeof setTimeout === 'function') {
                    cachedSetTimeout = setTimeout;
                  } else {
                    cachedSetTimeout = defaultSetTimout;
                  }
                } catch (e) {
                  cachedSetTimeout = defaultSetTimout;
                }
                try {
                  if (typeof clearTimeout === 'function') {
                    cachedClearTimeout = clearTimeout;
                  } else {
                    cachedClearTimeout = defaultClearTimeout;
                  }
                } catch (e) {
                  cachedClearTimeout = defaultClearTimeout;
                }
              }());
              function runTimeout(fun) {
                if (cachedSetTimeout === setTimeout) {
                  return setTimeout(fun, 0);
                }
                if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                  cachedSetTimeout = setTimeout;
                  return setTimeout(fun, 0);
                }
                try {
                  return cachedSetTimeout(fun, 0);
                } catch (e) {
                  try {
                    return cachedSetTimeout.call(null, fun, 0);
                  } catch (e) {
                    return cachedSetTimeout.call(this, fun, 0);
                  }
                }
              }
              function runClearTimeout(marker) {
                if (cachedClearTimeout === clearTimeout) {
                  return clearTimeout(marker);
                }
                if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                  cachedClearTimeout = clearTimeout;
                  return clearTimeout(marker);
                }
                try {
                  return cachedClearTimeout(marker);
                } catch (e) {
                  try {
                    return cachedClearTimeout.call(null, marker);
                  } catch (e) {
                    return cachedClearTimeout.call(this, marker);
                  }
                }
              }
              var queue = [];
              var draining = false;
              var currentQueue;
              var queueIndex = -1;
              function cleanUpNextTick() {
                if (!draining || !currentQueue) {
                  return;
                }
                draining = false;
                if (currentQueue.length) {
                  queue = currentQueue.concat(queue);
                } else {
                  queueIndex = -1;
                }
                if (queue.length) {
                  drainQueue();
                }
              }
              function drainQueue() {
                if (draining) {
                  return;
                }
                var timeout = runTimeout(cleanUpNextTick);
                draining = true;
                var len = queue.length;
                while (len) {
                  currentQueue = queue;
                  queue = [];
                  while (++queueIndex < len) {
                    if (currentQueue) {
                      currentQueue[queueIndex].run();
                    }
                  }
                  queueIndex = -1;
                  len = queue.length;
                }
                currentQueue = null;
                draining = false;
                runClearTimeout(timeout);
              }
              process.nextTick = function (fun) {
                var args = new Array(arguments.length - 1);
                if (arguments.length > 1) {
                  for (var i = 1; i < arguments.length; i++) {
                    args[i - 1] = arguments[i];
                  }
                }
                queue.push(new Item(fun, args));
                if (queue.length === 1 && !draining) {
                  runTimeout(drainQueue);
                }
              };
              function Item(fun, array) {
                this.fun = fun;
                this.array = array;
              }
              Item.prototype.run = function () {
                this.fun.apply(null, this.array);
              };
              process.title = 'browser';
              process.browser = true;
              process.env = {};
              process.argv = [];
              process.version = '';
              process.versions = {};
              function noop() {
              }
              process.on = noop;
              process.addListener = noop;
              process.once = noop;
              process.off = noop;
              process.removeListener = noop;
              process.removeAllListeners = noop;
              process.emit = noop;
              process.prependListener = noop;
              process.prependOnceListener = noop;
              process.listeners = function (name) {
                return [];
              };
              process.binding = function (name) {
                throw new Error('process.binding is not supported');
              };
              process.cwd = function () {
                return '/';
              };
              process.chdir = function (dir) {
                throw new Error('process.chdir is not supported');
              };
              process.umask = function () {
                return 0;
              };
            },
            {}
          ],
          2: [
            function (require, module, exports) {
              (function (setImmediate) {
                (function (root) {
                  var setTimeoutFunc = setTimeout;
                  function noop() {
                  }
                  function bind(fn, thisArg) {
                    return function () {
                      fn.apply(thisArg, arguments);
                    };
                  }
                  function Promise(fn) {
                    if (typeof this !== 'object')
                      throw new TypeError('Promises must be constructed via new');
                    if (typeof fn !== 'function')
                      throw new TypeError('not a function');
                    this._state = 0;
                    this._handled = false;
                    this._value = undefined;
                    this._deferreds = [];
                    doResolve(fn, this);
                  }
                  function handle(self, deferred) {
                    while (self._state === 3) {
                      self = self._value;
                    }
                    if (self._state === 0) {
                      self._deferreds.push(deferred);
                      return;
                    }
                    self._handled = true;
                    Promise._immediateFn(function () {
                      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
                      if (cb === null) {
                        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
                        return;
                      }
                      var ret;
                      try {
                        ret = cb(self._value);
                      } catch (e) {
                        reject(deferred.promise, e);
                        return;
                      }
                      resolve(deferred.promise, ret);
                    });
                  }
                  function resolve(self, newValue) {
                    try {
                      if (newValue === self)
                        throw new TypeError('A promise cannot be resolved with itself.');
                      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
                        var then = newValue.then;
                        if (newValue instanceof Promise) {
                          self._state = 3;
                          self._value = newValue;
                          finale(self);
                          return;
                        } else if (typeof then === 'function') {
                          doResolve(bind(then, newValue), self);
                          return;
                        }
                      }
                      self._state = 1;
                      self._value = newValue;
                      finale(self);
                    } catch (e) {
                      reject(self, e);
                    }
                  }
                  function reject(self, newValue) {
                    self._state = 2;
                    self._value = newValue;
                    finale(self);
                  }
                  function finale(self) {
                    if (self._state === 2 && self._deferreds.length === 0) {
                      Promise._immediateFn(function () {
                        if (!self._handled) {
                          Promise._unhandledRejectionFn(self._value);
                        }
                      });
                    }
                    for (var i = 0, len = self._deferreds.length; i < len; i++) {
                      handle(self, self._deferreds[i]);
                    }
                    self._deferreds = null;
                  }
                  function Handler(onFulfilled, onRejected, promise) {
                    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
                    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
                    this.promise = promise;
                  }
                  function doResolve(fn, self) {
                    var done = false;
                    try {
                      fn(function (value) {
                        if (done)
                          return;
                        done = true;
                        resolve(self, value);
                      }, function (reason) {
                        if (done)
                          return;
                        done = true;
                        reject(self, reason);
                      });
                    } catch (ex) {
                      if (done)
                        return;
                      done = true;
                      reject(self, ex);
                    }
                  }
                  Promise.prototype['catch'] = function (onRejected) {
                    return this.then(null, onRejected);
                  };
                  Promise.prototype.then = function (onFulfilled, onRejected) {
                    var prom = new this.constructor(noop);
                    handle(this, new Handler(onFulfilled, onRejected, prom));
                    return prom;
                  };
                  Promise.all = function (arr) {
                    var args = Array.prototype.slice.call(arr);
                    return new Promise(function (resolve, reject) {
                      if (args.length === 0)
                        return resolve([]);
                      var remaining = args.length;
                      function res(i, val) {
                        try {
                          if (val && (typeof val === 'object' || typeof val === 'function')) {
                            var then = val.then;
                            if (typeof then === 'function') {
                              then.call(val, function (val) {
                                res(i, val);
                              }, reject);
                              return;
                            }
                          }
                          args[i] = val;
                          if (--remaining === 0) {
                            resolve(args);
                          }
                        } catch (ex) {
                          reject(ex);
                        }
                      }
                      for (var i = 0; i < args.length; i++) {
                        res(i, args[i]);
                      }
                    });
                  };
                  Promise.resolve = function (value) {
                    if (value && typeof value === 'object' && value.constructor === Promise) {
                      return value;
                    }
                    return new Promise(function (resolve) {
                      resolve(value);
                    });
                  };
                  Promise.reject = function (value) {
                    return new Promise(function (resolve, reject) {
                      reject(value);
                    });
                  };
                  Promise.race = function (values) {
                    return new Promise(function (resolve, reject) {
                      for (var i = 0, len = values.length; i < len; i++) {
                        values[i].then(resolve, reject);
                      }
                    });
                  };
                  Promise._immediateFn = typeof setImmediate === 'function' ? function (fn) {
                    setImmediate(fn);
                  } : function (fn) {
                    setTimeoutFunc(fn, 0);
                  };
                  Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
                    if (typeof console !== 'undefined' && console) {
                      console.warn('Possible Unhandled Promise Rejection:', err);
                    }
                  };
                  Promise._setImmediateFn = function _setImmediateFn(fn) {
                    Promise._immediateFn = fn;
                  };
                  Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
                    Promise._unhandledRejectionFn = fn;
                  };
                  if (typeof module !== 'undefined' && module.exports) {
                    module.exports = Promise;
                  } else if (!root.Promise) {
                    root.Promise = Promise;
                  }
                }(this));
              }.call(this, require('timers').setImmediate));
            },
            { 'timers': 3 }
          ],
          3: [
            function (require, module, exports) {
              (function (setImmediate, clearImmediate) {
                var nextTick = require('process/browser.js').nextTick;
                var apply = Function.prototype.apply;
                var slice = Array.prototype.slice;
                var immediateIds = {};
                var nextImmediateId = 0;
                exports.setTimeout = function () {
                  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
                };
                exports.setInterval = function () {
                  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
                };
                exports.clearTimeout = exports.clearInterval = function (timeout) {
                  timeout.close();
                };
                function Timeout(id, clearFn) {
                  this._id = id;
                  this._clearFn = clearFn;
                }
                Timeout.prototype.unref = Timeout.prototype.ref = function () {
                };
                Timeout.prototype.close = function () {
                  this._clearFn.call(window, this._id);
                };
                exports.enroll = function (item, msecs) {
                  clearTimeout(item._idleTimeoutId);
                  item._idleTimeout = msecs;
                };
                exports.unenroll = function (item) {
                  clearTimeout(item._idleTimeoutId);
                  item._idleTimeout = -1;
                };
                exports._unrefActive = exports.active = function (item) {
                  clearTimeout(item._idleTimeoutId);
                  var msecs = item._idleTimeout;
                  if (msecs >= 0) {
                    item._idleTimeoutId = setTimeout(function onTimeout() {
                      if (item._onTimeout)
                        item._onTimeout();
                    }, msecs);
                  }
                };
                exports.setImmediate = typeof setImmediate === 'function' ? setImmediate : function (fn) {
                  var id = nextImmediateId++;
                  var args = arguments.length < 2 ? false : slice.call(arguments, 1);
                  immediateIds[id] = true;
                  nextTick(function onNextTick() {
                    if (immediateIds[id]) {
                      if (args) {
                        fn.apply(null, args);
                      } else {
                        fn.call(null);
                      }
                      exports.clearImmediate(id);
                    }
                  });
                  return id;
                };
                exports.clearImmediate = typeof clearImmediate === 'function' ? clearImmediate : function (id) {
                  delete immediateIds[id];
                };
              }.call(this, require('timers').setImmediate, require('timers').clearImmediate));
            },
            {
              'process/browser.js': 1,
              'timers': 3
            }
          ],
          4: [
            function (require, module, exports) {
              var promisePolyfill = require('promise-polyfill');
              var Global = function () {
                if (typeof window !== 'undefined') {
                  return window;
                } else {
                  return Function('return this;')();
                }
              }();
              module.exports = { boltExport: Global.Promise || promisePolyfill };
            },
            { 'promise-polyfill': 2 }
          ]
        }, {}, [4])(4);
      }));
    }(undefined, exports$1, module, undefined));
    var Promise$2 = module.exports.boltExport;

    var nu$3 = function (baseFn) {
      var data = Optional.none();
      var callbacks = [];
      var map = function (f) {
        return nu$3(function (nCallback) {
          get(function (data) {
            nCallback(f(data));
          });
        });
      };
      var get = function (nCallback) {
        if (isReady()) {
          call(nCallback);
        } else {
          callbacks.push(nCallback);
        }
      };
      var set = function (x) {
        if (!isReady()) {
          data = Optional.some(x);
          run(callbacks);
          callbacks = [];
        }
      };
      var isReady = function () {
        return data.isSome();
      };
      var run = function (cbs) {
        each$1(cbs, call);
      };
      var call = function (cb) {
        data.each(function (x) {
          setTimeout(function () {
            cb(x);
          }, 0);
        });
      };
      baseFn(set);
      return {
        get: get,
        map: map,
        isReady: isReady
      };
    };
    var pure$1 = function (a) {
      return nu$3(function (callback) {
        callback(a);
      });
    };
    var LazyValue = {
      nu: nu$3,
      pure: pure$1
    };

    var errorReporter = function (err) {
      setTimeout(function () {
        throw err;
      }, 0);
    };
    var make$5 = function (run) {
      var get = function (callback) {
        run().then(callback, errorReporter);
      };
      var map = function (fab) {
        return make$5(function () {
          return run().then(fab);
        });
      };
      var bind = function (aFutureB) {
        return make$5(function () {
          return run().then(function (v) {
            return aFutureB(v).toPromise();
          });
        });
      };
      var anonBind = function (futureB) {
        return make$5(function () {
          return run().then(function () {
            return futureB.toPromise();
          });
        });
      };
      var toLazy = function () {
        return LazyValue.nu(get);
      };
      var toCached = function () {
        var cache = null;
        return make$5(function () {
          if (cache === null) {
            cache = run();
          }
          return cache;
        });
      };
      var toPromise = run;
      return {
        map: map,
        bind: bind,
        anonBind: anonBind,
        toLazy: toLazy,
        toCached: toCached,
        toPromise: toPromise,
        get: get
      };
    };
    var nu$2 = function (baseFn) {
      return make$5(function () {
        return new Promise$2(baseFn);
      });
    };
    var pure = function (a) {
      return make$5(function () {
        return Promise$2.resolve(a);
      });
    };
    var Future = {
      nu: nu$2,
      pure: pure
    };

    var ariaElements = [
      'input',
      'textarea'
    ];
    var isAriaElement = function (elem) {
      var name = name$2(elem);
      return contains$2(ariaElements, name);
    };
    var markValid = function (component, invalidConfig) {
      var elem = invalidConfig.getRoot(component).getOr(component.element);
      remove$3(elem, invalidConfig.invalidClass);
      invalidConfig.notify.each(function (notifyInfo) {
        if (isAriaElement(component.element)) {
          set$7(component.element, 'aria-invalid', false);
        }
        notifyInfo.getContainer(component).each(function (container) {
          set$8(container, notifyInfo.validHtml);
        });
        notifyInfo.onValid(component);
      });
    };
    var markInvalid = function (component, invalidConfig, invalidState, text) {
      var elem = invalidConfig.getRoot(component).getOr(component.element);
      add$2(elem, invalidConfig.invalidClass);
      invalidConfig.notify.each(function (notifyInfo) {
        if (isAriaElement(component.element)) {
          set$7(component.element, 'aria-invalid', true);
        }
        notifyInfo.getContainer(component).each(function (container) {
          set$8(container, text);
        });
        notifyInfo.onInvalid(component, text);
      });
    };
    var query = function (component, invalidConfig, _invalidState) {
      return invalidConfig.validator.fold(function () {
        return Future.pure(Result.value(true));
      }, function (validatorInfo) {
        return validatorInfo.validate(component);
      });
    };
    var run = function (component, invalidConfig, invalidState) {
      invalidConfig.notify.each(function (notifyInfo) {
        notifyInfo.onValidate(component);
      });
      return query(component, invalidConfig).map(function (valid) {
        if (component.getSystem().isConnected()) {
          return valid.fold(function (err) {
            markInvalid(component, invalidConfig, invalidState, err);
            return Result.error(err);
          }, function (v) {
            markValid(component, invalidConfig);
            return Result.value(v);
          });
        } else {
          return Result.error('No longer in system');
        }
      });
    };
    var isInvalid = function (component, invalidConfig) {
      var elem = invalidConfig.getRoot(component).getOr(component.element);
      return has(elem, invalidConfig.invalidClass);
    };

    var InvalidateApis = /*#__PURE__*/Object.freeze({
        __proto__: null,
        markValid: markValid,
        markInvalid: markInvalid,
        query: query,
        run: run,
        isInvalid: isInvalid
    });

    var events$8 = function (invalidConfig, invalidState) {
      return invalidConfig.validator.map(function (validatorInfo) {
        return derive$2([run$1(validatorInfo.onEvent, function (component) {
            run(component, invalidConfig, invalidState).get(identity$1);
          })].concat(validatorInfo.validateOnLoad ? [runOnAttached(function (component) {
            run(component, invalidConfig, invalidState).get(noop);
          })] : []));
      }).getOr({});
    };

    var ActiveInvalidate = /*#__PURE__*/Object.freeze({
        __proto__: null,
        events: events$8
    });

    var InvalidateSchema = [
      required$1('invalidClass'),
      defaulted('getRoot', Optional.none),
      optionObjOf('notify', [
        defaulted('aria', 'alert'),
        defaulted('getContainer', Optional.none),
        defaulted('validHtml', ''),
        onHandler('onValid'),
        onHandler('onInvalid'),
        onHandler('onValidate')
      ]),
      optionObjOf('validator', [
        required$1('validate'),
        defaulted('onEvent', 'input'),
        defaulted('validateOnLoad', true)
      ])
    ];

    var Invalidating = create$7({
      fields: InvalidateSchema,
      name: 'invalidating',
      active: ActiveInvalidate,
      apis: InvalidateApis,
      extra: {
        validation: function (validator) {
          return function (component) {
            var v = Representing.getValue(component);
            return Future.pure(validator(v));
          };
        }
      }
    });

    var getCoupled = function (component, coupleConfig, coupleState, name) {
      return coupleState.getOrCreate(component, coupleConfig, name);
    };

    var CouplingApis = /*#__PURE__*/Object.freeze({
        __proto__: null,
        getCoupled: getCoupled
    });

    var CouplingSchema = [requiredOf('others', setOf(Result.value, anyValue()))];

    var init$a = function () {
      var coupled = {};
      var getOrCreate = function (component, coupleConfig, name) {
        var available = keys(coupleConfig.others);
        if (!available) {
          throw new Error('Cannot find coupled component: ' + name + '. Known coupled components: ' + JSON.stringify(available, null, 2));
        } else {
          return get$e(coupled, name).getOrThunk(function () {
            var builder = get$e(coupleConfig.others, name).getOrDie('No information found for coupled component: ' + name);
            var spec = builder(component);
            var built = component.getSystem().build(spec);
            coupled[name] = built;
            return built;
          });
        }
      };
      var readState = constant$1({});
      return nu$8({
        readState: readState,
        getOrCreate: getOrCreate
      });
    };

    var CouplingState = /*#__PURE__*/Object.freeze({
        __proto__: null,
        init: init$a
    });

    var Coupling = create$7({
      fields: CouplingSchema,
      name: 'coupling',
      apis: CouplingApis,
      state: CouplingState
    });

    var suffix = constant$1('sink');
    var partType$1 = constant$1(optional({
      name: suffix(),
      overrides: constant$1({
        dom: { tag: 'div' },
        behaviours: derive$1([Positioning.config({ useFixed: always })]),
        events: derive$2([
          cutter(keydown()),
          cutter(mousedown()),
          cutter(click())
        ])
      })
    }));

    var HighlightOnOpen;
    (function (HighlightOnOpen) {
      HighlightOnOpen[HighlightOnOpen['HighlightFirst'] = 0] = 'HighlightFirst';
      HighlightOnOpen[HighlightOnOpen['HighlightNone'] = 1] = 'HighlightNone';
    }(HighlightOnOpen || (HighlightOnOpen = {})));
    var getAnchor = function (detail, component) {
      var hotspot = detail.getHotspot(component).getOr(component);
      var type = 'hotspot';
      var overrides = detail.getAnchorOverrides();
      return detail.layouts.fold(function () {
        return {
          type: type,
          hotspot: hotspot,
          overrides: overrides
        };
      }, function (layouts) {
        return {
          type: type,
          hotspot: hotspot,
          overrides: overrides,
          layouts: layouts
        };
      });
    };
    var fetch = function (detail, mapFetch, component) {
      var fetcher = detail.fetch;
      return fetcher(component).map(mapFetch);
    };
    var openF = function (detail, mapFetch, anchor, component, sandbox, externals, highlightOnOpen) {
      var futureData = fetch(detail, mapFetch, component);
      var getLazySink = getSink(component, detail);
      return futureData.map(function (tdata) {
        return tdata.bind(function (data) {
          return Optional.from(tieredMenu.sketch(__assign(__assign({}, externals.menu()), {
            uid: generate$5(''),
            data: data,
            highlightImmediately: highlightOnOpen === HighlightOnOpen.HighlightFirst,
            onOpenMenu: function (tmenu, menu) {
              var sink = getLazySink().getOrDie();
              Positioning.position(sink, menu, { anchor: anchor });
              Sandboxing.decloak(sandbox);
            },
            onOpenSubmenu: function (tmenu, item, submenu) {
              var sink = getLazySink().getOrDie();
              Positioning.position(sink, submenu, {
                anchor: {
                  type: 'submenu',
                  item: item
                }
              });
              Sandboxing.decloak(sandbox);
            },
            onRepositionMenu: function (tmenu, primaryMenu, submenuTriggers) {
              var sink = getLazySink().getOrDie();
              Positioning.position(sink, primaryMenu, { anchor: anchor });
              each$1(submenuTriggers, function (st) {
                Positioning.position(sink, st.triggeredMenu, {
                  anchor: {
                    type: 'submenu',
                    item: st.triggeringItem
                  }
                });
              });
            },
            onEscape: function () {
              Focusing.focus(component);
              Sandboxing.close(sandbox);
              return Optional.some(true);
            }
          })));
        });
      });
    };
    var open = function (detail, mapFetch, hotspot, sandbox, externals, onOpenSync, highlightOnOpen) {
      var anchor = getAnchor(detail, hotspot);
      var processed = openF(detail, mapFetch, anchor, hotspot, sandbox, externals, highlightOnOpen);
      return processed.map(function (tdata) {
        tdata.fold(function () {
          if (Sandboxing.isOpen(sandbox)) {
            Sandboxing.close(sandbox);
          }
        }, function (data) {
          Sandboxing.cloak(sandbox);
          Sandboxing.open(sandbox, data);
          onOpenSync(sandbox);
        });
        return sandbox;
      });
    };
    var close = function (detail, mapFetch, component, sandbox, _externals, _onOpenSync, _highlightOnOpen) {
      Sandboxing.close(sandbox);
      return Future.pure(sandbox);
    };
    var togglePopup = function (detail, mapFetch, hotspot, externals, onOpenSync, highlightOnOpen) {
      var sandbox = Coupling.getCoupled(hotspot, 'sandbox');
      var showing = Sandboxing.isOpen(sandbox);
      var action = showing ? close : open;
      return action(detail, mapFetch, hotspot, sandbox, externals, onOpenSync, highlightOnOpen);
    };
    var matchWidth = function (hotspot, container, useMinWidth) {
      var menu = Composing.getCurrent(container).getOr(container);
      var buttonWidth = get$7(hotspot.element);
      if (useMinWidth) {
        set$6(menu.element, 'min-width', buttonWidth + 'px');
      } else {
        set$4(menu.element, buttonWidth);
      }
    };
    var getSink = function (anyInSystem, sinkDetail) {
      return anyInSystem.getSystem().getByUid(sinkDetail.uid + '-' + suffix()).map(function (internalSink) {
        return function () {
          return Result.value(internalSink);
        };
      }).getOrThunk(function () {
        return sinkDetail.lazySink.fold(function () {
          return function () {
            return Result.error(new Error('No internal sink is specified, nor could an external sink be found'));
          };
        }, function (lazySinkFn) {
          return function () {
            return lazySinkFn(anyInSystem);
          };
        });
      });
    };
    var doRepositionMenus = function (sandbox) {
      Sandboxing.getState(sandbox).each(function (tmenu) {
        tieredMenu.repositionMenus(tmenu);
      });
    };
    var makeSandbox$1 = function (detail, hotspot, extras) {
      var ariaOwner = manager();
      var onOpen = function (component, menu) {
        var anchor = getAnchor(detail, hotspot);
        ariaOwner.link(hotspot.element);
        if (detail.matchWidth) {
          matchWidth(anchor.hotspot, menu, detail.useMinWidth);
        }
        detail.onOpen(anchor, component, menu);
        if (extras !== undefined && extras.onOpen !== undefined) {
          extras.onOpen(component, menu);
        }
      };
      var onClose = function (component, menu) {
        ariaOwner.unlink(hotspot.element);
        if (extras !== undefined && extras.onClose !== undefined) {
          extras.onClose(component, menu);
        }
      };
      var lazySink = getSink(hotspot, detail);
      return {
        dom: {
          tag: 'div',
          classes: detail.sandboxClasses,
          attributes: {
            id: ariaOwner.id,
            role: 'listbox'
          }
        },
        behaviours: SketchBehaviours.augment(detail.sandboxBehaviours, [
          Representing.config({
            store: {
              mode: 'memory',
              initialValue: hotspot
            }
          }),
          Sandboxing.config({
            onOpen: onOpen,
            onClose: onClose,
            isPartOf: function (container, data, queryElem) {
              return isPartOf$1(data, queryElem) || isPartOf$1(hotspot, queryElem);
            },
            getAttachPoint: function () {
              return lazySink().getOrDie();
            }
          }),
          Composing.config({
            find: function (sandbox) {
              return Sandboxing.getState(sandbox).bind(function (menu) {
                return Composing.getCurrent(menu);
              });
            }
          }),
          Receiving.config({ channels: __assign(__assign({}, receivingChannel$1({ isExtraPart: never })), receivingChannel({ doReposition: doRepositionMenus })) })
        ])
      };
    };
    var repositionMenus = function (comp) {
      var sandbox = Coupling.getCoupled(comp, 'sandbox');
      doRepositionMenus(sandbox);
    };

    var sandboxFields = function () {
      return [
        defaulted('sandboxClasses', []),
        SketchBehaviours.field('sandboxBehaviours', [
          Composing,
          Receiving,
          Sandboxing,
          Representing
        ])
      ];
    };

    var schema$j = constant$1([
      required$1('dom'),
      required$1('fetch'),
      onHandler('onOpen'),
      onKeyboardHandler('onExecute'),
      defaulted('getHotspot', Optional.some),
      defaulted('getAnchorOverrides', constant$1({})),
      schema$y(),
      field('dropdownBehaviours', [
        Toggling,
        Coupling,
        Keying,
        Focusing
      ]),
      required$1('toggleClass'),
      defaulted('eventOrder', {}),
      option('lazySink'),
      defaulted('matchWidth', false),
      defaulted('useMinWidth', false),
      option('role')
    ].concat(sandboxFields()));
    var parts$d = constant$1([
      external$1({
        schema: [tieredMenuMarkers()],
        name: 'menu',
        defaults: function (detail) {
          return { onExecute: detail.onExecute };
        }
      }),
      partType$1()
    ]);

    var factory$g = function (detail, components, _spec, externals) {
      var _a;
      var lookupAttr = function (attr) {
        return get$e(detail.dom, 'attributes').bind(function (attrs) {
          return get$e(attrs, attr);
        });
      };
      var switchToMenu = function (sandbox) {
        Sandboxing.getState(sandbox).each(function (tmenu) {
          tieredMenu.highlightPrimary(tmenu);
        });
      };
      var action = function (component) {
        var onOpenSync = switchToMenu;
        togglePopup(detail, identity$1, component, externals, onOpenSync, HighlightOnOpen.HighlightFirst).get(noop);
      };
      var apis = {
        expand: function (comp) {
          if (!Toggling.isOn(comp)) {
            togglePopup(detail, identity$1, comp, externals, noop, HighlightOnOpen.HighlightNone).get(noop);
          }
        },
        open: function (comp) {
          if (!Toggling.isOn(comp)) {
            togglePopup(detail, identity$1, comp, externals, noop, HighlightOnOpen.HighlightFirst).get(noop);
          }
        },
        isOpen: Toggling.isOn,
        close: function (comp) {
          if (Toggling.isOn(comp)) {
            togglePopup(detail, identity$1, comp, externals, noop, HighlightOnOpen.HighlightFirst).get(noop);
          }
        },
        repositionMenus: function (comp) {
          if (Toggling.isOn(comp)) {
            repositionMenus(comp);
          }
        }
      };
      var triggerExecute = function (comp, _se) {
        emitExecute(comp);
        return Optional.some(true);
      };
      return {
        uid: detail.uid,
        dom: detail.dom,
        components: components,
        behaviours: augment(detail.dropdownBehaviours, [
          Toggling.config({
            toggleClass: detail.toggleClass,
            aria: { mode: 'expanded' }
          }),
          Coupling.config({
            others: {
              sandbox: function (hotspot) {
                return makeSandbox$1(detail, hotspot, {
                  onOpen: function () {
                    return Toggling.on(hotspot);
                  },
                  onClose: function () {
                    return Toggling.off(hotspot);
                  }
                });
              }
            }
          }),
          Keying.config({
            mode: 'special',
            onSpace: triggerExecute,
            onEnter: triggerExecute,
            onDown: function (comp, _se) {
              if (Dropdown.isOpen(comp)) {
                var sandbox = Coupling.getCoupled(comp, 'sandbox');
                switchToMenu(sandbox);
              } else {
                Dropdown.open(comp);
              }
              return Optional.some(true);
            },
            onEscape: function (comp, _se) {
              if (Dropdown.isOpen(comp)) {
                Dropdown.close(comp);
                return Optional.some(true);
              } else {
                return Optional.none();
              }
            }
          }),
          Focusing.config({})
        ]),
        events: events$a(Optional.some(action)),
        eventOrder: __assign(__assign({}, detail.eventOrder), (_a = {}, _a[execute$5()] = [
          'disabling',
          'toggling',
          'alloy.base.behaviour'
        ], _a)),
        apis: apis,
        domModification: {
          attributes: __assign(__assign({ 'aria-haspopup': 'true' }, detail.role.fold(function () {
            return {};
          }, function (role) {
            return { role: role };
          })), detail.dom.tag === 'button' ? { type: lookupAttr('type').getOr('button') } : {})
        }
      };
    };
    var Dropdown = composite({
      name: 'Dropdown',
      configFields: schema$j(),
      partFields: parts$d(),
      factory: factory$g,
      apis: {
        open: function (apis, comp) {
          return apis.open(comp);
        },
        expand: function (apis, comp) {
          return apis.expand(comp);
        },
        close: function (apis, comp) {
          return apis.close(comp);
        },
        isOpen: function (apis, comp) {
          return apis.isOpen(comp);
        },
        repositionMenus: function (apis, comp) {
          return apis.repositionMenus(comp);
        }
      }
    });

    var exhibit$1 = function () {
      return nu$7({
        styles: {
          '-webkit-user-select': 'none',
          'user-select': 'none',
          '-ms-user-select': 'none',
          '-moz-user-select': '-moz-none'
        },
        attributes: { unselectable: 'on' }
      });
    };
    var events$7 = function () {
      return derive$2([abort(selectstart(), always)]);
    };

    var ActiveUnselecting = /*#__PURE__*/Object.freeze({
        __proto__: null,
        events: events$7,
        exhibit: exhibit$1
    });

    var Unselecting = create$7({
      fields: [],
      name: 'unselecting',
      active: ActiveUnselecting
    });

    var renderPanelButton = function (spec, sharedBackstage) {
      return Dropdown.sketch({
        dom: spec.dom,
        components: spec.components,
        toggleClass: 'mce-active',
        dropdownBehaviours: derive$1([
          DisablingConfigs.button(sharedBackstage.providers.isDisabled),
          receivingConfig(),
          Unselecting.config({}),
          Tabstopping.config({})
        ]),
        layouts: spec.layouts,
        sandboxClasses: ['tox-dialog__popups'],
        lazySink: sharedBackstage.getSink,
        fetch: function (comp) {
          return Future.nu(function (callback) {
            return spec.fetch(callback);
          }).map(function (items) {
            return Optional.from(createTieredDataFrom(deepMerge(createPartialChoiceMenu(generate$6('menu-value'), items, function (value) {
              spec.onItemAction(comp, value);
            }, spec.columns, spec.presets, ItemResponse$1.CLOSE_ON_EXECUTE, never, sharedBackstage.providers), { movement: deriveMenuMovement(spec.columns, spec.presets) })));
          });
        },
        parts: { menu: part(false, 1, spec.presets) }
      });
    };

    var colorInputChangeEvent = generate$6('color-input-change');
    var colorSwatchChangeEvent = generate$6('color-swatch-change');
    var colorPickerCancelEvent = generate$6('color-picker-cancel');
    var renderColorInput = function (spec, sharedBackstage, colorInputBackstage) {
      var pField = FormField.parts.field({
        factory: Input,
        inputClasses: ['tox-textfield'],
        onSetValue: function (c) {
          return Invalidating.run(c).get(noop);
        },
        inputBehaviours: derive$1([
          Disabling.config({ disabled: sharedBackstage.providers.isDisabled }),
          receivingConfig(),
          Tabstopping.config({}),
          Invalidating.config({
            invalidClass: 'tox-textbox-field-invalid',
            getRoot: function (comp) {
              return parent(comp.element);
            },
            notify: {
              onValid: function (comp) {
                var val = Representing.getValue(comp);
                emitWith(comp, colorInputChangeEvent, { color: val });
              }
            },
            validator: {
              validateOnLoad: false,
              validate: function (input) {
                var inputValue = Representing.getValue(input);
                if (inputValue.length === 0) {
                  return Future.pure(Result.value(true));
                } else {
                  var span = SugarElement.fromTag('span');
                  set$6(span, 'background-color', inputValue);
                  var res = getRaw(span, 'background-color').fold(function () {
                    return Result.error('blah');
                  }, function (_) {
                    return Result.value(inputValue);
                  });
                  return Future.pure(res);
                }
              }
            }
          })
        ]),
        selectOnFocus: false
      });
      var pLabel = spec.label.map(function (label) {
        return renderLabel$2(label, sharedBackstage.providers);
      });
      var emitSwatchChange = function (colorBit, value) {
        emitWith(colorBit, colorSwatchChangeEvent, { value: value });
      };
      var onItemAction = function (comp, value) {
        memColorButton.getOpt(comp).each(function (colorBit) {
          if (value === 'custom') {
            colorInputBackstage.colorPicker(function (valueOpt) {
              valueOpt.fold(function () {
                return emit(colorBit, colorPickerCancelEvent);
              }, function (value) {
                emitSwatchChange(colorBit, value);
                addColor(value);
              });
            }, '#ffffff');
          } else if (value === 'remove') {
            emitSwatchChange(colorBit, '');
          } else {
            emitSwatchChange(colorBit, value);
          }
        });
      };
      var memColorButton = record(renderPanelButton({
        dom: {
          tag: 'span',
          attributes: { 'aria-label': sharedBackstage.providers.translate('Color swatch') }
        },
        layouts: {
          onRtl: function () {
            return [
              southwest$2,
              southeast$2,
              south$2
            ];
          },
          onLtr: function () {
            return [
              southeast$2,
              southwest$2,
              south$2
            ];
          }
        },
        components: [],
        fetch: getFetch$1(colorInputBackstage.getColors(), colorInputBackstage.hasCustomColors()),
        columns: colorInputBackstage.getColorCols(),
        presets: 'color',
        onItemAction: onItemAction
      }, sharedBackstage));
      return FormField.sketch({
        dom: {
          tag: 'div',
          classes: ['tox-form__group']
        },
        components: pLabel.toArray().concat([{
            dom: {
              tag: 'div',
              classes: ['tox-color-input']
            },
            components: [
              pField,
              memColorButton.asSpec()
            ]
          }]),
        fieldBehaviours: derive$1([config('form-field-events', [
            run$1(colorInputChangeEvent, function (comp, se) {
              memColorButton.getOpt(comp).each(function (colorButton) {
                set$6(colorButton.element, 'background-color', se.event.color);
              });
              emitWith(comp, formChangeEvent, { name: spec.name });
            }),
            run$1(colorSwatchChangeEvent, function (comp, se) {
              FormField.getField(comp).each(function (field) {
                Representing.setValue(field, se.event.value);
                Composing.getCurrent(comp).each(Focusing.focus);
              });
            }),
            run$1(colorPickerCancelEvent, function (comp, _se) {
              FormField.getField(comp).each(function (_field) {
                Composing.getCurrent(comp).each(Focusing.focus);
              });
            })
          ])])
      });
    };

    var labelPart = optional({
      schema: [required$1('dom')],
      name: 'label'
    });
    var edgePart = function (name) {
      return optional({
        name: '' + name + '-edge',
        overrides: function (detail) {
          var action = detail.model.manager.edgeActions[name];
          return action.fold(function () {
            return {};
          }, function (a) {
            return {
              events: derive$2([
                runActionExtra(touchstart(), function (comp, se, d) {
                  return a(comp, d);
                }, [detail]),
                runActionExtra(mousedown(), function (comp, se, d) {
                  return a(comp, d);
                }, [detail]),
                runActionExtra(mousemove(), function (comp, se, det) {
                  if (det.mouseIsDown.get()) {
                    a(comp, det);
                  }
                }, [detail])
              ])
            };
          });
        }
      });
    };
    var tlEdgePart = edgePart('top-left');
    var tedgePart = edgePart('top');
    var trEdgePart = edgePart('top-right');
    var redgePart = edgePart('right');
    var brEdgePart = edgePart('bottom-right');
    var bedgePart = edgePart('bottom');
    var blEdgePart = edgePart('bottom-left');
    var ledgePart = edgePart('left');
    var thumbPart = required({
      name: 'thumb',
      defaults: constant$1({ dom: { styles: { position: 'absolute' } } }),
      overrides: function (detail) {
        return {
          events: derive$2([
            redirectToPart(touchstart(), detail, 'spectrum'),
            redirectToPart(touchmove(), detail, 'spectrum'),
            redirectToPart(touchend(), detail, 'spectrum'),
            redirectToPart(mousedown(), detail, 'spectrum'),
            redirectToPart(mousemove(), detail, 'spectrum'),
            redirectToPart(mouseup(), detail, 'spectrum')
          ])
        };
      }
    });
    var spectrumPart = required({
      schema: [customField('mouseIsDown', function () {
          return Cell(false);
        })],
      name: 'spectrum',
      overrides: function (detail) {
        var modelDetail = detail.model;
        var model = modelDetail.manager;
        var setValueFrom = function (component, simulatedEvent) {
          return model.getValueFromEvent(simulatedEvent).map(function (value) {
            return model.setValueFrom(component, detail, value);
          });
        };
        return {
          behaviours: derive$1([
            Keying.config({
              mode: 'special',
              onLeft: function (spectrum) {
                return model.onLeft(spectrum, detail);
              },
              onRight: function (spectrum) {
                return model.onRight(spectrum, detail);
              },
              onUp: function (spectrum) {
                return model.onUp(spectrum, detail);
              },
              onDown: function (spectrum) {
                return model.onDown(spectrum, detail);
              }
            }),
            Focusing.config({})
          ]),
          events: derive$2([
            run$1(touchstart(), setValueFrom),
            run$1(touchmove(), setValueFrom),
            run$1(mousedown(), setValueFrom),
            run$1(mousemove(), function (spectrum, se) {
              if (detail.mouseIsDown.get()) {
                setValueFrom(spectrum, se);
              }
            })
          ])
        };
      }
    });
    var SliderParts = [
      labelPart,
      ledgePart,
      redgePart,
      tedgePart,
      bedgePart,
      tlEdgePart,
      trEdgePart,
      blEdgePart,
      brEdgePart,
      thumbPart,
      spectrumPart
    ];

    var _sliderChangeEvent = 'slider.change.value';
    var sliderChangeEvent = constant$1(_sliderChangeEvent);
    var isTouchEvent$1 = function (evt) {
      return evt.type.indexOf('touch') !== -1;
    };
    var getEventSource = function (simulatedEvent) {
      var evt = simulatedEvent.event.raw;
      if (isTouchEvent$1(evt)) {
        var touchEvent = evt;
        return touchEvent.touches !== undefined && touchEvent.touches.length === 1 ? Optional.some(touchEvent.touches[0]).map(function (t) {
          return SugarPosition(t.clientX, t.clientY);
        }) : Optional.none();
      } else {
        var mouseEvent = evt;
        return mouseEvent.clientX !== undefined ? Optional.some(mouseEvent).map(function (me) {
          return SugarPosition(me.clientX, me.clientY);
        }) : Optional.none();
      }
    };

    var t = 'top', r = 'right', b = 'bottom', l = 'left';
    var minX = function (detail) {
      return detail.model.minX;
    };
    var minY = function (detail) {
      return detail.model.minY;
    };
    var min1X = function (detail) {
      return detail.model.minX - 1;
    };
    var min1Y = function (detail) {
      return detail.model.minY - 1;
    };
    var maxX = function (detail) {
      return detail.model.maxX;
    };
    var maxY = function (detail) {
      return detail.model.maxY;
    };
    var max1X = function (detail) {
      return detail.model.maxX + 1;
    };
    var max1Y = function (detail) {
      return detail.model.maxY + 1;
    };
    var range = function (detail, max, min) {
      return max(detail) - min(detail);
    };
    var xRange = function (detail) {
      return range(detail, maxX, minX);
    };
    var yRange = function (detail) {
      return range(detail, maxY, minY);
    };
    var halfX = function (detail) {
      return xRange(detail) / 2;
    };
    var halfY = function (detail) {
      return yRange(detail) / 2;
    };
    var step = function (detail) {
      return detail.stepSize;
    };
    var snap = function (detail) {
      return detail.snapToGrid;
    };
    var snapStart = function (detail) {
      return detail.snapStart;
    };
    var rounded = function (detail) {
      return detail.rounded;
    };
    var hasEdge = function (detail, edgeName) {
      return detail[edgeName + '-edge'] !== undefined;
    };
    var hasLEdge = function (detail) {
      return hasEdge(detail, l);
    };
    var hasREdge = function (detail) {
      return hasEdge(detail, r);
    };
    var hasTEdge = function (detail) {
      return hasEdge(detail, t);
    };
    var hasBEdge = function (detail) {
      return hasEdge(detail, b);
    };
    var currentValue = function (detail) {
      return detail.model.value.get();
    };

    var xValue = function (x) {
      return { x: x };
    };
    var yValue = function (y) {
      return { y: y };
    };
    var xyValue = function (x, y) {
      return {
        x: x,
        y: y
      };
    };
    var fireSliderChange$3 = function (component, value) {
      emitWith(component, sliderChangeEvent(), { value: value });
    };
    var setToTLEdgeXY = function (edge, detail) {
      fireSliderChange$3(edge, xyValue(min1X(detail), min1Y(detail)));
    };
    var setToTEdge = function (edge, detail) {
      fireSliderChange$3(edge, yValue(min1Y(detail)));
    };
    var setToTEdgeXY = function (edge, detail) {
      fireSliderChange$3(edge, xyValue(halfX(detail), min1Y(detail)));
    };
    var setToTREdgeXY = function (edge, detail) {
      fireSliderChange$3(edge, xyValue(max1X(detail), min1Y(detail)));
    };
    var setToREdge = function (edge, detail) {
      fireSliderChange$3(edge, xValue(max1X(detail)));
    };
    var setToREdgeXY = function (edge, detail) {
      fireSliderChange$3(edge, xyValue(max1X(detail), halfY(detail)));
    };
    var setToBREdgeXY = function (edge, detail) {
      fireSliderChange$3(edge, xyValue(max1X(detail), max1Y(detail)));
    };
    var setToBEdge = function (edge, detail) {
      fireSliderChange$3(edge, yValue(max1Y(detail)));
    };
    var setToBEdgeXY = function (edge, detail) {
      fireSliderChange$3(edge, xyValue(halfX(detail), max1Y(detail)));
    };
    var setToBLEdgeXY = function (edge, detail) {
      fireSliderChange$3(edge, xyValue(min1X(detail), max1Y(detail)));
    };
    var setToLEdge = function (edge, detail) {
      fireSliderChange$3(edge, xValue(min1X(detail)));
    };
    var setToLEdgeXY = function (edge, detail) {
      fireSliderChange$3(edge, xyValue(min1X(detail), halfY(detail)));
    };

    var reduceBy = function (value, min, max, step) {
      if (value < min) {
        return value;
      } else if (value > max) {
        return max;
      } else if (value === min) {
        return min - 1;
      } else {
        return Math.max(min, value - step);
      }
    };
    var increaseBy = function (value, min, max, step) {
      if (value > max) {
        return value;
      } else if (value < min) {
        return min;
      } else if (value === max) {
        return max + 1;
      } else {
        return Math.min(max, value + step);
      }
    };
    var capValue = function (value, min, max) {
      return Math.max(min, Math.min(max, value));
    };
    var snapValueOf = function (value, min, max, step, snapStart) {
      return snapStart.fold(function () {
        var initValue = value - min;
        var extraValue = Math.round(initValue / step) * step;
        return capValue(min + extraValue, min - 1, max + 1);
      }, function (start) {
        var remainder = (value - start) % step;
        var adjustment = Math.round(remainder / step);
        var rawSteps = Math.floor((value - start) / step);
        var maxSteps = Math.floor((max - start) / step);
        var numSteps = Math.min(maxSteps, rawSteps + adjustment);
        var r = start + numSteps * step;
        return Math.max(start, r);
      });
    };
    var findOffsetOf = function (value, min, max) {
      return Math.min(max, Math.max(value, min)) - min;
    };
    var findValueOf = function (args) {
      var min = args.min, max = args.max, range = args.range, value = args.value, step = args.step, snap = args.snap, snapStart = args.snapStart, rounded = args.rounded, hasMinEdge = args.hasMinEdge, hasMaxEdge = args.hasMaxEdge, minBound = args.minBound, maxBound = args.maxBound, screenRange = args.screenRange;
      var capMin = hasMinEdge ? min - 1 : min;
      var capMax = hasMaxEdge ? max + 1 : max;
      if (value < minBound) {
        return capMin;
      } else if (value > maxBound) {
        return capMax;
      } else {
        var offset = findOffsetOf(value, minBound, maxBound);
        var newValue = capValue(offset / screenRange * range + min, capMin, capMax);
        if (snap && newValue >= min && newValue <= max) {
          return snapValueOf(newValue, min, max, step, snapStart);
        } else if (rounded) {
          return Math.round(newValue);
        } else {
          return newValue;
        }
      }
    };
    var findOffsetOfValue$2 = function (args) {
      var min = args.min, max = args.max, range = args.range, value = args.value, hasMinEdge = args.hasMinEdge, hasMaxEdge = args.hasMaxEdge, maxBound = args.maxBound, maxOffset = args.maxOffset, centerMinEdge = args.centerMinEdge, centerMaxEdge = args.centerMaxEdge;
      if (value < min) {
        return hasMinEdge ? 0 : centerMinEdge;
      } else if (value > max) {
        return hasMaxEdge ? maxBound : centerMaxEdge;
      } else {
        return (value - min) / range * maxOffset;
      }
    };

    var top = 'top', right = 'right', bottom = 'bottom', left = 'left', width = 'width', height = 'height';
    var getBounds = function (component) {
      return component.element.dom.getBoundingClientRect();
    };
    var getBoundsProperty = function (bounds, property) {
      return bounds[property];
    };
    var getMinXBounds = function (component) {
      var bounds = getBounds(component);
      return getBoundsProperty(bounds, left);
    };
    var getMaxXBounds = function (component) {
      var bounds = getBounds(component);
      return getBoundsProperty(bounds, right);
    };
    var getMinYBounds = function (component) {
      var bounds = getBounds(component);
      return getBoundsProperty(bounds, top);
    };
    var getMaxYBounds = function (component) {
      var bounds = getBounds(component);
      return getBoundsProperty(bounds, bottom);
    };
    var getXScreenRange = function (component) {
      var bounds = getBounds(component);
      return getBoundsProperty(bounds, width);
    };
    var getYScreenRange = function (component) {
      var bounds = getBounds(component);
      return getBoundsProperty(bounds, height);
    };
    var getCenterOffsetOf = function (componentMinEdge, componentMaxEdge, spectrumMinEdge) {
      return (componentMinEdge + componentMaxEdge) / 2 - spectrumMinEdge;
    };
    var getXCenterOffSetOf = function (component, spectrum) {
      var componentBounds = getBounds(component);
      var spectrumBounds = getBounds(spectrum);
      var componentMinEdge = getBoundsProperty(componentBounds, left);
      var componentMaxEdge = getBoundsProperty(componentBounds, right);
      var spectrumMinEdge = getBoundsProperty(spectrumBounds, left);
      return getCenterOffsetOf(componentMinEdge, componentMaxEdge, spectrumMinEdge);
    };
    var getYCenterOffSetOf = function (component, spectrum) {
      var componentBounds = getBounds(component);
      var spectrumBounds = getBounds(spectrum);
      var componentMinEdge = getBoundsProperty(componentBounds, top);
      var componentMaxEdge = getBoundsProperty(componentBounds, bottom);
      var spectrumMinEdge = getBoundsProperty(spectrumBounds, top);
      return getCenterOffsetOf(componentMinEdge, componentMaxEdge, spectrumMinEdge);
    };

    var fireSliderChange$2 = function (spectrum, value) {
      emitWith(spectrum, sliderChangeEvent(), { value: value });
    };
    var sliderValue$2 = function (x) {
      return { x: x };
    };
    var findValueOfOffset$1 = function (spectrum, detail, left) {
      var args = {
        min: minX(detail),
        max: maxX(detail),
        range: xRange(detail),
        value: left,
        step: step(detail),
        snap: snap(detail),
        snapStart: snapStart(detail),
        rounded: rounded(detail),
        hasMinEdge: hasLEdge(detail),
        hasMaxEdge: hasREdge(detail),
        minBound: getMinXBounds(spectrum),
        maxBound: getMaxXBounds(spectrum),
        screenRange: getXScreenRange(spectrum)
      };
      return findValueOf(args);
    };
    var setValueFrom$2 = function (spectrum, detail, value) {
      var xValue = findValueOfOffset$1(spectrum, detail, value);
      var sliderVal = sliderValue$2(xValue);
      fireSliderChange$2(spectrum, sliderVal);
      return xValue;
    };
    var setToMin$2 = function (spectrum, detail) {
      var min = minX(detail);
      fireSliderChange$2(spectrum, sliderValue$2(min));
    };
    var setToMax$2 = function (spectrum, detail) {
      var max = maxX(detail);
      fireSliderChange$2(spectrum, sliderValue$2(max));
    };
    var moveBy$2 = function (direction, spectrum, detail) {
      var f = direction > 0 ? increaseBy : reduceBy;
      var xValue = f(currentValue(detail).x, minX(detail), maxX(detail), step(detail));
      fireSliderChange$2(spectrum, sliderValue$2(xValue));
      return Optional.some(xValue);
    };
    var handleMovement$2 = function (direction) {
      return function (spectrum, detail) {
        return moveBy$2(direction, spectrum, detail).map(always);
      };
    };
    var getValueFromEvent$2 = function (simulatedEvent) {
      var pos = getEventSource(simulatedEvent);
      return pos.map(function (p) {
        return p.left;
      });
    };
    var findOffsetOfValue$1 = function (spectrum, detail, value, minEdge, maxEdge) {
      var minOffset = 0;
      var maxOffset = getXScreenRange(spectrum);
      var centerMinEdge = minEdge.bind(function (edge) {
        return Optional.some(getXCenterOffSetOf(edge, spectrum));
      }).getOr(minOffset);
      var centerMaxEdge = maxEdge.bind(function (edge) {
        return Optional.some(getXCenterOffSetOf(edge, spectrum));
      }).getOr(maxOffset);
      var args = {
        min: minX(detail),
        max: maxX(detail),
        range: xRange(detail),
        value: value,
        hasMinEdge: hasLEdge(detail),
        hasMaxEdge: hasREdge(detail),
        minBound: getMinXBounds(spectrum),
        minOffset: minOffset,
        maxBound: getMaxXBounds(spectrum),
        maxOffset: maxOffset,
        centerMinEdge: centerMinEdge,
        centerMaxEdge: centerMaxEdge
      };
      return findOffsetOfValue$2(args);
    };
    var findPositionOfValue$1 = function (slider, spectrum, value, minEdge, maxEdge, detail) {
      var offset = findOffsetOfValue$1(spectrum, detail, value, minEdge, maxEdge);
      return getMinXBounds(spectrum) - getMinXBounds(slider) + offset;
    };
    var setPositionFromValue$2 = function (slider, thumb, detail, edges) {
      var value = currentValue(detail);
      var pos = findPositionOfValue$1(slider, edges.getSpectrum(slider), value.x, edges.getLeftEdge(slider), edges.getRightEdge(slider), detail);
      var thumbRadius = get$7(thumb.element) / 2;
      set$6(thumb.element, 'left', pos - thumbRadius + 'px');
    };
    var onLeft$2 = handleMovement$2(-1);
    var onRight$2 = handleMovement$2(1);
    var onUp$2 = Optional.none;
    var onDown$2 = Optional.none;
    var edgeActions$2 = {
      'top-left': Optional.none(),
      'top': Optional.none(),
      'top-right': Optional.none(),
      'right': Optional.some(setToREdge),
      'bottom-right': Optional.none(),
      'bottom': Optional.none(),
      'bottom-left': Optional.none(),
      'left': Optional.some(setToLEdge)
    };

    var HorizontalModel = /*#__PURE__*/Object.freeze({
        __proto__: null,
        setValueFrom: setValueFrom$2,
        setToMin: setToMin$2,
        setToMax: setToMax$2,
        findValueOfOffset: findValueOfOffset$1,
        getValueFromEvent: getValueFromEvent$2,
        findPositionOfValue: findPositionOfValue$1,
        setPositionFromValue: setPositionFromValue$2,
        onLeft: onLeft$2,
        onRight: onRight$2,
        onUp: onUp$2,
        onDown: onDown$2,
        edgeActions: edgeActions$2
    });

    var fireSliderChange$1 = function (spectrum, value) {
      emitWith(spectrum, sliderChangeEvent(), { value: value });
    };
    var sliderValue$1 = function (y) {
      return { y: y };
    };
    var findValueOfOffset = function (spectrum, detail, top) {
      var args = {
        min: minY(detail),
        max: maxY(detail),
        range: yRange(detail),
        value: top,
        step: step(detail),
        snap: snap(detail),
        snapStart: snapStart(detail),
        rounded: rounded(detail),
        hasMinEdge: hasTEdge(detail),
        hasMaxEdge: hasBEdge(detail),
        minBound: getMinYBounds(spectrum),
        maxBound: getMaxYBounds(spectrum),
        screenRange: getYScreenRange(spectrum)
      };
      return findValueOf(args);
    };
    var setValueFrom$1 = function (spectrum, detail, value) {
      var yValue = findValueOfOffset(spectrum, detail, value);
      var sliderVal = sliderValue$1(yValue);
      fireSliderChange$1(spectrum, sliderVal);
      return yValue;
    };
    var setToMin$1 = function (spectrum, detail) {
      var min = minY(detail);
      fireSliderChange$1(spectrum, sliderValue$1(min));
    };
    var setToMax$1 = function (spectrum, detail) {
      var max = maxY(detail);
      fireSliderChange$1(spectrum, sliderValue$1(max));
    };
    var moveBy$1 = function (direction, spectrum, detail) {
      var f = direction > 0 ? increaseBy : reduceBy;
      var yValue = f(currentValue(detail).y, minY(detail), maxY(detail), step(detail));
      fireSliderChange$1(spectrum, sliderValue$1(yValue));
      return Optional.some(yValue);
    };
    var handleMovement$1 = function (direction) {
      return function (spectrum, detail) {
        return moveBy$1(direction, spectrum, detail).map(always);
      };
    };
    var getValueFromEvent$1 = function (simulatedEvent) {
      var pos = getEventSource(simulatedEvent);
      return pos.map(function (p) {
        return p.top;
      });
    };
    var findOffsetOfValue = function (spectrum, detail, value, minEdge, maxEdge) {
      var minOffset = 0;
      var maxOffset = getYScreenRange(spectrum);
      var centerMinEdge = minEdge.bind(function (edge) {
        return Optional.some(getYCenterOffSetOf(edge, spectrum));
      }).getOr(minOffset);
      var centerMaxEdge = maxEdge.bind(function (edge) {
        return Optional.some(getYCenterOffSetOf(edge, spectrum));
      }).getOr(maxOffset);
      var args = {
        min: minY(detail),
        max: maxY(detail),
        range: yRange(detail),
        value: value,
        hasMinEdge: hasTEdge(detail),
        hasMaxEdge: hasBEdge(detail),
        minBound: getMinYBounds(spectrum),
        minOffset: minOffset,
        maxBound: getMaxYBounds(spectrum),
        maxOffset: maxOffset,
        centerMinEdge: centerMinEdge,
        centerMaxEdge: centerMaxEdge
      };
      return findOffsetOfValue$2(args);
    };
    var findPositionOfValue = function (slider, spectrum, value, minEdge, maxEdge, detail) {
      var offset = findOffsetOfValue(spectrum, detail, value, minEdge, maxEdge);
      return getMinYBounds(spectrum) - getMinYBounds(slider) + offset;
    };
    var setPositionFromValue$1 = function (slider, thumb, detail, edges) {
      var value = currentValue(detail);
      var pos = findPositionOfValue(slider, edges.getSpectrum(slider), value.y, edges.getTopEdge(slider), edges.getBottomEdge(slider), detail);
      var thumbRadius = get$8(thumb.element) / 2;
      set$6(thumb.element, 'top', pos - thumbRadius + 'px');
    };
    var onLeft$1 = Optional.none;
    var onRight$1 = Optional.none;
    var onUp$1 = handleMovement$1(-1);
    var onDown$1 = handleMovement$1(1);
    var edgeActions$1 = {
      'top-left': Optional.none(),
      'top': Optional.some(setToTEdge),
      'top-right': Optional.none(),
      'right': Optional.none(),
      'bottom-right': Optional.none(),
      'bottom': Optional.some(setToBEdge),
      'bottom-left': Optional.none(),
      'left': Optional.none()
    };

    var VerticalModel = /*#__PURE__*/Object.freeze({
        __proto__: null,
        setValueFrom: setValueFrom$1,
        setToMin: setToMin$1,
        setToMax: setToMax$1,
        findValueOfOffset: findValueOfOffset,
        getValueFromEvent: getValueFromEvent$1,
        findPositionOfValue: findPositionOfValue,
        setPositionFromValue: setPositionFromValue$1,
        onLeft: onLeft$1,
        onRight: onRight$1,
        onUp: onUp$1,
        onDown: onDown$1,
        edgeActions: edgeActions$1
    });

    var fireSliderChange = function (spectrum, value) {
      emitWith(spectrum, sliderChangeEvent(), { value: value });
    };
    var sliderValue = function (x, y) {
      return {
        x: x,
        y: y
      };
    };
    var setValueFrom = function (spectrum, detail, value) {
      var xValue = findValueOfOffset$1(spectrum, detail, value.left);
      var yValue = findValueOfOffset(spectrum, detail, value.top);
      var val = sliderValue(xValue, yValue);
      fireSliderChange(spectrum, val);
      return val;
    };
    var moveBy = function (direction, isVerticalMovement, spectrum, detail) {
      var f = direction > 0 ? increaseBy : reduceBy;
      var xValue = isVerticalMovement ? currentValue(detail).x : f(currentValue(detail).x, minX(detail), maxX(detail), step(detail));
      var yValue = !isVerticalMovement ? currentValue(detail).y : f(currentValue(detail).y, minY(detail), maxY(detail), step(detail));
      fireSliderChange(spectrum, sliderValue(xValue, yValue));
      return Optional.some(xValue);
    };
    var handleMovement = function (direction, isVerticalMovement) {
      return function (spectrum, detail) {
        return moveBy(direction, isVerticalMovement, spectrum, detail).map(always);
      };
    };
    var setToMin = function (spectrum, detail) {
      var mX = minX(detail);
      var mY = minY(detail);
      fireSliderChange(spectrum, sliderValue(mX, mY));
    };
    var setToMax = function (spectrum, detail) {
      var mX = maxX(detail);
      var mY = maxY(detail);
      fireSliderChange(spectrum, sliderValue(mX, mY));
    };
    var getValueFromEvent = function (simulatedEvent) {
      return getEventSource(simulatedEvent);
    };
    var setPositionFromValue = function (slider, thumb, detail, edges) {
      var value = currentValue(detail);
      var xPos = findPositionOfValue$1(slider, edges.getSpectrum(slider), value.x, edges.getLeftEdge(slider), edges.getRightEdge(slider), detail);
      var yPos = findPositionOfValue(slider, edges.getSpectrum(slider), value.y, edges.getTopEdge(slider), edges.getBottomEdge(slider), detail);
      var thumbXRadius = get$7(thumb.element) / 2;
      var thumbYRadius = get$8(thumb.element) / 2;
      set$6(thumb.element, 'left', xPos - thumbXRadius + 'px');
      set$6(thumb.element, 'top', yPos - thumbYRadius + 'px');
    };
    var onLeft = handleMovement(-1, false);
    var onRight = handleMovement(1, false);
    var onUp = handleMovement(-1, true);
    var onDown = handleMovement(1, true);
    var edgeActions = {
      'top-left': Optional.some(setToTLEdgeXY),
      'top': Optional.some(setToTEdgeXY),
      'top-right': Optional.some(setToTREdgeXY),
      'right': Optional.some(setToREdgeXY),
      'bottom-right': Optional.some(setToBREdgeXY),
      'bottom': Optional.some(setToBEdgeXY),
      'bottom-left': Optional.some(setToBLEdgeXY),
      'left': Optional.some(setToLEdgeXY)
    };

    var TwoDModel = /*#__PURE__*/Object.freeze({
        __proto__: null,
        setValueFrom: setValueFrom,
        setToMin: setToMin,
        setToMax: setToMax,
        getValueFromEvent: getValueFromEvent,
        setPositionFromValue: setPositionFromValue,
        onLeft: onLeft,
        onRight: onRight,
        onUp: onUp,
        onDown: onDown,
        edgeActions: edgeActions
    });

    var SliderSchema = [
      defaulted('stepSize', 1),
      defaulted('onChange', noop),
      defaulted('onChoose', noop),
      defaulted('onInit', noop),
      defaulted('onDragStart', noop),
      defaulted('onDragEnd', noop),
      defaulted('snapToGrid', false),
      defaulted('rounded', true),
      option('snapStart'),
      requiredOf('model', choose$1('mode', {
        x: [
          defaulted('minX', 0),
          defaulted('maxX', 100),
          customField('value', function (spec) {
            return Cell(spec.mode.minX);
          }),
          required$1('getInitialValue'),
          output$1('manager', HorizontalModel)
        ],
        y: [
          defaulted('minY', 0),
          defaulted('maxY', 100),
          customField('value', function (spec) {
            return Cell(spec.mode.minY);
          }),
          required$1('getInitialValue'),
          output$1('manager', VerticalModel)
        ],
        xy: [
          defaulted('minX', 0),
          defaulted('maxX', 100),
          defaulted('minY', 0),
          defaulted('maxY', 100),
          customField('value', function (spec) {
            return Cell({
              x: spec.mode.minX,
              y: spec.mode.minY
            });
          }),
          required$1('getInitialValue'),
          output$1('manager', TwoDModel)
        ]
      })),
      field('sliderBehaviours', [
        Keying,
        Representing
      ]),
      customField('mouseIsDown', function () {
        return Cell(false);
      })
    ];

    var sketch$2 = function (detail, components, _spec, _externals) {
      var _a;
      var getThumb = function (component) {
        return getPartOrDie(component, detail, 'thumb');
      };
      var getSpectrum = function (component) {
        return getPartOrDie(component, detail, 'spectrum');
      };
      var getLeftEdge = function (component) {
        return getPart(component, detail, 'left-edge');
      };
      var getRightEdge = function (component) {
        return getPart(component, detail, 'right-edge');
      };
      var getTopEdge = function (component) {
        return getPart(component, detail, 'top-edge');
      };
      var getBottomEdge = function (component) {
        return getPart(component, detail, 'bottom-edge');
      };
      var modelDetail = detail.model;
      var model = modelDetail.manager;
      var refresh = function (slider, thumb) {
        model.setPositionFromValue(slider, thumb, detail, {
          getLeftEdge: getLeftEdge,
          getRightEdge: getRightEdge,
          getTopEdge: getTopEdge,
          getBottomEdge: getBottomEdge,
          getSpectrum: getSpectrum
        });
      };
      var setValue = function (slider, newValue) {
        modelDetail.value.set(newValue);
        var thumb = getThumb(slider);
        refresh(slider, thumb);
      };
      var changeValue = function (slider, newValue) {
        setValue(slider, newValue);
        var thumb = getThumb(slider);
        detail.onChange(slider, thumb, newValue);
        return Optional.some(true);
      };
      var resetToMin = function (slider) {
        model.setToMin(slider, detail);
      };
      var resetToMax = function (slider) {
        model.setToMax(slider, detail);
      };
      var choose = function (slider) {
        var fireOnChoose = function () {
          getPart(slider, detail, 'thumb').each(function (thumb) {
            var value = modelDetail.value.get();
            detail.onChoose(slider, thumb, value);
          });
        };
        var wasDown = detail.mouseIsDown.get();
        detail.mouseIsDown.set(false);
        if (wasDown) {
          fireOnChoose();
        }
      };
      var onDragStart = function (slider, simulatedEvent) {
        simulatedEvent.stop();
        detail.mouseIsDown.set(true);
        detail.onDragStart(slider, getThumb(slider));
      };
      var onDragEnd = function (slider, simulatedEvent) {
        simulatedEvent.stop();
        detail.onDragEnd(slider, getThumb(slider));
        choose(slider);
      };
      return {
        uid: detail.uid,
        dom: detail.dom,
        components: components,
        behaviours: augment(detail.sliderBehaviours, [
          Keying.config({
            mode: 'special',
            focusIn: function (slider) {
              return getPart(slider, detail, 'spectrum').map(Keying.focusIn).map(always);
            }
          }),
          Representing.config({
            store: {
              mode: 'manual',
              getValue: function (_) {
                return modelDetail.value.get();
              }
            }
          }),
          Receiving.config({ channels: (_a = {}, _a[mouseReleased()] = { onReceive: choose }, _a) })
        ]),
        events: derive$2([
          run$1(sliderChangeEvent(), function (slider, simulatedEvent) {
            changeValue(slider, simulatedEvent.event.value);
          }),
          runOnAttached(function (slider, _simulatedEvent) {
            var getInitial = modelDetail.getInitialValue();
            modelDetail.value.set(getInitial);
            var thumb = getThumb(slider);
            refresh(slider, thumb);
            var spectrum = getSpectrum(slider);
            detail.onInit(slider, thumb, spectrum, modelDetail.value.get());
          }),
          run$1(touchstart(), onDragStart),
          run$1(touchend(), onDragEnd),
          run$1(mousedown(), onDragStart),
          run$1(mouseup(), onDragEnd)
        ]),
        apis: {
          resetToMin: resetToMin,
          resetToMax: resetToMax,
          setValue: setValue,
          refresh: refresh
        },
        domModification: { styles: { position: 'relative' } }
      };
    };

    var Slider = composite({
      name: 'Slider',
      configFields: SliderSchema,
      partFields: SliderParts,
      factory: sketch$2,
      apis: {
        setValue: function (apis, slider, value) {
          apis.setValue(slider, value);
        },
        resetToMin: function (apis, slider) {
          apis.resetToMin(slider);
        },
        resetToMax: function (apis, slider) {
          apis.resetToMax(slider);
        },
        refresh: function (apis, slider) {
          apis.refresh(slider);
        }
      }
    });

    var fieldsUpdate = generate$6('rgb-hex-update');
    var sliderUpdate = generate$6('slider-update');
    var paletteUpdate = generate$6('palette-update');

    var sliderFactory = function (translate, getClass) {
      var spectrum = Slider.parts.spectrum({
        dom: {
          tag: 'div',
          classes: [getClass('hue-slider-spectrum')],
          attributes: { role: 'presentation' }
        }
      });
      var thumb = Slider.parts.thumb({
        dom: {
          tag: 'div',
          classes: [getClass('hue-slider-thumb')],
          attributes: { role: 'presentation' }
        }
      });
      return Slider.sketch({
        dom: {
          tag: 'div',
          classes: [getClass('hue-slider')],
          attributes: { role: 'presentation' }
        },
        rounded: false,
        model: {
          mode: 'y',
          getInitialValue: constant$1({ y: 0 })
        },
        components: [
          spectrum,
          thumb
        ],
        sliderBehaviours: derive$1([Focusing.config({})]),
        onChange: function (slider, _thumb, value) {
          emitWith(slider, sliderUpdate, { value: value });
        }
      });
    };

    var owner$1 = 'form';
    var schema$i = [field('formBehaviours', [Representing])];
    var getPartName$1 = function (name) {
      return '<alloy.field.' + name + '>';
    };
    var sketch$1 = function (fSpec) {
      var parts = function () {
        var record = [];
        var field = function (name, config) {
          record.push(name);
          return generateOne$1(owner$1, getPartName$1(name), config);
        };
        return {
          field: field,
          record: constant$1(record)
        };
      }();
      var spec = fSpec(parts);
      var partNames = parts.record();
      var fieldParts = map$2(partNames, function (n) {
        return required({
          name: n,
          pname: getPartName$1(n)
        });
      });
      return composite$1(owner$1, schema$i, fieldParts, make$4, spec);
    };
    var toResult = function (o, e) {
      return o.fold(function () {
        return Result.error(e);
      }, Result.value);
    };
    var make$4 = function (detail, components) {
      return {
        uid: detail.uid,
        dom: detail.dom,
        components: components,
        behaviours: augment(detail.formBehaviours, [Representing.config({
            store: {
              mode: 'manual',
              getValue: function (form) {
                var resPs = getAllParts(form, detail);
                return map(resPs, function (resPThunk, pName) {
                  return resPThunk().bind(function (v) {
                    var opt = Composing.getCurrent(v);
                    return toResult(opt, new Error('Cannot find a current component to extract the value from for form part \'' + pName + '\': ' + element(v.element)));
                  }).map(Representing.getValue);
                });
              },
              setValue: function (form, values) {
                each(values, function (newValue, key) {
                  getPart(form, detail, key).each(function (wrapper) {
                    Composing.getCurrent(wrapper).each(function (field) {
                      Representing.setValue(field, newValue);
                    });
                  });
                });
              }
            }
          })]),
        apis: {
          getField: function (form, key) {
            return getPart(form, detail, key).bind(Composing.getCurrent);
          }
        }
      };
    };
    var Form = {
      getField: makeApi(function (apis, component, key) {
        return apis.getField(component, key);
      }),
      sketch: sketch$1
    };

    var validInput = generate$6('valid-input');
    var invalidInput = generate$6('invalid-input');
    var validatingInput = generate$6('validating-input');
    var translatePrefix = 'colorcustom.rgb.';
    var rgbFormFactory = function (translate, getClass, onValidHexx, onInvalidHexx) {
      var invalidation = function (label, isValid) {
        return Invalidating.config({
          invalidClass: getClass('invalid'),
          notify: {
            onValidate: function (comp) {
              emitWith(comp, validatingInput, { type: label });
            },
            onValid: function (comp) {
              emitWith(comp, validInput, {
                type: label,
                value: Representing.getValue(comp)
              });
            },
            onInvalid: function (comp) {
              emitWith(comp, invalidInput, {
                type: label,
                value: Representing.getValue(comp)
              });
            }
          },
          validator: {
            validate: function (comp) {
              var value = Representing.getValue(comp);
              var res = isValid(value) ? Result.value(true) : Result.error(translate('aria.input.invalid'));
              return Future.pure(res);
            },
            validateOnLoad: false
          }
        });
      };
      var renderTextField = function (isValid, name, label, description, data) {
        var helptext = translate(translatePrefix + 'range');
        var pLabel = FormField.parts.label({
          dom: {
            tag: 'label',
            innerHtml: label,
            attributes: { 'aria-label': description }
          }
        });
        var pField = FormField.parts.field({
          data: data,
          factory: Input,
          inputAttributes: __assign({ type: 'text' }, name === 'hex' ? { 'aria-live': 'polite' } : {}),
          inputClasses: [getClass('textfield')],
          inputBehaviours: derive$1([
            invalidation(name, isValid),
            Tabstopping.config({})
          ]),
          onSetValue: function (input) {
            if (Invalidating.isInvalid(input)) {
              var run = Invalidating.run(input);
              run.get(noop);
            }
          }
        });
        var comps = [
          pLabel,
          pField
        ];
        var concats = name !== 'hex' ? [FormField.parts['aria-descriptor']({ text: helptext })] : [];
        var components = comps.concat(concats);
        return {
          dom: {
            tag: 'div',
            attributes: { role: 'presentation' }
          },
          components: components
        };
      };
      var copyRgbToHex = function (form, rgba) {
        var hex = fromRgba(rgba);
        Form.getField(form, 'hex').each(function (hexField) {
          if (!Focusing.isFocused(hexField)) {
            Representing.setValue(form, { hex: hex.value });
          }
        });
        return hex;
      };
      var copyRgbToForm = function (form, rgb) {
        var red = rgb.red;
        var green = rgb.green;
        var blue = rgb.blue;
        Representing.setValue(form, {
          red: red,
          green: green,
          blue: blue
        });
      };
      var memPreview = record({
        dom: {
          tag: 'div',
          classes: [getClass('rgba-preview')],
          styles: { 'background-color': 'white' },
          attributes: { role: 'presentation' }
        }
      });
      var updatePreview = function (anyInSystem, hex) {
        memPreview.getOpt(anyInSystem).each(function (preview) {
          set$6(preview.element, 'background-color', '#' + hex.value);
        });
      };
      var factory = function () {
        var state = {
          red: Cell(Optional.some(255)),
          green: Cell(Optional.some(255)),
          blue: Cell(Optional.some(255)),
          hex: Cell(Optional.some('ffffff'))
        };
        var copyHexToRgb = function (form, hex) {
          var rgb = fromHex(hex);
          copyRgbToForm(form, rgb);
          setValueRgb(rgb);
        };
        var get = function (prop) {
          return state[prop].get();
        };
        var set = function (prop, value) {
          state[prop].set(value);
        };
        var getValueRgb = function () {
          return get('red').bind(function (red) {
            return get('green').bind(function (green) {
              return get('blue').map(function (blue) {
                return rgbaColour(red, green, blue, 1);
              });
            });
          });
        };
        var setValueRgb = function (rgb) {
          var red = rgb.red;
          var green = rgb.green;
          var blue = rgb.blue;
          set('red', Optional.some(red));
          set('green', Optional.some(green));
          set('blue', Optional.some(blue));
        };
        var onInvalidInput = function (form, simulatedEvent) {
          var data = simulatedEvent.event;
          if (data.type !== 'hex') {
            set(data.type, Optional.none());
          } else {
            onInvalidHexx(form);
          }
        };
        var onValidHex = function (form, value) {
          onValidHexx(form);
          var hex = hexColour(value);
          set('hex', Optional.some(value));
          var rgb = fromHex(hex);
          copyRgbToForm(form, rgb);
          setValueRgb(rgb);
          emitWith(form, fieldsUpdate, { hex: hex });
          updatePreview(form, hex);
        };
        var onValidRgb = function (form, prop, value) {
          var val = parseInt(value, 10);
          set(prop, Optional.some(val));
          getValueRgb().each(function (rgb) {
            var hex = copyRgbToHex(form, rgb);
            emitWith(form, fieldsUpdate, { hex: hex });
            updatePreview(form, hex);
          });
        };
        var isHexInputEvent = function (data) {
          return data.type === 'hex';
        };
        var onValidInput = function (form, simulatedEvent) {
          var data = simulatedEvent.event;
          if (isHexInputEvent(data)) {
            onValidHex(form, data.value);
          } else {
            onValidRgb(form, data.type, data.value);
          }
        };
        var formPartStrings = function (key) {
          return {
            label: translate(translatePrefix + key + '.label'),
            description: translate(translatePrefix + key + '.description')
          };
        };
        var redStrings = formPartStrings('red');
        var greenStrings = formPartStrings('green');
        var blueStrings = formPartStrings('blue');
        var hexStrings = formPartStrings('hex');
        return deepMerge(Form.sketch(function (parts) {
          return {
            dom: {
              tag: 'form',
              classes: [getClass('rgb-form')],
              attributes: { 'aria-label': translate('aria.color.picker') }
            },
            components: [
              parts.field('red', FormField.sketch(renderTextField(isRgbaComponent, 'red', redStrings.label, redStrings.description, 255))),
              parts.field('green', FormField.sketch(renderTextField(isRgbaComponent, 'green', greenStrings.label, greenStrings.description, 255))),
              parts.field('blue', FormField.sketch(renderTextField(isRgbaComponent, 'blue', blueStrings.label, blueStrings.description, 255))),
              parts.field('hex', FormField.sketch(renderTextField(isHexString, 'hex', hexStrings.label, hexStrings.description, 'ffffff'))),
              memPreview.asSpec()
            ],
            formBehaviours: derive$1([
              Invalidating.config({ invalidClass: getClass('form-invalid') }),
              config('rgb-form-events', [
                run$1(validInput, onValidInput),
                run$1(invalidInput, onInvalidInput),
                run$1(validatingInput, onInvalidInput)
              ])
            ])
          };
        }), {
          apis: {
            updateHex: function (form, hex) {
              Representing.setValue(form, { hex: hex.value });
              copyHexToRgb(form, hex);
              updatePreview(form, hex);
            }
          }
        });
      };
      var rgbFormSketcher = single({
        factory: factory,
        name: 'RgbForm',
        configFields: [],
        apis: {
          updateHex: function (apis, form, hex) {
            apis.updateHex(form, hex);
          }
        },
        extraApis: {}
      });
      return rgbFormSketcher;
    };

    var paletteFactory = function (_translate, getClass) {
      var spectrumPart = Slider.parts.spectrum({
        dom: {
          tag: 'canvas',
          attributes: { role: 'presentation' },
          classes: [getClass('sv-palette-spectrum')]
        }
      });
      var thumbPart = Slider.parts.thumb({
        dom: {
          tag: 'div',
          attributes: { role: 'presentation' },
          classes: [getClass('sv-palette-thumb')],
          innerHtml: '<div class=' + getClass('sv-palette-inner-thumb') + ' role="presentation"></div>'
        }
      });
      var setColour = function (canvas, rgba) {
        var width = canvas.width, height = canvas.height;
        var ctx = canvas.getContext('2d');
        if (ctx === null) {
          return;
        }
        ctx.fillStyle = rgba;
        ctx.fillRect(0, 0, width, height);
        var grdWhite = ctx.createLinearGradient(0, 0, width, 0);
        grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
        grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = grdWhite;
        ctx.fillRect(0, 0, width, height);
        var grdBlack = ctx.createLinearGradient(0, 0, 0, height);
        grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
        grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
        ctx.fillStyle = grdBlack;
        ctx.fillRect(0, 0, width, height);
      };
      var setPaletteHue = function (slider, hue) {
        var canvas = slider.components()[0].element.dom;
        var hsv = hsvColour(hue, 100, 100);
        var rgba = fromHsv(hsv);
        setColour(canvas, toString(rgba));
      };
      var setPaletteThumb = function (slider, hex) {
        var hsv = fromRgb(fromHex(hex));
        Slider.setValue(slider, {
          x: hsv.saturation,
          y: 100 - hsv.value
        });
      };
      var factory = function (_detail) {
        var getInitialValue = constant$1({
          x: 0,
          y: 0
        });
        var onChange = function (slider, _thumb, value) {
          emitWith(slider, paletteUpdate, { value: value });
        };
        var onInit = function (_slider, _thumb, spectrum, _value) {
          setColour(spectrum.element.dom, toString(red));
        };
        var sliderBehaviours = derive$1([
          Composing.config({ find: Optional.some }),
          Focusing.config({})
        ]);
        return Slider.sketch({
          dom: {
            tag: 'div',
            attributes: { role: 'presentation' },
            classes: [getClass('sv-palette')]
          },
          model: {
            mode: 'xy',
            getInitialValue: getInitialValue
          },
          rounded: false,
          components: [
            spectrumPart,
            thumbPart
          ],
          onChange: onChange,
          onInit: onInit,
          sliderBehaviours: sliderBehaviours
        });
      };
      var saturationBrightnessPaletteSketcher = single({
        factory: factory,
        name: 'SaturationBrightnessPalette',
        configFields: [],
        apis: {
          setHue: function (_apis, slider, hue) {
            setPaletteHue(slider, hue);
          },
          setThumb: function (_apis, slider, hex) {
            setPaletteThumb(slider, hex);
          }
        },
        extraApis: {}
      });
      return saturationBrightnessPaletteSketcher;
    };

    var makeFactory = function (translate, getClass) {
      var factory = function (detail) {
        var rgbForm = rgbFormFactory(translate, getClass, detail.onValidHex, detail.onInvalidHex);
        var sbPalette = paletteFactory(translate, getClass);
        var hueSliderToDegrees = function (hue) {
          return (100 - hue) / 100 * 360;
        };
        var hueDegreesToSlider = function (hue) {
          return 100 - hue / 360 * 100;
        };
        var state = {
          paletteRgba: Cell(red),
          paletteHue: Cell(0)
        };
        var memSlider = record(sliderFactory(translate, getClass));
        var memPalette = record(sbPalette.sketch({}));
        var memRgb = record(rgbForm.sketch({}));
        var updatePalette = function (anyInSystem, _hex, hue) {
          memPalette.getOpt(anyInSystem).each(function (palette) {
            sbPalette.setHue(palette, hue);
          });
        };
        var updateFields = function (anyInSystem, hex) {
          memRgb.getOpt(anyInSystem).each(function (form) {
            rgbForm.updateHex(form, hex);
          });
        };
        var updateSlider = function (anyInSystem, _hex, hue) {
          memSlider.getOpt(anyInSystem).each(function (slider) {
            Slider.setValue(slider, { y: hueDegreesToSlider(hue) });
          });
        };
        var updatePaletteThumb = function (anyInSystem, hex) {
          memPalette.getOpt(anyInSystem).each(function (palette) {
            sbPalette.setThumb(palette, hex);
          });
        };
        var updateState = function (hex, hue) {
          var rgba = fromHex(hex);
          state.paletteRgba.set(rgba);
          state.paletteHue.set(hue);
        };
        var runUpdates = function (anyInSystem, hex, hue, updates) {
          updateState(hex, hue);
          each$1(updates, function (update) {
            update(anyInSystem, hex, hue);
          });
        };
        var onPaletteUpdate = function () {
          var updates = [updateFields];
          return function (form, simulatedEvent) {
            var value = simulatedEvent.event.value;
            var oldHue = state.paletteHue.get();
            var newHsv = hsvColour(oldHue, value.x, 100 - value.y);
            var newHex = hsvToHex(newHsv);
            runUpdates(form, newHex, oldHue, updates);
          };
        };
        var onSliderUpdate = function () {
          var updates = [
            updatePalette,
            updateFields
          ];
          return function (form, simulatedEvent) {
            var hue = hueSliderToDegrees(simulatedEvent.event.value.y);
            var oldRgb = state.paletteRgba.get();
            var oldHsv = fromRgb(oldRgb);
            var newHsv = hsvColour(hue, oldHsv.saturation, oldHsv.value);
            var newHex = hsvToHex(newHsv);
            runUpdates(form, newHex, hue, updates);
          };
        };
        var onFieldsUpdate = function () {
          var updates = [
            updatePalette,
            updateSlider,
            updatePaletteThumb
          ];
          return function (form, simulatedEvent) {
            var hex = simulatedEvent.event.hex;
            var hsv = hexToHsv(hex);
            runUpdates(form, hex, hsv.hue, updates);
          };
        };
        return {
          uid: detail.uid,
          dom: detail.dom,
          components: [
            memPalette.asSpec(),
            memSlider.asSpec(),
            memRgb.asSpec()
          ],
          behaviours: derive$1([
            config('colour-picker-events', [
              run$1(fieldsUpdate, onFieldsUpdate()),
              run$1(paletteUpdate, onPaletteUpdate()),
              run$1(sliderUpdate, onSliderUpdate())
            ]),
            Composing.config({
              find: function (comp) {
                return memRgb.getOpt(comp);
              }
            }),
            Keying.config({ mode: 'acyclic' })
          ])
        };
      };
      var colourPickerSketcher = single({
        name: 'ColourPicker',
        configFields: [
          required$1('dom'),
          defaulted('onValidHex', noop),
          defaulted('onInvalidHex', noop)
        ],
        factory: factory
      });
      return colourPickerSketcher;
    };

    var self$1 = function () {
      return Composing.config({ find: Optional.some });
    };
    var memento$1 = function (mem) {
      return Composing.config({ find: mem.getOpt });
    };
    var childAt = function (index) {
      return Composing.config({
        find: function (comp) {
          return child$2(comp.element, index).bind(function (element) {
            return comp.getSystem().getByDom(element).toOptional();
          });
        }
      });
    };
    var ComposingConfigs = {
      self: self$1,
      memento: memento$1,
      childAt: childAt
    };

    var english = {
      'colorcustom.rgb.red.label': 'R',
      'colorcustom.rgb.red.description': 'Red component',
      'colorcustom.rgb.green.label': 'G',
      'colorcustom.rgb.green.description': 'Green component',
      'colorcustom.rgb.blue.label': 'B',
      'colorcustom.rgb.blue.description': 'Blue component',
      'colorcustom.rgb.hex.label': '#',
      'colorcustom.rgb.hex.description': 'Hex color code',
      'colorcustom.rgb.range': 'Range 0 to 255',
      'colorcustom.sb.saturation': 'Saturation',
      'colorcustom.sb.brightness': 'Brightness',
      'colorcustom.sb.picker': 'Saturation and Brightness Picker',
      'colorcustom.sb.palette': 'Saturation and Brightness Palette',
      'colorcustom.sb.instructions': 'Use arrow keys to select saturation and brightness, on x and y axes',
      'colorcustom.hue.hue': 'Hue',
      'colorcustom.hue.slider': 'Hue Slider',
      'colorcustom.hue.palette': 'Hue Palette',
      'colorcustom.hue.instructions': 'Use arrow keys to select a hue',
      'aria.color.picker': 'Color Picker',
      'aria.input.invalid': 'Invalid input'
    };
    var getEnglishText = function (key) {
      return english[key];
    };
    var translate$1 = function (key) {
      return getEnglishText(key);
    };
    var renderColorPicker = function (_spec) {
      var getClass = function (key) {
        return 'tox-' + key;
      };
      var colourPickerFactory = makeFactory(translate$1, getClass);
      var onValidHex = function (form) {
        emitWith(form, formActionEvent, {
          name: 'hex-valid',
          value: true
        });
      };
      var onInvalidHex = function (form) {
        emitWith(form, formActionEvent, {
          name: 'hex-valid',
          value: false
        });
      };
      var memPicker = record(colourPickerFactory.sketch({
        dom: {
          tag: 'div',
          classes: [getClass('color-picker-container')],
          attributes: { role: 'presentation' }
        },
        onValidHex: onValidHex,
        onInvalidHex: onInvalidHex
      }));
      return {
        dom: { tag: 'div' },
        components: [memPicker.asSpec()],
        behaviours: derive$1([
          Representing.config({
            store: {
              mode: 'manual',
              getValue: function (comp) {
                var picker = memPicker.get(comp);
                var optRgbForm = Composing.getCurrent(picker);
                var optHex = optRgbForm.bind(function (rgbForm) {
                  var formValues = Representing.getValue(rgbForm);
                  return formValues.hex;
                });
                return optHex.map(function (hex) {
                  return '#' + hex;
                }).getOr('');
              },
              setValue: function (comp, newValue) {
                var pattern = /^#([a-fA-F0-9]{3}(?:[a-fA-F0-9]{3})?)/;
                var m = pattern.exec(newValue);
                var picker = memPicker.get(comp);
                var optRgbForm = Composing.getCurrent(picker);
                optRgbForm.fold(function () {
                  console.log('Can not find form');
                }, function (rgbForm) {
                  Representing.setValue(rgbForm, { hex: Optional.from(m[1]).getOr('') });
                  Form.getField(rgbForm, 'hex').each(function (hexField) {
                    emit(hexField, input());
                  });
                });
              }
            }
          }),
          ComposingConfigs.self()
        ])
      };
    };

    var global$7 = tinymce.util.Tools.resolve('tinymce.Resource');

    var isOldCustomEditor = function (spec) {
      return has$2(spec, 'init');
    };
    var renderCustomEditor = function (spec) {
      var editorApi = value$1();
      var memReplaced = record({ dom: { tag: spec.tag } });
      var initialValue = value$1();
      return {
        dom: {
          tag: 'div',
          classes: ['tox-custom-editor']
        },
        behaviours: derive$1([
          config('custom-editor-events', [runOnAttached(function (component) {
              memReplaced.getOpt(component).each(function (ta) {
                (isOldCustomEditor(spec) ? spec.init(ta.element.dom) : global$7.load(spec.scriptId, spec.scriptUrl).then(function (init) {
                  return init(ta.element.dom, spec.settings);
                })).then(function (ea) {
                  initialValue.on(function (cvalue) {
                    ea.setValue(cvalue);
                  });
                  initialValue.clear();
                  editorApi.set(ea);
                });
              });
            })]),
          Representing.config({
            store: {
              mode: 'manual',
              getValue: function () {
                return editorApi.get().fold(function () {
                  return initialValue.get().getOr('');
                }, function (ed) {
                  return ed.getValue();
                });
              },
              setValue: function (component, value) {
                editorApi.get().fold(function () {
                  initialValue.set(value);
                }, function (ed) {
                  return ed.setValue(value);
                });
              }
            }
          }),
          ComposingConfigs.self()
        ]),
        components: [memReplaced.asSpec()]
      };
    };

    var global$6 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var processors = objOf([
      defaulted('preprocess', identity$1),
      defaulted('postprocess', identity$1)
    ]);
    var memento = function (mem, rawProcessors) {
      var ps = asRawOrDie$1('RepresentingConfigs.memento processors', processors, rawProcessors);
      return Representing.config({
        store: {
          mode: 'manual',
          getValue: function (comp) {
            var other = mem.get(comp);
            var rawValue = Representing.getValue(other);
            return ps.postprocess(rawValue);
          },
          setValue: function (comp, rawValue) {
            var newValue = ps.preprocess(rawValue);
            var other = mem.get(comp);
            Representing.setValue(other, newValue);
          }
        }
      });
    };
    var withComp = function (optInitialValue, getter, setter) {
      return Representing.config(deepMerge({
        store: {
          mode: 'manual',
          getValue: getter,
          setValue: setter
        }
      }, optInitialValue.map(function (initialValue) {
        return { store: { initialValue: initialValue } };
      }).getOr({})));
    };
    var withElement = function (initialValue, getter, setter) {
      return withComp(initialValue, function (c) {
        return getter(c.element);
      }, function (c, v) {
        return setter(c.element, v);
      });
    };
    var domValue = function (optInitialValue) {
      return withElement(optInitialValue, get$9, set$5);
    };
    var domHtml = function (optInitialValue) {
      return withElement(optInitialValue, get$d, set$8);
    };
    var memory = function (initialValue) {
      return Representing.config({
        store: {
          mode: 'memory',
          initialValue: initialValue
        }
      });
    };
    var RepresentingConfigs = {
      memento: memento,
      withElement: withElement,
      withComp: withComp,
      domValue: domValue,
      domHtml: domHtml,
      memory: memory
    };

    var defaultImageFileTypes = 'jpeg,jpg,jpe,jfi,jif,jfif,png,gif,bmp,webp';
    var filterByExtension = function (files, providersBackstage) {
      var allowedImageFileTypes = global$6.explode(providersBackstage.getSetting('images_file_types', defaultImageFileTypes, 'string'));
      var isFileInAllowedTypes = function (file) {
        return exists(allowedImageFileTypes, function (type) {
          return endsWith(file.name.toLowerCase(), '.' + type.toLowerCase());
        });
      };
      return filter$2(from(files), isFileInAllowedTypes);
    };
    var renderDropZone = function (spec, providersBackstage) {
      var stopper = function (_, se) {
        se.stop();
      };
      var sequence = function (actions) {
        return function (comp, se) {
          each$1(actions, function (a) {
            a(comp, se);
          });
        };
      };
      var onDrop = function (comp, se) {
        if (!Disabling.isDisabled(comp)) {
          var transferEvent = se.event.raw;
          handleFiles(comp, transferEvent.dataTransfer.files);
        }
      };
      var onSelect = function (component, simulatedEvent) {
        var input = simulatedEvent.event.raw.target;
        handleFiles(component, input.files);
      };
      var handleFiles = function (component, files) {
        Representing.setValue(component, filterByExtension(files, providersBackstage));
        emitWith(component, formChangeEvent, { name: spec.name });
      };
      var memInput = record({
        dom: {
          tag: 'input',
          attributes: {
            type: 'file',
            accept: 'image/*'
          },
          styles: { display: 'none' }
        },
        behaviours: derive$1([config('input-file-events', [
            cutter(click()),
            cutter(tap())
          ])])
      });
      var renderField = function (s) {
        return {
          uid: s.uid,
          dom: {
            tag: 'div',
            classes: ['tox-dropzone-container']
          },
          behaviours: derive$1([
            RepresentingConfigs.memory([]),
            ComposingConfigs.self(),
            Disabling.config({}),
            Toggling.config({
              toggleClass: 'dragenter',
              toggleOnExecute: false
            }),
            config('dropzone-events', [
              run$1('dragenter', sequence([
                stopper,
                Toggling.toggle
              ])),
              run$1('dragleave', sequence([
                stopper,
                Toggling.toggle
              ])),
              run$1('dragover', stopper),
              run$1('drop', sequence([
                stopper,
                onDrop
              ])),
              run$1(change(), onSelect)
            ])
          ]),
          components: [{
              dom: {
                tag: 'div',
                classes: ['tox-dropzone'],
                styles: {}
              },
              components: [
                {
                  dom: {
                    tag: 'p',
                    innerHtml: providersBackstage.translate('Drop an image here')
                  }
                },
                Button.sketch({
                  dom: {
                    tag: 'button',
                    innerHtml: providersBackstage.translate('Browse for an image'),
                    styles: { position: 'relative' },
                    classes: [
                      'tox-button',
                      'tox-button--secondary'
                    ]
                  },
                  components: [memInput.asSpec()],
                  action: function (comp) {
                    var inputComp = memInput.get(comp);
                    inputComp.element.dom.click();
                  },
                  buttonBehaviours: derive$1([
                    Tabstopping.config({}),
                    DisablingConfigs.button(providersBackstage.isDisabled),
                    receivingConfig()
                  ])
                })
              ]
            }]
        };
      };
      var pLabel = spec.label.map(function (label) {
        return renderLabel$2(label, providersBackstage);
      });
      var pField = FormField.parts.field({ factory: { sketch: renderField } });
      return renderFormFieldWith(pLabel, pField, ['tox-form__group--stretched'], []);
    };

    var renderGrid = function (spec, backstage) {
      return {
        dom: {
          tag: 'div',
          classes: [
            'tox-form__grid',
            'tox-form__grid--' + spec.columns + 'col'
          ]
        },
        components: map$2(spec.items, backstage.interpreter)
      };
    };

    var beforeObject = generate$6('alloy-fake-before-tabstop');
    var afterObject = generate$6('alloy-fake-after-tabstop');
    var craftWithClasses = function (classes) {
      return {
        dom: {
          tag: 'div',
          styles: {
            width: '1px',
            height: '1px',
            outline: 'none'
          },
          attributes: { tabindex: '0' },
          classes: classes
        },
        behaviours: derive$1([
          Focusing.config({ ignore: true }),
          Tabstopping.config({})
        ])
      };
    };
    var craft = function (spec) {
      return {
        dom: {
          tag: 'div',
          classes: ['tox-navobj']
        },
        components: [
          craftWithClasses([beforeObject]),
          spec,
          craftWithClasses([afterObject])
        ],
        behaviours: derive$1([ComposingConfigs.childAt(1)])
      };
    };
    var triggerTab = function (placeholder, shiftKey) {
      emitWith(placeholder, keydown(), {
        raw: {
          which: 9,
          shiftKey: shiftKey
        }
      });
    };
    var onFocus = function (container, targetComp) {
      var target = targetComp.element;
      if (has(target, beforeObject)) {
        triggerTab(container, true);
      } else if (has(target, afterObject)) {
        triggerTab(container, false);
      }
    };
    var isPseudoStop = function (element) {
      return closest(element, [
        '.' + beforeObject,
        '.' + afterObject
      ].join(','), never);
    };

    var platformNeedsSandboxing = !(detect$1().browser.isIE() || detect$1().browser.isEdge());
    var getDynamicSource = function (isSandbox) {
      var cachedValue = Cell('');
      return {
        getValue: function (_frameComponent) {
          return cachedValue.get();
        },
        setValue: function (frameComponent, html) {
          if (!isSandbox) {
            set$7(frameComponent.element, 'src', 'javascript:\'\'');
            var doc = frameComponent.element.dom.contentWindow.document;
            doc.open();
            doc.write(html);
            doc.close();
          } else {
            set$7(frameComponent.element, 'srcdoc', html);
          }
          cachedValue.set(html);
        }
      };
    };
    var renderIFrame = function (spec, providersBackstage) {
      var isSandbox = platformNeedsSandboxing && spec.sandboxed;
      var attributes = __assign(__assign({}, spec.label.map(function (title) {
        return { title: title };
      }).getOr({})), isSandbox ? { sandbox: 'allow-scripts allow-same-origin' } : {});
      var sourcing = getDynamicSource(isSandbox);
      var pLabel = spec.label.map(function (label) {
        return renderLabel$2(label, providersBackstage);
      });
      var factory = function (newSpec) {
        return craft({
          uid: newSpec.uid,
          dom: {
            tag: 'iframe',
            attributes: attributes
          },
          behaviours: derive$1([
            Tabstopping.config({}),
            Focusing.config({}),
            RepresentingConfigs.withComp(Optional.none(), sourcing.getValue, sourcing.setValue)
          ])
        });
      };
      var pField = FormField.parts.field({ factory: { sketch: factory } });
      return renderFormFieldWith(pLabel, pField, ['tox-form__group--stretched'], []);
    };

    var create$3 = function (width, height) {
      return resize$3(document.createElement('canvas'), width, height);
    };
    var clone = function (canvas) {
      var tCanvas = create$3(canvas.width, canvas.height);
      var ctx = get2dContext(tCanvas);
      ctx.drawImage(canvas, 0, 0);
      return tCanvas;
    };
    var get2dContext = function (canvas) {
      return canvas.getContext('2d');
    };
    var resize$3 = function (canvas, width, height) {
      canvas.width = width;
      canvas.height = height;
      return canvas;
    };

    var getWidth$1 = function (image) {
      return image.naturalWidth || image.width;
    };
    var getHeight$1 = function (image) {
      return image.naturalHeight || image.height;
    };

    var promise = function () {
      var Promise = function (fn) {
        if (typeof this !== 'object') {
          throw new TypeError('Promises must be constructed via new');
        }
        if (typeof fn !== 'function') {
          throw new TypeError('not a function');
        }
        this._state = null;
        this._value = null;
        this._deferreds = [];
        doResolve(fn, bind(resolve, this), bind(reject, this));
      };
      var anyWindow = window;
      var asap = Promise.immediateFn || typeof anyWindow.setImmediate === 'function' && anyWindow.setImmediate || function (fn) {
        return setTimeout(fn, 1);
      };
      var bind = function (fn, thisArg) {
        return function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          return fn.apply(thisArg, args);
        };
      };
      var isArray = Array.isArray || function (value) {
        return Object.prototype.toString.call(value) === '[object Array]';
      };
      function handle(deferred) {
        var me = this;
        if (this._state === null) {
          this._deferreds.push(deferred);
          return;
        }
        asap(function () {
          var cb = me._state ? deferred.onFulfilled : deferred.onRejected;
          if (cb === null) {
            (me._state ? deferred.resolve : deferred.reject)(me._value);
            return;
          }
          var ret;
          try {
            ret = cb(me._value);
          } catch (e) {
            deferred.reject(e);
            return;
          }
          deferred.resolve(ret);
        });
      }
      function resolve(newValue) {
        try {
          if (newValue === this) {
            throw new TypeError('A promise cannot be resolved with itself.');
          }
          if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
            var then = newValue.then;
            if (typeof then === 'function') {
              doResolve(bind(then, newValue), bind(resolve, this), bind(reject, this));
              return;
            }
          }
          this._state = true;
          this._value = newValue;
          finale.call(this);
        } catch (e) {
          reject.call(this, e);
        }
      }
      function reject(newValue) {
        this._state = false;
        this._value = newValue;
        finale.call(this);
      }
      function finale() {
        for (var _i = 0, _a = this._deferreds; _i < _a.length; _i++) {
          var deferred = _a[_i];
          handle.call(this, deferred);
        }
        this._deferreds = [];
      }
      function Handler(onFulfilled, onRejected, resolve, reject) {
        this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
        this.onRejected = typeof onRejected === 'function' ? onRejected : null;
        this.resolve = resolve;
        this.reject = reject;
      }
      var doResolve = function (fn, onFulfilled, onRejected) {
        var done = false;
        try {
          fn(function (value) {
            if (done) {
              return;
            }
            done = true;
            onFulfilled(value);
          }, function (reason) {
            if (done) {
              return;
            }
            done = true;
            onRejected(reason);
          });
        } catch (ex) {
          if (done) {
            return;
          }
          done = true;
          onRejected(ex);
        }
      };
      Promise.prototype.catch = function (onRejected) {
        return this.then(null, onRejected);
      };
      Promise.prototype.then = function (onFulfilled, onRejected) {
        var me = this;
        return new Promise(function (resolve, reject) {
          handle.call(me, new Handler(onFulfilled, onRejected, resolve, reject));
        });
      };
      Promise.all = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          values[_i] = arguments[_i];
        }
        var args = Array.prototype.slice.call(values.length === 1 && isArray(values[0]) ? values[0] : values);
        return new Promise(function (resolve, reject) {
          if (args.length === 0) {
            return resolve([]);
          }
          var remaining = args.length;
          var res = function (i, val) {
            try {
              if (val && (typeof val === 'object' || typeof val === 'function')) {
                var then = val.then;
                if (typeof then === 'function') {
                  then.call(val, function (val) {
                    res(i, val);
                  }, reject);
                  return;
                }
              }
              args[i] = val;
              if (--remaining === 0) {
                resolve(args);
              }
            } catch (ex) {
              reject(ex);
            }
          };
          for (var i = 0; i < args.length; i++) {
            res(i, args[i]);
          }
        });
      };
      Promise.resolve = function (value) {
        if (value && typeof value === 'object' && value.constructor === Promise) {
          return value;
        }
        return new Promise(function (resolve) {
          resolve(value);
        });
      };
      Promise.reject = function (reason) {
        return new Promise(function (resolve, reject) {
          reject(reason);
        });
      };
      Promise.race = function (values) {
        return new Promise(function (resolve, reject) {
          for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            value.then(resolve, reject);
          }
        });
      };
      return Promise;
    };
    var Promise$1 = window.Promise ? window.Promise : promise();

    var blobToImage = function (blob) {
      return new Promise$1(function (resolve, reject) {
        var blobUrl = URL.createObjectURL(blob);
        var image = new Image();
        var removeListeners = function () {
          image.removeEventListener('load', loaded);
          image.removeEventListener('error', error);
        };
        var loaded = function () {
          removeListeners();
          resolve(image);
        };
        var error = function () {
          removeListeners();
          reject('Unable to load data of type ' + blob.type + ': ' + blobUrl);
        };
        image.addEventListener('load', loaded);
        image.addEventListener('error', error);
        image.src = blobUrl;
        if (image.complete) {
          setTimeout(loaded, 0);
        }
      });
    };
    var dataUriToBlobSync = function (uri) {
      var data = uri.split(',');
      var matches = /data:([^;]+)/.exec(data[0]);
      if (!matches) {
        return Optional.none();
      }
      var mimetype = matches[1];
      var base64 = data[1];
      var sliceSize = 1024;
      var byteCharacters = atob(base64);
      var bytesLength = byteCharacters.length;
      var slicesCount = Math.ceil(bytesLength / sliceSize);
      var byteArrays = new Array(slicesCount);
      for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);
        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
          bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
      }
      return Optional.some(new Blob(byteArrays, { type: mimetype }));
    };
    var dataUriToBlob = function (uri) {
      return new Promise$1(function (resolve, reject) {
        dataUriToBlobSync(uri).fold(function () {
          reject('uri is not base64: ' + uri);
        }, resolve);
      });
    };
    var canvasToBlob = function (canvas, type, quality) {
      type = type || 'image/png';
      if (isFunction(HTMLCanvasElement.prototype.toBlob)) {
        return new Promise$1(function (resolve, reject) {
          canvas.toBlob(function (blob) {
            if (blob) {
              resolve(blob);
            } else {
              reject();
            }
          }, type, quality);
        });
      } else {
        return dataUriToBlob(canvas.toDataURL(type, quality));
      }
    };
    var canvasToDataURL = function (canvas, type, quality) {
      type = type || 'image/png';
      return canvas.toDataURL(type, quality);
    };
    var blobToCanvas = function (blob) {
      return blobToImage(blob).then(function (image) {
        revokeImageUrl(image);
        var canvas = create$3(getWidth$1(image), getHeight$1(image));
        var context = get2dContext(canvas);
        context.drawImage(image, 0, 0);
        return canvas;
      });
    };
    var blobToDataUri = function (blob) {
      return new Promise$1(function (resolve) {
        var reader = new FileReader();
        reader.onloadend = function () {
          resolve(reader.result);
        };
        reader.readAsDataURL(blob);
      });
    };
    var revokeImageUrl = function (image) {
      URL.revokeObjectURL(image.src);
    };

    var create$2 = function (getCanvas, blob, uri) {
      var initialType = blob.type;
      var getType = constant$1(initialType);
      var toBlob = function () {
        return Promise$1.resolve(blob);
      };
      var toDataURL = constant$1(uri);
      var toBase64 = function () {
        return uri.split(',')[1];
      };
      var toAdjustedBlob = function (type, quality) {
        return getCanvas.then(function (canvas) {
          return canvasToBlob(canvas, type, quality);
        });
      };
      var toAdjustedDataURL = function (type, quality) {
        return getCanvas.then(function (canvas) {
          return canvasToDataURL(canvas, type, quality);
        });
      };
      var toAdjustedBase64 = function (type, quality) {
        return toAdjustedDataURL(type, quality).then(function (dataurl) {
          return dataurl.split(',')[1];
        });
      };
      var toCanvas = function () {
        return getCanvas.then(clone);
      };
      return {
        getType: getType,
        toBlob: toBlob,
        toDataURL: toDataURL,
        toBase64: toBase64,
        toAdjustedBlob: toAdjustedBlob,
        toAdjustedDataURL: toAdjustedDataURL,
        toAdjustedBase64: toAdjustedBase64,
        toCanvas: toCanvas
      };
    };
    var fromBlob = function (blob) {
      return blobToDataUri(blob).then(function (uri) {
        return create$2(blobToCanvas(blob), blob, uri);
      });
    };
    var fromCanvas = function (canvas, type) {
      return canvasToBlob(canvas, type).then(function (blob) {
        return create$2(Promise$1.resolve(canvas), blob, canvas.toDataURL());
      });
    };

    var blobToImageResult = function (blob) {
      return fromBlob(blob);
    };

    var clamp = function (value, min, max) {
      var parsedValue = typeof value === 'string' ? parseFloat(value) : value;
      if (parsedValue > max) {
        parsedValue = max;
      } else if (parsedValue < min) {
        parsedValue = min;
      }
      return parsedValue;
    };
    var identity = function () {
      return [
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1
      ];
    };
    var DELTA_INDEX = [
      0,
      0.01,
      0.02,
      0.04,
      0.05,
      0.06,
      0.07,
      0.08,
      0.1,
      0.11,
      0.12,
      0.14,
      0.15,
      0.16,
      0.17,
      0.18,
      0.2,
      0.21,
      0.22,
      0.24,
      0.25,
      0.27,
      0.28,
      0.3,
      0.32,
      0.34,
      0.36,
      0.38,
      0.4,
      0.42,
      0.44,
      0.46,
      0.48,
      0.5,
      0.53,
      0.56,
      0.59,
      0.62,
      0.65,
      0.68,
      0.71,
      0.74,
      0.77,
      0.8,
      0.83,
      0.86,
      0.89,
      0.92,
      0.95,
      0.98,
      1,
      1.06,
      1.12,
      1.18,
      1.24,
      1.3,
      1.36,
      1.42,
      1.48,
      1.54,
      1.6,
      1.66,
      1.72,
      1.78,
      1.84,
      1.9,
      1.96,
      2,
      2.12,
      2.25,
      2.37,
      2.5,
      2.62,
      2.75,
      2.87,
      3,
      3.2,
      3.4,
      3.6,
      3.8,
      4,
      4.3,
      4.7,
      4.9,
      5,
      5.5,
      6,
      6.5,
      6.8,
      7,
      7.3,
      7.5,
      7.8,
      8,
      8.4,
      8.7,
      9,
      9.4,
      9.6,
      9.8,
      10
    ];
    var multiply = function (matrix1, matrix2) {
      var col = [];
      var out = new Array(25);
      var val;
      for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
          col[j] = matrix2[j + i * 5];
        }
        for (var j = 0; j < 5; j++) {
          val = 0;
          for (var k = 0; k < 5; k++) {
            val += matrix1[j + k * 5] * col[k];
          }
          out[j + i * 5] = val;
        }
      }
      return out;
    };
    var adjustContrast = function (matrix, value) {
      var x;
      value = clamp(value, -1, 1);
      value *= 100;
      if (value < 0) {
        x = 127 + value / 100 * 127;
      } else {
        x = value % 1;
        if (x === 0) {
          x = DELTA_INDEX[value];
        } else {
          x = DELTA_INDEX[Math.floor(value)] * (1 - x) + DELTA_INDEX[Math.floor(value) + 1] * x;
        }
        x = x * 127 + 127;
      }
      return multiply(matrix, [
        x / 127,
        0,
        0,
        0,
        0.5 * (127 - x),
        0,
        x / 127,
        0,
        0,
        0.5 * (127 - x),
        0,
        0,
        x / 127,
        0,
        0.5 * (127 - x),
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1
      ]);
    };
    var adjustBrightness = function (matrix, value) {
      value = clamp(255 * value, -255, 255);
      return multiply(matrix, [
        1,
        0,
        0,
        0,
        value,
        0,
        1,
        0,
        0,
        value,
        0,
        0,
        1,
        0,
        value,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1
      ]);
    };
    var adjustColors = function (matrix, adjustR, adjustG, adjustB) {
      adjustR = clamp(adjustR, 0, 2);
      adjustG = clamp(adjustG, 0, 2);
      adjustB = clamp(adjustB, 0, 2);
      return multiply(matrix, [
        adjustR,
        0,
        0,
        0,
        0,
        0,
        adjustG,
        0,
        0,
        0,
        0,
        0,
        adjustB,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1
      ]);
    };

    var colorFilter = function (ir, matrix) {
      return ir.toCanvas().then(function (canvas) {
        return applyColorFilter(canvas, ir.getType(), matrix);
      });
    };
    var applyColorFilter = function (canvas, type, matrix) {
      var context = get2dContext(canvas);
      var applyMatrix = function (pixelsData, m) {
        var r, g, b, a;
        var data = pixelsData.data, m0 = m[0], m1 = m[1], m2 = m[2], m3 = m[3], m4 = m[4], m5 = m[5], m6 = m[6], m7 = m[7], m8 = m[8], m9 = m[9], m10 = m[10], m11 = m[11], m12 = m[12], m13 = m[13], m14 = m[14], m15 = m[15], m16 = m[16], m17 = m[17], m18 = m[18], m19 = m[19];
        for (var i = 0; i < data.length; i += 4) {
          r = data[i];
          g = data[i + 1];
          b = data[i + 2];
          a = data[i + 3];
          data[i] = r * m0 + g * m1 + b * m2 + a * m3 + m4;
          data[i + 1] = r * m5 + g * m6 + b * m7 + a * m8 + m9;
          data[i + 2] = r * m10 + g * m11 + b * m12 + a * m13 + m14;
          data[i + 3] = r * m15 + g * m16 + b * m17 + a * m18 + m19;
        }
        return pixelsData;
      };
      var pixels = applyMatrix(context.getImageData(0, 0, canvas.width, canvas.height), matrix);
      context.putImageData(pixels, 0, 0);
      return fromCanvas(canvas, type);
    };
    var convoluteFilter = function (ir, matrix) {
      return ir.toCanvas().then(function (canvas) {
        return applyConvoluteFilter(canvas, ir.getType(), matrix);
      });
    };
    var applyConvoluteFilter = function (canvas, type, matrix) {
      var context = get2dContext(canvas);
      var applyMatrix = function (pIn, pOut, aMatrix) {
        var clamp = function (value, min, max) {
          if (value > max) {
            value = max;
          } else if (value < min) {
            value = min;
          }
          return value;
        };
        var side = Math.round(Math.sqrt(aMatrix.length));
        var halfSide = Math.floor(side / 2);
        var rgba = pIn.data;
        var drgba = pOut.data;
        var w = pIn.width;
        var h = pIn.height;
        for (var y = 0; y < h; y++) {
          for (var x = 0; x < w; x++) {
            var r = 0;
            var g = 0;
            var b = 0;
            for (var cy = 0; cy < side; cy++) {
              for (var cx = 0; cx < side; cx++) {
                var scx = clamp(x + cx - halfSide, 0, w - 1);
                var scy = clamp(y + cy - halfSide, 0, h - 1);
                var innerOffset = (scy * w + scx) * 4;
                var wt = aMatrix[cy * side + cx];
                r += rgba[innerOffset] * wt;
                g += rgba[innerOffset + 1] * wt;
                b += rgba[innerOffset + 2] * wt;
              }
            }
            var offset = (y * w + x) * 4;
            drgba[offset] = clamp(r, 0, 255);
            drgba[offset + 1] = clamp(g, 0, 255);
            drgba[offset + 2] = clamp(b, 0, 255);
          }
        }
        return pOut;
      };
      var pixelsIn = context.getImageData(0, 0, canvas.width, canvas.height);
      var pixelsOut = context.getImageData(0, 0, canvas.width, canvas.height);
      pixelsOut = applyMatrix(pixelsIn, pixelsOut, matrix);
      context.putImageData(pixelsOut, 0, 0);
      return fromCanvas(canvas, type);
    };
    var functionColorFilter = function (colorFn) {
      var filterImpl = function (canvas, type, value) {
        var context = get2dContext(canvas);
        var lookup = new Array(256);
        var applyLookup = function (pixelsData, lookupData) {
          var data = pixelsData.data;
          for (var i = 0; i < data.length; i += 4) {
            data[i] = lookupData[data[i]];
            data[i + 1] = lookupData[data[i + 1]];
            data[i + 2] = lookupData[data[i + 2]];
          }
          return pixelsData;
        };
        for (var i = 0; i < lookup.length; i++) {
          lookup[i] = colorFn(i, value);
        }
        var pixels = applyLookup(context.getImageData(0, 0, canvas.width, canvas.height), lookup);
        context.putImageData(pixels, 0, 0);
        return fromCanvas(canvas, type);
      };
      return function (ir, value) {
        return ir.toCanvas().then(function (canvas) {
          return filterImpl(canvas, ir.getType(), value);
        });
      };
    };
    var complexAdjustableColorFilter = function (matrixAdjustFn) {
      return function (ir, adjust) {
        return colorFilter(ir, matrixAdjustFn(identity(), adjust));
      };
    };
    var basicColorFilter = function (matrix) {
      return function (ir) {
        return colorFilter(ir, matrix);
      };
    };
    var basicConvolutionFilter = function (kernel) {
      return function (ir) {
        return convoluteFilter(ir, kernel);
      };
    };
    var invert$1 = basicColorFilter([
      -1,
      0,
      0,
      0,
      255,
      0,
      -1,
      0,
      0,
      255,
      0,
      0,
      -1,
      0,
      255,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      1
    ]);
    var brightness$1 = complexAdjustableColorFilter(adjustBrightness);
    var contrast$1 = complexAdjustableColorFilter(adjustContrast);
    var colorize$1 = function (ir, adjustR, adjustG, adjustB) {
      return colorFilter(ir, adjustColors(identity(), adjustR, adjustG, adjustB));
    };
    var sharpen$1 = basicConvolutionFilter([
      0,
      -1,
      0,
      -1,
      5,
      -1,
      0,
      -1,
      0
    ]);
    var gamma$1 = functionColorFilter(function (color, value) {
      return Math.pow(color / 255, 1 - value) * 255;
    });

    var scale = function (image, dW, dH) {
      var sW = getWidth$1(image);
      var sH = getHeight$1(image);
      var wRatio = dW / sW;
      var hRatio = dH / sH;
      var scaleCapped = false;
      if (wRatio < 0.5 || wRatio > 2) {
        wRatio = wRatio < 0.5 ? 0.5 : 2;
        scaleCapped = true;
      }
      if (hRatio < 0.5 || hRatio > 2) {
        hRatio = hRatio < 0.5 ? 0.5 : 2;
        scaleCapped = true;
      }
      var scaled = _scale(image, wRatio, hRatio);
      return !scaleCapped ? scaled : scaled.then(function (tCanvas) {
        return scale(tCanvas, dW, dH);
      });
    };
    var _scale = function (image, wRatio, hRatio) {
      return new Promise$1(function (resolve) {
        var sW = getWidth$1(image);
        var sH = getHeight$1(image);
        var dW = Math.floor(sW * wRatio);
        var dH = Math.floor(sH * hRatio);
        var canvas = create$3(dW, dH);
        var context = get2dContext(canvas);
        context.drawImage(image, 0, 0, sW, sH, 0, 0, dW, dH);
        resolve(canvas);
      });
    };

    var ceilWithPrecision = function (num, precision) {
      if (precision === void 0) {
        precision = 2;
      }
      var mul = Math.pow(10, precision);
      var upper = Math.round(num * mul);
      return Math.ceil(upper / mul);
    };
    var rotate$1 = function (ir, angle) {
      return ir.toCanvas().then(function (canvas) {
        return applyRotate(canvas, ir.getType(), angle);
      });
    };
    var applyRotate = function (image, type, angle) {
      var degrees = angle < 0 ? 360 + angle : angle;
      var rad = degrees * Math.PI / 180;
      var width = image.width;
      var height = image.height;
      var sin = Math.sin(rad);
      var cos = Math.cos(rad);
      var newWidth = ceilWithPrecision(Math.abs(width * cos) + Math.abs(height * sin));
      var newHeight = ceilWithPrecision(Math.abs(width * sin) + Math.abs(height * cos));
      var canvas = create$3(newWidth, newHeight);
      var context = get2dContext(canvas);
      context.translate(newWidth / 2, newHeight / 2);
      context.rotate(rad);
      context.drawImage(image, -width / 2, -height / 2);
      return fromCanvas(canvas, type);
    };
    var flip$1 = function (ir, axis) {
      return ir.toCanvas().then(function (canvas) {
        return applyFlip(canvas, ir.getType(), axis);
      });
    };
    var applyFlip = function (image, type, axis) {
      var canvas = create$3(image.width, image.height);
      var context = get2dContext(canvas);
      if (axis === 'v') {
        context.scale(1, -1);
        context.drawImage(image, 0, -canvas.height);
      } else {
        context.scale(-1, 1);
        context.drawImage(image, -canvas.width, 0);
      }
      return fromCanvas(canvas, type);
    };
    var crop$1 = function (ir, x, y, w, h) {
      return ir.toCanvas().then(function (canvas) {
        return applyCrop(canvas, ir.getType(), x, y, w, h);
      });
    };
    var applyCrop = function (image, type, x, y, w, h) {
      var canvas = create$3(w, h);
      var context = get2dContext(canvas);
      context.drawImage(image, -x, -y);
      return fromCanvas(canvas, type);
    };
    var resize$2 = function (ir, w, h) {
      return ir.toCanvas().then(function (canvas) {
        return scale(canvas, w, h).then(function (newCanvas) {
          return fromCanvas(newCanvas, ir.getType());
        });
      });
    };

    var invert = function (ir) {
      return invert$1(ir);
    };
    var sharpen = function (ir) {
      return sharpen$1(ir);
    };
    var gamma = function (ir, value) {
      return gamma$1(ir, value);
    };
    var colorize = function (ir, adjustR, adjustG, adjustB) {
      return colorize$1(ir, adjustR, adjustG, adjustB);
    };
    var brightness = function (ir, adjust) {
      return brightness$1(ir, adjust);
    };
    var contrast = function (ir, adjust) {
      return contrast$1(ir, adjust);
    };
    var flip = function (ir, axis) {
      return flip$1(ir, axis);
    };
    var crop = function (ir, x, y, w, h) {
      return crop$1(ir, x, y, w, h);
    };
    var resize$1 = function (ir, w, h) {
      return resize$2(ir, w, h);
    };
    var rotate = function (ir, angle) {
      return rotate$1(ir, angle);
    };

    var renderIcon = function (iconName, iconsProvider, behaviours) {
      return render$3(iconName, {
        tag: 'span',
        classes: [
          'tox-icon',
          'tox-tbtn__icon-wrap'
        ],
        behaviours: behaviours
      }, iconsProvider);
    };
    var renderIconFromPack = function (iconName, iconsProvider) {
      return renderIcon(iconName, iconsProvider, []);
    };
    var renderReplacableIconFromPack = function (iconName, iconsProvider) {
      return renderIcon(iconName, iconsProvider, [Replacing.config({})]);
    };
    var renderLabel$1 = function (text, prefix, providersBackstage) {
      return {
        dom: {
          tag: 'span',
          innerHtml: providersBackstage.translate(text),
          classes: [prefix + '__select-label']
        },
        behaviours: derive$1([Replacing.config({})])
      };
    };

    var _a;
    var internalToolbarButtonExecute = generate$6('toolbar.button.execute');
    var onToolbarButtonExecute = function (info) {
      return runOnExecute$1(function (comp, _simulatedEvent) {
        runWithApi(info, comp)(function (itemApi) {
          emitWith(comp, internalToolbarButtonExecute, { buttonApi: itemApi });
          info.onAction(itemApi);
        });
      });
    };
    var toolbarButtonEventOrder = (_a = {}, _a[execute$5()] = [
      'disabling',
      'alloy.base.behaviour',
      'toggling',
      'toolbar-button-events'
    ], _a);

    var updateMenuText = generate$6('update-menu-text');
    var updateMenuIcon = generate$6('update-menu-icon');
    var renderCommonDropdown = function (spec, prefix, sharedBackstage) {
      var editorOffCell = Cell(noop);
      var optMemDisplayText = spec.text.map(function (text) {
        return record(renderLabel$1(text, prefix, sharedBackstage.providers));
      });
      var optMemDisplayIcon = spec.icon.map(function (iconName) {
        return record(renderReplacableIconFromPack(iconName, sharedBackstage.providers.icons));
      });
      var onLeftOrRightInMenu = function (comp, se) {
        var dropdown = Representing.getValue(comp);
        Focusing.focus(dropdown);
        emitWith(dropdown, 'keydown', { raw: se.event.raw });
        Dropdown.close(dropdown);
        return Optional.some(true);
      };
      var role = spec.role.fold(function () {
        return {};
      }, function (role) {
        return { role: role };
      });
      var tooltipAttributes = spec.tooltip.fold(function () {
        return {};
      }, function (tooltip) {
        var translatedTooltip = sharedBackstage.providers.translate(tooltip);
        return {
          'title': translatedTooltip,
          'aria-label': translatedTooltip
        };
      });
      var iconSpec = render$3('chevron-down', {
        tag: 'div',
        classes: [prefix + '__select-chevron']
      }, sharedBackstage.providers.icons);
      var memDropdown = record(Dropdown.sketch(__assign(__assign(__assign({}, spec.uid ? { uid: spec.uid } : {}), role), {
        dom: {
          tag: 'button',
          classes: [
            prefix,
            prefix + '--select'
          ].concat(map$2(spec.classes, function (c) {
            return prefix + '--' + c;
          })),
          attributes: __assign({}, tooltipAttributes)
        },
        components: componentRenderPipeline([
          optMemDisplayIcon.map(function (mem) {
            return mem.asSpec();
          }),
          optMemDisplayText.map(function (mem) {
            return mem.asSpec();
          }),
          Optional.some(iconSpec)
        ]),
        matchWidth: true,
        useMinWidth: true,
        dropdownBehaviours: derive$1(__spreadArray(__spreadArray([], spec.dropdownBehaviours), [
          DisablingConfigs.button(function () {
            return spec.disabled || sharedBackstage.providers.isDisabled();
          }),
          receivingConfig(),
          Unselecting.config({}),
          Replacing.config({}),
          config('dropdown-events', [
            onControlAttached(spec, editorOffCell),
            onControlDetached(spec, editorOffCell)
          ]),
          config('menubutton-update-display-text', [
            run$1(updateMenuText, function (comp, se) {
              optMemDisplayText.bind(function (mem) {
                return mem.getOpt(comp);
              }).each(function (displayText) {
                Replacing.set(displayText, [text(sharedBackstage.providers.translate(se.event.text))]);
              });
            }),
            run$1(updateMenuIcon, function (comp, se) {
              optMemDisplayIcon.bind(function (mem) {
                return mem.getOpt(comp);
              }).each(function (displayIcon) {
                Replacing.set(displayIcon, [renderReplacableIconFromPack(se.event.icon, sharedBackstage.providers.icons)]);
              });
            })
          ])
        ])),
        eventOrder: deepMerge(toolbarButtonEventOrder, {
          mousedown: [
            'focusing',
            'alloy.base.behaviour',
            'item-type-events',
            'normal-dropdown-events'
          ]
        }),
        sandboxBehaviours: derive$1([Keying.config({
            mode: 'special',
            onLeft: onLeftOrRightInMenu,
            onRight: onLeftOrRightInMenu
          })]),
        lazySink: sharedBackstage.getSink,
        toggleClass: prefix + '--active',
        parts: { menu: part(false, spec.columns, spec.presets) },
        fetch: function (comp) {
          return Future.nu(curry(spec.fetch, comp));
        }
      })));
      return memDropdown.asSpec();
    };

    var isMenuItemReference = function (item) {
      return isString(item);
    };
    var isSeparator$1 = function (item) {
      return item.type === 'separator';
    };
    var isExpandingMenuItem = function (item) {
      return has$2(item, 'getSubmenuItems');
    };
    var separator$2 = { type: 'separator' };
    var unwrapReferences = function (items, menuItems) {
      var realItems = foldl(items, function (acc, item) {
        if (isMenuItemReference(item)) {
          if (item === '') {
            return acc;
          } else if (item === '|') {
            return acc.length > 0 && !isSeparator$1(acc[acc.length - 1]) ? acc.concat([separator$2]) : acc;
          } else if (has$2(menuItems, item.toLowerCase())) {
            return acc.concat([menuItems[item.toLowerCase()]]);
          } else {
            return acc;
          }
        } else {
          return acc.concat([item]);
        }
      }, []);
      if (realItems.length > 0 && isSeparator$1(realItems[realItems.length - 1])) {
        realItems.pop();
      }
      return realItems;
    };
    var getFromExpandingItem = function (item, menuItems) {
      var submenuItems = item.getSubmenuItems();
      var rest = expand(submenuItems, menuItems);
      var newMenus = deepMerge(rest.menus, wrap$1(item.value, rest.items));
      var newExpansions = deepMerge(rest.expansions, wrap$1(item.value, item.value));
      return {
        item: item,
        menus: newMenus,
        expansions: newExpansions
      };
    };
    var getFromItem = function (item, menuItems) {
      return isExpandingMenuItem(item) ? getFromExpandingItem(item, menuItems) : {
        item: item,
        menus: {},
        expansions: {}
      };
    };
    var generateValueIfRequired = function (item) {
      if (isSeparator$1(item)) {
        return item;
      } else {
        var itemValue = get$e(item, 'value').getOrThunk(function () {
          return generate$6('generated-menu-item');
        });
        return deepMerge({ value: itemValue }, item);
      }
    };
    var expand = function (items, menuItems) {
      var realItems = unwrapReferences(isString(items) ? items.split(' ') : items, menuItems);
      return foldr(realItems, function (acc, item) {
        var itemWithValue = generateValueIfRequired(item);
        var newData = getFromItem(itemWithValue, menuItems);
        return {
          menus: deepMerge(acc.menus, newData.menus),
          items: [newData.item].concat(acc.items),
          expansions: deepMerge(acc.expansions, newData.expansions)
        };
      }, {
        menus: {},
        expansions: {},
        items: []
      });
    };

    var build = function (items, itemResponse, backstage, isHorizontalMenu) {
      var primary = generate$6('primary-menu');
      var data = expand(items, backstage.shared.providers.menuItems());
      if (data.items.length === 0) {
        return Optional.none();
      }
      var mainMenu = createPartialMenu(primary, data.items, itemResponse, backstage, isHorizontalMenu);
      var submenus = map(data.menus, function (menuItems, menuName) {
        return createPartialMenu(menuName, menuItems, itemResponse, backstage, false);
      });
      var menus = deepMerge(submenus, wrap$1(primary, mainMenu));
      return Optional.from(tieredMenu.tieredData(primary, menus, data.expansions));
    };

    var getMenuButtonApi = function (component) {
      return {
        isDisabled: function () {
          return Disabling.isDisabled(component);
        },
        setDisabled: function (state) {
          return Disabling.set(component, state);
        },
        setActive: function (state) {
          var elm = component.element;
          if (state) {
            add$2(elm, 'tox-tbtn--enabled');
            set$7(elm, 'aria-pressed', true);
          } else {
            remove$3(elm, 'tox-tbtn--enabled');
            remove$6(elm, 'aria-pressed');
          }
        },
        isActive: function () {
          return has(component.element, 'tox-tbtn--enabled');
        }
      };
    };
    var renderMenuButton = function (spec, prefix, backstage, role) {
      return renderCommonDropdown({
        text: spec.text,
        icon: spec.icon,
        tooltip: spec.tooltip,
        role: role,
        fetch: function (_comp, callback) {
          spec.fetch(function (items) {
            callback(build(items, ItemResponse$1.CLOSE_ON_EXECUTE, backstage, false));
          });
        },
        onSetup: spec.onSetup,
        getApi: getMenuButtonApi,
        columns: 1,
        presets: 'normal',
        classes: [],
        dropdownBehaviours: [Tabstopping.config({})]
      }, prefix, backstage.shared);
    };
    var getFetch = function (items, getButton, backstage) {
      var getMenuItemAction = function (item) {
        return function (api) {
          var newValue = !api.isActive();
          api.setActive(newValue);
          item.storage.set(newValue);
          backstage.shared.getSink().each(function (sink) {
            getButton().getOpt(sink).each(function (orig) {
              focus$3(orig.element);
              emitWith(orig, formActionEvent, {
                name: item.name,
                value: item.storage.get()
              });
            });
          });
        };
      };
      var getMenuItemSetup = function (item) {
        return function (api) {
          api.setActive(item.storage.get());
        };
      };
      return function (success) {
        success(map$2(items, function (item) {
          var text = item.text.fold(function () {
            return {};
          }, function (text) {
            return { text: text };
          });
          return __assign(__assign({
            type: item.type,
            active: false
          }, text), {
            onAction: getMenuItemAction(item),
            onSetup: getMenuItemSetup(item)
          });
        }));
      };
    };

    var renderCommonSpec = function (spec, actionOpt, extraBehaviours, dom, components, providersBackstage) {
      if (extraBehaviours === void 0) {
        extraBehaviours = [];
      }
      var action = actionOpt.fold(function () {
        return {};
      }, function (action) {
        return { action: action };
      });
      var common = __assign({
        buttonBehaviours: derive$1([
          DisablingConfigs.button(function () {
            return spec.disabled || providersBackstage.isDisabled();
          }),
          receivingConfig(),
          Tabstopping.config({}),
          config('button press', [
            preventDefault('click'),
            preventDefault('mousedown')
          ])
        ].concat(extraBehaviours)),
        eventOrder: {
          click: [
            'button press',
            'alloy.base.behaviour'
          ],
          mousedown: [
            'button press',
            'alloy.base.behaviour'
          ]
        }
      }, action);
      var domFinal = deepMerge(common, { dom: dom });
      return deepMerge(domFinal, { components: components });
    };
    var renderIconButtonSpec = function (spec, action, providersBackstage, extraBehaviours) {
      if (extraBehaviours === void 0) {
        extraBehaviours = [];
      }
      var tooltipAttributes = spec.tooltip.map(function (tooltip) {
        return {
          'aria-label': providersBackstage.translate(tooltip),
          'title': providersBackstage.translate(tooltip)
        };
      }).getOr({});
      var dom = {
        tag: 'button',
        classes: ['tox-tbtn'],
        attributes: tooltipAttributes
      };
      var icon = spec.icon.map(function (iconName) {
        return renderIconFromPack(iconName, providersBackstage.icons);
      });
      var components = componentRenderPipeline([icon]);
      return renderCommonSpec(spec, action, extraBehaviours, dom, components, providersBackstage);
    };
    var renderIconButton = function (spec, action, providersBackstage, extraBehaviours) {
      if (extraBehaviours === void 0) {
        extraBehaviours = [];
      }
      var iconButtonSpec = renderIconButtonSpec(spec, Optional.some(action), providersBackstage, extraBehaviours);
      return Button.sketch(iconButtonSpec);
    };
    var renderButtonSpec = function (spec, action, providersBackstage, extraBehaviours, extraClasses) {
      if (extraBehaviours === void 0) {
        extraBehaviours = [];
      }
      if (extraClasses === void 0) {
        extraClasses = [];
      }
      var translatedText = providersBackstage.translate(spec.text);
      var icon = spec.icon ? spec.icon.map(function (iconName) {
        return renderIconFromPack(iconName, providersBackstage.icons);
      }) : Optional.none();
      var components = icon.isSome() ? componentRenderPipeline([icon]) : [];
      var innerHtml = icon.isSome() ? {} : { innerHtml: translatedText };
      var classes = __spreadArray(__spreadArray(__spreadArray(__spreadArray([], !spec.primary && !spec.borderless ? [
        'tox-button',
        'tox-button--secondary'
      ] : ['tox-button']), icon.isSome() ? ['tox-button--icon'] : []), spec.borderless ? ['tox-button--naked'] : []), extraClasses);
      var dom = __assign(__assign({
        tag: 'button',
        classes: classes
      }, innerHtml), { attributes: { title: translatedText } });
      return renderCommonSpec(spec, action, extraBehaviours, dom, components, providersBackstage);
    };
    var renderButton = function (spec, action, providersBackstage, extraBehaviours, extraClasses) {
      if (extraBehaviours === void 0) {
        extraBehaviours = [];
      }
      if (extraClasses === void 0) {
        extraClasses = [];
      }
      var buttonSpec = renderButtonSpec(spec, Optional.some(action), providersBackstage, extraBehaviours, extraClasses);
      return Button.sketch(buttonSpec);
    };
    var getAction = function (name, buttonType) {
      return function (comp) {
        if (buttonType === 'custom') {
          emitWith(comp, formActionEvent, {
            name: name,
            value: {}
          });
        } else if (buttonType === 'submit') {
          emit(comp, formSubmitEvent);
        } else if (buttonType === 'cancel') {
          emit(comp, formCancelEvent);
        } else {
          console.error('Unknown button type: ', buttonType);
        }
      };
    };
    var isMenuFooterButtonSpec = function (spec, buttonType) {
      return buttonType === 'menu';
    };
    var isNormalFooterButtonSpec = function (spec, buttonType) {
      return buttonType === 'custom' || buttonType === 'cancel' || buttonType === 'submit';
    };
    var renderFooterButton = function (spec, buttonType, backstage) {
      if (isMenuFooterButtonSpec(spec, buttonType)) {
        var getButton = function () {
          return memButton_1;
        };
        var menuButtonSpec = spec;
        var fixedSpec = __assign(__assign({}, spec), {
          onSetup: function (api) {
            api.setDisabled(spec.disabled);
            return noop;
          },
          fetch: getFetch(menuButtonSpec.items, getButton, backstage)
        });
        var memButton_1 = record(renderMenuButton(fixedSpec, 'tox-tbtn', backstage, Optional.none()));
        return memButton_1.asSpec();
      } else if (isNormalFooterButtonSpec(spec, buttonType)) {
        var action = getAction(spec.name, buttonType);
        var buttonSpec = __assign(__assign({}, spec), { borderless: false });
        return renderButton(buttonSpec, action, backstage.shared.providers, []);
      } else {
        console.error('Unknown footer button type: ', buttonType);
      }
    };
    var renderDialogButton = function (spec, providersBackstage) {
      var action = getAction(spec.name, 'custom');
      return renderFormField(Optional.none(), FormField.parts.field(__assign({ factory: Button }, renderButtonSpec(spec, Optional.some(action), providersBackstage, [
        RepresentingConfigs.memory(''),
        ComposingConfigs.self()
      ]))));
    };

    var schema$h = constant$1([
      defaulted('field1Name', 'field1'),
      defaulted('field2Name', 'field2'),
      onStrictHandler('onLockedChange'),
      markers$1(['lockClass']),
      defaulted('locked', false),
      SketchBehaviours.field('coupledFieldBehaviours', [
        Composing,
        Representing
      ])
    ]);
    var getField = function (comp, detail, partName) {
      return getPart(comp, detail, partName).bind(Composing.getCurrent);
    };
    var coupledPart = function (selfName, otherName) {
      return required({
        factory: FormField,
        name: selfName,
        overrides: function (detail) {
          return {
            fieldBehaviours: derive$1([config('coupled-input-behaviour', [run$1(input(), function (me) {
                  getField(me, detail, otherName).each(function (other) {
                    getPart(me, detail, 'lock').each(function (lock) {
                      if (Toggling.isOn(lock)) {
                        detail.onLockedChange(me, other, lock);
                      }
                    });
                  });
                })])])
          };
        }
      });
    };
    var parts$c = constant$1([
      coupledPart('field1', 'field2'),
      coupledPart('field2', 'field1'),
      required({
        factory: Button,
        schema: [required$1('dom')],
        name: 'lock',
        overrides: function (detail) {
          return {
            buttonBehaviours: derive$1([Toggling.config({
                selected: detail.locked,
                toggleClass: detail.markers.lockClass,
                aria: { mode: 'pressed' }
              })])
          };
        }
      })
    ]);

    var factory$f = function (detail, components, _spec, _externals) {
      return {
        uid: detail.uid,
        dom: detail.dom,
        components: components,
        behaviours: SketchBehaviours.augment(detail.coupledFieldBehaviours, [
          Composing.config({ find: Optional.some }),
          Representing.config({
            store: {
              mode: 'manual',
              getValue: function (comp) {
                var _a;
                var parts = getPartsOrDie(comp, detail, [
                  'field1',
                  'field2'
                ]);
                return _a = {}, _a[detail.field1Name] = Representing.getValue(parts.field1()), _a[detail.field2Name] = Representing.getValue(parts.field2()), _a;
              },
              setValue: function (comp, value) {
                var parts = getPartsOrDie(comp, detail, [
                  'field1',
                  'field2'
                ]);
                if (hasNonNullableKey(value, detail.field1Name)) {
                  Representing.setValue(parts.field1(), value[detail.field1Name]);
                }
                if (hasNonNullableKey(value, detail.field2Name)) {
                  Representing.setValue(parts.field2(), value[detail.field2Name]);
                }
              }
            }
          })
        ]),
        apis: {
          getField1: function (component) {
            return getPart(component, detail, 'field1');
          },
          getField2: function (component) {
            return getPart(component, detail, 'field2');
          },
          getLock: function (component) {
            return getPart(component, detail, 'lock');
          }
        }
      };
    };
    var FormCoupledInputs = composite({
      name: 'FormCoupledInputs',
      configFields: schema$h(),
      partFields: parts$c(),
      factory: factory$f,
      apis: {
        getField1: function (apis, component) {
          return apis.getField1(component);
        },
        getField2: function (apis, component) {
          return apis.getField2(component);
        },
        getLock: function (apis, component) {
          return apis.getLock(component);
        }
      }
    });

    var formatSize = function (size) {
      var unitDec = {
        '': 0,
        'px': 0,
        'pt': 1,
        'mm': 1,
        'pc': 2,
        'ex': 2,
        'em': 2,
        'ch': 2,
        'rem': 2,
        'cm': 3,
        'in': 4,
        '%': 4
      };
      var maxDecimal = function (unit) {
        return unit in unitDec ? unitDec[unit] : 1;
      };
      var numText = size.value.toFixed(maxDecimal(size.unit));
      if (numText.indexOf('.') !== -1) {
        numText = numText.replace(/\.?0*$/, '');
      }
      return numText + size.unit;
    };
    var parseSize = function (sizeText) {
      var numPattern = /^\s*(\d+(?:\.\d+)?)\s*(|cm|mm|in|px|pt|pc|em|ex|ch|rem|vw|vh|vmin|vmax|%)\s*$/;
      var match = numPattern.exec(sizeText);
      if (match !== null) {
        var value = parseFloat(match[1]);
        var unit = match[2];
        return Result.value({
          value: value,
          unit: unit
        });
      } else {
        return Result.error(sizeText);
      }
    };
    var convertUnit = function (size, unit) {
      var inInch = {
        '': 96,
        'px': 96,
        'pt': 72,
        'cm': 2.54,
        'pc': 12,
        'mm': 25.4,
        'in': 1
      };
      var supported = function (u) {
        return has$2(inInch, u);
      };
      if (size.unit === unit) {
        return Optional.some(size.value);
      } else if (supported(size.unit) && supported(unit)) {
        if (inInch[size.unit] === inInch[unit]) {
          return Optional.some(size.value);
        } else {
          return Optional.some(size.value / inInch[size.unit] * inInch[unit]);
        }
      } else {
        return Optional.none();
      }
    };
    var noSizeConversion = function (_input) {
      return Optional.none();
    };
    var ratioSizeConversion = function (scale, unit) {
      return function (size) {
        return convertUnit(size, unit).map(function (value) {
          return {
            value: value * scale,
            unit: unit
          };
        });
      };
    };
    var makeRatioConverter = function (currentFieldText, otherFieldText) {
      var cValue = parseSize(currentFieldText).toOptional();
      var oValue = parseSize(otherFieldText).toOptional();
      return lift2(cValue, oValue, function (cSize, oSize) {
        return convertUnit(cSize, oSize.unit).map(function (val) {
          return oSize.value / val;
        }).map(function (r) {
          return ratioSizeConversion(r, oSize.unit);
        }).getOr(noSizeConversion);
      }).getOr(noSizeConversion);
    };

    var renderSizeInput = function (spec, providersBackstage) {
      var converter = noSizeConversion;
      var ratioEvent = generate$6('ratio-event');
      var makeIcon = function (iconName) {
        return render$3(iconName, {
          tag: 'span',
          classes: [
            'tox-icon',
            'tox-lock-icon__' + iconName
          ]
        }, providersBackstage.icons);
      };
      var pLock = FormCoupledInputs.parts.lock({
        dom: {
          tag: 'button',
          classes: [
            'tox-lock',
            'tox-button',
            'tox-button--naked',
            'tox-button--icon'
          ],
          attributes: { title: providersBackstage.translate(spec.label.getOr('Constrain proportions')) }
        },
        components: [
          makeIcon('lock'),
          makeIcon('unlock')
        ],
        buttonBehaviours: derive$1([
          Disabling.config({
            disabled: function () {
              return spec.disabled || providersBackstage.isDisabled();
            }
          }),
          receivingConfig(),
          Tabstopping.config({})
        ])
      });
      var formGroup = function (components) {
        return {
          dom: {
            tag: 'div',
            classes: ['tox-form__group']
          },
          components: components
        };
      };
      var getFieldPart = function (isField1) {
        return FormField.parts.field({
          factory: Input,
          inputClasses: ['tox-textfield'],
          inputBehaviours: derive$1([
            Disabling.config({
              disabled: function () {
                return spec.disabled || providersBackstage.isDisabled();
              }
            }),
            receivingConfig(),
            Tabstopping.config({}),
            config('size-input-events', [
              run$1(focusin(), function (component, _simulatedEvent) {
                emitWith(component, ratioEvent, { isField1: isField1 });
              }),
              run$1(change(), function (component, _simulatedEvent) {
                emitWith(component, formChangeEvent, { name: spec.name });
              })
            ])
          ]),
          selectOnFocus: false
        });
      };
      var getLabel = function (label) {
        return {
          dom: {
            tag: 'label',
            classes: ['tox-label'],
            innerHtml: providersBackstage.translate(label)
          }
        };
      };
      var widthField = FormCoupledInputs.parts.field1(formGroup([
        FormField.parts.label(getLabel('Width')),
        getFieldPart(true)
      ]));
      var heightField = FormCoupledInputs.parts.field2(formGroup([
        FormField.parts.label(getLabel('Height')),
        getFieldPart(false)
      ]));
      return FormCoupledInputs.sketch({
        dom: {
          tag: 'div',
          classes: ['tox-form__group']
        },
        components: [{
            dom: {
              tag: 'div',
              classes: ['tox-form__controls-h-stack']
            },
            components: [
              widthField,
              heightField,
              formGroup([
                getLabel('&nbsp;'),
                pLock
              ])
            ]
          }],
        field1Name: 'width',
        field2Name: 'height',
        locked: true,
        markers: { lockClass: 'tox-locked' },
        onLockedChange: function (current, other, _lock) {
          parseSize(Representing.getValue(current)).each(function (size) {
            converter(size).each(function (newSize) {
              Representing.setValue(other, formatSize(newSize));
            });
          });
        },
        coupledFieldBehaviours: derive$1([
          Disabling.config({
            disabled: function () {
              return spec.disabled || providersBackstage.isDisabled();
            },
            onDisabled: function (comp) {
              FormCoupledInputs.getField1(comp).bind(FormField.getField).each(Disabling.disable);
              FormCoupledInputs.getField2(comp).bind(FormField.getField).each(Disabling.disable);
              FormCoupledInputs.getLock(comp).each(Disabling.disable);
            },
            onEnabled: function (comp) {
              FormCoupledInputs.getField1(comp).bind(FormField.getField).each(Disabling.enable);
              FormCoupledInputs.getField2(comp).bind(FormField.getField).each(Disabling.enable);
              FormCoupledInputs.getLock(comp).each(Disabling.enable);
            }
          }),
          receivingConfig(),
          config('size-input-events2', [run$1(ratioEvent, function (component, simulatedEvent) {
              var isField1 = simulatedEvent.event.isField1;
              var optCurrent = isField1 ? FormCoupledInputs.getField1(component) : FormCoupledInputs.getField2(component);
              var optOther = isField1 ? FormCoupledInputs.getField2(component) : FormCoupledInputs.getField1(component);
              var value1 = optCurrent.map(Representing.getValue).getOr('');
              var value2 = optOther.map(Representing.getValue).getOr('');
              converter = makeRatioConverter(value1, value2);
            })])
        ])
      });
    };

    var undo = constant$1(generate$6('undo'));
    var redo = constant$1(generate$6('redo'));
    var zoom = constant$1(generate$6('zoom'));
    var back = constant$1(generate$6('back'));
    var apply = constant$1(generate$6('apply'));
    var swap = constant$1(generate$6('swap'));
    var transform$1 = constant$1(generate$6('transform'));
    var tempTransform = constant$1(generate$6('temp-transform'));
    var transformApply = constant$1(generate$6('transform-apply'));
    var internal = {
      undo: undo,
      redo: redo,
      zoom: zoom,
      back: back,
      apply: apply,
      swap: swap,
      transform: transform$1,
      tempTransform: tempTransform,
      transformApply: transformApply
    };
    var saveState = constant$1('save-state');
    var disable = constant$1('disable');
    var enable = constant$1('enable');
    var external = {
      formActionEvent: formActionEvent,
      saveState: saveState,
      disable: disable,
      enable: enable
    };

    var renderEditPanel = function (imagePanel, providersBackstage) {
      var createButton = function (text, action, disabled, primary) {
        return record(renderButton({
          name: text,
          text: text,
          disabled: disabled,
          primary: primary,
          icon: Optional.none(),
          borderless: false
        }, action, providersBackstage));
      };
      var createIconButton = function (icon, tooltip, action, disabled) {
        return record(renderIconButton({
          name: icon,
          icon: Optional.some(icon),
          tooltip: Optional.some(tooltip),
          disabled: disabled,
          primary: false,
          borderless: false
        }, action, providersBackstage));
      };
      var disableAllComponents = function (comps, eventcomp) {
        comps.map(function (mem) {
          var component = mem.get(eventcomp);
          if (component.hasConfigured(Disabling)) {
            Disabling.disable(component);
          }
        });
      };
      var enableAllComponents = function (comps, eventcomp) {
        comps.map(function (mem) {
          var component = mem.get(eventcomp);
          if (component.hasConfigured(Disabling)) {
            Disabling.enable(component);
          }
        });
      };
      var panelDom = {
        tag: 'div',
        classes: [
          'tox-image-tools__toolbar',
          'tox-image-tools-edit-panel'
        ]
      };
      var noop$1 = noop;
      var emit$1 = function (comp, event, data) {
        emitWith(comp, event, data);
      };
      var emitDisable = function (component) {
        return emit(component, external.disable());
      };
      var emitEnable = function (component) {
        return emit(component, external.enable());
      };
      var emitTransform = function (comp, transform) {
        emitDisable(comp);
        emit$1(comp, internal.transform(), { transform: transform });
        emitEnable(comp);
      };
      var emitTempTransform = function (comp, transform) {
        emitDisable(comp);
        emit$1(comp, internal.tempTransform(), { transform: transform });
        emitEnable(comp);
      };
      var getBackSwap = function (anyInSystem) {
        return function () {
          memContainer.getOpt(anyInSystem).each(function (container) {
            Replacing.set(container, [ButtonPanel]);
          });
        };
      };
      var emitTransformApply = function (comp, transform) {
        emitDisable(comp);
        emit$1(comp, internal.transformApply(), {
          transform: transform,
          swap: getBackSwap(comp)
        });
        emitEnable(comp);
      };
      var createBackButton = function () {
        return createButton('Back', function (button) {
          return emit$1(button, internal.back(), { swap: getBackSwap(button) });
        }, false, false);
      };
      var createSpacer = function () {
        return record({
          dom: {
            tag: 'div',
            classes: ['tox-spacer']
          },
          behaviours: derive$1([Disabling.config({})])
        });
      };
      var createApplyButton = function () {
        return createButton('Apply', function (button) {
          return emit$1(button, internal.apply(), { swap: getBackSwap(button) });
        }, true, true);
      };
      var makeCropTransform = function () {
        return function (ir) {
          var rect = imagePanel.getRect();
          return crop(ir, rect.x, rect.y, rect.w, rect.h);
        };
      };
      var cropPanelComponents = [
        createBackButton(),
        createSpacer(),
        createButton('Apply', function (button) {
          var transform = makeCropTransform();
          emitTransformApply(button, transform);
          imagePanel.hideCrop();
        }, false, true)
      ];
      var CropPanel = Container.sketch({
        dom: panelDom,
        components: cropPanelComponents.map(function (mem) {
          return mem.asSpec();
        }),
        containerBehaviours: derive$1([config('image-tools-crop-buttons-events', [
            run$1(external.disable(), function (comp, _se) {
              disableAllComponents(cropPanelComponents, comp);
            }),
            run$1(external.enable(), function (comp, _se) {
              enableAllComponents(cropPanelComponents, comp);
            })
          ])])
      });
      var memSize = record(renderSizeInput({
        name: 'size',
        label: Optional.none(),
        constrain: true,
        disabled: false
      }, providersBackstage));
      var makeResizeTransform = function (width, height) {
        return function (ir) {
          return resize$1(ir, width, height);
        };
      };
      var resizePanelComponents = [
        createBackButton(),
        createSpacer(),
        memSize,
        createSpacer(),
        createButton('Apply', function (button) {
          memSize.getOpt(button).each(function (sizeInput) {
            var value = Representing.getValue(sizeInput);
            var width = parseInt(value.width, 10);
            var height = parseInt(value.height, 10);
            var transform = makeResizeTransform(width, height);
            emitTransformApply(button, transform);
          });
        }, false, true)
      ];
      var ResizePanel = Container.sketch({
        dom: panelDom,
        components: resizePanelComponents.map(function (mem) {
          return mem.asSpec();
        }),
        containerBehaviours: derive$1([config('image-tools-resize-buttons-events', [
            run$1(external.disable(), function (comp, _se) {
              disableAllComponents(resizePanelComponents, comp);
            }),
            run$1(external.enable(), function (comp, _se) {
              enableAllComponents(resizePanelComponents, comp);
            })
          ])])
      });
      var makeValueTransform = function (transform, value) {
        return function (ir) {
          return transform(ir, value);
        };
      };
      var horizontalFlip = makeValueTransform(flip, 'h');
      var verticalFlip = makeValueTransform(flip, 'v');
      var counterclockwiseRotate = makeValueTransform(rotate, -90);
      var clockwiseRotate = makeValueTransform(rotate, 90);
      var flipRotateOnAction = function (comp, operation) {
        emitTempTransform(comp, operation);
      };
      var flipRotateComponents = [
        createBackButton(),
        createSpacer(),
        createIconButton('flip-horizontally', 'Flip horizontally', function (button) {
          flipRotateOnAction(button, horizontalFlip);
        }, false),
        createIconButton('flip-vertically', 'Flip vertically', function (button) {
          flipRotateOnAction(button, verticalFlip);
        }, false),
        createIconButton('rotate-left', 'Rotate counterclockwise', function (button) {
          flipRotateOnAction(button, counterclockwiseRotate);
        }, false),
        createIconButton('rotate-right', 'Rotate clockwise', function (button) {
          flipRotateOnAction(button, clockwiseRotate);
        }, false),
        createSpacer(),
        createApplyButton()
      ];
      var FlipRotatePanel = Container.sketch({
        dom: panelDom,
        components: flipRotateComponents.map(function (mem) {
          return mem.asSpec();
        }),
        containerBehaviours: derive$1([config('image-tools-fliprotate-buttons-events', [
            run$1(external.disable(), function (comp, _se) {
              disableAllComponents(flipRotateComponents, comp);
            }),
            run$1(external.enable(), function (comp, _se) {
              enableAllComponents(flipRotateComponents, comp);
            })
          ])])
      });
      var makeSlider = function (label, onChoose, min, value, max) {
        var labelPart = Slider.parts.label({
          dom: {
            tag: 'label',
            classes: ['tox-label'],
            innerHtml: providersBackstage.translate(label)
          }
        });
        var spectrum = Slider.parts.spectrum({
          dom: {
            tag: 'div',
            classes: ['tox-slider__rail'],
            attributes: { role: 'presentation' }
          }
        });
        var thumb = Slider.parts.thumb({
          dom: {
            tag: 'div',
            classes: ['tox-slider__handle'],
            attributes: { role: 'presentation' }
          }
        });
        return record(Slider.sketch({
          dom: {
            tag: 'div',
            classes: ['tox-slider'],
            attributes: { role: 'presentation' }
          },
          model: {
            mode: 'x',
            minX: min,
            maxX: max,
            getInitialValue: constant$1({ x: value })
          },
          components: [
            labelPart,
            spectrum,
            thumb
          ],
          sliderBehaviours: derive$1([Focusing.config({})]),
          onChoose: onChoose
        }));
      };
      var makeVariableSlider = function (label, transform, min, value, max) {
        var onChoose = function (slider, _thumb, value) {
          var valTransform = makeValueTransform(transform, value.x / 100);
          emitTransform(slider, valTransform);
        };
        return makeSlider(label, onChoose, min, value, max);
      };
      var variableFilterPanelComponents = function (label, transform, min, value, max) {
        return [
          createBackButton(),
          makeVariableSlider(label, transform, min, value, max),
          createApplyButton()
        ];
      };
      var createVariableFilterPanel = function (label, transform, min, value, max) {
        var filterPanelComponents = variableFilterPanelComponents(label, transform, min, value, max);
        return Container.sketch({
          dom: panelDom,
          components: filterPanelComponents.map(function (mem) {
            return mem.asSpec();
          }),
          containerBehaviours: derive$1([config('image-tools-filter-panel-buttons-events', [
              run$1(external.disable(), function (comp, _se) {
                disableAllComponents(filterPanelComponents, comp);
              }),
              run$1(external.enable(), function (comp, _se) {
                enableAllComponents(filterPanelComponents, comp);
              })
            ])])
        });
      };
      var filterPanelComponents = [
        createBackButton(),
        createSpacer(),
        createApplyButton()
      ];
      var FilterPanel = Container.sketch({
        dom: panelDom,
        components: filterPanelComponents.map(function (mem) {
          return mem.asSpec();
        })
      });
      var BrightnessPanel = createVariableFilterPanel('Brightness', brightness, -100, 0, 100);
      var ContrastPanel = createVariableFilterPanel('Contrast', contrast, -100, 0, 100);
      var GammaPanel = createVariableFilterPanel('Gamma', gamma, -100, 0, 100);
      var makeColorTransform = function (red, green, blue) {
        return function (ir) {
          return colorize(ir, red, green, blue);
        };
      };
      var makeColorSlider = function (label) {
        var onChoose = function (slider, _thumb, _value) {
          var redOpt = memRed.getOpt(slider);
          var blueOpt = memBlue.getOpt(slider);
          var greenOpt = memGreen.getOpt(slider);
          redOpt.each(function (red) {
            blueOpt.each(function (blue) {
              greenOpt.each(function (green) {
                var r = Representing.getValue(red).x / 100;
                var g = Representing.getValue(green).x / 100;
                var b = Representing.getValue(blue).x / 100;
                var transform = makeColorTransform(r, g, b);
                emitTransform(slider, transform);
              });
            });
          });
        };
        return makeSlider(label, onChoose, 0, 100, 200);
      };
      var memRed = makeColorSlider('R');
      var memGreen = makeColorSlider('G');
      var memBlue = makeColorSlider('B');
      var colorizePanelComponents = [
        createBackButton(),
        memRed,
        memGreen,
        memBlue,
        createApplyButton()
      ];
      var ColorizePanel = Container.sketch({
        dom: panelDom,
        components: colorizePanelComponents.map(function (mem) {
          return mem.asSpec();
        })
      });
      var getTransformPanelEvent = function (panel, transform, update) {
        return function (button) {
          var swap = function () {
            memContainer.getOpt(button).each(function (container) {
              Replacing.set(container, [panel]);
              update(container);
            });
          };
          emit$1(button, internal.swap(), {
            transform: transform,
            swap: swap
          });
        };
      };
      var cropPanelUpdate = function (_anyInSystem) {
        imagePanel.showCrop();
      };
      var resizePanelUpdate = function (anyInSystem) {
        memSize.getOpt(anyInSystem).each(function (sizeInput) {
          var measurements = imagePanel.getMeasurements();
          var width = measurements.width;
          var height = measurements.height;
          Representing.setValue(sizeInput, {
            width: width,
            height: height
          });
        });
      };
      var sharpenTransform = Optional.some(sharpen);
      var invertTransform = Optional.some(invert);
      var buttonPanelComponents = [
        createIconButton('crop', 'Crop', getTransformPanelEvent(CropPanel, Optional.none(), cropPanelUpdate), false),
        createIconButton('resize', 'Resize', getTransformPanelEvent(ResizePanel, Optional.none(), resizePanelUpdate), false),
        createIconButton('orientation', 'Orientation', getTransformPanelEvent(FlipRotatePanel, Optional.none(), noop$1), false),
        createIconButton('brightness', 'Brightness', getTransformPanelEvent(BrightnessPanel, Optional.none(), noop$1), false),
        createIconButton('sharpen', 'Sharpen', getTransformPanelEvent(FilterPanel, sharpenTransform, noop$1), false),
        createIconButton('contrast', 'Contrast', getTransformPanelEvent(ContrastPanel, Optional.none(), noop$1), false),
        createIconButton('color-levels', 'Color levels', getTransformPanelEvent(ColorizePanel, Optional.none(), noop$1), false),
        createIconButton('gamma', 'Gamma', getTransformPanelEvent(GammaPanel, Optional.none(), noop$1), false),
        createIconButton('invert', 'Invert', getTransformPanelEvent(FilterPanel, invertTransform, noop$1), false)
      ];
      var ButtonPanel = Container.sketch({
        dom: panelDom,
        components: buttonPanelComponents.map(function (mem) {
          return mem.asSpec();
        })
      });
      var container = Container.sketch({
        dom: { tag: 'div' },
        components: [ButtonPanel],
        containerBehaviours: derive$1([Replacing.config({})])
      });
      var memContainer = record(container);
      var getApplyButton = function (anyInSystem) {
        return memContainer.getOpt(anyInSystem).map(function (container) {
          var panel = container.components()[0];
          return panel.components()[panel.components().length - 1];
        });
      };
      return {
        memContainer: memContainer,
        getApplyButton: getApplyButton
      };
    };

    var global$5 = tinymce.util.Tools.resolve('tinymce.geom.Rect');

    var global$4 = tinymce.util.Tools.resolve('tinymce.dom.DomQuery');

    var global$3 = tinymce.util.Tools.resolve('tinymce.util.Observable');

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.VK');

    var getDocumentSize = function (doc) {
      var max = Math.max;
      var documentElement = doc.documentElement;
      var body = doc.body;
      var scrollWidth = max(documentElement.scrollWidth, body.scrollWidth);
      var clientWidth = max(documentElement.clientWidth, body.clientWidth);
      var offsetWidth = max(documentElement.offsetWidth, body.offsetWidth);
      var scrollHeight = max(documentElement.scrollHeight, body.scrollHeight);
      var clientHeight = max(documentElement.clientHeight, body.clientHeight);
      var offsetHeight = max(documentElement.offsetHeight, body.offsetHeight);
      return {
        width: scrollWidth < offsetWidth ? clientWidth : scrollWidth,
        height: scrollHeight < offsetHeight ? clientHeight : scrollHeight
      };
    };
    var updateWithTouchData = function (e) {
      var keys, i;
      if (e.changedTouches) {
        keys = 'screenX screenY pageX pageY clientX clientY'.split(' ');
        for (i = 0; i < keys.length; i++) {
          e[keys[i]] = e.changedTouches[0][keys[i]];
        }
      }
    };
    function DragHelper (id, settings) {
      var $eventOverlay;
      var doc = settings.document || document;
      var downButton;
      var startX, startY;
      var handleElement = doc.getElementById(settings.handle || id);
      var start = function (e) {
        var docSize = getDocumentSize(doc);
        var cursor;
        updateWithTouchData(e);
        e.preventDefault();
        downButton = e.button;
        var handleElm = handleElement;
        startX = e.screenX;
        startY = e.screenY;
        if (window.getComputedStyle) {
          cursor = window.getComputedStyle(handleElm, null).getPropertyValue('cursor');
        } else {
          cursor = handleElm.runtimeStyle.cursor;
        }
        $eventOverlay = global$4('<div></div>').css({
          position: 'absolute',
          top: 0,
          left: 0,
          width: docSize.width,
          height: docSize.height,
          zIndex: 2147483647,
          opacity: 0.0001,
          cursor: cursor
        }).appendTo(doc.body);
        global$4(doc).on('mousemove touchmove', drag).on('mouseup touchend', stop);
        settings.start(e);
      };
      var drag = function (e) {
        updateWithTouchData(e);
        if (e.button !== downButton) {
          return stop(e);
        }
        e.deltaX = e.screenX - startX;
        e.deltaY = e.screenY - startY;
        e.preventDefault();
        settings.drag(e);
      };
      var stop = function (e) {
        updateWithTouchData(e);
        global$4(doc).off('mousemove touchmove', drag).off('mouseup touchend', stop);
        $eventOverlay.remove();
        if (settings.stop) {
          settings.stop(e);
        }
      };
      var destroy = function () {
        global$4(handleElement).off();
      };
      global$4(handleElement).on('mousedown touchstart', start);
      return { destroy: destroy };
    }

    var count = 0;
    var create$1 = function (currentRect, viewPortRect, clampRect, containerElm, action) {
      var dragHelpers;
      var prefix = 'tox-';
      var id = prefix + 'crid-' + count++;
      var handles = [
        {
          name: 'move',
          xMul: 0,
          yMul: 0,
          deltaX: 1,
          deltaY: 1,
          deltaW: 0,
          deltaH: 0,
          label: 'Crop Mask'
        },
        {
          name: 'nw',
          xMul: 0,
          yMul: 0,
          deltaX: 1,
          deltaY: 1,
          deltaW: -1,
          deltaH: -1,
          label: 'Top Left Crop Handle'
        },
        {
          name: 'ne',
          xMul: 1,
          yMul: 0,
          deltaX: 0,
          deltaY: 1,
          deltaW: 1,
          deltaH: -1,
          label: 'Top Right Crop Handle'
        },
        {
          name: 'sw',
          xMul: 0,
          yMul: 1,
          deltaX: 1,
          deltaY: 0,
          deltaW: -1,
          deltaH: 1,
          label: 'Bottom Left Crop Handle'
        },
        {
          name: 'se',
          xMul: 1,
          yMul: 1,
          deltaX: 0,
          deltaY: 0,
          deltaW: 1,
          deltaH: 1,
          label: 'Bottom Right Crop Handle'
        }
      ];
      var blockers = [
        'top',
        'right',
        'bottom',
        'left'
      ];
      var getAbsoluteRect = function (outerRect, relativeRect) {
        return {
          x: relativeRect.x + outerRect.x,
          y: relativeRect.y + outerRect.y,
          w: relativeRect.w,
          h: relativeRect.h
        };
      };
      var getRelativeRect = function (outerRect, innerRect) {
        return {
          x: innerRect.x - outerRect.x,
          y: innerRect.y - outerRect.y,
          w: innerRect.w,
          h: innerRect.h
        };
      };
      var getInnerRect = function () {
        return getRelativeRect(clampRect, currentRect);
      };
      var moveRect = function (handle, startRect, deltaX, deltaY) {
        var x, y, w, h, rect;
        x = startRect.x;
        y = startRect.y;
        w = startRect.w;
        h = startRect.h;
        x += deltaX * handle.deltaX;
        y += deltaY * handle.deltaY;
        w += deltaX * handle.deltaW;
        h += deltaY * handle.deltaH;
        if (w < 20) {
          w = 20;
        }
        if (h < 20) {
          h = 20;
        }
        rect = currentRect = global$5.clamp({
          x: x,
          y: y,
          w: w,
          h: h
        }, clampRect, handle.name === 'move');
        rect = getRelativeRect(clampRect, rect);
        instance.fire('updateRect', { rect: rect });
        setInnerRect(rect);
      };
      var render = function () {
        var createDragHelper = function (handle) {
          var startRect;
          return DragHelper(id, {
            document: containerElm.ownerDocument,
            handle: id + '-' + handle.name,
            start: function () {
              startRect = currentRect;
            },
            drag: function (e) {
              moveRect(handle, startRect, e.deltaX, e.deltaY);
            }
          });
        };
        global$4('<div id="' + id + '" class="' + prefix + 'croprect-container"' + ' role="grid" aria-dropeffect="execute">').appendTo(containerElm);
        global$6.each(blockers, function (blocker) {
          global$4('#' + id, containerElm).append('<div id="' + id + '-' + blocker + '"class="' + prefix + 'croprect-block" style="display: none" data-mce-bogus="all">');
        });
        global$6.each(handles, function (handle) {
          global$4('#' + id, containerElm).append('<div id="' + id + '-' + handle.name + '" class="' + prefix + 'croprect-handle ' + prefix + 'croprect-handle-' + handle.name + '"' + 'style="display: none" data-mce-bogus="all" role="gridcell" tabindex="-1"' + ' aria-label="' + handle.label + '" aria-grabbed="false" title="' + handle.label + '">');
        });
        dragHelpers = global$6.map(handles, createDragHelper);
        repaint(currentRect);
        global$4(containerElm).on('focusin focusout', function (e) {
          global$4(e.target).attr('aria-grabbed', e.type === 'focus' ? 'true' : 'false');
        });
        global$4(containerElm).on('keydown', function (e) {
          var activeHandle;
          global$6.each(handles, function (handle) {
            if (e.target.id === id + '-' + handle.name) {
              activeHandle = handle;
              return false;
            }
          });
          var moveAndBlock = function (evt, handle, startRect, deltaX, deltaY) {
            evt.stopPropagation();
            evt.preventDefault();
            moveRect(activeHandle, startRect, deltaX, deltaY);
          };
          switch (e.keyCode) {
          case global$2.LEFT:
            moveAndBlock(e, activeHandle, currentRect, -10, 0);
            break;
          case global$2.RIGHT:
            moveAndBlock(e, activeHandle, currentRect, 10, 0);
            break;
          case global$2.UP:
            moveAndBlock(e, activeHandle, currentRect, 0, -10);
            break;
          case global$2.DOWN:
            moveAndBlock(e, activeHandle, currentRect, 0, 10);
            break;
          case global$2.ENTER:
          case global$2.SPACEBAR:
            e.preventDefault();
            action();
            break;
          }
        });
      };
      var toggleVisibility = function (state) {
        var selectors = global$6.map(handles, function (handle) {
          return '#' + id + '-' + handle.name;
        }).concat(global$6.map(blockers, function (blocker) {
          return '#' + id + '-' + blocker;
        })).join(',');
        if (state) {
          global$4(selectors, containerElm).show();
        } else {
          global$4(selectors, containerElm).hide();
        }
      };
      var repaint = function (rect) {
        var updateElementRect = function (name, rect) {
          if (rect.h < 0) {
            rect.h = 0;
          }
          if (rect.w < 0) {
            rect.w = 0;
          }
          global$4('#' + id + '-' + name, containerElm).css({
            left: rect.x,
            top: rect.y,
            width: rect.w,
            height: rect.h
          });
        };
        global$6.each(handles, function (handle) {
          global$4('#' + id + '-' + handle.name, containerElm).css({
            left: rect.w * handle.xMul + rect.x,
            top: rect.h * handle.yMul + rect.y
          });
        });
        updateElementRect('top', {
          x: viewPortRect.x,
          y: viewPortRect.y,
          w: viewPortRect.w,
          h: rect.y - viewPortRect.y
        });
        updateElementRect('right', {
          x: rect.x + rect.w,
          y: rect.y,
          w: viewPortRect.w - rect.x - rect.w + viewPortRect.x,
          h: rect.h
        });
        updateElementRect('bottom', {
          x: viewPortRect.x,
          y: rect.y + rect.h,
          w: viewPortRect.w,
          h: viewPortRect.h - rect.y - rect.h + viewPortRect.y
        });
        updateElementRect('left', {
          x: viewPortRect.x,
          y: rect.y,
          w: rect.x - viewPortRect.x,
          h: rect.h
        });
        updateElementRect('move', rect);
      };
      var setRect = function (rect) {
        currentRect = rect;
        repaint(currentRect);
      };
      var setViewPortRect = function (rect) {
        viewPortRect = rect;
        repaint(currentRect);
      };
      var setInnerRect = function (rect) {
        setRect(getAbsoluteRect(clampRect, rect));
      };
      var setClampRect = function (rect) {
        clampRect = rect;
        repaint(currentRect);
      };
      var destroy = function () {
        global$6.each(dragHelpers, function (helper) {
          helper.destroy();
        });
        dragHelpers = [];
      };
      render();
      var instance = global$6.extend({
        toggleVisibility: toggleVisibility,
        setClampRect: setClampRect,
        setRect: setRect,
        getInnerRect: getInnerRect,
        setInnerRect: setInnerRect,
        setViewPortRect: setViewPortRect,
        destroy: destroy
      }, global$3);
      return instance;
    };
    var CropRect = { create: create$1 };

    var loadImage = function (image) {
      return new global$d(function (resolve) {
        var loaded = function () {
          image.removeEventListener('load', loaded);
          resolve(image);
        };
        if (image.complete) {
          resolve(image);
        } else {
          image.addEventListener('load', loaded);
        }
      });
    };
    var renderImagePanel = function (initialUrl) {
      var memBg = record({
        dom: {
          tag: 'div',
          classes: ['tox-image-tools__image-bg'],
          attributes: { role: 'presentation' }
        }
      });
      var zoomState = Cell(1);
      var cropRect = value$1();
      var rectState = Cell({
        x: 0,
        y: 0,
        w: 1,
        h: 1
      });
      var viewRectState = Cell({
        x: 0,
        y: 0,
        w: 1,
        h: 1
      });
      var repaintImg = function (anyInSystem, img) {
        memContainer.getOpt(anyInSystem).each(function (panel) {
          var zoom = zoomState.get();
          var panelW = get$7(panel.element);
          var panelH = get$8(panel.element);
          var width = img.dom.naturalWidth * zoom;
          var height = img.dom.naturalHeight * zoom;
          var left = Math.max(0, panelW / 2 - width / 2);
          var top = Math.max(0, panelH / 2 - height / 2);
          var css = {
            left: left.toString() + 'px',
            top: top.toString() + 'px',
            width: width.toString() + 'px',
            height: height.toString() + 'px',
            position: 'absolute'
          };
          setAll(img, css);
          memBg.getOpt(panel).each(function (bg) {
            setAll(bg.element, css);
          });
          cropRect.on(function (cRect) {
            var rect = rectState.get();
            cRect.setRect({
              x: rect.x * zoom + left,
              y: rect.y * zoom + top,
              w: rect.w * zoom,
              h: rect.h * zoom
            });
            cRect.setClampRect({
              x: left,
              y: top,
              w: width,
              h: height
            });
            cRect.setViewPortRect({
              x: 0,
              y: 0,
              w: panelW,
              h: panelH
            });
          });
        });
      };
      var zoomFit = function (anyInSystem, img) {
        memContainer.getOpt(anyInSystem).each(function (panel) {
          var panelW = get$7(panel.element);
          var panelH = get$8(panel.element);
          var width = img.dom.naturalWidth;
          var height = img.dom.naturalHeight;
          var zoom = Math.min(panelW / width, panelH / height);
          if (zoom >= 1) {
            zoomState.set(1);
          } else {
            zoomState.set(zoom);
          }
        });
      };
      var updateSrc = function (anyInSystem, url) {
        var img = SugarElement.fromTag('img');
        set$7(img, 'src', url);
        return loadImage(img.dom).then(function () {
          if (anyInSystem.getSystem().isConnected()) {
            memContainer.getOpt(anyInSystem).map(function (panel) {
              var aImg = external$2({ element: img });
              Replacing.replaceAt(panel, 1, Optional.some(aImg));
              var lastViewRect = viewRectState.get();
              var viewRect = {
                x: 0,
                y: 0,
                w: img.dom.naturalWidth,
                h: img.dom.naturalHeight
              };
              viewRectState.set(viewRect);
              var rect = global$5.inflate(viewRect, -20, -20);
              rectState.set(rect);
              if (lastViewRect.w !== viewRect.w || lastViewRect.h !== viewRect.h) {
                zoomFit(panel, img);
              }
              repaintImg(panel, img);
            });
          }
        });
      };
      var zoom = function (anyInSystem, direction) {
        var currentZoom = zoomState.get();
        var newZoom = direction > 0 ? Math.min(2, currentZoom + 0.1) : Math.max(0.1, currentZoom - 0.1);
        zoomState.set(newZoom);
        memContainer.getOpt(anyInSystem).each(function (panel) {
          var img = panel.components()[1].element;
          repaintImg(panel, img);
        });
      };
      var showCrop = function () {
        cropRect.on(function (cRect) {
          cRect.toggleVisibility(true);
        });
      };
      var hideCrop = function () {
        cropRect.on(function (cRect) {
          cRect.toggleVisibility(false);
        });
      };
      var getRect = function () {
        return rectState.get();
      };
      var container = Container.sketch({
        dom: {
          tag: 'div',
          classes: ['tox-image-tools__image']
        },
        components: [
          memBg.asSpec(),
          {
            dom: {
              tag: 'img',
              attributes: { src: initialUrl }
            }
          },
          {
            dom: { tag: 'div' },
            behaviours: derive$1([config('image-panel-crop-events', [runOnAttached(function (comp) {
                  memContainer.getOpt(comp).each(function (container) {
                    var el = container.element.dom;
                    var cRect = CropRect.create({
                      x: 10,
                      y: 10,
                      w: 100,
                      h: 100
                    }, {
                      x: 0,
                      y: 0,
                      w: 200,
                      h: 200
                    }, {
                      x: 0,
                      y: 0,
                      w: 200,
                      h: 200
                    }, el, noop);
                    cRect.toggleVisibility(false);
                    cRect.on('updateRect', function (e) {
                      var rect = e.rect;
                      var zoom = zoomState.get();
                      var newRect = {
                        x: Math.round(rect.x / zoom),
                        y: Math.round(rect.y / zoom),
                        w: Math.round(rect.w / zoom),
                        h: Math.round(rect.h / zoom)
                      };
                      rectState.set(newRect);
                    });
                    cropRect.set(cRect);
                  });
                })])])
          }
        ],
        containerBehaviours: derive$1([
          Replacing.config({}),
          config('image-panel-events', [runOnAttached(function (comp) {
              updateSrc(comp, initialUrl);
            })])
        ])
      });
      var memContainer = record(container);
      var getMeasurements = function () {
        var viewRect = viewRectState.get();
        return {
          width: viewRect.w,
          height: viewRect.h
        };
      };
      return {
        memContainer: memContainer,
        updateSrc: updateSrc,
        zoom: zoom,
        showCrop: showCrop,
        hideCrop: hideCrop,
        getRect: getRect,
        getMeasurements: getMeasurements
      };
    };

    var createButton = function (innerHtml, icon, disabled, action, providersBackstage) {
      return renderIconButton({
        name: innerHtml,
        icon: Optional.some(icon),
        disabled: disabled,
        tooltip: Optional.some(innerHtml),
        primary: false,
        borderless: false
      }, action, providersBackstage);
    };
    var setButtonEnabled = function (button, enabled) {
      if (enabled) {
        Disabling.enable(button);
      } else {
        Disabling.disable(button);
      }
    };
    var renderSideBar = function (providersBackstage) {
      var updateButtonUndoStates = function (anyInSystem, undoEnabled, redoEnabled) {
        memUndo.getOpt(anyInSystem).each(function (undo) {
          setButtonEnabled(undo, undoEnabled);
        });
        memRedo.getOpt(anyInSystem).each(function (redo) {
          setButtonEnabled(redo, redoEnabled);
        });
      };
      var memUndo = record(createButton('Undo', 'undo', true, function (button) {
        emitWith(button, internal.undo(), { direction: 1 });
      }, providersBackstage));
      var memRedo = record(createButton('Redo', 'redo', true, function (button) {
        emitWith(button, internal.redo(), { direction: 1 });
      }, providersBackstage));
      var container = Container.sketch({
        dom: {
          tag: 'div',
          classes: [
            'tox-image-tools__toolbar',
            'tox-image-tools__sidebar'
          ]
        },
        components: [
          memUndo.asSpec(),
          memRedo.asSpec(),
          createButton('Zoom in', 'zoom-in', false, function (button) {
            emitWith(button, internal.zoom(), { direction: 1 });
          }, providersBackstage),
          createButton('Zoom out', 'zoom-out', false, function (button) {
            emitWith(button, internal.zoom(), { direction: -1 });
          }, providersBackstage)
        ]
      });
      return {
        container: container,
        updateButtonUndoStates: updateButtonUndoStates
      };
    };

    function UndoStack () {
      var data = [];
      var index = -1;
      var add = function (state) {
        var removed = data.splice(++index);
        data.push(state);
        return {
          state: state,
          removed: removed
        };
      };
      var undo = function () {
        if (canUndo()) {
          return data[--index];
        }
      };
      var redo = function () {
        if (canRedo()) {
          return data[++index];
        }
      };
      var canUndo = function () {
        return index > 0;
      };
      var canRedo = function () {
        return index !== -1 && index < data.length - 1;
      };
      return {
        data: data,
        add: add,
        undo: undo,
        redo: redo,
        canUndo: canUndo,
        canRedo: canRedo
      };
    }

    var makeState = function (initialState) {
      var blobState = Cell(initialState);
      var tempState = value$1();
      var undoStack = UndoStack();
      undoStack.add(initialState);
      var getBlobState = function () {
        return blobState.get();
      };
      var setBlobState = function (state) {
        blobState.set(state);
      };
      var getTempState = function () {
        return tempState.get().getOrThunk(blobState.get);
      };
      var updateTempState = function (blob) {
        var newTempState = createState(blob);
        destroyTempState();
        tempState.set(newTempState);
        return newTempState.url;
      };
      var createState = function (blob) {
        return {
          blob: blob,
          url: URL.createObjectURL(blob)
        };
      };
      var destroyState = function (state) {
        URL.revokeObjectURL(state.url);
      };
      var destroyStates = function (states) {
        global$6.each(states, destroyState);
      };
      var destroyTempState = function () {
        tempState.on(destroyState);
        tempState.clear();
      };
      var addBlobState = function (blob) {
        var newState = createState(blob);
        setBlobState(newState);
        var removed = undoStack.add(newState).removed;
        destroyStates(removed);
        return newState.url;
      };
      var addTempState = function (blob) {
        var newState = createState(blob);
        tempState.set(newState);
        return newState.url;
      };
      var applyTempState = function (postApply) {
        return tempState.get().fold(noop, function (temp) {
          addBlobState(temp.blob);
          postApply();
        });
      };
      var undo = function () {
        var currentState = undoStack.undo();
        setBlobState(currentState);
        return currentState.url;
      };
      var redo = function () {
        var currentState = undoStack.redo();
        setBlobState(currentState);
        return currentState.url;
      };
      var getHistoryStates = function () {
        var undoEnabled = undoStack.canUndo();
        var redoEnabled = undoStack.canRedo();
        return {
          undoEnabled: undoEnabled,
          redoEnabled: redoEnabled
        };
      };
      return {
        getBlobState: getBlobState,
        setBlobState: setBlobState,
        addBlobState: addBlobState,
        getTempState: getTempState,
        updateTempState: updateTempState,
        addTempState: addTempState,
        applyTempState: applyTempState,
        destroyTempState: destroyTempState,
        undo: undo,
        redo: redo,
        getHistoryStates: getHistoryStates
      };
    };

    var renderImageTools = function (detail, providersBackstage) {
      var state = makeState(detail.currentState);
      var zoom = function (anyInSystem, simulatedEvent) {
        var direction = simulatedEvent.event.direction;
        imagePanel.zoom(anyInSystem, direction);
      };
      var updateButtonUndoStates = function (anyInSystem) {
        var historyStates = state.getHistoryStates();
        sideBar.updateButtonUndoStates(anyInSystem, historyStates.undoEnabled, historyStates.redoEnabled);
        emitWith(anyInSystem, external.formActionEvent, {
          name: external.saveState(),
          value: historyStates.undoEnabled
        });
      };
      var disableUndoRedo = function (anyInSystem) {
        sideBar.updateButtonUndoStates(anyInSystem, false, false);
      };
      var undo = function (anyInSystem, _simulatedEvent) {
        var url = state.undo();
        updateSrc(anyInSystem, url).then(function (_oImg) {
          unblock(anyInSystem);
          updateButtonUndoStates(anyInSystem);
        });
      };
      var redo = function (anyInSystem, _simulatedEvent) {
        var url = state.redo();
        updateSrc(anyInSystem, url).then(function (_oImg) {
          unblock(anyInSystem);
          updateButtonUndoStates(anyInSystem);
        });
      };
      var imageResultToBlob = function (ir) {
        return ir.toBlob();
      };
      var block = function (anyInSystem) {
        emitWith(anyInSystem, external.formActionEvent, {
          name: external.disable(),
          value: {}
        });
      };
      var unblock = function (anyInSystem) {
        editPanel.getApplyButton(anyInSystem).each(function (applyButton) {
          Disabling.enable(applyButton);
        });
        emitWith(anyInSystem, external.formActionEvent, {
          name: external.enable(),
          value: {}
        });
      };
      var updateSrc = function (anyInSystem, src) {
        block(anyInSystem);
        return imagePanel.updateSrc(anyInSystem, src);
      };
      var blobManipulate = function (anyInSystem, blob, filter, action, swap) {
        block(anyInSystem);
        blobToImageResult(blob).then(filter).then(imageResultToBlob).then(action).then(function (url) {
          return updateSrc(anyInSystem, url);
        }).then(function () {
          updateButtonUndoStates(anyInSystem);
          swap();
          unblock(anyInSystem);
        }).catch(function (err) {
          console.log(err);
          if (anyInSystem.getSystem().isConnected()) {
            unblock(anyInSystem);
          }
        });
      };
      var manipulate = function (anyInSystem, filter, swap) {
        var blob = state.getBlobState().blob;
        var action = function (blob) {
          return state.updateTempState(blob);
        };
        blobManipulate(anyInSystem, blob, filter, action, swap);
      };
      var tempManipulate = function (anyInSystem, filter) {
        var blob = state.getTempState().blob;
        var action = function (blob) {
          return state.addTempState(blob);
        };
        blobManipulate(anyInSystem, blob, filter, action, noop);
      };
      var manipulateApply = function (anyInSystem, filter, swap) {
        var blob = state.getBlobState().blob;
        var action = function (blob) {
          var url = state.addBlobState(blob);
          destroyTempState(anyInSystem);
          return url;
        };
        blobManipulate(anyInSystem, blob, filter, action, swap);
      };
      var apply = function (anyInSystem, simulatedEvent) {
        var postApply = function () {
          destroyTempState(anyInSystem);
          var swap = simulatedEvent.event.swap;
          swap();
        };
        state.applyTempState(postApply);
      };
      var destroyTempState = function (anyInSystem) {
        var currentUrl = state.getBlobState().url;
        state.destroyTempState();
        updateButtonUndoStates(anyInSystem);
        return currentUrl;
      };
      var cancel = function (anyInSystem) {
        var currentUrl = destroyTempState(anyInSystem);
        updateSrc(anyInSystem, currentUrl).then(function (_oImg) {
          unblock(anyInSystem);
        });
      };
      var back = function (anyInSystem, simulatedEvent) {
        cancel(anyInSystem);
        var swap = simulatedEvent.event.swap;
        swap();
        imagePanel.hideCrop();
      };
      var transform = function (anyInSystem, simulatedEvent) {
        return manipulate(anyInSystem, simulatedEvent.event.transform, noop);
      };
      var tempTransform = function (anyInSystem, simulatedEvent) {
        return tempManipulate(anyInSystem, simulatedEvent.event.transform);
      };
      var transformApply = function (anyInSystem, simulatedEvent) {
        return manipulateApply(anyInSystem, simulatedEvent.event.transform, simulatedEvent.event.swap);
      };
      var imagePanel = renderImagePanel(detail.currentState.url);
      var sideBar = renderSideBar(providersBackstage);
      var editPanel = renderEditPanel(imagePanel, providersBackstage);
      var swap = function (anyInSystem, simulatedEvent) {
        disableUndoRedo(anyInSystem);
        var transform = simulatedEvent.event.transform;
        var swap = simulatedEvent.event.swap;
        transform.fold(function () {
          swap();
        }, function (transform) {
          manipulate(anyInSystem, transform, swap);
        });
      };
      return {
        dom: {
          tag: 'div',
          attributes: { role: 'presentation' }
        },
        components: [
          editPanel.memContainer.asSpec(),
          imagePanel.memContainer.asSpec(),
          sideBar.container
        ],
        behaviours: derive$1([
          Representing.config({
            store: {
              mode: 'manual',
              getValue: function () {
                return state.getBlobState();
              }
            }
          }),
          config('image-tools-events', [
            run$1(internal.undo(), undo),
            run$1(internal.redo(), redo),
            run$1(internal.zoom(), zoom),
            run$1(internal.back(), back),
            run$1(internal.apply(), apply),
            run$1(internal.transform(), transform),
            run$1(internal.tempTransform(), tempTransform),
            run$1(internal.transformApply(), transformApply),
            run$1(internal.swap(), swap)
          ]),
          ComposingConfigs.self()
        ])
      };
    };

    var renderLabel = function (spec, backstageShared) {
      var label = {
        dom: {
          tag: 'label',
          innerHtml: backstageShared.providers.translate(spec.label),
          classes: ['tox-label']
        }
      };
      var comps = map$2(spec.items, backstageShared.interpreter);
      return {
        dom: {
          tag: 'div',
          classes: ['tox-form__group']
        },
        components: [label].concat(comps),
        behaviours: derive$1([
          ComposingConfigs.self(),
          Replacing.config({}),
          RepresentingConfigs.domHtml(Optional.none()),
          Keying.config({ mode: 'acyclic' })
        ])
      };
    };

    var isSingleListItem = function (item) {
      return !has$2(item, 'items');
    };
    var dataAttribute = 'data-value';
    var fetchItems = function (dropdownComp, name, items, selectedValue) {
      return map$2(items, function (item) {
        if (!isSingleListItem(item)) {
          return {
            type: 'nestedmenuitem',
            text: item.text,
            getSubmenuItems: function () {
              return fetchItems(dropdownComp, name, item.items, selectedValue);
            }
          };
        } else {
          return {
            type: 'togglemenuitem',
            text: item.text,
            value: item.value,
            active: item.value === selectedValue,
            onAction: function () {
              Representing.setValue(dropdownComp, item.value);
              emitWith(dropdownComp, formChangeEvent, { name: name });
              Focusing.focus(dropdownComp);
            }
          };
        }
      });
    };
    var findItemByValue = function (items, value) {
      return findMap(items, function (item) {
        if (!isSingleListItem(item)) {
          return findItemByValue(item.items, value);
        } else {
          return someIf(item.value === value, item);
        }
      });
    };
    var renderListBox = function (spec, backstage) {
      var providersBackstage = backstage.shared.providers;
      var initialItem = head(spec.items).filter(isSingleListItem);
      var pLabel = spec.label.map(function (label) {
        return renderLabel$2(label, providersBackstage);
      });
      var pField = FormField.parts.field({
        dom: {},
        factory: {
          sketch: function (sketchSpec) {
            return renderCommonDropdown({
              uid: sketchSpec.uid,
              text: initialItem.map(function (item) {
                return item.text;
              }),
              icon: Optional.none(),
              tooltip: spec.label,
              role: Optional.none(),
              fetch: function (comp, callback) {
                var items = fetchItems(comp, spec.name, spec.items, Representing.getValue(comp));
                callback(build(items, ItemResponse$1.CLOSE_ON_EXECUTE, backstage, false));
              },
              onSetup: constant$1(noop),
              getApi: constant$1({}),
              columns: 1,
              presets: 'normal',
              classes: [],
              dropdownBehaviours: [
                Tabstopping.config({}),
                Representing.config({
                  store: {
                    mode: 'manual',
                    initialValue: initialItem.map(function (item) {
                      return item.value;
                    }).getOr(''),
                    getValue: function (comp) {
                      return get$c(comp.element, dataAttribute);
                    },
                    setValue: function (comp, data) {
                      findItemByValue(spec.items, data).each(function (item) {
                        set$7(comp.element, dataAttribute, item.value);
                        emitWith(comp, updateMenuText, { text: item.text });
                      });
                    }
                  }
                })
              ]
            }, 'tox-listbox', backstage.shared);
          }
        }
      });
      var listBoxWrap = {
        dom: {
          tag: 'div',
          classes: ['tox-listboxfield']
        },
        components: [pField]
      };
      return FormField.sketch({
        dom: {
          tag: 'div',
          classes: ['tox-form__group']
        },
        components: flatten([
          pLabel.toArray(),
          [listBoxWrap]
        ]),
        fieldBehaviours: derive$1([Disabling.config({
            disabled: constant$1(spec.disabled),
            onDisabled: function (comp) {
              FormField.getField(comp).each(Disabling.disable);
            },
            onEnabled: function (comp) {
              FormField.getField(comp).each(Disabling.enable);
            }
          })])
      });
    };

    var renderPanel = function (spec, backstage) {
      return {
        dom: {
          tag: 'div',
          classes: spec.classes
        },
        components: map$2(spec.items, backstage.shared.interpreter)
      };
    };

    var factory$e = function (detail, _spec) {
      var options = map$2(detail.options, function (option) {
        return {
          dom: {
            tag: 'option',
            value: option.value,
            innerHtml: option.text
          }
        };
      });
      var initialValues = detail.data.map(function (v) {
        return wrap$1('initialValue', v);
      }).getOr({});
      return {
        uid: detail.uid,
        dom: {
          tag: 'select',
          classes: detail.selectClasses,
          attributes: detail.selectAttributes
        },
        components: options,
        behaviours: augment(detail.selectBehaviours, [
          Focusing.config({}),
          Representing.config({
            store: __assign({
              mode: 'manual',
              getValue: function (select) {
                return get$9(select.element);
              },
              setValue: function (select, newValue) {
                var found = find$5(detail.options, function (opt) {
                  return opt.value === newValue;
                });
                if (found.isSome()) {
                  set$5(select.element, newValue);
                }
              }
            }, initialValues)
          })
        ])
      };
    };
    var HtmlSelect = single({
      name: 'HtmlSelect',
      configFields: [
        required$1('options'),
        field('selectBehaviours', [
          Focusing,
          Representing
        ]),
        defaulted('selectClasses', []),
        defaulted('selectAttributes', {}),
        option('data')
      ],
      factory: factory$e
    });

    var renderSelectBox = function (spec, providersBackstage) {
      var translatedOptions = map$2(spec.items, function (item) {
        return {
          text: providersBackstage.translate(item.text),
          value: item.value
        };
      });
      var pLabel = spec.label.map(function (label) {
        return renderLabel$2(label, providersBackstage);
      });
      var pField = FormField.parts.field({
        dom: {},
        selectAttributes: { size: spec.size },
        options: translatedOptions,
        factory: HtmlSelect,
        selectBehaviours: derive$1([
          Disabling.config({
            disabled: function () {
              return spec.disabled || providersBackstage.isDisabled();
            }
          }),
          Tabstopping.config({}),
          config('selectbox-change', [run$1(change(), function (component, _) {
              emitWith(component, formChangeEvent, { name: spec.name });
            })])
        ])
      });
      var chevron = spec.size > 1 ? Optional.none() : Optional.some(render$3('chevron-down', {
        tag: 'div',
        classes: ['tox-selectfield__icon-js']
      }, providersBackstage.icons));
      var selectWrap = {
        dom: {
          tag: 'div',
          classes: ['tox-selectfield']
        },
        components: flatten([
          [pField],
          chevron.toArray()
        ])
      };
      return FormField.sketch({
        dom: {
          tag: 'div',
          classes: ['tox-form__group']
        },
        components: flatten([
          pLabel.toArray(),
          [selectWrap]
        ]),
        fieldBehaviours: derive$1([
          Disabling.config({
            disabled: function () {
              return spec.disabled || providersBackstage.isDisabled();
            },
            onDisabled: function (comp) {
              FormField.getField(comp).each(Disabling.disable);
            },
            onEnabled: function (comp) {
              FormField.getField(comp).each(Disabling.enable);
            }
          }),
          receivingConfig()
        ])
      });
    };

    var renderTable = function (spec, providersBackstage) {
      var renderTh = function (text) {
        return {
          dom: {
            tag: 'th',
            innerHtml: providersBackstage.translate(text)
          }
        };
      };
      var renderHeader = function (header) {
        return {
          dom: { tag: 'thead' },
          components: [{
              dom: { tag: 'tr' },
              components: map$2(header, renderTh)
            }]
        };
      };
      var renderTd = function (text) {
        return {
          dom: {
            tag: 'td',
            innerHtml: providersBackstage.translate(text)
          }
        };
      };
      var renderTr = function (row) {
        return {
          dom: { tag: 'tr' },
          components: map$2(row, renderTd)
        };
      };
      var renderRows = function (rows) {
        return {
          dom: { tag: 'tbody' },
          components: map$2(rows, renderTr)
        };
      };
      return {
        dom: {
          tag: 'table',
          classes: ['tox-dialog__table']
        },
        components: [
          renderHeader(spec.header),
          renderRows(spec.cells)
        ],
        behaviours: derive$1([
          Tabstopping.config({}),
          Focusing.config({})
        ])
      };
    };

    var renderTextField = function (spec, providersBackstage) {
      var pLabel = spec.label.map(function (label) {
        return renderLabel$2(label, providersBackstage);
      });
      var baseInputBehaviours = [
        Disabling.config({
          disabled: function () {
            return spec.disabled || providersBackstage.isDisabled();
          }
        }),
        receivingConfig(),
        Keying.config({
          mode: 'execution',
          useEnter: spec.multiline !== true,
          useControlEnter: spec.multiline === true,
          execute: function (comp) {
            emit(comp, formSubmitEvent);
            return Optional.some(true);
          }
        }),
        config('textfield-change', [
          run$1(input(), function (component, _) {
            emitWith(component, formChangeEvent, { name: spec.name });
          }),
          run$1(postPaste(), function (component, _) {
            emitWith(component, formChangeEvent, { name: spec.name });
          })
        ]),
        Tabstopping.config({})
      ];
      var validatingBehaviours = spec.validation.map(function (vl) {
        return Invalidating.config({
          getRoot: function (input) {
            return parent(input.element);
          },
          invalidClass: 'tox-invalid',
          validator: {
            validate: function (input) {
              var v = Representing.getValue(input);
              var result = vl.validator(v);
              return Future.pure(result === true ? Result.value(v) : Result.error(result));
            },
            validateOnLoad: vl.validateOnLoad
          }
        });
      }).toArray();
      var placeholder = spec.placeholder.fold(constant$1({}), function (p) {
        return { placeholder: providersBackstage.translate(p) };
      });
      var inputMode = spec.inputMode.fold(constant$1({}), function (mode) {
        return { inputmode: mode };
      });
      var inputAttributes = __assign(__assign({}, placeholder), inputMode);
      var pField = FormField.parts.field({
        tag: spec.multiline === true ? 'textarea' : 'input',
        inputAttributes: inputAttributes,
        inputClasses: [spec.classname],
        inputBehaviours: derive$1(flatten([
          baseInputBehaviours,
          validatingBehaviours
        ])),
        selectOnFocus: false,
        factory: Input
      });
      var extraClasses = spec.flex ? ['tox-form__group--stretched'] : [];
      var extraClasses2 = extraClasses.concat(spec.maximized ? ['tox-form-group--maximize'] : []);
      var extraBehaviours = [
        Disabling.config({
          disabled: function () {
            return spec.disabled || providersBackstage.isDisabled();
          },
          onDisabled: function (comp) {
            FormField.getField(comp).each(Disabling.disable);
          },
          onEnabled: function (comp) {
            FormField.getField(comp).each(Disabling.enable);
          }
        }),
        receivingConfig()
      ];
      return renderFormFieldWith(pLabel, pField, extraClasses2, extraBehaviours);
    };
    var renderInput = function (spec, providersBackstage) {
      return renderTextField({
        name: spec.name,
        multiline: false,
        label: spec.label,
        inputMode: spec.inputMode,
        placeholder: spec.placeholder,
        flex: false,
        disabled: spec.disabled,
        classname: 'tox-textfield',
        validation: Optional.none(),
        maximized: spec.maximized
      }, providersBackstage);
    };
    var renderTextarea = function (spec, providersBackstage) {
      return renderTextField({
        name: spec.name,
        multiline: true,
        label: spec.label,
        inputMode: Optional.none(),
        placeholder: spec.placeholder,
        flex: true,
        disabled: spec.disabled,
        classname: 'tox-textarea',
        validation: Optional.none(),
        maximized: spec.maximized
      }, providersBackstage);
    };

    var events$6 = function (streamConfig, streamState) {
      var streams = streamConfig.stream.streams;
      var processor = streams.setup(streamConfig, streamState);
      return derive$2([
        run$1(streamConfig.event, processor),
        runOnDetached(function () {
          return streamState.cancel();
        })
      ].concat(streamConfig.cancelEvent.map(function (e) {
        return [run$1(e, function () {
            return streamState.cancel();
          })];
      }).getOr([])));
    };

    var ActiveStreaming = /*#__PURE__*/Object.freeze({
        __proto__: null,
        events: events$6
    });

    var throttle = function (_config) {
      var state = Cell(null);
      var readState = function () {
        return { timer: state.get() !== null ? 'set' : 'unset' };
      };
      var setTimer = function (t) {
        state.set(t);
      };
      var cancel = function () {
        var t = state.get();
        if (t !== null) {
          t.cancel();
        }
      };
      return nu$8({
        readState: readState,
        setTimer: setTimer,
        cancel: cancel
      });
    };
    var init$9 = function (spec) {
      return spec.stream.streams.state(spec);
    };

    var StreamingState = /*#__PURE__*/Object.freeze({
        __proto__: null,
        throttle: throttle,
        init: init$9
    });

    var setup$c = function (streamInfo, streamState) {
      var sInfo = streamInfo.stream;
      var throttler = last(streamInfo.onStream, sInfo.delay);
      streamState.setTimer(throttler);
      return function (component, simulatedEvent) {
        throttler.throttle(component, simulatedEvent);
        if (sInfo.stopEvent) {
          simulatedEvent.stop();
        }
      };
    };
    var StreamingSchema = [
      requiredOf('stream', choose$1('mode', {
        throttle: [
          required$1('delay'),
          defaulted('stopEvent', true),
          output$1('streams', {
            setup: setup$c,
            state: throttle
          })
        ]
      })),
      defaulted('event', 'input'),
      option('cancelEvent'),
      onStrictHandler('onStream')
    ];

    var Streaming = create$7({
      fields: StreamingSchema,
      name: 'streaming',
      active: ActiveStreaming,
      state: StreamingState
    });

    var setValueFromItem = function (model, input, item) {
      var itemData = Representing.getValue(item);
      Representing.setValue(input, itemData);
      setCursorAtEnd(input);
    };
    var setSelectionOn = function (input, f) {
      var el = input.element;
      var value = get$9(el);
      var node = el.dom;
      if (get$c(el, 'type') !== 'number') {
        f(node, value);
      }
    };
    var setCursorAtEnd = function (input) {
      setSelectionOn(input, function (node, value) {
        return node.setSelectionRange(value.length, value.length);
      });
    };
    var setSelectionToEnd = function (input, startOffset) {
      setSelectionOn(input, function (node, value) {
        return node.setSelectionRange(startOffset, value.length);
      });
    };
    var attemptSelectOver = function (model, input, item) {
      if (!model.selectsOver) {
        return Optional.none();
      } else {
        var currentValue = Representing.getValue(input);
        var inputDisplay_1 = model.getDisplayText(currentValue);
        var itemValue = Representing.getValue(item);
        var itemDisplay = model.getDisplayText(itemValue);
        return itemDisplay.indexOf(inputDisplay_1) === 0 ? Optional.some(function () {
          setValueFromItem(model, input, item);
          setSelectionToEnd(input, inputDisplay_1.length);
        }) : Optional.none();
      }
    };

    var itemExecute = constant$1('alloy.typeahead.itemexecute');

    var make$3 = function (detail, components, spec, externals) {
      var navigateList = function (comp, simulatedEvent, highlighter) {
        detail.previewing.set(false);
        var sandbox = Coupling.getCoupled(comp, 'sandbox');
        if (Sandboxing.isOpen(sandbox)) {
          Composing.getCurrent(sandbox).each(function (menu) {
            Highlighting.getHighlighted(menu).fold(function () {
              highlighter(menu);
            }, function () {
              dispatchEvent(sandbox, menu.element, 'keydown', simulatedEvent);
            });
          });
        } else {
          var onOpenSync = function (sandbox) {
            Composing.getCurrent(sandbox).each(highlighter);
          };
          open(detail, mapFetch(comp), comp, sandbox, externals, onOpenSync, HighlightOnOpen.HighlightFirst).get(noop);
        }
      };
      var focusBehaviours$1 = focusBehaviours(detail);
      var mapFetch = function (comp) {
        return function (tdata) {
          return tdata.map(function (data) {
            var menus = values(data.menus);
            var items = bind$3(menus, function (menu) {
              return filter$2(menu.items, function (item) {
                return item.type === 'item';
              });
            });
            var repState = Representing.getState(comp);
            repState.update(map$2(items, function (item) {
              return item.data;
            }));
            return data;
          });
        };
      };
      var behaviours = [
        Focusing.config({}),
        Representing.config({
          onSetValue: detail.onSetValue,
          store: __assign({
            mode: 'dataset',
            getDataKey: function (comp) {
              return get$9(comp.element);
            },
            getFallbackEntry: function (itemString) {
              return {
                value: itemString,
                meta: {}
              };
            },
            setValue: function (comp, data) {
              set$5(comp.element, detail.model.getDisplayText(data));
            }
          }, detail.initialData.map(function (d) {
            return wrap$1('initialValue', d);
          }).getOr({}))
        }),
        Streaming.config({
          stream: {
            mode: 'throttle',
            delay: detail.responseTime,
            stopEvent: false
          },
          onStream: function (component, _simulatedEvent) {
            var sandbox = Coupling.getCoupled(component, 'sandbox');
            var focusInInput = Focusing.isFocused(component);
            if (focusInInput) {
              if (get$9(component.element).length >= detail.minChars) {
                var previousValue_1 = Composing.getCurrent(sandbox).bind(function (menu) {
                  return Highlighting.getHighlighted(menu).map(Representing.getValue);
                });
                detail.previewing.set(true);
                var onOpenSync = function (_sandbox) {
                  Composing.getCurrent(sandbox).each(function (menu) {
                    previousValue_1.fold(function () {
                      if (detail.model.selectsOver) {
                        Highlighting.highlightFirst(menu);
                      }
                    }, function (pv) {
                      Highlighting.highlightBy(menu, function (item) {
                        var itemData = Representing.getValue(item);
                        return itemData.value === pv.value;
                      });
                      Highlighting.getHighlighted(menu).orThunk(function () {
                        Highlighting.highlightFirst(menu);
                        return Optional.none();
                      });
                    });
                  });
                };
                open(detail, mapFetch(component), component, sandbox, externals, onOpenSync, HighlightOnOpen.HighlightFirst).get(noop);
              }
            }
          },
          cancelEvent: typeaheadCancel()
        }),
        Keying.config({
          mode: 'special',
          onDown: function (comp, simulatedEvent) {
            navigateList(comp, simulatedEvent, Highlighting.highlightFirst);
            return Optional.some(true);
          },
          onEscape: function (comp) {
            var sandbox = Coupling.getCoupled(comp, 'sandbox');
            if (Sandboxing.isOpen(sandbox)) {
              Sandboxing.close(sandbox);
              return Optional.some(true);
            }
            return Optional.none();
          },
          onUp: function (comp, simulatedEvent) {
            navigateList(comp, simulatedEvent, Highlighting.highlightLast);
            return Optional.some(true);
          },
          onEnter: function (comp) {
            var sandbox = Coupling.getCoupled(comp, 'sandbox');
            var sandboxIsOpen = Sandboxing.isOpen(sandbox);
            if (sandboxIsOpen && !detail.previewing.get()) {
              return Composing.getCurrent(sandbox).bind(function (menu) {
                return Highlighting.getHighlighted(menu);
              }).map(function (item) {
                emitWith(comp, itemExecute(), { item: item });
                return true;
              });
            } else {
              var currentValue = Representing.getValue(comp);
              emit(comp, typeaheadCancel());
              detail.onExecute(sandbox, comp, currentValue);
              if (sandboxIsOpen) {
                Sandboxing.close(sandbox);
              }
              return Optional.some(true);
            }
          }
        }),
        Toggling.config({
          toggleClass: detail.markers.openClass,
          aria: { mode: 'expanded' }
        }),
        Coupling.config({
          others: {
            sandbox: function (hotspot) {
              return makeSandbox$1(detail, hotspot, {
                onOpen: function () {
                  return Toggling.on(hotspot);
                },
                onClose: function () {
                  return Toggling.off(hotspot);
                }
              });
            }
          }
        }),
        config('typeaheadevents', [
          runOnExecute$1(function (comp) {
            var onOpenSync = noop;
            togglePopup(detail, mapFetch(comp), comp, externals, onOpenSync, HighlightOnOpen.HighlightFirst).get(noop);
          }),
          run$1(itemExecute(), function (comp, se) {
            var sandbox = Coupling.getCoupled(comp, 'sandbox');
            setValueFromItem(detail.model, comp, se.event.item);
            emit(comp, typeaheadCancel());
            detail.onItemExecute(comp, sandbox, se.event.item, Representing.getValue(comp));
            Sandboxing.close(sandbox);
            setCursorAtEnd(comp);
          })
        ].concat(detail.dismissOnBlur ? [run$1(postBlur(), function (typeahead) {
            var sandbox = Coupling.getCoupled(typeahead, 'sandbox');
            if (search(sandbox.element).isNone()) {
              Sandboxing.close(sandbox);
            }
          })] : []))
      ];
      return {
        uid: detail.uid,
        dom: dom(deepMerge(detail, {
          inputAttributes: {
            'role': 'combobox',
            'aria-autocomplete': 'list',
            'aria-haspopup': 'true'
          }
        })),
        behaviours: __assign(__assign({}, focusBehaviours$1), augment(detail.typeaheadBehaviours, behaviours)),
        eventOrder: detail.eventOrder
      };
    };

    var schema$g = constant$1([
      option('lazySink'),
      required$1('fetch'),
      defaulted('minChars', 5),
      defaulted('responseTime', 1000),
      onHandler('onOpen'),
      defaulted('getHotspot', Optional.some),
      defaulted('getAnchorOverrides', constant$1({})),
      defaulted('layouts', Optional.none()),
      defaulted('eventOrder', {}),
      defaultedObjOf('model', {}, [
        defaulted('getDisplayText', function (itemData) {
          return itemData.meta !== undefined && itemData.meta.text !== undefined ? itemData.meta.text : itemData.value;
        }),
        defaulted('selectsOver', true),
        defaulted('populateFromBrowse', true)
      ]),
      onHandler('onSetValue'),
      onKeyboardHandler('onExecute'),
      onHandler('onItemExecute'),
      defaulted('inputClasses', []),
      defaulted('inputAttributes', {}),
      defaulted('inputStyles', {}),
      defaulted('matchWidth', true),
      defaulted('useMinWidth', false),
      defaulted('dismissOnBlur', true),
      markers$1(['openClass']),
      option('initialData'),
      field('typeaheadBehaviours', [
        Focusing,
        Representing,
        Streaming,
        Keying,
        Toggling,
        Coupling
      ]),
      customField('previewing', function () {
        return Cell(true);
      })
    ].concat(schema$k()).concat(sandboxFields()));
    var parts$b = constant$1([external$1({
        schema: [tieredMenuMarkers()],
        name: 'menu',
        overrides: function (detail) {
          return {
            fakeFocus: true,
            onHighlight: function (menu, item) {
              if (!detail.previewing.get()) {
                menu.getSystem().getByUid(detail.uid).each(function (input) {
                  if (detail.model.populateFromBrowse) {
                    setValueFromItem(detail.model, input, item);
                  }
                });
              } else {
                menu.getSystem().getByUid(detail.uid).each(function (input) {
                  attemptSelectOver(detail.model, input, item).fold(function () {
                    return Highlighting.dehighlight(menu, item);
                  }, function (fn) {
                    return fn();
                  });
                });
              }
              detail.previewing.set(false);
            },
            onExecute: function (menu, item) {
              return menu.getSystem().getByUid(detail.uid).toOptional().map(function (typeahead) {
                emitWith(typeahead, itemExecute(), { item: item });
                return true;
              });
            },
            onHover: function (menu, item) {
              detail.previewing.set(false);
              menu.getSystem().getByUid(detail.uid).each(function (input) {
                if (detail.model.populateFromBrowse) {
                  setValueFromItem(detail.model, input, item);
                }
              });
            }
          };
        }
      })]);

    var Typeahead = composite({
      name: 'Typeahead',
      configFields: schema$g(),
      partFields: parts$b(),
      factory: make$3
    });

    var wrap = function (delegate) {
      var toCached = function () {
        return wrap(delegate.toCached());
      };
      var bindFuture = function (f) {
        return wrap(delegate.bind(function (resA) {
          return resA.fold(function (err) {
            return Future.pure(Result.error(err));
          }, function (a) {
            return f(a);
          });
        }));
      };
      var bindResult = function (f) {
        return wrap(delegate.map(function (resA) {
          return resA.bind(f);
        }));
      };
      var mapResult = function (f) {
        return wrap(delegate.map(function (resA) {
          return resA.map(f);
        }));
      };
      var mapError = function (f) {
        return wrap(delegate.map(function (resA) {
          return resA.mapError(f);
        }));
      };
      var foldResult = function (whenError, whenValue) {
        return delegate.map(function (res) {
          return res.fold(whenError, whenValue);
        });
      };
      var withTimeout = function (timeout, errorThunk) {
        return wrap(Future.nu(function (callback) {
          var timedOut = false;
          var timer = setTimeout(function () {
            timedOut = true;
            callback(Result.error(errorThunk()));
          }, timeout);
          delegate.get(function (result) {
            if (!timedOut) {
              clearTimeout(timer);
              callback(result);
            }
          });
        }));
      };
      return __assign(__assign({}, delegate), {
        toCached: toCached,
        bindFuture: bindFuture,
        bindResult: bindResult,
        mapResult: mapResult,
        mapError: mapError,
        foldResult: foldResult,
        withTimeout: withTimeout
      });
    };
    var nu$1 = function (worker) {
      return wrap(Future.nu(worker));
    };
    var value = function (value) {
      return wrap(Future.pure(Result.value(value)));
    };
    var error = function (error) {
      return wrap(Future.pure(Result.error(error)));
    };
    var fromResult = function (result) {
      return wrap(Future.pure(result));
    };
    var fromFuture = function (future) {
      return wrap(future.map(Result.value));
    };
    var fromPromise = function (promise) {
      return nu$1(function (completer) {
        promise.then(function (value) {
          completer(Result.value(value));
        }, function (error) {
          completer(Result.error(error));
        });
      });
    };
    var FutureResult = {
      nu: nu$1,
      wrap: wrap,
      pure: value,
      value: value,
      error: error,
      fromResult: fromResult,
      fromFuture: fromFuture,
      fromPromise: fromPromise
    };

    var separator$1 = { type: 'separator' };
    var toMenuItem = function (target) {
      return {
        type: 'menuitem',
        value: target.url,
        text: target.title,
        meta: { attach: target.attach },
        onAction: noop
      };
    };
    var staticMenuItem = function (title, url) {
      return {
        type: 'menuitem',
        value: url,
        text: title,
        meta: { attach: undefined },
        onAction: noop
      };
    };
    var toMenuItems = function (targets) {
      return map$2(targets, toMenuItem);
    };
    var filterLinkTargets = function (type, targets) {
      return filter$2(targets, function (target) {
        return target.type === type;
      });
    };
    var filteredTargets = function (type, targets) {
      return toMenuItems(filterLinkTargets(type, targets));
    };
    var headerTargets = function (linkInfo) {
      return filteredTargets('header', linkInfo.targets);
    };
    var anchorTargets = function (linkInfo) {
      return filteredTargets('anchor', linkInfo.targets);
    };
    var anchorTargetTop = function (linkInfo) {
      return Optional.from(linkInfo.anchorTop).map(function (url) {
        return staticMenuItem('<top>', url);
      }).toArray();
    };
    var anchorTargetBottom = function (linkInfo) {
      return Optional.from(linkInfo.anchorBottom).map(function (url) {
        return staticMenuItem('<bottom>', url);
      }).toArray();
    };
    var historyTargets = function (history) {
      return map$2(history, function (url) {
        return staticMenuItem(url, url);
      });
    };
    var joinMenuLists = function (items) {
      return foldl(items, function (a, b) {
        var bothEmpty = a.length === 0 || b.length === 0;
        return bothEmpty ? a.concat(b) : a.concat(separator$1, b);
      }, []);
    };
    var filterByQuery = function (term, menuItems) {
      var lowerCaseTerm = term.toLowerCase();
      return filter$2(menuItems, function (item) {
        var text = item.meta !== undefined && item.meta.text !== undefined ? item.meta.text : item.text;
        return contains$1(text.toLowerCase(), lowerCaseTerm) || contains$1(item.value.toLowerCase(), lowerCaseTerm);
      });
    };

    var getItems = function (fileType, input, urlBackstage) {
      var urlInputValue = Representing.getValue(input);
      var term = urlInputValue.meta.text !== undefined ? urlInputValue.meta.text : urlInputValue.value;
      var info = urlBackstage.getLinkInformation();
      return info.fold(function () {
        return [];
      }, function (linkInfo) {
        var history = filterByQuery(term, historyTargets(urlBackstage.getHistory(fileType)));
        return fileType === 'file' ? joinMenuLists([
          history,
          filterByQuery(term, headerTargets(linkInfo)),
          filterByQuery(term, flatten([
            anchorTargetTop(linkInfo),
            anchorTargets(linkInfo),
            anchorTargetBottom(linkInfo)
          ]))
        ]) : history;
      });
    };
    var errorId = generate$6('aria-invalid');
    var renderUrlInput = function (spec, backstage, urlBackstage) {
      var _a;
      var providersBackstage = backstage.shared.providers;
      var updateHistory = function (component) {
        var urlEntry = Representing.getValue(component);
        urlBackstage.addToHistory(urlEntry.value, spec.filetype);
      };
      var pField = FormField.parts.field({
        factory: Typeahead,
        dismissOnBlur: true,
        inputClasses: ['tox-textfield'],
        sandboxClasses: ['tox-dialog__popups'],
        inputAttributes: {
          'aria-errormessage': errorId,
          'type': 'url'
        },
        minChars: 0,
        responseTime: 0,
        fetch: function (input) {
          var items = getItems(spec.filetype, input, urlBackstage);
          var tdata = build(items, ItemResponse$1.BUBBLE_TO_SANDBOX, backstage, false);
          return Future.pure(tdata);
        },
        getHotspot: function (comp) {
          return memUrlBox.getOpt(comp);
        },
        onSetValue: function (comp, _newValue) {
          if (comp.hasConfigured(Invalidating)) {
            Invalidating.run(comp).get(noop);
          }
        },
        typeaheadBehaviours: derive$1(flatten([
          urlBackstage.getValidationHandler().map(function (handler) {
            return Invalidating.config({
              getRoot: function (comp) {
                return parent(comp.element);
              },
              invalidClass: 'tox-control-wrap--status-invalid',
              notify: {
                onInvalid: function (comp, err) {
                  memInvalidIcon.getOpt(comp).each(function (invalidComp) {
                    set$7(invalidComp.element, 'title', providersBackstage.translate(err));
                  });
                }
              },
              validator: {
                validate: function (input) {
                  var urlEntry = Representing.getValue(input);
                  return FutureResult.nu(function (completer) {
                    handler({
                      type: spec.filetype,
                      url: urlEntry.value
                    }, function (validation) {
                      if (validation.status === 'invalid') {
                        var err = Result.error(validation.message);
                        completer(err);
                      } else {
                        var val = Result.value(validation.message);
                        completer(val);
                      }
                    });
                  });
                },
                validateOnLoad: false
              }
            });
          }).toArray(),
          [
            Disabling.config({
              disabled: function () {
                return spec.disabled || providersBackstage.isDisabled();
              }
            }),
            Tabstopping.config({}),
            config('urlinput-events', flatten([
              spec.filetype === 'file' ? [run$1(input(), function (comp) {
                  emitWith(comp, formChangeEvent, { name: spec.name });
                })] : [],
              [
                run$1(change(), function (comp) {
                  emitWith(comp, formChangeEvent, { name: spec.name });
                  updateHistory(comp);
                }),
                run$1(postPaste(), function (comp) {
                  emitWith(comp, formChangeEvent, { name: spec.name });
                  updateHistory(comp);
                })
              ]
            ]))
          ]
        ])),
        eventOrder: (_a = {}, _a[input()] = [
          'streaming',
          'urlinput-events',
          'invalidating'
        ], _a),
        model: {
          getDisplayText: function (itemData) {
            return itemData.value;
          },
          selectsOver: false,
          populateFromBrowse: false
        },
        markers: { openClass: 'tox-textfield--popup-open' },
        lazySink: backstage.shared.getSink,
        parts: { menu: part(false, 1, 'normal') },
        onExecute: function (_menu, component, _entry) {
          emitWith(component, formSubmitEvent, {});
        },
        onItemExecute: function (typeahead, _sandbox, _item, _value) {
          updateHistory(typeahead);
          emitWith(typeahead, formChangeEvent, { name: spec.name });
        }
      });
      var pLabel = spec.label.map(function (label) {
        return renderLabel$2(label, providersBackstage);
      });
      var makeIcon = function (name, errId, icon, label) {
        if (icon === void 0) {
          icon = name;
        }
        if (label === void 0) {
          label = name;
        }
        return render$3(icon, {
          tag: 'div',
          classes: [
            'tox-icon',
            'tox-control-wrap__status-icon-' + name
          ],
          attributes: __assign({
            'title': providersBackstage.translate(label),
            'aria-live': 'polite'
          }, errId.fold(function () {
            return {};
          }, function (id) {
            return { id: id };
          }))
        }, providersBackstage.icons);
      };
      var memInvalidIcon = record(makeIcon('invalid', Optional.some(errorId), 'warning'));
      var memStatus = record({
        dom: {
          tag: 'div',
          classes: ['tox-control-wrap__status-icon-wrap']
        },
        components: [memInvalidIcon.asSpec()]
      });
      var optUrlPicker = urlBackstage.getUrlPicker(spec.filetype);
      var browseUrlEvent = generate$6('browser.url.event');
      var memUrlBox = record({
        dom: {
          tag: 'div',
          classes: ['tox-control-wrap']
        },
        components: [
          pField,
          memStatus.asSpec()
        ],
        behaviours: derive$1([Disabling.config({
            disabled: function () {
              return spec.disabled || providersBackstage.isDisabled();
            }
          })])
      });
      var memUrlPickerButton = record(renderButton({
        name: spec.name,
        icon: Optional.some('browse'),
        text: spec.label.getOr(''),
        disabled: spec.disabled,
        primary: false,
        borderless: true
      }, function (component) {
        return emit(component, browseUrlEvent);
      }, providersBackstage, [], ['tox-browse-url']));
      var controlHWrapper = function () {
        return {
          dom: {
            tag: 'div',
            classes: ['tox-form__controls-h-stack']
          },
          components: flatten([
            [memUrlBox.asSpec()],
            optUrlPicker.map(function () {
              return memUrlPickerButton.asSpec();
            }).toArray()
          ])
        };
      };
      var openUrlPicker = function (comp) {
        Composing.getCurrent(comp).each(function (field) {
          var componentData = Representing.getValue(field);
          var urlData = __assign({ fieldname: spec.name }, componentData);
          optUrlPicker.each(function (picker) {
            picker(urlData).get(function (chosenData) {
              Representing.setValue(field, chosenData);
              emitWith(comp, formChangeEvent, { name: spec.name });
            });
          });
        });
      };
      return FormField.sketch({
        dom: renderFormFieldDom(),
        components: pLabel.toArray().concat([controlHWrapper()]),
        fieldBehaviours: derive$1([
          Disabling.config({
            disabled: function () {
              return spec.disabled || providersBackstage.isDisabled();
            },
            onDisabled: function (comp) {
              FormField.getField(comp).each(Disabling.disable);
              memUrlPickerButton.getOpt(comp).each(Disabling.disable);
            },
            onEnabled: function (comp) {
              FormField.getField(comp).each(Disabling.enable);
              memUrlPickerButton.getOpt(comp).each(Disabling.enable);
            }
          }),
          receivingConfig(),
          config('url-input-events', [run$1(browseUrlEvent, openUrlPicker)])
        ])
      });
    };

    var renderAlertBanner = function (spec, providersBackstage) {
      return Container.sketch({
        dom: {
          tag: 'div',
          attributes: { role: 'alert' },
          classes: [
            'tox-notification',
            'tox-notification--in',
            'tox-notification--' + spec.level
          ]
        },
        components: [
          {
            dom: {
              tag: 'div',
              classes: ['tox-notification__icon']
            },
            components: [Button.sketch({
                dom: {
                  tag: 'button',
                  classes: [
                    'tox-button',
                    'tox-button--naked',
                    'tox-button--icon'
                  ],
                  innerHtml: get$1(spec.icon, providersBackstage.icons),
                  attributes: { title: providersBackstage.translate(spec.iconTooltip) }
                },
                action: function (comp) {
                  emitWith(comp, formActionEvent, {
                    name: 'alert-banner',
                    value: spec.url
                  });
                },
                buttonBehaviours: derive$1([addFocusableBehaviour()])
              })]
          },
          {
            dom: {
              tag: 'div',
              classes: ['tox-notification__body'],
              innerHtml: providersBackstage.translate(spec.text)
            }
          }
        ]
      });
    };

    var renderCheckbox = function (spec, providerBackstage) {
      var repBehaviour = Representing.config({
        store: {
          mode: 'manual',
          getValue: function (comp) {
            var el = comp.element.dom;
            return el.checked;
          },
          setValue: function (comp, value) {
            var el = comp.element.dom;
            el.checked = value;
          }
        }
      });
      var toggleCheckboxHandler = function (comp) {
        comp.element.dom.click();
        return Optional.some(true);
      };
      var pField = FormField.parts.field({
        factory: { sketch: identity$1 },
        dom: {
          tag: 'input',
          classes: ['tox-checkbox__input'],
          attributes: { type: 'checkbox' }
        },
        behaviours: derive$1([
          ComposingConfigs.self(),
          Disabling.config({
            disabled: function () {
              return spec.disabled || providerBackstage.isDisabled();
            }
          }),
          Tabstopping.config({}),
          Focusing.config({}),
          repBehaviour,
          Keying.config({
            mode: 'special',
            onEnter: toggleCheckboxHandler,
            onSpace: toggleCheckboxHandler,
            stopSpaceKeyup: true
          }),
          config('checkbox-events', [run$1(change(), function (component, _) {
              emitWith(component, formChangeEvent, { name: spec.name });
            })])
        ])
      });
      var pLabel = FormField.parts.label({
        dom: {
          tag: 'span',
          classes: ['tox-checkbox__label'],
          innerHtml: providerBackstage.translate(spec.label)
        },
        behaviours: derive$1([Unselecting.config({})])
      });
      var makeIcon = function (className) {
        var iconName = className === 'checked' ? 'selected' : 'unselected';
        return render$3(iconName, {
          tag: 'span',
          classes: [
            'tox-icon',
            'tox-checkbox-icon__' + className
          ]
        }, providerBackstage.icons);
      };
      var memIcons = record({
        dom: {
          tag: 'div',
          classes: ['tox-checkbox__icons']
        },
        components: [
          makeIcon('checked'),
          makeIcon('unchecked')
        ]
      });
      return FormField.sketch({
        dom: {
          tag: 'label',
          classes: ['tox-checkbox']
        },
        components: [
          pField,
          memIcons.asSpec(),
          pLabel
        ],
        fieldBehaviours: derive$1([
          Disabling.config({
            disabled: function () {
              return spec.disabled || providerBackstage.isDisabled();
            },
            disableClass: 'tox-checkbox--disabled',
            onDisabled: function (comp) {
              FormField.getField(comp).each(Disabling.disable);
            },
            onEnabled: function (comp) {
              FormField.getField(comp).each(Disabling.enable);
            }
          }),
          receivingConfig()
        ])
      });
    };

    var renderHtmlPanel = function (spec) {
      if (spec.presets === 'presentation') {
        return Container.sketch({
          dom: {
            tag: 'div',
            classes: ['tox-form__group'],
            innerHtml: spec.html
          }
        });
      } else {
        return Container.sketch({
          dom: {
            tag: 'div',
            classes: ['tox-form__group'],
            innerHtml: spec.html,
            attributes: { role: 'document' }
          },
          containerBehaviours: derive$1([
            Tabstopping.config({}),
            Focusing.config({})
          ])
        });
      }
    };

    var make$2 = function (render) {
      return function (parts, spec, backstage) {
        return get$e(spec, 'name').fold(function () {
          return render(spec, backstage);
        }, function (fieldName) {
          return parts.field(fieldName, render(spec, backstage));
        });
      };
    };
    var makeIframe = function (render) {
      return function (parts, spec, backstage) {
        var iframeSpec = deepMerge(spec, { source: 'dynamic' });
        return make$2(render)(parts, iframeSpec, backstage);
      };
    };
    var factories = {
      bar: make$2(function (spec, backstage) {
        return renderBar(spec, backstage.shared);
      }),
      collection: make$2(function (spec, backstage) {
        return renderCollection(spec, backstage.shared.providers);
      }),
      alertbanner: make$2(function (spec, backstage) {
        return renderAlertBanner(spec, backstage.shared.providers);
      }),
      input: make$2(function (spec, backstage) {
        return renderInput(spec, backstage.shared.providers);
      }),
      textarea: make$2(function (spec, backstage) {
        return renderTextarea(spec, backstage.shared.providers);
      }),
      label: make$2(function (spec, backstage) {
        return renderLabel(spec, backstage.shared);
      }),
      iframe: makeIframe(function (spec, backstage) {
        return renderIFrame(spec, backstage.shared.providers);
      }),
      button: make$2(function (spec, backstage) {
        return renderDialogButton(spec, backstage.shared.providers);
      }),
      checkbox: make$2(function (spec, backstage) {
        return renderCheckbox(spec, backstage.shared.providers);
      }),
      colorinput: make$2(function (spec, backstage) {
        return renderColorInput(spec, backstage.shared, backstage.colorinput);
      }),
      colorpicker: make$2(renderColorPicker),
      dropzone: make$2(function (spec, backstage) {
        return renderDropZone(spec, backstage.shared.providers);
      }),
      grid: make$2(function (spec, backstage) {
        return renderGrid(spec, backstage.shared);
      }),
      listbox: make$2(function (spec, backstage) {
        return renderListBox(spec, backstage);
      }),
      selectbox: make$2(function (spec, backstage) {
        return renderSelectBox(spec, backstage.shared.providers);
      }),
      sizeinput: make$2(function (spec, backstage) {
        return renderSizeInput(spec, backstage.shared.providers);
      }),
      urlinput: make$2(function (spec, backstage) {
        return renderUrlInput(spec, backstage, backstage.urlinput);
      }),
      customeditor: make$2(renderCustomEditor),
      htmlpanel: make$2(renderHtmlPanel),
      imagetools: make$2(function (spec, backstage) {
        return renderImageTools(spec, backstage.shared.providers);
      }),
      table: make$2(function (spec, backstage) {
        return renderTable(spec, backstage.shared.providers);
      }),
      panel: make$2(function (spec, backstage) {
        return renderPanel(spec, backstage);
      })
    };
    var noFormParts = {
      field: function (_name, spec) {
        return spec;
      }
    };
    var interpretInForm = function (parts, spec, oldBackstage) {
      var newBackstage = deepMerge(oldBackstage, {
        shared: {
          interpreter: function (childSpec) {
            return interpretParts(parts, childSpec, newBackstage);
          }
        }
      });
      return interpretParts(parts, spec, newBackstage);
    };
    var interpretParts = function (parts, spec, backstage) {
      return get$e(factories, spec.type).fold(function () {
        console.error('Unknown factory type "' + spec.type + '", defaulting to container: ', spec);
        return spec;
      }, function (factory) {
        return factory(parts, spec, backstage);
      });
    };
    var interpretWithoutForm = function (spec, backstage) {
      var parts = noFormParts;
      return interpretParts(parts, spec, backstage);
    };

    var bubbleAlignments$2 = {
      valignCentre: [],
      alignCentre: [],
      alignLeft: [],
      alignRight: [],
      right: [],
      left: [],
      bottom: [],
      top: []
    };
    var getInlineDialogAnchor = function (contentAreaElement, lazyAnchorbar, lazyUseEditableAreaAnchor) {
      var bubbleSize = 12;
      var overrides = { maxHeightFunction: expandable$1() };
      var editableAreaAnchor = function () {
        return {
          type: 'node',
          root: getContentContainer(contentAreaElement()),
          node: Optional.from(contentAreaElement()),
          bubble: nu$5(bubbleSize, bubbleSize, bubbleAlignments$2),
          layouts: {
            onRtl: function () {
              return [northeast];
            },
            onLtr: function () {
              return [northwest];
            }
          },
          overrides: overrides
        };
      };
      var standardAnchor = function () {
        return {
          type: 'hotspot',
          hotspot: lazyAnchorbar(),
          bubble: nu$5(-bubbleSize, bubbleSize, bubbleAlignments$2),
          layouts: {
            onRtl: function () {
              return [southeast$2];
            },
            onLtr: function () {
              return [southwest$2];
            }
          },
          overrides: overrides
        };
      };
      return function () {
        return lazyUseEditableAreaAnchor() ? editableAreaAnchor() : standardAnchor();
      };
    };
    var getBannerAnchor = function (contentAreaElement, lazyAnchorbar, lazyUseEditableAreaAnchor) {
      var editableAreaAnchor = function () {
        return {
          type: 'node',
          root: getContentContainer(contentAreaElement()),
          node: Optional.from(contentAreaElement()),
          layouts: {
            onRtl: function () {
              return [north];
            },
            onLtr: function () {
              return [north];
            }
          }
        };
      };
      var standardAnchor = function () {
        return {
          type: 'hotspot',
          hotspot: lazyAnchorbar(),
          layouts: {
            onRtl: function () {
              return [south$2];
            },
            onLtr: function () {
              return [south$2];
            }
          }
        };
      };
      return function () {
        return lazyUseEditableAreaAnchor() ? editableAreaAnchor() : standardAnchor();
      };
    };
    var getCursorAnchor = function (editor, bodyElement) {
      return function () {
        return {
          type: 'selection',
          root: bodyElement(),
          getSelection: function () {
            var rng = editor.selection.getRng();
            return Optional.some(SimSelection.range(SugarElement.fromDom(rng.startContainer), rng.startOffset, SugarElement.fromDom(rng.endContainer), rng.endOffset));
          }
        };
      };
    };
    var getNodeAnchor$1 = function (bodyElement) {
      return function (element) {
        return {
          type: 'node',
          root: bodyElement(),
          node: element
        };
      };
    };
    var getAnchors = function (editor, lazyAnchorbar, isToolbarTop) {
      var useFixedToolbarContainer = useFixedContainer(editor);
      var bodyElement = function () {
        return SugarElement.fromDom(editor.getBody());
      };
      var contentAreaElement = function () {
        return SugarElement.fromDom(editor.getContentAreaContainer());
      };
      var lazyUseEditableAreaAnchor = function () {
        return useFixedToolbarContainer || !isToolbarTop();
      };
      return {
        inlineDialog: getInlineDialogAnchor(contentAreaElement, lazyAnchorbar, lazyUseEditableAreaAnchor),
        banner: getBannerAnchor(contentAreaElement, lazyAnchorbar, lazyUseEditableAreaAnchor),
        cursor: getCursorAnchor(editor, bodyElement),
        node: getNodeAnchor$1(bodyElement)
      };
    };

    var colorPicker = function (editor) {
      return function (callback, value) {
        var dialog = colorPickerDialog(editor);
        dialog(callback, value);
      };
    };
    var hasCustomColors = function (editor) {
      return function () {
        return hasCustomColors$1(editor);
      };
    };
    var getColors = function (editor) {
      return function () {
        return getColors$2(editor);
      };
    };
    var getColorCols = function (editor) {
      return function () {
        return getColorCols$1(editor);
      };
    };
    var ColorInputBackstage = function (editor) {
      return {
        colorPicker: colorPicker(editor),
        hasCustomColors: hasCustomColors(editor),
        getColors: getColors(editor),
        getColorCols: getColorCols(editor)
      };
    };

    var isDraggableModal = function (editor) {
      return function () {
        return isDraggableModal$1(editor);
      };
    };
    var DialogBackstage = function (editor) {
      return { isDraggableModal: isDraggableModal(editor) };
    };

    var HeaderBackstage = function (editor) {
      var mode = Cell(isToolbarLocationBottom(editor) ? 'bottom' : 'top');
      return {
        isPositionedAtTop: function () {
          return mode.get() === 'top';
        },
        getDockingMode: mode.get,
        setDockingMode: mode.set
      };
    };

    var defaultStyleFormats = [
      {
        title: 'Headings',
        items: [
          {
            title: 'Heading 1',
            format: 'h1'
          },
          {
            title: 'Heading 2',
            format: 'h2'
          },
          {
            title: 'Heading 3',
            format: 'h3'
          },
          {
            title: 'Heading 4',
            format: 'h4'
          },
          {
            title: 'Heading 5',
            format: 'h5'
          },
          {
            title: 'Heading 6',
            format: 'h6'
          }
        ]
      },
      {
        title: 'Inline',
        items: [
          {
            title: 'Bold',
            format: 'bold'
          },
          {
            title: 'Italic',
            format: 'italic'
          },
          {
            title: 'Underline',
            format: 'underline'
          },
          {
            title: 'Strikethrough',
            format: 'strikethrough'
          },
          {
            title: 'Superscript',
            format: 'superscript'
          },
          {
            title: 'Subscript',
            format: 'subscript'
          },
          {
            title: 'Code',
            format: 'code'
          }
        ]
      },
      {
        title: 'Blocks',
        items: [
          {
            title: 'Paragraph',
            format: 'p'
          },
          {
            title: 'Blockquote',
            format: 'blockquote'
          },
          {
            title: 'Div',
            format: 'div'
          },
          {
            title: 'Pre',
            format: 'pre'
          }
        ]
      },
      {
        title: 'Align',
        items: [
          {
            title: 'Left',
            format: 'alignleft'
          },
          {
            title: 'Center',
            format: 'aligncenter'
          },
          {
            title: 'Right',
            format: 'alignright'
          },
          {
            title: 'Justify',
            format: 'alignjustify'
          }
        ]
      }
    ];
    var isNestedFormat = function (format) {
      return has$2(format, 'items');
    };
    var isBlockFormat = function (format) {
      return has$2(format, 'block');
    };
    var isInlineFormat = function (format) {
      return has$2(format, 'inline');
    };
    var isSelectorFormat = function (format) {
      return has$2(format, 'selector');
    };
    var mapFormats = function (userFormats) {
      return foldl(userFormats, function (acc, fmt) {
        if (isNestedFormat(fmt)) {
          var result = mapFormats(fmt.items);
          return {
            customFormats: acc.customFormats.concat(result.customFormats),
            formats: acc.formats.concat([{
                title: fmt.title,
                items: result.formats
              }])
          };
        } else if (isInlineFormat(fmt) || isBlockFormat(fmt) || isSelectorFormat(fmt)) {
          var formatName = isString(fmt.name) ? fmt.name : fmt.title.toLowerCase();
          var formatNameWithPrefix = 'custom-' + formatName;
          return {
            customFormats: acc.customFormats.concat([{
                name: formatNameWithPrefix,
                format: fmt
              }]),
            formats: acc.formats.concat([{
                title: fmt.title,
                format: formatNameWithPrefix,
                icon: fmt.icon
              }])
          };
        } else {
          return __assign(__assign({}, acc), { formats: acc.formats.concat(fmt) });
        }
      }, {
        customFormats: [],
        formats: []
      });
    };
    var registerCustomFormats = function (editor, userFormats) {
      var result = mapFormats(userFormats);
      var registerFormats = function (customFormats) {
        each$1(customFormats, function (fmt) {
          if (!editor.formatter.has(fmt.name)) {
            editor.formatter.register(fmt.name, fmt.format);
          }
        });
      };
      if (editor.formatter) {
        registerFormats(result.customFormats);
      } else {
        editor.on('init', function () {
          registerFormats(result.customFormats);
        });
      }
      return result.formats;
    };
    var getStyleFormats = function (editor) {
      return getUserStyleFormats(editor).map(function (userFormats) {
        var registeredUserFormats = registerCustomFormats(editor, userFormats);
        return isMergeStyleFormats(editor) ? defaultStyleFormats.concat(registeredUserFormats) : registeredUserFormats;
      }).getOr(defaultStyleFormats);
    };

    var processBasic = function (item, isSelectedFor, getPreviewFor) {
      var formatterSpec = {
        type: 'formatter',
        isSelected: isSelectedFor(item.format),
        getStylePreview: getPreviewFor(item.format)
      };
      return deepMerge(item, formatterSpec);
    };
    var register$8 = function (editor, formats, isSelectedFor, getPreviewFor) {
      var enrichSupported = function (item) {
        return processBasic(item, isSelectedFor, getPreviewFor);
      };
      var enrichMenu = function (item) {
        var submenuSpec = { type: 'submenu' };
        return deepMerge(item, submenuSpec);
      };
      var enrichCustom = function (item) {
        var formatName = isString(item.name) ? item.name : generate$6(item.title);
        var formatNameWithPrefix = 'custom-' + formatName;
        var customSpec = {
          type: 'formatter',
          format: formatNameWithPrefix,
          isSelected: isSelectedFor(formatNameWithPrefix),
          getStylePreview: getPreviewFor(formatNameWithPrefix)
        };
        var newItem = deepMerge(item, customSpec);
        editor.formatter.register(formatName, newItem);
        return newItem;
      };
      var doEnrich = function (items) {
        return map$2(items, function (item) {
          var keys$1 = keys(item);
          if (hasNonNullableKey(item, 'items')) {
            var newItems = doEnrich(item.items);
            return deepMerge(enrichMenu(item), { getStyleItems: constant$1(newItems) });
          } else if (hasNonNullableKey(item, 'format')) {
            return enrichSupported(item);
          } else if (keys$1.length === 1 && contains$2(keys$1, 'title')) {
            return deepMerge(item, { type: 'separator' });
          } else {
            return enrichCustom(item);
          }
        });
      };
      return doEnrich(formats);
    };

    var init$8 = function (editor) {
      var isSelectedFor = function (format) {
        return function () {
          return editor.formatter.match(format);
        };
      };
      var getPreviewFor = function (format) {
        return function () {
          var fmt = editor.formatter.get(format);
          return fmt !== undefined ? Optional.some({
            tag: fmt.length > 0 ? fmt[0].inline || fmt[0].block || 'div' : 'div',
            styles: editor.dom.parseStyle(editor.formatter.getCssText(format))
          }) : Optional.none();
        };
      };
      var flatten = function (fmt) {
        var subs = fmt.items;
        return subs !== undefined && subs.length > 0 ? bind$3(subs, flatten) : [fmt.format];
      };
      var settingsFormats = Cell([]);
      var settingsFlattenedFormats = Cell([]);
      var eventsFormats = Cell([]);
      var eventsFlattenedFormats = Cell([]);
      var replaceSettings = Cell(false);
      editor.on('PreInit', function (_e) {
        var formats = getStyleFormats(editor);
        var enriched = register$8(editor, formats, isSelectedFor, getPreviewFor);
        settingsFormats.set(enriched);
        settingsFlattenedFormats.set(bind$3(enriched, flatten));
      });
      editor.on('addStyleModifications', function (e) {
        var modifications = register$8(editor, e.items, isSelectedFor, getPreviewFor);
        eventsFormats.set(modifications);
        replaceSettings.set(e.replace);
        eventsFlattenedFormats.set(bind$3(modifications, flatten));
      });
      var getData = function () {
        var fromSettings = replaceSettings.get() ? [] : settingsFormats.get();
        var fromEvents = eventsFormats.get();
        return fromSettings.concat(fromEvents);
      };
      var getFlattenedKeys = function () {
        var fromSettings = replaceSettings.get() ? [] : settingsFlattenedFormats.get();
        var fromEvents = eventsFlattenedFormats.get();
        return fromSettings.concat(fromEvents);
      };
      return {
        getData: getData,
        getFlattenedKeys: getFlattenedKeys
      };
    };

    var isElement = function (node) {
      return isNonNullable(node) && node.nodeType === 1;
    };
    var trim = global$6.trim;
    var hasContentEditableState = function (value) {
      return function (node) {
        if (isElement(node)) {
          if (node.contentEditable === value) {
            return true;
          }
          if (node.getAttribute('data-mce-contenteditable') === value) {
            return true;
          }
        }
        return false;
      };
    };
    var isContentEditableTrue = hasContentEditableState('true');
    var isContentEditableFalse = hasContentEditableState('false');
    var create = function (type, title, url, level, attach) {
      return {
        type: type,
        title: title,
        url: url,
        level: level,
        attach: attach
      };
    };
    var isChildOfContentEditableTrue = function (node) {
      while (node = node.parentNode) {
        var value = node.contentEditable;
        if (value && value !== 'inherit') {
          return isContentEditableTrue(node);
        }
      }
      return false;
    };
    var select = function (selector, root) {
      return map$2(descendants(SugarElement.fromDom(root), selector), function (element) {
        return element.dom;
      });
    };
    var getElementText = function (elm) {
      return elm.innerText || elm.textContent;
    };
    var getOrGenerateId = function (elm) {
      return elm.id ? elm.id : generate$6('h');
    };
    var isAnchor = function (elm) {
      return elm && elm.nodeName === 'A' && (elm.id || elm.name) !== undefined;
    };
    var isValidAnchor = function (elm) {
      return isAnchor(elm) && isEditable(elm);
    };
    var isHeader = function (elm) {
      return elm && /^(H[1-6])$/.test(elm.nodeName);
    };
    var isEditable = function (elm) {
      return isChildOfContentEditableTrue(elm) && !isContentEditableFalse(elm);
    };
    var isValidHeader = function (elm) {
      return isHeader(elm) && isEditable(elm);
    };
    var getLevel = function (elm) {
      return isHeader(elm) ? parseInt(elm.nodeName.substr(1), 10) : 0;
    };
    var headerTarget = function (elm) {
      var headerId = getOrGenerateId(elm);
      var attach = function () {
        elm.id = headerId;
      };
      return create('header', getElementText(elm), '#' + headerId, getLevel(elm), attach);
    };
    var anchorTarget = function (elm) {
      var anchorId = elm.id || elm.name;
      var anchorText = getElementText(elm);
      return create('anchor', anchorText ? anchorText : '#' + anchorId, '#' + anchorId, 0, noop);
    };
    var getHeaderTargets = function (elms) {
      return map$2(filter$2(elms, isValidHeader), headerTarget);
    };
    var getAnchorTargets = function (elms) {
      return map$2(filter$2(elms, isValidAnchor), anchorTarget);
    };
    var getTargetElements = function (elm) {
      var elms = select('h1,h2,h3,h4,h5,h6,a:not([href])', elm);
      return elms;
    };
    var hasTitle = function (target) {
      return trim(target.title).length > 0;
    };
    var find = function (elm) {
      var elms = getTargetElements(elm);
      return filter$2(getHeaderTargets(elms).concat(getAnchorTargets(elms)), hasTitle);
    };
    var LinkTargets = { find: find };

    var STORAGE_KEY = 'tinymce-url-history';
    var HISTORY_LENGTH = 5;
    var isHttpUrl = function (url) {
      return isString(url) && /^https?/.test(url);
    };
    var isArrayOfUrl = function (a) {
      return isArray(a) && a.length <= HISTORY_LENGTH && forall(a, isHttpUrl);
    };
    var isRecordOfUrlArray = function (r) {
      return isObject(r) && find$4(r, function (value) {
        return !isArrayOfUrl(value);
      }).isNone();
    };
    var getAllHistory = function () {
      var unparsedHistory = global$9.getItem(STORAGE_KEY);
      if (unparsedHistory === null) {
        return {};
      }
      var history;
      try {
        history = JSON.parse(unparsedHistory);
      } catch (e) {
        if (e instanceof SyntaxError) {
          console.log('Local storage ' + STORAGE_KEY + ' was not valid JSON', e);
          return {};
        }
        throw e;
      }
      if (!isRecordOfUrlArray(history)) {
        console.log('Local storage ' + STORAGE_KEY + ' was not valid format', history);
        return {};
      }
      return history;
    };
    var setAllHistory = function (history) {
      if (!isRecordOfUrlArray(history)) {
        throw new Error('Bad format for history:\n' + JSON.stringify(history));
      }
      global$9.setItem(STORAGE_KEY, JSON.stringify(history));
    };
    var getHistory = function (fileType) {
      var history = getAllHistory();
      return get$e(history, fileType).getOr([]);
    };
    var addToHistory = function (url, fileType) {
      if (!isHttpUrl(url)) {
        return;
      }
      var history = getAllHistory();
      var items = get$e(history, fileType).getOr([]);
      var itemsWithoutUrl = filter$2(items, function (item) {
        return item !== url;
      });
      history[fileType] = [url].concat(itemsWithoutUrl).slice(0, HISTORY_LENGTH);
      setAllHistory(history);
    };

    var isTruthy = function (value) {
      return !!value;
    };
    var makeMap = function (value) {
      return map(global$6.makeMap(value, /[, ]/), isTruthy);
    };
    var getPicker = function (editor) {
      return Optional.from(getFilePickerCallback(editor)).filter(isFunction);
    };
    var getPickerTypes = function (editor) {
      var optFileTypes = Optional.some(getFilePickerTypes(editor)).filter(isTruthy);
      var optLegacyTypes = Optional.some(getFileBrowserCallbackTypes(editor)).filter(isTruthy);
      var optTypes = optFileTypes.or(optLegacyTypes).map(makeMap);
      return getPicker(editor).fold(never, function (_picker) {
        return optTypes.fold(always, function (types) {
          return keys(types).length > 0 ? types : false;
        });
      });
    };
    var getPickerSetting = function (editor, filetype) {
      var pickerTypes = getPickerTypes(editor);
      if (isBoolean(pickerTypes)) {
        return pickerTypes ? getPicker(editor) : Optional.none();
      } else {
        return pickerTypes[filetype] ? getPicker(editor) : Optional.none();
      }
    };
    var getUrlPicker = function (editor, filetype) {
      return getPickerSetting(editor, filetype).map(function (picker) {
        return function (entry) {
          return Future.nu(function (completer) {
            var handler = function (value, meta) {
              if (!isString(value)) {
                throw new Error('Expected value to be string');
              }
              if (meta !== undefined && !isObject(meta)) {
                throw new Error('Expected meta to be a object');
              }
              var r = {
                value: value,
                meta: meta
              };
              completer(r);
            };
            var meta = __assign({
              filetype: filetype,
              fieldname: entry.fieldname
            }, Optional.from(entry.meta).getOr({}));
            picker.call(editor, handler, entry.value, meta);
          });
        };
      });
    };
    var getTextSetting = function (value) {
      return Optional.from(value).filter(isString).getOrUndefined();
    };
    var getLinkInformation = function (editor) {
      if (noTypeaheadUrls(editor)) {
        return Optional.none();
      }
      return Optional.some({
        targets: LinkTargets.find(editor.getBody()),
        anchorTop: getTextSetting(getAnchorTop(editor)),
        anchorBottom: getTextSetting(getAnchorBottom(editor))
      });
    };
    var getValidationHandler = function (editor) {
      return Optional.from(getFilePickerValidatorHandler(editor));
    };
    var UrlInputBackstage = function (editor) {
      return {
        getHistory: getHistory,
        addToHistory: addToHistory,
        getLinkInformation: function () {
          return getLinkInformation(editor);
        },
        getValidationHandler: function () {
          return getValidationHandler(editor);
        },
        getUrlPicker: function (filetype) {
          return getUrlPicker(editor, filetype);
        }
      };
    };

    var init$7 = function (sink, editor, lazyAnchorbar) {
      var contextMenuState = Cell(false);
      var toolbar = HeaderBackstage(editor);
      var backstage = {
        shared: {
          providers: {
            icons: function () {
              return editor.ui.registry.getAll().icons;
            },
            menuItems: function () {
              return editor.ui.registry.getAll().menuItems;
            },
            translate: global$f.translate,
            isDisabled: function () {
              return editor.mode.isReadOnly() || editor.ui.isDisabled();
            },
            getSetting: editor.getParam.bind(editor)
          },
          interpreter: function (s) {
            return interpretWithoutForm(s, backstage);
          },
          anchors: getAnchors(editor, lazyAnchorbar, toolbar.isPositionedAtTop),
          header: toolbar,
          getSink: function () {
            return Result.value(sink);
          }
        },
        urlinput: UrlInputBackstage(editor),
        styleselect: init$8(editor),
        colorinput: ColorInputBackstage(editor),
        dialog: DialogBackstage(editor),
        isContextMenuOpen: function () {
          return contextMenuState.get();
        },
        setContextMenuState: function (state) {
          return contextMenuState.set(state);
        }
      };
      return backstage;
    };

    var setup$b = function (editor, mothership, uiMothership) {
      var broadcastEvent = function (name, evt) {
        each$1([
          mothership,
          uiMothership
        ], function (ship) {
          ship.broadcastEvent(name, evt);
        });
      };
      var broadcastOn = function (channel, message) {
        each$1([
          mothership,
          uiMothership
        ], function (ship) {
          ship.broadcastOn([channel], message);
        });
      };
      var fireDismissPopups = function (evt) {
        return broadcastOn(dismissPopups(), { target: evt.target });
      };
      var onTouchstart = bind(SugarElement.fromDom(document), 'touchstart', fireDismissPopups);
      var onTouchmove = bind(SugarElement.fromDom(document), 'touchmove', function (evt) {
        return broadcastEvent(documentTouchmove(), evt);
      });
      var onTouchend = bind(SugarElement.fromDom(document), 'touchend', function (evt) {
        return broadcastEvent(documentTouchend(), evt);
      });
      var onMousedown = bind(SugarElement.fromDom(document), 'mousedown', fireDismissPopups);
      var onMouseup = bind(SugarElement.fromDom(document), 'mouseup', function (evt) {
        if (evt.raw.button === 0) {
          broadcastOn(mouseReleased(), { target: evt.target });
        }
      });
      var onContentClick = function (raw) {
        return broadcastOn(dismissPopups(), { target: SugarElement.fromDom(raw.target) });
      };
      var onContentMouseup = function (raw) {
        if (raw.button === 0) {
          broadcastOn(mouseReleased(), { target: SugarElement.fromDom(raw.target) });
        }
      };
      var onContentMousedown = function () {
        each$1(editor.editorManager.get(), function (loopEditor) {
          if (editor !== loopEditor) {
            loopEditor.fire('DismissPopups', { relatedTarget: editor });
          }
        });
      };
      var onWindowScroll = function (evt) {
        return broadcastEvent(windowScroll(), fromRawEvent(evt));
      };
      var onWindowResize = function (evt) {
        broadcastOn(repositionPopups(), {});
        broadcastEvent(windowResize(), fromRawEvent(evt));
      };
      var onEditorResize = function () {
        return broadcastOn(repositionPopups(), {});
      };
      var onEditorProgress = function (evt) {
        if (evt.state) {
          broadcastOn(dismissPopups(), { target: SugarElement.fromDom(editor.getContainer()) });
        }
      };
      var onDismissPopups = function (event) {
        broadcastOn(dismissPopups(), { target: SugarElement.fromDom(event.relatedTarget.getContainer()) });
      };
      editor.on('PostRender', function () {
        editor.on('click', onContentClick);
        editor.on('tap', onContentClick);
        editor.on('mouseup', onContentMouseup);
        editor.on('mousedown', onContentMousedown);
        editor.on('ScrollWindow', onWindowScroll);
        editor.on('ResizeWindow', onWindowResize);
        editor.on('ResizeEditor', onEditorResize);
        editor.on('AfterProgressState', onEditorProgress);
        editor.on('DismissPopups', onDismissPopups);
      });
      editor.on('remove', function () {
        editor.off('click', onContentClick);
        editor.off('tap', onContentClick);
        editor.off('mouseup', onContentMouseup);
        editor.off('mousedown', onContentMousedown);
        editor.off('ScrollWindow', onWindowScroll);
        editor.off('ResizeWindow', onWindowResize);
        editor.off('ResizeEditor', onEditorResize);
        editor.off('AfterProgressState', onEditorProgress);
        editor.off('DismissPopups', onDismissPopups);
        onMousedown.unbind();
        onTouchstart.unbind();
        onTouchmove.unbind();
        onTouchend.unbind();
        onMouseup.unbind();
      });
      editor.on('detach', function () {
        detachSystem(mothership);
        detachSystem(uiMothership);
        mothership.destroy();
        uiMothership.destroy();
      });
    };

    var parts$a = AlloyParts;
    var partType = PartType;

    var schema$f = constant$1([
      defaulted('shell', false),
      required$1('makeItem'),
      defaulted('setupItem', noop),
      SketchBehaviours.field('listBehaviours', [Replacing])
    ]);
    var customListDetail = function () {
      return { behaviours: derive$1([Replacing.config({})]) };
    };
    var itemsPart = optional({
      name: 'items',
      overrides: customListDetail
    });
    var parts$9 = constant$1([itemsPart]);
    var name = constant$1('CustomList');

    var factory$d = function (detail, components, _spec, _external) {
      var setItems = function (list, items) {
        getListContainer(list).fold(function () {
          console.error('Custom List was defined to not be a shell, but no item container was specified in components');
          throw new Error('Custom List was defined to not be a shell, but no item container was specified in components');
        }, function (container) {
          var itemComps = Replacing.contents(container);
          var numListsRequired = items.length;
          var numListsToAdd = numListsRequired - itemComps.length;
          var itemsToAdd = numListsToAdd > 0 ? range$2(numListsToAdd, function () {
            return detail.makeItem();
          }) : [];
          var itemsToRemove = itemComps.slice(numListsRequired);
          each$1(itemsToRemove, function (item) {
            return Replacing.remove(container, item);
          });
          each$1(itemsToAdd, function (item) {
            return Replacing.append(container, item);
          });
          var builtLists = Replacing.contents(container);
          each$1(builtLists, function (item, i) {
            detail.setupItem(list, item, items[i], i);
          });
        });
      };
      var extra = detail.shell ? {
        behaviours: [Replacing.config({})],
        components: []
      } : {
        behaviours: [],
        components: components
      };
      var getListContainer = function (component) {
        return detail.shell ? Optional.some(component) : getPart(component, detail, 'items');
      };
      return {
        uid: detail.uid,
        dom: detail.dom,
        components: extra.components,
        behaviours: augment(detail.listBehaviours, extra.behaviours),
        apis: { setItems: setItems }
      };
    };
    var CustomList = composite({
      name: name(),
      configFields: schema$f(),
      partFields: parts$9(),
      factory: factory$d,
      apis: {
        setItems: function (apis, list, items) {
          apis.setItems(list, items);
        }
      }
    });

    var schema$e = constant$1([
      required$1('dom'),
      defaulted('shell', true),
      field('toolbarBehaviours', [Replacing])
    ]);
    var enhanceGroups = function () {
      return { behaviours: derive$1([Replacing.config({})]) };
    };
    var parts$8 = constant$1([optional({
        name: 'groups',
        overrides: enhanceGroups
      })]);

    var factory$c = function (detail, components, _spec, _externals) {
      var setGroups = function (toolbar, groups) {
        getGroupContainer(toolbar).fold(function () {
          console.error('Toolbar was defined to not be a shell, but no groups container was specified in components');
          throw new Error('Toolbar was defined to not be a shell, but no groups container was specified in components');
        }, function (container) {
          Replacing.set(container, groups);
        });
      };
      var getGroupContainer = function (component) {
        return detail.shell ? Optional.some(component) : getPart(component, detail, 'groups');
      };
      var extra = detail.shell ? {
        behaviours: [Replacing.config({})],
        components: []
      } : {
        behaviours: [],
        components: components
      };
      return {
        uid: detail.uid,
        dom: detail.dom,
        components: extra.components,
        behaviours: augment(detail.toolbarBehaviours, extra.behaviours),
        apis: { setGroups: setGroups },
        domModification: { attributes: { role: 'group' } }
      };
    };
    var Toolbar = composite({
      name: 'Toolbar',
      configFields: schema$e(),
      partFields: parts$8(),
      factory: factory$c,
      apis: {
        setGroups: function (apis, toolbar, groups) {
          apis.setGroups(toolbar, groups);
        }
      }
    });

    var setup$a = noop;
    var isDocked$2 = never;
    var getBehaviours$1 = constant$1([]);

    var StaticHeader = /*#__PURE__*/Object.freeze({
        __proto__: null,
        setup: setup$a,
        isDocked: isDocked$2,
        getBehaviours: getBehaviours$1
    });

    var getOffsetParent = function (element) {
      var isFixed = is(getRaw(element, 'position'), 'fixed');
      var offsetParent$1 = isFixed ? Optional.none() : offsetParent(element);
      return offsetParent$1.orThunk(function () {
        var marker = SugarElement.fromTag('span');
        return parent(element).bind(function (parent) {
          append$2(parent, marker);
          var offsetParent$1 = offsetParent(marker);
          remove$7(marker);
          return offsetParent$1;
        });
      });
    };
    var getOrigin = function (element) {
      return getOffsetParent(element).map(absolute$3).getOrThunk(function () {
        return SugarPosition(0, 0);
      });
    };

    var morphAdt = Adt.generate([
      { static: [] },
      { absolute: ['positionCss'] },
      { fixed: ['positionCss'] }
    ]);
    var appear = function (component, contextualInfo) {
      var elem = component.element;
      add$2(elem, contextualInfo.transitionClass);
      remove$3(elem, contextualInfo.fadeOutClass);
      add$2(elem, contextualInfo.fadeInClass);
      contextualInfo.onShow(component);
    };
    var disappear = function (component, contextualInfo) {
      var elem = component.element;
      add$2(elem, contextualInfo.transitionClass);
      remove$3(elem, contextualInfo.fadeInClass);
      add$2(elem, contextualInfo.fadeOutClass);
      contextualInfo.onHide(component);
    };
    var isPartiallyVisible = function (box, viewport) {
      return box.y < viewport.bottom && box.bottom > viewport.y;
    };
    var isTopCompletelyVisible = function (box, viewport) {
      return box.y >= viewport.y;
    };
    var isBottomCompletelyVisible = function (box, viewport) {
      return box.bottom <= viewport.bottom;
    };
    var isVisibleForModes = function (modes, box, viewport) {
      return forall(modes, function (mode) {
        switch (mode) {
        case 'bottom':
          return isBottomCompletelyVisible(box, viewport);
        case 'top':
          return isTopCompletelyVisible(box, viewport);
        }
      });
    };
    var getPrior = function (elem, state) {
      return state.getInitialPos().map(function (pos) {
        return bounds(pos.bounds.x, pos.bounds.y, get$7(elem), get$8(elem));
      });
    };
    var storePrior = function (elem, box, state) {
      state.setInitialPos({
        style: getAllRaw(elem),
        position: get$a(elem, 'position') || 'static',
        bounds: box
      });
    };
    var revertToOriginal = function (elem, box, state) {
      return state.getInitialPos().bind(function (position) {
        state.clearInitialPos();
        switch (position.position) {
        case 'static':
          return Optional.some(morphAdt.static());
        case 'absolute':
          var offsetBox_1 = getOffsetParent(elem).map(box$1).getOrThunk(function () {
            return box$1(body());
          });
          return Optional.some(morphAdt.absolute(NuPositionCss('absolute', get$e(position.style, 'left').map(function (_left) {
            return box.x - offsetBox_1.x;
          }), get$e(position.style, 'top').map(function (_top) {
            return box.y - offsetBox_1.y;
          }), get$e(position.style, 'right').map(function (_right) {
            return offsetBox_1.right - box.right;
          }), get$e(position.style, 'bottom').map(function (_bottom) {
            return offsetBox_1.bottom - box.bottom;
          }))));
        default:
          return Optional.none();
        }
      });
    };
    var morphToOriginal = function (elem, viewport, state) {
      return getPrior(elem, state).filter(function (box) {
        return isVisibleForModes(state.getModes(), box, viewport);
      }).bind(function (box) {
        return revertToOriginal(elem, box, state);
      });
    };
    var morphToFixed = function (elem, viewport, state) {
      var box = box$1(elem);
      if (!isVisibleForModes(state.getModes(), box, viewport)) {
        storePrior(elem, box, state);
        var winBox = win();
        var left = box.x - winBox.x;
        var top_1 = viewport.y - winBox.y;
        var bottom = winBox.bottom - viewport.bottom;
        var isTop = box.y <= viewport.y;
        return Optional.some(morphAdt.fixed(NuPositionCss('fixed', Optional.some(left), isTop ? Optional.some(top_1) : Optional.none(), Optional.none(), !isTop ? Optional.some(bottom) : Optional.none())));
      } else {
        return Optional.none();
      }
    };
    var getMorph = function (component, viewport, state) {
      var elem = component.element;
      var isDocked = is(getRaw(elem, 'position'), 'fixed');
      return isDocked ? morphToOriginal(elem, viewport, state) : morphToFixed(elem, viewport, state);
    };
    var getMorphToOriginal = function (component, state) {
      var elem = component.element;
      return getPrior(elem, state).bind(function (box) {
        return revertToOriginal(elem, box, state);
      });
    };

    var morphToStatic = function (component, config) {
      each$1([
        'left',
        'right',
        'top',
        'bottom',
        'position'
      ], function (prop) {
        return remove$1(component.element, prop);
      });
      config.onUndocked(component);
    };
    var morphToCoord = function (component, config, position) {
      applyPositionCss(component.element, position);
      var method = position.position === 'fixed' ? config.onDocked : config.onUndocked;
      method(component);
    };
    var updateVisibility = function (component, config, state, viewport, morphToDocked) {
      if (morphToDocked === void 0) {
        morphToDocked = false;
      }
      config.contextual.each(function (contextInfo) {
        contextInfo.lazyContext(component).each(function (box) {
          var isVisible = isPartiallyVisible(box, viewport);
          if (isVisible !== state.isVisible()) {
            state.setVisible(isVisible);
            if (morphToDocked && !isVisible) {
              add$1(component.element, [contextInfo.fadeOutClass]);
              contextInfo.onHide(component);
            } else {
              var method = isVisible ? appear : disappear;
              method(component, contextInfo);
            }
          }
        });
      });
    };
    var refreshInternal = function (component, config, state) {
      var viewport = config.lazyViewport(component);
      var isDocked = state.isDocked();
      if (isDocked) {
        updateVisibility(component, config, state, viewport);
      }
      getMorph(component, viewport, state).each(function (morph) {
        state.setDocked(!isDocked);
        morph.fold(function () {
          return morphToStatic(component, config);
        }, function (position) {
          return morphToCoord(component, config, position);
        }, function (position) {
          updateVisibility(component, config, state, viewport, true);
          morphToCoord(component, config, position);
        });
      });
    };
    var resetInternal = function (component, config, state) {
      var elem = component.element;
      state.setDocked(false);
      getMorphToOriginal(component, state).each(function (morph) {
        morph.fold(function () {
          return morphToStatic(component, config);
        }, function (position) {
          return morphToCoord(component, config, position);
        }, noop);
      });
      state.setVisible(true);
      config.contextual.each(function (contextInfo) {
        remove$2(elem, [
          contextInfo.fadeInClass,
          contextInfo.fadeOutClass,
          contextInfo.transitionClass
        ]);
        contextInfo.onShow(component);
      });
      refresh$4(component, config, state);
    };
    var refresh$4 = function (component, config, state) {
      if (component.getSystem().isConnected()) {
        refreshInternal(component, config, state);
      }
    };
    var reset = function (component, config, state) {
      if (state.isDocked()) {
        resetInternal(component, config, state);
      }
    };
    var isDocked$1 = function (component, config, state) {
      return state.isDocked();
    };
    var setModes = function (component, config, state, modes) {
      return state.setModes(modes);
    };
    var getModes = function (component, config, state) {
      return state.getModes();
    };

    var DockingApis = /*#__PURE__*/Object.freeze({
        __proto__: null,
        refresh: refresh$4,
        reset: reset,
        isDocked: isDocked$1,
        getModes: getModes,
        setModes: setModes
    });

    var events$5 = function (dockInfo, dockState) {
      return derive$2([
        runOnSource(transitionend(), function (component, simulatedEvent) {
          dockInfo.contextual.each(function (contextInfo) {
            if (has(component.element, contextInfo.transitionClass)) {
              remove$2(component.element, [
                contextInfo.transitionClass,
                contextInfo.fadeInClass
              ]);
              var notify = dockState.isVisible() ? contextInfo.onShown : contextInfo.onHidden;
              notify(component);
            }
            simulatedEvent.stop();
          });
        }),
        run$1(windowScroll(), function (component, _) {
          refresh$4(component, dockInfo, dockState);
        }),
        run$1(windowResize(), function (component, _) {
          reset(component, dockInfo, dockState);
        })
      ]);
    };

    var ActiveDocking = /*#__PURE__*/Object.freeze({
        __proto__: null,
        events: events$5
    });

    var DockingSchema = [
      optionObjOf('contextual', [
        requiredString('fadeInClass'),
        requiredString('fadeOutClass'),
        requiredString('transitionClass'),
        requiredFunction('lazyContext'),
        onHandler('onShow'),
        onHandler('onShown'),
        onHandler('onHide'),
        onHandler('onHidden')
      ]),
      defaultedFunction('lazyViewport', win),
      defaultedArrayOf('modes', [
        'top',
        'bottom'
      ], string),
      onHandler('onDocked'),
      onHandler('onUndocked')
    ];

    var init$6 = function (spec) {
      var docked = Cell(false);
      var visible = Cell(true);
      var initialBounds = value$1();
      var modes = Cell(spec.modes);
      var readState = function () {
        return 'docked:  ' + docked.get() + ', visible: ' + visible.get() + ', modes: ' + modes.get().join(',');
      };
      return nu$8({
        isDocked: docked.get,
        setDocked: docked.set,
        getInitialPos: initialBounds.get,
        setInitialPos: initialBounds.set,
        clearInitialPos: initialBounds.clear,
        isVisible: visible.get,
        setVisible: visible.set,
        getModes: modes.get,
        setModes: modes.set,
        readState: readState
      });
    };

    var DockingState = /*#__PURE__*/Object.freeze({
        __proto__: null,
        init: init$6
    });

    var Docking = create$7({
      fields: DockingSchema,
      name: 'docking',
      active: ActiveDocking,
      apis: DockingApis,
      state: DockingState
    });

    var toolbarHeightChange = constant$1(generate$6('toolbar-height-change'));

    var visibility = {
      fadeInClass: 'tox-editor-dock-fadein',
      fadeOutClass: 'tox-editor-dock-fadeout',
      transitionClass: 'tox-editor-dock-transition'
    };
    var editorStickyOnClass = 'tox-tinymce--toolbar-sticky-on';
    var editorStickyOffClass = 'tox-tinymce--toolbar-sticky-off';
    var scrollFromBehindHeader = function (e, containerHeader) {
      var doc = owner$4(containerHeader);
      var viewHeight = doc.dom.defaultView.innerHeight;
      var scrollPos = get$6(doc);
      var markerElement = SugarElement.fromDom(e.elm);
      var markerPos = absolute$2(markerElement);
      var markerHeight = get$8(markerElement);
      var markerTop = markerPos.y;
      var markerBottom = markerTop + markerHeight;
      var editorHeaderPos = absolute$3(containerHeader);
      var editorHeaderHeight = get$8(containerHeader);
      var editorHeaderTop = editorHeaderPos.top;
      var editorHeaderBottom = editorHeaderTop + editorHeaderHeight;
      var editorHeaderDockedAtTop = Math.abs(editorHeaderTop - scrollPos.top) < 2;
      var editorHeaderDockedAtBottom = Math.abs(editorHeaderBottom - (scrollPos.top + viewHeight)) < 2;
      if (editorHeaderDockedAtTop && markerTop < editorHeaderBottom) {
        to(scrollPos.left, markerTop - editorHeaderHeight, doc);
      } else if (editorHeaderDockedAtBottom && markerBottom > editorHeaderTop) {
        var y = markerTop - viewHeight + markerHeight + editorHeaderHeight;
        to(scrollPos.left, y, doc);
      }
    };
    var isDockedMode = function (header, mode) {
      return contains$2(Docking.getModes(header), mode);
    };
    var updateIframeContentFlow = function (header) {
      var getOccupiedHeight = function (elm) {
        return getOuter$1(elm) + (parseInt(get$a(elm, 'margin-top'), 10) || 0) + (parseInt(get$a(elm, 'margin-bottom'), 10) || 0);
      };
      var elm = header.element;
      parent(elm).each(function (parentElem) {
        var padding = 'padding-' + Docking.getModes(header)[0];
        if (Docking.isDocked(header)) {
          var parentWidth = get$7(parentElem);
          set$6(elm, 'width', parentWidth + 'px');
          set$6(parentElem, padding, getOccupiedHeight(elm) + 'px');
        } else {
          remove$1(elm, 'width');
          remove$1(parentElem, padding);
        }
      });
    };
    var updateSinkVisibility = function (sinkElem, visible) {
      if (visible) {
        remove$3(sinkElem, visibility.fadeOutClass);
        add$1(sinkElem, [
          visibility.transitionClass,
          visibility.fadeInClass
        ]);
      } else {
        remove$3(sinkElem, visibility.fadeInClass);
        add$1(sinkElem, [
          visibility.fadeOutClass,
          visibility.transitionClass
        ]);
      }
    };
    var updateEditorClasses = function (editor, docked) {
      var editorContainer = SugarElement.fromDom(editor.getContainer());
      if (docked) {
        add$2(editorContainer, editorStickyOnClass);
        remove$3(editorContainer, editorStickyOffClass);
      } else {
        add$2(editorContainer, editorStickyOffClass);
        remove$3(editorContainer, editorStickyOnClass);
      }
    };
    var restoreFocus = function (headerElem, focusedElem) {
      var ownerDoc = owner$4(focusedElem);
      active(ownerDoc).filter(function (activeElm) {
        return !eq(focusedElem, activeElm);
      }).filter(function (activeElm) {
        return eq(activeElm, SugarElement.fromDom(ownerDoc.dom.body)) || contains(headerElem, activeElm);
      }).each(function () {
        return focus$3(focusedElem);
      });
    };
    var findFocusedElem = function (rootElm, lazySink) {
      return search(rootElm).orThunk(function () {
        return lazySink().toOptional().bind(function (sink) {
          return search(sink.element);
        });
      });
    };
    var setup$9 = function (editor, sharedBackstage, lazyHeader) {
      if (!editor.inline) {
        if (!sharedBackstage.header.isPositionedAtTop()) {
          editor.on('ResizeEditor', function () {
            lazyHeader().each(Docking.reset);
          });
        }
        editor.on('ResizeWindow ResizeEditor', function () {
          lazyHeader().each(updateIframeContentFlow);
        });
        editor.on('SkinLoaded', function () {
          lazyHeader().each(function (comp) {
            Docking.isDocked(comp) ? Docking.reset(comp) : Docking.refresh(comp);
          });
        });
        editor.on('FullscreenStateChanged', function () {
          lazyHeader().each(Docking.reset);
        });
      }
      editor.on('AfterScrollIntoView', function (e) {
        lazyHeader().each(function (header) {
          Docking.refresh(header);
          var headerElem = header.element;
          if (isVisible(headerElem)) {
            scrollFromBehindHeader(e, headerElem);
          }
        });
      });
      editor.on('PostRender', function () {
        updateEditorClasses(editor, false);
      });
    };
    var isDocked = function (lazyHeader) {
      return lazyHeader().map(Docking.isDocked).getOr(false);
    };
    var getIframeBehaviours = function () {
      var _a;
      return [Receiving.config({ channels: (_a = {}, _a[toolbarHeightChange()] = { onReceive: updateIframeContentFlow }, _a) })];
    };
    var getBehaviours = function (editor, sharedBackstage) {
      var focusedElm = value$1();
      var lazySink = sharedBackstage.getSink;
      var runOnSinkElement = function (f) {
        lazySink().each(function (sink) {
          return f(sink.element);
        });
      };
      var onDockingSwitch = function (comp) {
        if (!editor.inline) {
          updateIframeContentFlow(comp);
        }
        updateEditorClasses(editor, Docking.isDocked(comp));
        comp.getSystem().broadcastOn([repositionPopups()], {});
        lazySink().each(function (sink) {
          return sink.getSystem().broadcastOn([repositionPopups()], {});
        });
      };
      var additionalBehaviours = editor.inline ? [] : getIframeBehaviours();
      return __spreadArray([
        Focusing.config({}),
        Docking.config({
          contextual: __assign({
            lazyContext: function (comp) {
              var headerHeight = getOuter$1(comp.element);
              var container = editor.inline ? editor.getContentAreaContainer() : editor.getContainer();
              var box = box$1(SugarElement.fromDom(container));
              var boxHeight = box.height - headerHeight;
              var topBound = box.y + (isDockedMode(comp, 'top') ? 0 : headerHeight);
              return Optional.some(bounds(box.x, topBound, box.width, boxHeight));
            },
            onShow: function () {
              runOnSinkElement(function (elem) {
                return updateSinkVisibility(elem, true);
              });
            },
            onShown: function (comp) {
              runOnSinkElement(function (elem) {
                return remove$2(elem, [
                  visibility.transitionClass,
                  visibility.fadeInClass
                ]);
              });
              focusedElm.get().each(function (elem) {
                restoreFocus(comp.element, elem);
                focusedElm.clear();
              });
            },
            onHide: function (comp) {
              findFocusedElem(comp.element, lazySink).fold(focusedElm.clear, focusedElm.set);
              runOnSinkElement(function (elem) {
                return updateSinkVisibility(elem, false);
              });
            },
            onHidden: function () {
              runOnSinkElement(function (elem) {
                return remove$2(elem, [visibility.transitionClass]);
              });
            }
          }, visibility),
          lazyViewport: function (comp) {
            var win$1 = win();
            var offset = getStickyToolbarOffset(editor);
            var top = win$1.y + (isDockedMode(comp, 'top') ? offset : 0);
            var height = win$1.height - (isDockedMode(comp, 'bottom') ? offset : 0);
            return bounds(win$1.x, top, win$1.width, height);
          },
          modes: [sharedBackstage.header.getDockingMode()],
          onDocked: onDockingSwitch,
          onUndocked: onDockingSwitch
        })
      ], additionalBehaviours);
    };

    var StickyHeader = /*#__PURE__*/Object.freeze({
        __proto__: null,
        setup: setup$9,
        isDocked: isDocked,
        getBehaviours: getBehaviours
    });

    var renderHeader = function (spec) {
      var editor = spec.editor;
      var getBehaviours$2 = spec.sticky ? getBehaviours : getBehaviours$1;
      return {
        uid: spec.uid,
        dom: spec.dom,
        components: spec.components,
        behaviours: derive$1(getBehaviours$2(editor, spec.sharedBackstage))
      };
    };

    var groupToolbarButtonSchema = objOf([
      requiredString('type'),
      requiredOf('items', oneOf([
        arrOfObj([
          requiredString('name'),
          requiredArrayOf('items', string)
        ]),
        string
      ]))
    ].concat(baseToolbarButtonFields));
    var createGroupToolbarButton = function (spec) {
      return asRaw('GroupToolbarButton', groupToolbarButtonSchema, spec);
    };

    var baseMenuButtonFields = [
      optionString('text'),
      optionString('tooltip'),
      optionString('icon'),
      requiredFunction('fetch'),
      defaultedFunction('onSetup', function () {
        return noop;
      })
    ];

    var MenuButtonSchema = objOf(__spreadArray([requiredString('type')], baseMenuButtonFields));
    var createMenuButton = function (spec) {
      return asRaw('menubutton', MenuButtonSchema, spec);
    };

    var splitButtonSchema = objOf([
      requiredString('type'),
      optionString('tooltip'),
      optionString('icon'),
      optionString('text'),
      optionFunction('select'),
      requiredFunction('fetch'),
      defaultedFunction('onSetup', function () {
        return noop;
      }),
      defaultedStringEnum('presets', 'normal', [
        'normal',
        'color',
        'listpreview'
      ]),
      defaulted('columns', 1),
      requiredFunction('onAction'),
      requiredFunction('onItemAction')
    ]);
    var createSplitButton = function (spec) {
      return asRaw('SplitButton', splitButtonSchema, spec);
    };

    var factory$b = function (detail, spec) {
      var setMenus = function (comp, menus) {
        var newMenus = map$2(menus, function (m) {
          var buttonSpec = {
            type: 'menubutton',
            text: m.text,
            fetch: function (callback) {
              callback(m.getItems());
            }
          };
          var internal = createMenuButton(buttonSpec).mapError(function (errInfo) {
            return formatError(errInfo);
          }).getOrDie();
          return renderMenuButton(internal, 'tox-mbtn', spec.backstage, Optional.some('menuitem'));
        });
        Replacing.set(comp, newMenus);
      };
      var apis = {
        focus: Keying.focusIn,
        setMenus: setMenus
      };
      return {
        uid: detail.uid,
        dom: detail.dom,
        components: [],
        behaviours: derive$1([
          Replacing.config({}),
          config('menubar-events', [
            runOnAttached(function (component) {
              detail.onSetup(component);
            }),
            run$1(mouseover(), function (comp, se) {
              descendant(comp.element, '.' + 'tox-mbtn--active').each(function (activeButton) {
                closest$1(se.event.target, '.' + 'tox-mbtn').each(function (hoveredButton) {
                  if (!eq(activeButton, hoveredButton)) {
                    comp.getSystem().getByDom(activeButton).each(function (activeComp) {
                      comp.getSystem().getByDom(hoveredButton).each(function (hoveredComp) {
                        Dropdown.expand(hoveredComp);
                        Dropdown.close(activeComp);
                        Focusing.focus(hoveredComp);
                      });
                    });
                  }
                });
              });
            }),
            run$1(focusShifted(), function (comp, se) {
              se.event.prevFocus.bind(function (prev) {
                return comp.getSystem().getByDom(prev).toOptional();
              }).each(function (prev) {
                se.event.newFocus.bind(function (nu) {
                  return comp.getSystem().getByDom