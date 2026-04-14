import { Component, OnInit, OnDestroy, ElementRef, ViewChild, ChangeDetectionStrategy, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { effect } from '@angular/core';

@Component({
  selector: 'app-background-effect',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <canvas #canvas class="bg-canvas" aria-hidden="true"></canvas>
  `,
  styles: [`
    .bg-canvas {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      width: 100%;
      height: 100%;
    }
  `]
})
export class BackgroundEffectComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private themeService = inject(ThemeService);
  private animId = 0;
  private particles: Particle[] = [];
  private ctx!: CanvasRenderingContext2D;
  private canvas!: HTMLCanvasElement;
  private readonly onResize = () => this.resize();

  ngOnInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.resize();
    this.initParticles();
    this.animate();
    window.addEventListener('resize', this.onResize);
  }

  private resize(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private initParticles(): void {
    this.particles = [];
    const count = Math.min(60, Math.floor(window.innerWidth / 20));
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }
  }

  private animate(): void {
    const isDark = this.themeService.isDark();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const centerX = this.canvas.width * 0.5;
    const centerY = this.canvas.height * 0.5;

    // Gradient mesh background
    const grd = this.ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, Math.max(this.canvas.width, this.canvas.height) * 0.7
    );
    if (isDark) {
      grd.addColorStop(0, 'rgba(99,102,241,0.05)');
      grd.addColorStop(1, 'rgba(6,182,212,0.02)');
    } else {
      grd.addColorStop(0, 'rgba(99,102,241,0.04)');
      grd.addColorStop(1, 'rgba(6,182,212,0.01)');
    }
    this.ctx.fillStyle = grd;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Particles
    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      const color = isDark ? `rgba(99,102,241,${p.alpha})` : `rgba(79,70,229,${p.alpha * 0.5})`;
      this.ctx.fillStyle = color;
      this.ctx.fill();
    }

    // Connect nearby particles
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          const alpha = (1 - dist / 120) * 0.15;
          this.ctx.strokeStyle = isDark ? `rgba(99,102,241,${alpha})` : `rgba(79,70,229,${alpha * 0.5})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }

    this.animId = requestAnimationFrame(this.animate.bind(this));
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animId);
    window.removeEventListener('resize', this.onResize);
  }
}

interface Particle {
  x: number; y: number; r: number;
  vx: number; vy: number; alpha: number;
}
