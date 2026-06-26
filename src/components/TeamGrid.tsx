import Image from "next/image";
import styles from "./TeamGrid.module.css";

type Member = {
  name: string;
  role: string;
  description?: string;
  photo: string;
};

export function TeamGrid({ members }: { members: Member[] }) {
  return (
    <div className="grid grid-4">
      {members.map((m) => (
        <div key={m.name} className={styles.member}>
          <div className={styles.photo}>
            <Image
              src={m.photo}
              alt={m.name}
              fill
              sizes="(max-width: 760px) 50vw, 270px"
              className={styles.img}
            />
          </div>
          <h3 className={styles.name}>{m.name}</h3>
          <p className={styles.role}>{m.role}</p>
          {m.description && <p className={styles.desc}>{m.description}</p>}
        </div>
      ))}
    </div>
  );
}
