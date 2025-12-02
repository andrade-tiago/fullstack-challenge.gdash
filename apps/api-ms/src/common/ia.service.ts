import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { OpenRouter } from "@openrouter/sdk";
import { Env } from "src/config/env";

@Injectable()
export class IaService {
  private readonly _apiKey: string

  constructor(_configService: ConfigService<Env, true>) {
    const iaConfig = _configService.getOrThrow<Env['ia']>('ia')

    this._apiKey = iaConfig.apiKey
  }

  async askToModel(input: string): Promise<string> {
    const openRouter = new OpenRouter({
      apiKey: this._apiKey
    });

    const completion = await openRouter.chat.send({
      model: 'arcee-ai/trinity-mini:free',
      messages: [{ role: 'user', content: input }],
      stream: false,
    });

    return (completion.choices[0].message.content as string).trim()
  }
}
