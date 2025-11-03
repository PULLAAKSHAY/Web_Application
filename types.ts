
export interface Note {
  id: string;
  content: string;
  createdAt: string;
}

export interface Insight {
  summary: string;
  topics: string[];
  category: string;
}
