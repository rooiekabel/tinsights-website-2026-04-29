"use client";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

interface Props {
  id?: string;
  particleColor?: string;
  linkColor?: string;
  count?: number;
  speed?: number;
  particleOpacity?: number;
  linkOpacity?: number;
  repulse?: boolean;
}

export default function ParticlesCanvas({
  id = "tsparticles",
  particleColor = "#6366f1",
  linkColor = "#6366f1",
  count = 80,
  speed = 0.7,
  particleOpacity = 0.5,
  linkOpacity = 0.18,
  repulse = true,
}: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
    <Particles
      id={id}
      style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
      options={{
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        detectRetina: true,
        particles: {
          number: {
            value: count,
            density: { enable: true },
          },
          color: { value: particleColor },
          links: {
            enable: true,
            color: linkColor,
            distance: 130,
            opacity: linkOpacity,
            width: 1,
          },
          move: {
            enable: true,
            speed: speed,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "bounce" },
          },
          opacity: {
            value: { min: 0.1, max: particleOpacity },
            animation: { enable: true, speed: 0.5 },
          },
          shape: { type: "circle" },
          size: {
            value: { min: 1.5, max: 3.5 },
          },
        },
        interactivity: {
          detectsOn: "window",
          events: {
            onHover: { enable: repulse, mode: "repulse" },
            resize: { enable: true },
          },
          modes: {
            repulse: { distance: 130, duration: 0.4, speed: 0.5 },
          },
        },
      }}
    />
    </div>
  );
}
