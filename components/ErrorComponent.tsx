'use client';
import { useToast } from '@/components/ui/use-toast';

export default function ErrorComponent() {
    const { toast } = useToast();
    return (
        <div>
            {
                <>
                    {toast({
                        title: 'An error occurred',
                        description: 'Sorry about that! Please try again later.',
                    })}
                </>
            }
        </div>
    )
}