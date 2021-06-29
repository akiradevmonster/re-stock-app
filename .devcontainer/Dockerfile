FROM mcr.microsoft.com/devcontainers/javascript-node:22

# 作業ディレクトリの設定
WORKDIR /workspace

# node_modulesディレクトリを作成して適切な所有権を設定
RUN mkdir -p /workspace/node_modules && chown -R node:node /workspace /workspace/node_modules

# Cline CLIのインストール（必要に応じて）
RUN curl -fsSL https://github.com/cline-app/cline-cli/releases/latest/download/install.sh | bash

# Clineのための追加依存関係とPuppeteerに必要なライブラリをインストール
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install python3-pip python3-venv \
    libnss3 libnss3-dev libatk1.0-0 libatk-bridge2.0-0 libcups2 \
    libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 \
    libxrandr2 libgbm1 libasound2
