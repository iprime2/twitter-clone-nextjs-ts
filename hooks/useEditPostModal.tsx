import { create } from 'zustand'

interface EditPostModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useEditPostModal = create<EditPostModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useEditPostModal
