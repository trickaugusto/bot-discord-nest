import { Test, TestingModule } from '@nestjs/testing';
import { Message } from 'discord.js';
import { AppUpdate } from '../src/app.update';

describe('AppUpdate', () => {
  let appUpdate: AppUpdate;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppUpdate],
    }).compile();

    appUpdate = module.get<AppUpdate>(AppUpdate);
  });

  describe('onMessageCreate', () => {
    it('should echo back the message content', () => {
      const message = {
        author: {
          bot: false,
        },
        content: 'Hello, world!',
        channel: {
          send: jest.fn(),
        },
      } as unknown as Message;

      appUpdate.onMessageCreate([message]);

      expect(message.channel.send).toHaveBeenCalledWith(
        'Você disse: Hello, world!',
      );
    });

    it('should ignore bot messages', () => {
      const message = {
        author: {
          bot: true,
        },
        content: 'Hello, world!',
        channel: {
          send: jest.fn(),
        },
      } as unknown as Message;

      appUpdate.onMessageCreate([message]);

      expect(message.channel.send).not.toHaveBeenCalled();
    });

    it('should ignore messages starting with "!"', () => {
      const message = {
        author: {
          bot: false,
        },
        content: '!hello',
        channel: {
          send: jest.fn(),
        },
      } as unknown as Message;

      appUpdate.onMessageCreate([message]);

      expect(message.channel.send).not.toHaveBeenCalled();
    });
  });

  describe('onCommand', () => {
    it('should reply with "pong" when the command is "ping"', async () => {
      const message = {
        reply: jest.fn().mockResolvedValue(undefined),
      } as unknown as Message;

      await appUpdate.onCommand([message], ['ping']);

      expect(message.reply).toHaveBeenCalledWith('pong');
    });

    it('should reply with "Unknown command" when the command is not recognized', async () => {
      const message = {
        reply: jest.fn().mockResolvedValue(undefined),
      } as unknown as Message;

      await appUpdate.onCommand([message], ['unknown']);

      expect(message.reply).toHaveBeenCalledWith('Unknown command');
    });

    it('should reply with "Please specify a command" when no command is given', async () => {
      const message = {
        reply: jest.fn().mockResolvedValue(undefined),
      } as unknown as Message;

      await appUpdate.onCommand([message], []);

      expect(message.reply).toHaveBeenCalledWith('Please specify a command');
    });
  });
});
