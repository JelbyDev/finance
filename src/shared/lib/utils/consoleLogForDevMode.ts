export default function (section: string, message: string) {
  if (import.meta.env.DEV) {
    console.log(`Ошибка в разделе:${section} ---> ${message}`);
  }
}
