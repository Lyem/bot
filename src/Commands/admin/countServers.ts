import { Command } from '../../Interfaces'
import { Permissions } from 'discord.js'

export const slash: Command = {
  name: 'count_servers',
  description: 'returns how many servers this bot is on',
  testOnly: false,
  run: async ({ interaction }) => {
    await interaction.deferReply()
    if (interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
      const guilds = await interaction.client.guilds.cache.size
      return interaction.followUp(
        `this bot is on: **${guilds} ${guilds > 1 ? 'servers' : 'server'}**`
      )
    } else {
      return interaction.followUp(
        `You don't have permission to use this command`
      )
    }
  }
}
