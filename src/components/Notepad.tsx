import { useEffect, useRef, useState } from 'react'
import './Notepad.css'

interface NotepadProps {
  isOpen: boolean
  onClose: () => void
}

export default function Notepad({ isOpen, onClose }: NotepadProps) {
  const [content, setContent] = useState('')
  const [position, setPosition] = useState({ x: 20, y: 80 })
  const [size, setSize] = useState({ width: 360, height: 600 })
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 })
  
  const notepadRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Load content from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('notepad-content')
    if (saved) {
      setContent(saved)
    }
  }, [])

  // Save content to localStorage
  useEffect(() => {
    localStorage.setItem('notepad-content', content)
  }, [content])

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Handle dragging
  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - dragStart.x
      const newY = e.clientY - dragStart.y
      
      // Clamp position to keep notepad within viewport
      const maxX = window.innerWidth - size.width - 10
      const maxY = window.innerHeight - size.height - 10
      
      setPosition({
        x: Math.max(10, Math.min(newX, maxX)),
        y: Math.max(10, Math.min(newY, maxY)),
      })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragStart, size])

  // Handle resizing
  useEffect(() => {
    if (!isResizing) return

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - resizeStart.x
      const deltaY = e.clientY - resizeStart.y
      
      // Clamp size to keep notepad within viewport
      const maxWidth = window.innerWidth - position.x - 10
      const maxHeight = window.innerHeight - position.y - 10
      
      setSize({
        width: Math.max(280, Math.min(resizeStart.width + deltaX, maxWidth)),
        height: Math.max(200, Math.min(resizeStart.height + deltaY, maxHeight)),
      })
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, resizeStart])

  const handleDragStart = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.notepad__resize-handle')) return
    if ((e.target as HTMLElement).tagName === 'TEXTAREA') return
    
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsResizing(true)
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    })
  }

  if (!isOpen) return null

  return (
    <div
      ref={notepadRef}
      className="notepad"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
      onMouseDown={handleDragStart}
    >
      <div className="notepad__header">
        <span className="notepad__title">📝 Notepad</span>
        <button className="notepad__close-btn" onClick={onClose}>
          ✕
        </button>
      </div>
      
      <textarea
        ref={textareaRef}
        className="notepad__textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing... (Press ESC to close)"
      />
      
      <div
        className="notepad__resize-handle"
        onMouseDown={handleResizeStart}
      >
        ⋰
      </div>
    </div>
  )
}
