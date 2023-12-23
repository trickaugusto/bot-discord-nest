import { Injectable, Logger } from '@nestjs/common';
import {
  Context,
  On,
  ContextOf,
  TextCommand,
  TextCommandContext,
  Arguments,
} from 'necord';

@Injectable()
export class AppUpdate {
  private readonly logger = new Logger(AppUpdate.name);

  @On('messageCreate')
  public onMessageCreate(@Context() [message]: ContextOf<'messageCreate'>) {
    if (message.author.bot) return;
    const { content, channel } = message;

    if (content.startsWith('!')) return;

    channel.send(`Você disse: ${content}`);
  }

  @TextCommand({
    name: 'cmd',
    description: 'Execute a command!',
  })
  public async onCommand(
    @Context() [message]: TextCommandContext,
    @Arguments() args: string[],
  ) {
    if (args[0]) {
      const commandName = args[0];
      switch (commandName) {
        case 'ping':
          const response = 'pong';
          return message.reply(response);
        default:
          return message.reply('Unknown command');
      }
    } else {
      return message.reply('Please specify a command');
    }
  }
}
