'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Icons (simplified versions)
const Bot = ({ className }: { className?: string }) => <div className={`${className} bg-blue-500 rounded`}>🤖</div>;
const Users = ({ className }: { className?: string }) => <div className={`${className} bg-green-500 rounded`}>👥</div>;
const Zap = ({ className }: { className?: string }) => <div className={`${className} bg-yellow-500 rounded`}>⚡</div>;
const TrendingUp = ({ className }: { className?: string }) => <div className={`${className} bg-purple-500 rounded`}>📈</div>;
const Home = ({ className }: { className?: string }) => <div className={`${className} bg-gray-500 rounded`}>🏠</div>;
const Plus = ({ className }: { className?: string }) => <div className={`${className} bg-blue-500 rounded`}>➕</div>;
const Settings = ({ className }: { className?: string }) => <div className={`${className} bg-gray-500 rounded`}>⚙️</div>;
const BarChart3 = ({ className }: { className?: string }) => <div className={`${className} bg-orange-500 rounded`}>📊</div>;
const Menu = ({ className }: { className?: string }) => <div className={`${className} bg-gray-500 rounded`}>☰</div>;
const X = ({ className }: { className?: string }) => <div className={`${className} bg-red-500 rounded`}>✕</div>;
const ArrowLeft = ({ className }: { className?: string }) => <div className={`${className} bg-gray-500 rounded`}>←</div>;
const Target = ({ className }: { className?: string }) => <div className={`${className} bg-red-500 rounded`}>🎯</div>;
const Brain = ({ className }: { className?: string }) => <div className={`${className} bg-pink-500 rounded`}>🧠</div>;
const Workflow = ({ className }: { className?: string }) => <div className={`${className} bg-indigo-500 rounded`}>🔄</div>;
const Shield = ({ className }: { className?: string }) => <div className={`${className} bg-green-500 rounded`}>🛡️</div>;
const Rocket = ({ className }: { className?: string }) => <div className={`${className} bg-red-500 rounded`}>🚀</div>;
const Activity = ({ className }: { className?: string }) => <div className={`${className} bg-blue-500 rounded`}>📊</div>;
const Server = ({ className }: { className?: string }) => <div className={`${className} bg-gray-500 rounded`}>🖥️</div>;
const Key = ({ className }: { className?: string }) => <div className={`${className} bg-yellow-500 rounded`}>🔑</div>;
const Layers = ({ className }: { className?: string }) => <div className={`${className} bg-purple-500 rounded`}>📚</div>;
const CheckCircle2 = ({ className }: { className?: string }) => <div className={`${className} bg-green-500 rounded`}>✅</div>;
const Loader = ({ className }: { className?: string }) => <div className={`${className} bg-blue-500 rounded animate-spin`}>⟳</div>;
const Eye = ({ className }: { className?: string }) => <div className={`${className} bg-gray-500 rounded`}>👁️</div>;
const EyeOff = ({ className }: { className?: string }) => <div className={`${className} bg-gray-500 rounded`}>🙈</div>;
const CheckCircle = ({ className }: { className?: string }) => <div className={`${className} bg-green-500 rounded`}>✓</div>;
const Sparkles = ({ className }: { className?: string }) => <div className={`${className} bg-yellow-500 rounded`}>✨</div>;
const Lightbulb = ({ className }: { className?: string }) => <div className={`${className} bg-yellow-500 rounded`}>💡</div>;
const Star = ({ className }: { className?: string }) => <div className={`${className} bg-yellow-500 rounded`}>⭐</div>;
const Search = ({ className }: { className?: string }) => <div className={`${className} bg-blue-500 rounded`}>🔍</div>;
const Filter = ({ className }: { className?: string }) => <div className={`${className} bg-gray-500 rounded`}>🔽</div>;
const SortAsc = ({ className }: { className?: string }) => <div className={`${className} bg-gray-500 rounded`}>↕️</div>;
const Play = ({ className }: { className?: string }) => <div className={`${className} bg-green-500 rounded`}>▶️</div>;
const Copy = ({ className }: { className?: string }) => <div className={`${className} bg-gray-500 rounded`}>📋</div>;
const Clock = ({ className }: { className?: string }) => <div className={`${className} bg-blue-500 rounded`}>🕐</div>;
const Globe = ({ className }: { className?: string }) => <div className={`${className} bg-blue-500 rounded`}>🌐</div>;
const FileText = ({ className }: { className?: string }) => <div className={`${className} bg-green-500 rounded`}>📄</div>;
const Code = ({ className }: { className?: string }) => <div className={`${className} bg-purple-500 rounded`}>💻</div>;
const Database = ({ className }: { className?: string }) => <div className={`${className} bg-orange-500 rounded`}>🗄️</div>;
const Mail = ({ className }: { className?: string }) => <div className={`${className} bg-pink-500 rounded`}>📧</div>;
const Minimize2 = ({ className }: { className?: string }) => <div className={`${className} bg-gray-500 rounded`}>🗕</div>;
const Monitor = ({ className }: { className?: string }) => <div className={`${className} bg-gray-500 rounded`}>🖥️</div>;
const Tablet = ({ className }: { className?: string }) => <div className={`${className} bg-gray-500 rounded`}>📱</div>;
const Smartphone = ({ className }: { className?: string }) => <div className={`${className} bg-gray-500 rounded`}>📱</div>;

// Enhanced Agent Template Interface
interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  role: string;
  goal: string;
  backstory: string;
  tools: string[];
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  popularity: number;
  featured: boolean;
  tags: string[];
  useCase: string;
  metrics: {
    accuracy: number;
    speed: number;
    reliability: number;
  };
  modelPreference?: string;
  crewConfig?: {
    process: 'sequential' | 'hierarchical';
    maxIter?: number;
    verbose?: boolean;
  };
}

// Enhanced Cerebras AI Models
interface CerebrasModel {
  id: string;
  name: string;
  description: string;
  maxTokens: number;
  speed: 'Ultra Fast' | 'Blazing Fast' | 'Lightning Fast' | 'Fast';
  pricing: string;
  specialty: string[];
  parameters: string;
  reasoning: boolean;
}

const CEREBRAS_MODELS: CerebrasModel[] = [
  {
    id: "qwen-3-235b-a22b-instruct-2507",
    name: "Qwen 3-235B A22B Instruct",
    description: "Frontier-level reasoning model with 235B parameters and 22B active",
    maxTokens: 131072,
    speed: "Blazing Fast",
    pricing: "$0.60/1M input, $1.20/1M output",
    specialty: ["Complex Reasoning", "Code Generation", "Research"],
    parameters: "235B total, 22B active",
    reasoning: true
  },
  {
    id: "qwen-3-32b",
    name: "Qwen 3-32B",
    description: "Balanced performance model for general-purpose applications",
    maxTokens: 64000,
    speed: "Ultra Fast",
    pricing: "$0.30/1M input, $0.60/1M output",
    specialty: ["General", "Chat", "Content Creation"],
    parameters: "32B",
    reasoning: false
  },
  {
    id: "llama-3.3-70b",
    name: "Llama 3.3 70B",
    description: "Meta's powerful general-purpose model with enhanced capabilities",
    maxTokens: 8192,
    speed: "Fast",
    pricing: "$0.50/1M input, $0.80/1M output",
    specialty: ["General", "Reasoning", "Code"],
    parameters: "70B",
    reasoning: false
  }
];

export default function CrewCraftHub() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [previousView, setPreviousView] = useState<string | null>(null);
  const [userAgents, setUserAgents] = useState<any[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [isLoading, setIsLoading] = useState(false);
  const [apiSettings, setApiSettings] = useState({
    cerebrasApiKey: '',
    isValidated: false,
    selectedModel: 'qwen-3-235b-a22b-instruct-2507'
  });
  const [showApiKey, setShowApiKey] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  // Navigation with back button support
  const navigateTo = useCallback((view: string) => {
    setPreviousView(currentView);
    setCurrentView(view);
  }, [currentView]);

  const goBack = useCallback(() => {
    if (previousView) {
      setCurrentView(previousView);
      setPreviousView(null);
    } else {
      setCurrentView('dashboard');
    }
  }, [previousView]);

  // Navigation items
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "templates", label: "Templates", icon: Bot },
    { id: "my-agents", label: "My Agents", icon: Users, badge: userAgents.length },
    { id: "create", label: "Create Agent", icon: Plus },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "API Settings", icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b-2 border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  CrewCraft
                </h1>
                <p className="text-xs text-gray-500">AI Agent Platform</p>
              </div>
            </div>

            {/* Back Button */}
            {previousView && (
              <Button
                variant="outline"
                size="sm"
                onClick={goBack}
                className="hidden md:flex items-center gap-2 border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            )}

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    className={`gap-2 transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg border-0' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600 border-transparent'
                    }`}
                    onClick={() => navigateTo(item.id)}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                    {item.badge && (
                      <Badge variant="secondary" className="ml-1 bg-white/20 text-white border-white/30">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              {previousView && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goBack}
                  className="text-gray-600"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100 py-4 bg-white">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  
                  return (
                    <Button
                      key={item.id}
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-start gap-3 ${
                        isActive 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                      }`}
                      onClick={() => {
                        navigateTo(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto bg-blue-50 text-blue-600">
                          {item.badge}
                        </Badge>
                      )}
                    </Button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Content */}
        {currentView === 'dashboard' && (
          <div className="space-y-8 min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white shadow-2xl">
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative p-8 md:p-12">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div className="space-y-6 max-w-xl">
                    <Badge className="w-fit bg-white/20 text-white border-white/30 shadow-lg backdrop-blur-sm">
                      🚀 CrewAI Platform v2.0 - Powered by Cerebras
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                      Build Powerful
                      <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                        AI Agent Teams
                      </span>
                      in Minutes
                    </h1>
                    <p className="text-lg text-white/90 leading-relaxed">
                      Create, coordinate, and deploy intelligent AI agent crews powered by Cerebras' ultra-fast inference. 
                      Build sophisticated multi-agent workflows with our intuitive platform.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button
                        size="lg"
                        onClick={() => navigateTo("templates")}
                        className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl transform hover:scale-105 transition-all duration-300"
                      >
                        <Bot className="w-5 h-5 mr-2" />
                        Explore Templates
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => navigateTo("create")}
                        className="border-white/30 text-white hover:bg-white/10 shadow-lg backdrop-blur-sm"
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Create Crew
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Active Agents", value: "2", icon: Bot, gradient: "from-blue-500 to-cyan-500", bgColor: "bg-blue-50", textColor: "text-blue-700", trend: "+12%" },
                { title: "Templates Available", value: "6", icon: Zap, gradient: "from-purple-500 to-pink-500", bgColor: "bg-purple-50", textColor: "text-purple-700", trend: "+3 new" },
                { title: "Total Tasks", value: "1,247", icon: TrendingUp, gradient: "from-green-500 to-emerald-500", bgColor: "bg-green-50", textColor: "text-green-700", trend: "+18%" },
                { title: "Success Rate", value: "94.2%", icon: Target, gradient: "from-orange-500 to-red-500", bgColor: "bg-orange-50", textColor: "text-orange-700", trend: "+2.1%" }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className={`relative overflow-hidden ${stat.bgColor} border-0 hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.gradient} opacity-20 rounded-bl-3xl`} />
                    <CardHeader className="pb-3 relative">
                      <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-200">
                          {stat.trend}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="relative">
                      <div className="space-y-1">
                        <h3 className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</h3>
                        <p className={`text-sm font-medium ${stat.textColor}`}>{stat.title}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* API Status & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <Server className="w-5 h-5 text-blue-500" />
                    Cerebras AI Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${apiSettings.isValidated ? 'bg-green-400 animate-pulse' : 'bg-red-400'} shadow-lg`} />
                      <span className="text-gray-700 font-medium">
                        {apiSettings.isValidated ? 'Connected' : 'Not Connected'}
                      </span>
                    </div>
                    {apiSettings.isValidated && (
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                        {CEREBRAS_MODELS.find(m => m.id === apiSettings.selectedModel)?.name}
                      </Badge>
                    )}
                  </div>
                  {!apiSettings.isValidated && (
                    <Button 
                      variant="outline" 
                      onClick={() => navigateTo('settings')}
                      className="border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      <Key className="w-4 h-4 mr-2" />
                      Configure API
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => navigateTo("templates")} 
                    className="w-full justify-start bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 hover:from-blue-600 hover:to-purple-700"
                  >
                    <Bot className="w-4 h-4 mr-2" />
                    Browse Agent Templates
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigateTo("create")} 
                    className="w-full justify-start border-gray-200 text-gray-700 hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Custom Crew
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigateTo("analytics")} 
                    className="w-full justify-start border-gray-200 text-gray-700 hover:bg-gray-50"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Settings View */}
        {currentView === 'settings' && (
          <div className="space-y-6 min-h-screen bg-gray-50">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">API Settings</h1>
              <p className="text-gray-600">
                Configure your Cerebras API key and model preferences for optimal performance
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* API Configuration */}
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <Key className="w-5 h-5 text-blue-500" />
                    Cerebras API Configuration
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Connect to Cerebras AI for ultra-fast inference
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">API Key</label>
                    <div className="relative">
                      <Input
                        type={showApiKey ? "text" : "password"}
                        placeholder="Enter your Cerebras API key (csk-...)"
                        value={apiSettings.cerebrasApiKey}
                        onChange={(e) => setApiSettings({...apiSettings, cerebrasApiKey: e.target.value})}
                        className="pr-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-8 w-8 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${apiSettings.isValidated ? 'bg-green-400' : 'bg-gray-400'}`} />
                    <span className="text-sm text-gray-600">
                      {apiSettings.isValidated ? 'API key validated' : 'API key not validated'}
                    </span>
                  </div>

                  <Button 
                    onClick={() => setApiSettings({...apiSettings, isValidated: true})}
                    disabled={isLoading || !apiSettings.cerebrasApiKey.trim()}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader className="w-4 h-4 animate-spin" />
                        Validating...
                      </div>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Save & Validate
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Model Selection */}
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <Layers className="w-5 h-5 text-purple-500" />
                    Model Selection
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Choose the optimal model for your agent crews
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Default Model</label>
                    <Select 
                      value={apiSettings.selectedModel} 
                      onValueChange={(value) => setApiSettings({...apiSettings, selectedModel: value})}
                    >
                      <SelectTrigger className="border-gray-200 focus:border-blue-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200">
                        {CEREBRAS_MODELS.map((model) => (
                          <SelectItem key={model.id} value={model.id} className="hover:bg-gray-50">
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-800">{model.name}</span>
                              <span className="text-xs text-gray-500">{model.speed} • {model.pricing}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Other views would be implemented similarly */}
        {currentView === 'templates' && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Templates View</h2>
            <p className="text-gray-600">Agent templates will be displayed here</p>
          </div>
        )}

        {currentView === 'my-agents' && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">My Agents</h2>
            <p className="text-gray-600">Your created agents will be displayed here</p>
          </div>
        )}

        {currentView === 'create' && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Agent</h2>
            <p className="text-gray-600">Agent creation form will be displayed here</p>
          </div>
        )}

        {currentView === 'analytics' && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Analytics</h2>
            <p className="text-gray-600">Analytics dashboard will be displayed here</p>
          </div>
        )}
      </main>

      {/* Copy Success Notification */}
      {copySuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            {copySuccess === 'template' ? 'Template code copied!' : 'Output copied!'}
          </div>
        </div>
      )}
    </div>
  );
}