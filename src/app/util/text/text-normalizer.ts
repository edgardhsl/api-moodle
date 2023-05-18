export class TextNormalizer {
    static shortName(str?: string) {
        return str?.normalize('NFC').replace(/ /g,'').replace(/[^a-zA-Z0-9 ]/g, '') || '';
    }
}