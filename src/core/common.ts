export enum EntityType {
  DEPARTMENT = 'DEP',
  EMPLOYEE = 'EMP',
}

export const generateCodeForEntity = (
  type: EntityType,
  name: string,
  count: number,
): string => {
  const formattedName = name
    .split(' ')
    .map((n) => n.toLowerCase())
    .join('-');
  return `${type}-${formattedName}-${count}`;
};
