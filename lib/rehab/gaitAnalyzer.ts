// lib/rehab/gaitAnalyzer.ts
import { calculateAngle } from '../pose/MathUtils';

export type ViewType = 'side' | 'rear';

export interface GaitMetrics {
  // side view
  stepCount?: number;
  leftSteps?: number;
  rightSteps?: number;
  cadence?: number;
  stepLengthCm?: number;
  velocityMs?: number;
  distanceM?: number;
  kneeAngleL?: number;
  kneeAngleR?: number;
  hipAngle?: number;
  ankleAngleL?: number;
  ankleAngleR?: number;
  dgiGaitScore?: number;

  // rear view
  stepWidthCm?: number;
  normalizedBaseSupport?: number;
  symmetryIndex?: number;
  spatialSymmetry?: number;
  shoulderAlignmentDeg?: number;
  pelvicObliquityDeg?: number;
  lateralSwayCm?: number;
  trunkSwayCm?: number;
  centerLineDeviationCm?: number;
  mediolateralInstability?: number;
  pelvisDriftCm?: number;
  comDeviationCm?: number;
  stabilityScore?: number;

  timestamp?: number;
}

export class GaitAnalyzer {
  private viewType: ViewType;
  private personHeightCm: number;
  private pixelToCm: number | null = null;
  private calibrated = false;

  // side view state
  private prevHipCenter: { x: number; y: number } | null = null;
  private prevTimestamp: number | null = null;
  private stepCount = 0;
  private leftSteps = 0;
  private rightSteps = 0;
  private lastStepTime = 0;
  private lastStepSide: 'left' | 'right' | null = null;
  private stepTimes: number[] = [];
  private totalDistanceM = 0;

  // rear view state
  private hipMidNormHistory: number[] = [];
  private trunkSwayHistory: number[] = [];
  private stepWidths: number[] = [];
  private shoulderAngles: number[] = [];
  private pelvicAngles: number[] = [];

  constructor(viewType: ViewType = 'side', personHeightCm: number = 170) {
    this.viewType = viewType;
    this.personHeightCm = personHeightCm;
  }

  setViewType(type: ViewType) {
    if (this.viewType !== type) {
      this.viewType = type;
      this.reset();
    }
  }

  reset() {
    this.stepCount = 0;
    this.leftSteps = 0;
    this.rightSteps = 0;
    this.lastStepTime = 0;
    this.lastStepSide = null;
    this.stepTimes = [];
    this.totalDistanceM = 0;
    this.hipMidNormHistory = [];
    this.trunkSwayHistory = [];
    this.stepWidths = [];
    this.shoulderAngles = [];
    this.pelvicAngles = [];
    this.prevHipCenter = null;
    this.prevTimestamp = null;
  }

  private calibrate(landmarks: any, w: number, h: number) {
    const nose = landmarks[0];
    const leftHeel = landmarks[27] || landmarks[29];
    if (nose && leftHeel && nose.visibility > 0.5 && leftHeel.visibility > 0.5) {
      const heightPx = Math.abs(nose.y * h - leftHeel.y * h);
      if (heightPx > 50) {
        this.pixelToCm = this.personHeightCm / heightPx;
        this.calibrated = true;
      }
    }
  }

  private pxToCm(px: number): number {
    return px * (this.pixelToCm ?? 0.5);
  }

  private detectStepsSide(
    hipCenter: { x: number; y: number },
    leftHeel: { x: number; y: number },
    rightHeel: { x: number; y: number },
    now: number
  ) {
    if (this.prevHipCenter && this.prevTimestamp && now - this.prevTimestamp > 0) {
      const dx = hipCenter.x - this.prevHipCenter.x;
      const dy = hipCenter.y - this.prevHipCenter.y;
      const distancePx = Math.hypot(dx, dy);
      const distanceM = this.pxToCm(distancePx) / 100;
      this.totalDistanceM += distanceM;

      const heelForwardLeft = leftHeel.x - this.prevHipCenter.x;
      const heelForwardRight = rightHeel.x - this.prevHipCenter.x;
      const threshold = 15;

      if (heelForwardLeft > threshold && now - this.lastStepTime > 0.3 && this.lastStepSide !== 'left') {
        this.stepCount++;
        this.leftSteps++;
        this.lastStepTime = now;
        this.lastStepSide = 'left';
        if (this.lastStepTime > 0) this.stepTimes.push(now - this.lastStepTime);
      } else if (heelForwardRight > threshold && now - this.lastStepTime > 0.3 && this.lastStepSide !== 'right') {
        this.stepCount++;
        this.rightSteps++;
        this.lastStepTime = now;
        this.lastStepSide = 'right';
        if (this.lastStepTime > 0) this.stepTimes.push(now - this.lastStepTime);
      }
    }
    this.prevHipCenter = { x: hipCenter.x, y: hipCenter.y };
    this.prevTimestamp = now;
  }

  private updateSideMetrics(landmarks: any, w: number, h: number, now: number): Partial<GaitMetrics> {
    const hipL = landmarks[23];
    const hipR = landmarks[24];
    const kneeL = landmarks[25];
    const kneeR = landmarks[26];
    const ankleL = landmarks[27];
    const ankleR = landmarks[28];
    const heelL = landmarks[29];
    const heelR = landmarks[30];
    const shoulderR = landmarks[12];

    if (!hipL || !hipR) return {};

    const hipCenter = {
      x: (hipL.x + hipR.x) * w / 2,
      y: (hipL.y + hipR.y) * h / 2
    };
    const leftHeel = { x: heelL.x * w, y: heelL.y * h };
    const rightHeel = { x: heelR.x * w, y: heelR.y * h };

    this.detectStepsSide(hipCenter, leftHeel, rightHeel, now);

    const hipLPoint = { x: hipL.x * w, y: hipL.y * h };
    const hipRPoint = { x: hipR.x * w, y: hipR.y * h };
    const kneeLPoint = { x: kneeL.x * w, y: kneeL.y * h };
    const kneeRPoint = { x: kneeR.x * w, y: kneeR.y * h };
    const ankleLPoint = { x: ankleL.x * w, y: ankleL.y * h };
    const ankleRPoint = { x: ankleR.x * w, y: ankleR.y * h };
    const shoulderRPoint = { x: shoulderR.x * w, y: shoulderR.y * h };

    const kneeAngleL = calculateAngle(hipLPoint, kneeLPoint, ankleLPoint);
    const kneeAngleR = calculateAngle(hipRPoint, kneeRPoint, ankleRPoint);
    const hipAngle = calculateAngle(shoulderRPoint, hipRPoint, kneeRPoint);

    let cadence = 0;
    if (this.stepTimes.length) {
      const avgStepTime = this.stepTimes.reduce((a, b) => a + b, 0) / this.stepTimes.length;
      cadence = 60 / avgStepTime;
    }
    const stepLengthCm = this.stepCount ? (this.totalDistanceM / this.stepCount) * 100 : 0;
    const elapsed = (now - (this.prevTimestamp ?? now)) / 1000;
    const velocityMs = elapsed > 0 ? this.totalDistanceM / elapsed : 0;

    return {
      stepCount: this.stepCount,
      leftSteps: this.leftSteps,
      rightSteps: this.rightSteps,
      cadence,
      stepLengthCm,
      velocityMs,
      distanceM: this.totalDistanceM,
      kneeAngleL,
      kneeAngleR,
      hipAngle,
    };
  }

  private updateRearMetrics(landmarks: any, w: number, h: number): Partial<GaitMetrics> {
    const hipL = landmarks[23];
    const hipR = landmarks[24];
    const ankleL = landmarks[27];
    const ankleR = landmarks[28];
    const shoulderL = landmarks[11];
    const shoulderR = landmarks[12];

    if (!hipL || !hipR || !ankleL || !ankleR) return {};

    const stepWidthPx = Math.abs(ankleR.x * w - ankleL.x * w);
    const stepWidthCm = this.pxToCm(stepWidthPx);
    this.stepWidths.push(stepWidthCm);

    const shoulderLPoint = { x: shoulderL.x * w, y: shoulderL.y * h };
    const shoulderRPoint = { x: shoulderR.x * w, y: shoulderR.y * h };
    const hipLPoint = { x: hipL.x * w, y: hipL.y * h };
    const hipRPoint = { x: hipR.x * w, y: hipR.y * h };
    const hipMid = { x: (hipL.x + hipR.x) * w / 2, y: (hipL.y + hipR.y) * h / 2 };

    const shoulderAlignmentDeg = calculateAngle(shoulderLPoint, shoulderRPoint, hipMid);
    const pelvicObliquityDeg = calculateAngle(hipLPoint, hipRPoint, hipMid);

    this.shoulderAngles.push(shoulderAlignmentDeg);
    this.pelvicAngles.push(pelvicObliquityDeg);

    const hipMidNorm = hipMid.x / w - 0.5;
    this.hipMidNormHistory.push(hipMidNorm);
    const lateralSwayCm = this.pxToCm(std(this.hipMidNormHistory) * w);

    const shoulderMidX = (shoulderL.x + shoulderR.x) * w / 2;
    const hipMidX = hipMid.x;
    const trunkSwayCm = this.pxToCm(Math.abs(shoulderMidX - hipMidX));
    this.trunkSwayHistory.push(trunkSwayCm);

    const symmetryIndex = this.stepWidths.length > 5
      ? (std(this.stepWidths) / (mean(this.stepWidths) + 0.01)) * 100
      : 0;
    const stabilityScore = Math.max(0, 100 - symmetryIndex * 0.8 - trunkSwayCm * 2);
    const spatialSymmetry = Math.max(0, 100 - symmetryIndex);

    return {
      stepWidthCm,
      normalizedBaseSupport: stepWidthCm / this.personHeightCm,
      symmetryIndex,
      spatialSymmetry,
      shoulderAlignmentDeg,
      pelvicObliquityDeg,
      lateralSwayCm,
      trunkSwayCm,
      stabilityScore,
    };
  }

  update(landmarks: any, w: number, h: number, now: number): GaitMetrics {
    if (!this.calibrated && landmarks[0] && landmarks[29]) {
      this.calibrate(landmarks, w, h);
    }

    let metrics: Partial<GaitMetrics> = { timestamp: now };
    if (this.viewType === 'side') {
      metrics = { ...metrics, ...this.updateSideMetrics(landmarks, w, h, now) };
    } else {
      metrics = { ...metrics, ...this.updateRearMetrics(landmarks, w, h) };
    }
    return metrics as GaitMetrics;
  }

  getDgiScore(): number {
    const sym = (this as any).symmetryIndex || 0;
    const stab = (this as any).stabilityScore || 100;
    let score = 3.0;
    if (sym > 25) score -= 1;
    else if (sym > 15) score -= 0.5;
    if (stab < 70) score -= 0.5;
    return Math.max(0, Math.min(3, score));
  }
}

// Helper functions
function std(arr: number[]): number {
  if (arr.length < 2) return 0;
  const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
  const variance = arr.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / arr.length;
  return Math.sqrt(variance);
}

function mean(arr: number[]): number {
  if (!arr.length) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}