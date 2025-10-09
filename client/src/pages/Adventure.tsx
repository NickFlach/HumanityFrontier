import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Map, 
  Crown, 
  ScrollText, 
  DoorOpen, 
  Award, 
  TrendingUp, 
  Zap,
  Eye,
  Lock,
  Sparkles
} from 'lucide-react';
import { Link } from 'wouter';

export default function Adventure() {
  const [playerStats] = useState({
    level: 3,
    xp: 450,
    xpToNext: 600,
    quantumWisdom: 75,
    achievementsUnlocked: 5,
    totalAchievements: 15,
    artifactsCollected: 2,
    totalArtifacts: 7,
    questsCompleted: 3,
    activeQuests: 2,
    hiddenPassagesFound: 1,
  });

  const recentActivities = [
    { type: 'quest', text: 'Completed "The Cipher Initiation"', time: '2 hours ago', xp: 100 },
    { type: 'artifact', text: 'Discovered Fragment of Resonance', time: '2 hours ago' },
    { type: 'achievement', text: 'Unlocked "First Steps into Shadow"', time: '3 hours ago' },
    { type: 'passage', text: 'Found Chamber of Echoes', time: '1 day ago', wisdom: 25 },
  ];

  const getActivityIcon = (type: string) => {
    const icons = {
      quest: ScrollText,
      artifact: Crown,
      achievement: Award,
      passage: DoorOpen,
    };
    return icons[type as keyof typeof icons] || Sparkles;
  };

  return (
    <div className="min-h-screen bg-[#0a0e27] text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-[#4cc9f0] via-[#7b2cbf] to-[#f59e0b] bg-clip-text text-transparent">
            Quantum Adventure
          </h1>
          <p className="text-[#4cc9f0]/80 opacity-90 italic text-lg">
            "Your journey through the cryptographic mysteries"
          </p>
        </div>

        {/* Player Stats Card */}
        <Card className="bg-gradient-to-r from-[#16213e] to-[#1a1f3e] border-[#4cc9f0] p-8 mb-8 shadow-lg shadow-[#4cc9f0]/20">
          <div className="grid md:grid-cols-4 gap-6">
            {/* Level */}
            <div className="text-center">
              <div className="text-5xl font-bold text-[#4cc9f0] mb-2">
                {playerStats.level}
              </div>
              <div className="text-sm opacity-70">Quantum Level</div>
              <div className="mt-3">
                <Progress value={(playerStats.xp / playerStats.xpToNext) * 100} className="h-2" />
                <div className="text-xs mt-1 opacity-60">
                  {playerStats.xp} / {playerStats.xpToNext} XP
                </div>
              </div>
            </div>

            {/* Quantum Wisdom */}
            <div className="text-center">
              <div className="text-5xl font-bold text-[#7b2cbf] mb-2">
                {playerStats.quantumWisdom}
              </div>
              <div className="text-sm opacity-70">Quantum Wisdom</div>
              <div className="flex items-center justify-center gap-1 mt-3">
                <Eye className="w-4 h-4 text-[#7b2cbf]" />
                <span className="text-xs">Enlightenment Path</span>
              </div>
            </div>

            {/* Quests */}
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-400 mb-2">
                {playerStats.questsCompleted}
              </div>
              <div className="text-sm opacity-70">Quests Completed</div>
              <div className="flex items-center justify-center gap-1 mt-3">
                <Badge className="bg-amber-500/20 text-amber-400 text-xs">
                  {playerStats.activeQuests} Active
                </Badge>
              </div>
            </div>

            {/* Artifacts */}
            <div className="text-center">
              <div className="text-5xl font-bold text-[#f59e0b] mb-2">
                {playerStats.artifactsCollected}/{playerStats.totalArtifacts}
              </div>
              <div className="text-sm opacity-70">Artifacts</div>
              <div className="flex items-center justify-center gap-1 mt-3">
                <Crown className="w-4 h-4 text-[#f59e0b]" />
                <span className="text-xs">Collection</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Main Adventure Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Quest Log */}
          <Link href="/adventure/quests">
            <Card className="bg-[#16213e] border-[#4cc9f0]/30 p-6 cursor-pointer hover:border-[#4cc9f0] hover:shadow-lg hover:shadow-[#4cc9f0]/20 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <Map className="w-10 h-10 text-[#4cc9f0] group-hover:scale-110 transition-transform" />
                <Badge className="bg-amber-500/20 text-amber-400">
                  {playerStats.activeQuests} Active
                </Badge>
              </div>
              <h3 className="text-xl font-bold mb-2">Quest Log</h3>
              <p className="text-sm opacity-80">
                {playerStats.questsCompleted} completed, {playerStats.activeQuests} in progress
              </p>
            </Card>
          </Link>

          {/* Artifact Gallery */}
          <Link href="/adventure/artifacts">
            <Card className="bg-[#16213e] border-[#4cc9f0]/30 p-6 cursor-pointer hover:border-[#4cc9f0] hover:shadow-lg hover:shadow-amber-500/20 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <Crown className="w-10 h-10 text-[#f59e0b] group-hover:scale-110 transition-transform" />
                <Badge className="bg-[#f59e0b]/20 text-[#f59e0b]">
                  {Math.round((playerStats.artifactsCollected / playerStats.totalArtifacts) * 100)}%
                </Badge>
              </div>
              <h3 className="text-xl font-bold mb-2">Artifacts</h3>
              <p className="text-sm opacity-80">
                {playerStats.artifactsCollected} of {playerStats.totalArtifacts} discovered
              </p>
            </Card>
          </Link>

          {/* Cipher Puzzles */}
          <Link href="/adventure/cipher">
            <Card className="bg-[#16213e] border-[#4cc9f0]/30 p-6 cursor-pointer hover:border-[#4cc9f0] hover:shadow-lg hover:shadow-[#7b2cbf]/20 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <ScrollText className="w-10 h-10 text-[#7b2cbf] group-hover:scale-110 transition-transform" />
                <Badge className="bg-[#7b2cbf]/20 text-[#7b2cbf]">
                  New
                </Badge>
              </div>
              <h3 className="text-xl font-bold mb-2">Cipher Puzzles</h3>
              <p className="text-sm opacity-80">
                Decode ancient quantum ciphers
              </p>
            </Card>
          </Link>

          {/* Hidden Passages */}
          <Link href="/adventure/passages">
            <Card className="bg-[#16213e] border-[#4cc9f0]/30 p-6 cursor-pointer hover:border-[#4cc9f0] hover:shadow-lg hover:shadow-purple-500/20 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <DoorOpen className="w-10 h-10 text-purple-400 group-hover:scale-110 transition-transform" />
                <Badge className="bg-purple-500/20 text-purple-400">
                  {playerStats.hiddenPassagesFound} Found
                </Badge>
              </div>
              <h3 className="text-xl font-bold mb-2">Hidden Passages</h3>
              <p className="text-sm opacity-80">
                Discover secret chambers
              </p>
            </Card>
          </Link>
        </div>

        {/* Bottom Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card className="bg-[#16213e] border-[#4cc9f0]/30 p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#4cc9f0]" />
              Recent Activity
            </h3>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-black/20 rounded-lg border border-[#4cc9f0]/10 hover:border-[#4cc9f0]/30 transition-colors"
                  >
                    <div className="p-2 bg-[#4cc9f0]/10 rounded">
                      <Icon className="w-4 h-4 text-[#4cc9f0]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.text}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs opacity-60">{activity.time}</span>
                        {activity.xp && (
                          <span className="text-xs text-amber-400">+{activity.xp} XP</span>
                        )}
                        {activity.wisdom && (
                          <span className="text-xs text-[#7b2cbf]">+{activity.wisdom} Wisdom</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Achievements Preview */}
          <Card className="bg-[#16213e] border-[#4cc9f0]/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                Achievements
              </h3>
              <span className="text-sm opacity-70">
                {playerStats.achievementsUnlocked}/{playerStats.totalAchievements}
              </span>
            </div>

            {/* Achievement Progress */}
            <div className="mb-4">
              <Progress 
                value={(playerStats.achievementsUnlocked / playerStats.totalAchievements) * 100} 
                className="h-3"
              />
            </div>

            {/* Recent Achievements */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#4cc9f0]/10 to-transparent rounded-lg border border-[#4cc9f0]/20">
                <div className="text-3xl">🌟</div>
                <div>
                  <div className="font-bold text-sm">First Steps into Shadow</div>
                  <div className="text-xs opacity-70">Created your first quantum key</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-black/20 rounded-lg border border-gray-700">
                <Lock className="w-8 h-8 text-gray-500" />
                <div>
                  <div className="font-bold text-sm text-gray-500">Shadow Walker</div>
                  <div className="text-xs opacity-50">Discover a hidden cipher</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-black/20 rounded-lg border border-gray-700">
                <Lock className="w-8 h-8 text-gray-500" />
                <div>
                  <div className="font-bold text-sm text-gray-500">Temporal Adept</div>
                  <div className="text-xs opacity-50">Navigate 10 temporal anomalies</div>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-4">
              View All Achievements
            </Button>
          </Card>
        </div>

        {/* Mystical Quote */}
        <Card className="bg-gradient-to-r from-[#16213e] to-[#0a0e27] border-[#4cc9f0]/30 p-8 mt-8 text-center">
          <Sparkles className="w-8 h-8 text-[#4cc9f0] mx-auto mb-4" />
          <p className="text-lg italic opacity-90 mb-2">
            "The greatest adventure is not in finding new landscapes, but in seeing with new eyes."
          </p>
          <p className="text-sm text-[#4cc9f0]/80">— Quantum Proverb</p>
        </Card>
      </div>
    </div>
  );
}
