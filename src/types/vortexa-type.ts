export class BotInstanceAccount {
  id?: number;
  botId?: number;
  botKey?: string;
  accountBaseInfoId?: number;
  twitterId?: number;
  discordId?: number;
  proxyId?: number;
  browserEnvId?: number;
  telegramId?: number;
  walletId?: number;
  rewardId?: number;
  status?: number; // 0 表示初始状态，1 表示已注册
  params?: Record<string, never>; // Map<String, Object> 转成 Record<string, any>
  insertDatetime?: string; // LocalDateTime 通常转成 ISO 字符串
  updateDatetime?: string;

  constructor(data: Partial<BotInstanceAccount> = {}) {
    Object.assign(this, data);
  }
}

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
 * 钱包
 */
export class Web3Wallet {
  id: number
  mnemonic: string
  ethPrivateKey: string
  ethAddress: string
  solPrivateKey: string
  solAddress: string
  btcPrivateKey: string
  btcAddress: string
  insertDatetime: string
  updateDatetime: string

  public constructor({
                       id,
                       mnemonic,
                       ethPrivateKey,
                       ethAddress,
                       solPrivateKey,
                       solAddress,
                       btcPrivateKey,
                       btcAddress,
                       insertDatetime,
                       updateDatetime
                     }: {
    id: number
    mnemonic: string
    ethPrivateKey: string
    ethAddress: string
    solPrivateKey: string
    solAddress: string
    btcPrivateKey: string
    btcAddress: string
    insertDatetime: string
    updateDatetime: string
  }) {
    this.id = id
    this.mnemonic = mnemonic
    this.ethPrivateKey = ethPrivateKey
    this.ethAddress = ethAddress
    this.solPrivateKey = solPrivateKey
    this.solAddress = solAddress
    this.btcPrivateKey = btcPrivateKey
    this.btcAddress = btcAddress
    this.insertDatetime = insertDatetime
    this.updateDatetime = updateDatetime
  }
}

export enum JobType {
  /** 查询奖励 */
  QUERY_REWARD = 'QUERY_REWARD',

  /** 只运行一次的任务 */
  ONCE_TASK = 'ONCE_TASK',

  /** 定时任务 */
  TIMED_TASK = 'TIMED_TASK',

  /** WebSocket 连接任务 */
  WEB_SOCKET_CONNECT = 'WEB_SOCKET_CONNECT',

  /** 按账户拆分后的 JOB */
  ACCOUNT_SPLIT_JOB = 'ACCOUNT_SPLIT_JOB',
}

export interface AutoBotJobWSParam {
  reconnectCountDownSecond: number
  isRefreshWSConnection: boolean
  heartBeatIntervalSecond: number
  wsConnectCount: number
  wsUnlimitedRetry: boolean
  nioEventLoopGroupThreads: number
  reconnectLimit: number
}

export class AutoBotJobParams {
  cronExpression: string
  intervalInSecond: number
  jobName: string
  autoBotJobWSParam: AutoBotJobWSParam
  uniqueAccount: boolean
  description: string
  concurrentCount: number
  syncExecute: boolean
  jobType: JobType
  params: Map<string, object>
  dynamicTimeWindowMinute: number
  dynamicTrigger: boolean

  constructor(data: {
    cronExpression: string
    jobName: string
    autoBotJobWSParam: AutoBotJobWSParam
    uniqueAccount: boolean
    description: string
    concurrentCount: number
    syncExecute: boolean
    jobType: JobType
    params: Map<string, object>
    dynamicTimeWindowMinute: number
    dynamicTrigger: boolean
  }) {
    this.cronExpression = data.cronExpression
    this.jobName = data.jobName
    this.autoBotJobWSParam = data.autoBotJobWSParam
    this.uniqueAccount = data.uniqueAccount
    this.description = data.description
    this.concurrentCount = data.concurrentCount
    this.syncExecute = data.syncExecute
    this.jobType = data.jobType
    this.params = data.params
    this.dynamicTimeWindowMinute = data.dynamicTimeWindowMinute
    this.dynamicTrigger = data.dynamicTrigger
  }
}

/**
 * Bot 实例信息
 */
export class BotInstanceInfo {
  id?: number
  botId?: number
  botName: string
  scriptNodeName: string
  botKey: string
  botStatus: number // 0 未运行 1 正在运行 -1 告警
  runningTask: Array<string>
  accountTableName?: string
  jobParams: Map<string, AutoBotJobParams>
  params: Map<string, object>
  insertDatetime?: string
  updateDatetime?: string
  botInfo?: object

  public constructor({
                       id,
                       botId,
                       botName,
                       scriptNodeName,
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
                       scriptNodeName?: string,
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
    this.scriptNodeName = scriptNodeName
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
 * 实例详情
 */
export class BotInstanceDetail extends BotInstanceInfo {
  botLaunchConfig: Record<string, never>
  botInstance: BotInstanceInfo
  botInfo: BoInfo
  jobTriggers: Map<string, Array<JobTrigger>>
  online: boolean

  public constructor({
                       botLaunchConfig,
                       botInstance,
                       botInfo,
                       jobTriggers,
                       online
                     }: {
    botLaunchConfig: Record<string, never>
    botInstance: BotInstanceInfo
    botInfo: BoInfo
    jobTriggers: Map<string, Array<JobTrigger>>
    online: boolean
  }) {
    this.botLaunchConfig = botLaunchConfig
    this.botInstance = botInstance
    this.botInfo = botInfo
    this.jobTriggers = jobTriggers
    this.online = online
  }
}

export enum JobStatus {
  NONE = 'NONE',
  NORMAL = 'NORMAL',
  PAUSED = 'PAUSED',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR',
  BLOCKED = 'BLOCKED'
}

export class JobTrigger {
  jobName: string
  misfireInstruction: number
  nextFireTime: number
  fullName: string
  jobKey: {
    name: string
    group: string
  }
  jobGroup: string
  priority: number
  timesTriggered: number
  fullJobName: string
  name: string
  repeatInterval: number
  previousFireTime: number
  startTime: number
  group: string
  repeatCount: number
  jobStatus: JobStatus

  constructor(data: {
    jobName: string
    misfireInstruction: number
    nextFireTime: number
    fullName: string
    jobKey: {
      name: string
      group: string
    }
    jobGroup: string
    priority: number
    timesTriggered: number
    fullJobName: string
    name: string
    repeatInterval: number
    previousFireTime: number
    startTime: number
    group: string
    repeatCount: number
    jobStatus: JobStatus
  }) {
    this.jobName = data.jobName
    this.misfireInstruction = data.misfireInstruction
    this.nextFireTime = data.nextFireTime
    this.fullName = data.fullName
    this.jobKey = data.jobKey
    this.jobGroup = data.jobGroup
    this.priority = data.priority
    this.timesTriggered = data.timesTriggered
    this.fullJobName = data.fullJobName
    this.name = data.name
    this.repeatInterval = data.repeatInterval
    this.previousFireTime = data.previousFireTime
    this.startTime = data.startTime
    this.group = data.group
    this.repeatCount = data.repeatCount
    this.jobStatus = data.jobStatus
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
  versionCode: string
  insertDatetime?: string
  updateDatetime?: string

  constructor({id, name, describe, image, jobParams, params, versionCode, insertDatetime, updateDatetime}
                : {
                id?: number,
                name?: string,
                describe?: string,
                image?: string,
                jobParams?: Map<string, object>,
                params?: Map<string, object>,
    versionCode: string
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
    this.versionCode = versionCode
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
  managedBotKeyList: Array<string>
  loadedBotInfos: Array<string>
  online: boolean
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
                managedBotKeyList,
                loadedBotInfos,
                online,
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
                managedBotKeyList: Array<string>
                loadedBotInfos: Array<string>
                online: boolean,
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
    this.managedBotKeyList = managedBotKeyList
    this.loadedBotInfos = loadedBotInfos
    this.online = online
    this.insertDatetime = insertDatetime
    this.updateDatetime = updateDatetime
  }
}

export interface BotMetaInfo {
  botName: string;
  version: string;
  icon: string;
  resourceDir: string;
  classJarPath: string;
  className: string;
  extraClassNameList: string[];
}

/**
 * 已注册的script node 信息
 */
export class ScriptNodeDetail {
  scriptNode: ScriptNode
  botNameToBotKeys: Record<string, Array<string>>
  onlineBotNameToKeys: Record<string, Array<string>>

  constructor(data: {
    scriptNode: ScriptNode,
    botNameToBotKeys: Record<string, Array<string>>
    onlineBotNameToKeys: Record<string, Array<string>>
  }) {
    this.scriptNode = data.scriptNode
    this.botNameToBotKeys = data.botNameToBotKeys
    this.onlineBotNameToKeys = data.onlineBotNameToKeys
  }
}


export class BotLaunchConfig {
  id?: number
  scriptNodeName?: string
  botName?: string
  botKey?: string
  customConfig?: Record<string, never>
  insertDatetime?: string
  updateDatetime?: string
  botInfo?: object
}
