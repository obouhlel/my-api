import vine from '@vinejs/vine'

export const messageValid = vine.compile(
  vine.object({
    name: vine.string(),
    email: vine.string().email(),
    object: vine.string(),
    message: vine.string(),
  })
)
