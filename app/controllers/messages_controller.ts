import type { HttpContext } from '@adonisjs/core/http'
import { messageValid } from '#validators/message'
import axios from 'axios'

export default class MessagesController {
  async send({ request, response }: HttpContext) {
    const { name, email, object, message } = await request.validateUsing(messageValid)

    const webhooksURL =
      'https://discord.com/api/webhooks/1362825040965537972/Y2LolN7MhKLjGPpMWarr9wF7K85WzjxjUFSgNbAwHPWPRQRQBTzRHv6GwZpbeN_ujBLI'

    try {
      const payload = {
        content: `**New Message Received**\n**Name:** ${name}\n**Email:** ${email}\n**Object:** ${object}\n**Message:** ${message}`,
      }

      await axios.post(webhooksURL, payload)

      return response.status(200).send({ message: 'Message sent to Discord successfully!' })
    } catch (error) {
      console.error('Error sending message to Discord:', error)
      return response.status(500).send({ error: 'Failed to send message to Discord' })
    }
  }
}
