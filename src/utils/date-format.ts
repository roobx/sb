import { format, isToday, isYesterday, formatDistance } from "date-fns";
import { ru } from "date-fns/locale";

/* Допускается использовать такое форматирование даты, не
обязательно 100% совпадение с макетом */
export function formatPastTime(d: Date): string {
  if (isToday(d)) {
    return `Сегодня, ${format(d, "kk:mm", { locale: ru })}`;
  }

  if (isYesterday(d)) {
    return `Вчера, ${format(d, "kk:mm", { locale: ru })}`;
  }

  return `${formatDistance(d, Date.now(), { locale: ru })} назад`;
}
