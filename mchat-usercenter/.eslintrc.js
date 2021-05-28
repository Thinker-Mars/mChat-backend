module.exports = {
	root: true,
	env: {
		node: true
	},
	globals: {
		'module': true,
		'Promise': true,
		'Map': true
	},
	parserOptions: {
		'ecmaVersion': 6,
		'sourceType': 'module'
	},
	extends: ['eslint:recommended'],
	rules: {
		// 禁用
		'no-alert': 0,
		// 禁止多个空格
		'no-multi-spaces': 'error',
		// 使用单引号
		'quotes': ['error', 'single'],
		// 强制在代码块中开括号前和闭括号后有空格
		'block-spacing': ['error', 'always'],
		// 要求使用骆驼拼写法
		'camelcase': ['error', {
			'properties': 'always'
		}],
		// 大括号风格要求
		'brace-style': ['error', '1tbs', {
			'allowSingleLine': true
		}],
		// 禁用拖尾逗号
		'comma-dangle': ['error', 'never'],
		'comma-spacing': ['error', {
			// 禁止在逗号前使用空格
			'before': false,
			// 逗号后使用一个或多个空格
			'after': true
		}],
		// 要求逗号放在数组元素、对象属性或变量声明之后，且在同一行
		'comma-style': ['error', 'last'],
		// 控制语句强制使用大括号
		'curly': ['error', 'multi-line'],
		// 表达式中的点号操作符应该和属性在同一行
		'dot-location': ['error', 'property'],
		// 强制文件末尾不要有换行符
		'eol-last': 2,
		// 要求使用 === 和 !==
		'eqeqeq': ['error', 'always', { 'null': 'ignore' }],
		// 强制generator函数中 * 号周围有空格
		'generator-star-spacing': ['error', {
			// * 和 function 关键字之间有空格
			'before': true,
			// * 和函数名之间有空格
			'after': true
		}],
		// 强制缩进使用tab
		'indent': ['error', 'tab', {
			// 强制 switch 语句中的 case 子句的缩进级别
			'SwitchCase': 1
		}],
		// 强制在对象字面量的键和值之间使用一致的空格
		'key-spacing': ['error', {
			// 禁止在对象字面量的键和冒号之间存在空格
			'beforeColon': false,
			// 要求在对象字面量的冒号和值之间存在至少有一个空格
			'afterColon': true
		}],
		// 强制关键字周围空格的一致性
		'keyword-spacing': ['error', {
			// 要求在关键字之前至少有一个空格
			'before': true,
			// 要求在关键字之后至少有一个空格
			'after': true
		}],
		// 要求构造函数首字母大写
		'new-cap': ['error', {
			// 要求调用 new 操作符时有首字母大小的函数
			'newIsCap': true,
			// 要求调用首字母大写的函数时有 new 操作符
			'capIsNew': false
		}],
		// 要求调用无参构造函数时带括号
		'new-parens': 'error',
		// 禁止使用 Array 构造函数
		'no-array-constructor': 'error',
		// 禁用 caller 或 callee
		'no-caller': 'error',
		// 不允许修改类声明的变量
		'no-class-assign': 'error',
		// 禁止在条件语句中出现赋值操作符
		'no-cond-assign': 'error',
		// 不允许改变用const声明的变量
		'no-const-assign': 'error',
		// 禁止在正则表达式中使用控制字符
		'no-control-regex': 'error',
		// 禁止删除变量
		'no-delete-var': 'error',
		// 禁止在 function 定义中出现重复的参数
		'no-dupe-args': 'error',
		// 不允许类成员中有重复的名称
		'no-dupe-class-members': 'error',
		// 禁止在对象字面量中出现重复的键
		'no-dupe-keys': 'error',
		// 禁止重复 case 标签
		'no-duplicate-case': 'error',
		// 禁止在正则表达式中出现空字符集
		'no-empty-character-class': 'error',
		// 禁止使用空解构模式
		'no-empty-pattern': 'error',
		// 禁用 eval
		'no-eval': 'error',
		// 禁止对 catch 子句中的异常重新赋值
		'no-ex-assign': 'error',
		// 禁止扩展原生对象
		'no-extend-native': 'error',
		// 禁止不必要的函数绑定
		'no-extra-bind': 'error',
		// 禁止不必要的布尔类型转换
		'no-extra-boolean-cast': 'error',
		// 禁止冗余的括号
		'no-extra-parens': ['error', 'functions'],
		// 禁止 case 语句落空(需使用break)
		'no-fallthrough': 'error',
		// 禁止浮点小数
		'no-floating-decimal': 'error',
		// 禁止对 function 声明重新赋值
		'no-func-assign': 'error',
		// 禁用隐式的eval()
		'no-implied-eval': 'error',
		// 禁止在嵌套的语句块中出现 function 声明
		'no-inner-declarations': ['error', 'functions'],
		// 禁止在 RegExp 构造函数中出现无效的正则表达式
		'no-invalid-regexp': 'error',
		// 禁止不规则的空白
		'no-irregular-whitespace': 'error',
		// 禁用与变量同名的标签
		'no-label-var': 'error',
		// 禁止使用 空格 和 tab 混合缩进
		'no-mixed-spaces-and-tabs': 'error',
		// 禁止多行字符串
		'no-multi-str': 'error',
		// 不允许多个空行
		'no-multiple-empty-lines': ['error', {
			'max': 1
		}],
		// 禁止使用 Object 构造函数
		'no-new-object': 'error',
		// 禁止原始包装实例
		'no-new-wrappers': 'error',
		// 禁止将全局对象当作函数进行调用
		'no-obj-calls': 'error',
		// 禁用八进制字面量
		'no-octal': 'error',
		// 禁止在字符串字面量中使用八进制转义序列
		// 应该使用 Unicode 转义序列
		'no-octal-escape': 'error',
		// 禁用__proto__
		// 使用 Object.getPrototypeOf 和 Object.setPrototypeOf 代替
		'no-proto': 'error',
		// 禁止重新声明变量
		'no-redeclare': 'error',
		// 禁止正则表达式字面量中出现多个空格
		'no-regex-spaces': 'error',
		// 禁止在返回语句中赋值, 除非使用括号把它们括起来
		'no-return-assign': ['error', 'except-parens'],
		// 禁止自身赋值
		'no-self-assign': 'error',
		// 禁止自身比较
		'no-self-compare': 'error',
		// 不允许使用逗号操作符
		'no-sequences': 'error',
		// 关键字不能被遮蔽
		'no-shadow-restricted-names': 'error',
		// 禁用稀疏数组
		'no-sparse-arrays': 'error',
		// 禁止在构造函数中，在调用 super() 之前使用 this 或 super
		'no-this-before-super': 'error',
		// 限制可以被抛出的异常
		'no-throw-literal': 'error',
		// 禁用行尾空格
		'no-trailing-spaces': 'error',
		// // 禁用未声明的变量
		'no-undef': 'error',
		// 禁止可以表达为更简单结构的三元操作符
		'no-unneeded-ternary': ['error', {
			// 禁止条件表达式作为默认的赋值模式
			'defaultAssignment': false
		}],
		// 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
		'no-unreachable': 'error',
		// 禁止在 finally 语句块中出现控制流语句
		// 如: return、throw、break 和 continue
		'no-unsafe-finally': 'error',
		// 禁止未使用过的变量
		'no-unused-vars': [2, {
			'vars': 'all',
			'args': 'none'
		}],
		// 禁用不必要的构造函数
		'no-useless-constructor': 'error',
		// 禁用不必要的转义
		'no-useless-escape': 'error',
		// 禁止属性前有空白
		'no-whitespace-before-property': 'error',
		// 禁用 with 语句
		'no-with': 'error',
		// 强制函数中的变量分开声明
		'one-var': ['error', {
			'initialized': 'never'
		}],
		// 强制操作符使用一致的换行符风格
		// 要求把换行符放在操作符后面
		'operator-linebreak': ['error', 'after', {
			'overrides': {
				'?': 'before',
				':': 'before'
			}
		}],
		// 禁止块语句和类的开始或末尾有空行
		'padded-blocks': ['error', 'never'],
		// 要求在语句末尾使用分号
		'semi': ['error', 'always'],
		// 强制分号前后有空格
		'semi-spacing': [2, {
			// 分号之前禁止有空格
			'before': false,
			// 分号之后强制有空格
			'after': true
		}],
		// 块语句必须总是至少有一个前置空格
		'space-before-blocks': ['error', 'always'],
		// 禁止在参数的 ( 前面有空格
		'space-before-function-paren': ['error', 'never'],
		// 强制圆括号内没有空格
		'space-in-parens': ['error', 'never'],
		// 要求中缀操作符周围有空格
		'space-infix-ops': 'error',
		// 要求或禁止在一元操作符之前或之后存在空格
		'space-unary-ops': ['error', {
			'words': true,
			'nonwords': false
		}],
		// 强制在注释中 // 或 /* 使用一致的空格
		'spaced-comment': ['error', 'always', {
			'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
		}],
		// 禁止模板字符串花括号内出现空格
		'template-curly-spacing': ['error', 'never'],
		// 要求使用 isNaN() 检查 NaN
		'use-isnan': 'error',
		// 强制 typeof 表达式与有效的字符串进行比较
		'valid-typeof': 'error',
		// 需要把立即执行的函数包裹起来
		// 但允许其它风格
		'wrap-iife': ['error', 'any'],
		// 强制在 yield* 表达式中 * 周围使用空格
		'yield-star-spacing': ['error', 'both'],
		// 比较时，变量在右
		'yoda': ['error', 'never'],
		// 要求使用 const 声明那些声明后不再被修改的变量
		'prefer-const': 'error',
		// 禁止使用var声明变量
		'no-var': 'error',
		// 强制在花括号中使用一致的空格
		'object-curly-spacing': ['error', 'always', {
			objectsInObjects: false
		}],
		// 禁止在数组括号内出现空格
		'array-bracket-spacing': ['error', 'never']
	}
};
