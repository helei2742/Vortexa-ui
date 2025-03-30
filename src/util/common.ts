export function flattenObject(obj: never): Record<string, never> {
  const result: Record<string, never> = {}

  for (const key in obj) {
    if (obj[key] instanceof Map) {
      // 处理 Map 类型
      obj[key].forEach((value: never, mapKey: never) => {
        result[mapKey] = value
      })
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      // 递归处理嵌套对象
      Object.assign(result, flattenObject(obj[key]))
    } else {
      // 普通属性
      result[key] = obj[key]
    }
  }

  return result
}


