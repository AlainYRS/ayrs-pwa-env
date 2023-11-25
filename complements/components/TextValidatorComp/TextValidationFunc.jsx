export default function TextValidationFunc(StringToValidate, ElementForAnswer, ArrayKeyWordsToCheckLang, allowOverlapping, setInvalidChart) {
    let ocurrencias = 0 // Counter of ocurrences
    var ArrayKeyWordsToCheckLang = ArrayKeyWordsToCheckLang.map((x)=>{return x.toUpperCase()}) // Convert to UpperCase the arrays based to compare and validate
    let NormalizedString = StringToValidate.current.value // Normalize the string to compare making it string in uppercase and deleting special characters
                            .toString()
                            .toUpperCase()
                            .replaceAll(" ","")
                            .replaceAll("¨","")
                            .replaceAll("<","")
                            .replaceAll(">","")
                            .replaceAll("]","")
                            .replaceAll('"',"")
                            .replaceAll('\\',"")
                            .replaceAll('¬',"")
                            .replaceAll('|',"")
                            .replaceAll("°","")
                            .replaceAll("´","")
                            .replaceAll("^","")
                            .replaceAll("~","")
    const SpeChars = { 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U', 'Ä': 'A', 'Ë': 'E', 'Ï': 'I', 'Ö': 'O', 'Ü': 'U', '-': '', '/': '', '(': '', ')': '', '*': '', '_': '', ',': '', '.': '', ';': '', ':': '', '{': '', '}': '', '[': '', ']': '', '+': '', "'": '', '#': '', '$': '', '%': '', '&': '', '=': '', '¿': '', '?': '', '¡': '', '!': '', 'Â': 'A', 'Ê': 'E', 'Î': 'I', 'Ô': 'O', 'Û': 'U', 'Ã': 'A', '@': '' } // Special characters replaced for valid characters to check
    NormalizedString = NormalizedString.replace(/[ÁÉÍÓÚÄËÏÖÜÂÊÎÔÛÃ<>¨ ,.;:{}_+'#()*¨ ~^`°|¬$%&=¿?¡!-/[]/g, m => SpeChars[m]);

    ArrayKeyWordsToCheckLang.forEach(KeyWord => { // For each key word in the array of key words to check
        NormalizedString += ""; // Convert to string
        KeyWord += ""; // Convert to string
        if (KeyWord.length <= 0) return (NormalizedString.length + 1); // If the key word is empty return the length of the string + 1
        var n = 0, // Counter of ocurrences
            pos = 0, // Position of the key word
            step = allowOverlapping ? 1 : KeyWord.length; // If the key word is allowed to overlap or not ythis defines the steps
        while (true) { // While overlaping is true
            pos = NormalizedString.indexOf(KeyWord, pos);   // Find the position of the key word in the string
            if (pos >= 0) { // If the position is greater than 0
                if (KeyWord === "@"){ // If the key word is @
                    n = n + 70000; // Add 70000 to the counter occurrences
                } else { // If the key word is not @
                    ++n; // Add 1 to the counter occurrences
                }
                pos += step; // Add the step to the position of the key word
            } else break; // If the position is not greater than 0 break the loop
        }
        if (n > 0) { // If the counter of occurrences is greater than 0
        }
        setInvalidChart(ocurrencias) // Set the invalid chart to the number of occurrences
        ocurrencias = ocurrencias + n // Add the counter of occurrences to the total counter of occurrences
        if(ocurrencias == 0){ // If the total counter of occurrences is 0
            ElementForAnswer.current.innerHTML = '' // Set the element for answer to empty
        } else { // If the total counter of occurrences is not 0
            ElementForAnswer.current.innerHTML = ocurrencias // Set the element for answer to the total counter of occurrences
        }
    }
    )
}

const LangNumbers = { // Array of languages and numbers base to be validated
    custom: [], // Custom array of numbers base to be validated
    custom2: [], // Custom2 array of numbers base to be validated
    custom3: [], // Custom3 array of numbers base to be validated
    socmed: ["@", "MAIL", "EMAIL", "HOTMAIL", "GMAIL", "YAHOO", "FACEBOOK", "INSTAGRAM", "WWW", "HTTP", ".COM","DISCORD","WHATSAPP"], // Array of social media base to be validated
    num: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], // Array of numbers base to be validated
    de: ["NULL", "EINER", "ZWEI", "DREI", "VIER", "FÜNF", "FUNF", "SECHS", "SIEBEN", "ACHT", "NEUN", "ZEHN", "ELF", "ZWÖLF", "ZWOLF", "DREIZEHN", "VIERZEHN", "FÜNFZEHN", "FUNFZEHN", "SECHSZEHN", "SIEBZEHN", "ACHTZEHN", "NEUNZEHN", "ZWANZIG", "DREISSIG", "VIERZIG", "FÜNFZIG", "FUNFZIG", "SECHZIG", "SIEBZIG", "ACHTZIG", "NEUNZIG", "HUNDERT", "TAUSEND", "MILLION"], // Array of german numbers base to be validated
    en: ["ZERO", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE", "TEN", "ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN", "FIFTEEN", "SIXTEEN", "SEVENTEEN", "EIGHTEEN", "NINETEEN", "TWENTY", "THIRTY", "FOURTY", "FIFTY", "SIXTY", "SEVENTY", "EIGHTY", "NINETY", "HUNDRED", "THOUSAND", "MILLION","REAL ESTATE"], // Array of english numbers base to be validated
    es: ["CERO", "UNO", "DOS", "TRES", "CUATRO", "CINCO", "SEIS", "SIETE", "OCHO", "NUEVE", "DIEZ", "ONCE", "DOCE", "TRECE", "CATORCE", "QUINCE", "DIECISÉIS", "DIECISEIS", "DIECISIETE", "DIECIOCHO", "DIECINUEVE", "VEINTE", "TREINTA", "CUARENTA", "CINCUENTA", "SESENTA", "SETENTA", "OCHENTA", "NOVENTA", "CIEN", "MIL", "MILLÓN", "MILLON", "ARROBA", "ARROVA", "CORREO", "CENTURY", "INMOBILIARIA", "AGENCIA","RAICES","RAIZ","BIENES RAICES",], // Array of spanish numbers base to be validated
    et: ["NULL", "ÜKS", "UKS", "KAKS", "KOLM", "NELI", "VIIS", "KUUS", "SEITSE", "KAHEKSA", "ÜHEKSA", "UHEKSA", "KÜMME", "KUMME", "ÜKSTEIST", "UKSTEIST", "KAKSTEIST", "KOLMETTEIST", "NELITEIST", "VIISTEIST", "KUUSTEIST", "SEITSTEISTE", "KAHEKSATEIST", "ÜHEKSATEIST", "UHEKSATEIST", "KAKSKÜMMEND", "KAKSKUMMEND", "KOLMEKÜMMEND", "KOLMEKUMMEND", "NELJAKÜMMEND", "NELJAKUMMEND", "VIISKÜMMEND", "VIISKUMMEND", "KUUSKÜMMEND", "KUUSKUMMEND", "SEITSMEKÜMMEND", "SEITSMEKUMMEND", "KAHEKSAKÜMMEND", "KAHEKSAKUMMEND", "ÜHEKSAKÜMMEND", "UHEKSAKUMMEND", "SADA", "TUHAT", "MILJONIT"], // Array of estonian numbers base to be validated
    fr: ["ZÉRO", "ZERO", "UNE", "DEUX", "TROIS", "QUATRE", "CINQ", "SIX", "SEPT", "HUIT", "NEUF", "DIX", "ONZE", "DOUZE", "TREIZE", "QUATORZE", "QUINZE", "SEIZE", "DIX-SEPT", "DIXSEPT", "DIX-HUIT", "DIXHUIT", "DIX-NEUF", "DIXNEUF", "VINGT", "TRENTE", "QUARANTE", "CINQUANTE", "SOIXANTE", "SOIXANTE-DIX", "SOIXANTEDIX", "QUATRE-VINGTS", "QUATREVINGTS", "QUATRE-VINGT-DIX", "QUATREVINGTDIX", "CENT", "MILLE", "MILLION"], // Array of french numbers base to be validated
    it: ["ZERO", "UNO", "DUE", "TRE", "QUATTRO", "CINQUE", "SEI", "SETTE", "OTTO", "NOVE", "DIECI", "UNDICI", "DODICI", "TREDICI", "QUATTORDICI", "QUINDICI", "SEDICI", "DICIASSETTE", "DICIOTTO", "DICIANNOVE", "VENTI", "TRENTA", "QUARANTA", "CINQUANTA", "SESSANTA", "SETTANTA", "OTTANTA", "NOVANTA", "CENTINAIO", "MILLE", "MILIONI"], // Array of italian numbers base to be validated
    pt: ["ZERO", "UM", "DOIS", "TRÊS", "TRES", "QUATRO", "CINCO", "SEIS", "SETE", "OITO", "NOVE", "DEZ", "ONZE", "DOZE", "TREZE", "QUATORZE", "QUINZE", "DEZESSEIS", "DEZESSETE", "DEZOITO", "DEZENOVE", "VINTE", "TRINTA", "QUARENTA", "CINQUENTA", "SESSENTA", "SETENTA", "OITENTA", "NOVENTA", "CEM", "MIL", "MILHÃO", "MILHAO"], // Array of portuguese numbers base to be validated
    ru: ["НУЛЬ", "ОДИН", "ДВА", "ТРИ", "ЧЕТЫРЕ", "ПЯТЬ", "ШЕСТЬ", "СЕМЬ", "ВОСЕМЬ", "ДЕВЯТЬ", "ДЕСЯТЬ", "ОДИННАДЦАТЬ", "ДВЕНАДЦАТЬ", "тринадцать", "ЧЕТЫРНАДЦАТЬ", "ПЯТНАДЦАТЬ", "ШЕСТНАДЦАТЬ", "СЕМНАДЦАТЬ", "восемнадцать", "девятнадцать", "ДВАДЦАТЬ", "тридцать", "СОРОК", "ПЯТЬДЕСЯТ", "ШЕСТЬДЕСЯТ", "СЕМЬДЕСЯТ", "ВОСЕМЬДЕСЯТ", "ДЕВЯНОСТО", "СОТНИ", "ТЫСЯЧА", "МИЛЛИОН"], // Array of russian numbers base to be validated
    www: ["UN", "СТО"], // Array of russian numbers base to be validated
    yyy: ["EINS", "SOIXANTEDIX", "CENTENAS", "MILJON"], // Array of russian numbers base to be validated
    zzz: ["НОЛЬ", "EINE", "KOLMTEIST", "SECHZEHN", "SEITSETEIST", "DIXHUIT", "DIXNEUF", "VEINTI", "KOLMKÜMMEND", "KOLMKUMMEND", "NELIKÜMMEND", "NELIKUMMEND", "SEITSEKÜMMEND", "SEITSEKUMMEND", "QUATREVINGTDIX", "CENTO", "EINTAUSEND", "MILIONE"], // Array of russian numbers base to be validated
    all: ["NULL", "EINER", "ZWEI", "DREI", "VIER", "FÜNF", "FUNF", "SECHS", "SIEBEN", "ACHT", "NEUN", "ZEHN", "ELF", "ZWÖLF", "ZWOLF", "DREIZEHN", "VIERZEHN", "FÜNFZEHN", "FUNFZEHN", "SECHSZEHN", "SIEBZEHN", "ACHTZEHN", "NEUNZEHN", "ZWANZIG", "DREISSIG", "VIERZIG", "FÜNFZIG", "FUNFZIG", "SECHZIG", "SIEBZIG", "ACHTZIG", "NEUNZIG", "HUNDERT", "TAUSEND", "MILLION", "ZERO", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE", "TEN", "ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN", "FIFTEEN", "SIXTEEN", "SEVENTEEN", "EIGHTEEN", "NINETEEN", "TWENTY", "THIRTY", "FOURTY", "FIFTY", "SIXTY", "SEVENTY", "EIGHTY", "NINETY", "HUNDRED", "THOUSAND", "MILLION","REAL ESTATE",
    "CERO", "UNO", "DOS", "TRES", "CUATRO", "CINCO", "SEIS", "SIETE", "OCHO", "NUEVE", "DIEZ", "ONCE", "DOCE", "TRECE", "CATORCE", "QUINCE", "DIECISÉIS", "DIECISEIS", "DIECISIETE", "DIECIOCHO", "DIECINUEVE", "VEINTE", "TREINTA", "CUARENTA", "CINCUENTA", "SESENTA", "SETENTA", "OCHENTA", "NOVENTA", "CIEN", "MIL", "MILLÓN", "MILLON", "ARROBA", "ARROVA", "ARROBAS", "ARROVAS",
    "NULL", "ÜKS", "UKS", "KAKS", "KOLM", "NELI", "VIIS", "KUUS", "SEITSE", "KAHEKSA", "ÜHEKSA", "UHEKSA", "KÜMME", "KUMME", "ÜKSTEIST", "UKSTEIST", "KAKSTEIST", "KOLMETTEIST", "NELITEIST", "VIISTEIST", "KUUSTEIST", "SEITSTEISTE", "KAHEKSATEIST", "ÜHEKSATEIST", "UHEKSATEIST", "KAKSKÜMMEND", "KAKSKUMMEND", "KOLMEKÜMMEND", "KOLMEKUMMEND", "NELJAKÜMMEND", "NELJAKUMMEND", "VIISKÜMMEND", "VIISKUMMEND", "KUUSKÜMMEND", "KUUSKUMMEND", "SEITSMEKÜMMEND", "SEITSMEKUMMEND", "KAHEKSAKÜMMEND", "KAHEKSAKUMMEND", "ÜHEKSAKÜMMEND", "UHEKSAKUMMEND", "SADA", "TUHAT", "MILJONIT",
    "ZÉRO", "ZERO", "UNE", "DEUX", "TROIS", "QUATRE", "CINQ", "SIX", "SEPT", "HUIT", "NEUF", "DIX", "ONZE", "DOUZE", "TREIZE", "QUATORZE", "QUINZE", "SEIZE", "DIX-SEPT", "DIXSEPT", "DIX-HUIT", "DIXHUIT", "DIX-NEUF", "DIXNEUF", "VINGT", "TRENTE", "QUARANTE", "CINQUANTE", "SOIXANTE", "SOIXANTE-DIX", "SOIXANTEDIX", "QUATRE-VINGTS", "QUATREVINGTS", "QUATRE-VINGT-DIX", "QUATREVINGTDIX", "CENT", "MILLE", "MILLION",
    "ZERO", "UNO", "DUE", "TRE", "QUATTRO", "CINQUE", "SEI", "SETTE", "OTTO", "NOVE", "DIECI", "UNDICI", "DODICI", "TREDICI", "QUATTORDICI", "QUINDICI", "SEDICI", "DICIASSETTE", "DICIOTTO", "DICIANNOVE", "VENTI", "TRENTA", "QUARANTA", "CINQUANTA", "SESSANTA", "SETTANTA", "OTTANTA", "NOVANTA", "CENTINAIO", "MILLE", "MILIONI",
    "ZERO", "UM", "DOIS", "TRÊS", "TRES", "QUATRO", "CINCO", "SEIS", "SETE", "OITO", "NOVE", "DEZ", "ONZE", "DOZE", "TREZE", "QUATORZE", "QUINZE", "DEZESSEIS", "DEZESSETE", "DEZOITO", "DEZENOVE", "VINTE", "TRINTA", "QUARENTA", "CINQUENTA", "SESSENTA", "SETENTA", "OITENTA", "NOVENTA", "CEM", "MIL", "MILHÃO", "MILHAO",
    "НУЛЬ", "ОДИН", "ДВА", "ТРИ", "ЧЕТЫРЕ", "ПЯТЬ", "ШЕСТЬ", "СЕМЬ", "ВОСЕМЬ", "ДЕВЯТЬ", "ДЕСЯТЬ", "ОДИННАДЦАТЬ", "ДВЕНАДЦАТЬ", "тринадцать", "ЧЕТЫРНАДЦАТЬ", "ПЯТНАДЦАТЬ", "ШЕСТНАДЦАТЬ", "СЕМНАДЦАТЬ", "восемнадцать", "девятнадцать", "ДВАДЦАТЬ", "тридцать", "СОРОК", "ПЯТЬДЕСЯТ", "ШЕСТЬДЕСЯТ", "СЕМЬДЕСЯТ", "ВОСЕМЬДЕСЯТ", "ДЕВЯНОСТО", "СОТНИ", "ТЫСЯЧА", "МИЛЛИОН"], // Array of typed  0-99
    full: ["UN", "СТО", "EINS", "SOIXANTEDIX", "CENTENAS", "MILJON", "НОЛЬ", "EINE", "KOLMTEIST", "SECHZEHN", "SEITSETEIST", "DIXHUIT", "DIXNEUF", "VEINTI", "KOLMKÜMMEND", "KOLMKUMMEND", "NELIKÜMMEND", "NELIKUMMEND", "SEITSEKÜMMEND", "SEITSEKUMMEND", "QUATREVINGTDIX", "CENTO", "EINTAUSEND", "MILIONE"] // Array of typed 100-999
}
export {LangNumbers}

const BlogSEOHref = {
    REMX: ["Real Estate", "SEO", "HREF", "..."], // Arrays of words to be found in the text
    Custom: ["Good","Anouncement"], // Arrays of words to be found in the text
}
export {BlogSEOHref}