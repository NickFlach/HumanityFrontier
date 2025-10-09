import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DoorOpen, Lock, Key, MapPin, Sparkles, Eye, AlertTriangle } from 'lucide-react';

interface HiddenPassage {
  id: string;
  name: string;
  description: string;
  location: string;
  isDiscovered: boolean;
  requiresCode: boolean;
  secretCode?: string;
  narrative: string;
  warning?: string;
  reward: {
    xp?: number;
    quantumWisdom?: number;
    artifact?: string;
    unlocks?: string;
  };
}

export default function HiddenPassages() {
  const [passages, setPassages] = useState<HiddenPassage[]>([
    {
      id: 'chamber_of_echoes',
      name: 'The Chamber of Echoes',
      description: 'A hidden room where quantum states from parallel timelines converge',
      location: 'Behind the Geopolitical Map',
      isDiscovered: false,
      requiresCode: false,
      narrative: 'You hear whispers of choices unmade, paths untaken. Each echo is a quantum probability that never collapsed.',
      reward: { xp: 250, quantumWisdom: 25 },
    },
    {
      id: 'temporal_nexus',
      name: 'The Temporal Nexus',
      description: 'A point in spacetime where all moments exist simultaneously',
      location: 'Section III - Beneath the Cipher Visualization',
      isDiscovered: false,
      requiresCode: true,
      secretCode: 'TEMPORIS_VERITAS',
      narrative: 'Time folds upon itself here. Past, present, and future are one. You stand at the center of eternity.',
      warning: 'Caution: Temporal paradoxes may occur',
      reward: { xp: 500, quantumWisdom: 50, artifact: 'temporal_compass' },
    },
    {
      id: 'akashic_records',
      name: 'The Akashic Records',
      description: 'The repository of all quantum knowledge across all timelines',
      location: 'Hidden in Section VI',
      isDiscovered: false,
      requiresCode: true,
      secretCode: 'OMNISCIENCE_ACHIEVED',
      narrative: 'Every quantum operation ever performed. Every cipher ever created. Every secret ever encrypted. All here. All now. All yours.',
      warning: 'Knowledge comes at a price',
      reward: { xp: 1000, quantumWisdom: 100, unlocks: 'Ultimate Knowledge' },
    },
    {
      id: 'developers_sanctum',
      name: "The Developer's Sanctum",
      description: 'Where the creators left their mark',
      location: 'Easter Egg - Konami Code',
      isDiscovered: false,
      requiresCode: true,
      secretCode: 'UP_UP_DOWN_DOWN',
      narrative: "You've found our secret. Well done, seeker. Here's a gift: the knowledge that reality is made of code, and you've just edited it.",
      reward: { artifact: 'developers_blessing', xp: 1000 },
    },
  ]);

  const [selectedPassage, setSelectedPassage] = useState<HiddenPassage | null>(null);
  const [codeInput, setCodeInput] = useState('');
  const [showCodeError, setShowCodeError] = useState(false);
  const [discoveredCount, setDiscoveredCount] = useState(0);

  useEffect(() => {
    setDiscoveredCount(passages.filter(p => p.isDiscovered).length);
  }, [passages]);

  const attemptUnlock = () => {
    if (!selectedPassage) return;

    if (selectedPassage.requiresCode && codeInput.toUpperCase() === selectedPassage.secretCode) {
      // Unlock passage
      setPassages(passages.map(p => 
        p.id === selectedPassage.id ? { ...p, isDiscovered: true } : p
      ));
      setCodeInput('');
      setShowCodeError(false);
      
      // Show success animation
      setTimeout(() => {
        alert(`🎉 ${selectedPassage.name} discovered! +${selectedPassage.reward.xp} XP`);
      }, 100);
    } else if (!selectedPassage.requiresCode) {
      // Auto-discover passages that don't need codes
      setPassages(passages.map(p => 
        p.id === selectedPassage.id ? { ...p, isDiscovered: true } : p
      ));
    } else {
      setShowCodeError(true);
      setTimeout(() => setShowCodeError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e27] text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <DoorOpen className="w-8 h-8 text-[#4cc9f0]" />
              <h1 className="text-4xl font-bold">Hidden Passages</h1>
            </div>
            <p className="text-[#4cc9f0]/80 opacity-90 italic">
              "Not all doors are visible. Not all paths are known."
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-[#4cc9f0]">
              {discoveredCount}/{passages.length}
            </div>
            <div className="text-sm opacity-70">Passages Found</div>
          </div>
        </div>

        {/* Discovery Progress */}
        <Card className="bg-[#16213e] border-[#4cc9f0]/30 p-4">
          <div className="flex items-center gap-3 mb-2">
            <Eye className="w-5 h-5 text-[#7b2cbf]" />
            <span className="text-sm font-bold">Exploration Progress</span>
          </div>
          <div className="h-3 bg-black/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#7b2cbf] via-[#4cc9f0] to-[#f59e0b] transition-all duration-500"
              style={{ width: `${(discoveredCount / passages.length) * 100}%` }}
            />
          </div>
        </Card>
      </div>

      {/* Passages Grid */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 mb-8">
        {passages.map((passage) => (
          <Card
            key={passage.id}
            className={`bg-[#16213e] border-[#4cc9f0]/30 p-6 cursor-pointer transition-all hover:border-[#4cc9f0] ${
              !passage.isDiscovered ? 'opacity-70' : 'shadow-lg shadow-[#4cc9f0]/20'
            }`}
            onClick={() => setSelectedPassage(passage)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-full ${passage.isDiscovered ? 'bg-[#4cc9f0]/20' : 'bg-gray-700/20'}`}>
                  {passage.isDiscovered ? (
                    <DoorOpen className="w-6 h-6 text-[#4cc9f0]" />
                  ) : passage.requiresCode ? (
                    <Lock className="w-6 h-6 text-gray-500" />
                  ) : (
                    <MapPin className="w-6 h-6 text-[#7b2cbf]" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{passage.name}</h3>
                  {passage.requiresCode && !passage.isDiscovered && (
                    <Badge className="bg-amber-500/20 text-amber-400 text-xs mt-1">
                      <Key className="w-3 h-3 mr-1" />
                      Code Required
                    </Badge>
                  )}
                  {passage.isDiscovered && (
                    <Badge className="bg-green-500/20 text-green-400 text-xs mt-1">
                      <Eye className="w-3 h-3 mr-1" />
                      Discovered
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm opacity-80 mb-3">{passage.description}</p>

            {/* Location */}
            <div className="flex items-center gap-2 text-xs text-[#4cc9f0] mb-4">
              <MapPin className="w-3 h-3" />
              <span>{passage.location}</span>
            </div>

            {/* Rewards Preview */}
            {passage.isDiscovered && (
              <div className="border-t border-[#4cc9f0]/20 pt-3">
                <div className="flex items-center gap-3 text-xs">
                  {passage.reward.xp && (
                    <span className="text-amber-400">+{passage.reward.xp} XP</span>
                  )}
                  {passage.reward.quantumWisdom && (
                    <span className="text-[#7b2cbf]">+{passage.reward.quantumWisdom} Wisdom</span>
                  )}
                  {passage.reward.artifact && (
                    <span className="text-[#4cc9f0]">🏆 Artifact</span>
                  )}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Passage Detail Modal */}
      {selectedPassage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center p-6 z-50 backdrop-blur-sm"
          onClick={() => setSelectedPassage(null)}
        >
          <Card
            className={`bg-[#0a0e27] border-2 max-w-2xl w-full p-8 ${
              selectedPassage.isDiscovered ? 'border-[#4cc9f0] shadow-2xl shadow-[#4cc9f0]/30' : 'border-gray-700'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className={`p-4 rounded-full ${selectedPassage.isDiscovered ? 'bg-[#4cc9f0]/20' : 'bg-gray-700/20'}`}>
                {selectedPassage.isDiscovered ? (
                  <DoorOpen className="w-10 h-10 text-[#4cc9f0]" />
                ) : (
                  <Lock className="w-10 h-10 text-gray-500" />
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2">{selectedPassage.name}</h2>
                <div className="flex items-center gap-2 text-sm text-[#4cc9f0]">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedPassage.location}</span>
                </div>
              </div>
            </div>

            {/* Warning */}
            {selectedPassage.warning && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6 flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span className="text-sm text-amber-400">{selectedPassage.warning}</span>
              </div>
            )}

            {/* Description */}
            <p className="text-lg opacity-90 mb-6">{selectedPassage.description}</p>

            {/* Narrative (shown only when discovered) */}
            {selectedPassage.isDiscovered && (
              <div className="bg-[#16213e] border border-[#4cc9f0]/30 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-[#4cc9f0]" />
                  <span className="text-sm font-bold text-[#4cc9f0]">REVELATION</span>
                </div>
                <p className="text-sm italic opacity-90">{selectedPassage.narrative}</p>
              </div>
            )}

            {/* Code Input */}
            {!selectedPassage.isDiscovered && selectedPassage.requiresCode && (
              <div className="mb-6">
                <label className="block text-sm font-bold mb-2">Enter Secret Code</label>
                <div className="flex gap-3">
                  <Input
                    value={codeInput}
                    onChange={(e) => setCodeInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && attemptUnlock()}
                    placeholder="CODE_GOES_HERE"
                    className={`bg-black/50 border-[#4cc9f0]/30 text-white flex-1 font-mono ${
                      showCodeError ? 'border-red-500 animate-shake' : ''
                    }`}
                  />
                  <Button onClick={attemptUnlock} className="bg-[#4cc9f0] text-black hover:bg-[#4cc9f0]/90">
                    <Key className="w-4 h-4 mr-2" />
                    Unlock
                  </Button>
                </div>
                {showCodeError && (
                  <p className="text-xs text-red-400 mt-2">Incorrect code. The passage remains sealed.</p>
                )}
              </div>
            )}

            {/* Rewards */}
            {selectedPassage.isDiscovered && (
              <div className="border-t border-[#4cc9f0]/20 pt-4 mb-6">
                <h3 className="text-lg font-bold mb-3">Rewards Claimed</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-400">
                      {selectedPassage.reward.xp || '-'}
                    </div>
                    <div className="text-xs opacity-70">XP</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#7b2cbf]">
                      {selectedPassage.reward.quantumWisdom || '-'}
                    </div>
                    <div className="text-xs opacity-70">Wisdom</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#4cc9f0]">
                      {selectedPassage.reward.artifact ? '🏆' : '-'}
                    </div>
                    <div className="text-xs opacity-70">Artifact</div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              {!selectedPassage.isDiscovered && !selectedPassage.requiresCode && (
                <Button onClick={attemptUnlock} className="flex-1 bg-[#4cc9f0] text-black hover:bg-[#4cc9f0]/90">
                  <DoorOpen className="w-4 h-4 mr-2" />
                  Enter Passage
                </Button>
              )}
              <Button variant="outline" onClick={() => setSelectedPassage(null)}>
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Exploration Tips */}
      <div className="max-w-7xl mx-auto">
        <Card className="bg-[#16213e] border-[#4cc9f0]/30 p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#f59e0b]" />
            Explorer's Notes
          </h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li>• Hidden passages reveal themselves to those who complete quests</li>
            <li>• Some passages require secret codes found throughout your journey</li>
            <li>• The greatest treasures lie behind the most obscure doors</li>
            <li>• Easter eggs hide in unexpected places - explore everything</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
