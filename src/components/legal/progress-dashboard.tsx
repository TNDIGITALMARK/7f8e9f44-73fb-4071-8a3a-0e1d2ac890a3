'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BarChart,
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
  Calendar,
  FileText,
  AlertTriangle
} from 'lucide-react';
import { CaseProgress, CasePhase } from '@/types/legal-platform';
import { cn } from '@/lib/utils';

interface ProgressDashboardProps {
  progress: CaseProgress;
  className?: string;
}

export function ProgressDashboard({ progress, className }: ProgressDashboardProps) {
  const getPhaseColor = (phase: CasePhase, isCurrent: boolean = false) => {
    const baseColors = {
      [CasePhase.INTAKE]: 'bg-slate-500',
      [CasePhase.INVESTIGATION]: 'bg-blue-500',
      [CasePhase.EVIDENCE_COLLECTION]: 'bg-yellow-500',
      [CasePhase.LEGAL_RESEARCH]: 'bg-purple-500',
      [CasePhase.FILING_PREPARATION]: 'bg-orange-500',
      [CasePhase.ACTIVE_LITIGATION]: 'bg-red-500',
      [CasePhase.SETTLEMENT_NEGOTIATION]: 'bg-green-500',
      [CasePhase.RESOLUTION]: 'bg-emerald-600'
    };

    return isCurrent ? baseColors[phase] : 'bg-muted';
  };

  const getPhaseLabel = (phase: CasePhase) => {
    switch (phase) {
      case CasePhase.INTAKE:
        return 'Intake';
      case CasePhase.INVESTIGATION:
        return 'Investigation';
      case CasePhase.EVIDENCE_COLLECTION:
        return 'Evidence Collection';
      case CasePhase.LEGAL_RESEARCH:
        return 'Legal Research';
      case CasePhase.FILING_PREPARATION:
        return 'Filing Preparation';
      case CasePhase.ACTIVE_LITIGATION:
        return 'Active Litigation';
      case CasePhase.SETTLEMENT_NEGOTIATION:
        return 'Settlement Negotiation';
      case CasePhase.RESOLUTION:
        return 'Resolution';
      default:
        return phase;
    }
  };

  const completionPercentage = Math.round((progress.completedTasks / progress.totalTasks) * 100);

  const phases = Object.values(CasePhase);
  const currentPhaseIndex = phases.indexOf(progress.currentPhase);

  const getDaysUntilCompletion = () => {
    const now = new Date();
    const diffTime = progress.estimatedCompletion.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysUntil = getDaysUntilCompletion();

  return (
    <div className={cn('space-y-6', className)}>
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-legal-blue" />
            <span className="text-sm font-medium">Overall Progress</span>
          </div>
          <div className="text-2xl font-bold text-legal-navy mb-2">
            {completionPercentage}%
          </div>
          <Progress value={completionPercentage} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1">
            {progress.completedTasks} of {progress.totalTasks} tasks complete
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-legal-blue" />
            <span className="text-sm font-medium">Time Remaining</span>
          </div>
          <div className="text-2xl font-bold text-legal-navy">
            {daysUntil > 0 ? `${daysUntil}d` : 'Overdue'}
          </div>
          <p className="text-xs text-muted-foreground">
            Est. completion: {progress.estimatedCompletion.toLocaleDateString()}
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart className="h-4 w-4 text-legal-blue" />
            <span className="text-sm font-medium">Current Phase</span>
          </div>
          <Badge className="bg-legal-blue text-white">
            {getPhaseLabel(progress.currentPhase)}
          </Badge>
          <p className="text-xs text-muted-foreground mt-2">
            Phase {currentPhaseIndex + 1} of {phases.length}
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-legal-blue" />
            <span className="text-sm font-medium">Next Milestone</span>
          </div>
          <p className="text-sm font-medium text-legal-navy">
            {progress.nextMilestone}
          </p>
        </Card>
      </div>

      {/* Phase Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            Case Phase Progress
          </CardTitle>
          <CardDescription>
            Track your progress through each phase of your case
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {phases.map((phase, index) => {
              const isCompleted = index < currentPhaseIndex;
              const isCurrent = index === currentPhaseIndex;
              const isUpcoming = index > currentPhaseIndex;

              return (
                <div key={phase} className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-2">
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5 text-legal-green" />
                    ) : isCurrent ? (
                      <Clock className="h-4 w-4 text-legal-blue" />
                    ) : (
                      <div className="w-3 h-3 rounded-full bg-muted" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={cn(
                        'font-medium',
                        isCompleted && 'text-legal-green',
                        isCurrent && 'text-legal-blue',
                        isUpcoming && 'text-muted-foreground'
                      )}>
                        {getPhaseLabel(phase)}
                      </span>
                      {isCompleted && (
                        <Badge variant="outline" className="text-legal-green border-legal-green">
                          Complete
                        </Badge>
                      )}
                      {isCurrent && (
                        <Badge className="bg-legal-blue text-white">
                          Current
                        </Badge>
                      )}
                    </div>
                    {isCurrent && (
                      <div className="mt-2">
                        <Progress value={completionPercentage} className="h-2" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            Latest updates and completed tasks in your case
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-legal-green/5 border border-legal-green/20 rounded-lg">
              <CheckCircle className="h-4 w-4 text-legal-green mt-1" />
              <div className="flex-1">
                <p className="text-sm font-medium">Evidence uploaded successfully</p>
                <p className="text-xs text-muted-foreground">
                  Discriminatory email chain - 2 hours ago
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-legal-blue/5 border border-legal-blue/20 rounded-lg">
              <Clock className="h-4 w-4 text-legal-blue mt-1" />
              <div className="flex-1">
                <p className="text-sm font-medium">AI analysis completed</p>
                <p className="text-xs text-muted-foreground">
                  Case strength assessment updated - 5 hours ago
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-legal-warning/5 border border-legal-warning/20 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-legal-warning mt-1" />
              <div className="flex-1">
                <p className="text-sm font-medium">Action required</p>
                <p className="text-xs text-muted-foreground">
                  EEOC filing deadline in 14 days
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <Button variant="outline" className="w-full">
              View All Activity
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Common tasks for your current case phase
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button variant="outline" className="justify-start">
              <FileText className="h-4 w-4 mr-2" />
              Upload Evidence
            </Button>
            <Button variant="outline" className="justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Consultation
            </Button>
            <Button variant="outline" className="justify-start">
              <Target className="h-4 w-4 mr-2" />
              Update Case Details
            </Button>
            <Button variant="outline" className="justify-start">
              <TrendingUp className="h-4 w-4 mr-2" />
              Request Analysis
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}