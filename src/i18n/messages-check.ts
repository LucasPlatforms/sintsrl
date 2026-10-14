import type itMessages from "../../messages/it.json";
import enMessages from "../../messages/en.json";

// Controllo in fase di build: ogni traduzione deve avere la stessa struttura
// dell'italiano. Se manca una chiave in en.json, `npm run build` si ferma qui.
// Aggiungendo una lingua, aggiungi una riga come questa.
export const enMatchesIt: typeof itMessages = enMessages;
