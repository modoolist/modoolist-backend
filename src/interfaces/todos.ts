export interface PrimaryTodos {
  id?: number;
  muId: number;
  title: string;
  period: Date;
  createdAt?: Date;
}

export interface SubTodos {
  id?: number;
  mptId: number;
  title: string;
  isAchieved: boolean;
  createdAt?: Date;
}
