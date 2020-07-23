---
description: '平常我们在做一些金额的计算上就会用到浮点数的计算，于是我们快乐在代码中写到 `0.1+0.2`'
---
# JS浮点数计算的奥义  
平常我们在做一些金额的计算上就会用到浮点数的计算，于是我们快乐在代码中写到 `0.1+0.2` , 然后就是一句卧槽 
![](https://user-gold-cdn.xitu.io/2020/3/31/1712f73d24664a1e?w=253&h=118&f=png&s=5375)
为啥后面多了这么多的0，然后计算之后产品大大发现怎么少了一分钱， 是不是你偷了。我这是跳进黄河也是洗不清啊。

## js浮点数计算有误
这个古怪的问题不只会出现在JavaScript中，这是计算机科学中一个普遍存在的问题，影响了很多的语言。这是个被称为机器精度的问题。当JavaScript尝试执行 `0.1+0.2`这行代码的时候会把值转换成二进制。这就是问题的起源，0.1实际上并不是0.1，而是其二进制形式。从本质上将，当你写下这些值的时候，它们注定要失去精度。

### 如何解决呢
 普遍的方法是就数值放大到整数然后再进行相应的加减乘除。下面就是相关代码
 ```
class FloatCalc {
    // 判断是否为整数
    isInteger (val) {
        return Math.floor(val) === val  
    },
    // 将小数转成整数
	toInteger (val) {
		let ret = {
			times: 1,
			num: 0
		}
		if (this.isInteger(val)) {
			ret.num = val
			return ret
		}

		val = String(val)
		const decimalLength = val.substr(val.indexOf('.')).length
		ret.times = Math.pow(10, decimalLength)
		ret.num = parseInt(val * ret.times + 0.5, 10)
		return ret
	}
    // 进行计算
	calc (n1, n2, operation) {
		const { num:enlargeNum1, times:enlargeTimes1 } = this.toInteger(n1)
		const { num:enlargeNum2, times:enlargeTimes2  } = this.toInteger(n2)
		
		const maxTimes = enlargeTimes1 > enlargeTimes2 ? enlargeTimes1 : enlargeTimes2
		let res = null

		switch (operation) {
			case 'add':
				if (enlargeTimes1 === enlargeTimes2) {
					res = enlargeNum1 + enlargeNum2
				} else if (enlargeTimes1 > enlargeTimes2) {
					res = enlargeNum1 + enlargeNum2 * (enlargeTimes1 / enlargeTimes2)
				} else if (enlargeTimes1 < enlargeTimes2) {
					res = enlargeNum1 * (enlargeTimes2 / enlargeTimes1) + enlargeNum2
				}
				return res / maxTimes
			case 'subtract':
				if (enlargeTimes1 === enlargeTimes2) {
					res = enlargeNum1 - enlargeNum2
				} else if (enlargeTimes1 > enlargeTimes2) {
					res = enlargeNum1 - enlargeNum2 * (enlargeTimes1 / enlargeTimes2)
				} else if (enlargeTimes1 < enlargeTimes2) {
					res = enlargeNum1 * (enlargeTimes2 / enlargeTimes1) - enlargeNum2
				}
				return res / maxTimes
			case 'multiply':
				return (enlargeNum1 * enlargeNum2) / (enlargeTimes1 * enlargeTimes2)
			case 'dvide':
				return (enlargeNum1 / enlargeNum2) * (enlargeTimes2 / enlargeTimes1)
		}
	}
	add (n1, n2) {
		return this.calc(n1, n2, 'add')
	}
	subtract (n1, n2) {
		return this.calc(n1, n2, 'subtract')
	}
	multiply (n1, n2) {
		return this.calc(n1, n2, 'multiply')
	}
	dvide (n1, n2) {
		return this.calc(n1, n2, 'dvide')
	}
}
 ```
 这样我们就可以进行一个浮点数的计算，使用方法如下：
 ```
 const $Calc = new FloatCalc()
 $Calc.add(0.1, 0.2)
 // 0.3
 ```
 计算出的结果就是 `0.3` 了，不会是 `0.30000000000000004`。
 
 
 ## 如何更好的解决
 
 **但是呢，这样就不太直观，并且对于`(0.1+0.3)*5.2 -0.3`这样我们就要调用多次，显的很臃肿。我们是否能定义一个函数， `floatCalc('(0.1+0.2)*5.2 -0.3')` , 传入一个字符串表达式，就可以直接计算出相应的结果呢？**
 
 
 于是就出炉下面的代码----------------------------------------------------------
 
 由于用了一些公共方法，所以懒了点， 直接复制过来，代码上半段就是这些方法
 ```
/**
	* @description 判断传入参数是否是字符串
	* @param { * } val 需要判断的值
	* @returns { Boolean } 如果是字符串 则返回 true , 否则返回 false
  */
 const isString = val => {
	return Object.prototype.toString.call(val) === '[object String]'
}

/**
	* @description 去除空格
	* @param { String } string 需要去除空格的字符串
	* @param { String } type 按照格式去除，
				如： 默认(default) 去除全部空格, 
						左边(left) 去除左边空格
						右边(rihgt) 去除右边空格
						两边(trim) 去除两边空格
	* @returns { Boolean } 如果是字符串 则返回 true , 否则返回 false
  */
 const removeBlankSpace = (string, type = 'default') => {
	if(!isString(string)) {
		console.error('[removeBlankSpace]:所传入的不是个字符串！')
		return
	}

	if (!string) {
		return string
	}
	
	if (type === 'default') {
		const defaultTrim = /\s*/g
		return string.replace(defaultTrim, '')
	} else if (type === 'left') {
		const leftTrim = /^\s*/g
		return string.replace(leftTrim, '')
	} else if (type === 'right') {
		const rightTrim = /\s*$/g
		return string.replace(rightTrim, '')
	} else if (type === 'trim') {
		return string.trim()
	}
}

 /**
	* @method
	* @description 反转字符串
	* @param { String } val 所需要反转的字符串
	* @returns { String } 反转之后的字符串
	*/
const reverseString = val => {
	return val.split('').reverse().join('')
}

const FloatCalc = require('./floatCalc')
const $Calc = new FloatCalc()
 /**
	* @method
	* @description 浮点数计算,
	  仅支持 加减乘除或带括号的加减乘除
	* @param { String } expression 计算表达式
	* @returns { Number } 计算后的值
	*/
const floatCalc = expression => {
	if(!isString(expression)) {
		console.error('[floatCalc]:所传入的不是个字符串表达式！')
		return
	}

	expression = removeBlankSpace(expression)
	const reg = /(\*)|(\+)|(\-)|(\/)/g
	const index = expression.lastIndexOf('(')
	const firstExpress = ['*', '/']
	const lastExpress = ['+', '-']
	const mapTree = {
		'+': 'add',
		'-': 'subtract',
		'*': 'multiply',
		'/': 'dvide'
	}

	let needContent = ''
	if (index !== -1) {
		// 表达式中有括号
		const subStr = expression.substr(index)
		needContent = subStr.substring(1, subStr.indexOf(')'))
	} else {
		// 表达式中没有括号
		needContent = expression
	}

		
	let tree = needContent.split(reg).filter(i => {
		return i !== undefined && i !== ''
	})

	tree.forEach((item, index) => {
		if (firstExpress.indexOf(item) !== -1) {
			const calcRes = $Calc[mapTree[item]](tree[index - 1],  tree[index + 1])
			tree.splice(index - 1, 3, calcRes)
		}
	})
	tree.forEach((item, index) => {
		if (lastExpress.indexOf(item) !== -1) {
			const calcRes = $Calc[mapTree[item]](tree[index - 1],  tree[index + 1])
			tree.splice(index - 1, 3, calcRes)
		}
	})
	if (index !== -1) {
		const reverseEx = reverseString(expression)
		const reverseCon = reverseString(`(${needContent})`)
		const reverseRes = reverseString(String(tree[0]))

		const currentRes = reverseString(reverseEx.replace(reverseCon, reverseRes))
		return floatCalc(currentRes)
	} else {
		return tree[0]
	}
}

 ```
 
 **赶快试试 `floatCalc('(0.1+0.2)*5.2 -0.3')` 吧！**
 
![](https://user-gold-cdn.xitu.io/2020/3/31/1712fb1976f57d43?w=478&h=225&f=png&s=19733)

**再看看在浏览器中的计算结果**

![](https://user-gold-cdn.xitu.io/2020/3/31/1712fb28b5af7c6f?w=246&h=68&f=png&s=4073)

```!
注意： 对于传入不合规字符，则返回NaN
```