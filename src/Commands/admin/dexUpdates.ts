import { Command } from '../../Interfaces'
import { Constants, Permissions, TextChannel } from 'discord.js'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Guild = require('../../Models/guilds')

export const slash: Command = {
  name: 'lasts_updates',
  description: 'MangaDex Lasts Updates',
  options: [
    {
      name: 'channel',
      description: 'choice the channel to rss',
      required: true,
      type: Constants.ApplicationCommandOptionTypes.CHANNEL
    },
    {
      name: 'time',
      description: 'choice the time update em seconds',
      required: true,
      type: Constants.ApplicationCommandOptionTypes.NUMBER,
      choices: [
        {
          name: '1 H',
          value: 3600
        },
        {
          name: '30 M',
          value: 1800
        },
        {
          name: '5 M',
          value: 300
        },
        {
          name: '30 S',
          value: 30
        }
      ]
    },
    {
      name: 'lang',
      description: 'lang updates',
      required: true,
      type: Constants.ApplicationCommandOptionTypes.STRING,
      choices: [
        {
            name: 'Chinese (Simplified)',
            value: 'zh'
        },
        {
            name: 'Chinese (Traditional)',
            value: 'zh-hk'
        },
        {
            name: 'English',
            value: 'en'
        },
        {
            name: 'French',
            value: 'fr'
        },
        {
            name: 'German',
            value: 'de'
        },
        {
            name: 'Indonesian',
            value: 'id'
        },
        {
            name: 'Italian',
            value: 'it'
        },
        {
            name: 'Japanese',
            value: 'ja'
        },
        {
            name: 'Korean',
            value: 'ko'
        },
        {
            name: 'Portuguese (Brazil)',
            value: 'pt-br'
        },
        {
            name: 'Portuguese (Portugal)',
            value: 'pt'
        },
        {
            name: 'Russian',
            value: 'ru'
        },
        {
            name: 'Spanish',
            value: 'es'
        },
        {
            name: 'Spanish (LATAM)',
            value: 'es-la'
        }
      ]
    }
  ],
  testOnly: false,
  run: async ({ interaction }) => {
    const channel = (await interaction.options.getChannel(
      'channel'
    )) as TextChannel
    const lang = await interaction.options.getString('lang')
    const time = await interaction.options.getNumber('time')
    const existGuild = await Guild.findById(interaction.guildId)
    const webhook = await channel.createWebhook('dex')

    await interaction.deferReply()

    if (interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
      if (!existGuild) {
        const guild = new Guild({
          _id: interaction.guildId,
          name: interaction.guild?.name,
          timeUpdate: time,
          lastUpdate: new Date(),
          lastMangaUpdate: new Date(),
          webHook: webhook.url,
          lang: lang
        })
        await guild.save()
        return interaction.followUp(`RSS created successful`)
      } else {
        await Guild.findByIdAndUpdate(
          interaction.guildId,
          {
            $set: {
              name: interaction.guild?.name,
              timeUpdate: time,
              lastUpdate: new Date(),
              lastMangaUpdate: new Date(),
              webHook: webhook.url,
              lang: lang
            }
          },
          { new: true }
        )

        return interaction.followUp(`RSS successful update`)
      }
    } else {
      return interaction.followUp(
        `You don't have permission to use this command`
      )
    }
  }
}
