import { Injectable, OnDestroy, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProfileViewsService implements OnDestroy {
  readonly views = signal<number | null>(null);

  private readonly namespace = 'piyush-kumar-portfolio';
  private readonly key = 'profile-views';
  private readonly localViewsKey = 'portfolio-local-views';
  private pollId: ReturnType<typeof setInterval> | null = null;

  async init(): Promise<void> {
    // Always increment immediately on each page visit/refresh.
    const local = this.incrementLocalAndGet();
    this.views.set(local);

    // Try syncing with remote counters; if available, prefer remote value.
    const remote = await this.incrementRemote();
    if (typeof remote === 'number') {
      const merged = Math.max(remote, local);
      this.views.set(merged);
      this.setLocalViews(merged);
    }

    this.startPolling();
  }

  stop(): void {
    if (this.pollId) {
      clearInterval(this.pollId);
      this.pollId = null;
    }
  }

  ngOnDestroy(): void {
    this.stop();
  }

  private startPolling(): void {
    this.stop();
    this.pollId = setInterval(() => {
      void this.fetchCurrent();
    }, 3000);
  }

  private incrementLocalAndGet(): number {
    const current = this.getLocalViews();
    const next = current + 1;
    this.setLocalViews(next);
    return next;
  }

  private getLocalViews(): number {
    try {
      const raw = localStorage.getItem(this.localViewsKey);
      const parsed = Number(raw ?? 0);
      return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 0;
    } catch {
      return 0;
    }
  }

  private setLocalViews(value: number): void {
    try {
      localStorage.setItem(this.localViewsKey, String(Math.max(1, Math.floor(value))));
    } catch {
      // Ignore storage issues silently.
    }
  }

  private async incrementRemote(): Promise<number | null> {
    const urls = [
      `https://api.countapi.xyz/hit/${this.namespace}/${this.key}`,
      `https://countapi.xyz/hit/${this.namespace}/${this.key}`,
      `https://api.counterapi.dev/v1/${this.namespace}/${this.key}/up`,
    ];

    for (const url of urls) {
      const value = await this.fetchCounterValue(url);
      if (typeof value === 'number') {
        return value;
      }
    }

    return null;
  }

  private async fetchCurrent(): Promise<void> {
    const urls = [
      `https://api.countapi.xyz/get/${this.namespace}/${this.key}`,
      `https://countapi.xyz/get/${this.namespace}/${this.key}`,
      `https://api.counterapi.dev/v1/${this.namespace}/${this.key}`,
    ];

    for (const url of urls) {
      const value = await this.fetchCounterValue(url);
      if (typeof value === 'number') {
        const merged = Math.max(value, this.getLocalViews());
        this.views.set(merged);
        this.setLocalViews(merged);
        return;
      }
    }
  }

  private async fetchCounterValue(url: string): Promise<number | null> {
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) return null;

      const data = (await res.json()) as { value?: unknown; count?: unknown };
      const raw = typeof data.value === 'number' ? data.value : data.count;
      if (typeof raw !== 'number' || !Number.isFinite(raw)) return null;

      return Math.max(1, Math.floor(raw));
    } catch {
      return null;
    }
  }
}
