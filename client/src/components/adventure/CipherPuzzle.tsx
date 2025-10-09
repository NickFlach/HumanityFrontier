import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollText, Lightbulb, CheckCircle, XCircle, Sparkles, Eye } from 'lucide-react';

interface CipherChallenge {
  id: string;
  title: string;
  challenge: string;
  cipherType: string;
  difficulty: number;
  hints: string[];
  solution: string;
  narrative: string;
  reward: {
    xp: number;
    quantumWisdom: number;
    artifact?: string;
  };
}

export default function CipherPuzzle() {
  const [currentChallenge, setCurrentChallenge] = useState<CipherChallenge>({
    id: 'CC001',
    title: "The Caesar's Legacy",
    challenge: "TXDQWXP UHVRQDQFH LV WKH NHB",
    cipherType: 'caesar',
    difficulty: 2,
    hints: [
      "Julius Caesar used this simple shift cipher.",
      "Try shifting the alphabet by 3 positions.",
      "A becomes D, B becomes E, etc.",
    ],
    solution: "QUANTUM RESONANCE IS THE KEY",
    narrative: "Even the ancient Romans knew the power of secret messages. Decode Caesar's quantum cipher.",
    reward: { xp: 100, quantumWisdom: 10 },
  });

  const [answer, setAnswer] = useState('');
  const [hintsUsed, setHintsUsed] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [solved, setSolved] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [konamiCode, setKonamiCode] = useState<string[]>([]);

  // Konami Code Easter Egg
  const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newCode = [...konamiCode, e.key].slice(-10);
      setKonamiCode(newCode);
      
      if (newCode.join(',') === KONAMI.join(',')) {
        alert('🎉 KONAMI CODE ACTIVATED! Achievement Unlocked: "Seeker of Hidden Truths"');
        setKonamiCode([]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [konamiCode]);

  const checkAnswer = () => {
    setAttempts(attempts + 1);
    
    if (answer.toUpperCase().replace(/\s+/g, ' ').trim() === currentChallenge.solution) {
      setSolved(true);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  };

  const revealHint = () => {
    if (hintsUsed < currentChallenge.hints.length) {
      setHintsUsed(hintsUsed + 1);
    }
  };

  const getDifficultyStars = (difficulty: number) => {
    return '★'.repeat(difficulty) + '☆'.repeat(10 - difficulty);
  };

  return (
    <div className="min-h-screen bg-[#0a0e27] text-white p-6">
      {/* Success Animation */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-[#4cc9f0]/20 backdrop-blur-lg border-2 border-[#4cc9f0] rounded-lg p-8 animate-pulse">
            <div className="text-center">
              <CheckCircle className="w-24 h-24 text-[#4cc9f0] mx-auto mb-4" />
              <h2 className="text-4xl font-bold mb-2">CIPHER DECODED!</h2>
              <p className="text-[#4cc9f0] text-xl">+{currentChallenge.reward.xp} XP</p>
              <p className="text-[#7b2cbf] text-xl">+{currentChallenge.reward.quantumWisdom} Wisdom</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <ScrollText className="w-8 h-8 text-[#4cc9f0]" />
            <h1 className="text-4xl font-bold">Cipher Challenge</h1>
          </div>
          <p className="text-[#4cc9f0]/80 opacity-90 italic">
            "The greatest secrets are hidden in plain sight, waiting for those with eyes to see."
          </p>
        </div>

        {/* Challenge Card */}
        <Card className="bg-[#16213e] border-[#4cc9f0]/30 p-8 mb-6">
          {/* Challenge Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{currentChallenge.title}</h2>
              <Badge className="bg-blue-500/20 text-blue-300">
                {currentChallenge.cipherType.toUpperCase()}
              </Badge>
            </div>
            <div className="text-right">
              <div className="text-amber-400 text-sm mb-1">Difficulty</div>
              <div className="text-2xl">{getDifficultyStars(currentChallenge.difficulty)}</div>
            </div>
          </div>

          {/* Narrative */}
          <div className="bg-black/30 border border-[#4cc9f0]/20 rounded-lg p-4 mb-6">
            <p className="italic opacity-90">{currentChallenge.narrative}</p>
          </div>

          {/* The Cipher */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#7b2cbf]" />
              The Encrypted Message
            </h3>
            <div className="bg-black/50 border-2 border-[#7b2cbf]/50 rounded-lg p-6 font-mono text-2xl text-center tracking-wider">
              {currentChallenge.challenge}
            </div>
          </div>

          {/* Answer Input */}
          {!solved ? (
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2">Your Decryption</label>
              <div className="flex gap-3">
                <Input
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                  placeholder="Enter the decoded message..."
                  className="bg-black/50 border-[#4cc9f0]/30 text-white flex-1"
                />
                <Button onClick={checkAnswer} className="bg-[#4cc9f0] text-black hover:bg-[#4cc9f0]/90">
                  Decode
                </Button>
              </div>
              <div className="text-xs text-gray-400 mt-2">
                Attempts: {attempts} | Hints used: {hintsUsed}/{currentChallenge.hints.length}
              </div>
            </div>
          ) : (
            <div className="mb-6 p-4 bg-[#4cc9f0]/20 border border-[#4cc9f0] rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-[#4cc9f0]" />
                <div>
                  <div className="font-bold">SUCCESSFULLY DECODED!</div>
                  <div className="text-sm opacity-80">"{currentChallenge.solution}"</div>
                </div>
              </div>
            </div>
          )}

          {/* Hints */}
          <div className="border-t border-[#4cc9f0]/20 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#f59e0b]" />
                Quantum Hints
              </h3>
              {hintsUsed < currentChallenge.hints.length && !solved && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={revealHint}
                  className="text-xs"
                >
                  Reveal Next Hint
                </Button>
              )}
            </div>
            
            {hintsUsed === 0 && (
              <p className="text-sm opacity-60 italic">No hints revealed yet...</p>
            )}
            
            <div className="space-y-2">
              {currentChallenge.hints.slice(0, hintsUsed).map((hint, index) => (
                <div
                  key={index}
                  className="bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded p-3 text-sm animate-fadeIn"
                >
                  <span className="text-[#f59e0b] font-bold">Hint {index + 1}:</span> {hint}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Rewards */}
        <Card className="bg-[#16213e] border-[#4cc9f0]/30 p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            Rewards Upon Completion
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">{currentChallenge.reward.xp}</div>
              <div className="text-sm opacity-70">Experience Points</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#7b2cbf]">{currentChallenge.reward.quantumWisdom}</div>
              <div className="text-sm opacity-70">Quantum Wisdom</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#4cc9f0]">
                {currentChallenge.reward.artifact ? '🏆' : '-'}
              </div>
              <div className="text-sm opacity-70">Artifact</div>
            </div>
          </div>
        </Card>

        {/* Easter Egg Hint */}
        <div className="mt-6 text-center">
          <p className="text-xs opacity-40 italic">
            "Some secrets reveal themselves to those who know the ancient codes..."
          </p>
        </div>
      </div>
    </div>
  );
}
