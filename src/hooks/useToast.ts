// This is a stub file to prevent import errors
// In a real app, this would be a proper toast hook

export const useToast = () => {
  return {
    toast: ({ title, description }) => {
      console.log(`Toast: ${title} - ${description}`);
    }
  };
};