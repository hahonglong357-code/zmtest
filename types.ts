
export type Operator = '+' | '-' | '×' | '÷';

export interface Cell {
  id: string;
  value: number | Operator;
  type: 'number' | 'operator';
  isRemoving?: boolean;
}

export interface Position {
  col: number;
  row: number;
}

export interface GameState {
  grid: Cell[][];
  previewCells: Cell[];
  currentTarget: number;
  nextTarget: number;
  score: number;
  selectedNum: Position | null;
  selectedOp: Position | null;
  combo: number;
  isGameOver: boolean;
}
