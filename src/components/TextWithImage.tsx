import Image from "next/image";
import styles from "./TextWithImage.module.css";

type Block = {
  title: string;
  text: string;
  image: string;
  reverse?: boolean;
};

export function TextWithImage({ blocks }: { blocks: Block[] }) {
  return (
    <div className={styles.stack}>
      {blocks.map((b, i) => (
        <div
          key={b.title}
          className={`${styles.row} ${
            (b.reverse ?? i % 2 === 1) ? styles.reverse : ""
          }`}
        >
          <div className={styles.media}>
            <Image
              src={b.image}
              alt={b.title}
              fill
              sizes="(max-width: 800px) 100vw, 540px"
              className={styles.img}
            />
          </div>
          <div className={styles.body}>
            <h3 className={styles.title}>{b.title}</h3>
            <p className={styles.text}>{b.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
