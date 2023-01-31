interface IFileTypes {
  id: string;
  file: File;
  preview?: string;
}
export const getFileSizeMB = (size: number): number => {
  return size / 1000 / 1000;
};

export const checkType = (file: File, types: Array<string>): boolean => {
  const extension: string = file.name.split('.').pop() as string;
  const loweredTypes = types.map(type => type.toLowerCase());
  return loweredTypes.includes(extension.toLowerCase());
};

export const acceptedExt = (types: Array<string> | undefined) => {
  if (types === undefined) return '';
  return types.map(type => `.${type.toLowerCase()}`).join(',');
};

export const isOverlabFile = (files: IFileTypes[], file: File): boolean => {
  const overlabFile = files.find(item => item.file.name === file.name && item.file.size === file.size);
  if (overlabFile) {
    return true;
  }
  return false;
};
