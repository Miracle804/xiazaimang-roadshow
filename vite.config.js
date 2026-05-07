import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages 部署配置
// 如果你的仓库名为 xiazaimang-roadshow，那么 base 设为 '/xiazaimang-roadshow/'
// 如果你使用 <username>.github.io 作为仓库名，则设为 '/'
export default defineConfig({
  plugins: [react()],
  base: "/xiazaimang-roadshow/",
});
