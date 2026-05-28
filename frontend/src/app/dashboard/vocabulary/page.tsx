'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ChevronLeft, 
  ChevronRight,
  RotateCcw,
  Volume2,
  Star,
  Shuffle,
  BookOpen,
  Settings,
  GraduationCap
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
// import { VocabularyImport } from '@/features/vocabulary/components/VocabularyImport';

const vocabulary = [
  {
    id: 1,
    word: "Serendipity",
    pronunciation: "/ˌsɛrənˈdɪpɪti/",
    meaning: "The occurrence of events by chance in a happy or beneficial way",
    example: "Their meeting was pure serendipity - both needed exactly what the other could offer.",
    difficulty: "Advanced",
    mastery: 0,
  },
  {
    id: 2,
    word: "Eloquent",
    pronunciation: "/ˈɛləkwənt/",
    meaning: "Fluent or persuasive in speaking or writing",
    example: "Her eloquent speech moved the entire audience to tears.",
    difficulty: "Intermediate",
    mastery: 1,
  },
  {
    id: 3,
    word: "Perseverance",
    pronunciation: "/ˌpɜrsəˈvɪrəns/",
    meaning: "Persistence in doing something despite difficulty or delay",
    example: "His perseverance in learning English finally paid off.",
    difficulty: "Intermediate",
    mastery: 2,
  },
  {
    id: 4,
    word: "Ambiguous",
    pronunciation: "/æmˈbɪɡjuəs/",
    meaning: "Open to more than one interpretation; unclear",
    example: "The instructions were ambiguous and confused many students.",
    difficulty: "Advanced",
    mastery: 0,
  },
  {
    id: 5,
    word: "Resilient",
    pronunciation: "/rɪˈzɪliənt/",
    meaning: "Able to withstand or recover quickly from difficult conditions",
    example: "Children are remarkably resilient and adapt quickly to change.",
    difficulty: "Intermediate",
    mastery: 1,
  }
];

function StudyInterface() {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentWord = vocabulary[currentCard];
  const totalCards = vocabulary.length;
  const progress = ((currentCard + 1) / totalCards) * 100;

  const flipCard = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsFlipped(!isFlipped);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const nextCard = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentCard((prev) => (prev + 1) % totalCards);
      setIsFlipped(false);
      setIsAnimating(false);
    }, 150);
  };

  const prevCard = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentCard((prev) => (prev - 1 + totalCards) % totalCards);
      setIsFlipped(false);
      setIsAnimating(false);
    }, 150);
  };

  const shuffleCards = () => {
    setCurrentCard(Math.floor(Math.random() * totalCards));
    setIsFlipped(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Advanced': return 'bg-red-100 text-red-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Beginner': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      e.preventDefault();
      flipCard();
    } else if (e.code === 'ArrowLeft') {
      prevCard();
    } else if (e.code === 'ArrowRight') {
      nextCard();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isAnimating]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Vocabulary Flashcards</h1>
          <p className="text-gray-600">Click the card to flip or use spacebar</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{currentCard + 1} of {totalCards}</span>
          </div>
          <Progress value={progress} className="h-2 bg-white" />
        </div>

        {/* Main Flashcard */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative w-full max-w-2xl">
            {/* Navigation Button - Left */}
            <Button
              variant="outline"
              size="icon"
              onClick={prevCard}
              disabled={isAnimating}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 bg-white shadow-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Card Container */}
            <div 
              className="relative h-80 cursor-pointer perspective-1000"
              onClick={flipCard}
            >
              <div 
                className={`relative w-full h-full transition-transform duration-300 transform-style-preserve-3d ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front Side */}
                <Card className={`absolute inset-0 w-full h-full backface-hidden border-0 shadow-xl ${isFlipped ? 'rotate-y-180' : ''}`}>
                  <CardContent className="h-full flex flex-col items-center justify-center p-8 bg-white">
                    <div className="text-center space-y-4">
                      <Badge className={`${getDifficultyColor(currentWord.difficulty)} text-xs px-3 py-1`}>
                        {currentWord.difficulty}
                      </Badge>
                      <h2 className="text-4xl font-bold text-gray-800">{currentWord.word}</h2>
                      <p className="text-lg text-gray-500">{currentWord.pronunciation}</p>
                      <div className="mt-8 text-sm text-gray-400">
                        Click to see definition
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Back Side */}
                <Card className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 border-0 shadow-xl ${isFlipped ? '' : 'rotate-y-180'}`}>
                  <CardContent className="h-full flex flex-col justify-center p-8 bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                    <div className="text-center space-y-6">
                      <h3 className="text-2xl font-bold">{currentWord.word}</h3>
                      <div className="space-y-4">
                        <p className="text-lg leading-relaxed">{currentWord.meaning}</p>
                        <div className="p-4 bg-white/20 rounded-lg backdrop-blur-sm">
                          <p className="italic text-sm">"{currentWord.example}"</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-white border-white hover:bg-white hover:text-blue-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add pronunciation functionality here
                        }}
                      >
                        <Volume2 className="w-4 h-4 mr-2" />
                        Listen
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Navigation Button - Right */}
            <Button
              variant="outline"
              size="icon"
              onClick={nextCard}
              disabled={isAnimating}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 bg-white shadow-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            onClick={shuffleCards}
            className="bg-white shadow-sm hover:bg-gray-50"
          >
            <Shuffle className="w-4 h-4 mr-2" />
            Shuffle
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setCurrentCard(0)}
            className="bg-white shadow-sm hover:bg-gray-50"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Restart
          </Button>

          <Button
            variant="outline"
            className="bg-white shadow-sm hover:bg-gray-50"
          >
            <Star className="w-4 h-4 mr-2" />
            Mark as Favorite
          </Button>
        </div>

        {/* Keyboard Hints */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Keyboard shortcuts: <strong>Space</strong> to flip • <strong>←→</strong> to navigate</p>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-4">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium text-blue-700">Vocabulary Learning</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Flashcard System
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Import, manage, and study your vocabulary with our comprehensive flashcard system
        </p>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="study" className="space-y-6">
        <div className="flex justify-center">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="study" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Study Cards
            </TabsTrigger>
            <TabsTrigger value="manage" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Manage Words
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="study" className="space-y-6">
          <StudyInterface />
        </TabsContent>

        <TabsContent value="manage" className="space-y-6">
          <div className="max-w-6xl mx-auto">
            {/* <VocabularyImport /> */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}