import { validateEmail } from "../utils/helper"

const useValidate = () => {
    return (schema) => {
        if (schema && Array.isArray(schema)) {
            for (let field of schema) {


                if (field.required && (!field.value || field.value == '')) {
                    return field.field + " is required."
                }
                if (field.isEmail && !validateEmail(field.value)) {
                    return field.field + " is not valid."
                }
                if (field.isArray && (!Array.isArray(field.value) || field.value.length < 0)) {
                    return field.field + " is empty."
                }

                if (field.custom && typeof field.custom == "function" && !field.custom()) {
                    return field.field + " is invalid."
                }
                
                if (field.custom) {
                    const customValidarionResponse = field.custom()
                    if (!(customValidarionResponse === true))
                        return customValidarionResponse
                }
            }
        }


        return true
    }

}
export default useValidate
