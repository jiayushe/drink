export function createFormData(formData: FormData, key: string, data: any) {
  if ((data === Object(data) && !(data instanceof File)) || Array.isArray(data)) {
    Object.keys(data).forEach((dataKey) => {
      createFormData(formData, dataKey, data[dataKey]);
    });
  } else {
    formData.append(key, data);
  }
}
