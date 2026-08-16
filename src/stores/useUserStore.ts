import { create } from 'zustand';
import { currentUser } from '@/data/users';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  height: string;
  weight: string;
  shoeSize: string;
  shirtSize: string;
  sportInterests: string[];
}

interface UserState {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  // Stub for future Strava integration
  isStravaConnected: boolean;
  connectStrava: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  profile: {
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone,
    height: currentUser.sizeProfile.height,
    weight: currentUser.sizeProfile.weight,
    shoeSize: currentUser.sizeProfile.shoeSize,
    shirtSize: currentUser.sizeProfile.shirtSize,
    sportInterests: currentUser.sportInterests,
  },
  updateProfile: (updates) => set((state) => ({
    profile: { ...state.profile, ...updates }
  })),
  isStravaConnected: false,
  connectStrava: () => set({ isStravaConnected: true }),
}));
