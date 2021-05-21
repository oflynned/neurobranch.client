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
  selectedIndex?: number;
  onSelection?: (item: ChipItem, index: number) => Promise<void> | void;
}

export const ChipGroup: FC<Props> = ({ chips, selectedIndex, onSelection }) => {
  const [selectedChipIndex, setSelectedChipIndex] = useState(
    selectedIndex ?? 0
  );

  return (
    <div className={styles.chipGroup}>
      {chips.map(({ label, id }, index) => (
        <Chip
          key={id ?? index}
          text={label}
          selected={selectedChipIndex === index}
          onClick={async () => {
            setSelectedChipIndex(index);
            onSelection && onSelection(chips[index], index);
          }}
        />
      ))}
    </div>
  );
};
