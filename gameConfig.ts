
import { TargetData, ItemType, Cell, Operator } from './types';

/**
 * ==========================================
 * TARGET CATALOG (Comprehensive 11-200)
 * ==========================================
 * diff: 0=Easy, 1=Normal, 2=Hard, 3=Expert, 4=Master, 5=Legend
 */
export const TARGET_CATALOG: TargetData[] = [
  // LEVEL 0: EASY (21 numbers) - 40以内，1-9两数相乘得到的数字（乘法口诀表）
  { value: 4, diff: 0 }, { value: 6, diff: 0 }, { value: 8, diff: 0 }, { value: 9, diff: 0 },
  { value: 10, diff: 0 }, { value: 12, diff: 0 }, { value: 14, diff: 0 }, { value: 15, diff: 0 },
  { value: 16, diff: 0 }, { value: 18, diff: 0 }, { value: 20, diff: 0 }, { value: 21, diff: 0 },
  { value: 24, diff: 0 }, { value: 25, diff: 0 }, { value: 27, diff: 0 }, { value: 28, diff: 0 },
  { value: 30, diff: 0 }, { value: 32, diff: 0 }, { value: 35, diff: 0 }, { value: 36, diff: 0 },
  { value: 40, diff: 0 },

  // LEVEL 1: NORMAL (30 numbers) - 10-50以内，不可用1-9两数相乘得到的数字
  { value: 11, diff: 1 }, { value: 13, diff: 1 }, { value: 17, diff: 1 }, { value: 19, diff: 1 },
  { value: 22, diff: 1 }, { value: 23, diff: 1 }, { value: 26, diff: 1 }, { value: 29, diff: 1 },
  { value: 31, diff: 1 }, { value: 33, diff: 1 }, { value: 34, diff: 1 }, { value: 37, diff: 1 },
  { value: 38, diff: 1 }, { value: 39, diff: 1 }, { value: 41, diff: 1 }, { value: 43, diff: 1 },
  { value: 44, diff: 1 }, { value: 46, diff: 1 }, { value: 47, diff: 1 }, { value: 50, diff: 1 },
  // 补充一些接近50的非口诀数
  { value: 15, diff: 1 }, { value: 17, diff: 1 }, { value: 23, diff: 1 }, { value: 26, diff: 1 },
  { value: 31, diff: 1 }, { value: 34, diff: 1 }, { value: 38, diff: 1 }, { value: 46, diff: 1 },
  { value: 33, diff: 1 }, { value: 22, diff: 1 },

  // LEVEL 2: HARD (30 numbers) - 50-81的随机数字
  { value: 51, diff: 2 }, { value: 52, diff: 2 }, { value: 53, diff: 2 }, { value: 55, diff: 2 },
  { value: 57, diff: 2 }, { value: 58, diff: 2 }, { value: 59, diff: 2 }, { value: 60, diff: 2 },
  { value: 61, diff: 2 }, { value: 62, diff: 2 }, { value: 65, diff: 2 }, { value: 66, diff: 2 },
  { value: 67, diff: 2 }, { value: 68, diff: 2 }, { value: 69, diff: 2 }, { value: 70, diff: 2 },
  { value: 71, diff: 2 }, { value: 73, diff: 2 }, { value: 74, diff: 2 }, { value: 75, diff: 2 },
  { value: 76, diff: 2 }, { value: 77, diff: 2 }, { value: 78, diff: 2 }, { value: 79, diff: 2 },
  { value: 80, diff: 2 }, { value: 54, diff: 2 }, { value: 56, diff: 2 }, { value: 63, diff: 2 },
  { value: 64, diff: 2 }, { value: 72, diff: 2 },

  // LEVEL 3: EXPERT (30 numbers) - 81-130以内的合数
  { value: 81, diff: 3 }, { value: 82, diff: 3 }, { value: 84, diff: 3 }, { value: 85, diff: 3 },
  { value: 86, diff: 3 }, { value: 87, diff: 3 }, { value: 88, diff: 3 }, { value: 90, diff: 3 },
  { value: 91, diff: 3 }, { value: 92, diff: 3 }, { value: 93, diff: 3 }, { value: 94, diff: 3 },
  { value: 95, diff: 3 }, { value: 96, diff: 3 }, { value: 98, diff: 3 }, { value: 99, diff: 3 },
  { value: 100, diff: 3 }, { value: 102, diff: 3 }, { value: 104, diff: 3 }, { value: 105, diff: 3 },
  { value: 108, diff: 3 }, { value: 110, diff: 3 }, { value: 112, diff: 3 }, { value: 114, diff: 3 },
  { value: 115, diff: 3 }, { value: 116, diff: 3 }, { value: 117, diff: 3 }, { value: 118, diff: 3 },
  { value: 119, diff: 3 }, { value: 120, diff: 3 },

  // LEVEL 4: MASTER (30 numbers) - 100-130质数 + 130-160合数
  { value: 101, diff: 4 }, { value: 103, diff: 4 }, { value: 107, diff: 4 }, { value: 109, diff: 4 },
  { value: 113, diff: 4 }, { value: 127, diff: 4 }, { value: 132, diff: 4 }, { value: 133, diff: 4 },
  { value: 134, diff: 4 }, { value: 135, diff: 4 }, { value: 136, diff: 4 }, { value: 138, diff: 4 },
  { value: 140, diff: 4 }, { value: 141, diff: 4 }, { value: 142, diff: 4 }, { value: 143, diff: 4 },
  { value: 144, diff: 4 }, { value: 145, diff: 4 }, { value: 146, diff: 4 }, { value: 147, diff: 4 },
  { value: 148, diff: 4 }, { value: 150, diff: 4 }, { value: 152, diff: 4 }, { value: 153, diff: 4 },
  { value: 154, diff: 4 }, { value: 155, diff: 4 }, { value: 156, diff: 4 }, { value: 158, diff: 4 },
  { value: 159, diff: 4 }, { value: 160, diff: 4 },

  // LEVEL 5: LEGEND (30 numbers) - 130-160质数 + 160-200合数
  { value: 131, diff: 5 }, { value: 137, diff: 5 }, { value: 139, diff: 5 }, { value: 149, diff: 5 },
  { value: 151, diff: 5 }, { value: 157, diff: 5 }, { value: 161, diff: 5 }, { value: 162, diff: 5 },
  { value: 164, diff: 5 }, { value: 165, diff: 5 }, { value: 166, diff: 5 }, { value: 168, diff: 5 },
  { value: 170, diff: 5 }, { value: 171, diff: 5 }, { value: 172, diff: 5 }, { value: 174, diff: 5 },
  { value: 175, diff: 5 }, { value: 176, diff: 5 }, { value: 177, diff: 5 }, { value: 178, diff: 5 },
  { value: 180, diff: 5 }, { value: 182, diff: 5 }, { value: 184, diff: 5 }, { value: 185, diff: 5 },
  { value: 186, diff: 5 }, { value: 187, diff: 5 }, { value: 188, diff: 5 }, { value: 189, diff: 5 },
  { value: 190, diff: 5 }, { value: 198, diff: 5 }
];

/**
 * ==========================================
 * GAME BALANCE PARAMETERS
 * ==========================================
 */
export const GAME_PARAMS = {
  GACHA_THRESHOLD: 6,       // Numbers used to trigger a gacha draw
  GACHA_TARGETS_THRESHOLD: 3, // Targets cleared to trigger a gacha draw
  STORAGE_SIZE: 4,          // Number of item slots
  COMBO_SCORE_BONUS: 20,    // Points per combo
  // 6个等级对应的得分基础分 (EASY, NORMAL, HARD, EXPERT, MASTER, LEGEND)
  LEVEL_BASE_SCORES: [150, 300, 400, 600, 900, 1500],
  // 6个等级对应的时间基础分 (秒)
  LEVEL_BASE_TIMES: [3, 3, 3.5, 4, 6, 8],

  // 得分与奖励配置
  SCORE_REWARDS: {
    COMBO_BONUS: 20,         // 每层连击奖励分数
    MAX_COMBO_BONUS: 200,    // 连击奖励上限
    SPEED_MULTIPLIERS: [
      { threshold: 0.7, multiplier: 1.5, label: 'SUPER FAST' }, // 剩余时间 > 70%
      { threshold: 0.4, multiplier: 1.2, label: 'FAST' },       // 剩余时间 > 40%
      { threshold: 0, multiplier: 1.0, label: '' }              // 其他
    ]
  },

  // 时间限制配置加速逻辑
  TIMER_LIMITS: {
    GLOBAL_MAX: 999,        // 全局最大时间上限（防止无限延时）
    DEFAULT_MAX: 100,       // 默认/教程期间最大时间
  },

  // 动态时间倍率配置 (最终时间 = 基础秒数 * 当前倍率)
  TIMER_MULTIPLIER: {
    BASE: 17,    // 初始倍率 (对应动态难度等级 0)
    DECREASE: 1, // 每升一级动态难度，倍率减少量
    MIN: 13,     // 最低倍率下限
  }
};

/** UI 显示配置 */
export const UI_CONFIG = {
  TOAST_DISPLAY_MS: 2100, // 提示信息显示毫秒数
};

/**
 * ==========================================
 * DYNAMIC DIFFICULTY CONFIG - 动态难度配置
 * ==========================================
 * 根据玩家持有的道具数量动态调整难度
 */
export const DYNAMIC_DIFFICULTY_CONFIG = {
  START_SCORE: 10000,          // 开始检查难度的分数
  CHECK_INTERVAL: 3000,         // 每5000分检查一次

  // 难度等级参数
  BASE_ITEM_CHANCE: 0.8,        // 默认抽卡概率（最低难度 80%）
  CHANCE_DECREASE: 0.1,        // 每增加1级难度，抽卡概率降低0.1
  MIN_ITEM_CHANCE: 0.4,         // 最低抽卡概率 (40%)
  MAX_LEVEL: 4,                 // 最大难度等级

  // 道具数量阈值
  ITEM_COUNT_THRESHOLD_HIGH: 3,     // ≥3个道具
  ITEM_COUNT_THRESHOLD_MID_HIGH: 2, // =2个道具
  ITEM_COUNT_THRESHOLD_MID: 1,     // =1个道具

  // 概率配置：[增加, 维持, 降低] 的概率分布
  PROBS: {
    HIGH: [0.9, 0.1, 0.0],     // ≥3个道具
    MID_HIGH: [0.8, 0.2, 0.0], // =2个道具
    MID: [0.1, 0.3, 0.6],      // =1个道具
    ZERO: [0.0, 0.3, 0.7]      // =0个道具
  }
};

/** 根据难度等级获取时间倍率 */
export const getTimerMultiplierByLevel = (level: number): number => {
  const { BASE, DECREASE, MIN } = GAME_PARAMS.TIMER_MULTIPLIER;
  return Math.max(BASE - (level * DECREASE), MIN);
};

/** 根据难度等级获取抽卡概率 */
export const getItemChanceByLevel = (level: number): number => {
  const { BASE_ITEM_CHANCE, CHANCE_DECREASE, MIN_ITEM_CHANCE } = DYNAMIC_DIFFICULTY_CONFIG;
  return Math.max(BASE_ITEM_CHANCE - (level * CHANCE_DECREASE), MIN_ITEM_CHANCE);
};

/** 判断是否需要检查难度（分数是否跨过阈值） */
export const shouldCheckDifficulty = (prevScore: number, currentScore: number): boolean => {
  const { START_SCORE, CHECK_INTERVAL } = DYNAMIC_DIFFICULTY_CONFIG;
  const prevThreshold = Math.floor(prevScore / CHECK_INTERVAL);
  const currentThreshold = Math.floor(currentScore / CHECK_INTERVAL);
  return currentScore >= START_SCORE && currentThreshold > prevThreshold;
};

/** 计算当前基于分数的难度等级（用于目标序列，不用于时间和抽卡） */
export const getDifficultyLevelByScore = (score: number): number => {
  const { START_SCORE, CHECK_INTERVAL } = DYNAMIC_DIFFICULTY_CONFIG;
  if (score < START_SCORE) return 0;
  return Math.floor((score - START_SCORE) / CHECK_INTERVAL);
};

/**
 * ==========================================
 * ITEM CONFIGURATION & DESCRIPTIONS
 * ==========================================
 */
export const ITEM_CONFIG = {
  TIMER_ADD_SECONDS: 30,
  SCORE_PACK_POINTS: 500,
  DESCRIPTIONS: {
    number: "数字工具：存放在储物格中，可随时取用参与合成，帮你化解僵局。",
    timer: `加时工具：点击即用，瞬间为你的挑战延长 ${30} 秒倒计时。`,
    refresh: "刷新令牌：当你觉得无计可施时，点击它来重置整个棋盘布局。",
    score: `500金币：直接获得 ${500} 额外积分，让你的排名更进一步。`
  } as Record<ItemType, string>,
  NAMES: {
    number: "数字工具",
    timer: "加时工具",
    refresh: "刷新令牌",
    score: "500金币"
  } as Record<ItemType, string>
};

/**
 * ==========================================
 * GACHA NARRATIVE CONFIG - 抽卡叙事配置
 * ==========================================
 */
export const GACHA_NARRATIVES = {
  // 获得道具时的预设文案
  ITEM_INTROS: [
    "你和数字士兵搏斗，它掉落了",
    "戳了戳路边的袋子，露出来一个",
    "在路上钓了会鱼，钓上来一个",
    "朝天上骂了几句，天上掉下来一个",
    "向天上拜了拜，天上掉下来一个",
    "路上碰到熟人，他给了你一个",
    "揍了一顿制作者，他口袋里有个",
    "数字士兵向你求饶，并给你"
  ] as string[],
  // 道具名称映射（用于文案组合）
  ITEM_NAMES: {
    number: "数字工具",
    timer: "加时工具",
    refresh: "刷新令牌",
    score: "500金币"
  } as Record<ItemType, string>,
  // 无事发生时的闲聊文案
  IDLE_NARRATIVES: [
    "空气中弥漫着大脑过载的味道",
    "大干一场吧",
    "十个手指应该够用",
    "easy,easy",
    "什么？你说这些数字是士兵？",
    "这里的景色不错，不是吗？",
    "其实很简单～其实很自然～",
    "你感觉今天运气不错",
    "感觉袋子空空的",
  ] as string[]
};

/**
 * ==========================================
 * GACHA EVENTS CONFIG - 抽卡事件配置
 * ==========================================
 */
export type GachaEventConfig = {
  id: string;
  text: string;
  icon: string;
  iconColor: string;
};

export const GACHA_EVENTS: GachaEventConfig[] = [
  {
    id: 'time_half',
    text: "沉浸在胜利中迟到了，2回合内时间减半",
    icon: 'fa-clock',
    iconColor: 'text-amber-500'
  },
  {
    id: 'items_lost',
    text: "路上摔了一跤，道具似乎掉了一些",
    icon: 'fa-tshirt',
    iconColor: 'text-rose-500'
  },
  {
    id: 'dog_attack',
    text: "碰到数字猎狗，被迫丢出一个数字保命",
    icon: 'fa-dog',
    iconColor: 'text-orange-500'
  },
  {
    id: 'score_double',
    text: "捡到复制器，3回合内获得双倍金币！",
    icon: 'fa-coins',
    iconColor: 'text-yellow-500'
  }
];

/**
 * ==========================================
 * GACHA POOLS - 抽卡奖池配置
 * ==========================================
 */
// 概率分布：number 35%, refresh 35%, timer 15%, score 15%
export const GACHA_ITEM_POOL: ItemType[] = [
  ...Array(30).fill('number'),
  ...Array(30).fill('refresh'),
  ...Array(15).fill('timer'),
  ...Array(25).fill('score'),
];


/**
 * ==========================================
 * UI DISPLAY NAMES
 * ==========================================
 */
export const DIFF_UI = {
  0: { label: 'EASY', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
  1: { label: 'NORMAL', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
  2: { label: 'HARD', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' },
  3: { label: 'EXPERT', color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100' },
  4: { label: 'MASTER', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
  5: { label: 'LEGEND', color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
} as Record<number, { label: string; color: string; bg: string; border: string }>;

/**
 * ==========================================
 * GRID CONSTANTS
 * ==========================================
 */
export const NUM_HEIGHT = 3;
export const OP_HEIGHT = 4;
export const OPERATORS: Operator[] = ['+', '-', '×', '÷'];

/**
 * ==========================================
 * UTILITY FUNCTIONS
 * ==========================================
 */
export const generateRandomId = () => Math.random().toString(36).substr(2, 9);

export const createCell = (type: 'number' | 'operator', value?: number | Operator): Cell => ({
  id: generateRandomId(),
  value: value !== undefined ? value : (type === 'number' ? Math.floor(Math.random() * 9) + 1 : OPERATORS[Math.floor(Math.random() * OPERATORS.length)]),
  type
});

/**
 * ==========================================
 * DIFFICULTY GROUPS - 按难度分组的数字集合
 * ==========================================
 */
export const DIFF_GROUPS = {
  // 难度0-1：简单到普通
  EASY_NORMAL: [0, 1] as const,
  // 难度0：非常简单
  EASY: [0] as const,
  // 难度1：普通
  NORMAL: [1] as const,
  // 难度2：困难
  HARD: [2] as const,
  // 难度3：专家
  EXPERT: [3] as const,
  // 难度4：大师
  MASTER: [4] as const,
  // 难度5：传奇
  LEGEND: [5] as const,
} as const;

export type DiffGroupKey = keyof typeof DIFF_GROUPS;

/**
 * ==========================================
 * TARGET POOL - 按难度分组的数字池
 * ==========================================
 */
// 预计算各难度的数字池
const TARGETS_BY_DIFF: Record<number, TargetData[]> = {};
for (const target of TARGET_CATALOG) {
  if (!TARGETS_BY_DIFF[target.diff]) {
    TARGETS_BY_DIFF[target.diff] = [];
  }
  TARGETS_BY_DIFF[target.diff].push(target);
}

// 便捷获取函数：从指定难度组中随机获取
const getRandomFromDiffs = (diffs: readonly number[]): TargetData => {
  const pool = diffs.flatMap(d => TARGETS_BY_DIFF[d] || []);
  return pool[Math.floor(Math.random() * pool.length)];
};

// 导出：获取难度为0的目标数字（用于刷新令牌）
export const getRandomEasyTarget = (): TargetData => {
  return getRandomFromDiffs([0]);
};

// 预计算常用组合池
const WARMUP_POOL = TARGET_CATALOG.filter(t => t.value < 40 && t.diff <= 1);

/**
 * ==========================================
 * TARGET SEQUENCE CONFIG - 目标序列配置
 * ==========================================
 * 定义每种序列类型的生成规则
 */
export interface TargetSequenceStep {
  /** 从哪个难度组取数 */
  diffGroup: DiffGroupKey;
  /** 说明（仅用于文档） */
  description?: string;
}

export interface TargetSequenceConfig {
  /** 序列名称 */
  name: string;
  /** 序列长度（每轮多少个目标） */
  length: number;
  /** 每步的取数规则 */
  steps: TargetSequenceStep[];
}

/**
 * ==========================================
 * SEQUENCE PATTERNS - 序列模式定义
 * ==========================================
 */
export const SEQUENCE_PATTERNS = {
  /** 正常序列（中等难度） */
  NORMAL: {
    name: 'Normal',
    length: 6,
    steps: [
      { diffGroup: 'EASY', description: '第一个从难度0中取' },
      { diffGroup: 'NORMAL', description: '第二个从难度1中取' },
      { diffGroup: 'NORMAL', description: '第三个从难度1中取' },
      { diffGroup: 'HARD', description: '第四个从难度2中取' },
      { diffGroup: 'EASY', description: '第五个从难度0中取' },
      { diffGroup: 'EXPERT', description: '第六个从难度3中取' },
    ]
  } as TargetSequenceConfig,

  /** 困难序列（高难度） */
  HARD: {
    name: 'Hard',
    length: 6,
    steps: [
      { diffGroup: 'EASY_NORMAL', description: '前两个从难度0-1中取' },
      { diffGroup: 'EASY_NORMAL', description: '前两个从难度0-1中取' },
      { diffGroup: 'MASTER', description: '第三个从难度4中取' },
      { diffGroup: 'LEGEND', description: '第四个从难度5中取' },
      { diffGroup: 'EASY_NORMAL', description: '第五、六个从难度0-1中随机取' },
      { diffGroup: 'EASY_NORMAL', description: '第五、六个从难度0-1中随机取' },
    ]
  } as TargetSequenceConfig,
} as const;

export type SequencePatternKey = keyof typeof SEQUENCE_PATTERNS;

/**
 * ==========================================
 * SCORE THRESHOLDS - 分数阈值配置
 * ==========================================
 */
export const SCORE_THRESHOLDS = {
  /** 困难序列解锁分数 */
  HARD_UNLOCK: 5000,
  /** 专家序列解锁分数 */
  EXPERT_UNLOCK: 15000,
} as const;

/**
 * ==========================================
 * MAIN SEQUENCE ORDER - 主序列循环顺序
 * ==========================================
 * 根据分数动态决定序列顺序
 */
export const getSequenceOrder = (currentScore: number): SequencePatternKey[] => {
  if (currentScore < SCORE_THRESHOLDS.HARD_UNLOCK) {
    // 低于5000分：仅NORMAL
    return ['NORMAL'];
  } else if (currentScore < SCORE_THRESHOLDS.EXPERT_UNLOCK) {
    // 5000-15000分：N,N,H
    return ['NORMAL', 'NORMAL', 'HARD'];
  } else {
    // 15000分以上：N,H
    return ['NORMAL', 'HARD'];
  }
};

/**
 * ==========================================
 * TARGET GENERATOR - 目标数字生成器
 * ==========================================
 */
class TargetGenerator {
  private currentSequenceOrder: SequencePatternKey[] = ['NORMAL'];
  private sequenceIndex: number = 0;

  /** 设置当前分数，决定使用的序列（每个序列完成后调用） */
  setScore(score: number): void {
    const newOrder = getSequenceOrder(score);
    // 只有当序列配置发生变化时才更新
    if (JSON.stringify(newOrder) !== JSON.stringify(this.currentSequenceOrder)) {
      this.currentSequenceOrder = newOrder;
      this.sequenceIndex = 0; // 重置到新序列的开头
    }
  }

  /** 获取随机目标 */
  getTarget(absoluteIndex: number): TargetData {
    // 前3个目标使用热身池
    if (absoluteIndex < 3) {
      return WARMUP_POOL[Math.floor(Math.random() * WARMUP_POOL.length)];
    }

    // 计算在主序列中的位置
    const mainIndex = absoluteIndex - 3;
    const mainSequenceLength = this.currentSequenceOrder.reduce((sum, key) => sum + SEQUENCE_PATTERNS[key].length, 0);
    const cyclePosition = mainIndex % mainSequenceLength;

    // 确定当前在哪个序列中
    let remaining = cyclePosition;
    let currentSequenceKey: SequencePatternKey = 'NORMAL';

    for (const seqKey of this.currentSequenceOrder) {
      const seqLength = SEQUENCE_PATTERNS[seqKey].length;
      if (remaining < seqLength) {
        currentSequenceKey = seqKey;
        break;
      }
      remaining -= seqLength;
    }

    // 获取当前序列的配置和位置
    const sequenceConfig = SEQUENCE_PATTERNS[currentSequenceKey];
    const currentSeqLength = sequenceConfig.length;
    const stepIndex = remaining % sequenceConfig.length;
    const diffGroup = sequenceConfig.steps[stepIndex].diffGroup;

    // 检查是否完成了一个序列，如果是则更新序列配置
    const nextRemaining = remaining + 1;
    if (nextRemaining >= currentSeqLength) {
      // 序列完成，准备切换
      this.sequenceIndex = (this.sequenceIndex + 1) % this.currentSequenceOrder.length;
    }

    // 从对应难度组获取随机目标
    return getRandomFromDiffs(DIFF_GROUPS[diffGroup]);
  }
}

// 导出单例生成器
export const targetGenerator = new TargetGenerator();

// 兼容旧接口的函数
export const getTargetForAbsoluteIndex = (index: number, _totalDraws: number): TargetData => {
  return targetGenerator.getTarget(index);
};

/** 设置当前分数，用于决定序列难度 */
export const setTargetScore = (score: number): void => {
  targetGenerator.setScore(score);
};
