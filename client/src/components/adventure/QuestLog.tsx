import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollText, Map, Award, Lock, Sparkles, Eye, Clock, Network } from 'lucide-react';

interface Quest {
  questId: string;
  title: string;
  description: string;
  difficulty: string;
  questType: string;
  narrative: string;
  status: 'locked' | 'available' | 'in_progress' | 'completed';
  progress?: number;
  rewards: {
    xp: number;
    quantumWisdom?: number;
    artifact?: string;
  };
}

export default function QuestLog() {
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [filter, setFilter] = useState<string>('all');

  // Demo quests data
  const quests: Quest[] = [
    {
      questId: 'QQ001',
      title: 'The Cipher Initiation',
      description: 'Decode your first quantum cipher',
      difficulty: 'novice',
      questType: 'cipher',
      narrative: 'In the ancient chamber, symbols pulse with quantum light...',
      status: 'available',
      progress: 0,
      rewards: { xp: 100, quantumWisdom: 10, artifact: 'fragment_of_resonance' },
    },
    {
      questId: 'QQ002',
      title: 'The Entanglement Ritual',
      description: 'Create your first quantum entanglement',
      difficulty: 'novice',
      questType: 'entanglement',
      narrative: 'Two particles, forever connected across spacetime...',
      status: 'locked',
      rewards: { xp: 150, quantumWisdom: 15 },
    },
    {
      questId: 'QQ003',
      title: 'The Temporal Paradox',
      description: 'Navigate a quantum temporal anomaly',
      difficulty: 'adept',
      questType: 'temporal',
      narrative: 'Time bends. Time breaks. But in the quantum realm...',
      status: 'locked',
      rewards: { xp: 300, quantumWisdom: 30 },
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      novice: 'bg-green-500/20 text-green-400',
      adept: 'bg-blue-500/20 text-blue-400',
      master: 'bg-purple-500/20 text-purple-400',
      transcendent: 'bg-amber-500/20 text-amber-400',
    };
    return colors[difficulty as keyof typeof colors] || 'bg-gray-500/20 text-gray-400';
  };

  const getQuestIcon = (type: string) => {
    const icons = {
      cipher: ScrollText,
      entanglement: Network,
      temporal: Clock,
      discovery: Eye,
    };
    const Icon = icons[type as keyof typeof icons] || Map;
    return <Icon className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-[#0a0e27] text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Map className="w-8 h-8 text-[#4cc9f0]" />
          <h1 className="text-4xl font-bold">Quest Log</h1>
        </div>
        <p className="text-[#4cc9f0]/80 opacity-90">
          "The map was never meant to be complete. It was meant to be discovered."
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto mb-6 flex gap-2">
        {['all', 'available', 'in_progress', 'completed'].map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'default' : 'outline'}
            onClick={() => setFilter(f)}
            className="capitalize"
          >
            {f.replace('_', ' ')}
          </Button>
        ))}
      </div>

      {/* Quest Grid */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quests.map((quest) => (
          <Card
            key={quest.questId}
            className={`bg-[#16213e] border-[#4cc9f0]/30 p-6 cursor-pointer transition-all hover:border-[#4cc9f0] ${
              quest.status === 'locked' ? 'opacity-60' : ''
            }`}
            onClick={() => setSelectedQuest(quest)}
          >
            {/* Quest Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-[#4cc9f0]">
                  {quest.status === 'locked' ? (
                    <Lock className="w-6 h-6" />
                  ) : (
                    getQuestIcon(quest.questType)
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{quest.title}</h3>
                  <Badge className={getDifficultyColor(quest.difficulty)}>
                    {quest.difficulty}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm opacity-80 mb-4">{quest.description}</p>

            {/* Progress */}
            {quest.status === 'in_progress' && quest.progress !== undefined && (
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1">
                  <span>Progress</span>
                  <span>{quest.progress}%</span>
                </div>
                <Progress value={quest.progress} className="h-2" />
              </div>
            )}

            {/* Rewards */}
            <div className="border-t border-[#4cc9f0]/20 pt-4 mt-4">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{quest.rewards.xp} XP</span>
                </div>
                {quest.rewards.quantumWisdom && (
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4 text-[#7b2cbf]" />
                    <span>{quest.rewards.quantumWisdom} Wisdom</span>
                  </div>
                )}
                {quest.rewards.artifact && (
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4 text-[#4cc9f0]" />
                    <span className="text-xs">Artifact</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quest Detail Modal */}
      {selectedQuest && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50"
          onClick={() => setSelectedQuest(null)}
        >
          <Card
            className="bg-[#16213e] border-[#4cc9f0] max-w-2xl w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">{selectedQuest.title}</h2>
              <Badge className={getDifficultyColor(selectedQuest.difficulty)}>
                {selectedQuest.difficulty}
              </Badge>
            </div>

            <div className="mb-6 text-[#4cc9f0]/90 italic border-l-2 border-[#4cc9f0] pl-4">
              "{selectedQuest.narrative}"
            </div>

            <p className="mb-6 opacity-90">{selectedQuest.description}</p>

            <div className="border-t border-[#4cc9f0]/20 pt-4">
              <h3 className="text-lg font-bold mb-3">Rewards</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>{selectedQuest.rewards.xp} Experience Points</span>
                </div>
                {selectedQuest.rewards.quantumWisdom && (
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-[#7b2cbf]" />
                    <span>{selectedQuest.rewards.quantumWisdom} Quantum Wisdom</span>
                  </div>
                )}
                {selectedQuest.rewards.artifact && (
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#4cc9f0]" />
                    <span>Quantum Artifact: {selectedQuest.rewards.artifact}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              {selectedQuest.status === 'available' && (
                <Button className="flex-1 bg-[#4cc9f0] text-black hover:bg-[#4cc9f0]/90">
                  Begin Quest
                </Button>
              )}
              {selectedQuest.status === 'locked' && (
                <Button className="flex-1" disabled>
                  <Lock className="w-4 h-4 mr-2" />
                  Requirements Not Met
                </Button>
              )}
              <Button variant="outline" onClick={() => setSelectedQuest(null)}>
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
