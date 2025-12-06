import type { User } from "@supabase/supabase-js";
import { create } from 'zustand';
import { supabase } from '../config/supabase';

interface AuthState {
    user: User | null;
    setUser: (user: User | null) => void;
    isLoading: boolean;
    signOut: () => Promise<void>;
}

// Zustand tạo store bằng cách truyền vào một hàm factory nhận set và trả về một object chứa state và actions.
export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isLoading: true,
    setUser: (user) => set({ user, isLoading: false }),
    
    signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null });
    },
}));