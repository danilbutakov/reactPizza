import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
   appId: 'com.example.app',
   appName: 'react-pizza',
   webDir: 'build',
   bundledWebRuntime: false,
   server: {
      url: 'https://react-pizza-beryl.vercel.app/',
      cleartext: true
   }
};

export default config;