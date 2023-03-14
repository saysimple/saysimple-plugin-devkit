let id = 1;

function getName(fileName: string): string {
  const parsed = /(\.\/?)?(?<name>.+)\.json$/.exec(fileName);

  if (!parsed || !parsed.groups?.name) {
    return fileName;
  }

  return parsed.groups.name;
}

export const convertFilesToMap = <T = unknown>(
  context: __WebpackModuleApi.RequireContext
): Map<string, T> =>
  context.keys().reduce((items, key) => {
    const name = getName(key);
    const content = context<T>(key);

    if (!Array.isArray(content)) {
      return items.set(name, {
        id: id++,
        ...content,
      });
    }

    return items.set(
      name,
      content.map((contentItem) => ({
        id: id++,
        ...contentItem,
      })) as any
    );
  }, new Map<string, T>());
