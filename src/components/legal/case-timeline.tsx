'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  GitBranch,
  AlertTriangle,
  FileText,
  MessageSquare,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  Circle
} from 'lucide-react';
import { CaseTimeline, TimelineEvent } from '@/types/legal-platform';
import { cn } from '@/lib/utils';

interface CaseTimelineProps {
  timeline: CaseTimeline;
  className?: string;
}

export function CaseTimelineComponent({ timeline, className }: CaseTimelineProps) {
  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'incident':
        return <AlertTriangle className="h-4 w-4" />;
      case 'filing':
        return <FileText className="h-4 w-4" />;
      case 'response':
        return <MessageSquare className="h-4 w-4" />;
      case 'deadline':
        return <Clock className="h-4 w-4" />;
      case 'meeting':
        return <Users className="h-4 w-4" />;
      default:
        return <Circle className="h-4 w-4" />;
    }
  };

  const getEventColor = (type: TimelineEvent['type'], importance: TimelineEvent['importance']) => {
    if (type === 'deadline') {
      return 'text-legal-warning bg-legal-warning/10 border-legal-warning/20';
    }

    switch (importance) {
      case 'high':
        return 'text-legal-navy bg-legal-navy/10 border-legal-navy/20';
      case 'medium':
        return 'text-legal-blue bg-legal-blue/10 border-legal-blue/20';
      case 'low':
        return 'text-muted-foreground bg-muted/10 border-border';
      default:
        return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getImportanceColor = (importance: TimelineEvent['importance']) => {
    switch (importance) {
      case 'high':
        return 'bg-legal-navy text-white';
      case 'medium':
        return 'bg-legal-blue text-white';
      case 'low':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const isUpcoming = (date: Date) => {
    return date > new Date();
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(date.getTime() - now.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (isUpcoming(date)) {
      if (diffDays <= 7) {
        return `In ${diffDays} day${diffDays !== 1 ? 's' : ''}`;
      }
      return `${date.toLocaleDateString()} (Upcoming)`;
    } else {
      if (diffDays <= 30) {
        return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
      }
      return date.toLocaleDateString();
    }
  };

  const sortedEvents = [...timeline.events].sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitBranch className="h-5 w-5" />
          Case Timeline
        </CardTitle>
        <CardDescription>
          Chronological overview of case events and important milestones
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-6">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

          {sortedEvents.map((event, index) => (
            <div key={event.id} className="relative flex gap-4">
              {/* Timeline Dot */}
              <div
                className={cn(
                  'relative flex h-12 w-12 items-center justify-center rounded-full border-2 bg-background',
                  getEventColor(event.type, event.importance)
                )}
              >
                {isUpcoming(event.date) ? (
                  <Circle className="h-4 w-4" />
                ) : (
                  getEventIcon(event.type)
                )}

                {isUpcoming(event.date) && event.type === 'deadline' && (
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-legal-warning rounded-full animate-pulse" />
                )}
              </div>

              {/* Event Content */}
              <div className="flex-1 min-w-0 pb-8">
                <Card className="p-4">
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1 flex-1">
                        <h4 className="font-medium text-sm">{event.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(event.date)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getImportanceColor(event.importance)}>
                          {event.importance}
                        </Badge>
                        {isUpcoming(event.date) && (
                          <Badge variant="outline" className="text-legal-info border-legal-info">
                            Upcoming
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground">
                      {event.description}
                    </p>

                    {/* Documents */}
                    {event.documents && event.documents.length > 0 && (
                      <div className="space-y-2">
                        <Separator />
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-2">
                            Related Documents:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {event.documents.map((docId) => (
                              <Button
                                key={docId}
                                variant="outline"
                                size="sm"
                                className="h-7 text-xs"
                              >
                                <FileText className="h-3 w-3 mr-1" />
                                {docId}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions for upcoming deadlines */}
                    {isUpcoming(event.date) && event.type === 'deadline' && (
                      <div className="space-y-2">
                        <Separator />
                        <div className="flex gap-2">
                          <Button size="sm" variant="default" className="bg-legal-blue hover:bg-legal-blue/90">
                            Take Action
                          </Button>
                          <Button size="sm" variant="outline">
                            Set Reminder
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          ))}

          {/* Add Event Button */}
          <div className="relative flex gap-4">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-muted-foreground bg-background">
              <Circle className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Add Timeline Event
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}