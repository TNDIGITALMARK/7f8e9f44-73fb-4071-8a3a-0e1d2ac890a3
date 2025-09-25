'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { AIAnalysisPanel } from '@/components/legal/ai-analysis-panel';
import { NavigationHeader } from '@/components/legal/navigation-header';
import { Brain, Scale, Users, FileText, Clock, TrendingUp } from 'lucide-react';
import { CaseType, CaseAssessment, AIAnalysisResult } from '@/types/legal-platform';
import { mockAIAnalysis } from '@/lib/mock-data';

export const dynamic = 'force-dynamic';

export default function CaseAssessmentHub() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    caseType: '',
    urgencyLevel: 'medium',
    incidentDate: '',
    location: '',
    parties: '',
    damages: ''
  });

  const handleAnalyze = async () => {
    console.log('Analyze button clicked');
    if (!formData.title || !formData.description || !formData.caseType) {
      console.log('Missing required fields:', { title: !!formData.title, description: !!formData.description, caseType: !!formData.caseType });
      return;
    }

    console.log('Starting analysis...');
    setIsAnalyzing(true);

    try {
      // Simulate AI analysis delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      setAnalysis(mockAIAnalysis);
      console.log('Analysis completed successfully');
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetForm = () => {
    console.log('Reset button clicked');
    setFormData({
      title: '',
      description: '',
      caseType: '',
      urgencyLevel: 'medium',
      incidentDate: '',
      location: '',
      parties: '',
      damages: ''
    });
    setAnalysis(null);
    setIsAnalyzing(false);
    console.log('Form reset successfully');
  };

  const stats = [
    {
      title: 'Cases Analyzed',
      value: '1,247',
      icon: Scale,
      color: 'text-legal-blue'
    },
    {
      title: 'Success Rate',
      value: '87%',
      icon: TrendingUp,
      color: 'text-legal-green'
    },
    {
      title: 'Avg. Processing',
      value: '2.5 min',
      icon: Clock,
      color: 'text-legal-warning'
    },
    {
      title: 'Users Helped',
      value: '892',
      icon: Users,
      color: 'text-legal-blue'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />

      <div className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-legal-blue/10 rounded-lg">
              <Brain className="h-8 w-8 text-legal-blue" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-legal-navy">
                AI Case Assessment Hub
              </h1>
              <p className="text-lg text-muted-foreground">
                Get instant analysis and actionable guidance for your civil rights case
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                    <span className="text-xs font-medium text-muted-foreground">
                      {stat.title}
                    </span>
                  </div>
                  <div className={`text-xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Input Form */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Case Details
              </CardTitle>
              <CardDescription>
                Provide details about your case for AI-powered analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="case-title">Case Title *</Label>
                  <Input
                    id="case-title"
                    placeholder="Brief title describing your case"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="case-type">Case Type *</Label>
                    <Select
                      name="caseType"
                      value={formData.caseType}
                      onValueChange={(value) => {
                        console.log('Case type selected:', value);
                        setFormData(prev => ({ ...prev, caseType: value }));
                      }}
                    >
                      <SelectTrigger
                        id="case-type"
                        className="cursor-pointer"
                        onClick={(e) => {
                          console.log('Select trigger clicked', e);
                          e.stopPropagation();
                        }}
                        onPointerDown={(e) => {
                          console.log('Select trigger pointer down', e);
                        }}
                      >
                        <SelectValue placeholder="Select case type" />
                      </SelectTrigger>
                      <SelectContent position="popper" sideOffset={5}>
                        <SelectItem value={CaseType.EMPLOYMENT_DISCRIMINATION}>
                          Employment Discrimination
                        </SelectItem>
                        <SelectItem value={CaseType.HOUSING_DISCRIMINATION}>
                          Housing Discrimination
                        </SelectItem>
                        <SelectItem value={CaseType.POLICE_MISCONDUCT}>
                          Police Misconduct
                        </SelectItem>
                        <SelectItem value={CaseType.VOTING_RIGHTS}>
                          Voting Rights
                        </SelectItem>
                        <SelectItem value={CaseType.EDUCATION_DISCRIMINATION}>
                          Education Discrimination
                        </SelectItem>
                        <SelectItem value={CaseType.DISABILITY_RIGHTS}>
                          Disability Rights
                        </SelectItem>
                        <SelectItem value={CaseType.LGBTQ_RIGHTS}>
                          LGBTQ+ Rights
                        </SelectItem>
                        <SelectItem value={CaseType.RELIGIOUS_DISCRIMINATION}>
                          Religious Discrimination
                        </SelectItem>
                        <SelectItem value={CaseType.OTHER}>
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="urgency">Urgency Level</Label>
                    <Select
                      value={formData.urgencyLevel}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, urgencyLevel: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - No immediate deadline</SelectItem>
                        <SelectItem value="medium">Medium - Some time pressure</SelectItem>
                        <SelectItem value="high">High - Urgent action needed</SelectItem>
                        <SelectItem value="critical">Critical - Immediate attention</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what happened, when it occurred, and who was involved. Include as much detail as possible to help our AI provide accurate analysis."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                  />
                </div>
              </div>

              <Separator />

              {/* Additional Details */}
              <div className="space-y-4">
                <h4 className="font-medium">Additional Information (Optional)</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="incident-date">Incident Date</Label>
                    <Input
                      id="incident-date"
                      type="date"
                      value={formData.incidentDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, incidentDate: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="City, State"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parties">Other Parties Involved</Label>
                  <Input
                    id="parties"
                    placeholder="Names of organizations, individuals, or entities involved"
                    value={formData.parties}
                    onChange={(e) => setFormData(prev => ({ ...prev, parties: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="damages">Damages or Harm Suffered</Label>
                  <Textarea
                    id="damages"
                    placeholder="Describe any financial, emotional, or other damages you have experienced"
                    value={formData.damages}
                    onChange={(e) => setFormData(prev => ({ ...prev, damages: e.target.value }))}
                    rows={3}
                  />
                </div>
              </div>

              <Separator />

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAnalyze();
                  }}
                  disabled={!formData.title || !formData.description || !formData.caseType || isAnalyzing}
                  className="flex-1 bg-legal-blue hover:bg-legal-blue/90 cursor-pointer"
                >
                  {isAnalyzing ? (
                    <>
                      <Brain className="h-4 w-4 mr-2 animate-pulse" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Analyze Case
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    resetForm();
                  }}
                  className="cursor-pointer"
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Right Side - AI Analysis */}
          <div className="space-y-6">
            {!analysis && !isAnalyzing && (
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    AI Analysis
                  </CardTitle>
                  <CardDescription>
                    Real-time case strength assessment and recommendations will appear here
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <Brain className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Enter your case details and click "Analyze Case" to get started</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {(isAnalyzing || analysis) && (
              <AIAnalysisPanel
                analysis={analysis || {} as AIAnalysisResult}
                isLoading={isAnalyzing}
              />
            )}

            {analysis && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-legal-green">Next Steps</CardTitle>
                  <CardDescription>
                    Based on your AI analysis results
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-legal-blue hover:bg-legal-blue/90">
                    <FileText className="h-4 w-4 mr-2" />
                    Upload Supporting Evidence
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Scale className="h-4 w-4 mr-2" />
                    Generate Legal Documents
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Schedule Legal Consultation
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}