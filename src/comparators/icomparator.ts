export interface ComparatorProps {
    choices: ReadonlyArray<number>;
    correct: number;
    onSelect: (val: number) => void;
}
