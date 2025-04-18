import type { HttpContext } from '@adonisjs/core/http'
import { messageValid } from '#validators/message'
import axios from 'axios'
import env from '#start/env'

export default class MessagesController {
  async send({ request, response }: HttpContext) {
    const { name, email, object, message } = await request.validateUsing(messageValid)

    try {
      const webhooksURL = env.get('DISCORD_WEBHOOK_URL')
      const payload = {
        embeds: [
          {
            title: `New Message: ${object}`,
            color: 0x5865f2,
            fields: [
              { name: 'Name', value: name, inline: true },
              { name: 'Email', value: email, inline: true },
              { name: '📝 Message', value: message || 'No message content' },
            ],
            timestamp: new Date().toISOString(),
            footer: { text: 'My API - Contact Form' },
          },
        ],
      }

      await axios.post(webhooksURL, payload)

      return response.status(200).send({ message: 'Message sent to Discord successfully!' })
    } catch (error) {
      console.error('Error sending message to Discord:', error)
      return response.status(500).send({ error: 'Failed to send message to Discord' })
    }
  }
}
