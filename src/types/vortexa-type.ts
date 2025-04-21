/**
 * 基础账户信息
 */
export class AccountBaseInfo {
  id: number
  type: string
  name: string
  email: string
  password: string
  params: Map<string, object>
  insertDatetime: string
  updateDatetime: string

  public constructor({
                       id,
                       type,
                       name,
                       email,
                       password,
                       params,
                       insertDatetime,
                       updateDatetime
                     }: {
    id: number,
    type: string,
    name: string,
    email: string,
    password: string,
    params: Map<string, object>,
    insertDatetime: string,
    updateDatetime: string
  }) {
    this.id = id
    this.type = type
    this.name = name
    this.email = email
    this.password = password
    this.params = params
    this.insertDatetime = insertDatetime
    this.updateDatetime = updateDatetime
  }
}


/**
 * twitter信息
 */
export class TwitterInfo {
  id: number
  username: string
  password: string
  email: string
  emailPassword: string
  token: string
  f2aKey: string
  params: Map<string, object>
  insertDatetime: string
  updateDatetime: string

  public constructor({
                       id,
                       username,
                       password,
                       email,
                       emailPassword,
                       params,
                       token,
                       f2aKey,
                       insertDatetime,
                       updateDatetime
                     }: {
    id: number,
    username: string,
    password: string,
    email: string,
    emailPassword: string,
    params: Map<string, object>,
    token: string,
    f2aKey: string,
    insertDatetime: string,
    updateDatetime: string
  }) {
    this.id = id
    this.username = username
    this.password = password
    this.email = email
    this.emailPassword = emailPassword
    this.params = params
    this.token = token
    this.f2aKey = f2aKey
    this.insertDatetime = insertDatetime
    this.updateDatetime = updateDatetime
  }
}

/**
 * discord信息
 */
export class DiscordInfo {
  id: number
  username: string
  password: string
  bindEmail: string
  bindEmailPassword: string
  token: string
  f2aKey: string
  params: Map<string, object>
  insertDatetime: string
  updateDatetime: string

  public constructor({
                       id,
                       username,
                       password,
                       bindEmail,
                       bindEmailPassword,
                       params,
                       token,
                       f2aKey,
                       insertDatetime,
                       updateDatetime
                     }: {
    id: number,
    username: string,
    password: string,
    bindEmail: string,
    bindEmailPassword: string,
    params: Map<string, object>,
    token: string,
    f2aKey: string,
    insertDatetime: string,
    updateDatetime: string
  }) {
    this.id = id
    this.username = username
    this.password = password
    this.bindEmail = bindEmail
    this.bindEmailPassword = bindEmailPassword
    this.params = params
    this.token = token
    this.f2aKey = f2aKey
    this.insertDatetime = insertDatetime
    this.updateDatetime = updateDatetime
  }
}

/**
 * proxy信息
 */
export class ProxyInfo {
  id: number
  username: string
  password: string
  proxyType: string
  proxyProtocol: string
  host: string
  port: number
  params: Map<string, object>
  insertDatetime: string
  updateDatetime: string

  public constructor({
                       id,
                       host,
                       port,
                       username,
                       password,
                       proxyType,
                       proxyProtocol,
                       params,
                       insertDatetime,
                       updateDatetime
                     }: {
    id: number,
    host: string,
    port: number,
    username: string,
    password: string,
    proxyType: string,
    proxyProtocol: string,
    params: Map<string, object>,
    insertDatetime: string,
    updateDatetime: string
  }) {
    this.id = id
    this.host = host
    this.port = port
    this.username = username
    this.password = password
    this.proxyType = proxyType
    this.proxyProtocol = proxyProtocol
    this.params = params
    this.insertDatetime = insertDatetime
    this.updateDatetime = updateDatetime
  }
}

/**
 * proxy信息
 */
export class BrowserEnv {
  id: number
  userAgent: string
  otherHeader: Map<string, object>
  insertDatetime: string
  updateDatetime: string

  public constructor({
                       id,
                       userAgent,
                       otherHeader,
                       insertDatetime,
                       updateDatetime
                     }: {
    id: number,
    userAgent: string,
    otherHeader: Map<string, object>,
    insertDatetime: string,
    updateDatetime: string
  }) {
    this.id = id
    this.userAgent = userAgent
    this.otherHeader = otherHeader
    this.insertDatetime = insertDatetime
    this.updateDatetime = updateDatetime
  }
}


/**
 * Bot 实例信息
 */
export class BotInstanceInfo {
  id?: number
  botId?: number
  botName: string
  botKey: string
  botStatus: number // 0 未运行 1 正在运行 -1 告警
  runningTask: Array<string>
  accountTableName?: string
  jobParams: Map<string, object>
  params: Map<string, object>
  insertDatetime?: string
  updateDatetime?: string
  botInfo?: object

  public constructor({
                       id,
                       botId,
                       botName,
                       botKey,
                       botStatus,
                       runningTask,
                       accountTableName,
                       jobParams,
                       params,
                       insertDatetime,
                       updateDatetime,
                       botInfo
                     }
                       : {
                       id?: number,
                       botId?: number,
                       botName?: string,
                       botKey?: string,
                       botStatus?: number,
                       runningTask?: Array<string>,
                       accountTableName?: string,
                       jobParams?: Map<string, object>,
                       params?: Map<string, object>,
                       insertDatetime?: string,
                       updateDatetime?: string,
                       botInfo?: BotInfo
                     }
  ) {
    this.id = id
    this.botId = botId
    this.botName = botName ? botName : 'unknown_bot'
    this.botKey = botKey ? botKey : 'unknown_instance'
    this.botStatus = botStatus !== undefined ? botStatus : -1
    this.runningTask = runningTask ? runningTask : new Array<string>()
    this.accountTableName = accountTableName
    this.jobParams = jobParams ? jobParams : new Map<string, object>()
    this.params = params ? params : new Map<string, object>()
    this.insertDatetime = insertDatetime
    this.updateDatetime = updateDatetime
    this.botInfo = botInfo
  }
}

/**
 * Bot 信息
 */
export class BotInfo {
  id?: number
  name: string
  describe: string
  image?: string
  jobParams: Map<string, object>
  params: Map<string, object>
  insertDatetime?: string
  updateDatetime?: string

  constructor({id, name, describe, image, jobParams, params, insertDatetime, updateDatetime}
                : {
                id?: number,
                name?: string,
                describe?: string,
                image?: string,
                jobParams?: Map<string, object>,
                params?: Map<string, object>,
                insertDatetime?: string,
                updateDatetime?: string
              }
  ) {
    this.id = id
    this.name = name ? name : 'unknown_bot'
    this.describe = describe ? describe : ''
    this.image = image
    this.jobParams = jobParams ? jobParams : new Map<string, object>()
    this.params = params ? params : new Map<string, object>()
    this.insertDatetime = insertDatetime
    this.updateDatetime = updateDatetime
  }
}


/**
 * 节点信息
 */
export class ScriptNode {
  id: number
  scriptNodeName: string
  host: string
  port: number
  groupId: string
  serviceId: string
  instanceId: string
  description: string
  botConfigMap: Map<string, object>
  params: Map<string, object>
  insertDatetime: string
  updateDatetime: string

  constructor({
                id,
                scriptNodeName,
                host,
                port,
                groupId,
                serviceId,
                instanceId,
                description,
                botConfigMap,
                params,
                insertDatetime,
                updateDatetime
              }
                : {
                id: number,
                scriptNodeName: string,
                host: string
                port: number
                groupId: string
                serviceId: string
                instanceId: string
                description: string
                botConfigMap: Map<string, object>
                params: Map<string, object>,
                insertDatetime: string,
                updateDatetime: string
              }
  ) {
    this.id = id
    this.scriptNodeName = scriptNodeName
    this.host = host
    this.port = port
    this.groupId = groupId
    this.serviceId = serviceId
    this.instanceId = instanceId
    this.description = description
    this.botConfigMap = botConfigMap
    this.params = params
    this.insertDatetime = insertDatetime
    this.updateDatetime = updateDatetime
  }
}

/**
 * 已注册的script node 信息
 */
export class RegisteredScriptNode {
  scriptNode: ScriptNode
  online: boolean
}
