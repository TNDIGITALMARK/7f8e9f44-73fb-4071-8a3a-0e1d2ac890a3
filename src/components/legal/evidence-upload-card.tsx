'use client';

import { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText, Image, Video, Mic, X, Check } from 'lucide-react';
import { Evidence, EvidenceType, EvidenceCategory } from '@/types/legal-platform';
import { cn } from '@/lib/utils';

interface EvidenceUploadCardProps {
  onEvidenceUpload?: (evidence: Omit<Evidence, 'id' | 'uploadedAt'>) => void;
  className?: string;
}

export function EvidenceUploadCard({ onEvidenceUpload, className }: EvidenceUploadCardProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [evidenceData, setEvidenceData] = useState({
    title: '',
    description: '',
    type: '' as EvidenceType,
    category: '' as EvidenceCategory,
    tags: '',
    notes: ''
  });

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleFileUpload = useCallback(async (file: File) => {
    setIsUploading(true);
    setUploadedFile(file);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setUploadProgress(i);
    }

    // Auto-detect evidence type based on file type
    let detectedType: EvidenceType = EvidenceType.DOCUMENT;
    if (file.type.startsWith('image/')) {
      detectedType = EvidenceType.PHOTO;
    } else if (file.type.startsWith('video/')) {
      detectedType = EvidenceType.VIDEO;
    } else if (file.type.startsWith('audio/')) {
      detectedType = EvidenceType.AUDIO;
    }

    setEvidenceData(prev => ({
      ...prev,
      type: detectedType,
      title: prev.title || file.name.split('.')[0]
    }));

    setIsUploading(false);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!uploadedFile || !evidenceData.title || !evidenceData.description) return;

    const evidence: Omit<Evidence, 'id' | 'uploadedAt'> = {
      title: evidenceData.title,
      description: evidenceData.description,
      type: evidenceData.type,
      category: evidenceData.category,
      file: uploadedFile,
      tags: evidenceData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      notes: evidenceData.notes || undefined
    };

    onEvidenceUpload?.(evidence);

    // Reset form
    setEvidenceData({
      title: '',
      description: '',
      type: '' as EvidenceType,
      category: '' as EvidenceCategory,
      tags: '',
      notes: ''
    });
    setUploadedFile(null);
    setUploadProgress(0);
  }, [uploadedFile, evidenceData, onEvidenceUpload]);

  const getFileIcon = (type: EvidenceType) => {
    switch (type) {
      case EvidenceType.PHOTO:
        return <Image className="h-5 w-5" />;
      case EvidenceType.VIDEO:
        return <Video className="h-5 w-5" />;
      case EvidenceType.AUDIO:
        return <Mic className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const clearFile = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    setEvidenceData(prev => ({ ...prev, title: '', type: '' as EvidenceType }));
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Evidence
        </CardTitle>
        <CardDescription>
          Upload documents, photos, videos, or other evidence related to your case
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* File Upload Area */}
        {!uploadedFile && (
          <div
            className={cn(
              'border-2 border-dashed rounded-lg p-6 text-center transition-colors',
              isDragOver
                ? 'border-legal-blue bg-legal-blue/10'
                : 'border-border hover:border-legal-blue/50'
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-sm font-medium mb-2">
              Drag and drop your files here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Supports: PDF, DOC, JPG, PNG, MP4, MP3 (Max 50MB)
            </p>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4,.mp3,.wav"
              onChange={handleFileSelect}
            />
            <Button asChild variant="outline" size="sm">
              <label htmlFor="file-upload" className="cursor-pointer">
                Choose Files
              </label>
            </Button>
          </div>
        )}

        {/* Upload Progress */}
        {isUploading && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="text-sm font-medium">{uploadedFile?.name}</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
            <p className="text-xs text-muted-foreground">Uploading... {uploadProgress}%</p>
          </div>
        )}

        {/* Uploaded File Display */}
        {uploadedFile && !isUploading && (
          <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center gap-3">
              {getFileIcon(evidenceData.type)}
              <div>
                <p className="text-sm font-medium">{uploadedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-success border-success">
                <Check className="h-3 w-3 mr-1" />
                Uploaded
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFile}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Evidence Details Form */}
        {uploadedFile && !isUploading && (
          <div className="space-y-4 border-t pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="evidence-title">Evidence Title *</Label>
                <Input
                  id="evidence-title"
                  placeholder="Brief descriptive title"
                  value={evidenceData.title}
                  onChange={(e) => setEvidenceData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="evidence-type">Evidence Type *</Label>
                <Select
                  value={evidenceData.type}
                  onValueChange={(value) => setEvidenceData(prev => ({ ...prev, type: value as EvidenceType }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={EvidenceType.DOCUMENT}>Document</SelectItem>
                    <SelectItem value={EvidenceType.PHOTO}>Photo</SelectItem>
                    <SelectItem value={EvidenceType.VIDEO}>Video</SelectItem>
                    <SelectItem value={EvidenceType.AUDIO}>Audio</SelectItem>
                    <SelectItem value={EvidenceType.EMAIL}>Email</SelectItem>
                    <SelectItem value={EvidenceType.TEXT_MESSAGE}>Text Message</SelectItem>
                    <SelectItem value={EvidenceType.WITNESS_STATEMENT}>Witness Statement</SelectItem>
                    <SelectItem value={EvidenceType.OFFICIAL_RECORD}>Official Record</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="evidence-category">Category *</Label>
              <Select
                value={evidenceData.category}
                onValueChange={(value) => setEvidenceData(prev => ({ ...prev, category: value as EvidenceCategory }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={EvidenceCategory.INCIDENT_DOCUMENTATION}>Incident Documentation</SelectItem>
                  <SelectItem value={EvidenceCategory.COMMUNICATION_RECORDS}>Communication Records</SelectItem>
                  <SelectItem value={EvidenceCategory.WITNESS_TESTIMONY}>Witness Testimony</SelectItem>
                  <SelectItem value={EvidenceCategory.EXPERT_ANALYSIS}>Expert Analysis</SelectItem>
                  <SelectItem value={EvidenceCategory.OFFICIAL_DOCUMENTS}>Official Documents</SelectItem>
                  <SelectItem value={EvidenceCategory.MEDICAL_RECORDS}>Medical Records</SelectItem>
                  <SelectItem value={EvidenceCategory.FINANCIAL_RECORDS}>Financial Records</SelectItem>
                  <SelectItem value={EvidenceCategory.OTHER}>Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="evidence-description">Description *</Label>
              <Textarea
                id="evidence-description"
                placeholder="Detailed description of the evidence and its relevance to your case"
                value={evidenceData.description}
                onChange={(e) => setEvidenceData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="evidence-tags">Tags (comma-separated)</Label>
                <Input
                  id="evidence-tags"
                  placeholder="discrimination, email, supervisor"
                  value={evidenceData.tags}
                  onChange={(e) => setEvidenceData(prev => ({ ...prev, tags: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="evidence-notes">Additional Notes</Label>
                <Input
                  id="evidence-notes"
                  placeholder="Optional notes or context"
                  value={evidenceData.notes}
                  onChange={(e) => setEvidenceData(prev => ({ ...prev, notes: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleSubmit}
                disabled={!evidenceData.title || !evidenceData.description || !evidenceData.type || !evidenceData.category}
                className="bg-legal-blue hover:bg-legal-blue/90"
              >
                Add Evidence
              </Button>
              <Button variant="outline" onClick={clearFile}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}