import { TelegramService } from "../services/telegram.service.js";
import { WeatherService } from "../services/weather.service.js";

export const dailyForecastController = async (ctx) => {
  const { city } = ctx.request.query;

  try {
    const dailyForecast = await WeatherService.getDailyForecast({ city });
    const message = WeatherService.createMessage(dailyForecast);

    await TelegramService.sendMessage(message, {
      botToken: process.env.TG_BOT_TOKEN,
      chatId: process.env.CHAT_ID,
    });

    ctx.status = 200;
    ctx.body = "SUCCESS";
  } catch (err) {
    ctx.body = "Unexpected error";
    ctx.status = 400;
  }
};
