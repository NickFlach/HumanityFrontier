import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Atom, Key, BookOpen, Network } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import MainLayout from "@/layouts/MainLayout";
import { apiRequest, queryClient } from "@/lib/queryClient";
import QuantumAegis from "@/components/quantum/QuantumAegis";
import CipherVisualization from "@/components/quantum/CipherVisualization";
import { quantum } from "@/lib/animations";

// Quantum Key Management Component
function QuantumKeyManager() {
  const [userId, setUserId] = useState<number>(1); // Default to user 1 for testing

  const { data: keys = [], isLoading, refetch: refetchKeys } = useQuery({
    queryKey: ['/api/quantum/keys/user', userId],
    queryFn: async ({ queryKey }) => {
      const res = await fetch(`/api/quantum/keys/user/${userId}`, {
        credentials: "include"
      });
      if (!res.ok) {
        throw new Error("Failed to fetch keys");
      }
      return res.json();
    }
  });

  const generateNewKey = async () => {
    try {
      // Generate random quantum key data
      const entropyLevel = (0.7 + Math.random() * 0.3).toFixed(2);
      const stateOptions = [
        "|0⟩ + |1⟩", 
        "|0⟩ - |1⟩", 
        "√2/2|0⟩ + i√2/2|1⟩",
        "|ψ+⟩ = (|00⟩ + |11⟩)/√2"
      ];
      const superpositionState = stateOptions[Math.floor(Math.random() * stateOptions.length)];
      
      const keyData = {
        userId,
        keyId: `qk-${Math.random().toString(36).substring(2, 9)}`,
        entropyLevel: entropyLevel, // Send as string to match schema
        superpositionState
      };
      
      const response = await apiRequest(
        "POST",
        "/api/quantum/keys",
        keyData
      );
      
      const data = await response.json();
      
      toast({
        title: "Quantum Key Generated",
        description: `New key created with ID: ${data?.keyId || 'unknown'}`,
      });
      
      // Refetch keys
      refetchKeys();
      
    } catch (error) {
      console.error("Error generating quantum key:", error);
      toast({
        title: "Error",
        description: "Failed to generate quantum key",
        variant: "destructive"
      });
    }
  };

  const revokeKey = async (keyId: string) => {
    try {
      await apiRequest(
        "PUT",
        `/api/quantum/keys/${keyId}/revoke`
      );
      
      toast({
        title: "Quantum Key Revoked",
        description: `Key ${keyId} has been revoked`,
      });
      
      // Refetch keys
      refetchKeys();
      
    } catch (error) {
      console.error("Error revoking quantum key:", error);
      toast({
        title: "Error",
        description: "Failed to revoke quantum key",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Quantum Key Management</h2>
        <Button onClick={generateNewKey} size="sm" className="bg-[#4cc9f0] hover:bg-[#4cc9f0]/80">
          <Key className="mr-2 h-4 w-4" />
          Generate New Key
        </Button>
      </div>
      
      {isLoading ? (
        <div className="min-h-[200px] flex items-center justify-center">
          <div className="animate-spin relative w-20 h-20">
            <QuantumAegis size={80} animated />
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {keys && keys.length > 0 ? (
            keys.map((key: any) => (
              <Card key={key.keyId} className="bg-[#16213e] border-[#4cc9f0]/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <Key className="mr-2 h-4 w-4 text-[#4cc9f0]" />
                    {key.keyId}
                  </CardTitle>
                  <CardDescription className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${key.isRevoked ? 'bg-red-500' : 'bg-green-500'}`}></div>
                    {key.isRevoked ? 'Revoked' : 'Active'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="block text-[#4cc9f0]/80">Entropy Level:</span>
                      <span className="font-mono">{key.entropyLevel}</span>
                    </div>
                    <div>
                      <span className="block text-[#4cc9f0]/80">Created:</span>
                      <span>{new Date(key.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="block text-[#4cc9f0]/80">Superposition State:</span>
                      <span className="font-mono">{key.superpositionState}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    {!key.isRevoked && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-400 border-red-400/30 hover:bg-red-500/10 hover:text-red-400"
                        onClick={() => revokeKey(key.keyId)}
                      >
                        Revoke Key
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="col-span-2 bg-[#16213e] border-[#4cc9f0]/30">
              <CardContent className="pt-6 text-center">
                <p>No quantum keys found. Generate your first key to get started.</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

// Quantum Ledger Component
function QuantumLedger() {
  const [selectedKeyId, setSelectedKeyId] = useState<string | null>(null);
  
  const { data: keys = [], isLoading: keysLoading } = useQuery({
    queryKey: ['/api/quantum/keys/user/1'],
    queryFn: async ({ queryKey }) => {
      const res = await fetch(queryKey[0] as string, {
        credentials: "include"
      });
      if (!res.ok) {
        throw new Error("Failed to fetch keys");
      }
      return res.json();
    }
  });

  const { data: ledgerEntries = [], isLoading: ledgerLoading, refetch: refetchLedger } = useQuery({
    queryKey: ['/api/quantum/ledger/key', selectedKeyId],
    queryFn: async ({ queryKey }) => {
      if (!selectedKeyId) return [];
      const res = await fetch(`/api/quantum/ledger/key/${selectedKeyId}`, {
        credentials: "include"
      });
      if (!res.ok) {
        throw new Error("Failed to fetch ledger entries");
      }
      return res.json();
    },
    enabled: !!selectedKeyId
  });

  const recordOperation = async () => {
    if (!selectedKeyId) {
      toast({
        title: "Error",
        description: "Please select a key first",
        variant: "destructive"
      });
      return;
    }

    try {
      const operationTypes = ["encrypt", "decrypt", "sign", "verify"];
      const operationType = operationTypes[Math.floor(Math.random() * operationTypes.length)];
      
      const ledgerData = {
        keyId: selectedKeyId,
        transactionId: `tx-${Math.random().toString(36).substring(2, 9)}`,
        operationType,
        timestampVector: { t: Date.now(), vector: [Math.random(), Math.random(), Math.random()] },
        entanglementHash: `eh-${Math.random().toString(36).substring(2, 15)}`,
        metadata: { status: "success", complexity: Math.floor(Math.random() * 10) + 1 }
      };
      
      await apiRequest(
        "POST",
        "/api/quantum/ledger",
        ledgerData
      );
      
      toast({
        title: "Operation Recorded",
        description: `New ${operationType} operation recorded in the quantum ledger`,
      });
      
      // Refetch ledger entries
      refetchLedger();
      
    } catch (error) {
      console.error("Error recording quantum operation:", error);
      toast({
        title: "Error",
        description: "Failed to record quantum operation",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <h2 className="text-lg font-medium">Quantum Ledger</h2>
        
        <div className="flex flex-col md:flex-row gap-4">
          <select 
            className="bg-[#16213e] border border-[#4cc9f0]/30 rounded-md p-2 text-sm"
            value={selectedKeyId || ""}
            onChange={(e) => setSelectedKeyId(e.target.value || null)}
          >
            <option value="">Select a key</option>
            {keys && keys.map((key: any) => (
              <option key={key.keyId} value={key.keyId} disabled={key.isRevoked}>
                {key.keyId} {key.isRevoked && "(Revoked)"}
              </option>
            ))}
          </select>
          
          <Button
            onClick={recordOperation}
            disabled={!selectedKeyId}
            size="sm" 
            className="bg-[#7b2cbf] hover:bg-[#7b2cbf]/80"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Record Operation
          </Button>
        </div>
      </div>
      
      {selectedKeyId ? (
        ledgerLoading ? (
          <div className="min-h-[200px] flex items-center justify-center">
            <div className="animate-spin relative w-20 h-20">
              <QuantumAegis size={80} animated />
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <CipherVisualization input={selectedKeyId} />
            </div>
            
            {ledgerEntries && ledgerEntries.length > 0 ? (
              <div className="space-y-4 relative z-10">
                {ledgerEntries.map((entry: any) => (
                  <Card key={entry.transactionId} className="bg-[#16213e]/70 backdrop-blur-sm border-[#4cc9f0]/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        <span className="font-mono text-xs text-[#4cc9f0]">{entry.transactionId}</span>
                      </CardTitle>
                      <CardDescription className="flex justify-between">
                        <span className="capitalize">{entry.operationType} Operation</span>
                        <span>{new Date(entry.createdAt).toLocaleTimeString()}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="block text-[#4cc9f0]/80">Entanglement Hash:</span>
                          <span className="font-mono text-xs truncate">{entry.entanglementHash}</span>
                        </div>
                        <div>
                          <span className="block text-[#4cc9f0]/80">Complexity:</span>
                          <span>{entry.metadata?.complexity || "N/A"}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-[#16213e]/70 backdrop-blur-sm border-[#4cc9f0]/20">
                <CardContent className="pt-6 text-center">
                  <p>No ledger entries found for this key. Record an operation to get started.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )
      ) : (
        <Card className="bg-[#16213e] border-[#4cc9f0]/30">
          <CardContent className="pt-6 text-center">
            <p>Select a quantum key to view its ledger entries.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Quantum Entanglement Component
function QuantumEntanglement() {
  const [sourceKeyId, setSourceKeyId] = useState<string | null>(null);
  const [targetKeyId, setTargetKeyId] = useState<string | null>(null);
  
  const { data: keys = [], isLoading: keysLoading } = useQuery({
    queryKey: ['/api/quantum/keys/user/1'],
    queryFn: async ({ queryKey }) => {
      const res = await fetch(queryKey[0] as string, {
        credentials: "include"
      });
      if (!res.ok) {
        throw new Error("Failed to fetch keys");
      }
      return res.json();
    }
  });

  const { data: entanglements = [], isLoading: entanglementsLoading, refetch: refetchEntanglements } = useQuery({
    queryKey: ['/api/quantum/entanglements/key', sourceKeyId],
    queryFn: async ({ queryKey }) => {
      if (!sourceKeyId) return [];
      const res = await fetch(`/api/quantum/entanglements/key/${sourceKeyId}`, {
        credentials: "include"
      });
      if (!res.ok) {
        throw new Error("Failed to fetch entanglements");
      }
      return res.json();
    },
    enabled: !!sourceKeyId
  });

  const createEntanglement = async () => {
    if (!sourceKeyId || !targetKeyId) {
      toast({
        title: "Error",
        description: "Please select both source and target keys",
        variant: "destructive"
      });
      return;
    }

    if (sourceKeyId === targetKeyId) {
      toast({
        title: "Error",
        description: "Source and target keys must be different",
        variant: "destructive"
      });
      return;
    }

    try {
      const entanglementTypes = ["direct", "indirect", "temporal"];
      const entanglementType = entanglementTypes[Math.floor(Math.random() * entanglementTypes.length)];
      
      const entanglementStrength = (0.7 + Math.random() * 0.3).toFixed(2); // Already a string due to toFixed
      
      const entanglementData = {
        sourceKeyId,
        targetKeyId,
        entanglementType,
        entanglementStrength,
        stateVector: { 
          coefficients: [
            Math.random().toFixed(2), 
            Math.random().toFixed(2),
            Math.random().toFixed(2), 
            Math.random().toFixed(2)
          ],
          phases: [0, Math.PI/2, Math.PI, 3*Math.PI/2]
        },
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // Expires in 7 days
      };
      
      await apiRequest(
        "POST",
        "/api/quantum/entanglements",
        entanglementData
      );
      
      toast({
        title: "Quantum Entanglement Created",
        description: `Keys ${sourceKeyId} and ${targetKeyId} are now entangled`,
      });
      
      // Refetch entanglements
      refetchEntanglements();
      
    } catch (error) {
      console.error("Error creating quantum entanglement:", error);
      toast({
        title: "Error",
        description: "Failed to create quantum entanglement",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <h2 className="text-lg font-medium">Quantum Entanglement Network</h2>
        
        <div className="flex flex-col md:flex-row gap-4">
          <select 
            className="bg-[#16213e] border border-[#4cc9f0]/30 rounded-md p-2 text-sm"
            value={sourceKeyId || ""}
            onChange={(e) => setSourceKeyId(e.target.value || null)}
          >
            <option value="">Select source key</option>
            {keys && keys.filter((k: any) => !k.isRevoked).map((key: any) => (
              <option key={key.keyId} value={key.keyId}>
                {key.keyId}
              </option>
            ))}
          </select>
          
          <select 
            className="bg-[#16213e] border border-[#4cc9f0]/30 rounded-md p-2 text-sm"
            value={targetKeyId || ""}
            onChange={(e) => setTargetKeyId(e.target.value || null)}
            disabled={!sourceKeyId}
          >
            <option value="">Select target key</option>
            {keys && keys
              .filter((k: any) => !k.isRevoked && k.keyId !== sourceKeyId)
              .map((key: any) => (
                <option key={key.keyId} value={key.keyId}>
                  {key.keyId}
                </option>
              ))
            }
          </select>
          
          <Button
            onClick={createEntanglement}
            disabled={!sourceKeyId || !targetKeyId || sourceKeyId === targetKeyId}
            size="sm" 
            className="bg-[#7b2cbf] hover:bg-[#7b2cbf]/80"
          >
            <Network className="mr-2 h-4 w-4" />
            Create Entanglement
          </Button>
        </div>
      </div>
      
      {sourceKeyId ? (
        entanglementsLoading ? (
          <div className="min-h-[200px] flex items-center justify-center">
            <div className="animate-spin relative w-20 h-20">
              <QuantumAegis size={80} animated />
            </div>
          </div>
        ) : (
          <div className="bg-[#16213e] p-4 rounded-lg border border-[#4cc9f0]/30 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <CipherVisualization input={sourceKeyId} />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-lg font-medium mb-4">Entanglements for Key: {sourceKeyId}</h3>
              
              {entanglements && entanglements.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {entanglements.map((entanglement: any) => {
                    const isSource = entanglement.sourceKeyId === sourceKeyId;
                    const connectedKeyId = isSource ? entanglement.targetKeyId : entanglement.sourceKeyId;
                    
                    return (
                      <Card key={entanglement.id} className="bg-[#16213e]/70 backdrop-blur-sm border-[#4cc9f0]/20">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex justify-between">
                            <span className="capitalize text-[#4cc9f0]">{entanglement.entanglementType} Entanglement</span>
                            <span className="text-sm font-medium">
                              Strength: {entanglement.entanglementStrength}
                            </span>
                          </CardTitle>
                          <CardDescription>
                            {isSource ? "Entangled to:" : "Entangled from:"} <span className="font-mono">{connectedKeyId}</span>
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <div>
                            <span className="block text-[#4cc9f0]/80">Expiration:</span>
                            <span>{entanglement.expiresAt 
                              ? new Date(entanglement.expiresAt).toLocaleDateString()
                              : "Never"}</span>
                          </div>
                          
                          <div className="mt-2">
                            <span className="block text-[#4cc9f0]/80">State Vector:</span>
                            <div className="font-mono text-xs mt-1 bg-[#0d1521] p-2 rounded overflow-x-auto">
                              {JSON.stringify(entanglement.stateVector).substring(0, 100)}
                              {JSON.stringify(entanglement.stateVector).length > 100 ? '...' : ''}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p>No entanglements found for this key.</p>
                  <p className="text-sm text-[#4cc9f0]/60 mt-2">
                    Create an entanglement to connect your quantum keys.
                  </p>
                </div>
              )}
            </div>
          </div>
        )
      ) : (
        <Card className="bg-[#16213e] border-[#4cc9f0]/30">
          <CardContent className="pt-6 text-center">
            <p>Select a source quantum key to view and manage its entanglements.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function QuantumDashboard() {
  return (
    <div className="container py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6 md:items-center mb-8">
        <div className="relative w-24 h-24 flex-shrink-0 mx-auto md:mx-0">
          <QuantumAegis size={96} animated />
        </div>
        
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4cc9f0] to-[#7b2cbf] inline-block">
            Quantum Aegis Database
          </h1>
          <p className="text-[#4cc9f0]/80 mt-2 max-w-3xl">
            Manage your quantum cryptographic assets, track quantum operations, and visualize quantum entanglements.
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="keys" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="keys" className="data-[state=active]:bg-[#16213e] data-[state=active]:text-[#4cc9f0]">
            <Key className="mr-2 h-4 w-4" />
            Quantum Keys
          </TabsTrigger>
          <TabsTrigger value="ledger" className="data-[state=active]:bg-[#16213e] data-[state=active]:text-[#4cc9f0]">
            <BookOpen className="mr-2 h-4 w-4" />
            Quantum Ledger
          </TabsTrigger>
          <TabsTrigger value="entanglement" className="data-[state=active]:bg-[#16213e] data-[state=active]:text-[#4cc9f0]">
            <Network className="mr-2 h-4 w-4" />
            Entanglement
          </TabsTrigger>
        </TabsList>
        
        <div className="bg-[#0c1120]/50 p-6 rounded-lg shadow-lg backdrop-blur-sm border border-[#4cc9f0]/10">
          <TabsContent value="keys" className="mt-0">
            <QuantumKeyManager />
          </TabsContent>
          
          <TabsContent value="ledger" className="mt-0">
            <QuantumLedger />
          </TabsContent>
          
          <TabsContent value="entanglement" className="mt-0">
            <QuantumEntanglement />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}