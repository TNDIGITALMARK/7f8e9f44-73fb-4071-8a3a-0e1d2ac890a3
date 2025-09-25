'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Scale,
  FileText,
  ChevronDown,
  ChevronRight,
  Target,
  Shield,
  Calendar
} from 'lucide-react';
import { AIAnalysisResult, RecommendedAction, LegalViolation } from '@/types/legal-platform';
import { cn } from '@/lib/utils';

interface AIAnalysisPanelProps {
  analysis: AIAnalysisResult;
  isLoading?: boolean;
  className?: string;
}

export function AIAnalysisPanel({ analysis, isLoading = false, className }: AIAnalysisPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    findings: true,
    actions: true,
    violations: false,
    gaps: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getStrengthColor = (strength: AIAnalysisResult['legalStrength']) => {
    switch (strength) {
      case 'very-strong':
        return 'text-legal-green border-legal-green bg-legal-green/10';
      case 'strong':
        return 'text-legal-green border-legal-green bg-legal-green/10';
      case 'moderate':
        return 'text-legal-blue border-legal-blue bg-legal-blue/10';
      case 'weak':
        return 'text-legal-warning border-legal-warning bg-legal-warning/10';
      default:
        return 'text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: RecommendedAction['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'bg-destructive text-destructive-foreground';
      case 'high':
        return 'bg-legal-warning text-white';
      case 'medium':
        return 'bg-legal-blue text-white';
      case 'low':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getSeverityColor = (severity: LegalViolation['severity']) => {
    switch (severity) {
      case 'severe':
        return 'text-destructive';
      case 'major':
        return 'text-legal-warning';
      case 'moderate':
        return 'text-legal-blue';
      case 'minor':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  if (isLoading) {
    return (
      <Card className={cn('w-full', className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 animate-pulse" />
            Analyzing Your Case...
          </CardTitle>
          <CardDescription>
            Our AI is evaluating your case details and evidence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={65} className="h-2" />
            <p className="text-sm text-muted-foreground">
              Processing legal documents and analyzing strength of case...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI Case Analysis
        </CardTitle>
        <CardDescription>
          Comprehensive analysis of your case strength and recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Score & Strength */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-legal-blue" />
              <span className="text-sm font-medium">Overall Score</span>
            </div>
            <div className="text-2xl font-bold text-legal-navy">{analysis.overallScore}/100</div>
            <Progress value={analysis.overallScore} className="h-2 mt-2" />
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Scale className="h-4 w-4 text-legal-blue" />
              <span className="text-sm font-medium">Legal Strength</span>
            </div>
            <Badge
              variant="outline"
              className={cn('text-sm capitalize', getStrengthColor(analysis.legalStrength))}
            >
              {analysis.legalStrength.replace('-', ' ')}
            </Badge>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-legal-blue" />
              <span className="text-sm font-medium">Confidence</span>
            </div>
            <div className="text-2xl font-bold text-legal-navy">{analysis.confidenceLevel}%</div>
            <Progress value={analysis.confidenceLevel} className="h-2 mt-2" />
          </Card>
        </div>

        {/* Timeline Estimate */}
        <Card className="p-4 bg-legal-info/5 border-legal-info/20">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4 text-legal-info" />
            <span className="text-sm font-medium">Estimated Timeframe</span>
          </div>
          <p className="text-sm text-legal-info">{analysis.estimatedTimeframe}</p>
        </Card>

        <Separator />

        {/* Key Findings */}
        <Collapsible open={expandedSections.findings} onOpenChange={() => toggleSection('findings')}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-legal-green" />
                <span className="font-medium">Key Findings ({analysis.keyFindings.length})</span>
              </div>
              {expandedSections.findings ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="space-y-2">
              {analysis.keyFindings.map((finding, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-legal-green mt-0.5 flex-shrink-0" />
                  <span>{finding}</span>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Recommended Actions */}
        <Collapsible open={expandedSections.actions} onOpenChange={() => toggleSection('actions')}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-legal-blue" />
                <span className="font-medium">Recommended Actions ({analysis.recommendedActions.length})</span>
              </div>
              {expandedSections.actions ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="space-y-3">
              {analysis.recommendedActions.map((action) => (
                <Card key={action.id} className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{action.title}</span>
                        <Badge className={getPriorityColor(action.priority)}>
                          {action.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {action.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {action.estimatedDuration}
                        </div>
                        {action.dueDate && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Due: {action.dueDate.toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Start Task
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Potential Violations */}
        <Collapsible open={expandedSections.violations} onOpenChange={() => toggleSection('violations')}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-legal-warning" />
                <span className="font-medium">Potential Violations ({analysis.potentialViolations.length})</span>
              </div>
              {expandedSections.violations ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="space-y-3">
              {analysis.potentialViolations.map((violation, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{violation.type}</span>
                      <Badge
                        variant="outline"
                        className={getSeverityColor(violation.severity)}
                      >
                        {violation.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {violation.description}
                    </p>
                    <div className="text-xs text-muted-foreground">
                      <strong>Statute:</strong> {violation.statute}
                    </div>
                    <div className="text-xs">
                      <strong>Supporting Evidence:</strong> {violation.evidence.join(', ')}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Evidence Gaps */}
        <Collapsible open={expandedSections.gaps} onOpenChange={() => toggleSection('gaps')}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Evidence Gaps ({analysis.evidenceGaps.length})</span>
              </div>
              {expandedSections.gaps ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="space-y-2">
              {analysis.evidenceGaps.map((gap, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <AlertTriangle className="h-4 w-4 text-legal-warning mt-0.5 flex-shrink-0" />
                  <span>{gap}</span>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}