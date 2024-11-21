const { addKeyword } = require('@bot-whatsapp/bot')

const flowContact = addKeyword(['contacto','urgente'])
    .addAnswer([
        '📞 *Información de Contacto*\n',
        '*Coordinación de Prácticas Profesionales*\n',
        '👤 *Directora:* Dr. Erika Alarcon',
        '📧 Email:practicas.iudc@gmail.com', 
        '*Horarios de Atención:*',
        '• Lunes a Viernes: 8:00 AM - 5:00 PM',     
        '*Ubicación:*',
        '• Casa Verde, sede administrativa\n',
        'Para volver al menú principal, escribe "0"'
    ],
    { capture: true },
    async (ctx, { gotoFlow }) => {
        const userResponse = ctx.body.trim()

        if (userResponse === '0') {
            const flowMain = require('../menu/flowMain')
            return gotoFlow(flowMain)
        }
    })

module.exports = flowContact
