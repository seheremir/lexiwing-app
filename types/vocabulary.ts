export interface Word {
    id: string;
    term: string;
    definition: string;
    examples: string[];
    notes?: string;
    tags: string[];
    createdAt: number;
  }
  
  export interface WordList {
    id: string;
    name: string;
    description: string;
    words: Word[];
    createdAt: number;
    updatedAt: number;
  }