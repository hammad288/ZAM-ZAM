'use client'

import { useTransition } from 'react'
import { Trash2, Loader2 } from 'lucide-react'

interface DeleteConfirmButtonProps {
  action: () => Promise<any>
  itemName?: string
  className?: string
}

export function DeleteConfirmButton({
  action,
  itemName,
  className = 'p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50',
}: DeleteConfirmButtonProps) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    const message = itemName
      ? `Are you sure you want to delete "${itemName}"? This action cannot be undone.`
      : 'Are you sure you want to delete this item? This action cannot be undone.'

    if (window.confirm(message)) {
      startTransition(async () => {
        try {
          await action()
        } catch (err) {
          console.error('Failed to delete:', err)
          alert('Failed to delete item. Please check your admin session.')
        }
      })
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className={className}
      aria-label="Delete"
      title={itemName ? `Delete "${itemName}"` : 'Delete'}
    >
      {isPending ? <Loader2 className="w-4 h-4 animate-spin text-red-500" /> : <Trash2 className="w-4 h-4" />}
    </button>
  )
}
