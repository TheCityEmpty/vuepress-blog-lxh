---
  description: '最近公司在做智能硬件的小程序，做的好好地，突然说要做蓝牙模块，我擦，不懂， 没用过。于是开始研究小程序BLE蓝牙是如何连接， 如何发送消息的。经历了漫长的时间，终于写了一个SDK出来。'
  types: ['小程序', '低功耗蓝牙', 'SDK']
---
# 小程序蓝牙接口SDK
最近公司在做智能硬件的小程序，做的好好地，突然说要做蓝牙模块，我擦，不懂， 没用过。于是开始研究小程序BLE蓝牙是如何连接， 如何发送消息的。经历了漫长的时间，终于写了一个SDK出来。直接看代码：

## 低功耗蓝牙SDK

```js
/* eslint-disable */
class Bluetooth {
  /**
   * Create a BLE Bluetooth Connection.
   * @constructor
   * @param options -object with following keys:
   *
   * * macAddress - the mac adress, like "00:1B:35:14:09:84",capital
   * * localName - the device name, like "lock000002"
   * * service - the target service characteristic
   * * notifyChar - the target read characteristic
   * * writerChar - the target write characteristic
   * * log - whether print log or not
   * * dispatcher - callback, receive events and message
   */
  constructor({
                macAddress = '',
                localName = '',
                service = '',
                notifyChar = '',
                writeChar = '',
                log = false,
                dispatcher = () => {
                }
              }) {
    if (!Bluetooth.instance) {
      this.setParams({
        macAddress,
        localName,
        service,
        notifyChar,
        writeChar,
        log,
        dispatcher
      })
      // 用于连接和发消息传参
      this.deviceId = null
      this.isDiscovery = false
      this.MTU = 20
      
      // 针对安卓分包发送必须受到回复才能继续发送
      this.sendDataIndex = 0
      this.anArrayBuffer = []
      // 标记是否正在连接，避免重复连接
      this.isConnect = false
      this.TYPE = {
        LOG: 0,
        CLOSED: 1,
        DISCOVERED: 2,
        CONNECTED: 3,
        SERVICE: 4,
        CHARAREAD: 5,
        CHARWRITE: 6,
        DISCONNECTED: 7,
        RECEIVE: 8
      }
      Bluetooth.instance = this
    }
    Bluetooth.instance.start()
    return Bluetooth.instance
  }
  setParams({
              macAddress = '',
              localName = '',
              service = '',
              notifyChar = '',
              writeChar = '',
              log = false,
              dispatcher = () => {
              }
            }) {
    this.log = log
    this.dispatcher = dispatcher
    this.platform = this.getAppSystem()
    this.macAddress = macAddress.toUpperCase()
    this.localName = localName
    this.printLog('当前平台：', this.platform)
    if (this.platform === 'ios') {
      this.service = service.toUpperCase()
      this.notifyChar = notifyChar.toUpperCase()
      this.writeChar = writeChar.toUpperCase()
    } else if (this.platform === 'android') {
      this.service = service.toLowerCase()
      this.notifyChar = notifyChar.toLowerCase()
      this.writeChar = writeChar.toLowerCase()
    }
  }
  getAppSystem() {
    // 'ios' 'android'
    const info = wx.getSystemInfoSync()
    return info.platform
  }
  // 是否打印日志
  printLog() {
    if (this.log) {
      console.log(...arguments)
    }
  }
  /**
   * dispatch message to the caller.
   * @param data
   * @param type:
   *
   * * 0-log,
   * * 1-bluetooth adapter closed,
   * * 2-bluetooth discovered,
   * * 3-bluetooth connected,
   * * 4-service discovered,
   * * 5-characteristic discovered,
   */
  dispatchMsg(data, type = 0, otherParam) {
    if (this.dispatcher !== undefined) {
      this.dispatcher({
        type: type,
        data: data,
        otherParam
      })
    }
  }
  /**
   * * to send a message[ArrayBuffer] by this connection.
   */
  async sendMsg(arrayBuffer, callBack) {
    if (Array.isArray(arrayBuffer)) {
      this.sendDataIndex = arrayBuffer.length
      this.anArrayBuffer = arrayBuffer
      this.sendDataIndex--
      await this.awaitFn(this.deviceId, this.service, this.writeChar, this.anArrayBuffer[0])
    } else {
      await this.awaitFn(this.deviceId, this.service, this.writeChar, arrayBuffer)
      callBack && callBack()
    }
  }
  /**
   * * return the MTU of this connection.
   */
  getMTU() {
    return this.MTU
  }
  /**
   * * start to create connection.
   */
  start() {
    this.openBluetooth()
  }
  openBluetooth() {
    const that = this
    wx.openBluetoothAdapter({
      success(res) {
        that.dispatchMsg('蓝牙已开启，初始化成功')
        // 先尝试直接连接， 连接失败了就 搜索
        if (that.macAddress && that.platform === 'android') {
          that.deviceId = that.macAddress
          that.printLog('设置deviceId尝试连接', that.deviceId)
          that.createBLEConnection(that.deviceId)
        } else {
          that.startSearchBluetooth()
        }
      },
      fail(res) {
        const {
          errCode
        } = res
        that.printLog('初始化蓝牙失败：', res)
        // 蓝牙已关闭
        if (errCode === 10001) {
          that.dispatchMsg('蓝牙未打开，开启失败')
          that.dispatchMsg(res, that.TYPE.CLOSED)
          wx.offBluetoothAdapterStateChange()
          wx.onBluetoothAdapterStateChange(res => {
            that.dispatchMsg('正在监听牙是否打开...')
            if (!res.available) {
              that.dispatchMsg('蓝牙适配器已关闭')
              that.printLog('蓝牙适配器已关闭：', res)
              that.isConnect = false
              that.dispatchMsg(res, that.TYPE.CLOSED)
            } else if (!that.isDiscovery) {
              that.startSearchBluetooth()
            }
          })
        }
      }
    })
  }
  startSearchBluetooth() {
    const that = this
    this.isDiscovery = true
    that.dispatchMsg('正在搜索附近蓝牙...\n')
    wx.stopBluetoothDevicesDiscovery()
    wx.startBluetoothDevicesDiscovery({
      // allowDuplicatesKey: true,
      // 减少重复上报
      allowDuplicatesKey: false,
      success(res) {
        that.searchBluetoothRes()
      },
      fail(err) {
        that.dispatchMsg('BluetoothDevicesDiscovery failed:' + err)
      }
    })
  }
  getBluetoothDevices() {
    const that = this
    wx.getBluetoothDevices({
      success(res) {
        that.findTargetBLEDevice(res)
      }
    })
  }
  stopSearchBluetooth() {
    this.printLog('停止搜索附近蓝牙')
    wx.stopBluetoothDevicesDiscovery()
  }
  searchBluetoothRes() {
    const that = this
    wx.onBluetoothDeviceFound(res => {
      that.findTargetBLEDevice(res)
    })
  }
  findTargetBLEDevice(res) {
    const that = this
    res.devices.forEach(device => {
      if (!device.name && !device.localName) {
        return
      }
      const did = device.deviceId
      const lNname = device.localName
      // that.printLog('发现设备：did=', did, ', res=', res)
      if (that.localName && lNname === that.localName) {
        that.printLog('发现设备：did=', did, ', res=', res)
        that.dispatchMsg(device, that.TYPE.DISCOVERED)
        that.deviceId = did
        that.createBLEConnection(did)
        return
      }
      if (that.macAddress) {
        // 搜索到指定蓝牙设备
        if (that.platform === 'android' && that.macAddress === did) {
          that.printLog('Android设备发现：', did, res)
          that.dispatchMsg(device, that.TYPE.DISCOVERED)
          that.deviceId = did
          that.createBLEConnection(did)
        } else if (that.platform === 'ios' && that.macAddress === that.bufToString(device.advertisData).toUpperCase()) {
          that.printLog('IOS设备发现：', did, res, that.bufToString(device.advertisData))
          that.dispatchMsg(device, that.TYPE.DISCOVERED)
          that.deviceId = did
          that.createBLEConnection(did)
        }
      }
    })
  }
  createBLEConnection(deviceId) {
    if (this.isConnect) {
      this.printLog('正在连接中')
      return
    }
    this.isConnect = true
    this.printLog('创建连接传入：', deviceId)
    const that = this
    that.dispatchMsg('正在连接当前蓝牙设备...')
    that.monitorBLEBluetoothConnectionState()
    wx.createBLEConnection({
      deviceId: deviceId,
      success(res) {
        that.dispatchMsg('连接当前蓝牙设备成功')
        that.dispatchMsg(res, that.TYPE.CONNECTED)
        that.printLog('蓝牙连接成功：', res)
        // wx.setBLEMTU({ deviceId,mtu: 248 })
        that.stopSearchBluetooth()
        that.getBLEBluetoothServices(deviceId)
      },
      fail(err) {
        that.dispatchMsg('连接当前蓝牙设备失败' + JSON.stringify(err))
        that.isConnect = false
        that.startSearchBluetooth()
        that.printLog('蓝牙连接失败：', err)
      }
    })
  }
  monitorBLEBluetoothConnectionState() {
    let that = this
    wx.offBLEConnectionStateChange()
    wx.onBLEConnectionStateChange((res) => {
      that.printLog('蓝牙连接状态变化：', res.deviceId, res.connected)
      if (!res.connected) {
        that.printLog('蓝牙断开连接')
        that.isConnect = false
        that.dispatchMsg(res, this.TYPE.DISCONNECTED)
      }
    })
  }
  getBLEBluetoothServices(deviceId) {
    const that = this
    that.printLog('查询服务：', deviceId)
    wx.getBLEDeviceServices({
      deviceId,
      success(res) {
        that.printLog('服务发现：', res)
        for (let i = 0; i < res.services.length; i++) {
          const sid = res.services[i].serviceId
          that.printLog('serviceId, search: ', `${sid}`, ' param:', `${that.service}`)
          // 比较这里统一转成大小比较
          if (sid.toUpperCase().indexOf(that.service.toUpperCase()) >= 0) {
            // 为确保准确，重新赋值
            that.service = sid
            that.dispatchMsg(res, that.TYPE.SERVICE)
            // 但实际传参必须按照查询的结果来传递
            that.getBLEDeviceCharacteristics(deviceId, that.service)
            return
          } else {
            that.printLog('unmatched service')
          }
        }
      }
    })
  }
  getBLEDeviceCharacteristics(deviceId, serviceId) {
    const that = this
    that.printLog('查询特征：deviceId=', deviceId, ', serviceId=', serviceId)
    wx.getBLEDeviceCharacteristics({
      deviceId: deviceId,
      serviceId: serviceId,
      success(res) {
        that.printLog('特征发现：', res)
        res.characteristics.forEach(item => {
          // 拥有写入权限
          if (item.properties.write) {
            // 为确保后面赋值准确，重新赋值
            that.printLog('write characteristicId: ', item.characteristicId)
            that.writeChar = item.characteristicId
            that.dispatchMsg(res, that.TYPE.CHARWRITE)
          }
          if (item.properties.notify || item.properties.indicate) {
            that.printLog('notify characteristicId: ', item.characteristicId)
            that.dispatchMsg(res, that.TYPE.CHARAREAD)
            wx.notifyBLECharacteristicValueChange({
              deviceId,
              serviceId,
              characteristicId: item.characteristicId,
              state: true,
              success(res) {
                that.printLog('订阅特征成功：', res)
              },
              fail(err) {
                that.printLog('订阅特征失败：', err)
              }
            })
          }
        })
      }
    })
    wx.onBLECharacteristicValueChange(msg => {
      // TODO 处理应答数据
      // let res = ab2hex(characteristic.value)
      
      if (this.anArrayBuffer.length) {
        if (this.sendDataIndex > 0) {
          if (this.sendDataIndex % 100 === 0 ) {
            this.printLog(this.sendDataIndex)
          }
          if (this.sendDataIndex < 5) {
            this.printLog(this.sendDataIndex)
          }
          
          this.sendMsg(this.anArrayBuffer[this.anArrayBuffer.length - this.sendDataIndex])
          this.sendDataIndex--
        } else {
          this.anArrayBuffer = []
          this.dispatchMsg(msg.value, that.TYPE.RECEIVE, {
            sendDataIndex: this.sendDataIndex
          })
        }
      } else {
        this.dispatchMsg(msg.value, that.TYPE.RECEIVE, {
          sendDataIndex: this.sendDataIndex
        })
      }
       
    })
  }
  awaitFn(deviceId, serviceId, characteristicId, val) {
    let that = this
    return new Promise((resolve, reject) => {
      wx.writeBLECharacteristicValue({
        deviceId: deviceId,
        serviceId: serviceId,
        characteristicId: characteristicId,
        value: val,
        success(res) {
          resolve(res)
        },
        fail(err) {
          that.printLog('发送消息失败：', err)
          reject(err)
        }
      })
    })
  }
  disconnectBLEConnection() {
    this.isConnect = false
    this.printLog('调用断开蓝牙')
    // 移除蓝牙通知特征订阅
    wx.offBLECharacteristicValueChange()
    // 移除蓝牙连接状态监听
    wx.offBLEConnectionStateChange()
    // 移除蓝牙适配器开启关闭状态监听
    wx.offBluetoothAdapterStateChange()
    var that = this
    wx.disconnectBLEDevice({
      deviceId: that.deviceId,
      success(res) {
        this.deviceId = ''
        that.dispatchMsg('断开蓝牙连接成功！')
        that.dispatchMsg(res, that.TYPE.DISCONNECTED)
        that.printLog('蓝牙断开连接成功：', res)
      },
      fail(err) {
        that.printLog('蓝牙断开连接失败：', err)
      }
    })
  }
  /**
   * * transfer arrayBuffer to MAC
   * @param buffer
   * @returns {string}
   */
  bufToString = buffer => {
    // D3:C4:AC:A3:EF:01
    let hexArr = Array.prototype.map.call(
      new Uint8Array(buffer),
      function (bit) {
        return ('00' + bit.toString(16)).slice(-2)
      }
    )
    return `${hexArr[4]}:${hexArr[5]}:${hexArr[6]}:${hexArr[7]}:${hexArr[8]}:${hexArr[9]}`.toLocaleUpperCase()
  }
  /**
   * * transfer arrayBuffer to string
   * @param buffer
   * @returns {string}
   */
  ab2hex(buffer) {
    let hexArr = Array.prototype.map.call(
      new Uint8Array(buffer),
      function (bit) {
        return ('00' + bit.toString(16)).slice(-2)
      }
    )
    return hexArr.join('')
  }
}

module.exports = Bluetooth
```

### 2.需要注意点
（1）蓝牙模块在ios 和 android