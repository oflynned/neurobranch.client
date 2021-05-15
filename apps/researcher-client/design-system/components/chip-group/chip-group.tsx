import { FC, useState } from 'react';
import { Chip } from '../../building-blocks';
import styles from './style.module.scss';

export type ChipItem = {
  label: string;
  id?: string;
  deletable?: boolean;
};

interface Props {
  chips: ChipItem[];
  defaultSelection?: string;
}

export const ChipGroup: FC<Props> = ({ chips, defaultSelection }) => {
  const defaultChip = defaultSelection ?? chips[0]?.id ?? 0;
  const [selectedChip, setSelectedChip] = useState(defaultChip);

  return (
    <div className={styles.chipGroup}>
      {chips.map(({ label, id }, index) => (
        <Chip
          key={id ?? index}
          text={label}
          selected={selectedChip === index}
          onClick={() => setSelectedChip(index)}
        />
      ))}
    </div>
  );
};
