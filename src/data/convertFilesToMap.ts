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
  context.keys().reduce(
    (items, key) =>
      items.set(getName(key), {
        id: id++,
        ...context(key),
      }),
    new Map<string, T>()
  );
