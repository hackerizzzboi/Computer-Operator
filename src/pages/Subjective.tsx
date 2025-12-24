import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Save, Trash2, Plus, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useUserData } from '@/contexts/UserDataContext';
import { useToast } from '@/hooks/use-toast';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const samplePrompts = [
  'Explain the role of a Computer Operator in government offices.',
  'What are the key responsibilities under the Good Governance Act?',
  'Describe the importance of data backup and security.',
  'Explain the structure of local government in Nepal.',
  'What is e-governance and its benefits?',
];

export default function SubjectivePage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { user } = useAuth();
  const { stats, updateStats } = useUserData();
  const { toast } = useToast();

  const storageKey = `loksewa_notes_${user?.id}`;

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        setNotes(JSON.parse(stored));
      } catch {
        setNotes([]);
      }
    }
  }, [storageKey]);

  const saveNotes = (updatedNotes: Note[]) => {
    setNotes(updatedNotes);
    localStorage.setItem(storageKey, JSON.stringify(updatedNotes));
  };

  const handleNewNote = () => {
    setActiveNote(null);
    setTitle('');
    setContent('');
  };

  const handleSelectNote = (note: Note) => {
    setActiveNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: 'Missing content',
        description: 'Please add both title and content.',
        variant: 'destructive',
      });
      return;
    }

    const now = new Date().toISOString();

    if (activeNote) {
      const updated = notes.map((n) =>
        n.id === activeNote.id
          ? { ...n, title, content, updatedAt: now }
          : n
      );
      saveNotes(updated);
      setActiveNote({ ...activeNote, title, content, updatedAt: now });
    } else {
      const newNote: Note = {
        id: Date.now().toString(),
        title,
        content,
        createdAt: now,
        updatedAt: now,
      };
      saveNotes([newNote, ...notes]);
      setActiveNote(newNote);
      updateStats({ subjectiveAnswers: stats.subjectiveAnswers + 1 });
    }

    toast({
      title: 'Saved!',
      description: 'Your note has been saved successfully.',
    });
  };

  const handleDelete = () => {
    if (!activeNote) return;
    
    const updated = notes.filter((n) => n.id !== activeNote.id);
    saveNotes(updated);
    handleNewNote();
    
    toast({
      title: 'Deleted',
      description: 'Note has been removed.',
    });
  };

  const handlePromptClick = (prompt: string) => {
    setTitle(prompt);
    setContent('');
    setActiveNote(null);
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-xl bg-purple-500/10">
            <FileText className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Subjective Notes</h1>
            <p className="text-sm text-muted-foreground">Write short & long answers for Paper II</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 space-y-4"
        >
          {/* New Note Button */}
          <Button
            variant="hero"
            className="w-full gap-2"
            onClick={handleNewNote}
          >
            <Plus className="w-4 h-4" />
            New Note
          </Button>

          {/* Sample Prompts */}
          <div className="glass rounded-2xl p-4">
            <h3 className="text-sm font-medium text-foreground mb-3">Sample Questions</h3>
            <div className="space-y-2">
              {samplePrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handlePromptClick(prompt)}
                  className="w-full p-3 text-left text-sm rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Saved Notes */}
          <div className="glass rounded-2xl p-4">
            <h3 className="text-sm font-medium text-foreground mb-3">
              Saved Notes ({notes.length})
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {notes.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No notes yet. Start writing!
                </p>
              ) : (
                notes.map((note) => (
                  <button
                    key={note.id}
                    onClick={() => handleSelectNote(note)}
                    className={`w-full p-3 text-left rounded-xl transition-colors ${
                      activeNote?.id === note.id
                        ? 'bg-primary/10 border border-primary/30'
                        : 'bg-secondary/50 hover:bg-secondary'
                    }`}
                  >
                    <p className="text-sm font-medium text-foreground truncate">
                      {note.title}
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {new Date(note.updatedAt).toLocaleDateString()}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </motion.div>

        {/* Editor */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <div className="glass rounded-3xl p-6">
            <Input
              placeholder="Enter question or title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-medium mb-4 h-12 bg-secondary/50 border-border"
            />
            <Textarea
              placeholder="Write your answer here... Focus on clarity, structure, and key points."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[400px] bg-secondary/50 border-border resize-none"
            />
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                {content.split(/\s+/).filter(Boolean).length} words
              </p>
              <div className="flex items-center gap-2">
                {activeNote && (
                  <Button
                    variant="outline"
                    onClick={handleDelete}
                    className="gap-2 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                )}
                <Button variant="hero" onClick={handleSave} className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Note
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
