import Modular from '@/index'
import data from './modular.data'

describe('Modular 单元测试', () => {
  it('默认构造函数测试', () => {
    const modular = new Modular()
    const app = modular.getApplication()
    const app2 = modular.getModule('Application')
    const modules = modular.getModules()
    const exts = modular.getExtension('test')
    const points = modular.getExtensionPoint('test')
    // 不可变对象测试
    expect(() => { modules.push('test') }).toThrowError(TypeError)
    expect(() => { exts.push('test') }).toThrowError(TypeError)
    expect(() => { points.push('test') }).toThrowError(TypeError)
    expect(() => { app.name = 'test' }).toThrowError(TypeError)
    expect(() => { app.test = 'test' }).toThrowError(TypeError)
    expect(() => { delete app.name }).toThrowError(TypeError)
    expect(() => { app2.name = 'test' }).toThrowError(TypeError)
    expect(() => { app2.test = 'test' }).toThrowError(TypeError)
    expect(() => { delete app2.name }).toThrowError(TypeError)
    // 默认值测试
    expect(app).toBe(app2)
    expect(app).toEqual({ name: 'Application' })
    expect(modules).toEqual([app])
    expect(exts).toEqual({})
    expect(points).toEqual({})
    expect(modular.strict).toBe(false)
    // 上述执行过程无错误日志产生
    expect(modular.errors).toEqual([])
  })

  it('循环依赖测试', () => {
    const modular = new Modular({
      modules: [
        data.m1,
        data.m2,
        data.m3
      ]
    })
    expect(modular.getModules()).toEqual([data.m3, data.m2, data.m1, { name: 'Application' }])
    modular.start()
  })

  it('扩展配置覆盖测试', () => {
  })

  it('异常信息记录测试', () => {
  })
})
