import styles from "./Steps.module.css";

type Step = { number: number; heading: string; description: string };

export function Steps({ steps }: { steps: Step[] }) {
  return (
    <div className={styles.wrap}>
      {steps.map((s) => (
        <div key={s.number} className={styles.step}>
          <span className={styles.num}>{String(s.number).padStart(2, "0")}</span>
          <h3 className={styles.heading}>{s.heading}</h3>
          <p className={styles.desc}>{s.description}</p>
        </div>
      ))}
    </div>
  );
}
