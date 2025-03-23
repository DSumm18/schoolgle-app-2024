// This is a stub file to prevent import errors
// In a real app, this would contain actual UI components
import { ReactNode, MouseEvent } from 'react';

interface ButtonProps {
  children?: ReactNode;
  className?: string;
  variant?: string;
  size?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

interface ComponentProps {
  children?: ReactNode;
  className?: string;
}

interface DialogProps {
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  icon?: ReactNode;
  type?: string;
}

interface SelectProps {
  children?: ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
}

interface TabsProps {
  defaultValue?: string;
  className?: string;
  children?: ReactNode;
}

interface TabsItemProps {
  children?: ReactNode;
  value?: string;
}

export const Button = ({ children, className, variant, size, onClick }: ButtonProps) => null;
export const Card = ({ children, className }: ComponentProps) => null;
export const CardContent = ({ children, className }: ComponentProps) => null;
export const CardDescription = ({ children }: { children?: ReactNode }) => null;
export const CardFooter = ({ children }: { children?: ReactNode }) => null;
export const CardHeader = ({ children, className }: ComponentProps) => null;
export const CardTitle = ({ children, className }: ComponentProps) => null;
export const Dialog = ({ children, open, onOpenChange }: DialogProps) => null;
export const DialogContent = ({ children }: { children?: ReactNode }) => null;
export const DialogDescription = ({ children }: { children?: ReactNode }) => null;
export const DialogFooter = ({ children }: { children?: ReactNode }) => null;
export const DialogHeader = ({ children }: { children?: ReactNode }) => null;
export const DialogTitle = ({ children }: { children?: ReactNode }) => null;
export const DialogTrigger = ({ children, asChild }: { children?: ReactNode, asChild?: boolean }) => null;
export const DropdownMenu = ({ children }: { children?: ReactNode }) => null;
export const DropdownMenuContent = ({ children }: { children?: ReactNode }) => null;
export const DropdownMenuItem = ({ children, className }: ComponentProps) => null;
export const DropdownMenuLabel = ({ children }: { children?: ReactNode }) => null;
export const DropdownMenuSeparator = () => null;
export const DropdownMenuTrigger = ({ children, asChild }: { children?: ReactNode, asChild?: boolean }) => null;
export const Input = ({ placeholder, value, onChange, className, icon, type }: InputProps) => null;
export const Select = ({ children, value, onValueChange }: SelectProps) => null;
export const SelectContent = ({ children }: { children?: ReactNode }) => null;
export const SelectItem = ({ children, key, value }: { children?: ReactNode, key?: string, value?: string }) => null;
export const SelectTrigger = ({ children, className }: ComponentProps) => null;
export const SelectValue = ({ placeholder }: { placeholder?: string }) => null;
export const Tabs = ({ defaultValue, className, children }: TabsProps) => null;
export const TabsContent = ({ children, value }: TabsItemProps) => null;
export const TabsList = ({ className, children }: ComponentProps) => null;
export const TabsTrigger = ({ children, value }: TabsItemProps) => null;
export const Tooltip = ({ children }: { children?: ReactNode }) => null;
export const TooltipContent = ({ children }: { children?: ReactNode }) => null;
export const TooltipProvider = ({ children }: { children?: ReactNode }) => null;
export const TooltipTrigger = ({ children, asChild }: { children?: ReactNode, asChild?: boolean }) => null;
export const Badge = ({ children, className }: ComponentProps) => null;
export const Avatar = ({ children, className }: ComponentProps) => null;
export const Label = ({ children, htmlFor }: { children?: ReactNode, htmlFor?: string }) => null;
export const Separator = ({ className }: { className?: string }) => null;