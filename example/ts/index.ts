
// const a: Object = {  c: 1, d: 2 }

// console.log({...a})

// let isDone: boolean = false

// let who: string = 'our'
// let str: string = 'luck you'
// let str2: string = 'luck me'
// let str3: string = `luck ${who}`

// console.log(str)
// console.log(str2)
// console.log(str3)


// 方式一： 在数据类型后面接上[]
// let arr1: string[] = ['you', 'me', 'our']
// // 方式二： 使用数组泛型， Array<数据类型>
// let arr2: Array<string> = ['a', 'b', 'c']

// let arr3: Array<any> = ['a', 2, true]
// console.log(arr3)


// let n: null = null
// let u: undefined = undefined

// console.log(n)
// console.log(u)

// let obj: object = { a: 1, b2: 2 }
// console.log(obj)


// let obj2: Array<number> = { a: 1, b2: 2 }
// console.log(obj2)


// let t: [string, string, number] = ['a', 'b', 2]
// // t.push(1)
// // t.unshift(1)
// t.pop()
// t.shift()
// console.log(t)

// enum NumEnum1 {
//   one,
//   one2 = Infinity,
//   two = 3,
//   there,
//   four
// }

// enum StrEnum1 {
//   a = 'a1',
//   b = 'b1'
// }

// enum BooleanEnum1 {
//   flag = true
// }

// console.log(NumEnum1)
// console.log(StrEnum1)

// // console.log(BooleanEnum1)

// console.log(NumEnum1[0] === 'one')
// console.log(NumEnum1['one'] === 0)
// console.log(StrEnum1['a'] === 'a1')
// console.log(StrEnum1['a1'] === 'a')



// enum Str1{
//   s1 = 'a',
//   s2 = 'b'
// }

// enum Str2 {
//   s1 = Str1.s1,
//   s2 = Str1.s2
// }

// enum Str3 {
//   s1 = 'a',
//   s2 = Str1.s1
// }

// const enum Str1 {
//   a = 1,
//   b = 2
// }
// console.log(Str1)
// console.log(Str1['a'])

// const enum Str {
//   a = 'a',
//   b = 'b'
// }
// console.log(Str)
// let s: Str = Str.a

// let num: any = {}

// num.toFixed()


// let num1: any = 1
// let num2: number = 2
// let num3: string = num2
// let num4: string = String(num2)
// let num5: string = num1
// let num6: any = num2

// let n: any = 1
// console.log(n.m)


// let obj: any = {
//   a: 1,
//   b: 2
// }

// obj()

// let num2: string = obj.a
// console.log(num2)

// let obj: any = [1 ,2 ,'3']

// let num2: string = obj[0]
// console.log(num2)

// function aa (): void {
//   console.log('ccc')
//   return 'ccc'
// }

// aa()

// let aa: void = null
// let bb: void = undefined
// let cc: void = 'cc'
// let dd: void = 11
// let ff: void = true
// let ee: void = {}

// let aa: null = null

// let bb: string = aa
// console.log(bb)

// let notSure: unknown = 'aaa'
// notSure = 1
// let str:number = notSure
// setTimeout(() => {
//   notSure = 1
// }, 100)
// setTimeout(() => {
//   let str:number = notSure
// }, 200)
// const obj: unknown = {}
// obj.a = 'a'

// let num: unknown = 22
// let str: string = <string>num

// let a: string | number

// let b:number = (<string>a).length

// let a: string | number = 1

// if (typeof a === 'string') {
//   console.log((<string>a).length)
// }
// if (typeof a === 'number') {
//   console.log(String(a).length)
// }


// function getFirst (val: string | number): string {
//   return (<string>val).substr(0, 1)
// }

// getFirst(3)

// const obj: object = {};
// (<any>obj).name = 'lwx';
// (<any>obj).job = 'lol player';



// function getLength (val: any): any {
//   return val.length
// }

// const len = <number>getLength(<string>'lwx')
// console.log(len)

// interface User {
//   name: string,
//   sex: string,
//   readonly card: Number,
//   job?: string
// }

// const lwx: User = <User>{
//   name: 'lwx',
//   sex: '男',
// }

// interface User {
//   name: string,
//   sex: string
// }

// const lwx: User = <User>{
//   name: 'lwx',
//   sex: '男',
//   job: 'lol player'
// }


// interface User {
//   name: string,
//   sex: string,
//   [prop: string]: string | number | boolean
// }

// const lwx: User = {
//   name: 'lwx',
//   sex: '男',
//   job: 'lol player',
//   height: 100
// }

// interface User {
//   name: string,
//   sex: string,
//   [prop: string]: string | number | boolean,
//   [otherProp: number]: string | number | boolean
// }

// const arr: ReadonlyArray<number> = [1, 2]
// const obj = {
//   a: 1
// }
// obj.a = 2

// let arr2: ReadonlyArray<string> = ['a', 'b', 'c']
// arr2.push('d')
// arr2[0] = 'd'
// arr2.length = 0

// interface Add {
//   (x: number, y: string): string
// }

// // 调用接口
// let add: Add = (x: number, y: string) => `${x},${y}`;
// // console.log( add(1, 2) );   // 3
// interface User {
//   name: string,
//   readonly card: Number
// }

// const lwx: User = {
//   name: 'lwx',
//   card: 362426
// }

// lwx.card = 3
// interface O {
//   a: number,
//   readonly b: number
// }
// const obj: O = {
//   a: 1,
//   b: 2
// }
// obj.a = 3 // succes 成功
// obj.b = 4 // error 失败 无法分配到 "b" ，因为它是只读属性。
// obj = {} // error 失败


// function getRandom (min: number, max: number): number {
//   return Math.random() * (max - min) + min
// }

// getRandom(0, 100)

// interface random {
//   (n: number, x: number): number
// }
// interface random {
//   (n: number, f: string, x: number): string // error 错误的 ,和参数名没关系，而是和顺序有关。
// }
// let getRandom: random = function (min, max, flag) {
//   return (Math.random() * (max - min) + min) + flag
// }

// getRandom(0, 100, '秒')


// interface classCalc {
//   min: number,
//   add (p: number, n: number) :number, // 加
//   subtract (p: number, n: number) :number, // 减
//   multiply (p: number, n: number) :number, // 乘
//   dvide (p: number, n: number) :number // 除
// }


// class Calc implements classCalc {
//   max: number = null
//   min: number
//   constructor () {
//     this.min = null
//   }
//   add (n1: number, n2: number) {
//     return n1 + n2
//   }
//   subtract (n1: number, n2: number) {
//     return n1 - n2
//   }
//   multiply (n1: number, n2: number) {
//     return n1 * n2
//   }
//   dvide (n1: number, n2: number) {
//     return n1 / n2
//   }
//   floatCalc () {}
// }

// interface classCalc {
//   new (max: number)
// }


// class Calc implements classCalc {
//   constructor (m: number) {
//   }
// }

// interface Biology { // 生物 接口
//   weight: number,
//   height: number,
//   age: number,
//   desc: string
// }
// interface Person { // 人 接口
//   name: string,
//   job: string,
//   hobby: string
// }

// interface man extends Biology, Person { // 男人 接口

// }

// interface O {
//   readonly name: string,
//   age?: number,
//   hobby: Array<string>,
//   base: object,
//   (x: string): string
// }
// const play: O = (x: string) => { return x }
// play.hobby = ['']
// play.base = {}

// interface O {
//   a: number,
//   readonly b: Array<string>
// }
// const obj: O = {
//   a: 1,
//   b: ['a', 'b', 'c']
// }
// obj.a = 3 // succes 成功
// obj = {} // error 失败 无法分配到 "obj" ，因为它是常数。
// obj.b = [] // error 失败 无法分配到 "b" ，因为它是只读属性。
// obj.b[0] = 'd'  // succes 成功