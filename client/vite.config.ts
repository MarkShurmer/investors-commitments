
import { defineConfig, UserConfigExport } from 'vite'
import react from '@vitejs/plugin-react-swc'
import type { ViteUserConfig as VitestUserConfig } from 'vitest/config';

type ViteConfig = UserConfigExport & Pick<VitestUserConfig, 'test'>;

const config: ViteConfig = {
  plugins: [react()],
  test: {
    setupFiles: './src/test-utils/test-setup.ts',
    environment: 'jsdom',
  }
};

export default defineConfig(config);
