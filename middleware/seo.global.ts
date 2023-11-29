export default defineNuxtRouteMiddleware((to, _) => {
  const directories = to.fullPath.split("/");
  const lastDirecotry = directories[directories.length - 1];
  const config = useRuntimeConfig();
  const toContent = `Snellerboekendandebuurman | ${lastDirecotry}`;
  useHead({
    title: toContent,
    meta: [
      { hid: "og:title", property: "og:title", content: toContent },
      {
        hid: "og:url",
        property: "og:url",
        content: config.webUrl + String(to.name),
      },
      { hid: "twitter:title", name: "twitter:title", content: toContent },
      {
        hid: "twitter:url",
        name: "twitter:url",
        content: config.webUrl + String(to.name),
      },
    ],
  });
});
