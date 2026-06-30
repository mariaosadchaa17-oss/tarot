# Tarot app update

Updated files planned and changed:

- `index.html`: UI settings panel, deck selection, card back images, translations, Yes/No spread, constructor emojis.
- `assets/decks/retro/`: normalized Retro deck card images and back image.
- `assets/decks/mirror/`: normalized Taro Zerkalo Sudby deck card images and back image.
- `assets/decks/crow/`: normalized Magical Crow deck card images and back image.

Deck image naming convention:

- Major Arcana: `major-0.jpg` ... `major-21.jpg`
- Minor Arcana: `wands-1.jpg` ... `wands-14.jpg`, same for `cups`, `swords`, `pentacles`
- Card back: `back.jpg`

Notes:

- The Retro archive did not include a separate card-back image, so the uploaded `card-back.jpg` was used as `assets/decks/retro/back.jpg`.
- The Yes/No spread now uses exactly one card.
- AI mode, deck selection, and card-back selection are in the top settings panel, outside the main reading flow.
