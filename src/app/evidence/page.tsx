'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EvidenceUploadCard } from '@/components/legal/evidence-upload-card';
import { CaseTimelineComponent } from '@/components/legal/case-timeline';
import { ProgressDashboard } from '@/components/legal/progress-dashboard';
import { NavigationHeader } from '@/components/legal/navigation-header';
import {
  FolderOpen,
  Search,
  Filter,
  FileText,
  Image,
  Video,
  Mic,
  Eye,
  Download,
  Star,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Plus
} from 'lucide-react';
import { Evidence, CaseProgress, CasePhase, EvidenceType, EvidenceCategory } from '@/types/legal-platform';
import { mockEvidence, mockTimeline } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function EvidenceDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [evidence, setEvidence] = useState<Evidence[]>(mockEvidence);

  // Mock progress data
  const mockProgress: CaseProgress = {
    caseId: 'case-1',
    completedTasks: 8,
    totalTasks: 12,
    currentPhase: CasePhase.EVIDENCE_COLLECTION,
    nextMilestone: 'Complete evidence gathering',
    estimatedCompletion: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000) // 45 days from now
  };

  const filteredEvidence = evidence.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;

    return matchesSearch && matchesType && matchesCategory;
  });

  const getEvidenceIcon = (type: EvidenceType) => {
    switch (type) {
      case EvidenceType.PHOTO:
        return <Image className="h-4 w-4" />;
      case EvidenceType.VIDEO:
        return <Video className="h-4 w-4" />;
      case EvidenceType.AUDIO:
        return <Mic className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getEvidenceTypeColor = (type: EvidenceType) => {
    switch (type) {
      case EvidenceType.PHOTO:
        return 'bg-green-100 text-green-800';
      case EvidenceType.VIDEO:
        return 'bg-purple-100 text-purple-800';
      case EvidenceType.AUDIO:
        return 'bg-yellow-100 text-yellow-800';
      case EvidenceType.EMAIL:
        return 'bg-blue-100 text-blue-800';
      case EvidenceType.WITNESS_STATEMENT:
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRelevanceColor = (score?: number) => {
    if (!score) return 'text-muted-foreground';
    if (score >= 90) return 'text-legal-green';
    if (score >= 75) return 'text-legal-blue';
    if (score >= 60) return 'text-legal-warning';
    return 'text-muted-foreground';
  };

  const handleEvidenceUpload = (newEvidence: Omit<Evidence, 'id' | 'uploadedAt'>) => {
    const evidence: Evidence = {
      ...newEvidence,
      id: `evidence-${Date.now()}`,
      uploadedAt: new Date()
    };
    setEvidence(prev => [evidence, ...prev]);
  };

  const evidenceStats = {
    total: evidence.length,
    photos: evidence.filter(e => e.type === EvidenceType.PHOTO).length,
    documents: evidence.filter(e => e.type === EvidenceType.DOCUMENT).length,
    videos: evidence.filter(e => e.type === EvidenceType.VIDEO).length,
    highRelevance: evidence.filter(e => (e.relevanceScore || 0) >= 80).length
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />

      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-legal-blue/10 rounded-lg">
              <FolderOpen className="h-8 w-8 text-legal-blue" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-legal-navy">
                Evidence & Case Management
              </h1>
              <p className="text-muted-foreground">
                Organize evidence, track progress, and manage your case timeline
              </p>
            </div>
          </div>

          <Button className="bg-legal-blue hover:bg-legal-blue/90">
            <Plus className="h-4 w-4 mr-2" />
            New Case
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <FolderOpen className="h-4 w-4 text-legal-blue" />
              <span className="text-xs font-medium text-muted-foreground">Total Evidence</span>
            </div>
            <div className="text-2xl font-bold text-legal-navy">{evidenceStats.total}</div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <FileText className="h-4 w-4 text-legal-blue" />
              <span className="text-xs font-medium text-muted-foreground">Documents</span>
            </div>
            <div className="text-2xl font-bold text-legal-navy">{evidenceStats.documents}</div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Image className="h-4 w-4 text-legal-blue" />
              <span className="text-xs font-medium text-muted-foreground">Photos</span>
            </div>
            <div className="text-2xl font-bold text-legal-navy">{evidenceStats.photos}</div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Video className="h-4 w-4 text-legal-blue" />
              <span className="text-xs font-medium text-muted-foreground">Videos</span>
            </div>
            <div className="text-2xl font-bold text-legal-navy">{evidenceStats.videos}</div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Star className="h-4 w-4 text-legal-green" />
              <span className="text-xs font-medium text-muted-foreground">High Relevance</span>
            </div>
            <div className="text-2xl font-bold text-legal-green">{evidenceStats.highRelevance}</div>
          </Card>
        </div>

        <Tabs defaultValue="evidence" className="space-y-6">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
            <TabsTrigger value="evidence">Evidence Library</TabsTrigger>
            <TabsTrigger value="upload">Upload Evidence</TabsTrigger>
            <TabsTrigger value="timeline">Case Timeline</TabsTrigger>
            <TabsTrigger value="progress">Progress Dashboard</TabsTrigger>
          </TabsList>

          {/* Evidence Library Tab */}
          <TabsContent value="evidence" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Search & Filter Evidence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search evidence by title, description, or tags..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value={EvidenceType.DOCUMENT}>Documents</SelectItem>
                      <SelectItem value={EvidenceType.PHOTO}>Photos</SelectItem>
                      <SelectItem value={EvidenceType.VIDEO}>Videos</SelectItem>
                      <SelectItem value={EvidenceType.AUDIO}>Audio</SelectItem>
                      <SelectItem value={EvidenceType.EMAIL}>Email</SelectItem>
                      <SelectItem value={EvidenceType.WITNESS_STATEMENT}>Witness Statements</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value={EvidenceCategory.INCIDENT_DOCUMENTATION}>Incident Documentation</SelectItem>
                      <SelectItem value={EvidenceCategory.COMMUNICATION_RECORDS}>Communication Records</SelectItem>
                      <SelectItem value={EvidenceCategory.WITNESS_TESTIMONY}>Witness Testimony</SelectItem>
                      <SelectItem value={EvidenceCategory.OFFICIAL_DOCUMENTS}>Official Documents</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Evidence Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEvidence.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        {getEvidenceIcon(item.type)}
                        <CardTitle className="text-sm font-medium truncate">
                          {item.title}
                        </CardTitle>
                      </div>
                      {item.relevanceScore && (
                        <Badge
                          variant="outline"
                          className={cn('text-xs', getRelevanceColor(item.relevanceScore))}
                        >
                          {item.relevanceScore}%
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Badge
                        variant="secondary"
                        className={getEvidenceTypeColor(item.type)}
                      >
                        {item.type.replace('-', ' ')}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {item.uploadedAt.toLocaleDateString()}
                    </div>

                    {item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {item.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{item.tags.length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}

                    {item.notes && (
                      <div className="p-2 bg-muted/50 rounded text-xs">
                        <strong>Notes:</strong> {item.notes}
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredEvidence.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <FolderOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No Evidence Found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery || filterType !== 'all' || filterCategory !== 'all'
                      ? 'Try adjusting your search criteria or filters'
                      : 'Upload your first piece of evidence to get started'
                    }
                  </p>
                  {!searchQuery && filterType === 'all' && filterCategory === 'all' && (
                    <Button onClick={() => {}} className="bg-legal-blue hover:bg-legal-blue/90">
                      Upload Evidence
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Upload Evidence Tab */}
          <TabsContent value="upload">
            <EvidenceUploadCard onEvidenceUpload={handleEvidenceUpload} />
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline">
            <CaseTimelineComponent timeline={mockTimeline} />
          </TabsContent>

          {/* Progress Dashboard Tab */}
          <TabsContent value="progress">
            <ProgressDashboard progress={mockProgress} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}