export const storageIonicMock: any = {
  get: () => new Promise<any>((resolve, reject) => resolve(null)),
  set: (value: any) => new Promise<any>((resolve, reject) => resolve())
};
