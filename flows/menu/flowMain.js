// menu/flowMain.js
const { addKeyword } = require('@bot-whatsapp/bot')
const { globalState } = require('../../state/globalState')
const keywords = require('../../data/words')
const flowInternshipInfo = require('../internship/flowInternshipInfo')
const flowInternshipQA = require('../internship/flowInternshipQA')
const flowContact = require('./flowContact')
const flowHelp = require('./flowHelp')

// Función para eliminar tildes
function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

// Función para normalizar el texto
function normalizeText(text) {
    return removeAccents(text.toLowerCase()).trim();
}

// Definimos flowMain y keywordHandler
const flowMain = addKeyword(['hola','ola', 'menu', 'menú', 'inicio', 'buenos días',, 'buen dia', 'buenas tardes', 'qué tal', 'buenas noches', 'cómo estás', 'hey', 'hello','0'])
    .addAnswer('¡Bienvenido al Chatbot de Prácticas Universitarias IUDC!, Recuerda que el proceso de prácticas es obligatorio en todos los programas para tu grado 👋\n')
    .addAnswer(
        [
            'Por favor, selecciona una opción:',
            '1. 📚 Información sobre prácticas',
            '2. ❓ Preguntas frecuentes',
            '3. 📞 Contactar al departamento de Prácticas',
            '4. 🆘 Ayuda con el bot'
        ],
        { capture: true },
        async (ctx, { gotoFlow }) => {
            const option = normalizeText(ctx.body); // Normalizamos la opción
            globalState.setUserData({ name: ctx.pushName })

            switch (option) {
                case '1':
                    return gotoFlow(flowInternshipInfo)
                case '2':
                    return gotoFlow(flowInternshipQA)
                case '3':
                    return gotoFlow(flowContact)
                case '4':
                    return gotoFlow(flowHelp)              
                default:
                    return gotoFlow(flowMain)
            }
        }
    )

// Este controlador de palabras clave captura otras palabras y redirige
const keywordHandler = addKeyword(Object.values(keywords).flat())
    .addAnswer(
        'Parece que estás buscando información específica. ¿Puedes ser más claro con tu pregunta?',
        { capture: true },
        async (ctx, { gotoFlow }) => {
            const userInput = normalizeText(ctx.body); // Normalizamos la entrada del usuario

            if (keywords.practicas.some(word => userInput.includes(normalizeText(word)))) {
                return gotoFlow(flowInternshipInfo)
            } else if (keywords.empresas.some(word => userInput.includes(normalizeText(word)))) {
                return gotoFlow(flowCompanies) // Asegúrate de tener este flujo definido si no está.
            } else if (keywords.ayuda.some(word => userInput.includes(normalizeText(word)))) {
                return gotoFlow(flowHelp)
            } else if (keywords.menu.some(word => userInput.includes(normalizeText(word)))) {
                return gotoFlow(flowMain)
            } else {
                return gotoFlow(flowInternshipQA)
            }
        }
    )

module.exports = { flowMain, keywordHandler }
