import {create} from 'zustand';

export interface ModalStoreInterface {
    movieId?: string;
    isOpen: boolean;
    openModal: (movieId: string) => void;
    closeModal: () => void;
}

const useInfoModalStore = create<ModalStoreInterface>((set) => ({
    movieId: undefined,
    isOpen: false,
    openModal: (movieId: string) => {
        console.log(`Opening modal for movie ID: ${movieId}`);
        set({ isOpen: true, movieId });
    },
    closeModal: () => {
        console.log('Closing modal');
        set({ isOpen: false, movieId: undefined });
    },
}));

// Testing the store
const TestComponent = () => {
    const { isOpen, openModal, closeModal } = useInfoModalStore();

    // Debugging: Log isOpen state whenever it changes
    console.log('Current isOpen state:', isOpen);

    // Test cases
    openModal('123'); // Opens modal for movie ID '123'
    console.log('Current isOpen state after opening modal:', isOpen);

    closeModal(); // Closes modal
    console.log('Current isOpen state after closing modal:', isOpen);

    return null; // This component doesn't render anything
};

export default useInfoModalStore;
