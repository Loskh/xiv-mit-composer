// BinaryHeap.ts
export type Comparator<T> = (a: T, b: T) => number;

/**
 * 二叉堆（数组实现）
 * - comparator(a,b) < 0 表示 a 的优先级更高（应排在堆顶）
 *   - 最小堆： (a,b) => a - b
 *   - 最大堆： (a,b) => b - a
 */
export class BinaryHeap<T> {
  private data: T[] = [];
  private cmp: Comparator<T>;

  constructor(comparator: Comparator<T>, initial?: Iterable<T>) {
    this.cmp = comparator;
    if (initial) {
      this.data = Array.from(initial);
      this.heapify();
    }
  }

  size(): number {
    return this.data.length;
  }

  isEmpty(): boolean {
    return this.data.length === 0;
  }

  peek(): T | undefined {
    return this.data[0];
  }

  clear(): void {
    this.data.length = 0;
  }

  push(value: T): void {
    this.data.push(value);
    this.siftUp(this.data.length - 1);
  }

  /**
   * 弹出堆顶（优先级最高的元素）
   */
  pop(): T | undefined {
    const n = this.data.length;
    if (n === 0) return undefined;
    if (n === 1) return this.data.pop();

    const top = this.data[0];
    this.data[0] = this.data.pop() as T;
    this.siftDown(0);
    return top;
  }

  /**
   * 用新值替换堆顶并返回旧堆顶
   * - 堆为空时：等价于 push 并返回 undefined
   */
  replaceTop(value: T): T | undefined {
    if (this.data.length === 0) {
      this.data.push(value);
      return undefined;
    }
    const top = this.data[0];
    this.data[0] = value;
    this.siftDown(0);
    return top;
  }

  /**
   * push 后立刻 pop：常用于“只保留前 K 个元素”
   * - 如果新元素优先级不如堆顶，直接返回新元素（堆不变）
   * - 否则替换堆顶并返回被挤掉的元素
   */
  pushPop(value: T): T {
    if (this.data.length === 0) {
      this.data.push(value);
      return value;
    }
    // value 是否应当成为新的堆顶（优先级更高）
    if (this.cmp(value, this.data[0]) < 0) {
      // value 更“靠前”，挤掉堆顶
      const top = this.data[0];
      this.data[0] = value;
      this.siftDown(0);
      return top;
    }
    // value 优先级不够，直接“弹出自己”
    return value;
  }

  toArray(): T[] {
    return this.data.slice();
  }

  // ====== internal ======

  private heapify(): void {
    // 从最后一个非叶子节点开始下沉
    for (let i = (this.data.length >> 1) - 1; i >= 0; i--) {
      this.siftDown(i);
    }
  }

  private siftUp(i: number): void {
    const { data, cmp } = this;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (cmp(data[i], data[p]) >= 0) break;
      [data[i], data[p]] = [data[p], data[i]];
      i = p;
    }
  }

  private siftDown(i: number): void {
    const { data, cmp } = this;
    const n = data.length;
    while (true) {
      const l = i * 2 + 1;
      if (l >= n) break;
      const r = l + 1;

      // 选出 l 和 r 中优先级更高（更应该在上面）的那个
      let best = l;
      if (r < n && cmp(data[r], data[l]) < 0) best = r;

      // 如果孩子都不比当前更优先，停止
      if (cmp(data[best], data[i]) >= 0) break;

      [data[i], data[best]] = [data[best], data[i]];
      i = best;
    }
  }
}
