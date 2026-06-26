"use client";

import { useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "./Icon";
import styles from "./StatsCounter.module.css";

type Stat = { icon: IconName; label: string; value: number; suffix?: string };

function useCountUp(target: number, run: boolean, duration = 1600) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    let start: number | null = null;
    const step = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      // easeOutCubic
      setN(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return n;
}

function Counter({ stat, run }: { stat: Stat; run: boolean }) {
  const n = useCountUp(stat.value, run);
  return (
    <div className={styles.stat}>
      <span className={styles.icon}>
        <Icon name={stat.icon} size={40} />
      </span>
      <span className={styles.value}>
        {n.toLocaleString()}
        {stat.suffix}
      </span>
      <span className={styles.label}>{stat.label}</span>
    </div>
  );
}

export function StatsCounter({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setRun(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.grid}>
      {stats.map((s) => (
        <Counter key={s.label} stat={s} run={run} />
      ))}
    </div>
  );
}
