export const loadFile = async (
  file: File
): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      resolve(e.target?.result ?? null); // Use null as fallback instead of undefined
    };

    reader.onerror = (error) => {
      reject(error); // Reject the promise on error
    };

    reader.readAsDataURL(file);
  });
};
