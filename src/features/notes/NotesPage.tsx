import { useState } from 'react';
import { Plus, Pencil, Trash2, StickyNote } from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input, Textarea } from '../../components/ui/Input';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export function NotesPage() {
  const [notes, setNotes] = useLocalStorage<Note[]>('nakkahwin_notes', []);
  const [showAdd, setShowAdd] = useState(false);
  const [editNote, setEditNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;
    const note: Note = {
      id: Date.now().toString(),
      title: title.trim() || 'Nota tanpa tajuk',
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };
    setNotes(prev => [note, ...prev]);
    setTitle('');
    setContent('');
    setShowAdd(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editNote) return;
    setNotes(prev => prev.map(n => n.id === editNote.id ? { ...n, title: title.trim() || 'Nota tanpa tajuk', content: content.trim() } : n));
    setEditNote(null);
    setTitle('');
    setContent('');
  };

  const openEdit = (note: Note) => {
    setEditNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleDelete = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  return (
    <PageContainer
      title="Nota"
      subtitle={`${notes.length} nota disimpan`}
      action={
        <Button size="sm" onClick={() => { setTitle(''); setContent(''); setShowAdd(true); }}>
          <Plus size={14} />
          Tambah Nota
        </Button>
      }
    >
      {notes.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <StickyNote size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">Tiada nota lagi</p>
          <p className="text-sm mt-1">Simpan idea, konsep tema, atau rujukan di sini</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {notes.map(note => (
            <div key={note.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-blush/40 transition-all flex flex-col">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="font-semibold text-navy text-sm">{note.title}</p>
                <div className="flex gap-1 flex-shrink-0">
                  <button onClick={() => openEdit(note)} className="p-1 rounded-lg text-gray-400 hover:text-navy hover:bg-blush-light transition-colors">
                    <Pencil size={13} />
                  </button>
                  <button onClick={() => handleDelete(note.id)} className="p-1 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
              {note.content && (
                <p className="text-sm text-gray-600 flex-1 whitespace-pre-wrap line-clamp-4">{note.content}</p>
              )}
              <p className="text-xs text-gray-300 mt-3">
                {new Date(note.createdAt).toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Tambah Nota Baru">
        <form onSubmit={handleAdd} className="space-y-4">
          <Input label="Tajuk" value={title} onChange={e => setTitle(e.target.value)} placeholder="cth: Idea Tema Perkahwinan" autoFocus />
          <Textarea label="Isi Nota" value={content} onChange={e => setContent(e.target.value)} placeholder="Tulis nota anda di sini..." rows={5} />
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="ghost" onClick={() => setShowAdd(false)}>Batal</Button>
            <Button type="submit" disabled={!title.trim() && !content.trim()}>Simpan</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!editNote} onClose={() => setEditNote(null)} title="Edit Nota">
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <Input label="Tajuk" value={title} onChange={e => setTitle(e.target.value)} autoFocus />
          <Textarea label="Isi Nota" value={content} onChange={e => setContent(e.target.value)} rows={5} />
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="ghost" onClick={() => setEditNote(null)}>Batal</Button>
            <Button type="submit">Kemaskini</Button>
          </div>
        </form>
      </Modal>
    </PageContainer>
  );
}
