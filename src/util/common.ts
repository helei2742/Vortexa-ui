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


export function stringToEnum<T>(value: string, enumObj: T): T[keyof T] | undefined {
  return Object.values(enumObj).includes(value as T[keyof T]) ? (value as T[keyof T]) : undefined;
}

export function generateRandomGreenColor(): string {
  const g = Math.floor(Math.random() * 156) + 100;
  const r = Math.floor(Math.random() * 100);
  const b = Math.floor(Math.random() * 100);
  return `rgb(${r}, ${g}, ${b})`
}

export function toLocalDatetimeStr(timestamp:number) : string {
  return new Date(timestamp).toLocaleString()
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
