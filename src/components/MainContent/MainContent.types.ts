export interface StringMap {
  [key: string]: string;
}

export interface MainContentProps {
  handleClick: React.EventHandler<any>;
  currentIndex: number;
  oldIndex: number;
  children: React.ReactNode;
}
