export const setError = (
  message: string,
  setErrorMessage: (value: React.SetStateAction<string>) => void
) => {
  setErrorMessage(message);
  setTimeout(() => {
    setErrorMessage('');
  }, 2000);
};
