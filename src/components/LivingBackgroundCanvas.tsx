import React, { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
  dataPacketProgress: number;
}

interface Hexagon {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
}

interface BinaryParticle {
  x: number;
  y: number;
  text: string;
  speedY: number;
  opacity: number;
}

interface PulseWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

export const LivingBackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Initialize Nodes (Neural Network)
    const nodeCount = Math.min(Math.floor((width * height) / 18000), 75);
    const nodes: Node[] = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 2 + 1.5,
      pulsePhase: Math.random() * Math.PI * 2,
      dataPacketProgress: Math.random(),
    }));

    // Initialize Floating Hexagons
    const hexCount = 8;
    const hexagons: Hexagon[] = Array.from({ length: hexCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 40 + 20,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.005,
      opacity: Math.random() * 0.08 + 0.03,
    }));

    // Initialize Floating Binary Particles
    const binaryCount = 25;
    const binaries: BinaryParticle[] = Array.from({ length: binaryCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      text: Math.random() > 0.5 ? '1' : '0',
      speedY: Math.random() * 0.4 + 0.2,
      opacity: Math.random() * 0.25 + 0.05,
    }));

    // Pulse waves
    const pulseWaves: PulseWave[] = [];
    let lastWaveTime = 0;

    const drawHexagon = (c: CanvasRenderingContext2D, x: number, y: number, size: number, angle: number) => {
      c.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = angle + (i * Math.PI) / 3;
        const hx = x + size * Math.cos(a);
        const hy = y + size * Math.sin(a);
        if (i === 0) c.moveTo(hx, hy);
        else c.lineTo(hx, hy);
      }
      c.closePath();
    };

    const render = (time: number) => {
      // Smooth mouse lerp for parallax
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const parallaxX = (mouse.x - width / 2) * 0.02;
      const parallaxY = (mouse.y - height / 2) * 0.02;

      // Clear Canvas with subtle dark tint
      ctx.fillStyle = '#05070B';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle cyber grid
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.025)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let gx = (parallaxX % gridSize); gx < width; gx += gridSize) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, height);
        ctx.stroke();
      }
      for (let gy = (parallaxY % gridSize); gy < height; gy += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(width, gy);
        ctx.stroke();
      }

      // Draw & Update Hexagons
      hexagons.forEach((hex) => {
        hex.rotation += hex.rotSpeed;
        ctx.strokeStyle = `rgba(0, 229, 255, ${hex.opacity})`;
        ctx.lineWidth = 1;
        drawHexagon(ctx, hex.x + parallaxX * 0.5, hex.y + parallaxY * 0.5, hex.size, hex.rotation);
        ctx.stroke();
      });

      // Draw & Update Binary Particles
      ctx.font = '12px "Space Grotesk", monospace';
      binaries.forEach((bin) => {
        bin.y -= bin.speedY;
        if (bin.y < -20) {
          bin.y = height + 20;
          bin.x = Math.random() * width;
          bin.text = Math.random() > 0.5 ? '1' : '0';
        }
        ctx.fillStyle = `rgba(0, 229, 255, ${bin.opacity})`;
        ctx.fillText(bin.text, bin.x + parallaxX * 0.8, bin.y + parallaxY * 0.8);
      });

      // Periodically trigger pulse wave from center or mouse
      if (time - lastWaveTime > 3500) {
        lastWaveTime = time;
        pulseWaves.push({
          x: Math.random() > 0.5 ? mouse.x : width / 2,
          y: Math.random() > 0.5 ? mouse.y : height / 2,
          radius: 10,
          maxRadius: Math.max(width, height) * 0.45,
          opacity: 0.35,
        });
      }

      // Render Pulse Waves
      for (let i = pulseWaves.length - 1; i >= 0; i--) {
        const pw = pulseWaves[i];
        pw.radius += 2.5;
        pw.opacity *= 0.985;

        ctx.strokeStyle = `rgba(0, 229, 255, ${pw.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(pw.x, pw.y, pw.radius, 0, Math.PI * 2);
        ctx.stroke();

        if (pw.radius >= pw.maxRadius || pw.opacity < 0.01) {
          pulseWaves.splice(i, 1);
        }
      }

      // Update Nodes position
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulsePhase += 0.03;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      });

      // Draw Synaptic Connections & Data Packets
      const maxDistance = 150;
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = (n2.x + parallaxX) - (n1.x + parallaxX);
          const dy = (n2.y + parallaxY) - (n1.y + parallaxY);
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.22;
            ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(n1.x + parallaxX, n1.y + parallaxY);
            ctx.lineTo(n2.x + parallaxX, n2.y + parallaxY);
            ctx.stroke();

            // Flowing data packet along line
            if (i % 3 === 0) {
              const progress = (n1.dataPacketProgress + time * 0.0006) % 1;
              const px = n1.x + parallaxX + dx * progress;
              const py = n1.y + parallaxY + dy * progress;

              ctx.fillStyle = '#00E5FF';
              ctx.beginPath();
              ctx.arc(px, py, 1.8, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      // Draw Nodes (Neurons)
      nodes.forEach((node) => {
        const currentRadius = node.radius + Math.sin(node.pulsePhase) * 0.6;
        const nx = node.x + parallaxX;
        const ny = node.y + parallaxY;

        // Outer glow
        const glowGradient = ctx.createRadialGradient(nx, ny, 0, nx, ny, currentRadius * 4);
        glowGradient.addColorStop(0, 'rgba(0, 229, 255, 0.4)');
        glowGradient.addColorStop(1, 'rgba(0, 229, 255, 0)');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(nx, ny, currentRadius * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core Node
        ctx.fillStyle = '#00E5FF';
        ctx.beginPath();
        ctx.arc(nx, ny, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
};
