'use client';

import { cn } from '@/lib/utils';
import {useFormStatus} from 'react-dom';
import { Button } from '@/components/ui/button';

interface FormSubmitProps{
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "primary"|null | undefined;
}

export const FormSubmit=({
    children,
    className,
    disabled,
    variant="primary",
}:FormSubmitProps)=>{
    const {pending} = useFormStatus();
    return(
        <Button
        className={cn(className)}
        type="submit"
        disabled={disabled || pending}
        variant={variant}
        >
            {children}
        </Button>
    )
}
