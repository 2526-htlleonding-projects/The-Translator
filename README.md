# Discord Bot Goals

## 1. Core Functionality
- **Translate Messages:**  
  The bot should be able to translate any given text message into **English** using a translation API (e.g., Google Translate, DeepL, or LibreTranslate).

## 2. Command Design
- **Command Name:** `/translate`
- **Parameters:**
  - `text` → The message to translate.
- **Behavior:**
  - The bot translates the provided message into English.
  - The result should be visible **only to the user** who executed the command (ephemeral response).

## 3. Example Flow
1. User types:  
   `/translate text: "Guten Morgen!"`
2. Bot responds (ephemeral):  
   `Translation: "Good morning!"`

## 4. Future Extensions
- Detect source language automatically.
- Support target languages besides English.
- Add context menu command ("Translate message").
- Allow translation of replied messages.

## 5. Required Libraries / APIs
- `discord.js` v14+
- Translation API (choose one):
  - `@vitalets/google-translate-api`
  - `deepl-node`
  - `libretranslate` (self-hosted option)
