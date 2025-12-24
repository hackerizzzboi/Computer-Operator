import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, Circle, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface Topic {
  id: string;
  title: string;
  subtopics: { id: string; title: string; completed: boolean }[];
}

interface SyllabusSection {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
}

const syllabusData: SyllabusSection[] = [
  {
    id: 'written',
    title: 'Written Examination',
    description: 'Paper I & II - Objective and Subjective',
    topics: [
      {
        id: 'computer-fundamentals',
        title: 'Computer Fundamentals',
        subtopics: [
          { id: 'cf-1', title: 'Introduction to Computers', completed: false },
          { id: 'cf-2', title: 'Computer Hardware & Software', completed: false },
          { id: 'cf-3', title: 'Number Systems', completed: false },
          { id: 'cf-4', title: 'Operating Systems', completed: false },
        ],
      },
      {
        id: 'office-applications',
        title: 'Office Applications',
        subtopics: [
          { id: 'oa-1', title: 'Microsoft Word', completed: false },
          { id: 'oa-2', title: 'Microsoft Excel', completed: false },
          { id: 'oa-3', title: 'Microsoft PowerPoint', completed: false },
          { id: 'oa-4', title: 'Microsoft Access', completed: false },
        ],
      },
      {
        id: 'networking',
        title: 'Computer Networks',
        subtopics: [
          { id: 'cn-1', title: 'Network Basics', completed: false },
          { id: 'cn-2', title: 'Internet & Email', completed: false },
          { id: 'cn-3', title: 'Network Security', completed: false },
        ],
      },
      {
        id: 'governance',
        title: 'Good Governance & General Knowledge',
        subtopics: [
          { id: 'gg-1', title: 'Constitution of Nepal', completed: false },
          { id: 'gg-2', title: 'Civil Service Act', completed: false },
          { id: 'gg-3', title: 'Good Governance Act', completed: false },
          { id: 'gg-4', title: 'Current Affairs', completed: false },
        ],
      },
    ],
  },
  {
    id: 'practical',
    title: 'Practical Examination',
    description: 'Hands-on computer skills test',
    topics: [
      {
        id: 'typing-practical',
        title: 'Typing Test',
        subtopics: [
          { id: 'tp-1', title: 'English Typing (25 WPM)', completed: false },
          { id: 'tp-2', title: 'Nepali Typing (25 WPM)', completed: false },
        ],
      },
      {
        id: 'office-practical',
        title: 'MS Office Tasks',
        subtopics: [
          { id: 'op-1', title: 'Document Formatting', completed: false },
          { id: 'op-2', title: 'Spreadsheet Functions', completed: false },
          { id: 'op-3', title: 'Presentation Creation', completed: false },
        ],
      },
    ],
  },
  {
    id: 'interview',
    title: 'Interview Preparation',
    description: 'Final interview round',
    topics: [
      {
        id: 'interview-topics',
        title: 'Interview Topics',
        subtopics: [
          { id: 'it-1', title: 'Self Introduction', completed: false },
          { id: 'it-2', title: 'Technical Questions', completed: false },
          { id: 'it-3', title: 'Current Affairs Discussion', completed: false },
          { id: 'it-4', title: 'Work Ethics & Values', completed: false },
        ],
      },
    ],
  },
];

export default function SyllabusPage() {
  const [sections, setSections] = useState<SyllabusSection[]>(syllabusData);
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);
  const { user } = useAuth();

  const storageKey = `loksewa_syllabus_${user?.id}`;

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        setSections(JSON.parse(stored));
      } catch {
        setSections(syllabusData);
      }
    }
  }, [storageKey]);

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };

  const toggleSubtopic = (sectionId: string, topicId: string, subtopicId: string) => {
    const updated = sections.map((section) => {
      if (section.id !== sectionId) return section;
      return {
        ...section,
        topics: section.topics.map((topic) => {
          if (topic.id !== topicId) return topic;
          return {
            ...topic,
            subtopics: topic.subtopics.map((sub) =>
              sub.id === subtopicId ? { ...sub, completed: !sub.completed } : sub
            ),
          };
        }),
      };
    });
    setSections(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const calculateProgress = (section: SyllabusSection) => {
    let total = 0;
    let completed = 0;
    section.topics.forEach((topic) => {
      topic.subtopics.forEach((sub) => {
        total++;
        if (sub.completed) completed++;
      });
    });
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-xl bg-accent/10">
            <BookOpen className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Syllabus & Plan</h1>
            <p className="text-sm text-muted-foreground">Track your preparation progress</p>
          </div>
        </div>
      </motion.div>

      {/* Sections */}
      <div className="space-y-6">
        {sections.map((section, sectionIndex) => {
          const progress = calculateProgress(section);
          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="glass rounded-3xl p-6"
            >
              {/* Section Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold gradient-text">{progress}%</p>
                  <p className="text-xs text-muted-foreground">completed</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-2 bg-secondary rounded-full overflow-hidden mb-6">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, delay: sectionIndex * 0.1 + 0.2 }}
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                />
              </div>

              {/* Topics */}
              <div className="space-y-3">
                {section.topics.map((topic) => {
                  const isExpanded = expandedTopics.includes(topic.id);
                  const topicCompleted = topic.subtopics.filter((s) => s.completed).length;
                  return (
                    <div key={topic.id} className="bg-secondary/30 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleTopic(topic.id)}
                        className="w-full p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          )}
                          <span className="font-medium text-foreground">{topic.title}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {topicCompleted}/{topic.subtopics.length}
                        </span>
                      </button>

                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-4 pb-4"
                        >
                          <div className="space-y-2 pl-7">
                            {topic.subtopics.map((subtopic) => (
                              <button
                                key={subtopic.id}
                                onClick={() => toggleSubtopic(section.id, topic.id, subtopic.id)}
                                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                              >
                                {subtopic.completed ? (
                                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                                ) : (
                                  <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                                )}
                                <span className={`text-sm text-left ${subtopic.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                                  {subtopic.title}
                                </span>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
