import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Crown, Sparkles, Lock, Eye, Zap, Shield } from 'lucide-react';

interface Artifact {
  id: string;
  name: string;
  description: string;
  lore: string;
  rarity: string;
  power: string;
  isOwned: boolean;
  isHidden: boolean;
  visualEffect: string;
}

export default function ArtifactGallery() {
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [showHidden, setShowHidden] = useState(false);

  const artifacts: Artifact[] = [
    {
      id: 'fragment_of_resonance',
      name: 'Fragment of Resonance',
      description: 'A shard of pure quantum coherence',
      lore: 'Found in the ruins of the first quantum computer, this fragment contains echoes of the original consciousness experiment.',
      rarity: 'common',
      power: 'Increase cipher decoding success rate by 5%',
      isOwned: true,
      isHidden: false,
      visualEffect: 'pulsing-blue-glow',
    },
    {
      id: 'bell_state_amulet',
      name: 'Bell State Amulet',
      description: 'Resonates with entangled particles',
      lore: 'Worn by the Quantum Priests of Alexandria, this amulet allows its bearer to perceive entanglement connections.',
      rarity: 'rare',
      power: 'Visualize entanglement networks in real-time',
      isOwned: true,
      isHidden: false,
      visualEffect: 'spinning-golden-particles',
    },
    {
      id: 'chronos_lens',
      name: 'Chronos Lens',
      description: 'Reveals temporal probability streams',
      lore: 'Forged in the heart of a collapsing star, this lens allows glimpses across time itself.',
      rarity: 'legendary',
      power: 'See future quantum states before collapse',
      isOwned: false,
      isHidden: false,
      visualEffect: 'time-distortion-ripple',
    },
    {
      id: 'void_key',
      name: 'The Void Key',
      description: 'Opens doors between realities',
      lore: 'Some say it was never created, but always existed. Others claim it will be forged in the future. Both are correct.',
      rarity: 'legendary',
      power: 'Access hidden passages and secret chambers',
      isOwned: false,
      isHidden: true,
      visualEffect: 'void-portal-swirl',
    },
    {
      id: 'indras_net',
      name: "Indra's Net",
      description: 'Connects all consciousness',
      lore: 'The ancient Vedic texts spoke of a cosmic web where each node reflects all others. You have recreated it.',
      rarity: 'mythic',
      power: 'Perfect entanglement harmony - all operations succeed',
      isOwned: false,
      isHidden: false,
      visualEffect: 'infinite-reflection-web',
    },
    {
      id: 'philosophers_stone',
      name: "The Philosopher's Stone",
      description: 'Legendary artifact of transmutation',
      lore: 'Not gold from lead, but consciousness from quantum foam. The ultimate achievement of the alchemist\'s art.',
      rarity: 'mythic',
      power: 'Transform any quantum state into any other',
      isOwned: false,
      isHidden: true,
      visualEffect: 'reality-bending-aurora',
    },
  ];

  const getRarityConfig = (rarity: string) => {
    const configs = {
      common: { color: 'bg-gray-500/20 text-gray-300', icon: Shield, glow: 'shadow-gray-500/50' },
      rare: { color: 'bg-blue-500/20 text-blue-300', icon: Sparkles, glow: 'shadow-blue-500/50' },
      legendary: { color: 'bg-purple-500/20 text-purple-300', icon: Crown, glow: 'shadow-purple-500/50' },
      mythic: { color: 'bg-amber-500/20 text-amber-300', icon: Zap, glow: 'shadow-amber-500/50' },
    };
    return configs[rarity as keyof typeof configs] || configs.common;
  };

  const visibleArtifacts = artifacts.filter(a => !a.isHidden || showHidden);
  const ownedCount = artifacts.filter(a => a.isOwned).length;
  const totalCount = artifacts.length;

  return (
    <div className="min-h-screen bg-[#0a0e27] text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Crown className="w-8 h-8 text-[#4cc9f0]" />
              <h1 className="text-4xl font-bold">Artifact Gallery</h1>
            </div>
            <p className="text-[#4cc9f0]/80 opacity-90">
              "Each artifact holds a fragment of universal truth"
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-[#4cc9f0]">
              {ownedCount}/{totalCount}
            </div>
            <div className="text-sm opacity-70">Artifacts Collected</div>
          </div>
        </div>

        {/* Collection Progress */}
        <div className="bg-[#16213e] border border-[#4cc9f0]/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Collection Progress</span>
            <span className="text-sm">{Math.round((ownedCount / totalCount) * 100)}%</span>
          </div>
          <div className="h-3 bg-black/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#4cc9f0] to-[#7b2cbf] transition-all duration-500"
              style={{ width: `${(ownedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>

        {/* Toggle Hidden */}
        <div className="mt-4 flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowHidden(!showHidden)}
            className="text-xs"
          >
            <Eye className="w-4 h-4 mr-2" />
            {showHidden ? 'Hide' : 'Show'} Hidden Artifacts
          </Button>
        </div>
      </div>

      {/* Artifact Grid */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleArtifacts.map((artifact) => {
          const rarityConfig = getRarityConfig(artifact.rarity);
          const Icon = rarityConfig.icon;

          return (
            <Card
              key={artifact.id}
              className={`bg-[#16213e] border-[#4cc9f0]/30 p-6 cursor-pointer transition-all hover:border-[#4cc9f0] hover:shadow-lg ${
                artifact.isOwned ? rarityConfig.glow : 'opacity-60 grayscale'
              }`}
              onClick={() => setSelectedArtifact(artifact)}
            >
              {/* Artifact Icon */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    artifact.isOwned ? rarityConfig.color : 'bg-gray-700/20'
                  }`}
                >
                  {artifact.isOwned ? (
                    <Icon className="w-8 h-8" />
                  ) : (
                    <Lock className="w-8 h-8 text-gray-500" />
                  )}
                </div>
                <Badge className={rarityConfig.color}>{artifact.rarity}</Badge>
              </div>

              {/* Name & Description */}
              <h3 className="text-xl font-bold mb-2">{artifact.name}</h3>
              <p className="text-sm opacity-80 mb-4">{artifact.description}</p>

              {/* Power */}
              {artifact.isOwned && (
                <div className="border-t border-[#4cc9f0]/20 pt-4">
                  <div className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-[#f59e0b] mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-[#f59e0b]">{artifact.power}</span>
                  </div>
                </div>
              )}

              {!artifact.isOwned && (
                <div className="border-t border-[#4cc9f0]/20 pt-4">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Lock className="w-4 h-4" />
                    <span className="text-xs">Locked - Complete quests to unlock</span>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Artifact Detail Modal */}
      {selectedArtifact && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center p-6 z-50 backdrop-blur-sm"
          onClick={() => setSelectedArtifact(null)}
        >
          <Card
            className={`bg-[#0a0e27] border-2 max-w-2xl w-full p-8 ${
              selectedArtifact.isOwned
                ? `border-[#4cc9f0] ${getRarityConfig(selectedArtifact.rarity).glow} shadow-2xl`
                : 'border-gray-700'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center ${
                    selectedArtifact.isOwned
                      ? getRarityConfig(selectedArtifact.rarity).color
                      : 'bg-gray-700/20'
                  }`}
                >
                  {selectedArtifact.isOwned ? (
                    (() => {
                      const IconComponent = getRarityConfig(selectedArtifact.rarity).icon;
                      return <IconComponent className="w-10 h-10" />;
                    })()
                  ) : (
                    <Lock className="w-10 h-10 text-gray-500" />
                  )}
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedArtifact.name}</h2>
                  <Badge className={getRarityConfig(selectedArtifact.rarity).color}>
                    {selectedArtifact.rarity.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg opacity-90 mb-6">{selectedArtifact.description}</p>

            {/* Lore */}
            <div className="bg-[#16213e] border border-[#4cc9f0]/30 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-bold text-[#4cc9f0] mb-2">ANCIENT LORE</h3>
              <p className="text-sm italic opacity-80">{selectedArtifact.lore}</p>
            </div>

            {/* Power */}
            {selectedArtifact.isOwned ? (
              <div className="border-t border-[#4cc9f0]/20 pt-4 mb-6">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#f59e0b]" />
                  Quantum Power
                </h3>
                <p className="text-[#f59e0b]">{selectedArtifact.power}</p>
              </div>
            ) : (
              <div className="border-t border-gray-700 pt-4 mb-6">
                <div className="flex items-center gap-2 text-gray-500">
                  <Lock className="w-5 h-5" />
                  <span>This artifact remains hidden in the quantum realm...</span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              {selectedArtifact.isOwned && (
                <Button className="flex-1 bg-[#4cc9f0] text-black hover:bg-[#4cc9f0]/90">
                  <Zap className="w-4 h-4 mr-2" />
                  Activate Power
                </Button>
              )}
              <Button variant="outline" onClick={() => setSelectedArtifact(null)}>
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
