import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.dd2c8e50f06d4919aab7fd1e68b17c88',
  appName: 'Pori-fect Pazham Analyzer',
  webDir: 'dist',
  server: {
    url: 'https://dd2c8e50-f06d-4919-aab7-fd1e68b17c88.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ['camera', 'photos']
    }
  }
};

export default config;