// src/data/cards.ts
export interface CardData {
    id: string;
    testID: string;
    title: string;
    backgroundImage: string;
    subtext?: string;
    badges?: string[];
    icon?: string;
    mode?: 'soothing' | 'choice' | 'daily';
    screen: 'Harmony' | 'Home' | 'StoryPlayer';
    onPress: (navigation: any, storyId?: string) => void;
  }
  
  export const cards: CardData[] = [
    // Placeholder for StoryPlayer cards
    {
      id: 'story-soothing',
      testID: 'story-card-soothing',
      title: 'Soothing Storytime',
      backgroundImage: 'characters/birkandfreya.png',
      screen: 'StoryPlayer',
      mode: 'soothing',
      onPress: (navigation, storyId) => navigation.navigate('StoryViewer', { storyId, mode: 'soothing' }),
    },
    {
      id: 'story-choice',
      testID: 'story-card-choice',
      title: 'Make a Choice',
      backgroundImage: 'harmony/harmonycardbackground1.png',
      screen: 'StoryPlayer',
      mode: 'choice',
      onPress: (navigation, storyId) => navigation.navigate('StoryViewer', { storyId, mode: 'choice' }),
    },
    {
      id: 'story-daily',
      testID: 'story-card-daily',
      title: 'Story of the Day',
      backgroundImage: 'harmony/auroraforest.png',
      screen: 'StoryPlayer',
      mode: 'daily',
      onPress: (navigation, storyId) => navigation.navigate('StoryViewer', { storyId, mode: 'daily' }),
    },
  ];
  
  export const resolveAsset = (path: string): any => {
    const assetMap: { [key: string]: any } = {
      'characters/birkandfreya.png': require('../assets/png/characters/birkandfreya.png'),
      'harmony/harmonycardbackground1.png': require('../assets/png/harmony/harmonycardbackground1.png'),
      'harmony/auroraforest.png': require('../assets/png/harmony/auroraforest.png'),
      // Add more assets as needed
    };
    return assetMap[path] || null;
  };