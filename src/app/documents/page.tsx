'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { NavigationHeader } from '@/components/legal/navigation-header';
import {
  FileText,
  Wand2,
  Download,
  Eye,
  Copy,
  Search,
  Filter,
  Plus,
  Star,
  Calendar,
  CheckCircle,
  Clock,
  Edit3,
  Send
} from 'lucide-react';
import {
  DocumentTemplate,
  LegalDocument,
  FormField,
  DocumentCategory,
  DocumentType
} from '@/types/legal-platform';
import { mockDocumentTemplates, mockGeneratedDocuments } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function DocumentTools() {
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [generatedDoc, setGeneratedDoc] = useState<LegalDocument | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredTemplates = mockDocumentTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleTemplateSelect = (template: DocumentTemplate) => {
    setSelectedTemplate(template);
    setFormData({});
    setGeneratedDoc(null);

    // Initialize form data with empty values
    const initialData: Record<string, string> = {};
    template.fields.forEach(field => {
      initialData[field.id] = '';
    });
    setFormData(initialData);
  };

  const handleGenerate = async () => {
    if (!selectedTemplate) return;

    setIsGenerating(true);

    // Simulate document generation
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newDoc: LegalDocument = {
      id: `doc-${Date.now()}`,
      title: `${selectedTemplate.name} - ${formData[selectedTemplate.fields[0]?.id] || 'Untitled'}`,
      type: DocumentType.COMPLAINT,
      template: selectedTemplate.id,
      content: `Generated ${selectedTemplate.name} with provided information...`,
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
      generatedData: formData
    };

    setGeneratedDoc(newDoc);
    setIsGenerating(false);
  };

  const renderField = (field: FormField) => {
    const value = formData[field.id] || '';

    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            key={field.id}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
            rows={3}
          />
        );

      case 'select':
        return (
          <Select
            key={field.id}
            value={value}
            onValueChange={(newValue) => setFormData(prev => ({ ...prev, [field.id]: newValue }))}
          >
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder || `Select ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'date':
        return (
          <Input
            key={field.id}
            type="date"
            value={value}
            onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
          />
        );

      case 'number':
        return (
          <Input
            key={field.id}
            type="number"
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
          />
        );

      default:
        return (
          <Input
            key={field.id}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
          />
        );
    }
  };

  const getStatusColor = (status: LegalDocument['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'review':
        return 'bg-blue-100 text-blue-800';
      case 'final':
        return 'bg-green-100 text-green-800';
      case 'filed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const templateStats = {
    total: mockDocumentTemplates.length,
    filings: mockDocumentTemplates.filter(t => t.category === DocumentCategory.FILING_DOCUMENTS).length,
    correspondence: mockDocumentTemplates.filter(t => t.category === DocumentCategory.CORRESPONDENCE).length,
    requests: mockDocumentTemplates.filter(t => t.category === DocumentCategory.EVIDENCE_REQUESTS).length,
    generated: mockGeneratedDocuments.length
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />

      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-legal-blue/10 rounded-lg">
              <FileText className="h-8 w-8 text-legal-blue" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-legal-navy">
                Document Generation & Legal Tools
              </h1>
              <p className="text-muted-foreground">
                Generate professional legal documents using AI-powered templates
              </p>
            </div>
          </div>

          <Button className="bg-legal-blue hover:bg-legal-blue/90">
            <Plus className="h-4 w-4 mr-2" />
            Custom Template
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <FileText className="h-4 w-4 text-legal-blue" />
              <span className="text-xs font-medium text-muted-foreground">Total Templates</span>
            </div>
            <div className="text-2xl font-bold text-legal-navy">{templateStats.total}</div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Star className="h-4 w-4 text-legal-blue" />
              <span className="text-xs font-medium text-muted-foreground">Filing Docs</span>
            </div>
            <div className="text-2xl font-bold text-legal-navy">{templateStats.filings}</div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Send className="h-4 w-4 text-legal-blue" />
              <span className="text-xs font-medium text-muted-foreground">Correspondence</span>
            </div>
            <div className="text-2xl font-bold text-legal-navy">{templateStats.correspondence}</div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Search className="h-4 w-4 text-legal-blue" />
              <span className="text-xs font-medium text-muted-foreground">Requests</span>
            </div>
            <div className="text-2xl font-bold text-legal-navy">{templateStats.requests}</div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="h-4 w-4 text-legal-green" />
              <span className="text-xs font-medium text-muted-foreground">Generated</span>
            </div>
            <div className="text-2xl font-bold text-legal-green">{templateStats.generated}</div>
          </Card>
        </div>

        <Tabs defaultValue="templates" className="space-y-6">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
            <TabsTrigger value="templates">Template Library</TabsTrigger>
            <TabsTrigger value="generator">Document Generator</TabsTrigger>
            <TabsTrigger value="generated">Generated Documents</TabsTrigger>
          </TabsList>

          {/* Template Library Tab */}
          <TabsContent value="templates" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Browse Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search templates by name or description..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value={DocumentCategory.FILING_DOCUMENTS}>Filing Documents</SelectItem>
                      <SelectItem value={DocumentCategory.CORRESPONDENCE}>Correspondence</SelectItem>
                      <SelectItem value={DocumentCategory.EVIDENCE_REQUESTS}>Evidence Requests</SelectItem>
                      <SelectItem value={DocumentCategory.SETTLEMENT_DOCUMENTS}>Settlement Documents</SelectItem>
                      <SelectItem value={DocumentCategory.PROCEDURAL_DOCUMENTS}>Procedural Documents</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg font-semibold">
                        {template.name}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {template.category.replace('_', ' ')}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {template.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      {template.fields.length} fields required
                    </div>

                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="h-3 w-3 mr-1" />
                            Preview
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{template.name}</DialogTitle>
                            <DialogDescription>{template.description}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-2">Required Fields:</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {template.fields.map((field) => (
                                  <div key={field.id} className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                                    <span className="text-sm font-medium">{field.label}</span>
                                    {field.required && (
                                      <Badge variant="outline" className="text-xs">Required</Badge>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button
                        size="sm"
                        className="flex-1 bg-legal-blue hover:bg-legal-blue/90"
                        onClick={() => handleTemplateSelect(template)}
                      >
                        <Wand2 className="h-3 w-3 mr-1" />
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Document Generator Tab */}
          <TabsContent value="generator" className="space-y-6">
            {!selectedTemplate ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Wand2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-medium mb-2">Select a Template</h3>
                  <p className="text-muted-foreground mb-4">
                    Choose a template from the Template Library to start generating documents
                  </p>
                  <Button
                    onClick={() => document.querySelector('[value="templates"]')?.click()}
                    className="bg-legal-blue hover:bg-legal-blue/90"
                  >
                    Browse Templates
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Edit3 className="h-5 w-5" />
                      {selectedTemplate.name}
                    </CardTitle>
                    <CardDescription>
                      {selectedTemplate.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedTemplate.fields.map((field) => (
                      <div key={field.id} className="space-y-2">
                        <Label htmlFor={field.id}>
                          {field.label}
                          {field.required && <span className="text-destructive ml-1">*</span>}
                        </Label>
                        {renderField(field)}
                        {field.validation?.customMessage && (
                          <p className="text-xs text-muted-foreground">
                            {field.validation.customMessage}
                          </p>
                        )}
                      </div>
                    ))}

                    <Separator />

                    <div className="flex gap-3">
                      <Button
                        onClick={handleGenerate}
                        disabled={isGenerating || selectedTemplate.fields.some(field =>
                          field.required && !formData[field.id]
                        )}
                        className="flex-1 bg-legal-blue hover:bg-legal-blue/90"
                      >
                        {isGenerating ? (
                          <>
                            <Wand2 className="h-4 w-4 mr-2 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Wand2 className="h-4 w-4 mr-2" />
                            Generate Document
                          </>
                        )}
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedTemplate(null);
                          setFormData({});
                          setGeneratedDoc(null);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Document Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {!generatedDoc && !isGenerating && (
                      <div className="text-center py-12 text-muted-foreground">
                        <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p>Fill out the form and click "Generate Document" to see preview</p>
                      </div>
                    )}

                    {isGenerating && (
                      <div className="text-center py-12">
                        <Wand2 className="h-16 w-16 mx-auto mb-4 animate-spin text-legal-blue" />
                        <p className="font-medium">Generating your document...</p>
                        <p className="text-sm text-muted-foreground">This may take a moment</p>
                      </div>
                    )}

                    {generatedDoc && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{generatedDoc.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              Generated on {generatedDoc.createdAt.toLocaleDateString()}
                            </p>
                          </div>
                          <Badge className={getStatusColor(generatedDoc.status)}>
                            {generatedDoc.status}
                          </Badge>
                        </div>

                        <div className="p-4 bg-muted/50 rounded-lg">
                          <p className="text-sm">
                            {generatedDoc.content}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="h-3 w-3 mr-1" />
                            Full Preview
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Generated Documents Tab */}
          <TabsContent value="generated" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockGeneratedDocuments.map((doc) => (
                <Card key={doc.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-sm font-medium line-clamp-2">
                        {doc.title}
                      </CardTitle>
                      <Badge className={getStatusColor(doc.status)}>
                        {doc.status}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      Created: {doc.createdAt.toLocaleDateString()}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Updated: {doc.updatedAt.toLocaleDateString()}
                    </div>

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

            {mockGeneratedDocuments.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No Documents Generated</h3>
                  <p className="text-muted-foreground mb-4">
                    Generate your first document using our template library
                  </p>
                  <Button
                    onClick={() => document.querySelector('[value="templates"]')?.click()}
                    className="bg-legal-blue hover:bg-legal-blue/90"
                  >
                    Browse Templates
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}