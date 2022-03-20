export const identifierPage = ({ pathname }, name) => {
  const arrayPath = pathname.split("/");
  const cleanName = name.toLowerCase();

  return arrayPath.find((path) => cleanName === path);
};
