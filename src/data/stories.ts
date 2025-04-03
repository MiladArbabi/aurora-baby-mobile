export interface Story {
    id: string;
    title: string;
    layer: 'Surface' | 'Underwater' | 'Sky' | 'Undersurface';
    stemFocus: 'Science' | 'Technology' | 'Engineering' | 'Math';
    traitFocus: string;
    language: string;
    characters: string[];
  }
  
  export const prebuiltStories: Story[] = [
    {
      id: 'birk-freya-treehouse',
      title: 'Birk and Freya’s Treehouse Adventure',
      layer: 'Surface',
      stemFocus: 'Engineering',
      traitFocus: 'Empathy',
      language: 'English',
      characters: ['Birk', 'Freya'],
    },
  ];