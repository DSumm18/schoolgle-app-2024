// This is a stub file to prevent import errors
// In a real app, this would be a proper toast hook

interface ToastOptions {
  title: string;
  description?: string;
}

export const useToast = () => {
  return {
    toast: ({ title, description }: ToastOptions) => {
      console.log(`Toast: ${title} - ${description || ''}`);
    }
  };
};