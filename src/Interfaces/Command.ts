import {
  CommandInteraction,
  ChatInputApplicationCommandData,
  GuildMember,
  ApplicationCommandData,
  CommandInteractionOptionResolver,
  ApplicationCommandOptionData,
  AutocompleteInteraction
} from 'discord.js'
import Client from '../Client'

export interface ExtendedInteraction extends CommandInteraction {
  member: GuildMember
}

interface RunOptions {
  client: Client
  interaction: ExtendedInteraction
  args: CommandInteractionOptionResolver
}

interface AutoCompleteInteractionOptions {
  client: Client
  interaction: AutocompleteInteraction
}

type Run = (options: RunOptions) => any

type AutoCompleteInteraction = (options: AutoCompleteInteractionOptions) => any

export type Command = ApplicationCommandData & {
  name: string
  description: string
  testOnly: boolean
  options?: ApplicationCommandOptionData[]
  run: Run
  autocompleteInteraction?: AutoCompleteInteraction
} & ChatInputApplicationCommandData
