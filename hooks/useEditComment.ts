import { create } from 'zustand'

interface EditCommentStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useEditComment = create<EditCommentStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useEditComment
