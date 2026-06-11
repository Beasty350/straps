// RehabFSM.ts – Complete with all exercises, corrected squat/deadlift (no emojis)
export type Vec3 = { x: number; y: number; z: number; visibility?: number };

export const LM = {
  NOSE: 0,
  LEFT_SHOULDER: 11, RIGHT_SHOULDER: 12,
  LEFT_ELBOW: 13, RIGHT_ELBOW: 14,
  LEFT_WRIST: 15, RIGHT_WRIST: 16,
  LEFT_PINKY: 17, RIGHT_PINKY: 18,
  LEFT_INDEX: 19, RIGHT_INDEX: 20,
  LEFT_THUMB: 21, RIGHT_THUMB: 22,
  LEFT_HIP: 23, RIGHT_HIP: 24,
  LEFT_KNEE: 25, RIGHT_KNEE: 26,
  LEFT_ANKLE: 27, RIGHT_ANKLE: 28,
} as const;

function clamp(x: number, a: number, b: number) { return Math.max(a, Math.min(b, x)); }
function sub(a: Vec3, b: Vec3) { return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z }; }
function dot(a: Vec3, b: Vec3) { return a.x * b.x + a.y * b.y + a.z * b.z; }
function norm(a: Vec3) { return Math.sqrt(dot(a, a)) + 1e-8; }

export function angleDeg(A: Vec3, B: Vec3, C: Vec3): number {
  const BA = sub(A, B);
  const BC = sub(C, B);
  const cos = clamp(dot(BA, BC) / (norm(BA) * norm(BC)), -1, 1);
  return Math.acos(cos) * 180 / Math.PI;
}

function ema(prev: number | null, x: number, alpha: number): number {
  return prev === null ? x : alpha * x + (1 - alpha) * prev;
}

function meanVisibility(lms: Vec3[], idxs: number[]): number {
  const v = idxs.map(i => lms[i]?.visibility ?? 1.0);
  return v.reduce((a, b) => a + b, 0) / v.length;
}

export type PoseFeatures = {
  tMs: number;
  leftElbow: number; rightElbow: number;
  leftKnee: number; rightKnee: number;
  leftHip: number; rightHip: number;
  leftShoulderJoint: number; rightShoulderJoint: number;
  leftShoulderTorso: number; rightShoulderTorso: number;
  leftWristY: number; rightWristY: number;
  leftShoulderY: number; rightShoulderY: number;
  noseY: number;
  leftShoulderX: number; rightShoulderX: number;
  leftHipX: number; rightHipX: number;
  leftWristX: number; rightWristX: number;
  leftKneeX: number; rightKneeX: number;
  leftAnkleX: number; rightAnkleX: number;
  stanceWidth: number;
  bodyOrientation: 'front' | 'side' | 'unknown';
  visArms: number; visLegs: number;
};

export function computeFeatures(
  normalized: Vec3[],
  world: Vec3[],
  tMs: number
): PoseFeatures {
  const A = (i: number) => world.length > i ? world[i] : normalized[i];
  const N = (i: number) => normalized[i];

  const leftElbow = angleDeg(A(LM.LEFT_SHOULDER), A(LM.LEFT_ELBOW), A(LM.LEFT_WRIST));
  const rightElbow = angleDeg(A(LM.RIGHT_SHOULDER), A(LM.RIGHT_ELBOW), A(LM.RIGHT_WRIST));
  const leftKnee = angleDeg(A(LM.LEFT_HIP), A(LM.LEFT_KNEE), A(LM.LEFT_ANKLE));
  const rightKnee = angleDeg(A(LM.RIGHT_HIP), A(LM.RIGHT_KNEE), A(LM.RIGHT_ANKLE));
  const leftHip = angleDeg(A(LM.LEFT_SHOULDER), A(LM.LEFT_HIP), A(LM.LEFT_KNEE));
  const rightHip = angleDeg(A(LM.RIGHT_SHOULDER), A(LM.RIGHT_HIP), A(LM.RIGHT_KNEE));
  const leftShoulderJoint = angleDeg(A(LM.LEFT_HIP), A(LM.LEFT_SHOULDER), A(LM.LEFT_ELBOW));
  const rightShoulderJoint = angleDeg(A(LM.RIGHT_HIP), A(LM.RIGHT_SHOULDER), A(LM.RIGHT_ELBOW));
  const leftShoulderTorso = angleDeg(A(LM.LEFT_ELBOW), A(LM.LEFT_SHOULDER), A(LM.LEFT_HIP));
  const rightShoulderTorso = angleDeg(A(LM.RIGHT_ELBOW), A(LM.RIGHT_SHOULDER), A(LM.RIGHT_HIP));

  const armsIdx = [LM.LEFT_SHOULDER, LM.LEFT_ELBOW, LM.LEFT_WRIST, LM.RIGHT_SHOULDER, LM.RIGHT_ELBOW, LM.RIGHT_WRIST];
  const legsIdx = [LM.LEFT_HIP, LM.LEFT_KNEE, LM.LEFT_ANKLE, LM.RIGHT_HIP, LM.RIGHT_KNEE, LM.RIGHT_ANKLE];

  const leftAnkleX = N(LM.LEFT_ANKLE)?.x ?? 0;
  const rightAnkleX = N(LM.RIGHT_ANKLE)?.x ?? 0;
  const stanceWidth = Math.abs(leftAnkleX - rightAnkleX);

  const leftShoulder = N(LM.LEFT_SHOULDER);
  const rightShoulder = N(LM.RIGHT_SHOULDER);
  const leftHipPt = N(LM.LEFT_HIP);
  const rightHipPt = N(LM.RIGHT_HIP);
  let bodyOrientation: 'front' | 'side' | 'unknown' = 'unknown';
  if (leftShoulder && rightShoulder && leftHipPt && rightHipPt) {
    const shoulderWidth = Math.abs(rightShoulder.x - leftShoulder.x);
    const hipWidth = Math.abs(rightHipPt.x - leftHipPt.x);
    if (shoulderWidth > 0.2 && hipWidth > 0.2) bodyOrientation = 'front';
    else if (shoulderWidth < 0.12 && hipWidth < 0.12) bodyOrientation = 'side';
    else {
      const ratio = shoulderWidth / (hipWidth + 0.001);
      bodyOrientation = ratio > 1.5 ? (shoulderWidth > 0.15 ? 'front' : 'side') : 'unknown';
    }
  }

  return {
    tMs, leftElbow, rightElbow, leftKnee, rightKnee, leftHip, rightHip,
    leftShoulderJoint, rightShoulderJoint, leftShoulderTorso, rightShoulderTorso,
    leftWristY: N(LM.LEFT_WRIST).y, rightWristY: N(LM.RIGHT_WRIST).y,
    leftShoulderY: N(LM.LEFT_SHOULDER).y, rightShoulderY: N(LM.RIGHT_SHOULDER).y,
    noseY: N(LM.NOSE).y,
    leftShoulderX: N(LM.LEFT_SHOULDER).x, rightShoulderX: N(LM.RIGHT_SHOULDER).x,
    leftHipX: N(LM.LEFT_HIP).x, rightHipX: N(LM.RIGHT_HIP).x,
    leftWristX: N(LM.LEFT_WRIST).x, rightWristX: N(LM.RIGHT_WRIST).x,
    leftKneeX: N(LM.LEFT_KNEE).x, rightKneeX: N(LM.RIGHT_KNEE).x,
    leftAnkleX, rightAnkleX,
    stanceWidth,
    bodyOrientation,
    visArms: meanVisibility(normalized, armsIdx),
    visLegs: meanVisibility(normalized, legsIdx),
  };
}

// ----- Base FSM -----
export class RepFSM {
  public state: "LOW" | "HIGH" = "LOW";
  public reps = 0;
  public feedback = "";

  private metricS: number | null = null;
  private metricPrev: number | null = null;
  private lastMotionT: number | null = null;
  private enteredHighT: number | null = null;
  private cycleStartT: number | null = null;
  private cycleMin: number | null = null;
  private cycleMax: number | null = null;

  constructor(
    public name: string,
    public minVis = 0.6,
    public emaAlpha = 0.25,
    public idleVelTh = 0.5,
    public idleMs = 1000,
    public highHoldMs = 110,
    public minRepMs = 500,
    public maxRepMs = 12000,
    public minRomDeg = 40
  ) { }

  visibilityOk(_f: PoseFeatures): boolean { return true; }
  metric(_f: PoseFeatures): number { throw new Error("not implemented"); }
  isLow(_m: number, _f: PoseFeatures): boolean { throw new Error("not implemented"); }
  isHigh(_m: number, _f: PoseFeatures): boolean { throw new Error("not implemented"); }
  extraValid(_f: PoseFeatures): boolean { return true; }
  evaluateFeedback(_m: number, _f: PoseFeatures): void { }

  private updateRom(m: number) {
    if (this.cycleMin === null) this.cycleMin = m;
    else this.cycleMin = Math.min(this.cycleMin, m);
    if (this.cycleMax === null) this.cycleMax = m;
    else this.cycleMax = Math.max(this.cycleMax, m);
  }

  update(f: PoseFeatures): void {
    if (!this.visibilityOk(f)) {
      this.feedback = "Not visible";
      return;
    }

    const t = f.tMs;
    const mRaw = this.metric(f);
    this.metricS = this.metricS === null ? mRaw : this.emaAlpha * mRaw + (1 - this.emaAlpha) * this.metricS;

    if (this.metricPrev === null) {
      this.metricPrev = this.metricS;
      this.lastMotionT = t;
      this.evaluateFeedback(this.metricS, f);
      return;
    }

    const vel = Math.abs(this.metricS - this.metricPrev);
    this.metricPrev = this.metricS;
    if (vel >= this.idleVelTh) this.lastMotionT = t;

    if (this.lastMotionT !== null && (t - this.lastMotionT) > this.idleMs) {
      this.state = "LOW";
      this.enteredHighT = null;
      this.cycleStartT = null;
      this.cycleMin = this.cycleMax = null;
      this.evaluateFeedback(this.metricS, f);
      return;
    }

    this.updateRom(this.metricS);

    if (this.state === "LOW") {
      if (this.isHigh(this.metricS, f) && this.extraValid(f)) {
        this.state = "HIGH";
        this.enteredHighT = t;
        if (this.cycleStartT === null) this.cycleStartT = t;
      }
      this.evaluateFeedback(this.metricS, f);
      return;
    }

    // state === "HIGH"
    if (this.enteredHighT !== null && (t - this.enteredHighT) < this.highHoldMs) {
      this.evaluateFeedback(this.metricS, f);
      return;
    }

    if (this.isLow(this.metricS, f)) {
      const dur = this.cycleStartT ? (t - this.cycleStartT) : 0;
      const rom = (this.cycleMax !== null && this.cycleMin !== null) ? (this.cycleMax - this.cycleMin) : 0;
      if (dur >= this.minRepMs && dur <= this.maxRepMs && rom >= this.minRomDeg) {
        this.reps++;
      }
      this.state = "LOW";
      this.enteredHighT = null;
      this.cycleStartT = null;
      this.cycleMin = this.cycleMax = null;
    }
    this.evaluateFeedback(this.metricS, f);
  }
}

// ----- Concrete Counters -----
export class BicepCurlCounter extends RepFSM {
  private side: 'left' | 'right';
  constructor(side: 'left' | 'right') {
    super("bicep_curl", 0.6, 0.25, 0.8, 900, 110, 300, 12000, 70);
    this.side = side;
  }
  visibilityOk(f: PoseFeatures) { return f.visArms >= this.minVis; }
  metric(f: PoseFeatures) { return this.side === 'right' ? f.rightElbow : f.leftElbow; }
  isLow(m: number) { return m >= 140; }
  isHigh(m: number) { return m <= 85; }
  evaluateFeedback(m: number, _f: PoseFeatures) {
    if (this.state === "LOW" && m > 85 && m < 140) this.feedback = "Curl higher";
    else if (this.state === "HIGH" && m > 85 && m < 140) this.feedback = "Arm straight";
    else this.feedback = "Good";
  }
  extraValid(f: PoseFeatures) {
    const kneeOk = f.leftKnee >= 155 && f.rightKnee >= 155;
    const hipOk = f.leftHip >= 155 && f.rightHip >= 155;
    return kneeOk && hipOk;
  }
}

export class HammerCurlCounter extends RepFSM {
  private side: 'left' | 'right';
  constructor(side: 'left' | 'right') {
    super("hammer_curl", 0.6, 0.25, 0.8, 900, 105, 500, 12000, 40);
    this.side = side;
  }
  visibilityOk(f: PoseFeatures) { return f.visArms >= this.minVis; }
  metric(f: PoseFeatures) { return this.side === 'right' ? f.rightElbow : f.leftElbow; }
  isLow(m: number) { return m > 120; }
  isHigh(m: number) { return m < 100; }
  evaluateFeedback(m: number, _f: PoseFeatures) {
    if (this.state === "LOW" && m > 100 && m < 120) this.feedback = "Curl higher";
    else if (this.state === "HIGH" && m > 100 && m < 120) this.feedback = "Arm straight";
    else this.feedback = "Good";
  }
  extraValid(f: PoseFeatures) {
    const kneeOk = f.leftKnee >= 155 && f.rightKnee >= 155;
    const hipOk = f.leftHip >= 155 && f.rightHip >= 155;
    return kneeOk && hipOk;
  }
}

export class OverheadPressCounter extends RepFSM {
  constructor() {
    super("overhead_press", 0.6, 0.25, 0.8, 900, 120, 500, 12000, 30);
  }
  visibilityOk(f: PoseFeatures) { return f.visArms >= this.minVis; }
  metric(f: PoseFeatures) { return Math.min(f.leftElbow, f.rightElbow); }
  isLow(m: number) { return m <= 110; }
  isHigh(m: number) { return m >= 150; }
  evaluateFeedback(m: number, _f: PoseFeatures) {
    if (this.state === "LOW" && m < 150) this.feedback = "Press higher";
    else if (this.state === "HIGH" && m > 110) this.feedback = "Lower fully";
    else this.feedback = "Good";
  }
  extraValid(f: PoseFeatures) {
    const isHandsUpL = f.leftWristY < f.leftShoulderY;
    const isHandsUpR = f.rightWristY < f.rightShoulderY;
    return isHandsUpL && isHandsUpR;
  }
}

export class LateralRaiseCounter extends RepFSM {
  constructor() {
    super("lateral_raises", 0.6, 0.25, 0.8, 900, 120, 500, 12000, 40);
  }
  visibilityOk(f: PoseFeatures) { return f.visArms >= this.minVis; }
  metric(f: PoseFeatures) { return Math.min(f.leftShoulderJoint, f.rightShoulderJoint); }
  isLow(m: number) { return m <= 30; }
  isHigh(m: number) { return m >= 75; }
  evaluateFeedback(m: number, f: PoseFeatures) {
    const elbow = Math.min(f.leftElbow, f.rightElbow);
    if (elbow < 150) this.feedback = "Arms straight";
    else if (this.state === "LOW" && m < 75) this.feedback = "Raise higher";
    else if (this.state === "HIGH" && m > 30) this.feedback = "Lower arms";
    else this.feedback = "Good";
  }
}

export class FrontRaiseCounter extends RepFSM {
  constructor() {
    super("front_raise", 0.6, 0.25, 0.8, 900, 120, 500, 12000, 40);
  }
  visibilityOk(f: PoseFeatures) { return f.visArms >= this.minVis; }
  metric(f: PoseFeatures) {
    const left = (0.5 - f.leftShoulderY) * 180;
    const right = (0.5 - f.rightShoulderY) * 180;
    return Math.min(left, right);
  }
  isLow(m: number) { return m <= 10; }
  isHigh(m: number) { return m >= 70; }
  evaluateFeedback(m: number, f: PoseFeatures) {
    const elbow = Math.min(f.leftElbow, f.rightElbow);
    if (elbow < 150) this.feedback = "Keep elbows straight";
    else if (this.state === "LOW" && m < 70) this.feedback = "Raise higher";
    else if (this.state === "HIGH" && m > 10) this.feedback = "Lower arms";
    else this.feedback = "Good";
  }
}

export class SquatCounter extends RepFSM {
  constructor() {
    super("squat", 0.4, 0.25, 0.8, 800, 80, 400, 12000, 20);
  }
  visibilityOk(f: PoseFeatures) { return f.visLegs >= this.minVis; }
  metric(f: PoseFeatures) { return Math.min(f.leftKnee, f.rightKnee); }
  isLow(m: number) { return m >= 160; }
  isHigh(m: number) { return m <= 110; }
  evaluateFeedback(m: number, _f: PoseFeatures) {
    if (this.state === "LOW" && m > 110 && m < 160) this.feedback = "Squat lower";
    else if (this.state === "HIGH" && m > 110 && m < 160) this.feedback = "Stand tall";
    else this.feedback = "Good";
  }
  extraValid(f: PoseFeatures) {
    return f.bodyOrientation === 'side' || true;
  }
}

export class DeadliftCounter extends RepFSM {
  constructor() {
    super("deadlift", 0.4, 0.25, 0.8, 800, 80, 400, 12000, 20);
  }
  visibilityOk(f: PoseFeatures) { return f.visLegs >= this.minVis; }
  metric(f: PoseFeatures) { return Math.min(f.leftHip, f.rightHip); }
  isLow(m: number) { return m >= 160; }
  isHigh(m: number, f: PoseFeatures) {
    const knee = Math.min(f.leftKnee, f.rightKnee);
    return m <= 120 && knee > 50;
  }
  evaluateFeedback(m: number, _f: PoseFeatures) {
    if (this.state === "LOW" && m > 120) this.feedback = "Hinge lower";
    else if (this.state === "HIGH" && m < 160) this.feedback = "Stand tall";
    else this.feedback = "Good";
  }
  extraValid(f: PoseFeatures) {
    return f.bodyOrientation === 'side' || true;
  }
}

export class SumoSquatCounter extends RepFSM {
  constructor() {
    super("sumo_squat", 0.4, 0.25, 0.8, 800, 80, 400, 12000, 20);
  }
  visibilityOk(f: PoseFeatures) { return f.visLegs >= this.minVis; }
  metric(f: PoseFeatures) { return Math.min(f.leftKnee, f.rightKnee); }
  isLow(m: number) { return m >= 160; }
  isHigh(m: number) { return m <= 125; }
  extraValid(f: PoseFeatures) { return f.stanceWidth >= 0.12; }
  evaluateFeedback(m: number, _f: PoseFeatures) {
    if (this.state === "LOW" && m > 125) this.feedback = "Squat deeper";
    else if (this.state === "HIGH" && m < 160) this.feedback = "Stand tall";
    else this.feedback = "Good";
  }
}

export class SumoDeadliftCounter extends RepFSM {
  constructor() {
    super("sumo_deadlift", 0.4, 0.25, 0.8, 800, 80, 400, 12000, 20);
  }
  visibilityOk(f: PoseFeatures) { return f.visLegs >= this.minVis; }
  metric(f: PoseFeatures) { return Math.min(f.leftKnee, f.rightKnee); }
  isLow(m: number) { return m >= 160; }
  isHigh(m: number) { return m <= 125; }
  extraValid(f: PoseFeatures) { return f.stanceWidth >= 0.12 && f.bodyOrientation === 'front'; }
  evaluateFeedback(m: number, _f: PoseFeatures) {
    if (this.state === "LOW" && m > 125) this.feedback = "Lower more";
    else if (this.state === "HIGH" && m < 160) this.feedback = "Stand up";
    else this.feedback = "Good";
  }
}

export class LungeCounter extends RepFSM {
  constructor() {
    super("lunges", 0.6, 0.25, 0.8, 900, 80, 400, 12000, 20);
  }
  visibilityOk(f: PoseFeatures) { return f.visLegs >= this.minVis; }
  metric(f: PoseFeatures) { return Math.min(f.leftKnee, f.rightKnee); }
  isLow(_m: number, f: PoseFeatures) {
    return f.leftKnee > 150 && f.rightKnee > 150;
  }
  isHigh(_m: number, f: PoseFeatures) {
    const front = Math.min(f.leftKnee, f.rightKnee);
    const back = Math.max(f.leftKnee, f.rightKnee);
    return front < 130 && back > 140;
  }
  evaluateFeedback(m: number, _f: PoseFeatures) {
    if (this.state === "LOW" && m > 130) this.feedback = "Drop knee";
    else if (this.state === "HIGH" && m < 150) this.feedback = "Push up";
    else this.feedback = "Good";
  }
}

export class SideLungesCounter extends RepFSM {
  constructor() {
    super("side_lunges", 0.6, 0.25, 0.8, 900, 80, 400, 12000, 20);
  }
  visibilityOk(f: PoseFeatures) { return f.visLegs >= this.minVis; }
  metric(f: PoseFeatures) { return Math.min(f.leftKnee, f.rightKnee); }
  isLow(_m: number, f: PoseFeatures) {
    return f.leftKnee > 150 && f.rightKnee > 150;
  }
  isHigh(_m: number, f: PoseFeatures) {
    const leftLunge = f.leftKnee < 110 && f.rightKnee > 150;
    const rightLunge = f.rightKnee < 110 && f.leftKnee > 150;
    return leftLunge || rightLunge;
  }
  evaluateFeedback(m: number, _f: PoseFeatures) {
    if (this.state === "LOW" && m > 110) this.feedback = "Lunge deeper";
    else if (this.state === "HIGH" && m < 150) this.feedback = "Return to center";
    else this.feedback = "Good";
  }
}

export class UpRightCounter extends RepFSM {
  constructor() {
    super("up_right", 0.6, 0.25, 0.8, 900, 90, 500, 12000, 40);
  }
  metric(f: PoseFeatures) { return Math.min(f.leftElbow, f.rightElbow); }
  isLow(m: number) { return m > 140; }
  isHigh(m: number) { return m < 100; }
  evaluateFeedback(m: number, _f: PoseFeatures) {
    if (this.state === "LOW" && m > 100 && m < 140) this.feedback = "Pull higher";
    else if (this.state === "HIGH" && m > 100 && m < 140) this.feedback = "Lower arms";
    else this.feedback = "Good";
  }
}

export class HighPullCounter extends RepFSM {
  constructor() {
    super("high_pull", 0.6, 0.25, 0.8, 900, 90, 500, 12000, 40);
  }
  metric(f: PoseFeatures) { return Math.min(f.leftElbow, f.rightElbow); }
  isLow(m: number, f: PoseFeatures) {
    const hip = Math.min(f.leftHip, f.rightHip);
    return m > 140 && hip < 155;
  }
  isHigh(m: number, f: PoseFeatures) {
    const hip = Math.min(f.leftHip, f.rightHip);
    return m < 100 && hip > 160;
  }
  evaluateFeedback(m: number, _f: PoseFeatures) {
    if (this.state === "LOW" && m > 100 && m < 140) this.feedback = "Pull higher";
    else if (this.state === "HIGH" && m > 100 && m < 140) this.feedback = "Lower and hinge";
    else this.feedback = "Good";
  }
}

export class DumbbellThrusterCounter extends RepFSM {
  constructor() {
    super("dumbbell_thruster", 0.6, 0.3, 0.8, 900, 90, 400, 12000, 30);
  }
  metric(f: PoseFeatures) { return Math.min(f.leftKnee, f.rightKnee); }
  isLow(m: number, f: PoseFeatures) {
    const elbow = Math.min(f.leftElbow, f.rightElbow);
    return m > 150 && elbow > 150;
  }
  isHigh(m: number, f: PoseFeatures) {
    const elbow = Math.min(f.leftElbow, f.rightElbow);
    return m < 110 && elbow < 100;
  }
  evaluateFeedback(m: number, f: PoseFeatures) {
    const elbow = Math.min(f.leftElbow, f.rightElbow);
    if (this.state === "LOW" && m > 110 && m < 150) this.feedback = "Squat deeper";
    else if (this.state === "HIGH" && m < 150 && elbow < 150) this.feedback = "Press up";
    else this.feedback = "Good";
  }
}

export class DumbbellPushCleanJerkCounter extends RepFSM {
  constructor() {
    super("dumbbell_push_clean_jerk", 0.6, 0.3, 0.6, 1500, 90, 400, 10000, 30);
  }
  metric(f: PoseFeatures) { return Math.min(f.leftElbow, f.rightElbow); }
  isLow(m: number, f: PoseFeatures) {
    const knee = Math.min(f.leftKnee, f.rightKnee);
    const isRack = (m > 140 && knee > 150);
    return isRack;
  }
  isHigh(m: number, f: PoseFeatures) {
    const knee = Math.min(f.leftKnee, f.rightKnee);
    const isCleanCatch = (m >= 60 && m <= 100) && (knee < 145);
    const isJerkOverhead = (m > 145) && (knee > 150);
    return isCleanCatch || isJerkOverhead;
  }
  evaluateFeedback(m: number, f: PoseFeatures) {
    if (this.state === "LOW" && m > 100 && m < 140) this.feedback = "Pull to rack";
    else if (this.state === "HIGH" && m < 150) this.feedback = "Finish overhead";
    else this.feedback = "Good";
  }
}

export class DumbbellPushJerkCounter extends RepFSM {
  private dipDone = false;
  constructor() {
    super("dumbbell_push_jerk", 0.6, 0.3, 0.6, 900, 60, 300, 8000, 20);
  }
  metric(f: PoseFeatures) { return Math.min(f.leftElbow, f.rightElbow); }
  isLow(m: number, f: PoseFeatures) {
    const knee = Math.min(f.leftKnee, f.rightKnee);
    const isRack = (m >= 50 && m <= 115) && (knee > 155);
    if (isRack) this.dipDone = false;
    return isRack;
  }
  isHigh(m: number, f: PoseFeatures) {
    const knee = Math.min(f.leftKnee, f.rightKnee);
    const isDip = (knee >= 130 && knee <= 155);
    if (isDip && !this.dipDone) this.dipDone = true;
    const isOverhead = (m > 145) && (knee > 150);
    if (isOverhead && this.dipDone) {
      this.dipDone = false;
      return true;
    }
    return false;
  }
  evaluateFeedback(m: number, f: PoseFeatures) {
    if (this.state === "LOW" && m > 50 && m < 115) this.feedback = "Dip & drive";
    else if (this.state === "HIGH") this.feedback = "Catch overhead";
    else this.feedback = "Good";
  }
}