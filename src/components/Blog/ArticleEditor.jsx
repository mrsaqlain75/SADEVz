import React, { useState, useEffect, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';

import { 
  Save, X, Bold, Italic, Underline as UnderlineIcon,
  List, ListOrdered, ListChecks, Code, Link as LinkIcon, Image as ImageIcon, 
  Heading1, Heading2, Heading3, Quote, Undo, Redo, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Highlighter
} from 'lucide-react';
import articleAPI from '../../services/articleAPI';

// Add this CSS to make formatting visible
const editorStyles = `
  .ProseMirror {
    min-height: 400px;
    padding: 1rem;
    color: #fff;
    background-color: #111827;
  }
  .ProseMirror:focus {
    outline: none;
  }
  .ProseMirror p {
    margin: 0.5em 0;
    line-height: 1.6;
  }
  .ProseMirror h1 {
    font-size: 2em;
    font-weight: bold;
    margin: 0.5em 0;
    color: #fff;
  }
  .ProseMirror h2 {
    font-size: 1.5em;
    font-weight: bold;
    margin: 0.5em 0;
    color: #fff;
  }
  .ProseMirror h3 {
    font-size: 1.17em;
    font-weight: bold;
    margin: 0.5em 0;
    color: #fff;
  }
  .ProseMirror ul, .ProseMirror ol {
    padding-left: 1.5em;
    margin: 0.5em 0;
  }
  .ProseMirror ul {
    list-style-type: disc;
  }
  .ProseMirror ol {
    list-style-type: decimal;
  }
  .ProseMirror li {
    margin: 0.2em 0;
  }
  .ProseMirror blockquote {
    border-left: 3px solid #00bcd4;
    padding-left: 1em;
    margin: 0.5em 0;
    font-style: italic;
    color: #d1d5db;
  }
  .ProseMirror code {
    background-color: #1e1e1e;
    color: #d4d4d4;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
  }
  .ProseMirror pre {
    background-color: #1e1e1e;
    border-radius: 5px;
    padding: 1em;
    margin: 0.5em 0;
    overflow-x: auto;
  }
  .ProseMirror pre code {
    background-color: transparent;
    padding: 0;
    color: inherit;
  }
  .ProseMirror img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
  }
  .ProseMirror a {
    color: #00bcd4;
    text-decoration: underline;
    cursor: pointer;
  }
  .ProseMirror a:hover {
    color: #00acc1;
  }
  .ProseMirror mark {
    background-color: #fbbf24;
    color: #000;
    padding: 0.1em 0.2em;
    border-radius: 2px;
  }
  .ProseMirror [data-type="taskList"] {
    list-style: none;
    padding: 0;
  }
  .ProseMirror [data-type="taskList"] li {
    display: flex;
    align-items: flex-start;
    margin: 0.5em 0;
  }
  .ProseMirror [data-type="taskList"] li > label {
    margin-right: 0.5em;
    user-select: none;
  }
  .ProseMirror [data-type="taskList"] li > div {
    flex: 1;
  }
  .ProseMirror .is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #6b7280;
    pointer-events: none;
    height: 0;
  }
  .ProseMirror .highlight {
    background-color: #fbbf24;
    color: #000;
  }
  /* Text alignment */
  .ProseMirror .align-left {
    text-align: left;
  }
  .ProseMirror .align-center {
    text-align: center;
  }
  .ProseMirror .align-right {
    text-align: right;
  }
  .ProseMirror .align-justify {
    text-align: justify;
  }
  /* Custom scrollbar */
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #1f2937;
    border-radius: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #4b5563;
    border-radius: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
  }
`;

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="bg-gray-800 border-b border-gray-700 p-2">
      <div className="flex flex-wrap items-center gap-1">
        {/* Headings */}
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-700 text-[#00bcd4]' : 'text-gray-300'}`}
          title="Heading 1"
        >
          <Heading1 className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-700 text-[#00bcd4]' : 'text-gray-300'}`}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-700 text-[#00bcd4]' : 'text-gray-300'}`}
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-700 mx-1" />

        {/* Text Styles */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('bold') ? 'bg-gray-700 text-[#00bcd4]' : 'text-gray-300'}`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('italic') ? 'bg-gray-700 text-[#00bcd4]' : 'text-gray-300'}`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('underline') ? 'bg-gray-700 text-[#00bcd4]' : 'text-gray-300'}`}
          title="Underline"
        >
          <UnderlineIcon className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-700 mx-1" />

        {/* Lists */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('bulletList') ? 'bg-gray-700 text-[#00bcd4]' : 'text-gray-300'}`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('orderedList') ? 'bg-gray-700 text-[#00bcd4]' : 'text-gray-300'}`}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('taskList') ? 'bg-gray-700 text-[#00bcd4]' : 'text-gray-300'}`}
          title="Task List"
        >
          <ListChecks className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-700 mx-1" />

        {/* Alignment */}
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-700 text-[#00bcd4]' : 'text-gray-300'}`}
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-700 text-[#00bcd4]' : 'text-gray-300'}`}
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-700 text-[#00bcd4]' : 'text-gray-300'}`}
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-700 mx-1" />

        {/* Features */}
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('blockquote') ? 'bg-gray-700 text-[#00bcd4]' : 'text-gray-300'}`}
          title="Quote"
        >
          <Quote className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('codeBlock') ? 'bg-gray-700 text-[#00bcd4]' : 'text-gray-300'}`}
          title="Code Block"
        >
          <Code className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('highlight') ? 'bg-gray-700 text-[#00bcd4]' : 'text-gray-300'}`}
          title="Highlight"
        >
          <Highlighter className="w-4 h-4" />
        </button>

        {/* Link */}
        <button
          onClick={() => {
            const url = window.prompt('Enter the URL:');
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive('link') ? 'bg-gray-700 text-[#00bcd4]' : 'text-gray-300'}`}
          title="Add Link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>

        {/* Image */}
        <button
          onClick={() => {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.click();

            input.onchange = async () => {
              const file = input.files[0];
              try {
                const response = await articleAPI.uploadImage(file);
                editor.chain().focus().setImage({ src: response.url }).run();
              } catch (error) {
                alert('Failed to upload image');
              }
            };
          }}
          className="p-2 rounded hover:bg-gray-700 text-gray-300"
          title="Add Image"
        >
          <ImageIcon className="w-4 h-4" />
        </button>

        <div className="flex-1" />

        {/* Undo/Redo */}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2 rounded hover:bg-gray-700 text-gray-300 disabled:opacity-50"
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2 rounded hover:bg-gray-700 text-gray-300 disabled:opacity-50"
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const ArticleEditor = ({ article = null, onSave, onCancel }) => {
  const [title, setTitle] = useState(article?.title || '');
  const [category, setCategory] = useState(article?.category || '');
  const [status, setStatus] = useState(article?.status || 'draft');
  const [coverImage, setCoverImage] = useState(article?.coverImage || '');
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,
      Underline,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Placeholder.configure({
        placeholder: 'Write your article content here...',
      }),
    ],
    content: article?.content || '',
    editorProps: {
      attributes: {
        class: 'ProseMirror',
      },
    },
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await articleAPI.getCategories();
      setCategories(response.categories.map(c => c._id).filter(Boolean));
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const handleCoverImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const response = await articleAPI.uploadImage(file);
      setCoverImage(response.url);
    } catch (error) {
      alert('Failed to upload cover image');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    if (!editor) return;

    setSaving(true);
    try {
      const articleData = {
        title,
        content: editor.getHTML(),
        category,
        status,
        coverImage
      };

      await onSave(articleData);
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <style>{editorStyles}</style>
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">
            {article ? 'Edit Article' : 'Create New Article'}
          </h2>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00bcd4]"
              placeholder="Enter article title"
            />
          </div>

          {/* Category and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                list="categories"
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00bcd4]"
                placeholder="e.g., Technology, Business"
              />
              <datalist id="categories">
                {categories.map(cat => (
                  <option key={cat} value={cat} />
                ))}
              </datalist>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00bcd4]"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Cover Image
            </label>
            <div className="flex items-center space-x-4">
              {coverImage ? (
                <div className="relative">
                  <img 
                    src={coverImage} 
                    alt="Cover" 
                    className="h-20 w-20 object-cover rounded-lg border border-gray-700"
                  />
                  <button
                    onClick={() => setCoverImage('')}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {uploading ? 'Uploading...' : 'Upload Cover Image'}
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleCoverImageUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Rich Text Editor with Scrollable Content */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Content
            </label>
            <div className="border border-gray-700 rounded-lg bg-gray-900">
              <MenuBar editor={editor} />
              <div className="h-[500px] overflow-y-auto custom-scrollbar">
                <EditorContent editor={editor} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700 flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-6 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-gradient-to-r from-[#00bcd4] to-cyan-600 text-white rounded-lg hover:from-cyan-600 hover:to-[#00bcd4] transition-all disabled:opacity-50 flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Article'}
          </button>
        </div>
      </div>
    </>
  );
};

export default ArticleEditor;