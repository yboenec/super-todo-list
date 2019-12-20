import { BehaviorSubject } from 'rxjs';
import { Language } from './../../model/language';
import { FileService } from './file.service';

export class LabelService {

    private static languagesAvailable: Array<Language> = [
        {
            'lg': 'English',
            'code': 'en'
        },
        {
            'lg': 'Français',
            'code': 'fr'
        }
    ];

    private currentLanguage:  BehaviorSubject<Language>;

    /** 
     * Default constructor
    */
    constructor(private fileService: FileService) {
    }

    /**
     * Get availables languages
     */
    private getAvailablesLanguages() {
        return LabelService.languagesAvailable;
    }

    /**
     * Get the observable current language.
     */
    private getCurrentLanguage() {
        return this.currentLanguage;
    }

}