import { ERROS_VALIDATIONS } from '@data/constantes/errors/errors-validations.const';
import { IMAGES_ROUTES } from '@data/constantes/routes/images.routes';
import { ENUM_VALIDATION_OPTIONS } from '@data/enum';
import { IField } from '@data/interfaces';
import { faFacebookSquare, faInstagramSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';

import { ValidationsService } from '@shared/servicios/validations/validations.service';

export const CONST_LOGIN_PAGE: {
    FORM: {
        correo: IField;
        clave: IField;
    };
    ICONS: any[];
    STYLE_BACKGROUND: any;
    LOGO: string;
} = {
    FORM: {
        correo: {
            val: '',
            error: ERROS_VALIDATIONS.EMAIL_REQUIRED_FIELD,
            isValid() {
                const validationsService = new ValidationsService();
                const validateEmail = validationsService.validateField(this.val, ENUM_VALIDATION_OPTIONS.CORREO);
                this.error = validateEmail.msg;
                return validateEmail.isValid;
            }
        },
        clave: {
            val: '',
            error: ERROS_VALIDATIONS.PASSWORD_REQUIRED_FIELD,
            isValid() {
                const validationsService = new ValidationsService();
                const validatePassword = validationsService.validateField(this.val, ENUM_VALIDATION_OPTIONS.CLAVE);
                this.error = validatePassword.msg;
                return validatePassword.isValid;
            }
        }
    },
    ICONS: [
        faFacebookSquare,
        faTwitterSquare,
        faInstagramSquare
    ],
    STYLE_BACKGROUND: {
        backgroundImage: `url(${IMAGES_ROUTES.BACKGROUND_LOGIN})`
    },
    LOGO: IMAGES_ROUTES.LOGO
};
